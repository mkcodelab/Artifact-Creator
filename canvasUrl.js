const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
// size for image scaling
const renderSize = 128;
const CW = canvas.width = renderSize;
const CH = canvas.height = renderSize;
const targetImg = document.querySelector('#targetImg');
targetImg.width = CW;
targetImg.height = CH;
// const armorImg = document.querySelector('#armorImg');
// targetImg.width = armorImg.width = CW;
// targetImg.height = armorImg.height = CH;

//todo
// upscale resolution of elements
// make themed spritesheets, steel, iron, copper, crystaline, etc.
// option of assembly elements on canvas based on x and y coordinates maybe
// it would be quite difficult
// example: some gem placed in pommel.

// load spritesheets
// sword parts
const gripSprite = new Image();
gripSprite.src = 'assets/grips.png';
const swordSprite = new Image();
swordSprite.src = 'assets/blanks.png';
const pommelSprite = new Image();
pommelSprite.src = 'assets/pommels.png';
const guardSprite = new Image();
guardSprite.src = 'assets/guards.png';

// armor parts
const armorSprite = new Image();
armorSprite.src = 'assets/chests.png';
const pauldronSprite = new Image();
pauldronSprite.src = 'assets/pauldrons.png';
const decoSprite = new Image();
decoSprite.src = 'assets/decos.png';


//generate image based on random spritesheet elements

function assemble() {
  
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.imageSmoothingEnabled = false;

  // math random * number of frames in spritesheet * width of sprite
  let spriteSize = 64
  // FRAMES = IMG.WIDTH / SPRITESIZE
  let blankFrSize = swordSprite.width / spriteSize;
  let gripFrSize = gripSprite.width / spriteSize;
  let pomFrSize = pommelSprite.width / spriteSize;
  let grdFrSize = guardSprite.width / spriteSize;

  let swordX = Math.floor(Math.random() * blankFrSize) * spriteSize;
  let gripX = Math.floor(Math.random() * gripFrSize) * spriteSize;
  let pommelX = Math.floor(Math.random() * pomFrSize) * spriteSize;
  let guardX = Math.floor(Math.random() * grdFrSize) * spriteSize;

  //random rotation
  let rotate = false;
  if (rotate) {
    let deg = Math.floor(Math.random()*360);
    // ctx.translate(CW/2, CH/2);
    ctx.rotate(20 * Math.PI / 180);
    
  }

  // drawing every element
  // drawImage(image, sx, sy, sw, sh, dx, dy, dw, dh)
  ctx.drawImage(swordSprite, swordX, 0, spriteSize, spriteSize, 0, 0, CW, CH);
  ctx.drawImage(gripSprite, gripX, 0, spriteSize, spriteSize, 0, 0, CW, CH);
  ctx.drawImage(guardSprite, guardX, 0, spriteSize, spriteSize, 0, 0, CW, CH);
  ctx.drawImage(pommelSprite, pommelX, 0, spriteSize, spriteSize, 0, 0, CW, CH);
  
  let imgFlip = false;
  let flipX = Math.random() > 0.5 ? -1 : 1;
  let flipY = Math.random() > 0.5 ? -1 : 1;

  // random flipping image horizontally / vertically
  if (flipX == -1 && imgFlip) {
    ctx.save();
    ctx.translate(CW, 0);
    ctx.scale(-1, 1)
    
  }
  if (flipY == -1 && imgFlip) {
    ctx.save();
    ctx.translate(0, CW);
    ctx.scale(1, -1);
    
  }
  
  // converting canvas to base64
  let imgData = canvas.toDataURL();
  //img url = url from above
  targetImg.src = imgData;
}
const assemblyBtn = document.querySelector('#assemblyBtn');

assemblyBtn.addEventListener('click', ()=> {
  if (bodyPart == 'weapon') {
    assemble();
  }
  if (bodyPart == 'body') {
    assembleArmor();
  }
});

// armor assembly
function assembleArmor() {
  let spriteSize = 64
  let armorFrSize = armorSprite.width / spriteSize;
  let pauldronFrSize = pauldronSprite.width / spriteSize;
  let decoFrSize = decoSprite.width / spriteSize;

  let armorX = Math.floor(Math.random() * armorFrSize) * spriteSize;
  let decoX = Math.floor(Math.random() * decoFrSize) * spriteSize;
  let pauldronX = Math.floor(Math.random() * pauldronFrSize) * spriteSize;
  // ctx.restore();
  ctx.imageSmoothingEnabled = false;

  ctx.clearRect(0, 0, CW, CH);
  ctx.drawImage(armorSprite, armorX, 0, spriteSize, spriteSize, 0, 0, CW, CH);
  ctx.drawImage(decoSprite, decoX, 0, spriteSize, spriteSize, 0, 0, CW, CH);
  ctx.drawImage(pauldronSprite, pauldronX, 0, spriteSize, spriteSize, 0, 0, CW, CH);

  let imgData = canvas.toDataURL();
  targetImg.src = imgData;

}
// const assembleArmorBtn = document.querySelector('#assembleArmorBtn');
// assembleArmorBtn.addEventListener('click', assembleArmor);

