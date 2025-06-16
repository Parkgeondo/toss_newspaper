import React, { useEffect, useState } from "react";
import { interpolate } from "flubber";
import { SaveBox_front, CircleNews_wrap, Box_Svg, SaveBox_back } from "./styles";
import CircleNewsRow from "../CircleNews";
import { useTransform } from "framer-motion";

const phaseArr = [
  {
    path: 'M249 37.0001C259.941 37.0001 269 46.059 269 57.0001C269 67.9412 259.941 77.0001 249 77.0001H98C87.0589 77.0001 78 67.9412 78 57.0001C78 46.059 87.0589 37.0001 98 37.0001H166.5C167 37.0001 167 37.0001 168 37.0001C169 37.0001 168.172 37 169 37H176C176.828 37 176 37 177 37.0001C178 37 178 37.0001 178.5 37.0001H249Z',
    time: [0, 5]
  },
  {
    path: 'M318 74V41C318 31.0589 309.941 23 300 23H237.124L233 23H215.5L211.585 23H135.5H131.5L114 23L109.875 23H47C37.0589 23 29 31.0589 29 41V74C29 83.9411 37.0589 92 47 92H300C309.941 92 318 83.9411 318 74Z',
    time: [5, 10]
  },
  {
    path: 'M14 30.0769C14 23.9593 18.9391 19 25.0317 19H109.876C111.367 19 113 19 114 19L131.5 19C132.5 19 134.008 19 135.5 19H211.585C213.076 19 214.5 19 215.5 19H233C234 19.0001 235.633 19 237.124 19H321.968C328.061 19 333 23.9593 333 30.0769V83.9231C333 90.0407 328.061 95 321.968 95H25.0317C18.9391 95 14 90.0407 14 83.9231V30.0769Z',
    time: [10, 30]
  },
  {
    path: 'M0 49C0 42.3726 5.37258 37 12 37H104.291C105.913 37 107.519 37.329 109.011 37.9672L127.864 46.0328C129.356 46.671 130.962 47 132.584 47H214.416C216.038 47 217.644 46.671 219.136 46.0328L237.989 37.9672C239.481 37.329 241.087 37 242.709 37H335C341.627 37 347 42.3726 347 49V103C347 109.627 341.627 115 335 115H12C5.37259 115 0 109.627 0 103V49Z',
    time: [30, 100]
  },
];

const phaseArr_back = [
  {
    path: 'M269 57.0001C269 46.059 259.941 37.0001 249 37.0001H98C87.0589 37.0001 78 46.059 78 57.0001C78 67.9412 87.0589 77.0001 98 77.0001H249C259.941 77.0001 269 67.9412 269 57.0001Z',
    time: [0, 5]
  },
  {
    path: 'M29 41C29 31.0589 37.0589 23 47 23H300C309.941 23 318 31.0589 318 41V74C318 83.9411 309.941 92 300 92H47C37.0589 92 29 83.9411 29 74V41Z',
    time: [5, 10]
  },
  {
    path: 'M14 20C14 13.3726 19.3726 8 26 8H321C327.627 8 333 13.3726 333 20V83C333 89.6274 327.627 95 321 95H26C19.3726 95 14 89.6274 14 83V20Z',
    time: [10, 30]
  },
  {
    path: 'M0 12C0 5.37258 5.37258 0 12 0H335C341.627 0 347 5.37258 347 12V103C347 109.627 341.627 115 335 115H12C5.37259 115 0 109.627 0 103V12Z',
    time: [30, 100]
  },
];

export default function SvgMorphToggle({ savedNews, temSavedNews, box_progress }) {
  // front (위쪽) morph
  const [d, setD] = useState(phaseArr[0].path);
  // back (아래쪽) morph
  const [dBack, setDBack] = useState(phaseArr_back[0].path);

  const [width, setWidth] = useState(191);
  // 프론트 path morphing
  useEffect(() => {
    const percent = box_progress * 100;
    let fromIdx = 2;
    for (let i = 0; i < phaseArr.length - 1; i++) {
      const [start, end] = phaseArr[i].time;
      if (percent >= start && percent < end) {
        fromIdx = i;
        break;
      }
      if (percent >= 100) fromIdx = phaseArr.length - 2;
    }
    const from = phaseArr[fromIdx];
    const to = phaseArr[fromIdx + 1] || from;
    const range = to.time[0] - from.time[0] || 1;
    const subprogress = Math.min(
      Math.max((percent - from.time[0]) / range, 0),
      1
    );
    const interp = interpolate(from.path, to.path);
    setD(interp(subprogress));
  }, [box_progress]);

  // 백 path morphing
  useEffect(() => {
    const percent = box_progress * 100;
    let fromIdx = 2;
    for (let i = 0; i < phaseArr_back.length - 1; i++) {
      const [start, end] = phaseArr_back[i].time;
      if (percent >= start && percent < end) {
        fromIdx = i;
        break;
      }
      if (percent >= 100) fromIdx = phaseArr_back.length - 2;
    }
    const from = phaseArr_back[fromIdx];
    const to = phaseArr_back[fromIdx + 1] || from;
    const range = to.time[0] - from.time[0] || 1;
    const subprogress = Math.min(
      Math.max((percent - from.time[0]) / range, 0),
      1
    );
    const interp = interpolate(from.path, to.path);
    setDBack(interp(subprogress));
  }, [box_progress]);

  function getMarginBottom(box_progress) {
    if (box_progress < 0.05) return 37;
    if (box_progress < 0.1) return 37 + (22 - 37) * ((box_progress - 0.05) / 0.05);
    if (box_progress < 0.3) return 22;
    if (box_progress < 1) return 22 + (14 - 22) * ((box_progress - 0.3) / 0.7);
    return 14;
  }
  const margin_bottom = getMarginBottom(box_progress);

  return (
    <>
      <SaveBox_front style={{ bottom: margin_bottom }}>
        <CircleNews_wrap>
          <p style={{
            maxWidth: "180px",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis"
          }}>
            {savedNews.length ? '저장된 뉴스' : '뉴스를 여기로 끌어 저장'}
          </p>
          <CircleNewsRow width={width} setWidth={setWidth} savedNews={savedNews} temSavedNews={temSavedNews} />
        </CircleNews_wrap>
        <Box_Svg height={115} viewBox="0 0 347 115">
          <path d={d} fill="#D3D1E5" stroke="none" />
        </Box_Svg>
      </SaveBox_front>
      <SaveBox_back style={{ bottom: margin_bottom }}>
        <Box_Svg height={115} viewBox="0 0 347 115">
          <path d={dBack} fill="#60678A" stroke="none" />
        </Box_Svg>
      </SaveBox_back>
    </>
  );
}
