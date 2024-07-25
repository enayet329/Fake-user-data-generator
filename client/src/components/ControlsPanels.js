import React from 'react';
import { Grid, FormControl, Select, MenuItem, Slider, TextField, Button, Typography, Paper } from '@mui/material';
import ShuffleIcon from '@mui/icons-material/Shuffle';

const ControlPanel = ({ region, errorRate, seed, onRegionChange, onErrorRateChange, onSeedChange, loading, onExport }) => {
  const handleSliderChange = (event, newValue) => {
    if (onErrorRateChange && newValue >= 0 && newValue <= 10) {
      onErrorRateChange({ slider: newValue, input: newValue });
    }
  };

  const handleInputChange = (event) => {
    let value = event.target.value === '' ? '' : Number(event.target.value);
    if (onErrorRateChange && value >= 0 && value <= 1000) {
      onErrorRateChange({ slider: value, input: value });
    }
  };

  const handleSeedChange = (e) => {
    const value = e.target.value === '' ? '' : Number(e.target.value);
    onSeedChange(value);
  };

  const handleRandomClick = (e) => {
    e.preventDefault();
    onSeedChange();
  };

  return (
    <Paper elevation={3} sx={{ p: 2, bgcolor: '#f5f5f5', border: '1px solid #ccc' }}>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} container alignItems="center" spacing={1}>
          <Grid item>
            <Typography variant="body2">Region:</Typography>
          </Grid>
          <Grid item>
            <FormControl size="small">
              <Select
                value={region}
                onChange={onRegionChange}
                displayEmpty
                sx={{ bgcolor: 'white', height: 24, minWidth: 80 }}
              >
                <MenuItem value="USA">USA</MenuItem>
                <MenuItem value="German">German</MenuItem>
                <MenuItem value="French">French</MenuItem>
                <MenuItem value="Georgian">Georgian</MenuItem>
                <MenuItem value="Spanish">Spanish</MenuItem>
                <MenuItem value="Italian">Italian</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item sx={{ flexGrow: 1 }} />
          <Grid item>
            <Typography variant="body2">Errors:</Typography>
          </Grid>
          <Grid item xs={3}>
            <Slider
              value={errorRate ? errorRate.input : 0}
              onChange={handleSliderChange}
              step={1}
              min={0}
              max={10}
              sx={{ mr: 2 }}
            />
          </Grid>
          <Grid item>
            <TextField
              value={errorRate ? errorRate.input : ''}
              onChange={handleInputChange}
              variant="outlined"
              size="small"
              inputProps={{
                step: 1,
                min: 0,
                max: 1000,
                type: 'number',
                style: { padding: '2px', height: '20px' }
              }}
              sx={{ width: 60, bgcolor: 'white' }}
            />
          </Grid>
          <Grid item sx={{ flexGrow: 1 }} />
          <Grid item>
            <Typography variant="body2">Seed:</Typography>
          </Grid>
          <Grid item>
            <TextField
              value={seed}
              onChange={handleSeedChange}
              variant="outlined"
              size="small"
              type="number"
              inputProps={{
                style: { padding: '2px', height: '20px' }
              }}
              sx={{ width: 100, bgcolor: 'white' }}
            />
          </Grid>
          <Grid item>
          <Button
              onClick={handleRandomClick}
              disabled={loading}
              sx={{ minWidth: 30, p: 0, ml: 1, height: 24 }}
            >
              <ShuffleIcon fontSize="small" />
            </Button>
          </Grid>
          <Grid item sx={{ flexGrow: 1 }} />
          <Grid item>
            <Button
              onClick={onExport}
              variant="outlined"
              size="small"
              sx={{ bgcolor: 'white', textTransform: 'none', height: 24 }}
            >
              Export
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default ControlPanel;