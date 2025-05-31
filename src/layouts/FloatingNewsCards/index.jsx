import CardNews from "../../Component/CardNews"
import { FloatingNewsCards_wrap } from "./styles"
import { newsData } from '../../data/newsData';

function FloatingNewsCards() {
  const blankAddedNews = [
    { id: "blank-start", isBlank: true },
    ...newsData,
    { id: "blank-end", isBlank: true }
  ];

  return(
    <FloatingNewsCards_wrap>
      {blankAddedNews.map((data,i)=>{
        return(
          <CardNews data={data} key={data.id}></CardNews>
        )
      })}
    </FloatingNewsCards_wrap>
  )
}

export default FloatingNewsCards