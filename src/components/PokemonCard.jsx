import React from 'react';
import { Card, CardContent, Typography, CardMedia } from '@mui/material';

const PokemonCard = ({ pokemon, onClick, isSelected }) => {
  const capitalizeName = (name) => name.charAt(0).toUpperCase() + name.slice(1);

  return (
    <Card 
      sx={{
        maxWidth: isSelected ? '50%' : 300,
        margin: isSelected ? '0' : '20px auto',
        cursor: 'pointer',
        position: isSelected ? 'fixed' : 'relative',
        top: isSelected ? '50%' : 'auto',
        left: isSelected ? '50%' : 'auto',
        transform: isSelected ? 'translate(-50%, -50%)' : 'none',
        transition: 'transform 0.3s, box-shadow 0.3s',
        boxShadow: isSelected ? '0px 10px 30px rgba(0, 0, 0, 0.3)' : '0px 4px 10px rgba(0, 0, 0, 0.1)',
        border: isSelected ? '2px solid #6200ea' : '1px solid #ddd',
        '&:hover': {
            transform: isSelected ? 'translate(-50%, -50%) scale(1.05)' : 'scale(1.05)',
        },
      }}
      onClick={() => onClick(pokemon)}
    >
      <CardMedia
        component="img"
        height= "200"
        image={pokemon.image}
        alt={pokemon.name}
        sx={{ objectFit: 'contain', backgroundColor: '#f5f5f5' }}
      />
      <CardContent>
        <Typography variant="h6" align="center" sx={{ fontWeight: 'bold' }}>
          {capitalizeName(pokemon.name)}
        </Typography>
        {isSelected && (
          <>
            <Typography variant="body2" align="center" sx={{ marginTop: 1 }}>
              Height: {pokemon.height} | Weight: {pokemon.weight}
            </Typography>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default PokemonCard;




