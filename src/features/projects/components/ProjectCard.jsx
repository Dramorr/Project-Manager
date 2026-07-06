import { Link } from 'react-router-dom';
import '../../../styles/components/_project-card.scss';

export default function ProjectCard({project}){

  return (
    <Link className="project-card" to={`/projects/${project.id}/edit`}>
      <h2 className="project-card__name">{project.name}</h2>
      <div className="project-card__description">{project.description}</div>

      <div className="project-card__info">
        <p className="project-card__status">{project.status}</p>
        <p className="project-card__createdAt">{project.createdAt}</p>
      </div>
    </Link>
  )
}