import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import apiCall from "../../api";

const randomColor = require('randomcolor');

export type PokemonItem = {
    id: number
    img: string
    types: string[]
    color: string
    name: string
}

type InitialStateProps = {
    dataAll: PokemonItem[]
    pokemonList: PokemonItem[],
    filteredPokemons: PokemonItem[],
    categoryList: string[],
    isCategoryClicked: boolean,
    searchValue: string,
    activeCategory: string
    currentPage: number,
    totalPageCount: number | null
    limitPageCount: number
    currentOffset: number
    error: boolean,
    isLoading: boolean

}
export const initialState: InitialStateProps = {
    dataAll: [],
    pokemonList: [],
    filteredPokemons: [],
    categoryList: [],
    searchValue: '',
    activeCategory: '',
    isCategoryClicked: false,
    currentPage: 0,
    currentOffset: 0,
    limitPageCount: 10,
    totalPageCount: null,
    error: false,
    isLoading: false
};


const pokemonSlice = createSlice({
        name: "pokemon",
        initialState,
        reducers: {
            setLoading: (state, {payload}) => {
                state.isLoading = payload;
            },
            setPokemons: (state, {payload}) => {
                state.error = false;
                state.isLoading = false;
                state.pokemonList = payload;
            },
            setTotalPageCount: (state, {payload}) => {
                state.totalPageCount = payload;
            },
            setAllData: (state, {payload}) => {
                state.isLoading = false;
                state.error = false;
                state.dataAll = payload;
            },
            setFilteredPokemons: (state, {payload}) => {
                const cloneData = state.pokemonList
                state.filteredPokemons = cloneData.filter((el: PokemonItem) => el.types.includes(payload));
                state.isCategoryClicked = true;
                state.activeCategory = payload;
            },
            resetFilteredPokemons: (state) => {
                state.filteredPokemons = [];
                state.isCategoryClicked = false;
                state.activeCategory = '';
            },
            setError: (state) => {
                state.error = true;
            },
            getAllCategories: (state: any, {payload}) => {
                const getAllTypes = payload?.map((el: PokemonItem) =>
                    el.types.map((item: string) => item))
                const removeNestedArray = getAllTypes.flat()
                state.categoryList = Array.from(new Set(removeNestedArray))
            },
            setCurrentPage(state, action: PayloadAction<number>) {
                state.currentPage = action.payload;
            },
            setCurrentOffsetPage(state, action: PayloadAction<number>) {
                state.currentOffset = action.payload;
            },
            setSearchValue(state, {payload}) {
                const cloneData = [...state.dataAll];
                if (state.isCategoryClicked) {
                    state.filteredPokemons = cloneData
                        .filter((el: PokemonItem) => el.types.includes(state.activeCategory))
                        .filter((el: PokemonItem) => (el.name.toLowerCase().includes(payload)));
                } else {
                    state.pokemonList = cloneData.filter((el: PokemonItem) => (el.name.toLowerCase().includes(payload)));
                }
            },
            resetSearchValue: (state) => {
                state.filteredPokemons = state.dataAll
                state.pokemonList = state.dataAll
                state.isCategoryClicked = false;
            },
        }
    }
);

export const {
    setLoading, setPokemons, setError, setCurrentPage, setSearchValue,
    getAllCategories, setFilteredPokemons, resetFilteredPokemons, resetSearchValue, setAllData,
    setTotalPageCount, setCurrentOffsetPage
} = pokemonSlice.actions;

export default pokemonSlice.reducer;

export function fetchPokemonsList() {
    return async (dispatch: any, getState: () => any) => {
        dispatch(setLoading(true));

        const currentOffset = getState().allListPokemon.currentOffset;
        const currentPage = getState().allListPokemon.currentPage;
        const limitPageCount = getState().allListPokemon.limitPageCount;

        apiCall
            .get(`/pokemon?limit=${limitPageCount}&offset=${currentOffset}&?page=${currentPage}`)
            .then(async (response) => {
                if (response.data?.results) {
                    let pokemons = [];
                    let pokemonColor = [];
                    for (const pokemon of response.data.results) {
                        const single = await fetchPokemonSingleItem(pokemon?.name);
                        if (single.id >= 1 && single.id <= 10) {
                            pokemonColor = await fetchPokemonColor(single.id);
                        } else {
                            pokemonColor.name = randomColor()
                        }
                        const makeNewPokemon: PokemonItem = {
                            id: single.id,
                            name: single.name,
                            img: single.sprites.other["official-artwork"]?.front_default,
                            color: pokemonColor?.name  ,
                            types: single?.types?.map((c: any) => c.type.name)
                        }
                        pokemons.push(makeNewPokemon)
                    }
                    dispatch(setPokemons(pokemons));
                    dispatch(getAllCategories(pokemons));
                    dispatch(setAllData(pokemons));
                    dispatch(setTotalPageCount(response.data?.count));

                }
            })
            .catch((er) => {
                dispatch(setError());
            }).finally(() => dispatch(setLoading(false)))
    };
}

export function fetchPokemonSingleItem(name: string) {
    return apiCall
        .get(`/pokemon/${name}`)
        .then((response) => response.data)
        .catch((er) => {
            console.log(er);
        });
}
export function fetchPokemonColor(id: number) {
    return apiCall
        .get(`/pokemon-color/${id}`)
        .then((response) => response.data)
        .catch((er) => {
            console.log(er);
        });
}