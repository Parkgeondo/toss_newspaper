import { useEffect, useState } from "react";
import ColorThief from "colorthief";
import { newsData } from "../../data/newsData";

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

  return [h, s, v]; // s: 채도
}

export default function useColorPicker() {
  const [newsWithColor, setNewsWithColor] = useState([]);

  useEffect(() => {
    const colorThief = new ColorThief();

    const loadColors = async () => {
      const results = await Promise.all(
        newsData.map((news) => new Promise((resolve) => {
          const img = new Image();
          img.crossOrigin = "Anonymous";
          img.src = news.smallImage;

          img.onload = () => {
            try {
              const palette = colorThief.getPalette(img, 6); // 상위 6개 색상
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
                ...news,
                color: [Number((r / 255).toFixed(2)), Number((g / 255).toFixed(2)), Number((b / 255).toFixed(2))]
              });
            } catch {
              resolve({ ...news, color: [1, 1, 1] }); // fallback
            }
          };

          img.onerror = () => resolve({ ...news, color: [1, 1, 1] });
        }))
      );

      setNewsWithColor(results);
    };

    loadColors();
  }, []);

  return newsWithColor;
}
