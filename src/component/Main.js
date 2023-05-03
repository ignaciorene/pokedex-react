import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

let allPokemons = [];

//function that saves all pokemons id to later call it from the API
const allPokemonsList = () => {
  for (let i = 1; i <= 150; i++) {
    allPokemons = [...allPokemons, { id: i }];
  }
};

//Function that brings all pokemons from API
async function getAllPokemons(pokemons) {
  const allPokemonsData = await Promise.all(
    pokemons.map(async (data) => {
      const pokemonData = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${data.id}`
      );
      const pokemonImg = pokemonData.data.sprites.front_default;
      const pokemonName = pokemonData.data.name;
      const pokemonType = pokemonData.data.types;

      return { ...data, img: pokemonImg, name: pokemonName, pokemonType };
    })
  );

  allPokemons = allPokemonsData;
}

allPokemonsList();
getAllPokemons(allPokemons);

const Main = () => {
  //State that saves change in searchbar
  const [searchValue, setSearchValue] = useState("");
  //State that saves the selected pokemon/s and data
  const [selectedPokemon, setSelectedPokemon] = useState([]);
  //State that saves possibles option from the users search input
  const [options, setOptions] = useState([]);

  //function to search pokemon from the database using the input value
  const searchPokemon = () => {
    const newPokemon = searchValue.toLowerCase().trim();

    const searchedPokemon = allPokemons.filter((allPokemons) =>
      allPokemons.name.includes(newPokemon)
    );

    setSelectedPokemon(searchedPokemon);
  };

  //Function to change input value to the selected option
  const handleOptionClick = (option) => {
    setSearchValue(option);
    setSelectedPokemon(
      allPokemons.filter((pokemon) => pokemon.name === option)
    );
    setOptions([]);
  };

  //show possible options below input whenever the user changes the input value
  useEffect(() => {
    const value = searchValue.toLowerCase().trim();

    if (value === "" || /^\s*$/.test(value)) {
      setOptions([]);
    } else {
      const filteredOptions = allPokemons
        ?.filter((pokemon) => pokemon.name?.includes(value))
        .map((pokemon) => pokemon.name);

      const limitedOptions = filteredOptions.slice(0, 5);

      setOptions(limitedOptions);
    }
  }, [searchValue, allPokemons]);

  return (
    <>
      <div className="main-container">
        <div className="title-container">
          <h1 className="title-text">POKEDEX</h1>
        </div>

        <div className="searchbar-container">
          <div className="searchbar">
            <input
              type="text"
              placeholder="Pokemon name..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
            {options.length > 0 && (
              <ul>
                {options.map((option) => (
                  <li
                    key={option}
                    value={option}
                    onClick={() => handleOptionClick(option)}
                  >
                    {option}
                  </li>
                ))}
              </ul>
            )}
            <button className="search-btn" onClick={() => searchPokemon()}>
              <i class="fa fa-search"></i>
            </button>
            <button
              className="show-all-btn"
              onClick={() => setSelectedPokemon(allPokemons)}
            >
              All
            </button>
          </div>
        </div>

        <div className="content-container">
          {selectedPokemon?.map((data, index) => (
            <div className="pokemon-card" key={index}>
              <img className="pokemon-img" src={data.img}></img>
              <div className="pokemon-name">
                {data.id}. <b>{data.name}</b>
              </div>
              <div className="pokemon-type-container">
                <div className="pokemon-type-title">
                  <b>Type/s:</b>
                </div>
                <div className="pokemon-type-subcontainer">
                  {data.pokemonType?.map((p, index) => (
                    <div className="pokemon-type" key={index}>
                      {p.type.name}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Main;
