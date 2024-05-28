import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Checkbox from "@mui/material/Checkbox";
import { FormattedMovie } from "../../types/data";

interface RowProps {
  isSelected: (id: number) => boolean;
  handleClick: (event: React.MouseEvent<unknown>, id: number) => void;
  index: number;
  row: FormattedMovie;
}

export function Row(props: RowProps) {
  const { isSelected, handleClick, index, row } = props;
  const isItemSelected = isSelected(index);
  const labelId = `enhanced-table-checkbox-${index}`;

  return (
    <TableRow
      hover
      onClick={(event) => handleClick(event, index)}
      role="checkbox"
      aria-checked={isItemSelected}
      tabIndex={-1}
      key={row.id}
      selected={isItemSelected}
      sx={{ cursor: "pointer" }}
    >
      <TableCell component="th" id={labelId} scope="row" padding="none" sx={{textAlign: 'right'}}>
        {row.id}
      </TableCell>
      <TableCell align="right">{row.title}</TableCell>
      <TableCell align="right">{row.averageReview}</TableCell>
      <TableCell align="right">{row.filmCompany}</TableCell>
      <TableCell align="right">{row.cost}</TableCell>
      <TableCell align="right">{row.releaseYear}</TableCell>
    </TableRow>
  );
}
