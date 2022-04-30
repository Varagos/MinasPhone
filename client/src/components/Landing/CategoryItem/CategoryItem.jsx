import React from 'react';
import useStyles from './styles';
import { Grid, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const CategoryItem = ({ src, heading, dest, ...rest }) => {
  const classes = useStyles();
  return (
    <Grid container item xs={12} md={3} alignContent="center" justifyContent="center" className={classes.item}>
      <Link to={dest} style={{ height: '100%', textDecoration: 'none' }}>
        <div className={classes.main}>
          <img src={src} className={classes.bannerImg} alt="smartphones" />
          <div className={classes.bannerText}>
            <Typography variant="h6" align="center">
              {heading}
            </Typography>
          </div>
        </div>
      </Link>
    </Grid>
  );
};

export default CategoryItem;
