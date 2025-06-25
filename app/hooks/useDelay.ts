import { useState, useRef } from "react";

type UseDelayOptions = {
  delay?: number; // 기본 딜레이 시간(ms)
  once?: boolean; // true면 한 번 실행 후 비활성화
};

type UseDelayReturn = {
  runWithDelay: <T>(fn: () => Promise<T> | T) => Promise<T>;
  isDelaying: boolean;
};

export function useDelay({ delay = 1000, once = false }: UseDelayOptions = {}): UseDelayReturn {
  const [isDelaying, setIsDelaying] = useState(false);
  const hasRunOnce = useRef(false);

  const runWithDelay = async <T>(fn: () => Promise<T> | T): Promise<T> => {
    if (isDelaying || (once && hasRunOnce.current)) {
      throw new Error("Delay active or function already run once");
    }

    setIsDelaying(true);
    hasRunOnce.current = true;

    try {
      await new Promise((res) => setTimeout(res, delay));
      const result = await fn();
      return result;
    } finally {
      setIsDelaying(false);
    }
  };

  return { runWithDelay, isDelaying };
}
