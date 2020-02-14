import React, { useCallback } from "react";
import styled from "styled-components";
import useChrome from "./hooks/useChrome";

const App: React.FC = () => {
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
      <h1>CRA3 Typescript Extension</h1>
      <button type="button" onClick={handleClick}>
        Click Me
      </button>
    </Extension>
  );
};

const Extension = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 250px;
  height: 100px;

  h1 {
    margin-bottom: 20px;
  }

  button {
    padding: 5px;
    background: blue;
    color: white;
  }
`;

export default App;
