// 애니메이션 관련 상수들
export const ANIMATION_CONSTANTS = {
  // 카드 관련
  CARD: {
    WIDTH: 265,
    HEIGHT: 426,
    EXPANDED_WIDTH: 375,
    EXPANDED_HEIGHT: 814,
    GAP: 12,
    BORDER_RADIUS: 24,
    EXPANDED_BORDER_RADIUS: 12,
  },
  
  // 앱 관련
  APP: {
    WIDTH: 375,
    OFFSET: 55, // (375 - 265) * 0.5
  },
  
  // 드래그 임계값
  DRAG_THRESHOLDS: {
    EXPAND: -210,
    SAVE: 550,
    SNAP_UP: -120,
    SNAP_DOWN: 60,
    DIRECTION: 70,
  },
  
  // 애니메이션 설정
  ANIMATION: {
    DURATION: 0.4,
    EASE: "circOut",
    SPRING_STIFFNESS: 300,
    SPRING_DAMPING: 30,
    POWER: 0.1,
    TIME_CONSTANT: 100,
  },
  
  // 스케일 관련
  SCALE: {
    MAX_DISTANCE: 530, // card_width * 2
    SCALE_FACTOR: 0.2,
  },
  
  // 텍스트 마스크
  TEXT_MASK: {
    BASE_OPACITY: 480,
    BASE_SCALE: 0.651,
  },
};

// 색상 관련 상수
export const COLOR_CONSTANTS = {
  FALLBACK: [1, 1, 1],
  PALETTE_SIZE: 6,
};

// 타이머 관련 상수
export const TIMER_CONSTANTS = {
  LONG_PRESS: 850,
  TEMP_VISUAL: 300,
  SCROLL_END: 50,
}; 