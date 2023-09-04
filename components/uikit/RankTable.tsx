import React, { FC } from 'react'

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

type Column = {
  id: 'rank' | 'name' | 'stacked_time' | 'score';
  label: string;
  minWidth?: number;
  align?: 'right';
}

type TableData = {
  rank: number;
  name: string;
  stacked_time: number;
  score: number;
}

const columns: readonly Column[] = [
  { id: 'rank', label: 'ランク', minWidth: 150 },
  { id: 'name', label: '名前', minWidth: 150 },
  { id: 'stacked_time', label: '積み上げ時間', minWidth: 150},
  { id: 'score', label: 'スコア', minWidth: 150},
];

function createTableData(
  rank: number,
  name: string,
  stacked_time: number,
  score: number,
): TableData {
  return { rank, name, stacked_time, score };
}

// TODO: APIデータ受け取り。後々実装
const rows = [
  createTableData(1, 'user-a', 142.4, 82),
  createTableData(2, 'user-b', 142.4, 82),
  createTableData(3, 'user-c', 142.4, 82),
  createTableData(4, 'user-d', 142.4, 82),
  createTableData(5, 'user-e', 142.4, 82),
  createTableData(6, 'user-f', 142.4, 82),
  createTableData(7, 'user-g', 142.4, 82),
  createTableData(8, 'user-h', 142.4, 82),
  createTableData(9, 'user-i', 142.4, 82),
  createTableData(10, 'user-j', 142.4, 82),
  createTableData(11, 'user-k', 142.4, 82),
  createTableData(12, 'user-l', 142.4, 82),
  createTableData(13, 'user-m', 142.4, 82),
  createTableData(14, 'user-n', 142.4, 82),
  createTableData(15, 'user-o', 142.4, 82),
  createTableData(16, 'user-p', 142.4, 82),
  createTableData(17, 'user-q', 142.4, 82),
  createTableData(18, 'user-r', 142.4, 82),
  createTableData(19, 'user-s', 142.4, 82),
  createTableData(20, 'user-t', 142.4, 82),
  createTableData(21, 'user-u', 142.4, 82),
  createTableData(22, 'user-v', 142.4, 82),
  createTableData(23, 'user-w', 142.4, 82),
  createTableData(24, 'user-x', 142.4, 82),
  createTableData(25, 'user-y', 142.4, 82),
  createTableData(26, 'user-z', 142.4, 82),
];

const RankTable: FC = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(6);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <>
      <TableContainer>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth, backgroundColor: "#F0F8FA" }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.rank}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[6, 12, 24, 48, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  )
}

export default RankTable
