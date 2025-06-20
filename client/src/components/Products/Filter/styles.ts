import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';

export const PriceInputField = styled(TextField)(({ theme }) => ({
  '& input[type=number]::-webkit-inner-spin-button': {
    WebkitAppearance: 'none',
    margin: 0,
  },
  '& input[type=number]::-webkit-outer-spin-button': {
    WebkitAppearance: 'none',
    margin: 0,
  },
  '& input[type=number]': {
    MozAppearance: 'textfield',
  },
}));
