// CardDetail.jsx
import { useEffect, useState, useRef, useCallback } from "react";
import { CardDetail_wrap } from "./styles";
import { animate, motion, useAnimation, useMotionValue, useMotionValueEvent } from "framer-motion";
import { newsData } from '../../data/newsData';
import CardDetail_part from "../CardDetail_part";
import homeIcon from '../../img/home_icon.svg';
import NextNews from "../../Component/NextNews";
import { useLayout } from '../../contexts/LayoutContext';

export default function CardDetail({ 
  setDragDirection, 
  detailIsDragging, 
  setDetailIsDragging, 
  isFadingOut, 
  setIsFadingOut, 
  currentIndex, 
  activeProgress, 
  isDragging, 
  setOnExpand, 
  number_y,
  onExpand
}) {
  const { System_CONFIG } = useLayout();
  // 확대카드의 데이터
  const data = newsData[currentIndex - 1];

  // 카드의 Y 값 조절
  const y = useMotionValue(0);
  
  // 카드 높이 관련
  const [containerHeight, setContainerHeight] = useState(700); // 기본값

  // 이전 Y 값 저장 (드래그 방향 감지용)
  const prevY = useRef(0);

  // 확대카드가 스크롤할 때
  useMotionValueEvent(y, "change", (latest) => {
    //아래쪽 페이지 번호 나오는 경계선
    const threshold = -containerHeight + System_CONFIG.appHeight + 390;
    if(latest > threshold) {
      number_y.set(-100);
    } else if(latest <= threshold) {
      number_y.set(20);
    }
    
    // 드래그 방향 감지
    if (latest > prevY.current) {
      setDragDirection('down');
    } else if (latest < prevY.current) {
      setDragDirection('up');
    }
    prevY.current = latest;
    
    // 확대카드를 아래로 스크롤해서 축소시킬 때
    if (latest > 0) {
      // 확대카드를 누르고 있는 동안에는 onExpand false를 잠시 미룬다
      if (!detailIsDragging.get()) {
        setOnExpand(false);
      }
      // 확대카드는 투명도만 조절하여 보이지 않지만
      setIsFadingOut(false);
      // 일반카드가 확대카드를 따라갈 수 있도록
      activeProgress.set(latest - 212);
    } 
    // 확대카드를 정상적으로 스크롤할 때
    else if (latest <= 0) {
    // 확대카드가 다시 보이도록
      setIsFadingOut(true);
    }
  });
  
  //일반카드를 위로 스크롤 하고 일반카드를 손을 놓았을때, 그때, 그 화면 위에 딱 달라붙는 모양을 만들기 위해서, 일반카드에 -212를 넣었음.
  useMotionValueEvent(activeProgress, "change", (latest) => {
    if (isDragging) {
      y.set(latest + System_CONFIG.DefaultCard_To_Top);
    }
  });

  // 다시 축소 시킬때, 확장카드의 렌더링 제거
  const cardDetailWrapUp = () => {
    if (!isFadingOut && y.get() > 0) {
      setOnExpand(false);
    }
  };

  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) {
      const height = ref.current.getBoundingClientRect().height;
      setContainerHeight(height);
    }
  }, []);

  
  return (
    <CardDetail_wrap 
      ref={ref}
      dragConstraints={{ 
        top: -containerHeight + System_CONFIG.appHeight + 390
      }} 
      drag="y" 
      dragDirectionLock 
      onDragStart={() => setDetailIsDragging(true)}
      onDragEnd={() => setDetailIsDragging(false)}
      onPointerUp={cardDetailWrapUp}
      style={{ y, opacity: isFadingOut ? 1 : 0 }}
    >
      <CardDetail_part
        key={data.id}
        id={data.id}
        data={data}
        index={currentIndex}
        y={y}
      />
      <div className="home-button">
        <img src={homeIcon} alt="home" />
      </div>
      <NextNews currentIndex={currentIndex} number_y={number_y}/>
    </CardDetail_wrap>
  );
}