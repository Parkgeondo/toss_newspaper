import './App.css';
import { useEffect, useRef, useState } from "react";
import StatusBar from './Component/StatusBar';
import Screen from './layouts/Screen';

import { ThemeProvider } from '@emotion/react';
import theme from './styles/theme';
import { LayoutProvider } from './contexts/LayoutContext';

function App() {
  
  // 세부 화면 펼쳐지고 있는지
  const [onExpand, setOnExpand] = useState(false);
  
  // 저장된 뉴스 보기 모드
  const [isSavedNewsMode, setIsSavedNewsMode] = useState(false);

  return (
    <div 
      className="App" 
    >
      <ThemeProvider theme={theme}>
        <LayoutProvider>
          <StatusBar isSavedNewsMode={isSavedNewsMode} onExpand={onExpand} />
          <Screen
            isSavedNewsMode={isSavedNewsMode}
            setIsSavedNewsMode = {setIsSavedNewsMode}
            setOnExpand={setOnExpand} 
            onExpand={onExpand} 
          />
        </LayoutProvider>
      </ThemeProvider>
    </div>
  );
}

export default App;