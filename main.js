//creator
let btnCreate = document.querySelector('.create');
let createVisible = false;
const creator = document.querySelector('.creator');

btnCreate.addEventListener('click', ()=>{
    createVisible = !createVisible;
    creator.classList.toggle('visible');
    document.querySelector('.name-inp').value = '';
    document.querySelector('#description').value = '';

})
const closeBtn = document.querySelector('.close');
closeBtn.addEventListener('click', ()=>{
    createVisible = false;
    creator.classList.toggle('visible')
})
//zdjecie obiektu musimy zamienic na base64 i zapisac w localStorage

let bodyPart = null;

const checkboxes = document.querySelectorAll('.body-radio-input');
checkboxes.forEach(e=>{
    let el = e;
    el.addEventListener('change', ()=>{
        bodyPart = el.value;
    })
})
// 
class Artifact {
    constructor(name, type, image, ench, description, isEnchanted) {
        this.name = name;
        this.type = type;
        this.image = image;
        this.enchanted = isEnchanted;
        this.ench = ench;
        this.enchModif = 1;
       
        this.tier = 0;
        this.description = description;
        this.statOne = 0;
        this.statTwo = 0;
        this.price = 0;
        this.calcTier();
        this.calcPrice();
        this.calcStats();
    }
     // tier has to be based on name (prefixes or smth)
    calcTier() {
        let tier = 0;
        // for loop for name maching ?
        // if (this.name.match(/Strong|strong|Good|good|Exquisite|exquisite/)) tier += 1;
        if (this.name.toLowerCase().includes("superior")) tier += 2;
        if (this.name.toLowerCase().includes("great")) tier += 1;
        if (this.name.toLowerCase().includes("sharp")) tier += 1;
        if (this.name.toLowerCase().includes("sharpness")) tier += 1;
        if (this.name.toLowerCase().includes("strong")) tier += 1;
        if (this.description.length >= 15) tier += 2;
        if (this.description.toLowerCase().includes('superior')) tier += 1;
        this.tier = tier;
    }
    calcPrice() {
        this.price = Math.floor(Math.random() * 100) * this.tier * this.enchModif;
    }
    calcStats() {
        let statOne = 0;
        if (this.name.toLowerCase().includes("sword")) statOne += 5;
        if (this.name.toLowerCase().includes("carnage")) statOne += 20;
        if (this.name.toLowerCase().includes("hammer")) statOne += 10;
        this.statOne = statOne + Math.floor(Math.random() * 10 + 10) * this.tier;
        this.statTwo = Math.floor(Math.random() * 20);
    }
}
let artifactList = [];

//array of avilable enchantments
const enchArr = 
[
    {name: 'fire', inc: 'ignis', res: 'Fire Spell'},
    {name: 'water', inc: 'aqua', res: 'Water Spell'},
    {name: 'black spell', inc: 'nox', res: 'Black Spell'},
    {name: 'lmao', inc: 'lmao', res: 'Laughting my ass off'},
    {name: 'pwned', inc: 'pwned', res: 'You are.'},
    {name: 'sudden darkness', inc: 'nox nox nox', res: 'Sudden Darkness'},
    {name: 'black fire', inc: 'nox ignis', res: 'Black Fire'},
    {name: 'great black spell', inc: 'nox ignis maximus', res: 'Great Black Fire'},
    {name: 'black steel', inc: 'nox ferrum', res: 'Black Steel'},
    {name: 'fire steel', inc: 'ignis ferrum', res: 'Fire Steel'},
    {name: 'iron blood', inc: 'ferrum sanguis', res: 'Iron Blood'},
    {name: 'darkblood', inc: 'nox sanguis', res: 'Darkblood flow trough your veins mortal.'},
    {name: 'vigor', inc: 'aqua vitae', res: 'Vigor'},
    {name: 'maxVit', inc: 'vitae maximus', res: 'Hard to kill... Arent you?'},
    {name: 'abracadabra', inc: 'abracadabra', res: 'Seriously? Ok got it.'},
    {name: 'luxferre', inc: 'lux ferre', res: 'Let there be enlightenment!'},
    {name: 'ignis rex', inc: 'ignis rex', res: 'Flaming King'},
  
];

function saveToLocalStorage(array) {
    // stringifying artifact array
    let json = JSON.stringify(array);
    //saving json to localstorage
    localStorage.setItem('artlist' ,json);
}

function getFromLocalStorage() {
    let json = localStorage.getItem('artlist');
    let artlist = JSON.parse(json);
    // console.log(artlist);
    artifactList = artlist;
}

