const colors = [
  "#9013FE",
  "#FF7A7A",
  "#E3C700",
  "#0678B0",
  "#42E79D"
];

const grayscales = [
  "#000000",
  "#737373",
  "#E3E3E3",
  "#FFFFFF"
];

const generateAvatar = address => {
  address = address.slice(2);
  let temporaryCanvas = document.createElement("canvas");
  temporaryCanvas.width = 400;
  temporaryCanvas.height = 400;
  let ctx = temporaryCanvas.getContext("2d");
  const colorIdx1 = parseInt(address[0], 16);
  const colorIdx2 = parseInt(address[1], 16);
  let ptr = 0;
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      const h = address.slice(ptr * 2, ptr * 2 + 2);
      const value = parseInt(h, 16);
      if (ptr === colorIdx1 || ptr === colorIdx2) {
        ctx.fillStyle = colors[value % 5];
      } else {
        ctx.fillStyle = grayscales[value % 4];
      }
      ctx.fillRect(j * 100, i * 100, 100, 100);
      ptr++;
    }
  }
  return temporaryCanvas.toDataURL();
};

export default generateAvatar;
