import { useContext } from "react";
import { ProjectsContext } from "../../../contexts/ProjectsContext";
import { useNavigate } from "react-router-dom";

import PageTitle from "../../../shared/components/widgets/PageTitle";

import '../../../styles/layouts/projects.scss';
import ProjectCard from "../components/ProjectCard";

export default function ProjectsPage(){
  const { projects } = useContext(ProjectsContext);
  const navigate = useNavigate();

  return (
    <>
      <PageTitle title="My Projects" />
      <section className="projects">
        <div className="container">
          <div className="projects__inner">
            { projects.length > 0 ?
              <div className="projects__items">
                {projects.map((project, i) => (
                  <ProjectCard key={project.id} project={project}/>
                ))}
              </div> 
              : <p className="projects__none">You have no projects yet</p>
            }
            <button className="projects__btn btn" onClick={() => navigate('/projects/new')}>
              {projects.length ? 'New Project' : 'Add Your First Project' }
            </button>
          </div>
        </div>
      </section>
    </>
  )
}