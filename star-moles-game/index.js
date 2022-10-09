const imgs = document.querySelectorAll('.game .hole img');

const intervalTime = 30000;
const disapperTime = 3000;
const royalMoleChance = 10;

let score = 0;

imgs.forEach(img => show(img))

function show(img) {
    const randomTime = Math.random() * intervalTime;
    const rollNumber = Math.random() * royalMoleChance;
    let moleType;
    if (rollNumber < 9) {
        moleType = "mole";
    } else {
        moleType = "royalMole";
    }
    setTimeout(() => {
        switch (moleType) {
            case "mole":
                img.src = "./img/mole-hungry.png";
                break;
            case "royalMole":
                img.src = "./img/king-mole-hungry.png";
                break;
            default:
                break;
        }
        img.classList.add('show');
    }, randomTime);
    setTimeout(() => {
        if (!img.src.includes('-fed.png')) {
            switch (moleType) {
                case "mole":
                    img.src = "./img/mole-sad.png"
                    break;
                case "royalMole":
                    img.src = "./img/king-mole-sad.png"
                    break;
                default:
                    break;
            }
        }
    }, randomTime + disapperTime - 1000);
    setTimeout(() => {
        switch (moleType) {
            case "mole":
                img.src = "./img/mole-leaving.png"
                break;
            case "royalMole":
                img.src = "./img/king-mole-leaving.png"
                break;
            default:
                break;
        }
    }, randomTime + disapperTime - 500);

    setTimeout(() => {
        img.classList.remove('show');
        show(img)
    }, randomTime + disapperTime);
}

function countPoints(img) {
    if (img.target.src.includes("king-mole-hungry.png")) {
        score += 2;
        document.querySelector('.meter-container').style.width = `${score * 100}px`;
        img.target.src = "./img/king-mole-fed.png";
    } else if (img.target.src.includes("mole-hungry.png")) {
        score++
        document.querySelector('.meter-container').style.width = `${score * 100}px`;
        img.target.src = "./img/mole-fed.png";
    }
    if (score >= 10) {
        document.body.innerHTML = '<div class="win-board"><img src="./img/win.png"></div>';
    }
}

imgs.forEach(img => {
    img.addEventListener('click', countPoints)
})