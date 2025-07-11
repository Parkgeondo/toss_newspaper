import { motion, AnimatePresence } from "framer-motion";
import { useRef, useEffect, useState, useCallback } from "react";
import { LettersPullUp_wrap } from "./styles";

const LettersPullUp = ({ 
  text, 
  width, 
  className = "",
}) => {
  const [letters, setLetters] = useState([]);

  useEffect(() => {
    setLetters(text.split(""));
  }, [text]);

  return (
    <LettersPullUp_wrap>
      {letters.map((letter, index) => (
        <motion.div key={index} className="letter">
          {letter == ' ' ? <span>&nbsp;</span> : letter}
        </motion.div>
      ))} 
    </LettersPullUp_wrap>
  );
};

export default LettersPullUp;