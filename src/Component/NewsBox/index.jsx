import { NewsBoxWapper } from "./styles";
import { NewsBoxline } from "./styles";
import { Ripple } from "./styles";
import { Ripplearea } from "./styles";
import { useMotionValue, animate, AnimatePresence } from 'framer-motion';
import { useState,useRef,useEffect,useCallback } from "react";
import useLongPressTimer from "../../utile/useLongPressTimer";

const NewsBox = ({ publisher, title, category, subTitle1, subTitle2, subTitle3, content1, content2, content3, date, smallImage, savedNews, setSavedNews, id, temSavedNews, setTemSavedNews , setProgress}) => {
  
  //원형 그룹
  const [ripples, setRipples] = useState([]);
  
  //원형 크기 조절 함수
  const scale = useMotionValue(1);

  //원형 타이머 관리 Ref
  const timerRef = useRef(null);

  //원형 만들기 함수
  const createRipple = (e) => {
    const rect = e.currentTarget.parentElement.getBoundingClientRect();
    const size = 600;
    const newRipple = {
      id: Date.now(),
      x: e.clientX - rect.left - size / 2 - 14,
      y: e.clientY - rect.top - size / 2 - 16,
    };
    setRipples((prev) => [...prev, newRipple]);
    animate(scale, 0.95, { type: 'spring', stiffness: 300, damping: 30 });
  };

  // 원형 사라짐
  const removeRipple = (e) => {
    setTimeout(() => {
      setRipples((prev) => prev.slice(1));
    }, 100);
    animate(scale, 1, { type: 'spring', stiffness: 300, damping: 30 });
  }; 

  // 커스텀 훅 타이머 실제로 뉴스 적용하는 부분
  const handleSaveNews = useCallback(() => {
    setSavedNews(prev =>
      prev.includes(id) ? [...prev] : [...prev, id]
    );
    setTemSavedNews([])
  }, [setSavedNews, id]);
  const { start, end } = useLongPressTimer(handleSaveNews, 850);
  //

  //타이머가 얹어지면 신문 저장하기
  // 임시 그래프 뉴스를 보여주는 부분
  const handleTemSavedtNews = useCallback(() => {
    setTemSavedNews(prev =>
      [id])
      setProgress(1);
  },[setTemSavedNews, id]);
  const { start: start_tem, end: end_tem } = useLongPressTimer(handleTemSavedtNews, 300);

  return (
    <>
      <NewsBoxline>
        <Ripplearea
          onMouseDown={(e)=>{createRipple(e); start(e); start_tem(e);}}
          onMouseUp={(e)=>{removeRipple(e); end(e); end_tem(e); setTemSavedNews([]); setProgress(0);}}
          onMouseLeave={removeRipple}
          style={{ scale }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}>
        <NewsBoxWapper>
          <AnimatePresence>
            {ripples.map((ripple) => (
                <Ripple
                  key={ripple.id}
                  initial={{ scale: 0.1, opacity: 0.1 }}
                  animate={{ scale: 2.5, opacity: 0.1 }}
                  exit={{ scale: 2.5, opacity: 0 }}
                  transition={{ duration: 0.7, ease: 'easeOut' }}
                  style={{ left: ripple.x, top: ripple.y }}
                />
            ))}
          </AnimatePresence>
          <img src={smallImage} className="smallImage" alt=""/>
          <div className="text">
            <div className="publisher">
              {/* <img src="" alt="" /> */}
              {publisher}
            </div>
            <div className="title">
              {title}
            </div>
            <div className="body">
              {content1}
            </div>
            <div className="tags">
              <div className="category">{category}</div>
              <div className="day">{date}</div>
            </div>
          </div>
        </NewsBoxWapper>
        </Ripplearea>
      </NewsBoxline>
    </>
  );
};

export default NewsBox;