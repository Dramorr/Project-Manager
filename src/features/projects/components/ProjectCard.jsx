import { Link } from 'react-router-dom';
import '../../../styles/components/_project-card.scss';
import { useContext } from 'react';
import { TasksContext } from '../../../contexts/TasksContext';

export default function ProjectCard({project}){
  const { tasks } = useContext(TasksContext);

  const getProgress = () => {
    const currentTasks = tasks.filter(task => task.projectId === project.id);
    const unfinishedTasks = currentTasks.filter(task => task.status !== 'Done');
    
    if(unfinishedTasks.length){
      return `${(100 / currentTasks.length) * unfinishedTasks.length}%`;
    }else return '100%';
  }

  return (
    <Link className="project-card" to={`/projects/${project.id}/edit`}>
      
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