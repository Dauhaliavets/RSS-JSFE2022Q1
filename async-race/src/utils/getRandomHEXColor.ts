const getRandomHEXColor = () => {
  const LETTERS = '0123456789abcdef';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    const randomInd = Math.floor(Math.random() * LETTERS.length);
    color += LETTERS[randomInd];
  }
  return color;
};

export { getRandomHEXColor };
