'use client';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Image from 'next/image';
import Link from 'next/link';
import Head from 'next/head';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import EmptyLogo from '/public/undraw_empty_xct9.svg';

export default function Custom404() {
  const router = useRouter();
  const [countdown, setCountdown] = useState(10);

  // Auto-redirect after 10 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/');
    }, 10000);

    const countdownInterval = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => {
      clearTimeout(timer);
      clearInterval(countdownInterval);
    };
  }, [router]);

  return (
    <>
      <Head>
        <title>404 - Σελίδα δεν βρέθηκε | MinasPhone</title>
        <meta
          name="description"
          content="Η σελίδα που αναζητάτε δεν βρέθηκε."
        />
      </Head>
      <Container sx={{ py: 4 }}>
        <Container maxWidth="md">
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: '70vh',
              py: 8,
              textAlign: 'center',
            }}
          >
            <Typography
              variant="h2"
              component="h1"
              gutterBottom
              sx={{
                fontWeight: 700,
                color: 'primary.main',
                mb: 2,
              }}
            >
              404
            </Typography>

            <Typography variant="h4" component="h2" gutterBottom sx={{ mb: 1 }}>
              Ωχ! Χάσατε το δρόμο σας;
            </Typography>

            <Typography variant="body1" sx={{ mb: 4, maxWidth: '600px' }}>
              Φαίνεται ότι ψάχνετε για ένα προϊόν που εξαφανίστηκε σαν τα
              ακουστικά που πάντα χάνονται στις τσέπες μας. Η σελίδα που
              αναζητάτε δεν υπάρχει ή μετακινήθηκε.
            </Typography>

            <Box
              sx={{
                width: '280px',
                height: '280px',
                position: 'relative',
                mb: 4,
              }}
            >
              <Image
                src={EmptyLogo}
                alt="Page not found"
                style={{ width: '100%', height: 'auto' }}
                priority
              />
            </Box>

            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 2,
              }}
            >
              <Button
                variant="contained"
                color="primary"
                component={Link}
                href="/"
                size="large"
                sx={{
                  px: 4,
                  py: 1,
                  borderRadius: 2,
                  fontWeight: 600,
                }}
              >
                Επιστροφή στην Αρχική
              </Button>

              <Typography variant="body2" color="text.secondary">
                Αυτόματη ανακατεύθυνση σε {countdown} δευτερόλεπτα...
              </Typography>
            </Box>

            <Box sx={{ mt: 6 }}>
              <Typography variant="body2" color="text.secondary">
                Μήπως ψάχνετε για:
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  flexWrap: 'wrap',
                  gap: 2,
                  mt: 2,
                }}
              >
                <Button
                  variant="outlined"
                  size="small"
                  component={Link}
                  href="/products"
                >
                  Όλα τα Προϊόντα
                </Button>
                <Button
                  variant="outlined"
                  size="small"
                  component={Link}
                  href="/categories"
                >
                  Κατηγορίες
                </Button>
                <Button
                  variant="outlined"
                  size="small"
                  component={Link}
                  href="/#contact"
                >
                  Επικοινωνία
                </Button>
              </Box>
            </Box>
          </Box>
        </Container>
      </Container>
    </>
  );
}
