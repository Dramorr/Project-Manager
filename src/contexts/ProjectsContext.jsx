import { createContext } from "react";
import { Outlet } from 'react-router-dom';
import useLocalStorage from '../shared/hooks/useLocalStorage';

export const ProjectsContext = createContext(null);
export function ProjectsProvider(){
  const { items: projects, setItems: setProjects } = useLocalStorage('projects', []);

  const addProject = (newProject) => {
    if(!newProject) return;
    if(projects.find(item => item.id === newProject.id)) return;

    setProjects([...projects, newProject]);
  }
  const updateProject = (updatedProject) => {
    if(!updatedProject) return;
    setProjects(projects.map(item => item.id === updatedProject.id ? updatedProject : item));
  }
  const removeProject = (project) => {
    if(!project) return;
    setProjects(projects.filter(item => item.id !== project.id));
  }

  return (
    <ProjectsContext.Provider value={{projects, addProject, updateProject, removeProject}}>
      <Outlet />
    </ProjectsContext.Provider>
  )
}