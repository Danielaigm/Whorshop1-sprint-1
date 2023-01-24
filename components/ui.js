
import { renderAbilities} from "./util.js";
import { renderTypes } from "./util.js";

const containerCards = document.querySelector(".container_pokemons");

export const renderPokemons = (arrayPokemons) => {
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
            <span class="pokemonicons">${element.icons}</span>
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
        const itemAbilities= item.querySelector(".card__abilities").textContent;
        const itemType = item.querySelector(".card__type").textContent;
        const itemId= item.querySelector(".pokemonId").textContent;
        const itemImage = item.querySelector(".pokemon-img").src;
        const itemIcons = item.querySelector(".pokemonicons").textContent;
        console.log(itemAbilities, itemType);

        addItemToSection(itemAbilities, itemImage,itemExperience,itemId,itemName,itemWeight,itemHeight,itemIcons,itemType);
    }

    function addItemToSection(itemAbilities, itemImage,itemExperience,itemId,itemName,itemWeight,itemHeight,itemIcons,itemType) {
    container.innerHTML = "";

        container.innerHTML += `
        <article class="title_img__container">
            <div class="title-container">
                <figure>
                    <img src="${itemIcons}" alt="llama">
                </figure>
                <h2>${itemName}</h2>
            </div>
            
            <figure class="image-pokemon">
                <img src="${itemImage}" alt="${itemName}"  class="img-pokemons">
            </figure>
        </article>
    
        <article class="info-pokemon">
            <div class="row-info">
            <i class="fa-regular fa-address-card iconInfo"></i>
                <div class="row-item">
                    <p class="info-text">${itemId}</p>
                    <p class="title-info">No.</p>
                </div>
                <i class="fa-solid fa-ranking-star iconInfo"></i>
                <div class="row-item">
                    <p class="info-text">1${itemExperience}</p>
                    <p class="title-info">LEVEL</p>
                </div>
            </div>
    
            <div class="row-info">
            <i class="fa-solid fa-hurricane iconInfo"></i>
                <div class="row-item">
                    <p class="info-text">${itemType}</p>
                    <p class="title-info">TYPE</p>
                </div>
                <i class="fa-solid fa-wand-magic-sparkles iconInfo"></i>
                <div class="row-item">
                <p class="info-text">${itemAbilities}</p>
                    <p class="title-info">HABILITY</p>
                </div>
            </div>
            <div class="row-info">
                <i class="fa-solid fa-text-height iconInfo"></i>
                <div class="row-item">
                    <p class="info-text">${itemHeight} m</p>
                    <p class="title-info">HEIGHT</p>
                </div>
                <i class="fa-solid fa-weight-scale iconInfo"></i>
                <div class="row-item">
                    <p class="info-text">${itemWeight} Kg</p>
                    <p class="title-info">WEIGHT</p>
                </div>
            </div>
        </article>
            
            `;
    }
};
