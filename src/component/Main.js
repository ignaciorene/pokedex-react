import React from "react";
import { useState } from "react";

//Bring data from the Pokemon API
async function getDataFromApi(id) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const data = await response.json();
    return data;
  }

  console.log(getDataFromApi(1))

//function to get image of pokemon
const getPokemonImg= async (id)=>{
    let pokemonData= await getDataFromApi(id)
    return pokemonData.sprites.front_default
}

//function that gets pokemon name
const getPokemonName= async (id)=>{
    let pokemonData= await getDataFromApi(id)
    return pokemonData.name
}

//function that gets pokemon type
const getPokemonType= async (id)=>{
    let pokemonData= await getDataFromApi(id)
    let pokemonType=[]
    pokemonData.types.map((type)=>pokemonType=[...pokemonType,' '+type.type.name])
    return pokemonType
}

const Main = ()=>{
    //State that saves the selected pokemon
  const [pokemon,setPokemon] = useState([1])

    return(
        <>
            <div className="main-container">
                <div className="title-container">
                    <h1 className="title-text">POKEDEX</h1>
                </div>

                <div className="searchbar-container">
                    <div className="searchbar">Barra de busqueda</div>
                </div>

                <div className="content-container">
                    {pokemon.map((id,index)=>(
                        <div className="pokemon-card" key={index}>
                            <img className="pokemon-img" src={getPokemonImg(id)}></img>
                            <div className="pokemon-name">{getPokemonName(id)}</div>
                            <div className="pokemon-number">{id}</div>
                            <div className="pokemon-type">{getPokemonType(id)}</div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default Main