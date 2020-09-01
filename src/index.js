document.addEventListener("DOMContentLoaded", ()=> {
    getDogs()
    dogFilter()
})

const dogFilter = () => {
    const filterBtn = document.getElementById('good-dog-filter');
    filterBtn.addEventListener('click', () => {
        const dogBarElement = document.getElementById('dog-bar')
        while(dogBarElement.firstChild){
            dogBarElement.removeChild(dogBarElement.lastChild)
        }
        if (filterBtn.innerText === 'Filter good dogs: OFF'){
            filterDogs();
            filterBtn.innerText = 'Filter good dogs: ON'
        }else{
            getDogs();
            filterBtn.innerText = 'Filter good dogs: OFF'
        }
    })
}

const getDogs = () => {
    fetch('http://localhost:3000/pups')
    .then(res => res.json())
    .then(json => json.forEach( dog => {
        showDogBar(dog)
    })
    )
}

const showDogBar = (dog) => {
    const dogBar = document.getElementById('dog-bar');
    const dogSpan = document.createElement('span')

    dogSpan.innerText = dog.name;
    dogSpan.addEventListener('click', (e)=> {
        e.preventDefault
        showDog(dog);
    })

    dogBar.appendChild(dogSpan);
}

const showDog = (dog) => {
    const dogInfoElement = document.getElementById('dog-info');

    while(dogInfoElement.firstChild){
        dogInfoElement.removeChild(dogInfoElement.lastChild)
    }

    const imgElement = document.createElement('img');
    const nameElement = document.createElement('h2');
    const btnElement = document.createElement('button');

    imgElement.src = dog.image;
    nameElement.innerText = dog.name;
    btnElement.innerText = dog.isGoodDog ? 'Good Dog!' : 'Bad Dog!'
    
    btnElement.addEventListener('click', (e)=>{
        toggleGoodDog(dog)
    })

    dogInfoElement.append(imgElement,nameElement,btnElement);
}

const toggleGoodDog = (dog) => {
    let goodDog = !dog.isGoodDog
    fetch(`http://localhost:3000/pups/${dog.id}`,{
        method: 'PATCH',
        body: JSON.stringify({'isGoodDog': goodDog}),
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(res => res.json())
    .then(json=>showDog(json))
}

const filterDogs = ()=>{
    fetch('http://localhost:3000/pups')
    .then(res => res.json())
    .then(json => json.filter(dog => dog.isGoodDog === true))
    .then(dogs => dogs.forEach(dog => {
        showDogBar(dog)
    })
    )
}