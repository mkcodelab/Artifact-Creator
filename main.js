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
        this.tier = Math.floor(Math.random() * 5 + 1);
        this.description = description;
        this.statOne = Math.floor(Math.random() * 10 + 10) * this.tier;
        this.statTwo = Math.floor(Math.random() * 20);
        this.price = Math.floor(Math.random() * 100) * this.tier * this.enchModif;
        
    }
}
const artifactList = [];

//dodaj wybor obrazka moze jakis


function createNewArtifact() {
    const nameInp = document.querySelector('.name-inp').value;
    const descr = document.querySelector('#description').value;
    const ench = document.querySelector('#enchanting').value;
    let isEnchanted = false;
    if (ench != '') isEnchanted = true;
    artifactList.push ( new Artifact( nameInp, bodyPart, "image", ench, descr, isEnchanted))
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
});
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

// enchantingText.addEventListener('keyup', (e)=>{
//     console.log(enchantingText.value);
// })

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

        if (art.ench.includes('aqua')) {
            enchantIcons += '💧'
        }
        if (art.ench.includes('ignis')) {
            enchantIcons +='🔥'
        }
        if (art.ench.includes('nox')) {
            enchantIcons +='🖤'
        }
        if (art.ench.includes('sanguis')) {
            enchantIcons += '🩸'
        }

        // checks for enchantment
        if (art.enchanted) {
            enchant = `Enchanted: ${art.ench}`;
        }


        browserBox.innerHTML += `
            <div class="artifact"> 
                <div class="art-values">
                    <h3>${art.name} ${icons}</h3>
                    <p>${art.type}, tier ${art.tier}</p>
                    <p>${enchant} ${enchantIcons}</p>
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
artifactList.push ( new Artifact( 'Chestplate of dark steel', 'body', "image", 'io jah pul','Very sturdy heavy armor. Suitable for bigger enemies'))
