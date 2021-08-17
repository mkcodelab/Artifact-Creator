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

class Artifact {
    constructor(name, type, image, ench, description, isEnchanted) {
        this.name = name;
        this.type = type;
        this.image = image;
        this.enchanted = isEnchanted;
        this.ench = ench;
        this.enchModif = 1;
        // tier has to be based on name (prefixes or smth)
        this.tier = Math.floor(Math.random() * 5 + 1);
        this.description = description;
        this.statOne = Math.floor(Math.random() * 10 + 10) * this.tier;
        this.statTwo = Math.floor(Math.random() * 20);
        this.price = Math.floor(Math.random() * 100) * this.tier * this.enchModif;
        
    }
}
const artifactList = [];

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

function createNewArtifact() {
    const nameInp = document.querySelector('.name-inp').value;
    const descr = document.querySelector('#description').value;
    const enchText = document.querySelector('#enchanting').value;

    let enchant = enchText.trim();
    console.log(enchant)
    let isEnchanted = false;
    if (enchant != '') isEnchanted = true;
    artifactList.push ( new Artifact( nameInp, bodyPart, "image", enchant, descr, isEnchanted))
    console.log('artifact Created')
    console.log(artifactList)
    
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
    updateBrowser();
    browserWindow.classList.toggle('visible');
}

const browserCloseBtn = document.querySelector('.browser-close');
browserCloseBtn.addEventListener('click', ()=>{
    browserWindow.classList.toggle('visible');
})


//browser update
function updateBrowser() {
    let browserBox = document.querySelector('.browser-box');
    browserBox.innerHTML = '';
    let icon = '💎';
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
        // concat strings (diamonds)
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

// add eventlistener to all .artifact
        browserBox.innerHTML += `
            <div class="artifact"> 
                <div class="art-values">
                    <h3>${art.name} ${icons}</h3>
                    <p>${art.type}, tier ${art.tier}</p>
                    <p>${enchant} ${enchantIcons}</p>
                    <p class="art-spell">Spell: ${spell}</p>
                    <p class="art-description">${art.description}</p>
                    <p class="art-price">Price: ${art.price} </p>
                    <p>${firstStat} ${art.statOne} </p>
                </div>
                <div class="art-image">
                </div>
            </div>
        `
        
    }
}
// artifactList.push ( new Artifact( 'Chestplate of dark steel', 'body', "image", 'ignis','Very sturdy heavy armor. Suitable for bigger enemies', true))

//todo
/* 
add name checking for some prefixes and sufixes...
diablo-like scheme.

if (name.includes('Strong'))
or regex like if (name.match(/Strong|strong|Good|good|Exquisite|exquisite/))

upgrade enchanting system.
upgrade css.
rethink rendering artifacts in the browser

disbable inputting html code ;D
*/