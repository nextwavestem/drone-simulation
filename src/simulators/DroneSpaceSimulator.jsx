import { AppContainer } from '../components/AppContainer.jsx';
import BlockPad from '../components/blockly/BlockPad.jsx';
import "../css/droneSpaceSimulator.css";
import { GalaxyContainer } from '../environments/space/GalaxyContainer.jsx';
import {Toolbar} from '../components/Toolbar.jsx'

const DroneSpaceSimulator = () => {

  return (
    <AppContainer>     
      <div className="simulation-container">
        <div className="blockpad-container">
          <BlockPad />
        </div>
        
        <div className="canvas-container">
        <Toolbar/>
          <GalaxyContainer />
        </div>
      </div>
    </AppContainer>
  );
};

export default DroneSpaceSimulator;
