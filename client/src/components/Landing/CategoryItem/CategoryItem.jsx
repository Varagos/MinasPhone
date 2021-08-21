import React from "react";
import useStyles from "./styles";
import { Grid, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";

const CategoryItem = ({ src, heading, dest }) => {
  const classes = useStyles();
  return (
    <Grid container item xs={12} md={3} alignContent='center' justifyContent='center'>
      <Link to={dest} style={{ textDecoration: "none" }}>
        <div className={classes.main}>
          <img src={src} className={classes.bannerImg} alt='smartphones' />
          <div className={classes.bannerText}>
            <Typography variant='h6' align='center'>
              {heading}
            </Typography>
          </div>
        </div>
      </Link>
    </Grid>
  );
};

export default CategoryItem;
