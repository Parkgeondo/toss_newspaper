import { useRef, useCallback } from "react"

const useLongPressTimer = (event, delay) => {
  // 타이머 관리를 위한 Ref
  const timerRef = useRef(null);

  // 이벤트 시작
  const start = useCallback((e) => {
    timerRef.current = setTimeout(() => event(e), delay);
  }, [event, delay]);

  // 이벤트 종료
  const end = useCallback((e) => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  return { start, end };
};

export default useLongPressTimer;