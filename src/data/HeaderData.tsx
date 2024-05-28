import { FormattedMovie } from "../types/data";

interface HeadCell {
    disablePadding: boolean;
    id: keyof FormattedMovie;
    label: string;
    numeric: boolean;
}
  
export const tableHeaders: readonly HeadCell[] = [
{
    id: 'id',
    numeric: false,
    disablePadding: false,
    label: 'ID',
},
{
    id: 'title',
    numeric: false,
    disablePadding: false,
    label: 'Title',
},
{
    id: 'averageReview',
    numeric: true,
    disablePadding: false,
    label: 'Reviews',
},
{
    id: 'filmCompany',
    numeric: true,
    disablePadding: false,
    label: 'Film Company',
},
{
    id: 'cost',
    numeric: true,
    disablePadding: false,
    label: 'Cost',
},
{
    id: 'releaseYear',
    numeric: true,
    disablePadding: false,
    label: 'Year of Release',
},
];