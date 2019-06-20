import { createStyles, makeStyles } from "@material-ui/core/styles";

export default makeStyles(() =>
  createStyles({
    wrapper: {
      height: 300,
      padding: "20px 0",
      boxSizing: "border-box",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center"
    },
    overflow: {
      height: 300,
      width: "100%",
      overflow: "auto"
    },
    divider: {
      margin: "20px 0"
    }
  })
);
