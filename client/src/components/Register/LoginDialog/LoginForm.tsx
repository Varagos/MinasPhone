import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Box, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { commerce } from '../../lib/commerce';

type LoginFormProps = {
  open: boolean;
  handleClose: () => void;
};

const theme = createTheme();

export default function LoginForm({ open, handleClose }: LoginFormProps) {
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // console.log({
    //   email: data.get('email'),
    // });
    const email = (data.get('email') ?? '') as string;
    const res = await commerce.customer.login(email, 'http://localhost:3000/login/callback');
    // console.log('res', res);
  };

  return (
    <ThemeProvider theme={theme}>
      <div>
        <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
          <DialogTitle>
            Σύνδεση
            <IconButton
              aria-label="close"
              onClick={handleClose}
              sx={{
                position: 'absolute',
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500],
              }}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <Box component="form" onSubmit={handleSubmit} noValidate>
            <DialogContent>
              <DialogContentText>
                Αν δεν είσαι εγγεγραμμένος, ο λογαριασμός σου θα δημιουργηθεί αυτόματα.
              </DialogContentText>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
                autoFocus
                sx={{ bgcolor: 'background.paper', mt: 2 }}
              />
            </DialogContent>
            <DialogActions>
              <Button
                type="submit"
                size="large"
                variant="contained"
                sx={{ mt: 3, mb: 2, mr: 2 }}
                style={{ textTransform: 'none' }}
              >
                Καλωσόρισες!
              </Button>
            </DialogActions>
          </Box>
        </Dialog>
      </div>
    </ThemeProvider>
  );
}
