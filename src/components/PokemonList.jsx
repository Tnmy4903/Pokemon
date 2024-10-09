import React from 'react';
import Grid from '@mui/material/Grid2';
import PokemonCard from './PokemonCard';
import { Box } from '@mui/material';

const PokemonList = ({ pokemons, onPokemonClick, lastPokemonRef }) => {
  return (
    <Box sx={{ flexGrow: 1, padding: 4 }}>
      <Grid container spacing={2}>
        {pokemons.map((pokemon, index) => (
          <Grid
            key={pokemon.id}
            item
            xs={12}   
            sm={6}    
            md={4}    
            lg={3}    
            xl={2}    
            ref={index === pokemons.length - 1 ? lastPokemonRef : null}
          >
            <PokemonCard pokemon={pokemon} onClick={onPokemonClick} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

  export default PokemonList;



