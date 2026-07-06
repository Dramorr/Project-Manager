import { useNavigate, useParams } from "react-router-dom";
import { useContext, useState } from "react";
import { ProjectsContext } from "../../../contexts/ProjectsContext";
import PageTitle from "../../../shared/components/widgets/PageTitle";
import Input from "../../../shared/components/shared/Input";
import '../../../styles/layouts/project-edit.scss';
import Select from "../../../shared/components/shared/Select";

export default function ProjectEditPage(){
  const { projects, updateProject, removeProject } = useContext(ProjectsContext);

  const urlParams = useParams();
  const project = projects.find((item) => item.id === urlParams.id);

  const [name, setName] = useState(project?.name || '');
  const [description, setDescription] = useState(project?.description);

  const navigate = useNavigate();

  const handleSave = () => {
    updateProject({...project, name, description});
  }
  const handleDelete = () => {
    removeProject(project);
    navigate('/');
  }

  return (
    <>
      <PageTitle title={project.name} />
      <section className="project-edit">
        <div className="container">
          <div className="project-edit__inner">
            <div className="project-edit__info">
              <Input
                placeholder="Project Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <Input
                type="textarea"
                placeholder="Project Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />

              <button
                className="project-edit__btn btn"
                onClick={handleSave}
                style={{'--icon': 'url("/Project-Manager/save.svg")'}}
              >Save Project</button>
              <button
                className="project-edit__btn btn"
                onClick={handleDelete}
                style={{'--icon': 'url("/Project-Manager/trash.svg")'}}
              >Delete Project</button>
            </div>
            <div className="project-edit__tasks">
              <div className="project-edit__tasks-header">
                <Select
                  className="project-edit__tasks-filter"
                  options={['All', 'To Do', 'In Progress', 'Done']}
                  onChange={(value) => {console.log(value)}}
                />
                <Select
                  className="project-edit__tasks-filter"
                  options={['All', 'Low', 'Medium', 'High']}
                  onChange={(value) => {console.log(value)}}
                />
                <button className="project-edit__tasks-btn btn">+</button>
              </div>
              <div className="project-edit__tasks-items">
                tasks...
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}