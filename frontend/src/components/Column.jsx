import DropZone from "./DropZone";
import TaskCard from "./TadkCard";

const Column = ({ id, title, color, tasks }) => {
  return (
    <div className="rounded-2xl bg-white shadow-lg overflow-hidden">
      <div className={`${color} px-5 py-4`}>
        <h2 className="font-bold text-lg">{title}</h2>
      </div>

      <div className="p-5 min-h-[500px] bg-slate-50">
        {tasks.map((task, idx) => (
          <>
            <DropZone idx={idx} status={id} />
            <TaskCard key={task._id} task={task} coloumn={title} index={idx} />
          </>
        ))}
        {tasks.length === 0 && (
          <>
            <p className="text-center text-gray-500">No tasks yet</p>
            <DropZone idx={0} status={id} />
          </>
        )}
        {tasks.length > 0 && <DropZone idx={tasks.length} status={id} />}
      </div>
    </div>
  );
};

export default Column;
