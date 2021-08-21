import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    minHeight: "100px",
    padding: "30px 0",
    // backgroundColor: "#6A2C70",
    background: "rgb(106,44,112)",
    background:
      "linear-gradient(9deg, rgba(106,44,112,1) 0%, rgba(146,62,154,1) 47%, rgba(106,44,112,1) 100%)",
    color: "white",
  },
}));
