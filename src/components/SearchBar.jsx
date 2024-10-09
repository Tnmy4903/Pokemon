import React, { useState } from 'react';
import { TextField, Box, Button } from '@mui/material';

const SearchBar = ({ onSearchSubmit, onReset }) => {
  const [searchValue, setSearchValue] = useState('');

  const handleInputChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleSearchClick = () => {
    if (searchValue.trim()) {
      onSearchSubmit(searchValue);
    }
  };

  const handleResetClick = () => {
    window.location.reload();
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 4 }}>
      <TextField
        label="Search Pokémon"
        variant="outlined"
        value={searchValue}
        onChange={handleInputChange}
        sx={{ 
          width: '40%', 
          marginRight: 2, 
          borderRadius: 1, 
          backgroundColor: '#ffffff', 
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)' 
        }}
      />
      <Button 
        variant="contained" 
        color="primary" 
        onClick={handleSearchClick} 
        sx={{ 
          marginRight: 2, 
          borderRadius: 2, 
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
          '&:hover': {
            backgroundColor: '#3700b3',
          }
        }}
      >
        Search
      </Button>
      <Button 
        variant="outlined" 
        color="secondary" 
        onClick={handleResetClick} 
        sx={{
          borderRadius: 2,
          '&:hover': {
            borderColor: '#018786',
          }
        }}
      >
        Reset
      </Button>
    </Box>
  );
};

export default SearchBar;

