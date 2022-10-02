import React from 'react';
import {Button} from "antd";

import {resetFilteredPokemons, setFilteredPokemons} from '../../store/slices/pokemonSlice'
import {useAppDispatch, useAppSelector} from "../../hooks/hooks";

import  "./Category.scss";

const Category = () => {

    const dispatch = useAppDispatch();
    const categoryList = useAppSelector((state) => state.allListPokemon.categoryList);
    const activeCategory = useAppSelector((state) => state.allListPokemon.activeCategory);


    const handleSortCategory = (name: any): any => {
        dispatch(setFilteredPokemons(name))
    }

    return (
        <div className="category-wrapper">
            <h3>Category</h3>
            {categoryList?.map((el: string) => <Button
                style={{margin: 2}}
                danger={activeCategory === el}
                key={el}
                onClick={() => handleSortCategory(el)}>{el}</Button>)}
            <Button type="primary" onClick={() => dispatch(resetFilteredPokemons())}>reset</Button>

        </div>
    );
};

export default Category;