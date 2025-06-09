import { motion } from "framer-motion";
import CircleNewsRow from "../../Component/CircleNews";
import { Children } from "react";

const TabTitle = ({ tabNavi, title, id, savedNews, temSavedNews, progress, }) => {
  const titleElement = (
    <motion.div
      key="title"
      layout
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      style={{
        maxWidth: "180px",
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
      }}
    >
      {tabNavi ? title : "저장된 뉴스"}
    </motion.div>
  );

  const circleElement = (
    <motion.div
      key="circle"
      layout
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <CircleNewsRow
        savedNews={savedNews}
        temSavedNews={temSavedNews}
        progress={progress}
      />
    </motion.div>
  );

  return (
    <motion.div
      layout
      style={{ display: "flex", gap: "4px", alignItems: "center"}}
    >
      
      {tabNavi ? (
        <>
          {circleElement}
          {titleElement}
        </>
      ) : (
        <>
          {titleElement}
          {circleElement}
        </>
      )}
    </motion.div>
  );
};

export default TabTitle;
