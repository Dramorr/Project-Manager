import { useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ProjectsContext } from "../../../contexts/ProjectsContext";
import Input from "../../../shared/components/shared/Input";

import '../../../styles/layouts/project-new.scss';

export default function ProjectNewPage(){
  const name = useRef(null);
  const description = useRef(null);
  
  const { addProject } = useContext(ProjectsContext);
  const navigate = useNavigate();

  const validate = (input) => {
    if(input.value === ''){
      input.classList.add('invalid');
      setTimeout(() => {
        input.classList.remove('invalid');
      }, 600);
      return false;
    }
    return true;
  }
  const handleClick = () => {
    let validated = true;
    if(!validate(name.current)) validated = false;
    if(!validate(description.current)) validated = false;

    if(!validated) return;

    const id = crypto.randomUUID();
    addProject({
      id: id,
      name: name.current.value,
      description: description.current.value,
      createdAt: (new Date()).toLocaleDateString(),
      status: 'Active',
      favorite: false,
    });
    navigate(`/projects/${id}/edit`);
  }

  return (
    <>
      <section className="project-new">
        <div className="container">
          <div className="project-new__inner">
            <h1 className="project-new__title">Create New Project</h1>

            <Input
              className="input"
              placeholder="Project Name"
              ref={name}
            />
            <Input
              type="textarea"
              className="input"
              placeholder="Description"
              ref={description}
            />

            <button className="project-new__btn btn" onClick={handleClick}>Create</button>
          </div>
        </div>
      </section>
    </>
  )
}