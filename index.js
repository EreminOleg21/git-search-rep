const app = document.getElementById('app')
const searchLine = createElement('div', 'search-line')
const searchInput = createElement('input', 'search-input')
const autocomBox = createElement('ul', 'autocom-box')
const main = createElement('div', 'main')
searchLine.append(searchInput)
searchLine.append(autocomBox)
app.append(searchLine)
app.append(main)


function createElement(elementTag, elementClass){
    const element = document.createElement(elementTag)
    if(elementClass){
        element.classList.add(elementClass);
    }
    return element
}

function debounce(fn, delay){
    let timer;
    return function(...args){
        clearTimeout(timer);
        timer = setTimeout(() => {
            fn.apply(this, args)
        },delay)
    }
}

 function getResponse(){
    return fetch(`https://api.github.com/search/repositories?per_page=5&q=${searchInput.value}&sort=stars`)
    .then(responce=>{
        responce.json().then(response => response.items.forEach(data => {
            showRepositories(data)
        }))
    })
}

async function searchRepopsitory() {
    try {
        if(searchInput.value) {
            clear();
            await getResponse();
    } else {
      clear();        
    }
        } catch (err) {
            console.log(`Error: ${err}`);
        }
}


function showRepositories(data){
    const nameRep = createElement('li', 'li-com')
    nameRep.textContent = data.name;
    autocomBox.insertAdjacentElement('afterbegin', nameRep);

    nameRep.addEventListener('click', ()=>{
        autocomBox.innerHTML = "";
        searchInput.value = "";
        createCard(data)
    })

}

function createCard(item){
    const btn = createElement('button', 'btn')
    const card = createElement('div', 'card')
    card.innerHTML = `<span class = "card-info">
    <span> Name: ${item.name}</span>
    <span> Owner: ${item.owner.login}</span>
    <span> Stars: ${item.stargazers_count}</span>
    </span>`
    card.append(btn)
    main.append(card)
    
    btn.addEventListener('click', (e) => {
        e.preventDefault()
        card.remove()
    })

}

searchInput.addEventListener('keydown', debounce(searchRepopsitory,300))

function clear() {
    autocomBox.innerHTML = "";
}