function deleteArtifact() {
    //traversing trough DOM to find the name of the artifact
    let artBox = this.parentElement.parentElement;
    let artName = artBox.children[0].children[0].innerText;

    //loop through artifact list to find the corresponding artifact
    for (art of artifactList) {
        if ( artName === art.name) {
            // console.log('clicked: ', artName);
            // console.log('selected from list: ', art.name);
            //finding the index of the clicked artifact
            let index = artifactList.indexOf(art)
            artifactList.splice(index, 1);
        }
    }
    artBox.style.display = 'none';
    saveToLocalStorage(artifactList);
    
}

function createNewArtifact() {
    const nameInp = document.querySelector('.name-inp').value;
    const descr = document.querySelector('#description').value;
    const enchText = document.querySelector('#enchanting').value;
    const img = document.querySelector('#targetImg');

    let enchant = enchText.trim();
    console.log(enchant)
    let isEnchanted = false;
    if (enchant != '') isEnchanted = true;
    artifactList.push ( new Artifact( nameInp, bodyPart, img.src, enchant, descr, isEnchanted))
    console.log('artifact Created')
    console.log(artifactList)
    img.src = 'assets/default.png'
    // saving to localstorage
    saveToLocalStorage(artifactList);
}
const applyBtn = document.querySelector('.apply');
applyBtn.addEventListener('click', ()=>{
    console.log('created');
    createNewArtifact();
    createVisible = false;
    creator.classList.toggle('visible')
})
const browseBtn = document.querySelector('.browse')
browseBtn.addEventListener('click', ()=>{
    openBrowser();
})
const browserWindow = document.querySelector('.browser-window')

function openBrowser() {
    console.log('opened')
    getFromLocalStorage();
    updateBrowser();
    browserWindow.classList.toggle('visible');
}
const browserCloseBtn = document.querySelector('.browser-close');
browserCloseBtn.addEventListener('click', ()=>{
    browserWindow.classList.toggle('visible');
})


//browser update, rendering all content of artifactList
function updateBrowser() {
    let browserBox = document.querySelector('.browser-box');
    browserBox.innerHTML = '';
    let icon = `<i class="tier-ico">💎</i>`;
    //iterate trough artifactList
    for (art of artifactList) {

        let bodyPart = art.type;
        let tier = art.tier;
        let enchant = '';
        let enchantIcons = '';
        let icons = '';
        let firstStat = 'Defence: ';
        
        if (bodyPart === 'weapon') {
            firstStat = 'Damage: ';
        }
        if (tier >= 5) {
            icon = '<i class="tier-ico-2">💰</i>';
        }

        // added dynamic class to change appearance of artifact container based on tier level
        let tierClass = `tier-${tier}`;

    
        // concat strings (tier icons)
        for (let i = 0; i < tier; i++) {
            icons += icon;
        }
        let spell = '';
        enchArr.forEach(ench => {
            if (ench.inc === art.ench.toLowerCase()) {
              enchant = ench.inc;
              enchantIcons = '✨';
              spell = ench.res;
            }
        });

        browserBox.innerHTML += `
            <div class="artifact ${tierClass}">
                    <div class="art-values">
                        <h3>${art.name}</h3>
                        <p>${icons}</p>
                        <p>${art.type}, tier ${art.tier}</p>
                        <p>${enchant} ${enchantIcons}</p>
                        <p class="art-spell">Spell: ${spell}</p>
                        <p class="art-description">${art.description}</p>
                        <p class="art-price">Price: ${art.price} </p>
                        <p>${firstStat} ${art.statOne} </p>
                    </div>
                    <div class="img-box">
                        <img class="art-image" src="${art.image}">
                        <button class="remove-art-btn" id="removeArtBtn">Destroy It</button>
                    </div>
                </div>
            </div>
        `;
        let destroyBtns = document.querySelectorAll('#removeArtBtn');
        destroyBtns.forEach(e=> {
            e.addEventListener('click', deleteArtifact)
        });
    }
}
// artifactList.push ( new Artifact( 'Chestplate', 'body', "image", 'ignis','descr', true))

//todo
/* 
add name checking for some prefixes and sufixes...
diablo-like scheme.

add specific class for magical, non-magical, unique and rare items
... Diablo for the win!

if (name.includes('Strong'))
or regex like if (name.match(/Strong|strong|Good|good|Exquisite|exquisite/))

upgrade enchanting system.
disbable inputting html code ;D
*/