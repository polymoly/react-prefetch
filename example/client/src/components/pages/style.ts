import { createUseStyles } from "react-jss";

export default createUseStyles({
  card: {
    maxWidth: "100%",
    minHeight: 200,
    height: "auto",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    boxShadow: "0 0 4px rgba(0,0,0,.15)",
    margin: 16,
    borderRadius: 6,
    padding: 8,
    background: "brown",
    color: "#fff",
    flex: 1,
    "& > span": {
      margin: 4,
    },
  },
  container: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    height: "100%",
  },
  homeContainer: {
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  cardContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
});
