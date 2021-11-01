import { generateIndex } from "plus-base-core";
import { createUseStyles } from "react-jss";

export default createUseStyles(
  {
    progress: {
      position: "fixed",
      left: 0,
      top: 0,
      height: 4,
      backgroundColor: "#27c26c",
      zIndex: 99,
    },
  },
  {
    index: generateIndex("atoms"),
  },
);
