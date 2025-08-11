import { SaveModeBackground_wrap } from "./styles";
import { motion } from "framer-motion";

function SaveModeBackground({ isSavedNewsMode }) {
  return (
    <motion.div
      animate={{ 
        width: isSavedNewsMode ? 1600 : 0,
        height: isSavedNewsMode ? 1600 : 0,
      }}
      transition={{ 
        duration: 0.8, 
        ease: [0.25, 0.1, 0.25, 1]
      }}
      style={{
        position: 'absolute',
        left: '50%',
        bottom: '95px',
        background: '#D3D1E5',
        borderRadius: '50%',
        zIndex: 100,
        transformOrigin: 'center',
        transform: 'translate(-50%, 50%)'
      }}
    />
  )
}

export default SaveModeBackground;