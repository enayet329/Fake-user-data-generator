import React, { useRef, useCallback } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress, Box } from '@mui/material';

const UserTable = ({ users, loadMoreUsers, tableContainerRef, loading }) => {
  const observer = useRef();
  const lastUserElementRef = useCallback(node => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        loadMoreUsers();
      }
    });
    if (node) observer.current.observe(node);
  }, [loadMoreUsers, loading]);

  return (
    <TableContainer ref={tableContainerRef} component={Paper} style={{ maxHeight: '60vh', overflow: 'auto' }}>
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell>Index</TableCell>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Address</TableCell>
            <TableCell>Phone</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Array.isArray(users) && users.map((user, index) => (
            <TableRow key={user.id} ref={index === users.length - 1 ? lastUserElementRef : null}>
              <TableCell>{user.index}</TableCell>
              <TableCell>{user.id}</TableCell>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.address}</TableCell>
              <TableCell>{user.phone}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {loading && (
        <Box display="flex" justifyContent="center" p={2}>
          <CircularProgress />
        </Box>
      )}
    </TableContainer>
  );
};

export default UserTable;