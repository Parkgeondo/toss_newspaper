import { createContext, useContext } from 'react';
import { newsData } from '../data/newsData';

// 카드 레이아웃 값
const System_CONFIG = {
  width: 265,
  appWidth: 375,
  appHeight: 812,
  gap: 12,
  DefaultCard_To_Top: 212,
};

// 레이아웃 유지하기 위한 함수
const getCardLayoutValues = () => {
  const { width: cardWidth, appWidth, gap } = System_CONFIG;
  const cardGapWidth = cardWidth + gap;

  // 전체 화면에서 카드의 넓이를 빼고 반으로 나눈 값
  const offset = (appWidth - cardWidth) * 0.5;
  // FloatingNewsCards 컴포넌트에서 사용하는 초기 x 값
  const initialX = -cardGapWidth + (offset - gap * 0.5);
  // 카드가 최대로 움직일 수 있는 거리
  const maxScrollLeft = -(newsData.length) * cardGapWidth + (offset - gap * 0.5);
  
  return {
    cardWidth,
    appWidth,
    gap,
    cardGapWidth,
    offset,
    initialX,
    maxScrollLeft,
  };
};

const LayoutContext = createContext();

export const LayoutProvider = ({ children }) => {
  const cardLayoutValues = getCardLayoutValues();
  
  const value = {
    System_CONFIG,
    cardLayoutValues,
  };

  return (
    <LayoutContext.Provider value={value}>
      {children}
    </LayoutContext.Provider>
  );
};

export const useLayout = () => {
  const context = useContext(LayoutContext);
  if (!context) {
    throw new Error('useLayout must be used within a LayoutProvider');
  }
  return context;
}; 