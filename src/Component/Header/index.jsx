import menu from '../../img/menu.png';
import Switch_Button from '../Switch_Button';
import { HeaderWraper } from './styles';
import backButton from '../../img/backButton.svg'

const Header = ({isSavedNewsMode, setIsSavedNewsMode}) => {
  return (
    <HeaderWraper>
      <img onClick={() => {
        console.log('clicked');
        setIsSavedNewsMode(false);
      }} style={{width:"36px", height:"36px",opacity: isSavedNewsMode?1:0}} src={backButton}></img>
      <h1 style={{color: isSavedNewsMode ? "#FFFFFF" : "#293468"}}>이번주의 인기뉴스</h1>
      <img style={{width:"36px", height:"36px",opacity:0}} src={backButton}></img>
    </HeaderWraper>
  );
};

export default Header;