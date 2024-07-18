
import React, { useRef, useEffect } from 'react';
import { ThemeProvider, CssBaseline, Container, Typography, Box, Button } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import UserTable from './components/UserTable';
import ControlPanel from './components/ControlsPanels';
import useUserData from './hooks/useUserData';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

const App = () => {
  const {
    users,
    region,
    errorRate,
    seed,
    handleRegionChange,
    handleErrorRateChange,
    handleSeedChange,
    loadMoreUsers,
    downloadCSV,
  } = useUserData();

  const tableContainerRef = useRef(null);

  useEffect(() => {
    if (tableContainerRef.current) {
      tableContainerRef.current.scrollTop = 0;
    }
  }, [region]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg">
        <Box my={4}>
          <Typography variant="h4" component="h2" gutterBottom>
            Fake User Generator
          </Typography>
          <ControlPanel
            region={region}
            errorRate={errorRate}
            seed={seed}
            onRegionChange={handleRegionChange}
            onErrorRateChange={handleErrorRateChange}
            onSeedChange={handleSeedChange}
          />
          <Box mb={2} display="flex" justifyContent="flex-end">
            <Button variant="contained" color="secondary" onClick={downloadCSV}>
              Download CSV
            </Button>
          </Box>
          <UserTable users={users} loadMoreUsers={loadMoreUsers} tableContainerRef={tableContainerRef} />
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default App;