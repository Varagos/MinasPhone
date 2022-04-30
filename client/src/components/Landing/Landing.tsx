import { Container, Typography, Grid, Box } from '@mui/material';
import { Link } from 'react-router-dom';

import useStyles from './styles';
import CategoryItem from './CategoryItem/CategoryItem';
import Product from '../Category/Products/Product/Product';
import PhoneFix from '../../assets/undraw_phone_fix.svg';
import Carousel from 'react-material-ui-carousel';

const Landing = ({ recommendedProducts, onAddToCart }: any) => {
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
            <CategoryItem
              src="http://demo4.ltheme.com/joomla/lt-techshop/images/com_hikashop/upload/thumbnails/350x300f/apple-ipad-pro-11.webp"
              heading="TABLETS"
              dest="/category/tablets"
            />
            <CategoryItem
              src="https://i.ibb.co/R6vPgNz/Hnet-com-image.png"
              heading="ACCESSORIES"
              dest="/category/accessories"
            />
            <CategoryItem
              src="http://demo4.ltheme.com/joomla/lt-techshop/images/com_hikashop/upload/thumbnails/350x300f/apple-sport-seri-3.webp"
              heading="SMARTWATCHES"
              dest="/category/smartwatches"
            />
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
                <Product product={product} onAddToCart={onAddToCart} />
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
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend finibus tincidunt. Nulla
                  quis neque eu erat varius tincidunt id varius turpis. Praesent odio ante, dictum at turpis accumsan,
                  varius bibendum ligula. Aenean justo quam, mattis a iaculis in, sodales ut arcu. Sed ipsum neque,
                  tempus ut suscipit quis, dapibus sit amet turpis. Pellentesque quis ex sit amet ligula vestibulum
                  sagittis vel vitae tortor. Nunc eget tristique sapien. Sed ut nisi ornare, volutpat diam vel, euismod
                  est. Cras eu porta leo, vitae placerat dolor. Donec pretium mi ex, dignissim tempor nisi laoreet a.
                  Proin dignissim odio vel velit condimentum tempus. Nam neque nulla, maximus eu risus sit amet, pretium
                  pretium ligula. Suspendisse sed ipsum diam. Nam luctus lacus id nunc faucibus, ac ullamcorper odio
                  tincidunt. Nulla tincidunt neque in nisi venenatis pulvinar consequat sed ex. Vestibulum fermentum
                  suscipit quam, in fermentum lectus venenatis eu.
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
