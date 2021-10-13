import React, {useState, useEffect} from 'react';
import './App.css';
import PokemonCard from "./components/pokemonCard";
import axios from "axios";
import PokemonLogo from './assets/International_Pokémon_logo.svg';

function App() {
    const [pokemonPage, setPokemonPage] = useState([]);
    const [pokemonUrl, setPokemonUrl] = useState(`https://pokeapi.co/api/v2/pokemon/`);

    useEffect(() => {

        async function fetchData() {
            try {
                const result = await axios.get(pokemonUrl);
                console.log(result);
                setPokemonPage(result);

            } catch (e) {
                console.error(e)
            }

        }

        fetchData();

    }, [pokemonUrl]);


    return (
        <>
            <header>
                <img src={PokemonLogo} alt='pokemon afbeelding'/><br/><br/><br/>

                {Object.keys(pokemonPage).length <= 0 &&
                <h4>Loading...</h4>
                }
                {Object.keys(pokemonPage).length > 0 &&
                <>

                    <button type='button' disabled={!pokemonPage.data.previous} onClick={() => {
                        setPokemonUrl(pokemonPage.data.previous)
                    }}>vorige
                    </button>
                    <button type='button' disabled={!pokemonPage.data.next} onClick={() => {
                        setPokemonUrl(pokemonPage.data.next)
                    }}>volgende
                    </button>
                </>}
            </header>
            <div className='listParent'>

                {Object.keys(pokemonPage).length > 0 &&
                <>{pokemonPage.data.results.map((pokemon) =>

                    <PokemonCard key={pokemon.name} singlePokemonUrl={pokemon.url}/>
                )}
                </>
                }
            </div>


        </>
    )
}

export default App;

