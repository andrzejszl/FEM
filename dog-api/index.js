// https://dog.ceo/api/breed/hound/afghan/images/random

const dogApi = "https://dog.ceo/api/breed";
const dogListAPI = "https://dog.ceo/api/breeds/list/all";
const selectDoggo = document.querySelector('#doggo');

//get dog list
fetch(dogListAPI).then(res => {
        return res.json();
    })
    .then(dogList => {
        for (race in dogList.message) {
            if (dogList.message[race].length > 0) {
                dogList.message[race].forEach(subrace => {
                    const doggoOption = document.createElement('option');
                    doggoOption.value = `${race} ${subrace}`;
                    doggoOption.innerText = `${race} ${subrace}`;
                    selectDoggo.appendChild(doggoOption);
                })
            } else {
                const doggoOption = document.createElement('option');
                doggoOption.value = race;
                doggoOption.innerText = race;
                selectDoggo.appendChild(doggoOption);
            }
        }
    })

function showLoading() {
    document.querySelector('.loading')
        .classList.add('show')
}

function hideLoading() {
    document.querySelector('.loading')
        .classList.remove('show')
}

const img = document.querySelector('.doggo');

function loadDoggo(doggo) {
    const selectedDog = doggo.target.value;
    let newApi;
    //has subrace
    if (selectedDog.indexOf(' ') >= 0) {
        const doggoRaceAndSubrace = selectedDog.split(' ');
        newApi = dogApi + `/${doggoRaceAndSubrace[0]}/${doggoRaceAndSubrace[1]}/images/random`;
    } else {
        //has not subrace
        newApi = dogApi + `/${selectedDog}/images/random`;
    }
    img.src = "";
    img.alt = "";
    showLoading()
    fetch(newApi)
        .then(response => {
            return response.json()
        })
        .then(data => {
            img.src = data.message
            img.alt = selectedDog;

            hideLoading()
        })
}

//load image on page load
loadDoggo({
    target: {
        value: "affenpinscher"
    }
})

selectDoggo.addEventListener('change', loadDoggo);