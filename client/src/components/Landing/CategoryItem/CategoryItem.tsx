import React from 'react';
import styled from '@mui/system/styled';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import Image, { StaticImageData } from 'next/image';

interface CategoryItemProps {
  src: StaticImageData;
  heading: string;
  dest: string;
  alt: string;
}

const Card = styled(Grid)({
  display: 'flex',
  flexDirection: 'column',
});

const CardContent = styled('div')({
  position: 'relative',
  border: '1px solid #D3D3D3',
  height: '100%',
  color: '#000',
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: 'white',
  WebkitTransition: 'transform 1s, color .4s',
  '&:hover': {
    borderColor: '#ffce2a',
    transform: 'translateY(-10px)',
    color: '#ffce2a',
  },
});

const CardImage = styled(Image)({
  objectFit: 'cover',
  width: '100%',
  // height: 250px;
  height: '100%',
  // height: 'auto',
});

const CardTextContainer = styled('div')({
  marginLeft: 'auto',
  marginRight: 'auto',
  left: '0%',
  right: '0%',
  textAlign: 'center',
  paddingBottom: '10px',
  marginTop: 'auto',
});

const CategoryItem = ({ src, heading, dest, alt }: CategoryItemProps) => {
  return (
    <Card item xs={8} md={3} alignContent="center" justifyContent="center">
      <Link href={dest} style={{ height: '100%', textDecoration: 'none' }}>
        <CardContent>
          {/* TODO make sure this doesn't cause layout shifting (Image optimization) */}
          <Image
            src={src}
            alt={alt}
            placeholder="blur"
            quality={100}
            sizes="100vw"
            style={{ objectFit: 'cover', width: '100%', height: '100%' }}
          />
          {/* <CardImage src={src} alt={alt} /> */}
          <CardTextContainer>
            <Typography variant="h6" align="center">
              {heading}
            </Typography>
          </CardTextContainer>
        </CardContent>
      </Link>
    </Card>
  );
};

export default CategoryItem;
