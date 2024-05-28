export type MovieCompany = {
    id: string,
    name: string
}

export type Movie = {
    id: string,
    title: string,
    reviews: number[],
    filmCompanyId: string,
    cost: number,
    releaseYear: number
}

export type FormattedMovie = Omit<Movie, 'reviews' | 'filmCompanyId'> & {
    averageReview: number,
    filmCompany: string
}

export type DataState = {
    movies: FormattedMovie[];
    movieCompanies: MovieCompany[];
}

export type RawDataState = {
    movies: Movie[];
    movieCompanies: MovieCompany[];
}

export type ErrorMessage = {
    status: number;
    text: string;
}

export type Order = "asc" | "desc";