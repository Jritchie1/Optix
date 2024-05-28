import { useState, useEffect } from 'react';
import { Movie, DataState, FormattedMovie, MovieCompany, RawDataState, ErrorMessage } from './types/data';
import { MovieTable } from './components/MovieTable';
import { Typography, Paper, Box, Button } from '@mui/material';
import { fetchData } from './utility/dataMethods';
import { NotificationToast } from './components/NotificationToast';
import { ModalProps } from './types/modal';

const calculateAverageReview = (reviews: number[]): number => {
  return Number((reviews.reduce((previous, current) => previous + current, 0)/reviews.length).toFixed(1));
}

const getFilmCompanyName = (filmCompanyId: string, filmCompanies: MovieCompany[]): string => {
  const companyName = filmCompanies.find(({id}) => id === filmCompanyId)?.name;
  if (companyName) {
    return companyName;
  }
  else {
    return 'Unknown';
  }
}

const formatMovies = (movies: Movie[], movieCompanies: MovieCompany[]): FormattedMovie[] => {
  if (movies) {
    return movies.map((movie) => {
      const averageReview = calculateAverageReview(movie.reviews);
      const filmCompany = getFilmCompanyName(movie.filmCompanyId, movieCompanies);
      return {
        ...movie,
        averageReview: averageReview,
        filmCompany: filmCompany
      };
    })
  }
  else {
    return [];
  }
}

const formatData = (data: RawDataState): DataState => {
  return {
    ...data,
    movies: formatMovies(data.movies, data.movieCompanies)
  };
}

export const App = () =>  {
  const [data, setData] = useState<DataState>({movies: [], movieCompanies: []});
  const [error, setError] = useState<ErrorMessage>({status: 202, text: 'Loading...  Please wait'});
  const [notificationOpen, setNotificationOpen] = useState<boolean>(false);
  const [notificationMessage, setNotificationMessage] = useState<string>();
  const [modalOpen, setModalOpen] = useState(false);

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
      <Box sx={{ width: '100%', m: 1 }}>
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
      </Box>
    )
  }
}