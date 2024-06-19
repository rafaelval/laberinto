const generateMaze = (level) => {
  const width = level * 5;
  const height = level * 5;
  const newMaze = Array.from({ length: height }, () =>
    Array.from({ length: width }, () => "W")
  );

  //algoritmo recursivo backtracker
  const startX = Math.floor(Math.random() * (width / 2) * 2);
  const startY = Math.floor(Math.random() * (height / 2) * 2);
  const endX = width - 3;
  const endY = height - 3;
  newMaze[startY][startX] = "S";
  newMaze[endY][endX] = "E";

  const directions = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ]; //arriba, abajo, izquierda, derecha
  const stack = [[startX, startY]];

  while (stack.length > 0) {
    const [x, y] = stack[stack.length - 1];
    newMaze[y][x] = "?";

    let neighbors = [];
    for (let i = 0; i < 4; i++) {
      const dx = x + directions[i][0] * 2;
      const dy = y + directions[i][1] * 2;
      if (
        dx >= 0 &&
        dx < width &&
        dy >= 0 &&
        dy < height &&
        newMaze[dy][dx] === "W"
      ) {
        neighbors.push([dx, dy, i]); //guarda el index de la direccion
      }
    }
    if (neighbors.length > 0) {
      const [nx, ny, dirIndex] =
        neighbors[Math.floor(Math.random() * neighbors.length)];
      newMaze[ny - directions[dirIndex][1]][nx - directions[dirIndex][0]] = "?";
      stack.push([nx, ny]);
    } else {
      stack.pop();
    }
    return newMaze;
  }
};

export default generateMaze