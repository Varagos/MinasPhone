import { Container, Typography, Grid, Box } from '@mui/material';

import TabletCategory from '../../../public/categories_tablet.jpg';

import PhonesCategory from '../../../public/categories_smartphones.png';
import AccessoriesCategory from '../../../public/categories_accessories.png';
import SmartWatchCategory from '../../../public/categories_smartwatch.jpg';
import CategoryItem from '@/components/Landing/CategoryItem/CategoryItem';

export default function Categories() {
  return (
    <div>
      <Container>
        <Box my={8}>
          <Typography variant="h4" align="center" gutterBottom>
            <span
              style={{
                fontWeight: '900',
                borderBottom: 'thick solid #6A2C70',
                paddingBottom: '3px',
                marginBottom: '40px',
              }}
            >
              ΚΑΤΗΓΟΡΙΕΣ
            </span>
          </Typography>
        </Box>
        <Grid container justifyContent="center" spacing={3}>
          <CategoryItem
            src={PhonesCategory}
            heading="ΚΙΝΗΤΑ ΤΗΛΕΦΩΝΑ"
            dest="/categories/smartphones"
            alt="smartphones"
          />
          <CategoryItem
            src={TabletCategory}
            heading="TABLETS"
            dest="/categories/tablets"
            alt="tablets"
          />
          <CategoryItem
            src={AccessoriesCategory}
            heading="ΑΞΕΣΟΥΑΡ"
            dest="/categories/accessories"
            alt="accessories"
          />
          <CategoryItem
            src={SmartWatchCategory}
            heading="SMARTWATCHES"
            dest="/categories/smartwatches"
            alt="smartwatches"
          />
        </Grid>
      </Container>
    </div>
  );
}
