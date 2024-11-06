/* eslint-disable no-unused-vars */
/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/no-unknown-property */

import * as THREE from 'three';
import PropTypes from 'prop-types';
import { useGLTF, Line } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import React, { useMemo, useRef, useEffect, useState } from "react";
import emitter from '../../config/eventEmmiter'
import gsap from 'gsap';

export const Drone = React.forwardRef(({
  mouseControlEnabled,
  measurementViewEnabled,
  droneScale,
  cameraOffset,
  lineColor
}, ref) => {

  const isGameMode = window.location.href.includes('game-mode');
  const canMoveInArena = isGameMode || mouseControlEnabled;
  const memoizedDrone = useMemo(() => { return useGLTF('assets/models/drone.glb'); }, []);
  const droneRef = ref || useRef();
  const velocity = useRef(new THREE.Vector3(0, 0, 0));
  const keys = useRef({ w: false, a: false, s: false, d: false, u: false, p: false, t: false });
  
  const { camera } = useThree(); 

  const [path, setPath] = useState([new THREE.Vector3(0, 0, 0)]); 
  const [isStalling, setIsStalling] = useState(false);

  const DEFAULT_DRONE_SPEED = 0.033333333332
  let droneSpeed = DEFAULT_DRONE_SPEED

  
  // const updateDronePosition = (directionVector, [distance, unit]) => {
  //   const currentPosition = droneRef.current.position.clone();
  //   const direction = directionVector.clone().sub(currentPosition).normalize();
  //   const newPosition = currentPosition.distanceTo(directionVector);
  //   droneRef.current.position.add(direction.multiplyScalar(newPosition));
  // };

  // const droneMovePositiveZ = ([distance, measurement]) => {
  //   if (droneRef.current) {
  //     updateDronePosition(
  //       new THREE.Vector3(
  //         droneRef.current.position.x, 
  //         droneRef.current.position.y, 
  //         droneRef.current.position.z + distance),  
  //       [distance, measurement]);
  //   }
  // };

  const updateDronePosition = (directionVector, [distance, unit]) => {
    const targetPosition = directionVector.clone();
    console.log("moving drone from ", distance)
    // Return a promise to make it async-friendly
    return new Promise((resolve) => {
      const animateMove = () => {
        
        if (!droneRef.current) return resolve(); // Resolve if droneRef is unavailable
    
        const currentPosition = droneRef.current.position.clone();
        const direction = targetPosition.clone().sub(currentPosition).normalize();
        
        // Move drone a small step toward the target
        const step = droneSpeed; 
        const newPosition = currentPosition.add(direction.multiplyScalar(step));
    
        droneRef.current.position.copy(newPosition);
        
        // Continue animating if we haven't reached the target
        if (newPosition.distanceTo(targetPosition) > step) {
          requestAnimationFrame(animateMove);
        } else {
          resolve(); // Resolve the promise when animation completes
        }
      };
  
      animateMove();
    });
  };
  
  const droneMovePositiveZ = async ([distance, measurement]) => {
    if (droneRef.current) {
      const targetZ = droneRef.current.position.z + distance;
      await updateDronePosition(
        new THREE.Vector3(droneRef.current.position.x, droneRef.current.position.y, targetZ),
        [distance, measurement]
      );
    }
  };
  
  

  useEffect(() => {
    // Register event listener
    emitter.on('commandFlyFoward', droneMovePositiveZ);



    // Keyboard event handlers
    const handleKeyDown = (event) => { keys.current[event.key] = true; };
    const handleKeyUp = (event) => { keys.current[event.key] = false; };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      emitter.off('commandFlyFoward', droneMovePositiveZ);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  },[keys]);

  // Update drone movement
  const updateDroneMovement = () => {
    velocity.current.set(0, 0, 0);
    if(!droneRef.current) return

    // Calculate the forward direction based on the drone's current rotation
    const forwardDirection = new THREE.Vector3(0, 0, 1).applyQuaternion(droneRef.current.quaternion); // Apply current drone rotation
    const backwardDirection = new THREE.Vector3(0, 0, -1).applyQuaternion(droneRef.current.quaternion); // Apply current drone rotation
    const leftDirection = new THREE.Vector3(1, 0, 0).applyQuaternion(droneRef.current.quaternion); // Apply current drone rotation
    const rightDirection = new THREE.Vector3(-1, 0, 0).applyQuaternion(droneRef.current.quaternion); // Apply current drone rotation

    if (keys.current.w) velocity.current.add(forwardDirection.multiplyScalar(droneSpeed)); // Forward
    if (keys.current.s) velocity.current.add(backwardDirection.multiplyScalar(droneSpeed)); // Backward
    if (keys.current.a) velocity.current.add(leftDirection.multiplyScalar(droneSpeed)); // left
    if (keys.current.d) velocity.current.add(rightDirection.multiplyScalar(droneSpeed)); // right

    if (keys.current.z) droneRef.current.rotation.y += THREE.MathUtils.degToRad(1); // Rotate left
    if (keys.current.c) droneRef.current.rotation.y -= THREE.MathUtils.degToRad(1); // Rotate right

    if (keys.current.u) velocity.current.y += droneSpeed; // Up
    if (keys.current.p) velocity.current.y -= droneSpeed; // Down

    droneRef.current.position.add(velocity.current);

    // Update camera to follow drone
    if (!canMoveInArena && !measurementViewEnabled) {
      const [cameraOffsetX, cameraOffsetY, cameraOffsetZ] = cameraOffset;
      const cameraView = new THREE.Vector3(cameraOffsetX, cameraOffsetY, cameraOffsetZ); // Camera position relative to the drone
      cameraView.applyQuaternion(droneRef.current.quaternion); // Apply the drone's rotation to the camera
      camera.position.copy(droneRef.current.position.clone().add(cameraView));
      camera.lookAt(droneRef.current.position); // Ensure the camera keeps looking at the drone
    }

    // Update the path the drone follows
    const currentPosition = droneRef.current.position.clone();
    setPath((prevPath) => [...prevPath, currentPosition]);
  };

  useFrame(() => {
    if (!droneRef.current) return;
    updateDroneMovement();
  });

  return (
    <>
      <mesh ref={droneRef}>
        <primitive
          object={memoizedDrone.scene}
          position={[0, 0, 0]}
          scale={droneScale}
        />
      </mesh>
      <Line points={path} color={lineColor} lineWidth={3} />
    </>
  );
});

Drone.propTypes = {
  mouseControlEnabled: PropTypes.bool,
  measurementViewEnabled: PropTypes.bool,
  droneScale: PropTypes.number,
  cameraOffset: PropTypes.arrayOf(PropTypes.number),
  lineColor: PropTypes.string,
};

export default Drone;
