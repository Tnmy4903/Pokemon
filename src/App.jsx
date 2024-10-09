import React, { useState, useEffect, useRef, useCallback } from 'react';
import { fetchPokemonList, fetchPokemonDetails } from './services/pokemonService';
import SearchBar from './components/SearchBar';
import PokemonList from './components/PokemonList';
import PokemonCard from './components/PokemonCard';
import { Container, CssBaseline, Typography, Box } from '@mui/material';

const App = () => {
  const [pokemons, setPokemons] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [offset, setOffset] = useState(0);
  const limit = 20;

  const observer = useRef();
  const lastPokemonElementRef = useCallback((node) => {
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setOffset((prevOffset) => prevOffset + limit);
      }
    });
    if (node) observer.current.observe(node);
  }, []);

  useEffect(() => {
    const loadPokemons = async () => {
      const newPokemons = await fetchPokemonList(searchTerm, limit, offset);
      setPokemons((prevPokemons) => [...prevPokemons, ...newPokemons]);
    };
    loadPokemons();
  }, [searchTerm, offset]);

  const handleSearchSubmit = (term) => {
    setSearchTerm(term);
    setPokemons([]);
    setOffset(0);
  };

  const handlePokemonClick = async (pokemon) => {
    const pokemonDetails = await fetchPokemonDetails(pokemon.name);
    setSelectedPokemon(pokemonDetails);

    const utterance = new SpeechSynthesisUtterance(pokemon.name);
    window.speechSynthesis.speak(utterance);
  };

  const handleReset = () => {
    window.location.reload();
  };

  return (
    <Box 
      sx={{ 
        background: 'linear-gradient(to bottom right, #f0f4f8, #ffffff)', 
        minHeight: '100vh', 
        paddingTop: 4 
      }}
    >
      <Container maxWidth="lg">
        <CssBaseline />
        <Typography variant="h4" align="center" sx={{ color: '#6200ea', fontWeight: 'bold', mb: 4 }}>
          Pokémon Search
        </Typography>
        <SearchBar onSearchSubmit={handleSearchSubmit} onReset={handleReset} />
        {!selectedPokemon ? (
          <PokemonList 
            pokemons={pokemons} 
            onPokemonClick={handlePokemonClick} 
            lastPokemonRef={lastPokemonElementRef} 
          />
        ) : (
          <PokemonCard pokemon={selectedPokemon} isSelected={true} onClick={handlePokemonClick} />
        )}
      </Container>
    </Box>
  );
};

export default App;

