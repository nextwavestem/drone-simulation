/* eslint-disable no-unused-vars */

import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

import { javascriptGenerator } from 'blockly/javascript';
import * as Blockly from 'blockly/core';
import * as En from 'blockly/msg/en';
import 'blockly/javascript';
import 'blockly/blocks';

import { toolbarConfig, toolbarBlocksDefinitions } from './config/toolbar.js'
import ActionButton from '../ActionButton.jsx';
import  Theme  from './config/theme.js';
import "../../css/blockpad.css";
import Interpreter from 'js-interpreter';


Blockly.setLocale(En);

const BlockPad = ({ 
  enableMouseControl,
  moveDronePosY, 
  moveDroneNegY,
  moveDronePosZ,
  moveDroneNegZ,
  moveDronePosX,
  moveDroneNegX,
  moveDroneTo,
  rotate,
  waitTime,
  speed,
}) => {
  
  const blocklyDiv = useRef();
  let workspaceRef = useRef();

  // Function to initialize the interpreter with custom methods
const initInterpreter = (interpreter, globalObject) => {
  // Inject custom functions into the interpreter's context
  const wrapFunction = (fn) => (arg1, arg2, arg3, arg4) => fn(arg1, arg2 ? arg2.toString() : '', arg3 ? arg3.toString() : '', arg4 ? arg4.toString() : '');
  const alertFunction = (text) => { window.alert(text ? text.toString() : '');};
  
  interpreter.setProperty(globalObject, 'flyForward',   interpreter.createNativeFunction(wrapFunction(flyForward)));
  interpreter.setProperty(globalObject, 'flyBackward',  interpreter.createNativeFunction(wrapFunction(flyBackward)));
  interpreter.setProperty(globalObject, 'flyDown', interpreter.createNativeFunction(wrapFunction(flyDown)));
  interpreter.setProperty(globalObject, 'flyUp',   interpreter.createNativeFunction(wrapFunction(flyUp)));
  interpreter.setProperty(globalObject, 'flyLeft',   interpreter.createNativeFunction(wrapFunction(flyLeft)));
  interpreter.setProperty(globalObject, 'flyRight',  interpreter.createNativeFunction(wrapFunction(flyRight)));
  interpreter.setProperty(globalObject, 'setSpeed',   interpreter.createNativeFunction(wrapFunction(setSpeed)));
  interpreter.setProperty(globalObject, 'setWaitTime',  interpreter.createNativeFunction(wrapFunction(setWaitTime)));
  interpreter.setProperty(globalObject, 'rotateDrone',  interpreter.createNativeFunction(wrapFunction(rotateDrone)));
  interpreter.setProperty(globalObject, 'alert', interpreter.createNativeFunction(alertFunction));
  
  interpreter.setProperty(globalObject, 'moveTo',  interpreter.createNativeFunction(wrapFunction(moveTo)));
};

const runSimulator = () => {
  var code = javascriptGenerator.workspaceToCode(Blockly.getMainWorkspace().current);
  console.log(code)
  const interpreter = new Interpreter(code, initInterpreter);

  const step = () => {
    if (interpreter.step()) {
      requestAnimationFrame(step); // Continue stepping through the code
    } else {
      console.log("Simulation completed"); // Optional: Log completion
    }
  };

  step(); // Start interpreting
};

  const [toggleValue, setToggleValue] = useState(false);
  const handleToggleChange = () => { setToggleValue(prevValue => {!prevValue; enableMouseControl(!prevValue)});};

  const clearWorkspace = () => { Blockly.getMainWorkspace().clear(); };
 
  const flyDown = (distance, measurement) => { 
    if(distance == '-Infinity') {
      moveDroneTo([-Infinity, 0, -Infinity]) 
    } else {
      moveDroneNegY([distance, measurement]); 
    }
  }
  const flyUp   = (distance, measurement) => { moveDronePosY([distance, measurement]); }

  const flyForward  = (distance, measurement) => { moveDronePosZ([distance, measurement]); }
  const flyBackward = (distance, measurement) => { moveDroneNegZ([distance, measurement]); }
  
  const flyLeft  = (distance, measurement) => { moveDroneNegX([distance, measurement]); }
  const flyRight = (distance, measurement) => { moveDronePosX([distance, measurement]); }

  const moveTo = (x, y, z) => { moveDroneTo([x, y, z]); }

  const setSpeed    = (value) => { speed(value) }
  const setWaitTime = (value, shouldFly) => { waitTime([value,shouldFly]) }

  const rotateDrone = (direction, degree, radius, unit) => { rotate([direction, degree, radius, unit]) }




  const reloadPage = () => {
    location.reload();
  }

  useEffect(() => {
    const toolbar =  toolbarConfig;

    toolbarBlocksDefinitions(Blockly);
    workspaceRef.current = Blockly.inject(blocklyDiv.current, {
      toolbox: toolbar,
      theme: Theme,
      zoom: {
        controls: true,
        wheel: true,
      },
      grid: {
        spacing: 20,
        length: 3,
        colour: '#ccc',
        snap: true
      },
      trashcan: true,
      move: true
    });
  }, []);

  return (    
    <div className='blockpad-wrapper'>
      <div className='button-bar'>
        <ActionButton onClick={clearWorkspace} title="Clear Workspace" green medium></ActionButton>
        <ActionButton onClick={runSimulator} title="Launch Simulation" medium></ActionButton>
        <ActionButton onClick={reloadPage} title="Reset Simulation" medium>/</ActionButton>
        <label className="toggle-switch">
          <input type="checkbox" checked={toggleValue} onChange={handleToggleChange}/>
          <span className="slider">Mouse Control</span>
        </label>
      </div>
      
      <div ref={blocklyDiv} className='blockly-area' />
    </div>
    
  );
};

BlockPad.propTypes = {
  enableMouseControl: PropTypes.any,
  moveDronePosY: PropTypes.any, 
  moveDroneNegY: PropTypes.any,
  moveDronePosZ: PropTypes.any, 
  moveDroneNegZ: PropTypes.any,
  moveDronePosX: PropTypes.any, 
  moveDroneNegX: PropTypes.any,
  moveDroneTo: PropTypes.any,
  waitTime: PropTypes.any, 
  speed: PropTypes.any,
  rotate: PropTypes.any
};

export default BlockPad;
