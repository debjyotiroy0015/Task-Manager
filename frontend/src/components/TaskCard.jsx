// eslint-disable-next-line react/prop-types
import { useNavigate } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
const TaskCard = ({task}) =>{
  const navigate = useNavigate();
  const calculateTimeRemaining = (startDate, dueDate) => {
    const now = new Date();
    const due = new Date(dueDate);
    
    // If startDate and dueDate are the same, calculate until 11:59 PM
    if (new Date(startDate).toDateString() === new Date(dueDate).toDateString()) {
      due.setHours(23, 59, 59, 999);
    }

    const diffInMs = due - now;

    if (diffInMs <= 0) {
      return "Overdue";
    }

    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
    const diffInHours = Math.floor((diffInMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const diffInMinutes = Math.floor((diffInMs % (1000 * 60 * 60)) / (1000 * 60));

    if (diffInDays > 0) {
      return `${diffInDays}d ${diffInHours}h remaining`;
    }
    return `${diffInHours}h ${diffInMinutes}m remaining`;
  };
  const allTasks = useSelector((state)=>state.tasks)
  const dispatch = useDispatch()
  const handleDelete = ()=>{
    if(window.confirm("Do you want to delete this task ?")){
    const deletedTask = allTasks.filter((t) =>  t.id === task.id);
    deletedTask[0].deleted = "deleted"
    dispatch({type:"delete",payload:deletedTask})
    console.log(deletedTask)
    }
  }
return(
  <>
  {task.deleted ==="present" &&
    (<div className="card-container w-[80%] sm:w-[250px] h-[250px] rounded-md shadow-xl bg-slate-100 hover:bg-slate-300">
        <div className="card-content flex flex-col justify-between p-2 h-full gap-2">
          <div className="task-name font-medium h-[10%] overflow-hidden text-ellipsis whitespace-nowrap hover:underline cursor-pointer" title={task.name}  onClick={()=>navigate(`task/${task.id}`)}>
            {task.name}
          </div>
          <div className="task-status-delete-task h-[5%] text-sm font-extralight flex items-center justify-between">
            <div className="status flex gap-2 items-center">
              <div className={`task-status-color h-[10px] w-[10px] ${task.taskCompleted==="Active"?"bg-yellow-400":task.taskCompleted==="Completed"?"bg-green-400":"bg-slate-600"} rounded-lg`}></div>
              <div className="task-status-type">{task.taskCompleted}</div>
            </div>
            <div className="delete-task cursor-pointer" onClick={handleDelete}><FontAwesomeIcon icon={faTrash} color="#ff0000"/></div>
          </div>
        <div className="description h-[60%] text-sm overflow-hidden text-ellipsis line-clamp-[7]" title={task.description}>
           {task.description}
        </div>
        <div className="card-footer flex justify-between items-center h-[10%] text-xs">
          <div className={`task-priority font-bold ${task.priority==="Low"?"text-green-400":task.priority==="Medium"?"text-yellow-400":"text-red-400"}`}>{task.priority}</div>
          <div className="time-remaining text-gray-500">{calculateTimeRemaining(task.startDate,task.dueDate)}</div>
        </div>
      </div>
    </div>)
  }
  </>
)
}
export default TaskCard