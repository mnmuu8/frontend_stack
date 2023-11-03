import React, { FC, useContext, useEffect, useState } from 'react'

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { getSession } from '@/utiliry/session';
import { getApiHeaders } from '@/utiliry/api';
import { SessionContext } from '@/context/SessionContext';
import { callFetchStackRankings } from '@/utiliry/api/stack-ranking';

export type StackRankings = {
  order: number;
  user_name: string;
}

export type StackRankingColumn = {
  id: 'order' | 'user_name';
  label: string;
}

const RankTable: FC = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(6);

  const sessionContext = useContext(SessionContext);
  const { sessionUser } = sessionContext;

  const [stackRankings, setStackRankings] = useState<StackRankings[]>([])

  const StackRankingColumns: StackRankingColumn[] = [
    { id: 'order', label: 'ランキング'},
    { id: 'user_name', label: 'ユーザー名'},
  ];

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    const sessionData = getSession();
      if (!sessionData) return;

    const options = getApiHeaders(sessionData);
    callFetchStackRankings({options, sessionUser, setStackRankings})
  }, [sessionUser])

  return (
    <>
      <TableContainer>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {StackRankingColumns.map((column) => (
                <TableCell key={column.id} style={{ backgroundColor: "#F0F8FA" }}>
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {stackRankings.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.order}>
                  {StackRankingColumns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id}>
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
        count={stackRankings.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  )
}

export default RankTable
