import { DataState, FormattedMovie, Movie, MovieCompany, RawDataState } from "../types/data";

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

export const formatData = (data: RawDataState): DataState => {
  return {
    ...data,
    movies: formatMovies(data.movies, data.movieCompanies)
  };
}