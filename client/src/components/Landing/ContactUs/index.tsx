import React from 'react';
import { styled } from '@mui/material/styles';
import {
  Grid,
  Typography,
  TextField,
  Button,
  Box,
  FormLabel,
} from '@mui/material';

// Styled Components
const ContactSection = styled(Box)(({ theme }) => ({
  backgroundColor: '#f5f5f5',
  padding: theme.spacing(8),
  position: 'relative',
}));

const ContactGrid = styled(Grid)(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    justifyContent: 'center',
  },
}));

const ContactForm = styled('form')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'left',
  justifyContent: 'center',
});

const StyledTextField = styled(TextField)(({ theme }) => ({
  marginBottom: theme.spacing(1),
  width: '100%', // You might want to set a max-width for larger screens
}));

const SendButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
}));

const ContactInfo = styled(Grid)(({ theme }) => ({
  textAlign: 'center',
  [theme.breakpoints.up('md')]: {
    textAlign: 'right',
    paddingRight: theme.spacing(2),
  },
}));

// Component
const ContactUsSection = () => {
  return (
    <ContactSection>
      <ContactGrid container spacing={2}>
        <ContactInfo item xs={12} md={5} paddingTop={8}>
          <Typography variant="h4" gutterBottom align="left">
            Contact Us Today
          </Typography>
          <Typography align="left">
            Fill out the form below to get in touch with our team. We&apos;re
            here to answer any questions you may have and provide expert advice
            for all your electronics smartphone needs.
          </Typography>
        </ContactInfo>
        <Grid item xs={12} md={7}>
          <ContactForm>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'stretch',
              }}
            >
              <StyledTextField label="Name" variant="outlined" />
              <div style={{ width: '40px' }}></div>
              <StyledTextField label="E-mail" variant="outlined" />
            </Box>
            <StyledTextField
              label="Message"
              variant="outlined"
              multiline
              rows={4}
            />
            <SendButton variant="contained" color="primary">
              Send
            </SendButton>
          </ContactForm>
        </Grid>
      </ContactGrid>
    </ContactSection>
  );
};

export default ContactUsSection;
