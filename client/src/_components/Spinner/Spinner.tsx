import React from 'react';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Container from '@mui/material/Container';

const Spinner = () => {
  return (
    <Container>
      <Box py={32} display="flex" justifyContent="center" alignContent="center">
        <CircularProgress />
      </Box>
    </Container>
  );
};

export default Spinner;
