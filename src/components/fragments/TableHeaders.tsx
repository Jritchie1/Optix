import Box from '@mui/material/Box';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import { tableHeaders } from '../../data/HeaderData';
import { visuallyHidden } from '@mui/utils';
import { FormattedMovie } from '../../types/data';

type Order = 'asc' | 'desc';

interface HeaderProps {
    numSelected: number;
    onRequestSort: (event: React.MouseEvent<unknown>, property: keyof FormattedMovie) => void;
    order: Order;
    orderBy: string;
    rowCount: number;
}

export function TableHeader(props: HeaderProps) {
    const { order, orderBy, onRequestSort } =
    props;
    const createSortHandler = (property: keyof FormattedMovie) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };
   return( 
        <TableHead>
            <TableRow>
                {tableHeaders.map((headCell) => (
                <TableCell
                    key={headCell.id}
                    align={headCell.numeric ? 'right' : 'left'}
                    padding={headCell.disablePadding ? 'none' : 'normal'}
                    sortDirection={orderBy === headCell.id ? order : false}
                >
                    <TableSortLabel
                    active={orderBy === headCell.id}
                    direction={orderBy === headCell.id ? order : 'asc'}
                    onClick={createSortHandler(headCell.id)}
                    >
                    {headCell.label}
                    {orderBy === headCell.id ? (
                        <Box component="span" sx={visuallyHidden}>
                        {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                        </Box>
                    ) : null}
                    </TableSortLabel>
                </TableCell>
                ))}
            </TableRow>
        </TableHead>
    )
}