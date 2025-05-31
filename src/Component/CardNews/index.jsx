import { CardNews_wrap } from "./styles"

function CardNews({data}) {
  if (data.isBlank) {
    return <CardNews_wrap style={{ background: "transparent", boxShadow: "none" }} />;
  }
  return(
    <CardNews_wrap>
      {data.title}
    </CardNews_wrap>
  )
}

export default CardNews