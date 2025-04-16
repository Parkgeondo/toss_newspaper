import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from "react";
import StatusBar from './Component/StatusBar';
import Screen from './layouts/Screen';

const useDeviceType = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkDevice = () => {
      setIsMobile(/Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent));
    };
    checkDevice();
    console.log(isMobile);
  }, []);
  return isMobile;
};

function App() {
  const isMobile = useDeviceType();
  return (
    <div className="App" style={{
      backgroundColor : !isMobile ? 'white' : 'white ',
      }}>
        <StatusBar></StatusBar>
        <Screen></Screen>
          {/* 이번주의 인기뉴스와 메뉴 부분 */}
          {/* 탭 부분 */}
          {/* 뉴스를 담는 부분 */}
              {/* 그냥 뉴스 */}
                {/* 각 뉴스 */}
              {/* 저장한 뉴스 */}
                {/* 저장한 뉴스를 모두 모은 부분 */}
    </div>
  );
}

export default App;
