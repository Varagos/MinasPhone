import { Container, Typography, Grid, Box } from '@mui/material';

import useStyles from './_styles';
import TabletCategory from '../../../public/tablet-category.jpg';
import SmartWatchCategory from '../../../public/smartwatch-category.jpg';

import PhonesCategory from '../../../public/iphone-12-service.png';
import AccessoriesCategory from '../../../public/Hnet-com-image.png';
import CategoryItem from '@/components/Landing/CategoryItem/CategoryItem';

export default function Orders() {
  const classes = useStyles();
  return (
    <div>
      <p>Search for your oder</p>
      <input type="text" />
      <button>Search</button>
    </div>
  );
}
