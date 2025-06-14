import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';

const PREFIX = 'ProductCard';

export const classes = {
  root: `${PREFIX}-root`,
  cardActions: `${PREFIX}-cardActions`,
};

export const StyledCard = styled(Card)(({ theme }) => ({
  [`&.${classes.root}`]: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    border: '1px solid #ddd',
    WebkitTransition: 'transform .6s, color .4s',
    MozTransition: 'color .4s',
    msTransition: 'color .4s',
    OTransition: 'color .4s',
    transition: 'transform .6s, color .4s',
    '&:hover': {
      borderStyle: 'solid',
    },
  },
  [`& .${classes.cardActions}`]: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
}));
