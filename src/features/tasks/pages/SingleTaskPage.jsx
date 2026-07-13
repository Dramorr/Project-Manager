import { useContext, useEffect, useRef } from "react";
import { ProjectsContext } from "../../../contexts/ProjectsContext";
import { useNavigate, useParams } from "react-router-dom";

import PageTitle from "../../../shared/components/widgets/PageTitle";
import Select from "../../../shared/components/shared/Select";
import Input from "../../../shared/components/shared/Input";

import '../../../styles/layouts/task-new.scss';
import { TasksContext } from "../../../contexts/TasksContext";

export default function TaskNewPage(){
  const { projects } = useContext(ProjectsContext);
  const { tasks, addTask, updateTask, STATUSES, PRIORITIES } = useContext(TasksContext);
  const navigate = useNavigate();

  const urlParams = useParams();
  const project = projects.find((item) => item.id === urlParams.id);
  const taskID = urlParams.taskID;
  const task = tasks.find(task => task.id === taskID);

  const name        = useRef(null);
  const status      = useRef(null);
  const priority    = useRef(null);
  const description = useRef(null);

  const handleClick = () => {
    if(task){
      updateTask({
        ...task,
        name: name.current.value,
        description: description.current.value,
        status: status.current.value,
        priority: priority.current.value 
      });
    }else{
      addTask({
        id: taskID,
        projectId: project.id,
        title: name.current.value,
        description: description.current.value,
        status: status.current.value,
        priority: priority.current.value,
        dueDate: 'undefined',
        createdAt: (new Date()).toLocaleDateString(),
      });
    }
    navigate(`/projects/${project.id}/edit`);
  }

  useEffect(() => {
    status.current.value = task ? task.status : STATUSES[0];
    priority.current.value = task ? task.priority : PRIORITIES[0];
    name.current.value = task ? task.title : '';
    description.current.value = task ? task.description : '';
  }, []);

  // handle enter button click
  useEffect(() => {
    const handleEnter = (e) => {
      if(e.key === 'Enter') handleClick();
    }
    document.addEventListener('keydown', handleEnter);
    return () => document.removeEventListener('keydown', handleEnter);
  }, []);

  return (
    <>
      <PageTitle title={project.name} />

      <section className="task-new">
        <div className="container">
          <div className="task-new__inner">
            <h1 className="task-new__title">{task ? task.title : 'New Task!'}</h1>

            <div className="task-new__form">
              <div className="task-new__form-col-primary">
                <Input
                  className="input"
                  placeholder="task Name"
                  ref={name}
                />
                <Input
                  type="textarea"
                  className="input"
                  placeholder="Description"
                  ref={description}
                />
              </div>
              <div className="task-new__form-col-secondary">
                <div className="task-new__select-wrapper">
                  <span>Status:</span>
                  <Select
                    className="task-edit__select task-edit__status"
                    ref={status}
                    options={STATUSES}
                    initialValue={task ? task.status : STATUSES[0]}
                  />
                </div>
                <div className="task-new__select-wrapper">
                  <span>Priority:</span>
                  <Select
                    className="task-edit__select task-edit__priority"
                    ref={priority}
                    options={PRIORITIES}
                    initialValue={task ? task.priority : PRIORITIES[0]}
                  />
                </div>
                <button className="task-new__btn btn" onClick={handleClick}>{task ? 'Save' : 'Create'}</button>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  )
}