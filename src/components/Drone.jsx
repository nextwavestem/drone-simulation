/* eslint-disable no-unused-vars */
/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/no-unknown-property */

import * as THREE from "three";
import PropTypes from "prop-types";
import { useGLTF, Line, PerspectiveCamera } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import React, { useMemo, useRef, useEffect, useState } from "react";
import emitter from "../config/eventEmmiter";
import gsap from "gsap";

const DISTANCE_INCHES_OFFSET = 2.54;

const CIRCLE_RIGHT = "CIRCLE_RIGHT";
const CIRCLE_LEFT = "CIRCLE_LEFT";
const ARC_RIGHT = "ARC_RIGHT";
const ARC_LEFT = "ARC_LEFT";
const SECONDS = "SECONDS";
const INCHES = "INCHES";
const RIGHT = "RIGHT";
const LEFT = "LEFT";
const RESET = "RESET";

export const Drone = React.forwardRef(
  (
    {
      mouseControlEnabled,
      measurementViewEnabled,
      droneScale,
      cameraOffset,
      lineColor,
      droneCameraRef,
    },
    ref
  ) => {
    const canMoveInArena = mouseControlEnabled;
    const memoizedDrone = useMemo(() => {
      return useGLTF("assets/models/drone.glb");
    }, []);
    const droneRef = ref || useRef();
    const velocity = useRef(new THREE.Vector3(0, 0, 0));
    const keys = useRef({
      w: false,
      a: false,
      s: false,
      d: false,
      u: false,
      p: false,
      t: false,
    });

    const { camera } = useThree();

    const [path, setPath] = useState([new THREE.Vector3(0, 0, 0)]);
    const [isStalling, setIsStalling] = useState(false);
    const [isFlipping, setIsFlipping] = useState(false);

    const DEFAULT_DRONE_SPEED = 0.001;
    const droneSpeedRef = useRef(DEFAULT_DRONE_SPEED);
    const activeMoveRef = useRef({ cancel: null });
    const commandQueueRef = useRef(Promise.resolve());

    const stopActiveMovement = () => {
      if (activeMoveRef.current.cancel) {
        activeMoveRef.current.cancel();
        activeMoveRef.current.cancel = null;
      }
    };

    const enqueueCommand = (commandFn) => {
      const queued = commandQueueRef.current.then(() => commandFn());
      commandQueueRef.current = queued.catch(() => {});
      return queued;
    };

    const updateDronePosition = (directionVector, [distance, unit]) => {
      return new Promise((resolve) => {
        const drone = droneRef.current;
        if (!drone) return resolve();

        stopActiveMovement();
        let cancelled = false;
        activeMoveRef.current.cancel = () => {
          cancelled = true;
        };

        const step = droneSpeedRef.current;
        const convertedDistance =
          unit === INCHES ? distance * DISTANCE_INCHES_OFFSET : distance;

        if (!Number.isFinite(convertedDistance) || convertedDistance === 0) {
          return resolve();
        }

        const direction = directionVector
          .clone()
          .normalize()
          .applyQuaternion(drone.quaternion);
        const targetPosition = drone.position
          .clone()
          .add(direction.clone().multiplyScalar(convertedDistance));

        const animateMove = () => {
          if (cancelled || !droneRef.current) return resolve();

          const currentPosition = drone.position.clone();
          const remaining = targetPosition.clone().sub(currentPosition);
          const distanceToTarget = remaining.length();

          if (distanceToTarget <= step) {
            drone.position.copy(targetPosition);
            return resolve();
          }

          const moveStep = remaining.normalize().multiplyScalar(step);
          drone.position.add(moveStep);

          requestAnimationFrame(animateMove);
        };

        animateMove();
      });
    };

    const droneMovePositiveZ = async ([distance, measurement]) =>
      enqueueCommand(() => moveDroneOnAxis("z", [distance, measurement], -1));

    const droneMoveNegativeZ = async ([distance, measurement]) =>
      enqueueCommand(() => moveDroneOnAxis("z", [distance, measurement], 1));

    const droneMovePositiveX = async ([distance, measurement]) =>
      enqueueCommand(() => moveDroneOnAxis("x", [distance, measurement], 1));

    const droneMoveNegativeX = async ([distance, measurement]) =>
      enqueueCommand(() => moveDroneOnAxis("x", [distance, measurement], -1));

    const droneMovePositiveY = async ([distance, measurement]) =>
      enqueueCommand(() => moveDroneOnAxis("y", [distance, measurement], 1));

    const droneMoveNegativeY = async ([distance, measurement]) =>
      enqueueCommand(async () => {
        if (!Number.isFinite(distance)) {
          const waitTime =
            typeof measurement === "string" ? measurement.split(",")[1] : null;
          await moveDroneToPosition([
            droneRef.current.position.x,
            0,
            droneRef.current.position.z,
            "CM",
          ]);
          if (waitTime != null) {
            await stall(parseFloat(waitTime));
          }
          return;
        }

        await moveDroneOnAxis("y", [distance, measurement], -1);
      });

    const moveToPosition = async (position) =>
      enqueueCommand(() => moveDroneToPosition(position));

    const flipDrone = async (flipDirection) => {
      if (!droneRef.current) return;
      const [direction] = flipDirection;
      console.log("commanding to flip it", direction);

      setIsFlipping(true); // Set the flipping state to true

      const initialRotation = droneRef.current.rotation.clone(); // Clone the initial rotation
      const fullFlip = Math.PI * 2; // 360 degrees in radians

      const duration = 1; // Duration of the flip in seconds
      const framesPerSecond = 60;
      const totalFrames = duration * framesPerSecond;
      const increment = fullFlip / totalFrames;

      let frame = 0;

      const animateFlip = () => {
        if (frame < totalFrames) {
          switch (direction) {
            case "FORWARD":
              droneRef.current.rotation.x += increment; // Flip along the X-axis
              break;
            case "BACKWARD":
              droneRef.current.rotation.x -= increment; // Flip along the X-axis in reverse
              break;
            case "RIGHT":
              droneRef.current.rotation.z += increment; // Flip along the Z-axis
              break;
            case "LEFT":
              droneRef.current.rotation.z -= increment; // Flip along the Z-axis in reverse
              break;
            default:
              console.warn("Invalid flip direction");
              setIsFlipping(false);
              return;
          }

          frame++;
          requestAnimationFrame(animateFlip);
        } else {
          // Reset rotation to prevent overflow and reset flipping state
          droneRef.current.rotation.copy(initialRotation); // Reset to initial rotation
          setIsFlipping(false);
          console.log(`${direction} Flip complete`);
        }
      };

      animateFlip();
    };

    const moveDroneOnAxis = async (
      axis,
      [distance, measurement],
      direction = 1
    ) => {
      if (!droneRef.current) return;

      if (measurement === "SECONDS") {
        const directionVector = new THREE.Vector3(
          axis === "x" ? direction : 0,
          axis === "y" ? direction : 0,
          axis === "z" ? direction : 0
        );

        await moveContinuous(directionVector, distance);
      } else {
        const directionVector = new THREE.Vector3(
          axis === "x" ? direction : 0,
          axis === "y" ? direction : 0,
          axis === "z" ? direction : 0
        );

        await updateDronePosition(directionVector, [distance, measurement]);
      }
    };

    const moveContinuous = (directionVector, seconds) => {
      return new Promise((resolve) => {
        if (!droneRef.current) return resolve();
        let cancelled = false;
        activeMoveRef.current.cancel = () => {
          cancelled = true;
        };

        const distancePerFrame = droneSpeedRef.current * 75;
        const startTime = Date.now();
        const totalTime = seconds * 1000;
        const direction = directionVector
          .clone()
          .applyQuaternion(droneRef.current.quaternion)
          .normalize();

        const moveStep = () => {
          if (cancelled || !droneRef.current) return resolve();
          const elapsedTime = Date.now() - startTime;

          if (elapsedTime < totalTime) {
            droneRef.current.position.add(
              direction.clone().multiplyScalar(distancePerFrame)
            );
            requestAnimationFrame(moveStep);
          } else {
            resolve();
          }
        };

        moveStep();
      });
    };

    const moveDroneToPosition = async (position) => {
      return new Promise((resolve) => {
        if (!droneRef.current) return resolve();
        let cancelled = false;
        activeMoveRef.current.cancel = () => {
          cancelled = true;
        };

        let [newX, newY, newZ, unit] = position;

        if (unit == RESET) {
          setPath([new THREE.Vector3(0, 0, 0)]);
        }

        if (unit === INCHES) {
          newX *= DISTANCE_INCHES_OFFSET;
          newY *= DISTANCE_INCHES_OFFSET;
          newZ *= DISTANCE_INCHES_OFFSET;
        }

        const targetPosition = new THREE.Vector3(newX, newY, newZ);
        const speed = Math.max(droneSpeedRef.current * 50, 0.01);

        const moveStep = () => {
          if (cancelled || !droneRef.current) return resolve();
          const currentPosition = droneRef.current.position.clone();
          const distance = currentPosition.distanceTo(targetPosition);

          if (distance < 0.01) {
            droneRef.current.position.copy(targetPosition);
            return resolve();
          }

          const direction = targetPosition
            .clone()
            .sub(currentPosition)
            .normalize();
          const moveDistance = Math.min(distance, speed);
          droneRef.current.position.add(direction.multiplyScalar(moveDistance));
          requestAnimationFrame(moveStep);
        };

        moveStep();
      });
    };

    const rotateDrone = (value) => {
      const [direction, degrees, radius, unit] = value;
      const totalRadians = THREE.MathUtils.degToRad(degrees);

      if (direction === LEFT || direction === RIGHT) {
        rotateInPlace(totalRadians, direction === RIGHT);
        return;
      }

      if (!Number.isFinite(radius)) {
        return;
      }

      const radiusInCm =
        unit === INCHES ? radius * DISTANCE_INCHES_OFFSET : radius;
      const radiusInThreeJsUnits = radiusInCm / 100;
      const isClockwise = direction === CIRCLE_RIGHT || direction === ARC_RIGHT;

      moveInArc(radiusInThreeJsUnits, totalRadians, isClockwise);
    };

    const rotateInPlace = (radians, clockwise) => {
      return new Promise((resolve) => {
        if (!droneRef.current) return resolve();
        let cancelled = false;
        activeMoveRef.current.cancel = () => {
          cancelled = true;
        };

        const frames = 60;
        const increment = radians / frames;
        let frame = 0;

        const animateRotate = () => {
          if (cancelled || !droneRef.current) return resolve();
          if (frame >= frames) return resolve();

          droneRef.current.rotation.y += clockwise ? -increment : increment;
          frame += 1;
          requestAnimationFrame(animateRotate);
        };

        animateRotate();
      });
    };

    const moveInArc = (radius, radians, clockwise) => {
      return new Promise((resolve) => {
        if (!droneRef.current || !Number.isFinite(radius) || radius === 0) {
          return resolve();
        }
        let cancelled = false;
        activeMoveRef.current.cancel = () => {
          cancelled = true;
        };

        const startAngle = droneRef.current.rotation.y;
        const angleIncrement = radians / 60;
        const initialPosition = droneRef.current.position.clone();
        const centerX = initialPosition.x - radius * Math.sin(startAngle);
        const centerZ = initialPosition.z - radius * Math.cos(startAngle);

        let angleTraveled = 0;

        const animateArc = () => {
          if (cancelled || !droneRef.current) return resolve();
          if (Math.abs(angleTraveled) >= Math.abs(radians)) return resolve();

          angleTraveled += angleIncrement;
          const currentAngle =
            startAngle + (clockwise ? -angleTraveled : angleTraveled);

          const x = centerX + radius * Math.sin(currentAngle);
          const z = centerZ + radius * Math.cos(currentAngle);

          droneRef.current.position.set(x, initialPosition.y, z);
          droneRef.current.rotation.y = currentAngle;

          requestAnimationFrame(animateArc);
        };

        animateArc();
      });
    };

    const stall = (waitTime) => {
      return new Promise((resolve) => setTimeout(resolve, waitTime * 1000));
    };

    const stallAndFly = async ([waitTime, shouldFly]) =>
      enqueueCommand(async () => {
        setIsStalling(true);
        await stall(waitTime);
        setIsStalling(false);
        if (shouldFly) {
          await moveDroneOnAxis("y", [5, "CM"], 1);
        }
      });

    const updateDroneSpeed = (speed) => {
      droneSpeedRef.current = DEFAULT_DRONE_SPEED * speed;
    };

    const resetDrone = async () => {
      commandQueueRef.current = Promise.resolve();
      stopActiveMovement();
      await moveDroneToPosition([0, 0, 0, "CM"]);
      if (droneRef.current) {
        droneRef.current.rotation.set(0, 0, 0);
      }
      setPath([new THREE.Vector3(0, 0, 0)]);
    };

    useEffect(() => {
      // Register event listener
      emitter.on("commandFlyFoward", droneMovePositiveZ);
      emitter.on("commandFlyBackward", droneMoveNegativeZ);
      emitter.on("commandFlyUp", droneMovePositiveY);
      emitter.on("commandFlyDown", droneMoveNegativeY);
      emitter.on("commandFlyLeft", droneMoveNegativeX);
      emitter.on("commandFlyRight", droneMovePositiveX);
      emitter.on("commandFlyTo", moveToPosition);
      emitter.on("commandRotate", rotateDrone);
      emitter.on("resetSimulationEnv", resetDrone);

      emitter.on("commandSetWaitTime", stallAndFly);
      emitter.on("commandSetSpeed", updateDroneSpeed);
      emitter.on("commandFlip", flipDrone);

      // Keyboard event handlers
      const handleKeyDown = (event) => {
        keys.current[event.key] = true;
      };
      const handleKeyUp = (event) => {
        keys.current[event.key] = false;
      };

      window.addEventListener("keydown", handleKeyDown);
      window.addEventListener("keyup", handleKeyUp);

      return () => {
        emitter.off("commandFlyFoward", droneMovePositiveZ);
        emitter.off("commandFlyBackward", droneMoveNegativeZ);
        emitter.off("commandFlyLeft", droneMoveNegativeX);
        emitter.off("commandFlyRight", droneMovePositiveX);
        emitter.off("commandFlyUp", droneMovePositiveY);
        emitter.off("commandFlyDown", droneMoveNegativeY);
        emitter.off("commandFlyTo", moveToPosition);
        emitter.off("commandRotate", rotateDrone);
        emitter.off("resetSimulationEnv", resetDrone);

        emitter.off("commandSetWaitTime", stallAndFly);
        emitter.off("commandSetSpeed", updateDroneSpeed);
        emitter.off("commandFlip", flipDrone);

        window.removeEventListener("keydown", handleKeyDown);
        window.removeEventListener("keyup", handleKeyUp);
      };
    }, [keys]);

    // Update drone movement
    const updateDroneMovement = () => {
      velocity.current.set(0, 0, 0);
      if (!droneRef.current) return;

      if (isFlipping || isStalling) {
        camera.lookAt(droneRef.current.position);
        return;
      }

      // Calculate the forward direction based on the drone's current rotation
      const forwardDirection = new THREE.Vector3(0, 0, -1).applyQuaternion(
        droneRef.current.quaternion
      ); // Apply current drone rotation
      const backwardDirection = new THREE.Vector3(0, 0, 1).applyQuaternion(
        droneRef.current.quaternion
      ); // Apply current drone rotation
      const leftDirection = new THREE.Vector3(-1, 0, 0).applyQuaternion(
        droneRef.current.quaternion
      ); // Apply current drone rotation
      const rightDirection = new THREE.Vector3(1, 0, 0).applyQuaternion(
        droneRef.current.quaternion
      ); // Apply current drone rotation

      if (keys.current.w)
        velocity.current.add(
          forwardDirection.multiplyScalar(droneSpeedRef.current)
        );
      if (keys.current.s)
        velocity.current.add(
          backwardDirection.multiplyScalar(droneSpeedRef.current)
        );
      if (keys.current.a)
        velocity.current.add(leftDirection.multiplyScalar(droneSpeedRef.current));
      if (keys.current.d)
        velocity.current.add(rightDirection.multiplyScalar(droneSpeedRef.current));

      if (keys.current.z)
        droneRef.current.rotation.y += THREE.MathUtils.degToRad(1); // Rotate left
      if (keys.current.c)
        droneRef.current.rotation.y -= THREE.MathUtils.degToRad(1); // Rotate right

      if (keys.current.u) velocity.current.y += droneSpeedRef.current;
      if (keys.current.p) velocity.current.y -= droneSpeedRef.current;

      droneRef.current.position.add(velocity.current);

      if (!mouseControlEnabled && !measurementViewEnabled) {
        const [cameraOffsetX, cameraOffsetY, cameraOffsetZ] = cameraOffset;
        const cameraView = new THREE.Vector3(
          cameraOffsetX,
          cameraOffsetY,
          cameraOffsetZ
        );
        cameraView.applyQuaternion(droneRef.current.quaternion);
        camera.position.copy(droneRef.current.position.clone().add(cameraView));
        camera.lookAt(droneRef.current.position);
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
        <PerspectiveCamera
          makeDefault={false}
          ref={droneCameraRef}
          fov={75}
          rotation={[0,59.6,0]}
          position={[0,1,0]} // Position relative to drone
        />
          <primitive
            object={memoizedDrone.scene}
            position={[0, 0, 0]}
            scale={droneScale}
          />
        </mesh>
        <Line points={path} color={lineColor} lineWidth={3} />
      </>
    );
  }
);

Drone.propTypes = {
  mouseControlEnabled: PropTypes.bool,
  measurementViewEnabled: PropTypes.bool,
  droneScale: PropTypes.number,
  cameraOffset: PropTypes.arrayOf(PropTypes.number),
  lineColor: PropTypes.string,
};

export default Drone;
