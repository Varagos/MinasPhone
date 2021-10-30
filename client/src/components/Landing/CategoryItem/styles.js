import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  toolbar: theme.mixins.toolbar,
  stretch: { height: "100%" },
  item: { display: "flex", flexDirection: "column" }, // KEY CHANGES
  main: {
    border: "1px solid #D3D3D3",
    height: "100%",
    color: "#000",
    backgroundColor: "white",
    "&:hover": {
      borderColor: "#ffce2a",
      transform: "translateY(-10px)",
      color: "#ffce2a",
    },
  },
  bannerImg: {
    width: "100%",
    height: "auto",
  },
  bannerText: {
    marginLeft: "auto",
    marginRight: "auto",
    left: "0%",
    right: "0%",
    textAlign: "center",
    paddingBottom: "10px",
  },
}));
