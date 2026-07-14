import { Link } from 'react-router-dom';
import '../../../styles/components/_project-card.scss';
import { useContext } from 'react';
import { TasksContext } from '../../../contexts/TasksContext';
import { ProjectsContext } from '../../../contexts/ProjectsContext';

export default function ProjectCard({project}){
  const { updateProject } = useContext(ProjectsContext);
  const { tasks } = useContext(TasksContext);

  const getProgress = () => {
    const currentTasks = tasks.filter(task => task.projectId === project.id);
    const unfinishedTasks = currentTasks.filter(task => task.status !== 'Done');
    
    if(unfinishedTasks.length){
      return `${Math.round((100 / currentTasks.length) * (currentTasks.length - unfinishedTasks.length))}%`;
    }else return '100%';
  }

  const toggleFavorite = (e) => {
    e.preventDefault();

    updateProject({...project, favorite: ('favorite' in project) ? !project.favorite : true})
  }

  return (
    <Link className={`project-card ${project.favorite ? 'project-card--favorite' : ''}`} to={`/projects/${project.id}/edit`}>
      <button className="project-card__favorite-toggle" onClick={toggleFavorite}>
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2 9.1371C2 14 6.01943 16.5914 8.96173 18.9109C10 19.7294 11 20.5 12 20.5C13 20.5 14 19.7294 15.0383 18.9109C17.9806 16.5914 22 14 22 9.1371C22 4.27416 16.4998 0.825464 12 5.50063C7.50016 0.825464 2 4.27416 2 9.1371Z"/></svg>
      </button>
      
      <h2 className="project-card__name">{project.name}</h2>
      <div className="project-card__description">{project.description}</div>

      <div className="project-card__info">
        {/* <p className="project-card__createdAt">{project.createdAt}</p> */}
        <p className="project-card__progress-value">{getProgress()}</p>
        <div className="project-card__progressBar" style={{'--progress': getProgress()}}></div>
        <p className="project-card__status" data-status={project.status}>{project.status}</p>
      </div>

    </Link>
  )
}