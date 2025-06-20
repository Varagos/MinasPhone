'use client';
import React from 'react';
import {
  Container,
  Typography,
  Box,
  Paper,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Link as MuiLink,
  List,
  ListItem,
  ListItemText,
  Alert,
  TypographyProps,
  TableContainerProps,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import Head from 'next/head';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  marginBottom: theme.spacing(3),
  borderRadius: theme.spacing(2),
}));

const SectionTitle = styled(Typography)<
  TypographyProps & { component: React.ElementType }
>(({ theme }) => ({
  marginTop: theme.spacing(4),
  marginBottom: theme.spacing(2),
  fontWeight: 600,
  color: theme.palette.primary.main,
}));

const StyledTableContainer = styled(TableContainer)<
  TableContainerProps & { component: React.ElementType }
>(({ theme }) => ({
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(3),
  '& .MuiTableCell-head': {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    fontWeight: 600,
  },
}));

const CookiePolicy: React.FC = () => {
  const lastUpdated = 'June 7, 2025';

  return (
    <>
      <Head>
        <title>Cookie Policy - Minas Phone</title>
        <meta
          name="description"
          content="Learn about how Minas Phone uses cookies on our website to improve your browsing experience."
        />
        <meta name="robots" content="index, follow" />
      </Head>

      <Container maxWidth="lg" sx={{ py: 4 }}>
        <StyledPaper elevation={2}>
          <Box textAlign="center" mb={4}>
            <Typography
              variant="h3"
              component="h1"
              gutterBottom
              fontWeight="bold"
            >
              Cookie Policy
            </Typography>
            <Typography variant="h6" color="text.secondary">
              Minas Phone
            </Typography>
            <Typography variant="body2" color="text.secondary" mt={1}>
              Last updated: {lastUpdated}
            </Typography>
          </Box>

          <Alert severity="info" sx={{ mb: 3 }}>
            This Cookie Policy explains how Minas Phone uses cookies and similar
            technologies when you visit our website at www.minasphone.gr
          </Alert>

          <Divider sx={{ my: 3 }} />

          <SectionTitle variant="h4" component="h2">
            What Are Cookies?
          </SectionTitle>
          <Typography variant="body1" paragraph>
            Cookies are small text files that are placed on your computer or
            mobile device when you visit a website. They are widely used to make
            websites work more efficiently and to provide information to website
            owners.
          </Typography>

          <SectionTitle variant="h4" component="h2">
            How We Use Cookies
          </SectionTitle>
          <Typography variant="body1" paragraph>
            We use cookies to enhance your browsing experience, analyze website
            traffic, and understand where our visitors are coming from. The
            cookies we use fall into the following categories:
          </Typography>

          <StyledTableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Cookie Type</TableCell>
                  <TableCell>Purpose</TableCell>
                  <TableCell>Duration</TableCell>
                  <TableCell>Required</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <Chip label="Essential" color="error" size="small" />
                  </TableCell>
                  <TableCell>
                    Necessary for the website to function properly. These
                    cookies enable basic website functionality.
                  </TableCell>
                  <TableCell>Session/Persistent</TableCell>
                  <TableCell>
                    <Chip label="Yes" color="error" size="small" />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Chip label="Analytics" color="primary" size="small" />
                  </TableCell>
                  <TableCell>
                    Help us understand how visitors interact with our website by
                    collecting and reporting information anonymously.
                  </TableCell>
                  <TableCell>Up to 2 years</TableCell>
                  <TableCell>
                    <Chip label="No" color="success" size="small" />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Chip label="Performance" color="secondary" size="small" />
                  </TableCell>
                  <TableCell>
                    Allow us to count visits and traffic sources to measure and
                    improve website performance.
                  </TableCell>
                  <TableCell>Up to 1 year</TableCell>
                  <TableCell>
                    <Chip label="No" color="success" size="small" />
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </StyledTableContainer>

          <SectionTitle variant="h4" component="h2">
            Third-Party Cookies
          </SectionTitle>
          <Typography variant="body1" paragraph>
            We use Google Analytics to analyze website usage and improve our
            services. Google Analytics uses cookies to collect information about
            your use of our website.
          </Typography>

          <Box sx={{ bgcolor: 'grey.50', p: 3, borderRadius: 2, my: 3 }}>
            <Typography variant="h6" gutterBottom fontWeight="600">
              Google Analytics Cookies
            </Typography>
            <List dense>
              <ListItem>
                <ListItemText
                  primary="_ga"
                  secondary="Distinguishes unique users. Expires after 2 years."
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="_ga_[ID]"
                  secondary="Used to persist session state. Expires after 2 years."
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="_gid"
                  secondary="Distinguishes users. Expires after 24 hours."
                />
              </ListItem>
            </List>
            <Typography variant="body2" color="text.secondary" mt={2}>
              For more information about Google Analytics cookies, visit:{' '}
              <MuiLink
                href="https://developers.google.com/analytics/devguides/collection/analyticsjs/cookie-usage"
                target="_blank"
                rel="noopener noreferrer"
              >
                Google Analytics Cookie Usage
              </MuiLink>
            </Typography>
          </Box>

          <SectionTitle variant="h4" component="h2">
            Managing Your Cookie Preferences
          </SectionTitle>
          <Typography variant="body1" paragraph>
            You can control and manage cookies in various ways:
          </Typography>

          <List>
            <ListItem>
              <ListItemText
                primary="Browser Settings"
                secondary="Most web browsers allow you to control cookies through their settings preferences."
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Opt-out Tools"
                secondary="You can opt-out of Google Analytics by installing the Google Analytics Opt-out Browser Add-on."
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Third-party Tools"
                secondary="Various third-party tools are available to help you manage cookies across different websites."
              />
            </ListItem>
          </List>

          <Alert severity="warning" sx={{ my: 3 }}>
            Please note that disabling cookies may affect the functionality of
            our website and your user experience may be limited.
          </Alert>

          <SectionTitle variant="h4" component="h2">
            Updates to This Policy
          </SectionTitle>
          <Typography variant="body1" paragraph>
            We may update this Cookie Policy from time to time to reflect
            changes in our practices or for other operational, legal, or
            regulatory reasons. We will notify you of any material changes by
            posting the updated policy on our website.
          </Typography>

          <SectionTitle variant="h4" component="h2">
            Contact Information
          </SectionTitle>
          <Typography variant="body1" paragraph>
            If you have any questions about this Cookie Policy or our use of
            cookies, please contact us:
          </Typography>

          <Box sx={{ bgcolor: 'primary.50', p: 3, borderRadius: 2, mt: 2 }}>
            <Typography variant="body1" gutterBottom>
              <strong>Minas Phone</strong>
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Address: Dimitrakopoulou 87, Athens - Koukaki 11741, Attika,
              Greece
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Website: www.minasphone.gr
            </Typography>
          </Box>

          <Divider sx={{ my: 4 }} />

          <Box textAlign="center">
            <Typography variant="body2" color="text.secondary">
              This policy is effective as of {lastUpdated} and was last updated
              on {lastUpdated}.
            </Typography>
          </Box>
        </StyledPaper>
      </Container>
    </>
  );
};

export default CookiePolicy;
