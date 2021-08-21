import Carousel from "react-material-ui-carousel";
import { Container, Typography, Grid, Box, ListItemSecondaryAction } from "@material-ui/core";
import { Link } from "react-router-dom";

import useStyles from "./styles";
import CategoryItem from "./CategoryItem/CategoryItem";

const Landing = () => {
  const classes = useStyles();
  const items = [
    {
      name: "Random name #1",
      description: "Probably the most random then you have ever seen",
      url: "https://www.globalphone.gr/image/cache/catalog/Banners/redmi%20note%209%20pro-1920x800.jpg",
    },
    {
      name: "Random name #2",
      description: "Hello world",
      url: "https://www.globalphone.gr/image/cache/catalog/Pocophone%20X3/poco%20x3%20banner%201-1920x800.jpg",
    },
  ];

  function Item({ item }) {
    return (
      <Link to='/products'>
        <div className={classes.container}>
          <img className={classes.media} src={item.url} alt='samsung phones'></img>
        </div>
      </Link>
    );
  }
  return (
    <main className={classes.content}>
      <div className={classes.toolbar} />
      <Carousel>
        {items.map((item, index) => (
          <Item key={index} item={item} />
        ))}
      </Carousel>
      <section>
        <Container>
          <Box my={8}>
            <Typography variant='h4' align='center' gutterBottom>
              <span className={classes.sectionTitle}>ΔΗΜΟΦΙΛΕΙΣ ΚΑΤΗΓΟΡΙΕΣ</span>
            </Typography>
          </Box>
          <Grid container justifyContent='center' spacing={3}>
            <CategoryItem
              src='https://www.brokencare.in/images/iphone/iphone-12-service.png'
              heading='SMARTPHONES'
              dest='/category/smartphones'
            />
            <CategoryItem
              src='http://demo4.ltheme.com/joomla/lt-techshop/images/com_hikashop/upload/thumbnails/350x300f/apple-ipad-pro-11.webp'
              heading='TABLETS'
              dest='/category/tablets'
            />
            <CategoryItem
              src='https://i.ibb.co/R6vPgNz/Hnet-com-image.png'
              heading='ACCESSORIES'
              dest='/category/accessories'
            />
            <CategoryItem
              src='http://demo4.ltheme.com/joomla/lt-techshop/images/com_hikashop/upload/thumbnails/350x300f/apple-sport-seri-3.webp'
              heading='SMARTWATCHES'
              dest='/category/smartwatches'
            />
          </Grid>
        </Container>
      </section>
      <section>
        <Container>
          <Box my={8}>
            <Typography variant='h4' align='center' gutterBottom>
              <span className={classes.sectionTitle}>ΠΡΟΤΕΙΝΟΥΜΕ</span>
            </Typography>
          </Box>
        </Container>
      </section>
      <section>
        <Box py={16}>
          <Typography variant='h4' align='center' gutterBottom>
            <span className={classes.sectionTitle}>ΕΠΙΣΚΕΥΕΣ ΤΗΛΕΦΩΝΩΝ</span>
          </Typography>
        </Box>
      </section>
    </main>
  );
};

export default Landing;
