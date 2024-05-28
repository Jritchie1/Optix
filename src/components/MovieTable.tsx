import * as React from 'react';
import { alpha } from '@mui/material/styles';
import { Box, Table, TableBody, TableCell, TableContainer, TablePagination, TableRow, Toolbar, Typography, Paper} from '@mui/material';
import { useState } from 'react';
import { FormattedMovie, Movie, DataState, Order } from '../types/data';
import { TableHeader } from './fragments/TableHeaders';
import { Row } from './fragments/TableRow';
import { BasicModal } from './Modal';
import { EnhancedToolbar } from './fragments/EnhancedToolbar';
import { GetComparator } from '../utility/sortMethods';
import { ModalProps } from '../types/modal';

export function MovieTable(props: {
  data: DataState,
  modal: ModalProps
}) {
  const { data, modal } = props;
  const { movies } = data;

  const [order, setOrder] = useState<Order>('asc');
  const [orderBy, setOrderBy] = useState<keyof FormattedMovie>('title');
  const [selectedId, setSelectedId] = useState<number>(-1);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [currentRow, setCurrentRow] = useState<FormattedMovie>()
  
  const handleOpen = (row: FormattedMovie) => {
    setCurrentRow(row);
    modal.handleOpen();
  };

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof FormattedMovie,
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleClick = (event: React.MouseEvent<unknown>, index: number, id: number) => {
    setSelectedId(index);
    handleOpen(movies[id]);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (id: number) => selectedId === id;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - movies.length) : 0;

  const visibleRows = React.useMemo(
    () =>
      movies.slice().sort(GetComparator(order, orderBy)),
    [order, orderBy, page, rowsPerPage],
  ); 

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <EnhancedToolbar numSelected={selectedId} />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={'medium'}
          >
            <TableHeader
              numSelected={selectedId}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={visibleRows.length}
            />
            <TableBody>
              {visibleRows.map((row, index) => {
                return (
                  <Row
                    isSelected={isSelected}
                    handleClick={(event) => handleClick( event, index, Number(row.id) - 1)}
                    index={index}
                    row={row}
                    key={row.id}
                  />
                );
              })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={movies.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
        <BasicModal
          {...modal} currentRow={currentRow}
        />
      </Paper>
    </Box>
  )
}