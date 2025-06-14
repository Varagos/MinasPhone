import Box from '@mui/material/Box';
import Image from 'next/image';
import Typography from '@mui/material/Typography';

import EmptyLogo from '../../../public/undraw_empty_xct9.svg';

export function EmptyProducts() {
  return (
    <main>
      <Box ml={4} py={6}>
        <Typography
          variant="h5"
          style={{ display: 'inline-block', verticalAlign: 'top' }}
        >
          Η κατηγορία είναι άδεια!
        </Typography>
        <Typography>Δοκιμάστε να επιλέξετε κάποια εναλλακτική.</Typography>
      </Box>
      <Image
        src={EmptyLogo}
        style={{ width: '50%', height: 'auto' }}
        alt="Empty products"
      />
    </main>
  );
}
