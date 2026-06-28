import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Pencil, Trash2, X } from "lucide-react";
import { useTask } from "../hook/useTask";
import { useState } from "react";

const TaskCard = ({ title, description, priority, _id, coloumn,index }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [taskDets, setTaskDets] = useState({ title, description, priority });
  const { updateTaskHandler, deleteTaskHandler } = useTask();

  return (
    <div draggable onDrag={(e) => e.preventDefault()} className="bg-white rounded-xl shadow p-4 mb-4 border">
      {isEdit ? (
        <input
          type="text"
          placeholder="enter the title"
          minLength={3}
          maxLength={50}
          value={taskDets.title}
          className="w-full mt-2 border rounded-xl p-3 outline-none"
          onChange={(e) => setTaskDets({ ...taskDets, title: e.target.value })}
        />
      ) : (
        <h3 className="font-semibold text-lg">{title}</h3>
      )}

      {isEdit ? (
        <textarea
          placeholder="enter the description"
          minLength={3}
          maxLength={1000}
          value={taskDets.description}
          className="w-full mt-2 border rounded-xl p-3 outline-none"
          onChange={(e) =>
            setTaskDets({ ...taskDets, description: e.target.value })
          }
        />
      ) : (
        <p className="text-gray-600 mt-2">{description}</p>
      )}

      <div
        className={`flex ${isEdit && "flex-col"} justify-between items-center mt-4`}
      >
        {isEdit ? (
          <select
            value={taskDets.priority}
            className="w-full mt-2 border rounded-xl p-3 outline-none"
            onChange={(e) =>
              setTaskDets({ ...taskDets, priority: e.target.value })
            }
          >
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        ) : (
          <span className="text-xs px-3 py-1 rounded-full bg-red-100 text-red-600">
            {priority}
          </span>
        )}

        <div className={`flex gap-2 z-5 ${isEdit && "mt-4"}`}>
          <button
            onClick={() => {
              console.log("clicked");

              setIsEdit((prev) => !prev);
            }}
            className="p-2 rounded hover:bg-gray-100"
          >
            {isEdit ? (
              <X className="bg-red-500 text-white rounded-full" />
            ) : (
              <Pencil size={16} />
            )}
          </button>
          {isEdit && (
            <>
              <button
                className="bg-blue-400 rounded-xl px-3"
                onClick={() => {
                  updateTaskHandler(_id, taskDets);
                  setIsEdit(false);
                }}
              >
                Save
              </button>
            </>
          )}
          <button
            onClick={() => deleteTaskHandler(_id)}
            className="p-2 rounded hover:bg-gray-100 text-red-500"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
