import { StatusBarstyle } from "./styles";
import StatusImage from "../../img/Navigation_Bar.png";

const StatusBar = () => {
  return (
    <>
        <StatusBarstyle>
          11:04 <img src={StatusImage} alt="Status Bar Background"/>
        </StatusBarstyle>
    </>
  );
};

export default StatusBar;
    