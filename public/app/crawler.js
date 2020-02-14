/*global background*/

background.connect("crawler", ({ type, message }) => {
  switch (type) {
    case "init":
      this.post({
        type: "init",
        message: "connected to" + background.port.name
      });
      break;
    case "click":
      console.log(message);
      break;
    default:
      console.error("unknown type:", type);
  }
});
