## Drone Simulation Issues Fixed

Status: All listed issues addressed and fixed.

### Issues Resolved
- Commands to fly on the XYZ axis do not complete the task.
- Drone does not land when given the landing code.
- Drone takes off on its own after completing a route.
- Drone flies in the opposite direction after a correct flight command.
- Drone does not fly left or right; it moves unpredictably.
- Drone veers off in its own direction.
- Drone stops moving after receiving a command.
- Drone does not reset/relaunch using the button.
- Drone pauses midair or continues flying without stopping.
- Drone keeps going forward instead of turning left or right.

### Verification (Quick Test)
Use a simple Blockly sequence:
Takeoff → Fly Forward → Fly Left → Yaw Left → Fly Forward → Land

Expected result: the drone follows the path, turns correctly, and lands without auto-takeoff.
