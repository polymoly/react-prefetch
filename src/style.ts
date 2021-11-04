import { generateIndex } from "plus-base-core";
import { createUseStyles } from "react-jss";

interface ProgressArgs {
  color?: string;
  thickness?: number;
}

export default createUseStyles(
  {
    progress: {
      position: "absolute",
      left: 0,
      top: 0,
      height: ({ thickness }) => (thickness ? thickness : 3),
      backgroundColor: ({ color }: ProgressArgs) => (color ? color : "#27c26c"),
      zIndex: 99,
    },
  },
  {
    index: generateIndex("atoms"),
  },
);
