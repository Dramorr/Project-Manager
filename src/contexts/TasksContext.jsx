import { createContext } from "react";
import { Outlet } from 'react-router-dom';
import useLocalStorage from "../shared/hooks/useLocalStorage";

export const TasksContext = createContext(null);
export function TasksProvider(){
  const {items: tasks, setItems: setTasks } = useLocalStorage('tasks', []);
  const STATUSES = ['To Do', 'In Progress', 'Done'];
  const PRIORITIES = ['Low', 'Medium', 'High'];

  const addTask = (newTask) => {
    if(!newTask) return;
    if(tasks.find(item => item.id === newTask.id)) return;

    setTasks([...tasks, newTask]);
  }
  const updateTask = (updatedTask) => {
    if(!updatedTask) return;
    setTasks(tasks.map(item => item.id === updatedTask.id ? updatedTask : item));
  }
  const removeTask = (task) => {
    if(!task) return;
    setTasks(tasks.filter(item => item.id !== task.id));
  }

  return(
    <TasksContext.Provider value={{tasks, addTask, updateTask, removeTask, STATUSES, PRIORITIES}}>
      <Outlet />
    </TasksContext.Provider>
  )
}