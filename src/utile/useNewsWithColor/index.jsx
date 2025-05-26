import { useEffect, useState } from "react";
import ColorThief from "colorthief";
import { newsData as rawNewsData } from "../data/newsData";

export default function useNewsWithColor() {
  const [newsWithColor, setNewsWithColor] = useState([]);

  useEffect(() => {
    const colorThief = new ColorThief();

    const loadColors = async () => {
      const results = await Promise.all(
        rawNewsData.map(
          (news) =>
            new Promise((resolve) => {
              const img = new Image();
              img.crossOrigin = "Anonymous";
              img.src = news.smallImage;

              img.onload = () => {
                try {
                  const [r, g, b] = colorThief.getColor(img);
                  resolve({ ...news, color: [r / 255, g / 255, b / 255] });
                } catch {
                  resolve({ ...news, color: [1, 1, 1] });
                }
              };

              img.onerror = () => resolve({ ...news, color: [1, 1, 1] });
            })
        )
      );

      setNewsWithColor(results);
    };

    loadColors();
  }, []);

  return newsWithColor;
}
