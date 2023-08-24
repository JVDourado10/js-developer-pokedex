const pokemonList = document.getElementById('pokemonList');
const loadMoreButton = document.getElementById('loadMoreButton');
const pokemonModal = document.getElementById('pokemonModal');
console.log(pokemonModal)
const maxRecords = 151
let limit = 10
const offset = 0;

function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type} ${pokemon.number}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}"
                     alt="${pokemon.name}">
            </div>
        </li>
    `
}

function showPokemonInfos(pokemon) {
    return `
        <div class="pokemon_infos ${pokemon.type}">
            <button id="fechar" class="fechar">x</button>
            <div class="pokemon_main">
                <h1>${pokemon.name}</h1>
                <span>#${pokemon.number}</span>
            </div>
            <ol class="types">
                ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
            </ol>
            <div class="pokemon_image">
                <img src="${pokemon.photo}" alt="charizard">
            </div>
            <div class="pokemon_infos_content">
                <h2>Sobre</h2>
                <div class="conteudo">
                    <div>
                        <p>Altura</p><span>${pokemon.height}m</span>
                    </div>
                    <div>
                        <p>Peso</p><span>${pokemon.weight}Kg</span>
                    </div>
                    
                </div>
                
            </div>
        </div>`
}

function addModal() {

}



function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML = newHtml
        const pokemonItem = document.querySelectorAll('.pokemon')     
        
        Array.from(pokemonItem).forEach((item) => {
            item.addEventListener('click', () => {
                pokemonModal.innerHTML = showPokemonInfos(pokemons[item.classList[2] - 1])
                pokemonModal.classList.remove('esconde')         
            })     
        })

    })
   
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    limit += 10
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})

pokemonModal.addEventListener('click', (e) => {
    if(e.target.id == 'pokemonModal' || e.target.id == 'fechar') {
        pokemonModal.classList.add('esconde')
    }
})