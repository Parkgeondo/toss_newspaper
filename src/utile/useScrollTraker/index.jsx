import { useEffect, useCallback } from "react";
import useLongPressTimer from "../useLongPressTimer";
import Interpolation from "../interpolation";
import Syn from "../syn";

// 1. 문제점. 각 두개의 페이지가 아직 스크롤이 되지 않았을때, tab이 동기화 되어있지 않은 점
// 2. 뉴스는 스크롤이 되어 있고, 저장된 뉴스는 스크롤이 되어있지 않을때, 저장된 뉴스로 이동시, 저장된 뉴스 페이지는 탭은 최소화하고 스크롤되어 있는 문제점일시
// 2-1. 탭을 눌렀을때, 혹은 가로 스크롤을 했을때, 스크롤을 알맞게 변환
// 2-2. 변환된 화면에 따라서 스크롤은 알아서 변환

const getScrollTop = (ref) => ref?.current?.scrollTop ?? 0;

const ScrollTracker = ({ scrollRef, newsScrollbarRef, savedScrollbarRef, setScroll, otherRef, id, setTabControl, scroll, dragging, tabs, selectedTab}) => {
  // ✅ 스크롤 멈췄을 때 호출되는 함수
  const onScrollEnd = useCallback(() => {
    const scrollTop = getScrollTop(scrollRef);


    // 탭 부분이 자연스럽게 애니메이션 될 수 있도록 제작
    if (scrollTop < 24 && scrollTop >= 0) {
      scrollRef.current.scrollTo({ top: 0}); 
    } else if (scrollTop >= 24 && scrollTop < 48) {
      scrollRef.current.scrollTo({ top: 48}); 
    }


  }, []);

  // ✅ 타이머 관리 (롱프레스 로직 재활용)
  const { start: startScrollTimer, end: endScrollTimer } = useLongPressTimer(onScrollEnd, 50);

  // ✅ 스크롤 이벤트 핸들러 스크롤을 했을때, 전역으로 스크롤 값을 보내줌. 스크롤 했을때 작동
  const handleScroll = useCallback(() => {
    const scrollTop = getScrollTop(scrollRef);

    //스크롤 값을 전역 변수로 변경
    if (id === 0) {
      setScroll((prev) => [scrollTop, prev[1]]);
    } else if (id === 1) {
      setScroll((prev) => [prev[0], scrollTop]);
    }
    
    //두 페이지의 탭 위치를 스크롤 할때마다 동기화
    Syn(scroll, newsScrollbarRef, savedScrollbarRef, selectedTab, tabs)

    // 타이머 리셋 (스크롤 멈춤 감지)
    endScrollTimer();
    startScrollTimer();
  }, [id, setScroll, scrollRef, startScrollTimer, endScrollTimer]);

  // ✅ 스크롤 이벤트 등록 및 해제
  useEffect(() => {
    if (!scrollRef?.current) return;

    const scrollEl = scrollRef.current;
    scrollEl.addEventListener("scroll", handleScroll);

    return () => {
      scrollEl.removeEventListener("scroll", handleScroll);
    };
  }, [scrollRef, handleScroll]);

  return null; // DOM 요소 반환 필요 없으므로 null 처리
};

export default ScrollTracker;
