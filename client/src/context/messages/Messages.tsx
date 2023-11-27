import { createContext, useContext, useState, useCallback } from 'react';
import MessageDisplay, { Message } from './MessageDisplay';
import { SnackbarCloseReason } from '@mui/material/Snackbar';

type MessageContextType = (msg: Message) => void;
const MessageContext = createContext<MessageContextType | null>(null);

export const useMessage = () => useContext(MessageContext);

type MessageProviderProps = {
  children: React.ReactNode;
};

export const MessageProvider = ({ children }: MessageProviderProps) => {
  const [message, setMessage] = useState<Message | null>(null);

  const dispatchMessage = useCallback((msg: Message) => {
    setMessage(msg);
    // Auto-dismiss after 5 seconds
    setTimeout(() => setMessage(null), 5000);
  }, []);

  const handleClose = (event: Event, reason: SnackbarCloseReason) => {
    if (reason === 'clickaway') {
      return;
    }
    setMessage(null);
  };

  return (
    <MessageContext.Provider value={dispatchMessage}>
      {children}
      {message && <MessageDisplay message={message} onClose={handleClose} />}
    </MessageContext.Provider>
  );
};
