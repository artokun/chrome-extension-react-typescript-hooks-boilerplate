import React, { useCallback } from "react";
import styled from "styled-components";
import useChrome from "./hooks/useChrome";

function App() {
  const [onMessage, postMessage] = useChrome("crawler");

  const handleClick = useCallback(() => {
    postMessage({ type: "click", message: "clicked" });
  }, [postMessage]);

  onMessage(({ type, message }) => {
    switch (type) {
      case "init":
        console.log(message);
        break;
      default:
        console.error("unknown type:", type);
    }
  });

  return (
    <Extension>
      <button type="button" onClick={handleClick}>
        Click Me
      </button>
    </Extension>
  );
}

const Extension = styled.main`
  display: flex;
`;

export default App;
