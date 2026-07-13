import { useContext } from 'react';
import '../../../styles/components/_task-card.scss';
import { TasksContext } from '../../../contexts/TasksContext';
import { useNavigate } from 'react-router-dom';
import { useConfirm } from "../../../contexts/Confirm";

export default function TaskCard({task}){
  const { removeTask } = useContext(TasksContext);
  const navigate = useNavigate();

  const confirmation = useConfirm();
  const handleDelete = async () => {
    const confirm = await confirmation(`Delete Task?`);
    if(!confirm) return;

    removeTask(task);
  }

  return (
    <div className="task-card">
      <div className="task-card__head">
        <p className="task-card__title">{task.title}</p>

        <button
          className="task-card__inst-btn task-card__edit"
          style={{'--icon': 'url("/Project-Manager/edit.svg")'}}
          onClick={() => navigate(`/projects/${task.projectId}/tasks/${task.id}`)}
        ></button>
        <button
          className="task-card__inst-btn task-card__delete"
          style={{'--icon': 'url("/Project-Manager/trash.svg")'}}
          onClick={handleDelete}
        ></button>
      </div>
      <div className="task-card__body">
        <div className="task-card__description">{task.description}</div>

        <div className="task-card__bottom">
          <p className="task-card__priority" data-priority={task.priority}>Priority: <span>{task.priority}</span></p>
          <p className="task-card__status" data-status={task.status}>Status: <span>{task.status}</span></p>
          <p className="task-card__createdAt">{task.createdAt}</p>
        </div>
      </div>
    </div>
  );
}