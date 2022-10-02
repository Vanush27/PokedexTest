import React from 'react';
import {Card} from 'antd';
import {PokemonItem} from "../store/slices/pokemonSlice";

const {Meta} = Card;

const CardPokemon = ({item}: PokemonItem | any) => {
    return (<Card className="card-wrapper"
                  hoverable
                  style={{
                      border: `1px solid ${item?.color}`,
                      backgroundColor: `${item?.color}`
                  }}
                  cover={<img alt="pokemon" src={item?.img}/>}
        >
            <Meta description={item?.id}/>
            <Meta description={item?.name}/>
        </Card>
    );
}

export default CardPokemon;