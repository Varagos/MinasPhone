import { Container, Typography, Grid, Box } from '@mui/material';
import { Link } from 'react-router-dom';

import useStyles from './styles';
import CategoryItem from './CategoryItem/CategoryItem';
import ProductCard from '../Category/Products/ProductCard/ProductCard';
import PhoneFix from '../../assets/undraw_phone_fix.svg';
import TabletCategory from '../../assets/tablet-category.jpg';
import SmartWatchCategory from '../../assets/smartwatch-category.jpg';
import Carousel from 'react-material-ui-carousel';

const Landing = ({ recommendedProducts }: any) => {
  const classes = useStyles();
  const items = [
    {
      name: 'Random name #1',
      description: 'Probably the most random then you have ever seen',
      url: 'https://www.globalphone.gr/image/cache/catalog/Banners/redmi%20note%209%20pro-1920x800.jpg',
    },
    {
      name: 'Random name #2',
      description: 'Hello world',
      url: 'https://www.globalphone.gr/image/cache/catalog/Pocophone%20X3/poco%20x3%20banner%201-1920x800.jpg',
    },
  ];
  console.log(recommendedProducts);

  function Item({ item }: any) {
    return (
      <Link to="/products">
        <div>
          <img className={classes.media} src={item.url} alt="samsung phones"></img>
        </div>
      </Link>
    );
  }

  const shuffled = recommendedProducts.sort(() => 0.5 - Math.random());

  return (
    <main className={classes.content}>
      <Carousel>
        {items.map((item, index) => (
          <Item key={index} item={item} />
        ))}
      </Carousel>
      <section>
        <Container>
          <Box my={8}>
            <Typography variant="h4" align="center" gutterBottom>
              <span className={classes.sectionTitle}>ΔΗΜΟΦΙΛΕΙΣ ΚΑΤΗΓΟΡΙΕΣ</span>
            </Typography>
          </Box>
          <Grid container justifyContent="center" spacing={3}>
            <CategoryItem
              src="https://www.brokencare.in/images/iphone/iphone-12-service.png"
              heading="SMARTPHONES"
              dest="/category/smartphones"
            />
            <CategoryItem src={TabletCategory} heading="TABLETS" dest="/category/tablets" />
            <CategoryItem
              src="https://i.ibb.co/R6vPgNz/Hnet-com-image.png"
              heading="ACCESSORIES"
              dest="/category/accessories"
            />
            <CategoryItem src={SmartWatchCategory} heading="SMARTWATCHES" dest="/category/smartwatches" />
          </Grid>
        </Container>
      </section>
      <section>
        <Container>
          <Box my={8}>
            <Typography variant="h4" align="center" gutterBottom>
              <span className={classes.sectionTitle}>ΠΡΟΤΕΙΝΟΥΜΕ</span>
            </Typography>
          </Box>

          <Grid container justifyContent="center" spacing={2} alignItems="stretch">
            {shuffled.slice(0, 4).map((product: any) => (
              <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
                <ProductCard product={product} />
              </Grid>
            ))}
          </Grid>
        </Container>
      </section>
      <section>
        <Box py={16}>
          <Typography variant="h4" align="center" gutterBottom>
            <span className={classes.sectionTitle}>ΕΠΙΣΚΕΥΕΣ ΤΗΛΕΦΩΝΩΝ</span>
          </Typography>
          <Grid container justifyContent="center" spacing={3}>
            <Grid container item xs={12} md={6} alignContent="center" justifyContent="center">
              <img src={PhoneFix} alt="phone repairs" style={{ width: '90%', height: 'auto' }} />
            </Grid>
            <Grid container item xs={12} md={6} alignContent="center" justifyContent="center">
              <Container>
                <Typography variant="h6" align="left" gutterBottom>
                  ΕΠΙΣΚΕΥΕΣ ΤΗΛΕΦΩΝΩΝ
                </Typography>
                <Typography>
                  Σε μια εποχή όπου κυριαρχούν τα πανάκριβα smartphones με τις αμέτρητες λειτουργίες, το παραδοσιακό
                  κλασικό κινητό τηλέφωνο καταφέρνει να διατηρεί την αξία του, κι αυτό δεν είναι καθόλου τυχαίο.
                </Typography>
                <Typography variant="h6" align="left" gutterBottom>
                  Υψηλής ποιότητας ανταλλακτικά
                </Typography>
                <Typography>
                  Χρησιμοποιούμε για την επισκευή κινητών πάντα τα καλύτερα ανταλλακτικά που υπάρχουν στην αγορά.
                  Κριτήρια για την επιλογή τους, είναι η απόδοση και η αντοχή. Ο λόγος είναι πως επιθυμούμε σε κάθε μας
                  επισκευή το καλύτερο δυνατό αποτέλεσμα και με διάρκεια στο χρόνο.
                </Typography>

                <Typography variant="h6" align="left" gutterBottom>
                  Οικονομικές τιμές
                </Typography>
                <Typography>
                  Τις ποιοτικές μας υπηρεσίες έχουμε φροντίσει και τις προσφέρουμε στις καλύτερες δυνατές τιμές της
                  αγοράς. Στο κατάστημα μας πραγματοποιούμε τις πιο συμφέρουσες επισκευές κινητών τηλεφώνων.
                </Typography>
              </Container>
            </Grid>
          </Grid>
        </Box>
      </section>
    </main>
  );
};

export default Landing;
