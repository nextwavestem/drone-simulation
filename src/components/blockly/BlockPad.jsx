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
import emitter from '../../config/eventEmmiter.js';

Blockly.setLocale(En);

const BlockPad = () => {
  
  const blocklyDiv = useRef();
  let workspaceRef = useRef();

  const [toggleValue, setToggleValue] = useState(false);


  const initInterpreter = (interpreter, globalObject) => {
    const wrapFunction = (fn) => (arg1, arg2, arg3, arg4) => fn(arg1, arg2 ? arg2.toString() : '', arg3 ? arg3.toString() : '', arg4 ? arg4.toString() : '');
    const alertFunction = (text) => { window.alert(text ? text.toString() : '');};
    
    interpreter.setProperty(globalObject, 'flyForward',   interpreter.createNativeFunction(wrapFunction(flyForward)));
    interpreter.setProperty(globalObject, 'alert', interpreter.createNativeFunction(alertFunction));

  };

  const handleToggleChange = () => { 
    setToggleValue((prevValue) => {
      const newVal = !prevValue;
      console.log("value mousecontrolVale to ", newVal);
      emitter.emit('mouseControlEnabled', newVal);
      return newVal; 
    });
  };
  const clearWorkspace = () => { Blockly.getMainWorkspace().clear(); };
  const reloadPage = () => { location.reload(); }

  const runSimulator = () => {
    var code = javascriptGenerator.workspaceToCode(Blockly.getMainWorkspace().current);
    console.log(code)
    const interpreter = new Interpreter(code, initInterpreter);

    const step = () => {
      if (interpreter.step()) {
        requestAnimationFrame(step); 
      } else {
        console.log("Simulation completed"); 
      }
    };

    step(); 
  };

  

  const flyForward = (distance, measurement) => {
    console.log("Flying forward");
    emitter.emit('commandFlyFoward', [distance, measurement]); 
  };
 
  

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

BlockPad.propTypes = {};

export default BlockPad;