import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from "react";
import StatusBar from './Component/StatusBar';
import Screen from './layouts/Screen';


//현재 기기가 모바일인지 PC인지 판단
const useDeviceType = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkDevice = () => {
      setIsMobile(/Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent));
    };
    checkDevice();
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
    </div>
  );
}

export default App;
