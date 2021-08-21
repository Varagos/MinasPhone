import React from "react";
import { Box, Container, CircularProgress } from "@material-ui/core";

const Spinner = () => {
  return (
    <Container>
      <Box py={32} display='flex' justifyContent='center' alignContent='center'>
        <CircularProgress />
      </Box>
    </Container>
  );
};

export default Spinner;
