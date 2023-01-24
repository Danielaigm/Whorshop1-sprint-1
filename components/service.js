import { renderPokemons } from "./ui.js";
import { filterName } from "./util.js";


const inptSearch = document.querySelector(".card-search");

const URL_API = "https://pokeapi.co/api/v2/pokemon?limit=3";

const listPokemons = [];

export const getPokemons = async () => {
    const response = await axios.get(URL_API);
    console.log(response.data.results);
    response.data.results.forEach(async (element, index) => {
        const dataPokemon = await axios.get(element.url);
        const newPokemon = {
        name: element.name,
        image: dataPokemon.data.sprites.other.dream_world.front_default,
        weight: dataPokemon.data.weight,
        height: dataPokemon.data.height,
        experience: dataPokemon.data.base_experience,
        abilities: dataPokemon.data.abilities,
        id: dataPokemon.data.id,
        types: dataPokemon.data.types,
        icons: dataPokemon.data.sprites.versions["generation-v"]["black-white"].animated.front_default

        };
        listPokemons.push(newPokemon);
        if (index + 1 === response.data.results.length) {
        console.log(listPokemons);
        renderPokemons(listPokemons);
        filterName(inptSearch);
        }
    });
};