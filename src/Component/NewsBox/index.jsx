import { NewsBoxWapper } from "./styles";
import { NewsBoxline } from "./styles";
import { Ripple } from "./styles";
import { Ripplearea } from "./styles";
import { useMotionValue, animate, AnimatePresence, motion } from 'framer-motion';
import { useState, useRef, useCallback } from "react";
import useLongPressTimer from "../../utile/useLongPressTimer";
import WavyShader from "../../utile/wavyShader";
import { useRipple } from "../../utile/useRipple";

const NewsBox = ({
  publisher,
  publisherImg,
  title,
  category,
  content1,
  date,
  smallImage,
  setSavedNews,
  id,
  setTemSavedNews,
  setProgress,
  index,
  savedNews
}) => {

  //isRemoved 터치 누르고 중간에 뗄때, 추가 및 삭제를 중단
  const isRemovedRef = useRef(false);

  //현재 Box가 저장되어 있는지 확인
  const isSaved = savedNews.includes(id);

  //ripple을 추가하는 함수
  const { ripples, scale, createRipple, removeRipple } = useRipple();

  //클릭한 뉴스를 savedNews 배열에 저장하는 함수, isRemove가 true -> 이미 저장되어 있던 뉴스를 삭제, false -> 저장되어 있지 않은 뉴스를 추가
  const handleSaveNews = useCallback(() => {
    setSavedNews((prev) =>
      isRemovedRef.current
        ? prev.filter(newsId => newsId !== id)
        : [...prev, id]
    );
    setTemSavedNews([]);
    setProgress(0);
    isRemovedRef.current = false;
  }, [setSavedNews, setTemSavedNews, setProgress, id]);

  const { start, end } = useLongPressTimer(handleSaveNews, 850);

  const handleTempVisual = useCallback(() => {
    if (isSaved) {
      setSavedNews(prev => prev.filter(newsId => newsId !== id));
      isRemovedRef.current = true;
      setProgress(-1);
    } else {
      isRemovedRef.current = false;
      setProgress(1);
    }
    setTemSavedNews([id]);
  }, [isSaved, setSavedNews, setTemSavedNews, setProgress, id]);

  const { start: startTemp, end: endTemp } = useLongPressTimer(handleTempVisual, 300);

  const cancelDelete = useCallback(() => {
    setTemSavedNews([]);
    setProgress(0);
    if (isRemovedRef.current) {
      setSavedNews((prev) => [...prev, id]);
      isRemovedRef.current = false;
    }
  }, [setTemSavedNews, setSavedNews, id, setProgress]);

  const handleMouseDown = (e) => {
    createRipple(e);
    start(e);
    startTemp(e);
  };

  const handleMouseUp = (e) => {
    removeRipple();
    end(e);
    endTemp(e);
    cancelDelete();
  };

  return (
    <NewsBoxline>
      <AnimatePresence>
        {isSaved && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            style={{ position: "absolute", inset: 0, zIndex: 0 }}
          >
            <WavyShader />
          </motion.div>
        )}
      </AnimatePresence>

      <Ripplearea
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={removeRipple}
        style={{ scale }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
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
          <img src={smallImage} className="smallImage" alt="" />
          <div className="text">
            <div className="publisher">
              <img src={publisherImg} alt="" />
              {publisher}
            </div>
            <div className="title">{title}</div>
            <div className="body">{content1}</div>
            <div className="tags">
              <div className="category">{category}</div>
              <div className="day">{date}</div>
            </div>
          </div>
        </NewsBoxWapper>
      </Ripplearea>
    </NewsBoxline>
  );
};

export default NewsBox;