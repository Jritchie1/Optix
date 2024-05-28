import { useState, useEffect } from 'react';
import { DataState, RawDataState, ErrorMessage } from './types/data';
import { MovieTable } from './components/MovieTable';
import { Typography, Paper, Button } from '@mui/material';
import { fetchData } from './utility/dataMethods';
import { NotificationToast } from './components/NotificationToast';
import { ModalProps } from './types/modal';
import { formatData } from './utility/otherMethods';

export const App = () =>  {
  const [data, setData] = useState<DataState>({movies: [], movieCompanies: []});
  const [error, setError] = useState<ErrorMessage>({status: 202, text: 'Loading...  Please wait'});
  const [notificationOpen, setNotificationOpen] = useState<boolean>(false);
  const [notificationMessage, setNotificationMessage] = useState<string>();
  const [modalOpen, setModalOpen] = useState(false);

  // Below methods would be candidates to be put into a resolvers file
  const handleModalOpen = () => {
    setModalOpen(true);
  }

  const handleModalClose = () => {
    setModalOpen(false);
  }
  
  const handleNotificationOpen = () => {
    setNotificationOpen(true);
  }

  const handleNotificationClose = () => {
    setNotificationOpen(false);
  }

  const updateNotificationMessage = (message: string = '') => {
    setNotificationMessage(message);
  }

  const modal: ModalProps = {
    open: modalOpen,
    handleOpen: handleModalOpen,
    handleClose: handleModalClose,
    handleNotificationOpen: handleNotificationOpen,
    handleNotificationClose: handleModalClose,
    setNotificationMessage: updateNotificationMessage
  }

  const toast: ToastProps = {
    open: notificationOpen,
    handleNotificationClose: handleNotificationClose,
    notificationMessage: notificationMessage,
  }

  const setAllData = (dataTargets: string[]) => {
    Promise.all(Array.from(dataTargets, target => fetchData(target, setError)))
      .then(values => {
        const dataObject = Object.fromEntries(dataTargets.map((_, i) => [dataTargets[i], values[i]]));
        setData(formatData(dataObject as RawDataState));
      })
  }

  useEffect(() => {
    setAllData(['movies', 'movieCompanies'])
  }, [])
  
  if (data.movies.length && data.movieCompanies.length) {
    return (
      <div style={{margin: 5}}>
        <MovieTable data={data} modal={modal} />
        <Button variant="contained" onClick={() => setAllData(['movies', 'movieCompanies'])} sx={{mr: 1, mt: 1}}>
            Refresh Data
        </Button>
        <Button variant="contained" onClick={
          () => {
            setData({movies: [], movieCompanies: []})
            setAllData(['moviesFail', 'movieCompaniesFail'])
          }
        } sx={{mt: 1}}>
            Simulate 404 Error
        </Button>
        <NotificationToast
          open={notificationOpen}
          notificationMessage={notificationMessage}
          handleNotificationClose={handleNotificationClose}
        />
      </div>
    );
  }
  else {
    return (
      <div style={{margin: 5}}>
        <Paper sx={{ width: '100%' }}>
            <Typography id="response-code" variant="h6" component="h2" sx={{ m: 2 }}>
              {error?.status}
            </Typography>
            <Typography id="response-text" sx={{ m: 1, mt: 2 }}>
              {error?.text}
            </Typography>
            <Button variant="contained" onClick={() => setAllData(['movies', 'movieCompanies'])} sx={{m: 1}}>
              Reload Data
            </Button>
        </Paper>
      </div>
    )
  }
}