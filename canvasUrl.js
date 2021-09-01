const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
// size for image scaling
const renderSize = 128;
const CW = canvas.width = renderSize;
const CH = canvas.height = renderSize;
const targetImg = document.querySelector('#targetImg');
targetImg.width = CW;
targetImg.height = CH;
let spriteSize = 64

//todo
// make themed spritesheets, steel, iron, copper, crystaline, etc.
// ADD DEFAULT IMAGES OF PIECES, GRAY-OUT BOOTS ETC.
// optionals
// upscale resolution of elements
// option of assembly elements on canvas based on x and y coordinates maybe
// it would be too difficult to align them
// example: some gem placed in pommel.

// load spritesheets
// sword parts
const gripSprite = new Image(); gripSprite.src = 'assets/grips.png';
const swordSprite = new Image(); swordSprite.src = 'assets/blanks.png';
const pommelSprite = new Image(); pommelSprite.src = 'assets/pommels.png';
const guardSprite = new Image(); guardSprite.src = 'assets/guards.png';

//mace parts
const shaftSprite = new Image(); shaftSprite.src = "assets/shafts.png";
const headSprite = new Image(); headSprite.src = 'assets/heads.png';

// armor parts
const armorSprite = new Image(); armorSprite.src = 'assets/chests.png';
const pauldronSprite = new Image(); pauldronSprite.src = 'assets/pauldrons.png';
const decoSprite = new Image(); decoSprite.src = 'assets/decos.png';

//pants parts
const pantsSprite = new Image(); pantsSprite.src = 'assets/pants.png';
const tassetSprite = new Image(); tassetSprite.src = 'assets/tassets.png'; //lol
const cuisseSprite = new Image(); cuisseSprite.src = 'assets/cuisses.png';

//generate image based on random spritesheet elements

// upgraded unified assembly function, with "existence" check
function unifiedAssembly(el1, el2, el3, el4) {
  ctx.clearRect(0, 0, CW, CH);
  // checking if element is passed
  if (el1) {
     let el1FrSize = el1.width / spriteSize;
     let el1X = Math.floor(Math.random() * el1FrSize) * spriteSize;
     ctx.imageSmoothingEnabled = false;
     ctx.drawImage(el1, el1X, 0, spriteSize, spriteSize, 0, 0, CW, CH);
  }
  if (el2) {
    let el2FrSize = el2.width / spriteSize;
    let el2X = Math.floor(Math.random() * el2FrSize) * spriteSize;
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(el2, el2X, 0, spriteSize, spriteSize, 0, 0, CW, CH);
  }
  if (el3) {
    let el3FrSize = el3.width / spriteSize;
    let el3X = Math.floor(Math.random() * el3FrSize) * spriteSize;
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(el3, el3X, 0, spriteSize, spriteSize, 0, 0, CW, CH);
  }
  if (el4) {
    let el4FrSize = el4.width / spriteSize;
    let el4X = Math.floor(Math.random() * el4FrSize) * spriteSize;
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(el4, el4X, 0, spriteSize, spriteSize, 0, 0, CW, CH);
  }

  let imgData = canvas.toDataURL();
  targetImg.src = imgData;
  console.log('unified assembly completed')
}

// add axes
const assemblyBtn = document.querySelector('#assemblyBtn');
assemblyBtn.addEventListener('click', ()=> {
  
  if (bodyPart == 'weapon') {
    let category = Math.floor(Math.random() * 2);
    if (category == 0) unifiedAssembly(swordSprite, gripSprite, pommelSprite, guardSprite);
    if (category == 1) unifiedAssembly(shaftSprite, headSprite);
  }
  if (bodyPart == 'body') {
    unifiedAssembly(armorSprite, decoSprite, pauldronSprite);
  }
  if (bodyPart == 'boots') {
    unifiedAssembly();
  }
  if (bodyPart == 'head') {
    unifiedAssembly();
  }
  if (bodyPart == 'pants') {
    unifiedAssembly(pantsSprite, cuisseSprite, tassetSprite);
  }
  if (bodyPart == 'gloves') {
    unifiedAssembly();
  }
  if (bodyPart == 'other') {
    unifiedAssembly();
  }
});