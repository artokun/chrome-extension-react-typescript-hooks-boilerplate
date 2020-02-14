import { useState, useCallback, useEffect } from "react";

interface Payload {
  type: string;
  message: any;
}
type OnMessage = (callback: (payload: Payload) => void) => void;
type PostMessage = (payload: Payload) => void;

export default function(portName: string) {
  const [port, setPort] = useState<chrome.runtime.Port>();

  const onMessage = useCallback(
    callback =>
      port
        ? port.onMessage.addListener(callback)
        : callback({ type: "init", message: "client" }),
    [port]
  );

  const postMessage = useCallback(
    payload =>
      port ? port.postMessage(payload) : console.log("post not ready"),
    [port]
  );

  useEffect(() => {
    if (port) {
      return () => {
        port.disconnect();
      };
    } else {
      setPort(chrome.runtime.connect("", { name: portName || "background" }));
    }
  }, [port, portName]);

  return [onMessage, postMessage] as [OnMessage, PostMessage];
}
