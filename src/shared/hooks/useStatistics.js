import { useContext, useEffect, useMemo } from "react";
import { ProjectsContext } from "../../contexts/ProjectsContext";
import { TasksContext } from "../../contexts/TasksContext";

export default function useStatistics(){
  const { projects } = useContext(ProjectsContext);
  const { tasks } = useContext(TasksContext);

  const activeProjects = projects.filter((project) => project.status === 'active');
  const activeTasks = tasks.filter((task) => task.status === 'To Do' || task.status === 'In Progress');
  const completedTasks = tasks.filter((task) => task.status === 'Done');

  return { activeProjects, activeTasks, completedTasks };
}