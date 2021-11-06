import { View } from "plus-base-component";
import { ProgressbarProps } from "./types";
import useStyles from "./progressbarStyle";

export const Progressbar = ({
  color = "#27c26c",
  thickness = 3,
  isLoading,
  progress,
}: ProgressbarProps) => {
  const classes = useStyles({ color, thickness } as any);

  return (
    <View
      className={classes.progress}
      style={{
        width: `${isLoading ? progress || 10 : 0}%`,
        transitionDuration: isLoading ? "1s" : undefined,
        transitionProperty: "width",
        transitionTimingFunction: "ease-out",
      }}
    />
  );
};
