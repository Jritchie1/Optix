import { useState, Fragment } from 'react';
import { FormattedMovie } from '../types/data';
import { IconButton, Snackbar, Modal, Typography, TextField, Box, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { sendRequest } from '../utility/dataMethods';

interface ModalProps {
    open: boolean
    currentRow?: FormattedMovie;
    handleClose: () => void;
    handleNotificationOpen: () => void;
    handleNotificationClose: () => void;
    setNotificationMessage: () => void;
}

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  maxWidth: 0.7,
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export function BasicModal(props: ModalProps) {
  const [hasError, setHasError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [reviewText, setReviewText] = useState<string>('');
  const { open, currentRow, handleNotificationOpen, handleNotificationClose, setNotificationMessage, handleClose } = props;

  const inputPlaceholder = `What did you think of '${currentRow?.title}'?  This movie averages a rating of ${currentRow?.averageReview} among other viewers!`;

  const validateInput = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (event.target.value.length > 100) {
      setErrorMessage('Review too long!  Maximum 100 characters.');
      setHasError(true);
    }
    else {
      setErrorMessage('');
      setHasError(false);
    }
  }

  const storeReviewValue = (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>) => {
    setReviewText(event.target.value)
  }

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
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="reviewTitle"
      >
        <Box sx={style}>
          <Typography id="reviewTitle" variant="h6" component="h2">
            Reviewing: {currentRow?.title}
          </Typography>
          <form style={{marginTop: 2}} onSubmit={(event) => {
              event.preventDefault();
              sendRequest(reviewText, setNotificationMessage, handleNotificationOpen, handleClose);
              }}>
            <TextField
              id="reviewBody"
              multiline
              rows={4}
              fullWidth
              placeholder={inputPlaceholder}
              helperText={errorMessage}
              error={hasError}
              onChange={validateInput}
              onBlur={storeReviewValue}
            />
            <Button disabled={hasError} variant="contained" type="submit" sx={{mr: 1, mt: 1}}>
              Submit Review
            </Button>
            <Button variant="contained" onClick={() => {
              handleClose();
              setHasError(false);
              setErrorMessage('');
            }} sx={{mt: 1}}>
              Close
            </Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
}