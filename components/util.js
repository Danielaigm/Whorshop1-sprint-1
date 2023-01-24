export const renderAbilities = (arrayAbilities) => {
    let abilitiesList = "";
    arrayAbilities.forEach((ability) => {
        abilitiesList += `
            <span class="card__abilities">${ability.ability.name}</span>
            `;
    });
    return abilitiesList;
};

export const renderTypes = (arrayTypes) => {
    let typesList = "";
    arrayTypes.forEach((type) => {
        typesList += `
            <span class="card__type">${type.type.name}</span>
            `;
    });
    return typesList;
};

export const filterName = (inptSearch) => {
    inptSearch.addEventListener("keyup", (e) => {
        //console.log(e.target.value);
        document.querySelectorAll(".card").forEach((element) => {
        element.textContent.toLowerCase().includes(e.target.value.toLowerCase())
            ? element.classList.remove("filter")
            : element.classList.add("filter");
        });
    });
};