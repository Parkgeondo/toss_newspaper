const Syn = (scroll, newsScrollbarRef, savedScrollbarRef,selectedTab,tabs) => {

  // 슬라이드나 탭을 했을 시 tab부분을 동기화
  if(scroll[0] > 48 && scroll[1] < 48 && selectedTab === tabs[0]){
    savedScrollbarRef.current.scrollTo({ top: 48 });
  }else if(scroll[0] < 48 && scroll[1] > 48){
    newsScrollbarRef.current.scrollTo({ top: 48 });
  }
};
export default Syn;