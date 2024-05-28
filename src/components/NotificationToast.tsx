import { useState, Fragment } from 'react';
import { IconButton, Snackbar } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

interface ToastProps {
    open: boolean
    handleNotificationClose: () => void;
    notificationMessage: string | undefined;
}

export function NotificationToast(props: ToastProps) {
    const { open, notificationMessage, handleNotificationClose } = props;

    const notification = (
      <Fragment>
        <IconButton
          size="small"
          aria-label="close"
          color="inherit"
          onClick={handleNotificationClose}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </Fragment>
    );

    return (
        <Snackbar
            open={open}
            autoHideDuration={6000}
            onClose={handleNotificationClose}
            message={notificationMessage}
            action={notification}
          />
    )
}