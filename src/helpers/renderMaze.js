const renderMaze = (maze, playerPosition) => {
  return maze.map((row, y) => (
    <div key={y} className="row">
      {row.map((cell, x) => (
        <div
          key={x}
          className={`cell ${
            cell === "S"
              ? "start"
              : cell === "E"
              ? "end"
              : cell === "?"
              ? "empty"
              : "wall"
          }`}
        >
          {cell === "S" ? "S" : cell === "E" ? "E" : ""}
          {playerPosition.x === x && playerPosition.y === y ? (
            <div className="player"></div>
          ) : (
            ""
          )}
        </div>
      ))}
    </div>
  ));
};

export default renderMaze