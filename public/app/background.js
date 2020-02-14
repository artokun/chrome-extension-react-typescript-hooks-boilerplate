/*global __chrome_extension__*/
const bg = __chrome_extension__;

bg.connect("background", ({ type, message }) => {
  switch (type) {
    case "init":
      this.post({
        type: "init",
        message: "connected to" + bg.port.name
      });
      break;
    case "click":
      console.log(message);
      break;
    default:
      console.error("unknown type:", type);
  }
});
