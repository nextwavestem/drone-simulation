import { AppContainer } from '../components/AppContainer.jsx';
import BlockPad from '../components/blockly/BlockPad.jsx';
import "../css/droneSpaceSimulator.css";
import { GalaxyContainer } from '../environments/space/GalaxyContainer.jsx';
import {Toolbar} from '../components/Toolbar.jsx'
import { useRef, useState, useEffect } from 'react';

const DroneSpaceSimulator = () => {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("event", "page_view", { page_path: window.location.pathname });
  }

  const droneRef = useRef(); // Create a ref for the Drone component
  const [dronePosition, setDronePosition] = useState({
    xPos: 0,
    yPos: 0,
    zPos: 0,
    xRot: 0,
    yRot: 0,
    zRot: 0
  });

  useEffect(() => {
    const updateDronePosition = () => {
      if (droneRef.current) {
        setDronePosition({
          xPos: droneRef.current.position.x,
          yPos: droneRef.current.position.y,
          zPos: droneRef.current.position.z,
          xRot: droneRef.current.rotation.x,
          yRot: droneRef.current.rotation.y,
          zRot: droneRef.current.rotation.z,
        });
      }
    };

    // Set up a recurring interval to check the drone’s position
    const interval = setInterval(updateDronePosition, 100); // Updates every 100 ms
    return () => clearInterval(interval); // Clean up on unmount
  }, []);
  

  return (
    <AppContainer>     
      <div className="simulation-container">
        <div className="blockpad-container">
          <BlockPad />
        </div>
        
        <div className="canvas-container">
          <Toolbar dronePosition={dronePosition} />
          <GalaxyContainer droneRef={droneRef} />
        </div>
      </div>
    </AppContainer>
  );
};

export default DroneSpaceSimulator;
