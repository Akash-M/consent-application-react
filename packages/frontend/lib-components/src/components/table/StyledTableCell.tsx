import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#007487',
    color: theme.palette.common.white,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));
