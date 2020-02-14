# Chrome Extension (built with TypeScript + Create React App + Hooks)

> This project is a boilerplate project to allow you to quickly build chrome extensions using TypeScript and React.

## Building

1. Clone repo
2. `yarn`
3. `yarn start:dev` to use the regular watch or `yarn start` to run the build task in watch mode (I recommend doing both)

## Installation

1. Complete the steps to build the project above
2. Go to [_chrome://extensions_](chrome://extensions) in Google Chrome
3. With the developer mode checkbox ticked, click **Load unpacked extension...** and select the _build_ folder from this
   repo

## Semantics

This version uses the latest 2020 chrome extension standards by using post message to pass messages between app and extension.

`App.tsx`

> This code is executed in the extension popup

```jsx
import React, { useCallback } from "react";
import useChrome from "./hooks/useChrome";

const App: React.FC = () => {
  const [onMessage, postMessage] = useChrome("background");

  const handleClick = useCallback(() => {
    postMessage({ type: "click", message: "clicked" });
  }, [postMessage]);

  onMessage(({ type, message }) => {
    switch (type) {
      case "init":
        //...
        break;
      default:
      //...
    }
  });

  return (
    <div>
      <h1>CRA3 Typescript Extension</h1>
      <button type="button" onClick={handleClick}>
        Click Me
      </button>
    </div>
  );
};
```

`background.js`

> This code is executed in the active tab

```js
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
```
