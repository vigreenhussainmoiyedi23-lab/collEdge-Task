import { createContext, useState } from "react";

export const TaskContext = createContext();

const TaskContextProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [allTasks, setAllTasks] = useState([]);
  const [activeTask, setActiveTask] = useState(null);
  return (
    <TaskContext.Provider
      value={{
        loading,
        setLoading,
        allTasks,
        setAllTasks,
        activeTask,
        setActiveTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export default TaskContextProvider;
