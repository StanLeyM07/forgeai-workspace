import { useEffect, useState } from "react";

export function useStreamingText(text: string, speed = 15) {
  const [displayed, setDisplayed] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);

  useEffect(() => {
    if (!text) {
      setDisplayed("");
      setIsStreaming(false);
      return;
    }
    setDisplayed("");
    setIsStreaming(true);
    let i = 0;
    const id = window.setInterval(() => {
      i += 2; // 2 chars per tick to keep it snappy
      if (i >= text.length) {
        setDisplayed(text);
        setIsStreaming(false);
        window.clearInterval(id);
      } else {
        setDisplayed(text.slice(0, i));
      }
    }, speed);
    return () => window.clearInterval(id);
  }, [text, speed]);

  return { displayed, isStreaming };
}
