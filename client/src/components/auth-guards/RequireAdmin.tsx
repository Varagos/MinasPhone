import Container from '@mui/material/Container';
import ClusterImg from '../../assets/cluster.svg';

import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../redux/store';
import { Box, Grid, Typography } from '@mui/material';

const RequireAdminAuth = ({ children }: { children: JSX.Element }): any => {
  const location = useLocation();
  const navigate = useNavigate();

  const user = useAppSelector((state) => state.user.data);
  if (user && user.role !== 'admin') {
    return (
      <Container sx={{ pt: 5 }}>
        <Grid container spacing={2}>
          <Grid item xs={7}>
            <Typography variant="h3" gutterBottom>
              Unauthorized
            </Typography>
            <Typography variant="body1">Sorry, You Are Not Allowed to Access This Page</Typography>
          </Grid>
          <Grid item xs={5}>
            <Box
              component="img"
              sx={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                // height: 233,
                // width: 350,
                // maxHeight: { xs: 233, md: 167 },
                // maxWidth: { xs: 350, md: 250 },
              }}
              alt="The house from the offer."
              src={ClusterImg}
            />
          </Grid>
        </Grid>
      </Container>
    );
  }

  if (user && user.role === 'admin') {
    return children;
  }

  // Redirect them to the /login page, but save the current location they were
  // trying to go to when they were redirected. This allows us to send them
  // along to that page after they login, which is a nicer user experience
  // than dropping them off on the home page.
  return <Navigate to="/auth" state={{ from: location }} replace />;
};

export { RequireAdminAuth };
