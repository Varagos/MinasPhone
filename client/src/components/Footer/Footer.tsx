import { Container, Grid, Box, Link, Divider, Typography } from '@mui/material';
import Home from '@mui/icons-material/Home';
import Email from '@mui/icons-material/Email';
import Phone from '@mui/icons-material/Phone';
import Schedule from '@mui/icons-material/Schedule';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import ContactRow from './ContactRow/ContactRow';

const Footer = () => {
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
              <Box borderBottom={1}>ΧΡΗΣΙΜΟΙ ΣΥΝΔΕΣΜΟΙ</Box>
              <Box sx={{ my: 2 }}>
                <Link
                  href="/information/user-terms"
                  color="inherit"
                  sx={{ textDecoration: 'none' }}
                >
                  Όροι χρήσης
                </Link>
              </Box>
              <Box sx={{ my: 2 }}>
                <Link href="/" color="inherit" sx={{ textDecoration: 'none' }}>
                  Τρόποι Αποστολής & Κόστη
                </Link>
              </Box>
              <Box sx={{ my: 2 }}>
                <Link href="/" color="inherit" sx={{ textDecoration: 'none' }}>
                  Τρόποι Πληρωμής
                </Link>
              </Box>
              <Box sx={{ my: 2 }}>
                <Link href="/" color="inherit" sx={{ textDecoration: 'none' }}>
                  Ο λογαριασμός μου
                </Link>
              </Box>
            </Grid>

            <Grid item xs={12} sm={4}>
              {/* <address> */}
              <Box borderBottom={1} mb={4}>
                ΕΠΙΚΟΙΝΩΝΗΣΤΕ ΜΑΖΙ ΜΑΣ
              </Box>
              <ContactRow
                icon={<Home fontSize="inherit" />}
                header="Διεύθυνση :"
                details={
                  <Typography variant="body2">
                    Δημητρακοπούλου 87, Αθήνα - Κουκάκι
                    <br /> 11741, ΑΤΤΙΚΗΣ
                  </Typography>
                }
              />
              <ContactRow
                icon={<Email fontSize="inherit" />}
                header="Email :"
                details={
                  <Typography variant="body2">
                    <Link color="inherit" href="mailto: support@minasphone.com">
                      support@minasphone.com
                    </Link>
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
                header="Ώρες λειτουργίας :"
                details={
                  <table>
                    <tbody>
                      <tr>
                        <td>Δευτέρα-Παρασκευή</td>
                        <td>10:00 - 15:30 , 18:00 - 21:00</td>
                      </tr>
                      <tr>
                        <td>Σάββατο</td>
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
