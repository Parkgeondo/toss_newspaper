import {CardDetail_wrap} from "./styles";
import { motion } from "framer-motion";


export default function CardDetail({ id, onClose, data }) {
  return (
    <CardDetail_wrap>
      <motion.div className="drag" drag='y'>
        <img src={data.bigImage} className="thumnail" alt="" />
        <div className="gradient"></div>
        <motion.div className="text" style={{
          }}>
          <div className="publisher">
            <img src={data.publisherImg} alt="" />
            {data.publisher}
          </div>
          <div className="title">{data.title}</div>
          <div className="badge">{data.category}</div>
          <div className="badge">{data.date}</div>
          <motion.div className="textBody"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}>
            {data.subTitle1 && <div className="subtitle">{data.subTitle1}</div>}
            {data.content1 && <div className="content">{data.content1}</div>}

            {data.subTitle2 && <div className="subtitle">{data.subTitle2}</div>}
            {data.content2 && <div className="content">{data.content2}</div>}

            {data.subTitle3 && <div className="subtitle">{data.subTitle3}</div>}
            {data.content3 && <div className="content">{data.content3}</div>}

            {data.content4 && <div className="content">{data.content4}</div>}
            {data.content5 && <div className="content">{data.content5}</div>}
          </motion.div>
        </motion.div>
      </motion.div>
    </CardDetail_wrap>
  );
}