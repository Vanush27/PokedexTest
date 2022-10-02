import React, {useEffect, useState} from 'react';
import Category from "../Category";
import CardPokemon from "../CardPokemon";
import {fetchPokemonsList, PokemonItem, setLoading} from "../../store/slices/pokemonSlice";

import {useAppDispatch, useAppSelector} from "../../hooks/hooks";
import Pagination from "../Pagination";
import Search from "../Search";
import Spinner from "../Reusable/Spinner";

import  "./PokemonList.scss";

const PokemonList = () => {


    const dispatch = useAppDispatch();
    const pokemonList = useAppSelector((state) => state.allListPokemon.pokemonList);
    const filteredPokemons = useAppSelector((state) => state.allListPokemon.filteredPokemons);
    const isCategoryClicked = useAppSelector((state) => state.allListPokemon.isCategoryClicked);
    const currentPage = useAppSelector((state) => state.allListPokemon.currentPage);

    const isLoading = useAppSelector((state) => state.allListPokemon.isLoading);



    const currentPokemonData = isCategoryClicked ? filteredPokemons : pokemonList

    useEffect(() => {
        dispatch(fetchPokemonsList());
    }, [dispatch, currentPage]);



    return (

        <div className="pokemon">
            <h1>Pokemon List</h1>

            <Search/>
            <Category/>

            <div className='pokemon-list'>

                {isLoading ? <Spinner/> :
                    currentPokemonData?.map((item: PokemonItem, index: number) =>
                        (
                            <CardPokemon key={index} item={item}/>
                        ))}

            </div>

            {!isCategoryClicked && <Pagination/>}
        </div>
    );
};

export default PokemonList;