import { useEffect, useRef, useState } from "react";

/**
 * useTimer - A simple timer hook.
 * @param intervalMs - Interval in milliseconds (default: 1000)
 * @param autoStart - Whether to start the timer automatically (default: true)
 * @returns [time, { start, stop, reset }]
 */
export function useTimer(intervalMs: number = 1000, autoStart: boolean = true) {
  const [time, setTime] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const start = () => {
    if (intervalRef.current === null) {
      intervalRef.current = setInterval(() => {
        setTime((t) => t + 1);
      }, intervalMs);
    }
  };

  const stop = () => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const reset = () => setTime(0);

  useEffect(() => {
    if (autoStart) start();
    return stop;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [intervalMs, autoStart]);

  return [time, { start, stop, reset }] as const;
}

export default useTimer;
