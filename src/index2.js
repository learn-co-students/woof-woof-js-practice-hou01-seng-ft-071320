document.addEventListener('DOMContentLoaded', () => {
    fetchDogs();
})
const fetchDogs = () => {
    fetch('http://localhost:3000/pups')
    .then(response => response.json())
    .then(pups => renderDogs(pups))
}
const renderDogs  = (pups) => {
    attachPupsToBar(pups);
}
const attachPupsToBar = (pups) => {
    const dogBarDiv = document.getElementById('dog-bar')
    pups.forEach(pup => {
        const pupSpan = document.createElement('span')
        pupSpan.innerHTML = pup.name
        pupSpan.dataset.id = pup.id
        dogBarDiv.appendChild(pupSpan)
        pupSpan.addEventListener("click", (e) =>{
            pupInfo(pup);
        })
    });
}
const pupImg = document.createElement('img')
const pupName = document.createElement('h2')
const pupGoodButton = document.createElement('button')
const pupInfo = (pup) => {
    const info = document.getElementById('dog-info')
    pupImg.src = pup.image
    pupName.innerHTML = pup.name
    info.append(pupImg, pupName)
    if (pup.isGoodDog === true){
        pupGoodButton.innerHTML = "Good Dog!"
        info.append(pupGoodButton)
    } else {
        pupGoodButton.innerHTML = "Bad Dog!"
        info.append(pupGoodButton)
    }
    pupGoodButton.addEventListener("click", (e) => {
        e.preventDefault()
        if (pupGoodButton.innerHTML === "Good Dog!"){
            patchBadDog(pup);
        } else {
            patchGoodDog(pup);
        }
    })
}
const patchGoodDog = (pup) => {
    const dogStatus = true
    console.log(pup.id)
    fetch(`http://localhost:3000/pups/${pup.id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        }, body: JSON.stringify({"isGoodDog" : dogStatus})
    }).then(res => res.json())
    .then(() => {pupGoodButton.innerText = "Good Dog!"})
}
const patchBadDog = (pup) => {
    const dogStatus = false
    console.log(pup.id)
    fetch(`http://localhost:3000/pups/${pup.id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        }, body: JSON.stringify({"isGoodDog" : dogStatus})
    }).then(res => res.json())
    .then(() => {pupGoodButton.innerText = "Bad Dog!"})
}