/*global chrome*/
function Chrome() {
  this.port = null;
}

// Private
Chrome.prototype._listen = function(name, cb) {
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
Chrome.prototype.connect = function(name, cb) {
  chrome.runtime.onConnect.addListener(port => {
    console.log("connected to", port.name);
    this.port = port;
    this._listen(name, cb);
  });
};

Chrome.prototype.post = function(msg) {
  return this.port.postMessage(msg);
};

window.__chrome_extension__ = new Chrome();
