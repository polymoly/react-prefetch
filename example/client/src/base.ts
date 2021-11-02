import { jss } from "react-jss";

export default jss
  .createStyleSheet({
    "@global": {
      body: {
        fontFamily: "sans-serif",
        margin: 0,
        padding: 0,
      },
      [`*,*::after,*::before`]: {
        boxSizing: "border-box",
      },
    },
  })
  .attach();
