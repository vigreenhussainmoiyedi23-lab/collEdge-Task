import { useState } from "react";

function DropZone({ idx, status }) {
  const [isOver, setIsOver] = useState(false);

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        setIsOver(true);
      }}
      onDragLeave={() => setIsOver(false)}
      onDrop={() => {
        setIsOver(false);
        console.log(idx, status);
      }}
      style={{
        height: "20px",
        border: isOver ? "2px dashed blue" : "none",
        background: isOver ? "blue" : "transparent",
      }}
    >
      {isOver && <p>Drop here</p>}
    </div>
  );
}
export default DropZone;
