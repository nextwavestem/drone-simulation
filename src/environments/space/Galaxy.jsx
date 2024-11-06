/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unknown-property */

import { useRef, useState } from "react";
import { OrbitControls, Stars } from "@react-three/drei";
import * as THREE from 'three';
import { useFrame } from "@react-three/fiber";
import { Earth }  from './Earth'
import { Mercury, Venus, Mars, Jupiter, Saturn, Uranus, Neptune, Sun }  from './Planets'

import { Drone }  from '../../components/drone/Drone.jsx'
import PropTypes from 'prop-types';

const Galaxy = () => {
    const controlsRef = useRef();

    return (
        <>
            <color attach="background" args={['black']} />
            <AnimatedStars/>
            <OrbitControls ref={controlsRef} enablePan={true} enableZoom={true} />
            <ambientLight/>
            
            <Mercury/>
            <Venus/>
            <Earth/>
            <Mars/>
            <Jupiter/>
            <Saturn/>
            <Uranus/>
            <Neptune/>
            <Sun/>
            <Drone 
              controlsRef={controlsRef} 
              droneScale={0.5}
              cameraOffset={[0, 4, -10]}
              lineColor={"lightgreen"}
            />
        </>
    );
};


const AnimatedStars = () => {
    const starsRef = useRef();
    useFrame(() => {
        starsRef.current.rotation.x += 0.0001;
        starsRef.current.rotation.y += 0.0001;
        starsRef.current.rotation.z += 0.0001;
    })
    
    return<Stars ref={starsRef}/>
}

Galaxy.propTypes = {

};
  

export default Galaxy;
