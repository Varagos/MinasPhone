import React from 'react';
import { styled } from '@mui/material/styles';
import { Grid, Typography, TextField, Button, Box } from '@mui/material';
import Container from '@mui/material/Container';
import { useTranslation } from 'next-i18next';

// Styled Components
const ContactSection = styled(Container)(({ theme }) => ({
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
  const { t } = useTranslation();

  return (
    <section style={{ backgroundColor: '#f5f5f5' }}>
      <ContactSection>
        <ContactGrid container spacing={2}>
          <ContactInfo item xs={12} md={5} paddingTop={8}>
            <Typography variant="h4" gutterBottom align="left">
              {t('CONTACT_US.TITLE')}
            </Typography>
            <Typography align="left">{t('CONTACT_US.DESCRIPTION')}</Typography>
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
                <StyledTextField
                  label={t('CONTACT_US.FORM.NAME_LABEL')}
                  variant="outlined"
                />
                <div style={{ width: '40px' }}></div>
                <StyledTextField
                  label={t('CONTACT_US.FORM.EMAIL_LABEL')}
                  variant="outlined"
                />
              </Box>
              <StyledTextField
                label={t('CONTACT_US.FORM.MESSAGE_LABEL')}
                variant="outlined"
                multiline
                rows={4}
              />
              <SendButton variant="contained" color="primary">
                {t('CONTACT_US.FORM.SEND_BUTTON')}
              </SendButton>
            </ContactForm>
          </Grid>
        </ContactGrid>
      </ContactSection>
    </section>
  );
};

export default ContactUsSection;
