import React from 'react';
import { Grid, FormControl, InputLabel, Select, MenuItem, Slider, TextField, Button, Typography, Box } from '@mui/material';

const ControlPanel = ({ region, errorRate, seed, onRegionChange, onErrorRateChange, onSeedChange, onErrorRateValueChange }) => {
  return (
    <Grid container spacing={3} alignItems="center" mb={4}>
      <Grid item xs={12} sm={4}>
        <FormControl fullWidth>
          <InputLabel id="region-label">Region</InputLabel>
          <Select
            labelId="region-label"
            value={region}
            onChange={onRegionChange}
            label="Region"
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
      <Grid item xs={12} sm={4}>
        <FormControl fullWidth>
          <Typography id="error-rate-slider" gutterBottom>
            Error Rate
          </Typography>
          <Box display="flex" alignItems="center">
            <Slider
              value={errorRate}
              onChange={(e, value) => onErrorRateChange(e, value * 100)}
              aria-labelledby="error-rate-slider"
              valueLabelDisplay="auto"
              step={1}
              marks
              min={0}
              max={10}
              style={{ marginRight: '16px' }}
            />
            <TextField
              value={errorRate}
              onChange={onErrorRateValueChange}
              type="number"
              InputProps={{ inputProps: { min: 0, max: 1000 } }}
              style={{ width: '80px' }}
            />
          </Box>
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={4}>
        <TextField
          fullWidth
          label="Seed"
          type="number"
          value={seed}
          InputProps={{
            endAdornment: (
              <Button
                variant="contained"
                onClick={onSeedChange}
              >
                Random
              </Button>
            ),
          }}
        />
      </Grid>
    </Grid>
  );
};

export default ControlPanel;
