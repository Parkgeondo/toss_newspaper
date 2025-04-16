import { NewsBoxWapper } from "./styles";
import { NewsBoxline } from "./styles";
import { Ripple } from "./styles";
import { Ripplearea } from "./styles";
import { AnimatePresence } from 'framer-motion';
import { useState } from "react";

const NewsBox = ({ publisher, title, category, subTitle1, subTitle2, subTitle3, content1, content2, content3, date, smallImage }) => {
  const [ripples, setRipples] = useState([]);
  const createRipple = (e) => {
    const rect = e.currentTarget.parentElement.getBoundingClientRect();
    const size = 600;
    const newRipple = {
      id: Date.now(),
      x: e.clientX - rect.left - size / 2 - 14,
      y: e.clientY - rect.top - size / 2 - 16,
    };
    setRipples((prev) => [...prev, newRipple]); 

    console.log(e.currentTarget.parentElement);
  };

  const removeRipple = (e) => {
    setTimeout(() => {
      setRipples((prev) => prev.slice(1));
    }, 100);
  };

  return (
    <>
      <NewsBoxline>
        <Ripplearea
          onMouseDown={createRipple}
          onMouseUp={removeRipple}
          whileTap={{ scale: 0.97 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}>
        <NewsBoxWapper>
          <AnimatePresence>
            {ripples.map((ripple) => (
                <Ripple
                  key={ripple.id}
                  initial={{ scale: 0.1, opacity: 0.1 }}
                  animate={{ scale: 2.5, opacity: 0.1 }}
                  exit={{ scale: 2.5, opacity: 0 }}
                  transition={{ duration: 0.7, ease: 'easeOut' }}
                  style={{ left: ripple.x, top: ripple.y }}
                />
            ))}
          </AnimatePresence>
          <img src={smallImage} className="smallImage" alt="" />
          <div className="text">
            <div className="publisher">
              <img src="" alt="" />
              {publisher}
            </div>
            <div className="title">
              {title}
            </div>
            <div className="body">
              {content1}
            </div>
            <div className="tags">
              <div className="category">{category}</div>
              <div className="day">{date}</div>
            </div>
          </div>
        </NewsBoxWapper>
        </Ripplearea>
      </NewsBoxline>
    </>
  );
};

export default NewsBox;