const VALID_ACTION_TYPES = ['opened', 'edited'];

var EventHandler = function (data) {
  this.data = data;
};

EventHandler.validateActionType = function (action) {
  if (VALID_ACTION_TYPES.indexOf(action) !== -1) {
    return true;
  };
  return false;
};

EventHandler.prototype.opened = function () {
  console.log('Hi, this is Opened');
};

EventHandler.prototype.edited = function () {
  console.log('Hi, this is Edited');
};

module.exports = EventHandler;
