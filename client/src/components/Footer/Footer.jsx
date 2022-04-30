import { Container, Grid, Box, Link, Divider, Typography } from '@mui/material';
import { Home, Email, Phone, Schedule } from '@mui/icons-material';
import ContactRow from './ContactRow/ContatctRow';

const Footer = () => {
  return (
    <footer
    // style={{ position: 'absolute', bottom: 0 }}
    >
      <Box px={{ xs: 3, sm: 10 }} py={{ xs: 5, sm: 10 }} bgcolor="text.primary" color="white">
        <Container maxWidth="lg">
          <Grid container spacing={5}>
            {/* on mobile screen, each col -> full screen */}
            <Grid item xs={12} sm={4}>
              <Box borderBottom={1}>ΧΡΗΣΙΜΟΙ ΣΥΝΔΕΣΜΟΙ</Box>
              <Box>
                <Link href="/" color="inherit">
                  Όροι χρήσης
                </Link>
              </Box>
              <Box>
                <Link href="/" color="inherit">
                  Τρόποι Αποστολής & Κόστη
                </Link>
              </Box>
              <Box>
                <Link href="/" color="inherit">
                  Τρόποι Πληρωμής
                </Link>
              </Box>
              <Box>
                <Link href="/" color="inherit">
                  Ο λογαριασμός μου
                </Link>
              </Box>
            </Grid>

            <Grid item xs={12} sm={4}>
              <Box borderBottom={1} mb={4}>
                'ΕΠΙΚΟΙΝΩΝΗΣΤΕ ΜΑΖΙ ΜΑΣ'
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
            </Grid>

            <Grid item xs={12} sm={4}>
              <Box borderBottom={1}>Messages</Box>
              <Box>
                <Link href="/" color="inherit">
                  Backup
                </Link>
              </Box>
              <Box>
                <Link href="/" color="inherit">
                  History
                </Link>
              </Box>
              <Box>
                <Link href="/" color="inherit">
                  Roll
                </Link>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Divider light={true} />

      <Box textAlign="center" bgcolor="text.primary" color="white" pt={{ xs: 5, sm: 5 }} pb={{ xs: 5, sm: 5 }}>
        <strong>MINAS PHONE</strong> &reg; {new Date().getFullYear()}
      </Box>
    </footer>
  );
};

export default Footer;
