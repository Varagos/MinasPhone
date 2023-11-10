import React from 'react';
import useStyles from './styles';
import { Grid, Typography } from '@mui/material';
import Link from 'next/link';
import Image from 'next/image';

interface CategoryItemProps {
  src: any;
  heading: string;
  dest: string;
}

const CategoryItem = ({ src, heading, dest }: CategoryItemProps) => {
  const classes = useStyles();
  return (
    <Grid container item xs={12} md={3} alignContent="center" justifyContent="center" className={classes.item}>
      <Link href={dest} style={{ height: '100%', textDecoration: 'none' }}>
        <div className={classes.main}>
          <Image src={src} className={classes.bannerImg} alt="smartphones" />
          <div className={classes.bannerText} style={{ marginTop: 'auto' }}>
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
