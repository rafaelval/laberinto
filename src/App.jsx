import React, { useEffect, useState } from "react";
import generateMaze from "./helpers/generateMaze";
import renderMaze from "./helpers/renderMaze";
import {
  FaArrowUp,
  FaArrowDown,
  FaArrowLeft,
  FaArrowRight,
} from "react-icons/fa";
import "./App.css";

export const App = () => {
  const [playerPosition, setPlayerPosition] = useState({ x: 0, y: 0 });
  const [maze, setMaze] = useState([]);
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);

  useEffect(() => {
    const newMaze = generateMaze(level);
    setMaze(newMaze);
  }, [level]);

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
    if (newX >= 0 && newX < maze[0].length && newY >= 0 && newY < maze.length) {
      if (maze[newY][newX] !== "W") {
        if (maze[newY][newX] === "E") {
          setScore(score + level * 10);
          setLevel(level + 1);
          setPlayerPosition({ x: 0, y: 0 });
        } else {
          setPlayerPosition({ x: newX, y: newY });
        }
      }
    }
  };

  return (
    <div className="maze-container">
      <div className="maze">{renderMaze(maze, playerPosition)}</div>
      <div className="controls">
        <span onClick={() => handleMove("up")}>
          <i>
            <FaArrowUp />
          </i>
        </span>
        <div>
          <span onClick={() => handleMove("left")}>
            <i>
              <FaArrowLeft />
            </i>
          </span>
          <span onClick={() => handleMove("down")}>
            <i>
              <FaArrowDown />
            </i>
          </span>
          <span onClick={() => handleMove("right")}>
            <i>
              <FaArrowRight />
            </i>
          </span>
        </div>
      </div>
      <div className="score">Puntaje: {score}</div>
    </div>
  );
};
