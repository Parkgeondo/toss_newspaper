import { useRef, useCallback } from "react"

const useLongPressTimer = (event,delay) => {
  //관리를 위한 Ref
  const timerRef = useRef(null);

  //이벤트 시작
  const start = useCallback(()=>{
    timerRef.current = setTimeout(event, delay)
  },[event, delay])

  const end = useCallback(()=>{
    if(timerRef.current){
        clearTimeout(timerRef.current)
        timerRef.current = null;
    }
  })
  return{start,end};
}

export default useLongPressTimer;