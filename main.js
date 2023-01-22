const containerCards = document.querySelector(".container_pokemons");
const inptSearch = document.querySelector(".card-search");
const title = document.querySelector(".card");

const URL_API = "https://pokeapi.co/api/v2/pokemon?limit=10";

const listPokemons = [];

const getPokemons = async () => {
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
        types: dataPokemon.data.types
        };
        listPokemons.push(newPokemon);
        if (index + 1 === response.data.results.length) {
        console.log(listPokemons);
        renderPokemons(listPokemons);
        filterName(inptSearch, title);
        }
    });
};

getPokemons();

const renderPokemons = (arrayPokemons) => {
    containerCards.innerHTML = "";
    arrayPokemons.forEach((element) => {
        containerCards.innerHTML += `
            <figure class = "card addToSection">
            <img class="pokemon-img" src="${element.image}" alt="pokemon">
            <span class="pokemonName">${element.name}</span>
            
            <div class="container_hidden">
            <span class="pokemonWeight">${element.weight}</span>
            <span class="pokemonHeight">${element.height}</span>
            <span class="pokemonExperience">${element.experience}</span>
            ${renderAbilities(element.abilities)}
            <span class="pokemonId">${element.id}</span>
            ${renderTypes(element.types)}
            </div>
            </figure>
            `;
    });

    //agregar al carrito
    const addToSectionButtons = document.querySelectorAll(".addToSection");
    //console.log(addToShoppingCardButtons);

    addToSectionButtons.forEach((addToSectionButton) => {
        addToSectionButton.addEventListener("click", addToSectionClicked);
    });

    const container = document.querySelector(".pokemon-container");

    function addToSectionClicked(event) {
        const button = event.target;
        const item = button.closest(".addToSection");

        const itemName = item.querySelector(".pokemonName").textContent;
        const itemWeight = item.querySelector(".pokemonWeight").textContent;
        const itemHeight = item.querySelector(".pokemonHeight").textContent;
        const itemExperience = item.querySelector(".pokemonExperience").textContent;
        //const itemAbilities= item.querySelector(".pokemonAbilities").fun;
        const itemId= item.querySelector(".pokemonId").textContent;
        const itemImage = item.querySelector(".pokemon-img").src;

        addItemToSection(listPokemons, itemImage,itemExperience,itemId,itemName,itemWeight,itemHeight);
    }

    function addItemToSection(listPokemons, itemImage,itemExperience,itemId,itemName,itemWeight,itemHeight) {
    container.innerHTML = "";

        container.innerHTML += `
        <article class="title_img__container">
            <div class="title-container">
                <figure>
                    <img src="https://static.vecteezy.com/system/resources/previews/001/188/706/original/flame-png.png" alt="llama">
                </figure>
                <h2>${itemName}</h2>
            </div>
            
            <figure class="image-pokemon">
                <img src="${itemImage}" alt="${itemName}"  class="img-pokemons">
            </figure>
        </article>
    
        <article class="info-pokemon">
            <div class="row-info">
                <div class="row-item">
                    <p class="info-text">${itemId}</p>
                    <p class="title-info">No.</p>
                </div>
                <div class="row-item">
                    <p class="info-text">1${itemExperience}</p>
                    <p class="title-info">LEVEL</p>
                </div>
            </div>
    
            <div class="row-info">
                <div class="row-item">
                    <p class="info-text">xxx</p>
                    <p class="title-info">TYPE</p>
                </div>
                <div class="row-item">
                
                ${renderAbilities(listPokemons[0].abilities)}
                    <p class="title-info">HABILITY</p>
                </div>
            </div>
            <div class="row-info">
                <div class="row-item">
                    <p class="info-text">${itemHeight} m</p>
                    <p class="title-info">HEIGHT</p>
                </div>
                <div class="row-item">
                    <p class="info-text">${itemWeight} Kg</p>
                    <p class="title-info">WEIGHT</p>
                </div>
            </div>
        </article>
            
            `;
    }
};

const renderAbilities = (arrayAbilities) => {
    let abilitiesList = "";
    arrayAbilities.forEach((ability) => {
        abilitiesList += `
            <span class="card__abilities">${ability.ability.name}</span>
            `;
        console.log(ability)
    });
    return abilitiesList;
};

const renderTypes = (arrayTypes) => {
    let typesList = "";
    arrayTypes.forEach((type) => {
        typesList += `
            <span class="card__type">${type.type.name}</span>
            `;
    });
    return typesList;
};

const filterName = (inptSearch, title) => {
    inptSearch.addEventListener("keyup", (e) => {
        //console.log(e.target.value);
        document.querySelectorAll(".card").forEach((element) => {
        element.textContent.toLowerCase().includes(e.target.value.toLowerCase())
            ? element.classList.remove("filter")
            : element.classList.add("filter");
        });
    });
};
