import React, { useState } from "react";

export const App = () => {
  const [playerPosition, setPlayerPosition] = useState({ x: 0, y: 0 });
  const [maze, setMaze] = useState([]);
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);

  const handleMove = (direction) => {
    let newX = playerPosition.x;
    let newY = playerPosition.y;
    switch (direction) {
      case "up":
        newY -= 1;
        break;
      case "down":
        newY += 1;
        break;
      case "left":
        newX -= 1;
        break;
      case "right":
        newX += 1;
        break;
      default:
        break;
    }
    if (newX >= 0 && newX < maze[0].length && newY >= 0 && newY < maze.length){
      if (maze[newY][newX] !== 'W') {
        if (maze[newY][newX] === 'E'){
          setScore(score + level * 10)
          setLevel(level + 1)
          setPlayerPosition({x:0, y:0})
        } else {
          setPlayerPosition({x:newX, y:newY})
        }
      }
    }
  };

  return <div>App</div>;
};
