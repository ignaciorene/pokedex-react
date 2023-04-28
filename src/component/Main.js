import React from "react";
import { useState,useEffect } from "react";
import axios from 'axios'

const Main = ()=>{
    //State that saves the selected pokemon/s and data
  const [pokemonIds,setPokemonIds] = useState([])
  const [selectedPokemon,setSelectedPokemon]=useState([])

  //function to show all pokemons
    const showAllPokemons=()=>{
        
        setPokemonIds([])

        let newPokemonList=[]

        for(let i=1;i<=20;i++){
            newPokemonList=[...newPokemonList,{id:i}]
        }

        setPokemonIds(newPokemonList)
    }

  //every time the pokemon to show is changed we call the API and save the data
  useEffect(()=>{

    const promises = pokemonIds.map(pokemon=>axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon.id}`))

    Promise.all(
        promises
    ).then(response=>{
        setSelectedPokemon(response.map((pokemon)=>(
            {
                id:pokemon.data.id,
                img:pokemon.data.sprites.front_default,
                name:pokemon.data.name,
                pokemonType:pokemon.data.types
            }
        )))
    })

    /*
    //Other method to call API
    async function getPokemonData(){
        const updatedPokemon = await Promise.all(
            pokemonIds.map(async (data)=>{
                axios.get(`https://pokeapi.co/api/v2/pokemon/${data.id}`).then(response=>{
                    const pokemonImg=response.data.sprites.front_default
                    const pokemonName=response.data.name
                    const pokemonType=response.data.types
                    return {...data,img:pokemonImg, name:pokemonName,pokemonType}
                });
            })
        )
        setSelectedPokemon(updatedPokemon)
    }
    getPokemonData()
    */

  },[pokemonIds])

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
                {selectedPokemon?.map((data, index) => (
                    <div className="pokemon-card" key={index}>

                    <img className="pokemon-img" src={data.img}></img>
                    <div className="pokemon-name">{data.name}</div>
                    <div className="pokemon-number">{data.id}</div>
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