// unified assembly function for every part, but it has to have 4 elements

// function unifiedAssembly(el1, el2, el3, el4) {
//   let el1FrSize = el1.width / spriteSize;
//   let el2FrSize = el2.width / spriteSize;
//   let el3FrSize = el3.width / spriteSize;
//   let el4FrSize = el4.width / spriteSize;
//   // four elements and its Frame X
//   let el1X = Math.floor(Math.random() * el1FrSize) * spriteSize;
//   let el2X = Math.floor(Math.random() * el2FrSize) * spriteSize;
//   let el3X = Math.floor(Math.random() * el3FrSize) * spriteSize;
//   let el4X = Math.floor(Math.random() * el4FrSize) * spriteSize;
//   // drawing elements on top of each other
//   ctx.imageSmoothingEnabled = false;
//   ctx.clearRect(0, 0, CW, CH);
//   ctx.drawImage(el1, el1X, 0, spriteSize, spriteSize, 0, 0, CW, CH);
//   ctx.drawImage(el2, el2X, 0, spriteSize, spriteSize, 0, 0, CW, CH);
//   ctx.drawImage(el3, el3X, 0, spriteSize, spriteSize, 0, 0, CW, CH);
//   ctx.drawImage(el4, el4X, 0, spriteSize, spriteSize, 0, 0, CW, CH);

//   let imgData = canvas.toDataURL();
//   targetImg.src = imgData;
//   console.log('unified assembly completed')
// }

// IMPORTANT !!!!!!!!

// you can add some additional versions of unifiedAssembly, 
// if (bodyPart == 'weapon') {
//   let category = Math.floor(Math.random() * 5); from 0 to 4
//   if (category == 0) unifiedAssembly(swordSprite, etc);
//   if (category == 1) unifiedAssembly(axeSprite, etc);
//   if (category == 3) unifiedAssembly(hammerSprite, etc);
//   if (category == 4) unifiedAssembly(bowSprite, etc);
// }