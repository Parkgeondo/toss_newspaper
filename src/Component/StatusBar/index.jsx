import { StatusBarstyle } from "./styles";
import StatusImage from "../../img/Navigation_Bar.png";
import { motion } from "framer-motion";

const StatusBar = ({ onExpand, isSavedNewsMode }) => {
  return (
    <StatusBarstyle>
      {onExpand && <div className="gradiant"></div>}
      <motion.img 
        animate={{ filter: onExpand | isSavedNewsMode ? "invert(1)" : "invert(0)" }} 
        src={StatusImage} 
        className='stateImg' 
        alt="Status Bar Background"
      />
    </StatusBarstyle>
  );
};

export default StatusBar;
    