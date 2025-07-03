import { useCallback } from "react";

/**
 * 카드들의 누적 높이와 gap을 계산하는 커스텀 훅
 * @param {React.MutableRefObject} cardHeights - 각 카드의 높이가 저장된 ref
 * @param {number} GAP - 카드 사이의 간격
 * @returns {(index: number) => number} - index 이전까지의 누적 높이 + gap 반환 함수
 */
export default function useTotalHeightBefore(cardHeights, GAP) {
  return useCallback((index) => {
    return cardHeights.current
      .slice(0, index)
      .reduce((sum, h) => sum + h + GAP, 0);
  }, [cardHeights, GAP]);
} 