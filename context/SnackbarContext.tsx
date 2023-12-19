import React, { createContext, useState, useCallback } from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { ChildrenProps } from '@/types/utils';

type SnackbarSeverity = 'error' | 'warning' | 'info' | 'success';

interface ISnackbarContext {
  showSnackbar: ((type: SnackbarSeverity, message: string) => void) | undefined;
}

const SnackbarContext = createContext<ISnackbarContext>({ showSnackbar: undefined });

const SnackbarProvider = ({ children }: ChildrenProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const [severity, setSeverity] = useState<SnackbarSeverity>('info');
  const [message, setMessage] = useState<string>('');

  const showSnackbar = useCallback((type: SnackbarSeverity, message: string): void => {
    setOpen(true);
    setSeverity(type);
    setMessage(message);
  }, []);

  const handleClose = useCallback((event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  }, []);

  return (
    <>
      <SnackbarContext.Provider value={{ showSnackbar: showSnackbar }}>
        {children}
      </SnackbarContext.Provider>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
    </>
  );
};

export { SnackbarProvider, SnackbarContext };
