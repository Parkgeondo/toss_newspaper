import { useEffect } from "react";

//첫번째는 ref, 두번째는 실제로 변하는 setState
const ScrollTracker = ({scrollRef, setScroll}) => {
  useEffect(()=>{
    if (!scrollRef?.current?.scrollerElement) return;

    const scrollEl = scrollRef.current.scrollerElement;

    const handleScroll = () => {

        //스크롤한 정도
      const scrollTop = scrollEl.scrollTop;

      //스크롤할 전체
      const scrollHeight = scrollEl.scrollHeight - scrollEl.clientHeight;

      //스크롤 비율
      const ratio = scrollHeight > 0 ? scrollTop / scrollHeight : 0;
      setScroll(scrollTop)

      //38px에서 달깍
      //0에서 19는 0으로 20에서 38까지는 38로 점진적으로 이동
    }
    scrollEl.addEventListener("scroll", handleScroll);
  },[scrollRef])
  
  return (
    <div></div>
  )
}

export default ScrollTracker;