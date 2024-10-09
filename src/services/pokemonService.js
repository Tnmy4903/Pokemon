import axios from 'axios';

const POKEMON_API_URL = 'https://pokeapi.co/api/v2/pokemon';

export const fetchPokemonList = async (searchTerm = '', limit = 20, offset = 0) => {
  try {
    const response = await axios.get(`${POKEMON_API_URL}?limit=${limit}&offset=${offset}`);
    const allPokemons = response.data.results;

    return allPokemons
      .filter(pokemon => pokemon.name.toLowerCase().includes(searchTerm.toLowerCase()))
      .map((pokemon, index) => ({
        id: offset + index + 1,
        name: pokemon.name,
        image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${offset + index + 1}.png`,
      }));
  } catch (error) {
    console.error('Error fetching Pokémon list:', error);
    return [];
  }
};

export const fetchPokemonDetails = async (name) => {
  try {
    const response = await axios.get(`${POKEMON_API_URL}/${name}`);
    const { height, weight, sprites } = response.data;
    return {
      name,
      height,
      weight,
      image: sprites.other['official-artwork'].front_default,
    };
  } catch (error) {
    console.error('Error fetching Pokémon details:', error);
    return null;
  }
};





