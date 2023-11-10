import { Container, Typography, Grid, Box } from '@mui/material';

import useStyles from './_styles';
import TabletCategory from '../../../public/tablet-category.jpg';
import SmartWatchCategory from '../../../public/smartwatch-category.jpg';

import PhonesCategory from '../../../public/iphone-12-service.png';
import AccessoriesCategory from '../../../public/Hnet-com-image.png';
import CategoryItem from '@/components/Landing/CategoryItem/CategoryItem';

export default function Categories() {
  const classes = useStyles();
  return (
    <div>
      <Container>
        <Box my={8}>
          <Typography variant="h4" align="center" gutterBottom>
            <span className={classes.sectionTitle}>ΚΑΤΗΓΟΡΙΕΣ</span>
          </Typography>
        </Box>
        <Grid container justifyContent="center" spacing={3}>
          <CategoryItem
            src={PhonesCategory}
            heading="ΚΙΝΗΤΑ ΤΗΛΕΦΩΝΑ"
            dest="/category/smartphones"
          />
          <CategoryItem
            src={TabletCategory}
            heading="TABLETS"
            dest="/category/tablets"
          />
          <CategoryItem
            src={AccessoriesCategory}
            heading="ΑΞΕΣΟΥΑΡ"
            dest="/category/accessories"
          />
          <CategoryItem
            src={SmartWatchCategory}
            heading="SMARTWATCHES"
            dest="/category/smartwatches"
          />
        </Grid>
      </Container>
    </div>
  );
}
