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

export const Drone = React.forwardRef(({ 
    setDronePosition,
    enableMouseControl,
    enableMeasurement,
    droneScale,
    cameraOffset,
    lineColor
  }, ref) => {

  const keys = useRef({ w: false, a: false, s: false, d: false, u: false, p: false, t: false });
  const velocity = useRef(new THREE.Vector3(0, 0, 0));
  const droneRef = ref || useRef();

  const canMoveInArena = enableMouseControl;
  const DEFAULT_DRONE_SPEED = 0.033333333332
  let droneSpeed = DEFAULT_DRONE_SPEED

  const { camera } = useThree(); 
  

  const memoizedDrone = useMemo(() => { return useGLTF('assets/models/drone.glb'); }, []);
  
  const [path, setPath] = useState([new THREE.Vector3(0, 0, 0)]); 


  const movePositiveZ = ([distance, measurement]) => {
    if (droneRef.current) {
      console.log("moving positiveZ with", distance)
      console.log("moving positiveZ with", measurement)
    }
  }



  useEffect(() => {

    emitter.on('movePositiveZ', movePositiveZ);


    const handleKeyDown = (event) => { keys.current[event.key] = true; };
    const handleKeyUp = (event) => { keys.current[event.key] = false; };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      emitter.off('movePositiveZ', movePositiveZ);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };

  }, [keys]);

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
    if (!canMoveInArena && !enableMeasurement) {
      const [cameraOffsetX, cameraOffsetY, cameraOffsetZ] = cameraOffset;
      const cameraView = new THREE.Vector3(cameraOffsetX, cameraOffsetY, cameraOffsetZ); // Camera position relative to the drone
      cameraView.applyQuaternion(droneRef.current.quaternion); // Apply the drone's rotation to the camera
      camera.position.copy(droneRef.current.position.clone().add(cameraView));
      camera.lookAt(droneRef.current.position); // Ensure the camera keeps looking at the drone
    }

    // Update the path the drone follows
    const currentPosition = droneRef.current.position.clone();
    setPath((prevPath) => [...prevPath, currentPosition]);
    
    if(setDronePosition) {
      setDronePosition({ 
      xPos: droneRef.current.position.x, 
      yPos: droneRef.current.position.y, 
      zPos: droneRef.current.position.z, 
      xRot: droneRef.current.rotation.x,
      yRot: droneRef.current.rotation.y, 
      zRot: droneRef.current.rotation.z });
    }
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
          rotation={[0, 0, 0]} 
        />
      </mesh>
      <Line
        points={path} 
        color={lineColor} 
        lineWidth={3} 
      />
    </>
  );
});

Drone.propTypes = {
  enableMouseControl: PropTypes.any,
  setDronePosition: PropTypes.func,
  controlsRef: PropTypes.any,
  enableMeasurement: PropTypes.any,
  droneScale: PropTypes.any,
  cameraOffset: PropTypes.any,
  lineColor: PropTypes.any
};
