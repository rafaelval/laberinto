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
  const [record, setRecord] = useState(0);

  useEffect(() => {
    const newMaze = generateMaze(level);
    setMaze(newMaze);
    setRecord(JSON.parse(localStorage.getItem("record")) || 0);
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
          const tempScore = score + level * 10;
          setScore(tempScore);
          localStorage.setItem("record", JSON.stringify(tempScore));
          setRecord(score);
          setLevel(level + 1);
          setPlayerPosition({ x: 0, y: 0 });
        } else {
          setPlayerPosition({ x: newX, y: newY });
        }
      }
    }
  };

  const handleKeyDown = (event) => {
    switch (event.key) {
      case "ArrowUp":
        handleMove("up");
        break;
      case "ArrowDown":
        handleMove("down");
        break;
      case "ArrowLeft":
        handleMove("left");
        break;
      case "ArrowRight":
        handleMove("right");
        break;
      default:
        break;
    }
  };

  const handleReset = ()=>{
    localStorage.setItem("record", JSON.stringify(0))
    setRecord(0)
  }

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    }; // eslint-disable-next-line
  }, [handleMove]);

  return (
    <div className="maze-container">
      <div className="record">
        <p>Puntaje mas alto: {record}</p>
        <button onClick={handleReset}>Borrar record</button>
      </div>
      <div className="contPrinc">
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
      </div>
      
      <div className="score">Puntaje: {score}</div>
    </div>
  );
};
