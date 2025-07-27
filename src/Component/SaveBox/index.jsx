import React, { useEffect, useRef, useState } from "react";
import { SaveBox_front, CircleNews_wrap, Folder, Folder_back } from "./styles";
import CircleNewsRow from "../CircleNews";
import { animate, useMotionValue, useMotionValueEvent, useTransform } from "framer-motion";

export default function SaveBox({ 
  isSavedNewsMode, 
  setIsSavedNewsMode, 
  savedNews, 
  temSavedNews, 
  progress,
  currentIndex
}) {
  const [width, setWidth] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const folderRef = useRef(null);
  const folderBackRef = useRef(null);

  // 회전 애니메이션을 위한 MotionValue
  const rotateX = useMotionValue(0);
  const transform = useTransform(rotateX, (r) => `translateX(-50%) rotateX(${r}deg)`);

  const [zIndex, setZIndex] = useState(100);

  const boxProgress = useMotionValue(progress);

  // progress 값 변경 감지
  useMotionValueEvent(progress, "change", (latest) => {
    boxProgress.set(latest);

  // progress 값 다시 0으로 돌아가서 박스가 닫히도록
    if (boxProgress.get() === 550) {
      boxProgress.set(0);
    }
  });

  const closeAnimation = async () => {
    if (!folderRef.current || !folderBackRef.current) return;
    
    await animate(rotateX, 0, {
      type: "spring",
      stiffness: 800,
      damping: 10,
      mass: 0.3,
      bounce: 0.6
    });

    await animate(
      [folderRef.current, folderBackRef.current],
      { width: 100, height: 40, bottom: 75, borderRadius: 12, WebkitMaskPosition: "50% 50%", maskPosition: "50% 50%"},
      { type: "spring", stiffness: 100, duration: 0.2, mass: 0.3, bounce: 0 }
    );
  };

  const openAnimation = async () => {
    if (!folderRef.current || !folderBackRef.current) return;
    
    const widthAnimation = animate(
      [folderRef.current, folderBackRef.current],
      { 
        width: 319, 
        height: 90, 
        bottom: 40, 
        borderRadius: 12,
        WebkitMaskPosition: "50% 0%",
        maskPosition: "50% 0%"
      },
      { type: "spring", stiffness: 100, duration: 0.2, mass: 0.3, bounce: 0 }
    );
    setTimeout(() => {
      animate(rotateX, -45, {
        type: "spring",
        stiffness: 800,
        damping: 10,
        mass: 0.3,
        bounce: 0.6
      });
    }, 200);
    await widthAnimation;
  };

  const exitAnimation = async () => {
    await openAnimation();
    setTimeout(() => {
      closeAnimation();
    }, 100);
  }

  // 이전 savedNews 상태를 추적하기 위한 ref
  const prevSavedNewsRef = useRef(savedNews);

  //저장 취소하기 버튼 눌렀을때 저장된 뉴스 열고 닫히도록 애니메이션
  useEffect(() => {
    // 처음 렌더링이 아니고, savedNews가 실제로 변경된 경우에만 실행
    if (prevSavedNewsRef.current.length !== savedNews.length && !savedNews.includes(currentIndex)) {
      exitAnimation();
    }
    // 현재 상태를 이전 상태로 업데이트
    prevSavedNewsRef.current = savedNews;
  }, [savedNews, currentIndex]);

  // boxProgress 값 변경에 따른 애니메이션 처리
  useMotionValueEvent(boxProgress, "change", (latest) => {
    // z-index 조정
    if (boxProgress.get() < 0) {
      setZIndex(0);
    } else {
      setZIndex(100);
    }
    // 폴더 열기 애니메이션
    if (latest >= 0.01 && !isOpen) {
      setIsOpen(true);
      openAnimation();
    } 
    // 폴더 닫기 애니메이션
    else if (latest < 0.01 && isOpen) {
      setIsOpen(false);
      closeAnimation();
    }
  });

  const changeMode = async () => {
    if (!isSavedNewsMode && savedNews.length !== 0) {
      setIsSavedNewsMode(true);
      openAnimation();
    } else {
      setIsSavedNewsMode(false);
      closeAnimation();
    }
  }

  return (
    <>
      <Folder onClick={() => changeMode()} ref={folderRef} style={{ transform, zIndex }}>
        <CircleNews_wrap>
          <p
            style={{
              maxWidth: "180px",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis"
            }}
          >
            {savedNews.length ? "저장된 뉴스" : "뉴스를 여기로 끌어 저장"}
          </p>
          <CircleNewsRow
            width={width}
            setWidth={setWidth}
            savedNews={savedNews}
            temSavedNews={temSavedNews}
          />
        </CircleNews_wrap>
      </Folder>
      <Folder_back ref={folderBackRef} className="folder-back" />
    </>
  );
}
