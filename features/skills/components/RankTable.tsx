import React, { FC, useContext, useEffect, useMemo, useState, useCallback } from 'react';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

import { getApiHeaders } from '@/common/functions/api';
import { SessionContext } from '@/context/SessionContext';
import { callFetchStackRankings } from '@/features/stacks/functions/stack-ranking';

export type StackRankings = {
  order: number;
  user_name: string;
};

export type StackRankingColumn = {
  id: 'order' | 'user_name';
  label: string;
};

const RankTable: FC = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const { sessionUser } = useContext(SessionContext);

  const [stackRankings, setStackRankings] = useState<StackRankings[]>([]);

  const StackRankingColumns: StackRankingColumn[] = [
    { id: 'order', label: '順位' },
    { id: 'user_name', label: 'ユーザー名' },
  ];

  const handleChangePage = useCallback((_event: unknown, newPage: number) => {
    setPage(newPage);
  }, []);

  const handleChangeRowsPerPage = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  }, []);

  useEffect(() => {
    const options = getApiHeaders();
    callFetchStackRankings({ options, sessionUser, setStackRankings });
  }, [sessionUser]);

  const paginatedData = useMemo(() => {
    if (!stackRankings) {
      return [];
    }

    const startIndex = page * rowsPerPage;
    const endIndex = page * startIndex + rowsPerPage;

    return stackRankings.slice(startIndex, endIndex);
  }, [page, rowsPerPage, stackRankings]);

  return (
    <div className='bg-white rounded-md shadow-sm border border-gray-300 mt-8'>
      <div className='p-6 text-md text-gray-700 border-b-2 border-gray-100'>積み上げランキング</div>
      <div className='p-6'>
        <TableContainer>
          <Table stickyHeader aria-label='sticky table'>
            <TableHead>
              <TableRow>
                {StackRankingColumns.map((column) => (
                  <TableCell key={column.id} style={{ backgroundColor: '#F0F8FA' }}>
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedData.map((row) => (
                <TableRow hover role='checkbox' tabIndex={-1} key={row.order}>
                  {StackRankingColumns.map((column) => (
                    <TableCell key={column.id}>{row[column.id]}</TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 20, 30, 40, 50, 100]}
          component='div'
          count={stackRankings.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </div>
    </div>
  );
};

export default RankTable;
