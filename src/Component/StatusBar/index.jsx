import { StatusBarstyle } from "./styles";
import StatusImage from "../../img/Navigation_Bar.png";
import { motion } from "framer-motion";

const StatusBar = ({ onExpand, isSavedNewsMode }) => {

  // 시간이랑 상태표시 컴포넌트

  return (
    <StatusBarstyle>
      {onExpand && <div className="gradiant"></div>}
      <motion.img 

      //다크모드 화이트모드
        animate={{ filter: onExpand | isSavedNewsMode ? "invert(1)" : "invert(0)" }} 
        src={StatusImage} 
        className='stateImg' 
        alt="Status Bar Background"
      />
    </StatusBarstyle>
  );
};

export default StatusBar;
    