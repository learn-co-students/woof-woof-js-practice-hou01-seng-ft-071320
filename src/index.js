document.addEventListener("DOMContentLoaded", () => {
getPups()
filterGoodDogs()
})

const getPups = () => {
    const dogBar = document.querySelector("#dog-bar")
    while (dogBar.firstChild) dogBar.removeChild(dogBar.firstChild)

    fetch('http://localhost:3000/pups')
    .then(res => res.json())
    .then((pups) => {
        pups.forEach((pup) => {

            pupsOnDogBar(pup)
        })
    })
}

const pupsOnDogBar = (singlePup) => {
    const dogBar = document.querySelector("#dog-bar")
    const pupSpan = document.createElement('span')
    pupSpan.innerText = singlePup.name
    pupSpan.dataset.pupId = singlePup.id
    pupSpan.addEventListener('click', (e) => {
        e.preventDefault()
        const pupId = e.target.dataset.pupId
        getPup(pupId)
    })
    dogBar.append(pupSpan)
}

const getPup = (id) => {
    fetch(`http://localhost:3000/pups/${id}`)
    .then(res => res.json())
    .then((pup) => {
        showPup(pup)
    })
}

const showPup = (singlePup) => {
    const dogInfo = document.querySelector("#dog-info")
    while (dogInfo.firstChild) dogInfo.removeChild(dogInfo.firstChild)

    const pupImg = document.createElement('img')
    pupImg.src = singlePup.image

    const pupName = document.createElement('h2')
    pupName.innerText = singlePup.name

    const pupButton = document.createElement('button')
    pupButton.innerText = pupButtonStatus(singlePup) 
    pupButton.dataset.pupId = singlePup.id   
    pupButton.addEventListener('click', (e) => {
        e.preventDefault()
        const pupId = e.target.dataset.pupId
        togglePupStatus(pupId, singlePup.isGoodDog)
    })

    dogInfo.append(pupImg, pupName, pupButton)
    
}

const pupButtonStatus = (singlePup) => {
    if (singlePup.isGoodDog === true) {
        return "Good Dog!"
    } else {
        return "Bad Dog!"
    }
}

const togglePupStatus = (id, currentStatus) => {
    let futureStatus;

    if (currentStatus === true) {
        futureStatus = false
    } else {
        futureStatus = true
    }

    const newStatus = {
        "isGoodDog": futureStatus
    }

    if (futureStatus === false) {

        fetch(`http://localhost:3000/pups/${id}`, {
            method: 'PATCH', 
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(newStatus)
        })
        .then(res => res.json())
        .then((pup) => {
            getGoodPups()
            showPup(pup)
        })


    } else {

        fetch(`http://localhost:3000/pups/${id}`, {
            method: 'PATCH', 
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(newStatus)
        })
        .then(res => res.json())
        .then((pup) => {
            showPup(pup)
        })

    }



    fetch(`http://localhost:3000/pups/${id}`, {
        method: 'PATCH', 
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(newStatus)
    })
    .then(res => res.json())
    .then((pup) => {
        showPup(pup)
    })
}

const filterGoodDogs = () => {
    const filterButton = document.querySelector("#good-dog-filter")
    const dogInfo = document.querySelector("#dog-info")

    
    filterButton.addEventListener('click', (e) => {
        e.preventDefault()
        let buttonArray = filterButton.innerText.split(' ')
        let filterStatus = buttonArray[buttonArray.length - 1]

        if (filterStatus === 'OFF') {
            filterButton.innerText = 'Filter good dogs: ON'
            while (dogInfo.firstChild) dogInfo.removeChild(dogInfo.firstChild)
            getGoodPups()
        } else {
            filterButton.innerText = 'Filter good dogs: OFF'
            while (dogInfo.firstChild) dogInfo.removeChild(dogInfo.firstChild)
            getPups()
        }

    })
}

const getGoodPups = () => {
    const dogBar = document.querySelector("#dog-bar")
    while (dogBar.firstChild) dogBar.removeChild(dogBar.firstChild)
    
    fetch('http://localhost:3000/pups')
    .then(res => res.json())
    .then((pups) => {
        let goodPups;
        goodPups = pups.filter((pup) => {
            return pup.isGoodDog === true
        })
        goodPups.forEach((pup) => {
            goodPupsOnDogBar(pup)
        })
    })
}

const goodPupsOnDogBar = (singlePup) => {
    const dogBar = document.querySelector("#dog-bar")
    const pupSpan = document.createElement('span')
    pupSpan.innerText = singlePup.name
    pupSpan.dataset.pupId = singlePup.id
    pupSpan.addEventListener('click', (e) => {
        e.preventDefault()
        const pupId = e.target.dataset.pupId
        getPup(pupId)
    })
    dogBar.append(pupSpan)
}

