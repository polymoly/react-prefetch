import { createUseStyles } from "react-jss";

interface ProgressArgs {
  color?: string;
  thickness?: number;
}

export default createUseStyles({
  progress: {
    position: "absolute",
    left: 0,
    top: 0,
    height: ({ thickness }: ProgressArgs) => thickness,
    backgroundColor: ({ color }: ProgressArgs) => color,
    zIndex: 99,
  },
});
