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
            <TaskCard key={task._id} {...task} coloumn={title} index={idx} />
            <DropZone idx={idx} status={title}/>
          </>
        ))}
      </div>
    </div>
  );
};

export default Column;
