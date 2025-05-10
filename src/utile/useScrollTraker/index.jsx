import { useEffect } from "react";

const ScrollTracker = ({ scrollRef, setScroll }) => {
  useEffect(() => {
    if (!scrollRef?.current) return;

    const scrollEl = scrollRef.current;

    const handleScroll = () => {
      const scrollTop = scrollEl.scrollTop; // ✅ 현재 스크롤 위치
      const scrollHeight = scrollEl.scrollHeight - scrollEl.clientHeight; // ✅ 스크롤 가능한 전체 높이

      const ratio = scrollHeight > 0 ? scrollTop / scrollHeight : 0;
      setScroll(scrollTop);

      console.log(`현재 스크롤 위치: ${scrollTop}px`);
      console.log(`스크롤 비율: ${Math.round(ratio * 100)}%`);
    };

    scrollEl.addEventListener("scroll", handleScroll);

    return () => {
      scrollEl.removeEventListener("scroll", handleScroll);
    };
  }, [scrollRef, setScroll]);

  return <div></div>;
};

export default ScrollTracker;
