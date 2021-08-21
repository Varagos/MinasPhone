import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  // toolbar: theme.mixins.toolbar,
  content: {
    backgroundColor: theme.palette.background.default,
  },
  media: {
    width: "100%",
    height: "auto",
  },
  sectionTitle: {
    fontWeight: "900",
    borderBottom: "thick solid #6A2C70",
    paddingBottom: "3px",
    marginBottom: "40px",
  },
}));
