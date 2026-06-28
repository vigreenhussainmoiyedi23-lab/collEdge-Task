import { createContext, useState } from "react";

export const TaskContext = createContext();

const TaskContextProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [allTasks, setAllTasks] = useState([]);
  return (
    <TaskContext.Provider
      value={{
        loading,
        setLoading,
        allTasks,
        setAllTasks,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export default TaskContextProvider;
