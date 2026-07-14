import { useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";

import { ProjectsContext } from "../../../contexts/ProjectsContext";
import { TasksContext } from '../../../contexts/TasksContext';
import TaskCard from '../../tasks/components/TaskCard';

import PageTitle from "../../../shared/components/widgets/PageTitle";
import Input from "../../../shared/components/shared/Input";
import '../../../styles/layouts/project-edit.scss';
import Select from "../../../shared/components/shared/Select";
import { useConfirm } from "../../../contexts/Confirm";

export default function ProjectEditPage(){
  const { projects, updateProject, removeProject } = useContext(ProjectsContext);
  const { tasks, STATUSES, PRIORITIES } = useContext(TasksContext);

  const urlParams = useParams();
  const project = projects.find((item) => item.id === urlParams.id);

  const [ visibleTasks, setVisibleTasks] = useState([]);

  const [ filters, setFilters] = useState({
    status: 'All',
    priority: 'All'
  });
  const updateFilters = (key, value) => {
    if(!filters[key]) return;
    setFilters(prev => ({...prev, [key]: value}));
  }
  const applyFilters = () => {
    setVisibleTasks(tasks.filter(task => {
      const statusCheck = STATUSES.includes(filters.status) ? task.status === filters.status : true;
      const priorityCheck = PRIORITIES.includes(filters.priority) ? task.priority === filters.priority : true;
      return statusCheck && priorityCheck && task.projectId === project.id;
    }));
  }
  useEffect(applyFilters, [filters, tasks]);

  const [name, setName] = useState(project?.name || '');
  const [description, setDescription] = useState(project?.description);

  const navigate = useNavigate();
  const confirmation = useConfirm();

  const handleSave = () => {
    updateProject({...project, name, description});
  }
  const handleDelete = async () => {
    const confirm = await confirmation('Delete this Project?');
    if(!confirm) return;

    removeProject(project);
    navigate('/projects');
  }
  const handleComplete = () => {
    const status = 'Done';
    updateProject({...project, status});
    navigate('/projects');
  }

  return (
    <>
      <PageTitle title={project.name} />
      <section className="project-edit">
        <div className="container">
          <button className="project-edit__back-btn btn" onClick={() => navigate('/projects/')}>Back To Projects</button>
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

              <div className="project-edit__btns">
                <button
                  className="project-edit__btn btn"
                  onClick={handleSave}
                  style={{'--icon': 'url("/Project-Manager/save.svg")'}}
                >Save</button>
                <button
                  className="project-edit__btn btn"
                  onClick={handleDelete}
                  style={{'--icon': 'url("/Project-Manager/trash.svg")'}}
                >Delete</button>
                <button
                  className="project-edit__btn btn"
                  onClick={handleComplete}
                  style={{'--icon': 'url("/Project-Manager/save.svg")'}}
                >Complete</button>
              </div>
            </div>
            <div className="project-edit__tasks">
              <div className="project-edit__tasks-header">
                <Select
                  className="project-edit__tasks-filter"
                  options={['All', ...STATUSES]}
                  onChange={(value) => updateFilters('status', value) }
                />
                <Select
                  className="project-edit__tasks-filter"
                  options={['All', ...PRIORITIES]}
                  onChange={(value) => updateFilters('priority', value) }
                />
                <button className="project-edit__tasks-btn btn" onClick={() => navigate(`/projects/${project.id}/tasks/${crypto.randomUUID()}`)}>+</button>
              </div>
              <div className="project-edit__tasks-items">
                {visibleTasks.map(task => <TaskCard key={task.id} task={task} />)}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}