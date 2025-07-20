import './App.css';
import { useEffect, useRef, useState } from "react";
import StatusBar from './Component/StatusBar';
import Screen from './layouts/Screen';
import { ThemeProvider } from '@emotion/react';
import theme from './styles/theme';

// 현재 기기가 모바일인지 PC인지 판단하는 커스텀 훅
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
  // 세부 화면 펼쳐지고 있는지
  const [onExpand, setOnExpand] = useState(false);
  const isMobile = useDeviceType();
  const containerRef = useRef(null);
  // 저장된 뉴스 보기 모드
  const [isSavedNewsMode, setIsSavedNewsMode] = useState(false);

  return (
    <div 
      ref={containerRef} 
      className="App" 
      style={{
        backgroundColor: !isMobile ? 'white' : 'white',
      }}
    >
      <ThemeProvider theme={theme}>
        <StatusBar isSavedNewsMode={isSavedNewsMode} onExpand={onExpand} />
        <Screen
          isSavedNewsMode={isSavedNewsMode}
          setIsSavedNewsMode = {setIsSavedNewsMode}
          containerRef={containerRef} 
          setOnExpand={setOnExpand} 
          onExpand={onExpand} 
        />
      </ThemeProvider>
    </div>
  );
}

export default App;