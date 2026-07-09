import { useStreamingText } from "@/hooks/useStreamingText";

export function StreamingText({
  text,
  speed = 15,
  className,
}: {
  text: string;
  speed?: number;
  className?: string;
}) {
  const { displayed, isStreaming } = useStreamingText(text, speed);
  return (
    <span className={className}>
      <span className="whitespace-pre-wrap">{displayed}</span>
      {isStreaming && <span className="stream-cursor" aria-hidden />}
    </span>
  );
}
