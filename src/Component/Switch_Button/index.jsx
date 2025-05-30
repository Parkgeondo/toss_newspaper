import { Switch_Button_wrap } from "./styles";
import { Switch_Button_inner } from "./styles";
import cards from "../../img/cards.png"
import list from "../../img/list.png"

const Switch_Button = ({ }) => {
  return(
    <Switch_Button_wrap>
      <button>
        <img src={cards} alt="" />
        <img src={list} alt="" />
        <Switch_Button_inner></Switch_Button_inner>
      </button>
    </Switch_Button_wrap>
  )
}

export default Switch_Button