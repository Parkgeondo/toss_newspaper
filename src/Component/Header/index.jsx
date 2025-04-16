import menu from '../../img/menu.png';
import { HeaderWraper } from './styles';

const Header = () => {
  return (
    <>
      <HeaderWraper>
        <h1>이번주의 인기뉴스</h1> <img src={menu} alt="" />
      </HeaderWraper>
    </>
  );
};

export default Header;