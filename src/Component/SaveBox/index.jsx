import React, { useRef, useState } from "react";
import { SaveBox_front, CircleNews_wrap, Folder, Folder_back } from "./styles";
import CircleNewsRow from "../CircleNews";
import { animate, useMotionValue, useMotionValueEvent,useTransform } from "framer-motion";

export default function SvgMorphToggle({ savedNews, temSavedNews, box_progress }) {
  const [width, setWidth] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const folderRef = useRef(null);
  const folderBackRef = useRef(null);

  const rotateX = useMotionValue(0); // 🎯 핵심 포인트
  const transform = useTransform(rotateX, (r) => `translateX(-50%) rotateX(${r}deg)`);

  const [zIndex, setZIndex] = useState(100); // 기본값은 원래 계층


  useMotionValueEvent(box_progress, "change", (latest) => {
    if(box_progress.get() < 0){
      setZIndex(0)
    }else {
      setZIndex(100)
    }
    if (latest >= 0.01 && !isOpen) {
      setIsOpen(true);
      const openAnimation = async () => {
        const widthAnimation = animate(
          [folderRef.current, folderBackRef.current],
          { width: 319, height: 90, bottom: 40 },
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
      openAnimation();
    } else if (latest < 0.01 && isOpen) {
      setIsOpen(false);
      const closeAnimation = async () => {
        await animate(rotateX, 0, {
          type: "spring",
          stiffness: 800,
          damping: 10,
          mass: 0.3,
          bounce: 0.6
        });

        await animate(
          [folderRef.current, folderBackRef.current],
          { width: 100, height: 40, bottom: 75 },
          { type: "spring", stiffness: 100, duration: 0.2, mass: 0.3, bounce: 0 }
        );
      };
      closeAnimation();
    }
  });

  return (
    <>
      <Folder ref={folderRef} style={{ transform, zIndex }}>
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
