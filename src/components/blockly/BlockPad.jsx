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
import  { getForLoopContent, isIfStatement, isForLoop }  from './config/helper.js';

Blockly.setLocale(En);

const BlockPad = () => {
  
  const blocklyDiv = useRef();
  let workspaceRef = useRef();

  const [toggleValue, setToggleValue] = useState(false);
  const clearWorkspace = () => { Blockly.getMainWorkspace().clear(); };
  const reloadPage = () => { location.reload(); }
  const handleToggleChange = () => { 
    setToggleValue((prevValue) => {
      const newVal = !prevValue;
      emitter.emit('mouseControlEnabled', newVal);
      return newVal; 
    });
  };

  const runPlainSimulator = () => {
    var code = javascriptGenerator.workspaceToCode(Blockly.getMainWorkspace().current);
    console.log(code)

    const interpreter = new Interpreter(code, initInterpreter);
    const step = () => {
      if (interpreter.step()) requestAnimationFrame(step); 
      else console.log("Simulation completed"); 

    };
    step(); 
  };

  const runForSimulator = () => {
    const code = javascriptGenerator.workspaceToCode(Blockly.getMainWorkspace().current);
    const loop = getForLoopContent(code); 

    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
    const runCommands = async (commands) => {
        for (const command of commands) {
            console.log(`Executing command: ${command.trim()}`);
            
            const interpreter = new Interpreter(command, initInterpreter);
            const step = () => {
                if (interpreter.step()) {
                    requestAnimationFrame(step);
                } else {
                    console.log("Command execution completed");
                }
            };
            step();
            await delay(5000);
        }
    };

    const runLoop = async (iterations, commands) => {
        for (let i = 0; i < iterations; i++) {
          console.log(`Iteration ${i + 1} of ${iterations}`);
          await runCommands(commands);
        }
        console.log("Mission Completed");
    };

    const arrayCommands = loop.content.split(";").map(cmd => cmd.trim()).filter(cmd => cmd); // Remove empty commands
    runLoop(loop.count, arrayCommands);
};


  const runBasicSimulator = (code) => {
    const arrayCommands = code.split(";")
    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
    const runLoop = async (iterations) => {
      for (let i = 0; i < iterations; i++) {
        const command = arrayCommands[i]
        console.log(command)
    
        const interpreter = new Interpreter(command, initInterpreter);
        const step = () => {
          if (interpreter.step()) requestAnimationFrame(step); 
          else console.log("Simulation completed"); 
      
        };
        step(); 
        await delay(5000);
      }
      console.log("Mission Completed");
    };
    runLoop(arrayCommands.length); 
  };

  const runSimulator = () => {
    var code = javascriptGenerator.workspaceToCode(Blockly.getMainWorkspace().current);

    if(isIfStatement(code)) {
      runPlainSimulator()
    } 
    else if (isForLoop(code)) {
      runForSimulator();
    }
    else {
      runBasicSimulator(code)
    }
  };

  const initInterpreter = (interpreter, globalObject) => {
    const wrapFunction = (fn) => (arg1, arg2, arg3, arg4) => fn(arg1, arg2, arg3, arg4);
    const alertFunction = (text) => { window.alert(text ? text.toString() : '');};
    
    interpreter.setProperty(globalObject, 'alert', interpreter.createNativeFunction(alertFunction));

    interpreter.setProperty(globalObject, 'flyForward',   interpreter.createNativeFunction(wrapFunction(flyForward)));
    interpreter.setProperty(globalObject, 'flyBackward',  interpreter.createNativeFunction(wrapFunction(flyBackward)));
    interpreter.setProperty(globalObject, 'flyDown', interpreter.createNativeFunction(wrapFunction(flyDown)));
    interpreter.setProperty(globalObject, 'flyUp',   interpreter.createNativeFunction(wrapFunction(flyUp)));
    interpreter.setProperty(globalObject, 'flyLeft',   interpreter.createNativeFunction(wrapFunction(flyLeft)));
    interpreter.setProperty(globalObject, 'flyRight',  interpreter.createNativeFunction(wrapFunction(flyRight)));
    interpreter.setProperty(globalObject, 'setSpeed',   interpreter.createNativeFunction(wrapFunction(setSpeed)));
    interpreter.setProperty(globalObject, 'setWaitTime',  interpreter.createNativeFunction(wrapFunction(setWaitTime)));
    interpreter.setProperty(globalObject, 'rotateDrone',  interpreter.createNativeFunction(wrapFunction(rotateDrone)));
    interpreter.setProperty(globalObject, 'moveTo',  interpreter.createNativeFunction(wrapFunction(moveTo)));
    interpreter.setProperty(globalObject, 'captureImage',  interpreter.createNativeFunction(wrapFunction(captureImage)));
  };

  const captureImage = () =>{ emitter.emit('commandTakeScreenShot');}
  const flyUp = (distance, measurement) => { emitter.emit('commandFlyUp', [distance, measurement]); };
  const flyForward = (distance, measurement) => { emitter.emit('commandFlyFoward', [distance, measurement]); };
  const setWaitTime = (time, enableFly) => { emitter.emit('commandSetWaitTime', [time, enableFly]); };
  const setSpeed = (speed) => { emitter.emit('commandSetSpeed', [speed]); };
  const flyBackward = (distance, measurement) => { emitter.emit('commandFlyBackward', [distance, measurement]); };
  const flyLeft = (distance, measurement) => { emitter.emit('commandFlyLeft', [distance, measurement]); };
  const flyRight = (distance, measurement) => { emitter.emit('commandFlyRight', [distance, measurement]); };
  const flyDown = (distance, measurement) => { emitter.emit('commandFlyDown', [distance, measurement]); };
  const moveTo = (x, y, z, unit) => { emitter.emit('commandFlyTo', [x, y, z, unit]); };
  const rotateDrone = (direction, degree, distance, unit) => { emitter.emit('commandRotate', [direction, degree, distance, unit]); };


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
          <span className="slider"> Mouse Control </span>
        </label>
      </div>
      
      <div ref={blocklyDiv} className='blockly-area' />
    </div>
    
  );
};

BlockPad.propTypes = {};

export default BlockPad;