import React from 'react';
import { styled } from '@mui/system';
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
  // display: 'flex',
  // flexDirection: 'column',
});

const CardContent = styled('div')({
  border: '1px solid #D3D3D3',
  height: '100%',
  color: '#000',
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: 'white',
  '-webkit-transition': 'transform 1s, color .4s',
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
    <Card
      item
      xs={12}
      md={3}
      direction={'column'}
      alignContent="center"
      justifyContent="center"
    >
      <Link href={dest} style={{ height: '100%', textDecoration: 'none' }}>
        <CardContent>
          <CardImage src={src} alt="smartphones" />
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
