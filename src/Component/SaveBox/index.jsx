import { useState } from "react";
import { motion } from "framer-motion";
import { SaveBox_front,SaveBox_back, CircleNews_wrap } from "./styles"
import { useMotionValue } from "framer-motion";
import CircleNewsRow from "../CircleNews";
import TabTitle from "../TabTitle";

function SaveBox({savedNews, temSavedNews, progress}) {
    //현재 보여지는 도형 인덱스
    const [pathIndex, setPathIndex] = useState(0);

    //애니메이션을 위한 motion value
    // const progress = useMotionValue(pathIndex);

    // progress 값에 따라 path도 자연스럽게 변형
    // const path = useFlubber(progress, paths)

    // const paths = [lightning, hand, plane, heart, note, star, lightning]

    return(
        <>
            <SaveBox_front>
                <CircleNews_wrap>
                    저장된 뉴스
                    <CircleNewsRow savedNews={savedNews} temSavedNews={temSavedNews} progress={progress}/>
                </CircleNews_wrap>
                <svg width="347" height="78" viewBox="0 0 347 78" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g>
                        <motion.path d="M0 12C0 5.37258 5.37258 0 12 0H104.291C105.913 0 107.519 0.329034 109.011 0.96721L127.864 9.03279C129.356 9.67097 130.962 10 132.584 10H214.416C216.038 10 217.644 9.67097 219.136 9.03279L237.989 0.967211C239.481 0.329035 241.087 0 242.709 0H335C341.627 0 347 5.37258 347 12V66C347 72.6274 341.627 78 335 78H12C5.37259 78 0 72.6274 0 66V12Z" fill="#D3D1E5"/>
                    </g>
                </svg>
            </SaveBox_front>
            <SaveBox_back>
                <svg width="347" height="115" viewBox="0 0 347 115" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g filter="url(#filter0_i_548_52)">
                        <rect width="347" height="115" rx="12" fill="url(#paint0_linear_548_52)"/>
                    </g>
                    <defs>
                    <filter id="filter0_i_548_52" x="0" y="0" width="347" height="115" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                        <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                        <feOffset/>
                        <feGaussianBlur stdDeviation="12"/>
                        <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
                        <feColorMatrix type="matrix" values="0 0 0 0 0.484236 0 0 0 0 0.518727 0 0 0 0 0.671474 0 0 0 1 0"/>
                    <feBlend mode="normal" in2="shape" result="effect1_innerShadow_548_52"/>
                    </filter>
                    <linearGradient id="paint0_linear_548_52" x1="173.5" y1="0" x2="173.5" y2="115" gradientUnits="userSpaceOnUse">
                        <stop offset="0.05" stop-color="#62698D"/>
                        <stop offset="1" stop-color="#3A3E51"/>
                    </linearGradient>
                    </defs>
                </svg>
            </SaveBox_back>
        </>
    )
}

export default SaveBox;