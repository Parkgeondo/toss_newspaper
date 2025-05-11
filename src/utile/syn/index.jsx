const Syn = (scroll, newsScrollbarRef, savedScrollbarRef,selectedTab) => {

  // 축소에서 확장으로
  if(scroll[0] > 48 && scroll[1] < 48){
    savedScrollbarRef.current.scrollTo({ top: 48 }); 

  }else if(scroll[0] < 48 && scroll[1] > 48){
    newsScrollbarRef.current.scrollTo({ top: 48 });
  }

};
export default Syn;