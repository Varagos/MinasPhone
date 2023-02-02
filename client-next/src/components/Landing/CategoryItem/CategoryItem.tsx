'use client';
import React from 'react';
import styles from './styles.module.css';
import { Grid, Typography } from '@mui/material';
import Link from 'next/link';
import Image from 'next/image';

const CategoryItem = ({ src, heading, dest }: any) => {
  return (
    <Grid container item xs={12} md={3} alignContent="center" justifyContent="center" className={styles.item}>
      <Link href={dest} style={{ height: '100%', textDecoration: 'none' }} passHref>
        <div className={styles.main}>
          <Image src={src} fill={true} className={styles.bannerImg} alt="smartphones" />
          <div className={styles.bannerText} style={{ marginTop: 'auto' }}>
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
