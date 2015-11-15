var Orientation = require('react-native').NativeModules.Orientation;
var DeviceEventEmitter = require('react-native').DeviceEventEmitter;

var listeners = {};
var deviceEvent = "orientationDidChange";

module.exports = {
  lockToPortrait() {
    Orientation.lockToPortrait();
  },
  lockToLandscape(direction) {
    if (direction) {
      if (direction === 'LEFT') {
        Orientation.lockToLandscapeLeft();
      } else if (direction === 'RIGHT') {
        Orientation.lockToLandscapeRight();
      }
    } else {
      Orientation.lockToLandscape();
    }
  },
  unlockAllOrientations() {
    Orientation.unlockAllOrientations();
  },
  addOrientationListener(cb) {
    listeners[cb] = DeviceEventEmitter.addListener(deviceEvent,
      (body) => {
        cb(body.orientation);
      });
  },
  removeOrientationListener(cb) {
    if (!listeners[cb]) {
      return;
    }
    listeners[cb].remove();
    listeners[cb] = null;
  }
}
