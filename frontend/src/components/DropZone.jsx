import { useState } from "react";
import { useTask } from "../hook/useTask";

function DropZone({ idx, status }) {
  const [isOver, setIsOver] = useState(false);
  const { onDropHandler, activeTask } = useTask();

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        setIsOver(true);
      }}
      onDragLeave={() => setIsOver(false)}
      onDrop={() => {
        console.log("dropped");
        onDropHandler(activeTask, status, idx);
        setIsOver(false);
      }}
      className={`
        group relative flex h-20 w-full flex-col items-center justify-center
        rounded-xl border-2 border-dashed transition-all duration-200 ease-out
        ${
          isOver
            ? "border-blue-500 bg-blue-50/80 shadow-inner"
            : "border-gray-200 bg-gray-50/60 hover:border-gray-300 hover:bg-gray-100/70"
        }
      `}
    >
      {/* Subtle placeholder when not dragging over */}
      {!isOver && (
        <div className="flex flex-col items-center gap-1 opacity-60 ">
          <div className="h-px w-8 bg-gray-300" />
          <span className="text-[10px] font-medium tracking-wider text-gray-400">
            DROP ZONE
          </span>
        </div>
      )}

      {/* Active drop state */}
      {isOver && (
        <div className="flex flex-col items-center gap-1.5 pointer-events-none">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500/10">
            <span className="text-xl text-blue-600">↓</span>
          </div>
          <p className="text-sm font-semibold text-blue-600">Drop here</p>
        </div>
      )}

      {/* Very subtle inner glow on hover */}
      <div
        className={`
          pointer-events-none absolute inset-0 rounded-xl transition-opacity
          ${isOver ? "opacity-100" : "opacity-0 group-hover:opacity-30"}
          bg-[radial-gradient(circle_at_center,#3b82f620_0%,transparent_70%)]
        `}
      />
    </div>
  );
}

export default DropZone;
