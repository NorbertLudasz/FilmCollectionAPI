const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

const colors = ['purple', 'pink', 'green', 'red', 'blue', 'yellow'];
const generatedColors = [];

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

function fillNextRow() {
  event.preventDefault();
  // console.log('entered fillnextrow');
  const color1 = document.getElementById('color1').value;
  const color2 = document.getElementById('color2').value;
  const color3 = document.getElementById('color3').value;
  const color4 = document.getElementById('color4').value;
  // console.log(color1);

  let correctBoth = 0;
  let correctColor = 0;

  if (generatedColors.includes(color1)) {
    if (generatedColors[0] == color1) {
      correctBoth = correctBoth + 1;
    } else {
      correctColor = correctColor + 1;
    }
  }

  if (generatedColors.includes(color2)) {
    if (generatedColors[1] == color2) {
      correctBoth = correctBoth + 1;
    } else {
      correctColor = correctColor + 1;
    }
  }

  if (generatedColors.includes(color3)) {
    if (generatedColors[2] == color3) {
      correctBoth = correctBoth + 1;
    } else {
      correctColor = correctColor + 1;
    }
  }

  if (generatedColors.includes(color4)) {
    if (generatedColors[3] == color4) {
      correctBoth = correctBoth + 1;
    } else {
      correctColor = correctColor + 1;
    }
  }

  displayedColors = [];
  displayedLen = 0;

  while (correctBoth > 0) {
    correctBoth = correctBoth - 1;
    displayedColors[displayedLen] = 'white';
    displayedLen = displayedLen + 1;
  }

  while (correctColor > 0) {
    correctColor = correctColor - 1;
    displayedColors[displayedLen] = 'black';
    displayedLen = displayedLen + 1;
  }

  while (displayedLen < 4) {
    displayedColors[displayedLen] = 'red';
    displayedLen = displayedLen + 1;
  }

  // console.log(displayedColors);

  for (let currentColumn = 0; currentColumn < 4; currentColumn++) {
    context.fillStyle = displayedColors[currentColumn];
    context.fillRect(currentColumn * 50, currentRow * 50, 50, 50);
  }

  currentRow++;

  if (displayedColors[3] == 'white') {
    // console.log("You win!");
    const pWin = document.getElementById('youwin');
    pWin.style.display = 'block';
  }

  if (currentRow > 7) {
    // console.log("You lose!");
    const pLose = document.getElementById('youlose');
    pLose.style.display = 'block';
  }
}
