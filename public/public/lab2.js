/* const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

const colors = ['purple', 'pink', 'green', 'red', 'blue', 'yellow'];
const generatedColors = [];
let age = 0;

for (let i = 0; i < 4; i++) {
  let newColor = false;
  while (!newColor) {
    const index = Math.round(Math.random() * 5);
    // console.log(index);
    const color = colors[index];
    if (generatedColors.includes(color)) {
      // console.log('regenerating color');
      newColor = false;
    } else {
      generatedColors[i] = color;
      newColor = true;
    }
  }
}

// console.log(generatedColors);

let currentRow = 0;

const colorform = document.getElementById('colorform');
const ageForm = document.getElementById('ageform');

colorform.addEventListener('submit', (event) => {
  event.preventDefault();
});

ageForm.addEventListener('submit', (event) => {
  event.preventDefault();
});

function fillTable(displayedColors) {
  for (let currentColumn = 0; currentColumn < 4; currentColumn++) {
    context.fillStyle = displayedColors[currentColumn];
    context.fillRect(currentColumn * 50, currentRow * 50, 50, 50);
  }
}

function countCorrect() {
  const color1 = document.getElementById('color1').value;
  const color2 = document.getElementById('color2').value;
  const color3 = document.getElementById('color3').value;
  const color4 = document.getElementById('color4').value;

  let correctBoth = 0;
  let correctColor = 0;

  if (generatedColors.includes(color1)) {
    if (generatedColors[0] === color1) {
      correctBoth += 1;
    } else {
      correctColor += 1;
    }
  }

  if (generatedColors.includes(color2)) {
    if (generatedColors[1] === color2) {
      correctBoth += 1;
    } else {
      correctColor += 1;
    }
  }

  if (generatedColors.includes(color3)) {
    if (generatedColors[2] === color3) {
      correctBoth += 1;
    } else {
      correctColor += 1;
    }
  }

  if (generatedColors.includes(color4)) {
    if (generatedColors[3] === color4) {
      correctBoth += 1;
    } else {
      correctColor += 1;
    }
  }

  console.log(correctBoth);
  console.log(correctColor);
  return [correctBoth, correctColor];
}

function fillNextRow() {
  // console.log('entered fillnextrow');

  // console.log(color1);

  let [correctBoth, correctColor] = countCorrect(generatedColors);
  console.log(correctBoth, correctColor);

  const displayedColors = [];
  let displayedLen = 0;

  while (correctBoth > 0) {
    correctBoth -= 1;
    displayedColors[displayedLen] = 'white';
    displayedLen += 1;
  }

  while (correctColor > 0) {
    correctColor -= 1;
    displayedColors[displayedLen] = 'black';
    displayedLen += 1;
  }

  while (displayedLen < 4) {
    displayedColors[displayedLen] = 'red';
    displayedLen += 1;
  }

  // console.log(displayedColors);

  fillTable(displayedColors);

  currentRow++;

  if (displayedColors[3] === 'white') {
    // console.log("You win!");
    const pWin = document.getElementById('youwin');
    pWin.style.display = 'block';
    // pWin.innerHTML = `You win, it took ${currentRow} tries and you're ${age} years old`;
    pWin.textContent = `You win, it took ${currentRow} tries and you're ${age} years old`;
  }

  if (currentRow > 7) {
    // console.log("You lose!");
    const pLose = document.getElementById('youlose');
    pLose.style.display = 'block';
    pLose.textContent = `You lose and you're ${age} years old`;
  }
}

const submitForm = document.getElementById('Submit');
submitForm.addEventListener('click', fillNextRow);

function setAge() {
  age = document.getElementById('age').value;
  // console.log(age);
}

const submitAge = document.getElementById('age');
submitAge.addEventListener('click', setAge); */
