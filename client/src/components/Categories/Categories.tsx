import { Container, Typography, Grid, Box } from '@mui/material';
import { Link } from 'react-router-dom';

import useStyles from './styles';
import TabletCategory from '../../assets/tablet-category.jpg';
import SmartWatchCategory from '../../assets/smartwatch-category.jpg';
import CategoryItem from '../Landing/CategoryItem/CategoryItem';

const Categories = () => {
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
            src="https://www.brokencare.in/images/iphone/iphone-12-service.png"
            heading="ΚΙΝΗΤΑ ΤΗΛΕΦΩΝΑ"
            dest="/category/smartphones"
          />
          <CategoryItem src={TabletCategory} heading="TABLETS" dest="/category/tablets" />
          <CategoryItem
            src="https://i.ibb.co/R6vPgNz/Hnet-com-image.png"
            heading="ΑΞΕΣΟΥΑΡ"
            dest="/category/accessories"
          />
          <CategoryItem src={SmartWatchCategory} heading="SMARTWATCHES" dest="/category/smartwatches" />
        </Grid>
      </Container>
    </div>
  );
};
export default Categories;
