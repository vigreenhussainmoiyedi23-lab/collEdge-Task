import { useEffect } from "react";
import { useTask } from "../hook/useTask";
import Column from "./Column";

const KanbanBoard = () => {
  const { allTasks, loading, fetchTasks } = useTask();
  useEffect(() => {
    fetchTasks();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
      <Column
        id="toDo"
        title="To Do"
        color="bg-blue-100"
        tasks={allTasks?.toDo || []}
      />

      <Column
        id="inProgress"
        title="In Progress"
        color="bg-yellow-100"
        tasks={allTasks?.inProgress || []}
      />

      <Column
        id="completed"
        title="Completed"
        color="bg-green-100"
        tasks={allTasks?.completed || []}
      />
    </div>
  );
};

export default KanbanBoard;
