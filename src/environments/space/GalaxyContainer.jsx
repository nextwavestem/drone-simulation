import { Canvas } from "@react-three/fiber";

import Galaxy from './Galaxy'

export const GalaxyContainer = () => {
  return (
      <Canvas >
        <Galaxy />
      </Canvas>
  );
};

GalaxyContainer.propTypes = {
};
