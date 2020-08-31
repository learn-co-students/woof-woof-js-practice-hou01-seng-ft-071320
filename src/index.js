document.addEventListener('DOMContentLoaded', () =>{
getPups()
filterDogs()
})

const getPups = () => {
    fetch('http://localhost:3000/pups')
    .then(res => res.json())
    .then(json => 
        json.forEach((pup)=>{
            addPup(pup)
        })
        )
}

const addPup = (pup) => {
    let dogBar = document.querySelector('#dog-bar')
    let pupSpan = document.createElement('span')
    pupSpan.innerHTML = pup.name
    pupSpan.addEventListener('click', () => {pupInfo(pup)})
    dogBar.appendChild(pupSpan)
}

const pupInfo = (pup) => {

    let dogSummary = document.querySelector('#dog-info')
dogSummary.innerHTML = ""
let dogImg = document.createElement('img')
dogImg.src = pup.image
dogSummary.appendChild(dogImg)
let dogName = document.createElement('h2')
dogName.innerHTML = pup.name
dogSummary.appendChild(dogName)
let goodButton = document.createElement('button')
goodButton.classList.add('good-dog-button')
if (pup.isGoodDog){
    goodButton.innerText = "Good Dog"
}else{
    goodButton.innerText = "Bad Dog"
}
dogSummary.appendChild(goodButton)
goodButton.addEventListener('click', () => {
    goodToggle(pup)
    })
}

const goodToggle = (pup) => {
    let goodButton = document.querySelector('.good-dog-button')
    pup.isGoodDog = !pup.isGoodDog
    //console.log(pup.isGoodDog)
    if (pup.isGoodDog === true){
        goodButton.innerText = "Good Dog"
    }else{
        goodButton.innerText = "Bad Dog"
    }
    
    
    let patchData = {
        isGoodDog: pup.isGoodDog
    };
    fetch(`http://localhost:3000/pups/${pup.id}`,{
    method: 'PATCH',
    body: JSON.stringify(patchData),
    headers: {
        "Content-type": "application/json"
    }
    })
    .then(res => res.json())


}

const filterDogs = () => {
     const filterButton = document.querySelector('#good-dog-filter')
     filterButton.addEventListener('click', () => {
        document.querySelector('#dog-bar').innerHTML = ""
        let bText = document.querySelector('#good-dog-filter').innerText
        if (bText === 'Filter good dogs: OFF'){
            document.querySelector('#good-dog-filter').innerText = 'Filter good dogs: ON'
            fetch('http://localhost:3000/pups')
            .then(res => res.json())
            .then(json => 
                json.forEach((pup)=>{
                    if (pup.isGoodDog === true){
                        addPup(pup)
                    }
                })
                )
        }
        else{
            document.querySelector('#good-dog-filter').innerText = 'Filter good dogs: OFF'
            getPups()
        }
    })
}


