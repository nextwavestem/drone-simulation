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

const DISTANCE_INCHES_OFFSET = 2.54;
const NEGATIVE_OFFSET = 1;

const CIRCLE_RIGHT = 'CIRCLE_RIGHT';
const CIRCLE_LEFT = "CIRCLE_LEFT";
const ARC_RIGHT = 'ARC_RIGHT';
const ARC_LEFT ='ARC_LEFT';
const SECONDS = 'SECONDS';
const INCHES = "INCHES";
const RIGHT = 'RIGHT';
const LEFT = 'LEFT';

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

  
  const updateDronePosition = (directionVector, [distance, unit]) => {
    const targetPosition = directionVector.clone();
    return new Promise((resolve) => {
      const animateMove = () => {
        
        if (!droneRef.current) return resolve(); // Resolve if droneRef is unavailable
    
        const currentPosition = droneRef.current.position.clone();
        const direction = targetPosition.clone().sub(currentPosition).normalize();
        
        const step = droneSpeed; 
        const newPosition = currentPosition.add(direction.multiplyScalar(step));
        droneRef.current.position.copy(newPosition);
  
        if (newPosition.distanceTo(targetPosition) > step) {
          requestAnimationFrame(animateMove);
        } else {
          resolve(); 
        }
      };
  
      animateMove();
    });
  };
  
  const droneMovePositiveZ = async ([distance, measurement]) => {
    await moveDroneOnAxis('z', [distance, measurement], 1); // Positive direction
  };
  
  const droneMoveNegativeZ = async ([distance, measurement]) => {
    await moveDroneOnAxis('z', [distance + NEGATIVE_OFFSET, measurement], -1); // Negative direction
  };

  const droneMovePositiveX = async ([distance, measurement]) => {
    await moveDroneOnAxis('x', [distance, measurement], 1); // Positive direction
  };
  
  const droneMoveNegativeX = async ([distance, measurement]) => {
    await moveDroneOnAxis('x', [distance + NEGATIVE_OFFSET, measurement], -1); // Negative direction
  };
  
  const droneMovePositiveY = async ([distance, measurement]) => {
    await moveDroneOnAxis('y', [distance, measurement], 1); // Positive direction
  };
  
  const droneMoveNegativeY = async ([distance, measurement]) => {
    if(distance == -Infinity) {
      await moveDroneToPosition([droneRef.current.position.x, 0, droneRef.current.position.z, 'CM']); 
    } else {
      await moveDroneOnAxis('y', [distance + NEGATIVE_OFFSET, measurement], -1); // Negative direction
    }
  };

  const moveToPosition = async (position) => {
    await moveDroneToPosition(position); 
  };
  
  const moveDroneOnAxis = async (axis, [distance, measurement], direction = 1) => {
    if (!droneRef.current) return;
  
    const position = droneRef.current.position.clone();
  
    if (measurement === 'SECONDS') {
      const directionVector = new THREE.Vector3(
        axis === 'x' ? direction : 0,
        axis === 'y' ? direction : 0,
        axis === 'z' ? direction : 0
      );
  
      moveContinuous(directionVector, distance);
    } else {
      const convertedDistance = measurement === 'INCHES' ? distance * DISTANCE_INCHES_OFFSET : distance;
      position[axis] += convertedDistance * direction;
  
      await updateDronePosition(
        new THREE.Vector3(position.x, position.y, position.z),
        [distance, measurement]
      );
    }
  };  
  
  const moveContinuous = (directionVector, seconds) => {
    const distancePerFrame = 0.0005 * 75;
    const startTime = Date.now();
    const totalTime = seconds * 1000;
    const direction = directionVector.clone().applyQuaternion(droneRef.current.quaternion).normalize();
  
    const moveStep = () => {
      const elapsedTime = Date.now() - startTime;
  
      if (elapsedTime < totalTime) {
        droneRef.current.position.add(direction.clone().multiplyScalar(distancePerFrame));
        requestAnimationFrame(moveStep);
      } else {
        console.log("Movement complete.");
      }
    };
  
    moveStep();
  };
  
  const moveDroneToPosition = async (position) => {
    
    let [newX, newY, newZ, unit] = position;

    // Convert coordinates if the unit is in inches
    if (unit === INCHES) {
      newX *= DISTANCE_INCHES_OFFSET;
      newY *= DISTANCE_INCHES_OFFSET;
      newZ *= DISTANCE_INCHES_OFFSET;
    }

    const targetPosition = new THREE.Vector3(newX, newY, newZ);
    const speed = 0.05;

    const moveStep = () => {
      const currentPosition = droneRef.current.position.clone();
      const distance = currentPosition.distanceTo(targetPosition);

      if (distance < 0.01) { 
        droneRef.current.position.copy(targetPosition); 
      } else {
        const direction = targetPosition.clone().sub(currentPosition).normalize();
        const moveDistance = Math.min(distance, speed);
        droneRef.current.position.add(direction.multiplyScalar(moveDistance));
        requestAnimationFrame(moveStep);
      }
    };

    moveStep();
  }

  const rotateDrone = (value) => {
    const [direction, degrees, radius, unit] = value;
  
    const DISTANCE_INCHES_OFFSET = 2.54; 
    const radiusInCm = unit === 'INCHES' ? radius * DISTANCE_INCHES_OFFSET : radius;
    const radiusInThreeJsUnits = radiusInCm / 100;
  
    const totalRadians = THREE.MathUtils.degToRad(degrees);
    const isClockwise = direction === 'CIRCLE_RIGHT' || direction === 'ARC_RIGHT';
  
    moveInArc(radiusInThreeJsUnits, totalRadians, isClockwise);
  };
  
  const moveInArc = (radius, radians, clockwise) => {
    const startAngle = droneRef.current.rotation.y;
    const angleIncrement = radians / 60; // Adjust for smoothness
    const initialPosition = droneRef.current.position.clone(); // Initial position to calculate relative arc
    const centerX = initialPosition.x - radius * Math.sin(startAngle);
    const centerZ = initialPosition.z - radius * Math.cos(startAngle);
  
    let angleTraveled = 0;
  
    const animateArc = () => {
      if (Math.abs(angleTraveled) >= Math.abs(radians)) {
        return;
      }
  
      angleTraveled += angleIncrement;
      const currentAngle = startAngle + (clockwise ? -angleTraveled : angleTraveled);
  
      const x = centerX + radius * Math.sin(currentAngle);
      const z = centerZ + radius * Math.cos(currentAngle);
  
      droneRef.current.position.set(x, initialPosition.y, z);
      droneRef.current.rotation.y = currentAngle;
  
      requestAnimationFrame(animateArc);
    };
  
    animateArc();
  };
  

  const stall = (waitTime) => {
    return new Promise(resolve => setTimeout(resolve, waitTime * 1000));
  };

  const stallAndFly = async ([waitTime, shouldFly]) => {
    setIsStalling(true);
    await stall(waitTime);
    setIsStalling(false);
    if(shouldFly) {
      await updateDronePosition(
        new THREE.Vector3(
          droneRef.current.position.x, 
          droneRef.current.position.y + 5, 
          droneRef.current.position.z),
        [5, 'CM']
      );
    }
  };

  const updateDroneSpeed = (speed) =>{ droneSpeed = DEFAULT_DRONE_SPEED * speed; }
  
  

  useEffect(() => {
    // Register event listener
    emitter.on('commandFlyFoward', droneMovePositiveZ);
    emitter.on('commandFlyBackward', droneMoveNegativeZ);
    emitter.on('commandFlyUp', droneMovePositiveY);
    emitter.on('commandFlyDown', droneMoveNegativeY);
    emitter.on('commandFlyLeft', droneMovePositiveX);
    emitter.on('commandFlyRight', droneMoveNegativeX);
    emitter.on('commandFlyTo', moveToPosition);
    emitter.on('commandRotate', rotateDrone);
    
    emitter.on('commandSetWaitTime', stallAndFly);
    emitter.on('commandSetSpeed', updateDroneSpeed);

    
    // Keyboard event handlers
    const handleKeyDown = (event) => { keys.current[event.key] = true; };
    const handleKeyUp = (event) => { keys.current[event.key] = false; };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      emitter.off('commandFlyFoward', droneMovePositiveZ);
      emitter.off('commandFlyBackward', droneMoveNegativeZ);
      emitter.off('commandFlyLeft', droneMoveNegativeX);
      emitter.off('commandFlyRight', droneMovePositiveX);
      emitter.off('commandFlyUp', droneMovePositiveY);
      emitter.off('commandFlyTo', moveToPosition);
      emitter.off('commandRotate', rotateDrone);

      emitter.off('commandSetWaitTime', stallAndFly);
      emitter.off('commandSetSpeed', updateDroneSpeed);


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
