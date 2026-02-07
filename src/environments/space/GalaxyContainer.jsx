import { Canvas } from "@react-three/fiber";
import { useRef } from "react";
import Galaxy from './Galaxy';
import PropTypes from 'prop-types';

export const GalaxyContainer = ({ droneRef }) => { // Accept droneRef as a prop
  const droneCameraRef = useRef();
  return (
    <Canvas>
      <Galaxy droneRef={droneRef} droneCameraRef={droneCameraRef} />
    </Canvas>
  );
};

GalaxyContainer.propTypes = {
  droneRef: PropTypes.object.isRequired, // Define the prop type
};

export default GalaxyContainer;
