import { Component } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
// TODO fix css imports
// import './Slick.css';
import PocoBanner from '../../../../public/poco_x3_banner_1-1920x800.jpg';
import RedMiBanner from '../../../../public/redmi note 9 pro-1920x800.jpg';
import useStyles from './styles';

function Item({ item }: { item: { url: string } }) {
  const classes = useStyles();
  return (
    <Link href="/products">
      <div>
        <Image className={classes.media} src={item.url} alt="samsung phones" />
      </div>
    </Link>
  );
}
const items: Array<{ name: string; description: string; url: any }> = [
  {
    name: 'Random name #1',
    description: 'Probably the most random then you have ever seen',
    url: RedMiBanner, // 'https://www.globalphone.gr/image/cache/catalog/Banners/redmi%20note%209%20pro-1920x800.jpg',
  },
  {
    name: 'Random name #2',
    description: 'Hello world',
    url: PocoBanner, //'https://www.globalphone.gr/image/cache/catalog/Pocophone%20X3/poco%20x3%20banner%201-1920x800.jpg',
  },
];
export default class SimpleSlider extends Component {
  // console.log('recommendedProducts:', recommendedProducts);

  render() {
    const settings = {
      arrows: true,
      autoplay: true,
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
    };

    return (
      <div>
        <Slider {...settings}>
          {items.map((item, index) => (
            <Item key={index} item={item} />
          ))}
        </Slider>
      </div>
    );
  }
}
