// Toolbar.jsx
// import React from 'react';
// import ActionButton from './ActionButton.jsx'; 
import '../css/toolbar.css'

// const formatYaw = (yaw) => {
//   return -Math.ceil(yaw * (180 / Math.PI)) % 360
// }

// export const Toolbar = ({ dronePosition, measurementControl }) => {
//   return (
//     <div className="toolbar">
//       <div className="row">
//         <div className="column">
//           <span className="coordinate">X: {Math.ceil(dronePosition.xPos)} cm </span>
//           <span className="coordinate">Z: {Math.ceil(dronePosition.zPos)} cm </span>
//         </div>
//         <div className="column">
//           <span className="coordinate">Altitude: {Math.ceil(dronePosition.yPos)} cm </span>
//           <span className="rotation">Yaw: {formatYaw(dronePosition.yRot)}°</span>
//         </div>
//         <div className="column">
//           <ActionButton onClick={measurementControl} title="Measurement" green medium />
//         </div>
//       </div>
//     </div>
//   );
// };

export const Toolbar = () => {
  return (
    <div className="toolbar">
      <div className="row">
        <div className="column">
          <span className="coordinate">X: 0 cm </span>
          <span className="coordinate">Z: 0 cm </span>
        </div>
        <div className="column">
          <span className="coordinate">Altitude: 0 cm </span>
          <span className="rotation">Yaw: 0°</span>
        </div>
        <div className="column">
          {/* <ActionButton onClick={measurementControl} title="Measurement" green medium /> */}
        </div>
      </div>
    </div>
  );
};

export default Toolbar;
