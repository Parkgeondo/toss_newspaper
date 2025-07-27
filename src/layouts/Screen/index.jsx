import Header from '../../Component/Header';
import { useEffect, useState } from 'react';
import AnimatedWave from '../../utile/wavyShader _background';
import FloatingNewsCards from '../FloatingNewsCards';
import { useMotionValue } from 'framer-motion';
import CardDetail from '../../Component/CardDetail';
import SaveBox from "../../Component/SaveBox";
import Indicator from '../../Component/Indicator';
import { NextNewsNumber } from '../../Component/NextNews';

function Layout({ setOnExpand, onExpand, isSavedNewsMode, setIsSavedNewsMode }) {
  
  // 저장된 뉴스들
  const [savedNews, setSavedNews] = useState([]);
  // 잠시 저장되는 동안만 잠시 표현되는 뉴스(0724 지금은 안 쓰는 듯)
  const [temSavedNews, setTemSavedNews] = useState([]);

  // 현재 활성 카드의 progress만 전역으로 관리
  // 일반 카드와 확장 카드가 서로 공유하는 Y값.
  const activeProgress = useMotionValue(0);

  // 일반 카드에서 드래그를 하고 있다면 true, 아니면 false. 용도는 일반카드에서 손을 놓을 시 화면 위쪽에 고정되는데,
  // 그때 확장카드는 progress의 변형으로 인해 따라가는 것을 방지함.
  const [isDragging, setIsDragging] = useState(false);

  //확장 카드에서 드래그를 하고 있다면 true, 아니면 false. 용도는 확대카드를 아래로 드래그 할때, 애니메이션이 재생되지 않도록 하기 위함.
  const detailIsDragging = useMotionValue(false);
  //확장카드의 투명도 조절
  const [isFadingOut, setIsFadingOut] = useState(true);
  // 현재 화면 가운데에 있는 카드가 몇번인지
  const [currentIndex, setCurrentIndex] = useState(1);
  // 페이지 숫자 Y값
  const number_y = useMotionValue(0);

  // 드래그 하는 방향. 카드 넗이 애니메이션을 적용하는 dragUp에 사용됨
  const [dragDirection, setDragDirection] = useState(null);
  
  return (
    <>
      <Indicator progress={activeProgress} currentIndex={currentIndex} />
      <NextNewsNumber number_y={number_y}/>
      
      {onExpand && (
        <CardDetail
          onExpand={onExpand}
          dragDirection={dragDirection}
          setDragDirection={setDragDirection}
          detailIsDragging={detailIsDragging}
          setDetailIsDragging={(value) => detailIsDragging.set(value)}
          isFadingOut={isFadingOut}
          setIsFadingOut={setIsFadingOut}
          currentIndex={currentIndex}
          isDragging={isDragging}
          setIsDragging={setIsDragging}
          setOnExpand={setOnExpand}
          id={currentIndex}
          activeProgress={activeProgress}
          number_y={number_y}
        />
      )}

      <FloatingNewsCards
        dragDirection={dragDirection}
        setDragDirection={setDragDirection}
        isFadingOut={isFadingOut}
        setIsFadingOut={setIsFadingOut}
        isDragging={isDragging}
        setIsDragging={setIsDragging}
        setTemSavedNews={setTemSavedNews}
        savedNews={savedNews}
        setSavedNews={setSavedNews}
        activeProgress={activeProgress}
        setOnExpand={setOnExpand}
        onExpand={onExpand}
        currentIndex={currentIndex}
        setCurrentIndex={setCurrentIndex}
        isSavedNewsMode={isSavedNewsMode}
      />
      
      <Header isSavedNewsMode={isSavedNewsMode} setIsSavedNewsMode={setIsSavedNewsMode}/>
      {!isSavedNewsMode && <SaveBox 
        isSavedNewsMode={isSavedNewsMode} 
        setIsSavedNewsMode={setIsSavedNewsMode} 
        savedNews={savedNews} 
        temSavedNews={temSavedNews} 
        progress={activeProgress}
        currentIndex={currentIndex}
      />
      }
      <AnimatedWave isSavedNewsMode={isSavedNewsMode} />
    </>
  );
}

export default Layout;

