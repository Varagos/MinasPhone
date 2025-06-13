import { useTranslation } from 'next-i18next';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Home from '@mui/icons-material/Home';
import Email from '@mui/icons-material/Email';
import Phone from '@mui/icons-material/Phone';
import Schedule from '@mui/icons-material/Schedule';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import ContactRow from './ContactRow/ContactRow';
import dynamic from 'next/dynamic';

// Dynamically import CookieSettings with SSR disabled
const CookieSettings = dynamic(
  () => import('@/components/CookieConsent/CookieSettings'),
  { ssr: false }
);

const Footer = () => {
  const { t } = useTranslation('footer');
  return (
    <footer
    // style={{ position: 'absolute', bottom: 0 }}
    >
      <Box
        px={{ xs: 3, sm: 10 }}
        py={{ xs: 5, sm: 10 }}
        bgcolor="text.primary"
        color="white"
      >
        <Container maxWidth="lg">
          <Grid container spacing={5}>
            {/* on mobile screen, each col -> full screen */}
            <Grid item xs={12} sm={4}>
              <Box borderBottom={1}>{t('USEFUL_LINKS')}</Box>
              <Box sx={{ my: 2 }}>
                <Link
                  href="/information/user-terms"
                  color="inherit"
                  sx={{ textDecoration: 'none' }}
                >
                  {t('TERMS_AND_CONDITIONS')}
                </Link>
              </Box>
              <Box sx={{ my: 2 }}>
                <Link
                  href="/information/privacy-policy"
                  color="inherit"
                  sx={{ textDecoration: 'none' }}
                >
                  {t('PRIVACY_POLICY')}
                </Link>
              </Box>
              <Box sx={{ my: 2 }}>
                <Link
                  href="/information/cookie-policy"
                  color="inherit"
                  sx={{ textDecoration: 'none' }}
                >
                  {t('COOKIE_POLICY')}
                </Link>
              </Box>
              <Box sx={{ my: 2 }}>
                <Link
                  href="/information/delivery-and-costs"
                  color="inherit"
                  sx={{ textDecoration: 'none' }}
                >
                  {t('DELIVERY_AND_COSTS')}
                </Link>
              </Box>
              <Box sx={{ my: 2 }}>
                <Link
                  href="/information/payment-methods"
                  color="inherit"
                  sx={{ textDecoration: 'none' }}
                >
                  {t('PAYMENT_METHODS')}
                </Link>
              </Box>
              <Box sx={{ my: 2 }}>
                <Link
                  href="/account"
                  color="inherit"
                  sx={{ textDecoration: 'none' }}
                >
                  {t('MY_ACCOUNT')}
                </Link>
              </Box>
              <Box sx={{ my: 2 }}>
                <CookieSettings
                  label={t('COOKIE_SETTINGS')}
                  // variant="text"
                  color="inherit"
                  sx={{ textDecoration: 'none', p: 0, minWidth: 'auto' }}
                />
              </Box>
            </Grid>

            <Grid item xs={12} sm={4}>
              {/* <address> */}
              <Box borderBottom={1} mb={4}>
                {t('CONTACT.TITLE')}
              </Box>
              <ContactRow
                icon={<Home fontSize="inherit" />}
                header={t('CONTACT.ADDRESS.TITLE')}
                details={
                  <Typography variant="body2">
                    {t('CONTACT.ADDRESS.VALUE')}
                    <br /> {t('CONTACT.ADDRESS.POSTAL')}
                  </Typography>
                }
              />
              <ContactRow
                icon={<Email fontSize="inherit" />}
                header="Email :"
                details={
                  <Typography variant="body2">
                    <Link
                      color="inherit"
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        window.location.href =
                          'mailto:' + 'support' + '@' + 'minasphone.gr';
                      }}
                      dangerouslySetInnerHTML={{
                        __html: 'support&#64;minasphone.gr',
                      }}
                    />
                  </Typography>
                }
              />
              <ContactRow
                icon={<Phone fontSize="inherit" />}
                header="Τηλέφωνο :"
                details={
                  <Typography variant="body2">
                    <Link color="inherit" href="tel:+302109224764">
                      2109224764
                    </Link>
                  </Typography>
                }
              />
              <ContactRow
                icon={<Schedule fontSize="inherit" />}
                header={t('CONTACT.HOURS.TITLE')}
                details={
                  <table>
                    <tbody>
                      <tr>
                        <td>{t('CONTACT.HOURS.FIRST_ROW')}</td>
                        <td>
                          10:00 - 15:30 ,<br /> 18:00 - 21:00
                        </td>
                      </tr>
                      <tr>
                        <td>{t('CONTACT.HOURS.SECOND_ROW')}</td>
                        <td>10:00 - 15: 30</td>
                      </tr>
                    </tbody>
                  </table>
                }
              />
              {/* </address> */}
            </Grid>

            <Grid
              item
              container
              xs={12}
              sm={4}
              alignContent="center"
              justifyContent="center"
            >
              <FacebookIcon fontSize="large" sx={{ mr: 2 }} />
              <LinkedInIcon fontSize="large" sx={{ mr: 2 }} />
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Divider light={true} />

      <Box
        textAlign="center"
        bgcolor="text.primary"
        color="white"
        pt={{ xs: 5, sm: 5 }}
        pb={{ xs: 5, sm: 5 }}
      >
        <strong>MINAS PHONE</strong> &reg; {new Date().getFullYear()}
      </Box>
    </footer>
  );
};

export default Footer;
