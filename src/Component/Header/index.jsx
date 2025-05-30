import menu from '../../img/menu.png';
import Switch_Button from '../Switch_Button';
import { HeaderWraper } from './styles';

const Header = () => {
  return (
    <>
      <HeaderWraper>
        <h1>이번주의 인기뉴스</h1><Switch_Button/>
      </HeaderWraper>
    </>
  );
};

export default Header;