import Snackbar, { SnackbarCloseReason } from '@mui/material/Snackbar';
import MuiAlert, { AlertColor } from '@mui/material/Alert';
import { styled } from '@mui/material/styles';
import { SyntheticEvent } from 'react';

const StyledAlert = styled(MuiAlert)(({ theme }) => ({
  // Custom styles here
  // Add padding to the text
  '& .MuiAlert-message': {
    padding: theme.spacing(1, 2), // Adjust padding as needed
  },
}));

export type Message = {
  text: string;
  type: AlertColor;
  style?: React.CSSProperties;
};

type MessageDisplayProps = {
  message: Message;
  onClose: any;
  //    (
  //     event: Event | SyntheticEvent<any, Event>,
  //     reason: SnackbarCloseReason
  //   ) => void;
};

// How to use:
//   const dispatchMessage = useMessage()!;

//   useEffect(() => {
//     dispatchMessage({
//       text: 'An error occurred!',
//       // style: { backgroundColor: 'red', color: 'white' },
//       type: 'error',
//     });
//   }, []);

export default function MessageDisplay({
  message,
  onClose,
}: MessageDisplayProps) {
  return (
    <Snackbar
      open={Boolean(message)}
      autoHideDuration={6000}
      onClose={onClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }} // Center horizontally
      style={{ maxWidth: '80%', width: '100%' }} // Adjust width as needed
    >
      <StyledAlert
        onClose={onClose}
        severity={message?.type || 'info'}
        elevation={6}
        variant="filled"
      >
        {message?.text}
      </StyledAlert>
    </Snackbar>
  );
}
