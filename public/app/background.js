/*global chrome*/
function Background() {
  this.port = null;
}

// Private
Background.prototype._listen = function(name, cb) {
  if (!this.port) {
    throw "Error: not connected";
  }
  if (!name) {
    throw "Error: no name supplied";
  }
  if (this.port.name === name) {
    this.port.onMessage.addListener(cb);
  }
};

// Public
Background.prototype.connect = function(name, cb) {
  chrome.runtime.onConnect.addListener(port => {
    console.log("connected to", port.name);
    this.port = port;
    this._listen(name, cb);
  });
};

Background.prototype.post = function(msg) {
  return this.port.postMessage(msg);
};

window.background = new Background();
