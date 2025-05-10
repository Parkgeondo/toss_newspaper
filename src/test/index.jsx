import { useState, useRef, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import "./styles.css";

const tabs = ["추천", "팔로잉"];

export default function App() {
  const [selectedTab, setSelectedTab] = useState(0);
  const [isTabShrunk, setIsTabShrunk] = useState(false);
  const [lockScroll, setLockScroll] = useState(false);
  const controls = useAnimation();
  const contentRef = useRef(null);

  const handleScroll = () => {
    const scrollTop = contentRef.current.scrollTop;

    if (scrollTop > 50 && !isTabShrunk) {
      setLockScroll(true); // 🚫 스크롤 잠금 시작
      setIsTabShrunk(true);
    } else if (scrollTop === 0 && isTabShrunk) {
      setIsTabShrunk(false);
    }
  };

  useEffect(() => {
    if (isTabShrunk) {
      // Shrinking 애니메이션 끝나고 스크롤 잠금 해제
      const timeout = setTimeout(() => setLockScroll(false), 300); // 애니메이션 시간에 맞춤
      return () => clearTimeout(timeout);
    }
  }, [isTabShrunk]);

  const handleTabClick = (index) => {
    setSelectedTab(index);
    controls.start({ x: -375 * index });
  };

  return (
    <div className="app">
      {/* Tab Bar */}
      <motion.div
        className="tab-bar"
        animate={{ scale: isTabShrunk ? 0.7 : 1, y: isTabShrunk ? -30 : 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        {tabs.map((tab, idx) => (
          <div
            key={tab}
            className={`tab-item ${selectedTab === idx ? "active" : ""}`}
            onClick={() => handleTabClick(idx)}
          >
            {tab}
          </div>
        ))}
        <motion.div
          className="underline"
          animate={{ x: selectedTab * 188 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        />
      </motion.div>

      {/* Content Area */}
      <div
        className="content-wrapper"
        ref={contentRef}
        onScroll={!lockScroll ? handleScroll : null} // 🚫 잠금 시 스크롤 무시
        style={{ overflowY: lockScroll ? "hidden" : "scroll" }} // CSS로도 이중 잠금
      >
        <motion.div
          className="content-slider"
          animate={controls}
          drag="x"
          dragConstraints={{ left: -375, right: 0 }}
          onDragEnd={(e, info) => {
            if (info.offset.x < -150) {
              handleTabClick(1);
            } else {
              handleTabClick(0);
            }
          }}
        >
          <div className="page">📢 추천 피드 콘텐츠
          📢 추천 피드 콘텐츠📢 추천 피드 콘텐츠📢 추천 피드 콘텐츠📢 추천 피드 콘텐츠📢 추천 피드 콘텐츠📢 추천 피드 콘텐츠📢 추천 피드 콘텐츠📢 추천 피드 콘텐츠
          📢 추천 피드 콘텐츠📢 추천 피드 콘텐츠📢 추천 피드 콘텐츠📢 추천 피드 콘텐츠📢 추천 피드 콘텐츠📢 추천 피드 콘텐츠📢 추천 피드 콘텐츠📢 추천 피드 콘텐츠
          📢 추천 피드 콘텐츠📢 추천 피드 콘텐츠📢 추천 피드 콘텐츠📢 추천 피드 콘텐츠📢 추천 피드 콘텐츠📢 추천 피드 콘텐츠📢 추천 피드 콘텐츠📢 추천 피드 콘텐츠
          📢 추천 피드 콘텐츠📢 추천 피드 콘텐츠📢 추천 피드 콘텐츠📢 추천 피드 콘텐츠📢 추천 피드 콘텐츠📢 추천 피드 콘텐츠📢 추천 피드 콘텐츠📢 추천 피드 콘텐츠
          📢 추천 피드 콘텐츠📢 추천 피드 콘텐츠📢 추천 피드 콘텐츠📢 추천 피드 콘텐츠📢 추천 피드 콘텐츠📢 추천 피드 콘텐츠📢 추천 피드 콘텐츠📢 추천 피드 콘텐츠
          📢 추천 피드 콘텐츠📢 추천 피드 콘텐츠📢 추천 피드 콘텐츠📢 추천 피드 콘텐츠📢 추천 피드 콘텐츠📢 추천 피드 콘텐츠📢 추천 피드 콘텐츠📢 추천 피드 콘텐츠
          📢 추천 피드 콘텐츠📢 추천 피드 콘텐츠📢 추천 피드 콘텐츠📢 추천 피드 콘텐츠📢 추천 피드 콘텐츠📢 추천 피드 콘텐츠📢 추천 피드 콘텐츠📢 추천 피드 콘텐츠
          📢 추천 피드 콘텐츠📢 추천 피드 콘텐츠📢 추천 피드 콘텐츠📢 추천 피드 콘텐츠📢 추천 피드 콘텐츠📢 추천 피드 콘텐츠📢 추천 피드 콘텐츠📢 추천 피드 콘텐츠
          </div>
          <div className="page">👥 팔로잉 피드 콘텐츠</div>
        </motion.div>
      </div>
    </div>
  );
}
