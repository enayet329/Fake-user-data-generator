import React from 'react';  
import { Grid, FormControl, InputLabel, Select, MenuItem, Slider, TextField, Button, Typography, Box } from '@mui/material';  

const ControlPanel = ({ region, errorRate, seed, onRegionChange, onErrorRateChange, onSeedChange }) => {  
  const handleSliderChange = (event, newValue) => {  
    if (newValue >= 0 && newValue <= 10) {  
      onErrorRateChange({ slider: newValue, input: newValue });  
    }  
  };  

  const handleInputChange = (event) => {  
    let value = event.target.value === '' ? '' : Number(event.target.value);  
    if (value >= 0 && value <= 1000) {  
      onErrorRateChange({ slider: value, input: value });  
    }  
  };  

  return (  
    <Box bgcolor="background.paper" p={4} borderRadius={4}>  
      <Grid container spacing={4} alignItems="center">  
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
        <Grid item xs={12} sm={6}>  
          <FormControl fullWidth>  
            <Typography id="error-rate-slider" gutterBottom>  
              Error Rate  
            </Typography>  
            <Box display={'flex'} alignItems="center">  
              <Slider  
                value={errorRate.input}  
                onChange={handleSliderChange}  
                aria-labelledby="error-rate-slider"  
                valueLabelDisplay="auto"  
                step={1}  
                marks  
                min={0}  
                max={10}  
                sx={{ mr: 2, flex: 1 }}  
              />  
              <TextField  
                value={errorRate.input}  
                onChange={handleInputChange}  
                inputProps={{  
                  step: 1,  
                  min: 0,  
                  max: 1000,  
                  type: 'number',  
                }}  
                sx={{ width: 100 }}  
              />  
            </Box>  
          </FormControl>  
        </Grid>  
        <Grid item xs={12} sm={2}>  
          <TextField  
            fullWidth  
            label="Seed"  
            type="number"  
            value={seed}  
            onChange={(e) => onSeedChange(parseInt(e.target.value))}  
            InputProps={{  
              endAdornment: (  
                <Button  
                  variant="contained"  
                  onClick={() => onSeedChange(Math.floor(Math.random() * 1000000))}  
                >  
                  Random  
                </Button>  
              ),  
            }}  
          />  
        </Grid>  
      </Grid>  
    </Box>  
  );  
};  

export default ControlPanel;
