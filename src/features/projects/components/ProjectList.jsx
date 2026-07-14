import { useState, useContext, useEffect } from "react";
import { ProjectsContext } from "../../../contexts/ProjectsContext";
import { useNavigate } from "react-router-dom";

import '../../../styles/layouts/projects.scss';
import ProjectCard from "../components/ProjectCard";

export default function ProjectsList({title, max, favorites}){
  const { projects } = useContext(ProjectsContext);
  let [visibleProjects, setVisibleProjects] = useState(projects);
  
  useEffect(() => {
    setVisibleProjects(favorites ? projects.filter(project => !!project.favorite) : projects);
  }, [projects]);

  const navigate = useNavigate();

  if(favorites && visibleProjects.length <= 0) return;

  return (
    <section className="projects">
      <div className="container">
        <div className="projects__inner">
          { title && <h2 className="projects__title">{title}</h2>}

          { visibleProjects.length > 0 ?
            <div className="projects__items">
              {max ?
                visibleProjects.slice(0, max).map((project, i) => <ProjectCard key={project.id} project={project}/>)
                : visibleProjects.map((project, i) => <ProjectCard key={project.id} project={project}/>)
              }
            </div> 
            : <p className="projects__none">You have no projects yet</p>
          }
          {!favorites && <button className="projects__btn btn" onClick={() => navigate('/projects/new')}>
            {visibleProjects.length ? 'New Project' : 'Add Your First Project' }
          </button>}
        </div>
      </div>
    </section>
  )
}