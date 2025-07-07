import { useEffect, useState, useCallback } from "react";
import ColorThief from "colorthief";
import { newsData } from "../../data/newsData";
import { COLOR_CONSTANTS } from "../../constants/animations";

// RGB → HSV 변환 함수
function rgbToHsv(r, g, b) {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  const d = max - min;

  let h = 0;
  if (d !== 0) {
    if (max === r) h = (g - b) / d + (g < b ? 6 : 0);
    else if (max === g) h = (b - r) / d + 2;
    else if (max === b) h = (r - g) / d + 4;
    h /= 6;
  }

  const s = max === 0 ? 0 : d / max;
  const v = max;

  return [h, s, v];
}

// 이미지에서 색상을 추출하는 함수
const extractColorFromImage = (imageSrc, usePalette = true) => {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.src = imageSrc;

    img.onload = () => {
      try {
        const colorThief = new ColorThief();
        
        if (usePalette) {
          // 팔레트에서 가장 채도가 높은 색상 선택
          const palette = colorThief.getPalette(img, COLOR_CONSTANTS.PALETTE_SIZE);
          let mostSaturated = palette[0];
          let maxSaturation = 0;

          for (const [r, g, b] of palette) {
            const [_, s] = rgbToHsv(r, g, b);
            if (s > maxSaturation) {
              maxSaturation = s;
              mostSaturated = [r, g, b];
            }
          }

          const [r, g, b] = mostSaturated;
          resolve({
            color: [
              Number((r / 255).toFixed(2)), 
              Number((g / 255).toFixed(2)), 
              Number((b / 255).toFixed(2))
            ],
            palette
          });
        } else {
          // 단일 색상 추출
          const [r, g, b] = colorThief.getColor(img);
          resolve({
            color: [r / 255, g / 255, b / 255],
            palette: null
          });
        }
      } catch (error) {
        console.warn('Color extraction failed for:', imageSrc, error);
        resolve({
          color: COLOR_CONSTANTS.FALLBACK,
          palette: null
        });
      }
    };

    img.onerror = () => {
      console.warn('Image load failed for:', imageSrc);
      resolve({
        color: COLOR_CONSTANTS.FALLBACK,
        palette: null
      });
    };
  });
};

/**
 * 뉴스 데이터에 색상 정보를 추가하는 커스텀 훅
 * @param {boolean} usePalette - 팔레트 사용 여부 (기본값: true)
 * @returns {Array} 색상 정보가 추가된 뉴스 데이터
 */
export default function useNewsWithColor(usePalette = true) {
  const [newsWithColor, setNewsWithColor] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadColors = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const results = await Promise.all(
        newsData.map(async (news) => {
          const colorData = await extractColorFromImage(news.smallImage, usePalette);
          return { ...news, ...colorData };
        })
      );

      setNewsWithColor(results);
    } catch (err) {
      console.error('Failed to load colors:', err);
      setError(err);
    } finally {
      setIsLoading(false);
    }
  }, [usePalette]);

  useEffect(() => {
    loadColors();
  }, [loadColors]);

  return { newsWithColor, isLoading, error, refetch: loadColors };
}
