import React, {useState, useEffect} from 'react';
import './pokemonCard.css';
import axios from "axios";

function PokemonCard({singlePokemonUrl}) {
    const [pokemon, setPokemon] = useState({})

    useEffect(() => {

        async function fetchData() {
            try {
                const {data} = await axios.get(singlePokemonUrl);
                console.log(data);
                setPokemon(data);

            } catch (e) {
                console.error(e)
            }

        }

        fetchData();

    }, []);


    return (
        <>
            {Object.keys(pokemon).length > 0 &&
            <>
                <ul className='card'>
                    <li><h3>{pokemon.name}</h3></li>
                    <li><img src={pokemon.sprites.front_default} alt={pokemon.name} width="50" height="60"/></li>
                    <li><h3>Moves:{` ${pokemon.moves.length}`}</h3></li>
                    <li><h3>Weight:{` ${pokemon.weight}`}</h3></li>
                    <h3>Weight:{` ${pokemon.weight}`}</h3>
                    <li><h3>Abilities</h3></li>
                    {pokemon.abilities.map((ability) => {
                        return <li key={ability.ability.name}>{ability.ability.name}</li>
                    })}
                </ul>
            </>

            }
        </>

    )

}

export default PokemonCard