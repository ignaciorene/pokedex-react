import React from "react";
import { useState,useEffect } from "react";
import axios from 'axios'

//Bring data from the Pokemon API
async function getDataFromApi(id) {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
    return response.data;
  }

const Main = ()=>{
    //State that saves the selected pokemon/s and data
  const [pokemon,setPokemon] = useState([])

  //function to show all pokemons
    const showAllPokemons=()=>{
        
        setPokemon([])

        let newPokemonList=[]

        for(let i=1;i<=20;i++){
            newPokemonList=[...newPokemonList,{id:i}]
        }

        setPokemon(newPokemonList)
    }

  //every time the pokemon to show is changed we call the API and save the data
  useEffect(()=>{
    async function getPokemonData(){
        const updatedPokemon = await Promise.all(
            pokemon.map(async (data)=>{
                const pokemonData=await axios.get(`https://pokeapi.co/api/v2/pokemon/${data.id}`);
                const pokemonImg=pokemonData.data.sprites.front_default
                const pokemonName=pokemonData.data.name
                const pokemonType=pokemonData.data.types
                return {...data,img:pokemonImg, name:pokemonName,pokemonType}
            })
        )
        setPokemon(updatedPokemon)
    }
    getPokemonData()
  },pokemon)

    return(
        <>
            <div className="main-container">
                <div className="title-container">
                    <h1 className="title-text">POKEDEX</h1>
                </div>

                <div className="searchbar-container">
                    <div className="searchbar">
                    <input type="text" placeholder="Ingrese el nombre del pokemón..."/>
                    <button className="search-btn">Buscar</button>
                    <button className="show-all-btn" onClick={()=>showAllPokemons()}>Mostrar todos</button>
                    </div>
                </div>

                <div className="content-container">
                {pokemon?.map((data, index) => (
                    <div className="pokemon-card" key={index}>

                    <img className="pokemon-img" src={data.img}></img>
                    <div className="pokemon-name">{data.name}</div>
                    <div className="pokemon-number">{data.id}</div>
                    {console.log(data)}
                    {data.pokemonType?.map((p,index)=>(
                        <div className="pokemon-type" key={index}>{p.type.name}</div>
                    ))}

                    </div>
                ))}
                </div>
            </div>
        </>
    )
}

export default Main