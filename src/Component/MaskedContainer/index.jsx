import { motion, useMotionValue, useTransform, useScroll, useMotionValueEvent } from "framer-motion";
import { useEffect, useRef, useState, useMemo, useCallback, use } from "react";
import Indicator_array from "../../layouts/Indicator_array";
import { MaskedContainer_wrap } from "./styles";
import SavedNews from '../../layouts/SavedNews/styles';
import { useLayout } from "../../contexts/LayoutContext";

function MaskedContainer({ children, isSavedNewsMode, savedNews, setProgressGraph, progressGraph }) {
  const maskRadius = useMotionValue(0);
  const opacity = useMotionValue(0);

  // 스크롤 제한
  const [scrollValue, setScrollValue] = useState(0);
  const { System_CONFIG } = useLayout();



  // 컴포넌트가 마운트될 때 즉시 애니메이션 실행
  useEffect(() => {
    maskRadius.set(800);
    opacity.set(1);
  }, [maskRadius, opacity]);

  const DragY = useMotionValue(0);

  useMotionValueEvent(DragY, "change", (latestValue) => {
    // 각 뉴스별 드래그 진행률 계산
    const dragProgress = savedNewsHeight.map((height, index) => {
      // 현재 인덱스까지의 누적 높이 계산
      const cumulativeHeight = savedNewsHeight.slice(0, index + 1).reduce((sum, h) => sum + h, 0);
      const previousCumulativeHeight = savedNewsHeight.slice(0, index).reduce((sum, h) => sum + h, 0);
      
      // 현재 드래그 위치 (절댓값)
      const currentDragPosition = Math.abs(latestValue);
      
      if (currentDragPosition <= previousCumulativeHeight) {
        // 아직 이 뉴스에 도달하지 않음
        return 0;
      } else if (currentDragPosition >= cumulativeHeight) {
        // 이 뉴스를 완전히 지나침
        return 1;
      } else {
        // 이 뉴스 범위 내에서 진행률 계산
        const progressInThisNews = (currentDragPosition - previousCumulativeHeight) / (height - System_CONFIG.appHeight);
        return Math.min(Math.max(progressInThisNews, 0), 1); 
      }
    });
    setProgressGraph(dragProgress);
  });

  //각 저장된 뉴스의 높이
  const [savedNewsHeight, setSavedNewsHeight] = useState([]);

  const maskImage = 'radial-gradient(circle at 50% calc(100% - 95px), black 800px, transparent 800px)';

  return (
    <MaskedContainer_wrap
      initial={{ 
        maskImage: 'radial-gradient(circle at 50% calc(100% - 95px), black 0px, transparent 0px)',
        background: '#D3D1E5'
      }}
      animate={{ 
        maskImage: 'radial-gradient(circle at 50% calc(100% - 95px), black 800px, transparent 800px)',
        background: isSavedNewsMode ? '#20262A' : '#D3D1E5'
      }}
      exit={{ 
        maskImage: 'radial-gradient(circle at 50% calc(100% - 95px), black 0px, transparent 0px)',
        background: '#D3D1E5'
      }}
      transition={{
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1]
      }}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        WebkitMaskImage: maskImage,
        WebkitMaskRepeat: 'no-repeat',
        maskImage,
        maskRepeat: 'no-repeat',
        zIndex: 100,
      }}
    >

    <Indicator_array progressGraph={progressGraph} savedNews={savedNews}/>
    {isSavedNewsMode && <div className="gradiant_2"></div>}

      <motion.div
        initial={{ y: 130, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 130, opacity: 0 }}
        transition={{ 
          duration: 0.6,
          ease: [0.25, 0.1, 0.25, 1],
          exit: {
            delay: 0.8,
            duration: 0.6,
            ease: [0.25, 0.1, 0.25, 1]
          }
        }}
        drag="y"
        dragElastic={0.1}
        dragConstraints={{ top: -scrollValue + 815, bottom: 0}}
        style={{ y: DragY }}
        >
        <SavedNews
          savedNewsHeight={savedNewsHeight}
          setSavedNewsHeight={setSavedNewsHeight}
          setScrollValue={setScrollValue}
          setProgressGraph={setProgressGraph} 
          savedNews={savedNews}
        />
      </motion.div>
    </MaskedContainer_wrap>
  );
}

export default MaskedContainer; 