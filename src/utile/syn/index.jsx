const Syn = (scroll, newsScrollbarRef, savedScrollbarRef, selectedTab,tabs) => {

  if(scroll[0] > 48 && scroll[1] < 48 && selectedTab === tabs[0]){
    savedScrollbarRef.current.scrollTo({ top: 48 });
  }else if(scroll[0] < 48 && scroll[1] > 48){
    newsScrollbarRef.current.scrollTo({ top: 48 });
  }
};
export default Syn;