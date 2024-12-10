import { useEffect, useState,useRef } from "react";
import { useSelector,useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const Task = ({setHeight}) =>{
    let params = useParams()
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const taskFormRef = useRef(null);
    useEffect(() => {
    const updateHeight = () => {
      if (taskFormRef.current) {
        setHeight(taskFormRef.current.offsetHeight);
      }
    };

    updateHeight();
    window.addEventListener("resize", updateHeight);

    return () => {
      window.removeEventListener("resize", updateHeight);
    };
  }, [setHeight]);
    const [task,setTask] = useState([])
    const allTasks = useSelector((state)=>state.tasks)
    useEffect(() => {
        const foundTask = allTasks.filter((task) =>  task.id.toString() === params.id);
        if (foundTask) {
            setTask(foundTask);
        }
    }, [params.id, allTasks]);
      const handleSave = () => {
    if (taskFormRef.current) {
      const formData = new FormData(taskFormRef.current);
      const data = {
        id:task[0].id,
        name: formData.get("firstname"),
        description: formData.get("description"),
        priority: formData.get("priority"),
        startDate: formData.get("startDate"),
        dueDate: formData.get("dueDate"),
        taskCompleted: formData.get("task-completed"),
        deleted:"present",
      };

      // Validate mandatory fields
      for (const [key, value] of Object.entries(data)) {
        if (!value) {
          alert(`Please fill out the ${key} field.`);
          return;
        }
      }
      dispatch({type:"save",payload:data})
      navigate("/")
    }
  };
return(
    <>
        {task.length>0?
      (<form
        ref={taskFormRef}
        className="w-full p-4 rounded-md flex gap-4 flex-col"
      >
        <label
          htmlFor="fname"
          className="block text-sm font-medium text-slate-900 mb-2"
        >
          Name
        </label>
        <input
          defaultValue={task[0].name}
          type="text"
          id="fname"
          name="firstname"
          placeholder="Task name"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-slate-900"
        />

        <label
          htmlFor="description"
          className="block text-sm font-medium text-slate-900 mb-2"
        >
          Description
        </label>
        <textarea
          defaultValue={task[0].description}
          id="description"
          name="description"
          rows="4"
          placeholder="Task description"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-slate-900 resize-none"
        />

        <label
          htmlFor="priority"
          className="block text-sm font-medium text-slate-900 mb-2"
        >
          Select Priority
        </label>
        <div className="flex gap-4">
          <label className="flex items-center gap-2 text-slate-900">
            <input
              type="radio"
              name="priority"
              value="Low"
              className="w-4 h-4 accent-slate-900"
              defaultChecked={task[0].priority==="Low"?true:false}
            />
            Low
          </label>
          <label className="flex items-center gap-2 text-slate-900">
            <input
              type="radio"
              name="priority"
              value="Medium"
              className="w-4 h-4 accent-slate-900"
              defaultChecked={task[0].priority==="Medium"?true:false}
            />
            Medium
          </label>
          <label className="flex items-center gap-2 text-slate-900">
            <input
              type="radio"
              name="priority"
              value="High"
              className="w-4 h-4 accent-slate-900"
              defaultChecked={task[0].priority==="High"?true:false}
            />
            High
          </label>
        </div>

        <label htmlFor="start-end-date" className="flex justify-between w-full">
          <div className="start-date flex flex-col gap-2 w-[45%]">
            <label
              htmlFor="startDate"
              className="block text-sm font-medium text-slate-900 mb-2"
            >
              Start Date
            </label>
            <input
              defaultValue={task[0].startDate}
              type="date"
              id="startDate"
              name="startDate"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-slate-900"
            />
          </div>
          <div className="end-date flex flex-col gap-2 w-[45%]">
            <label
              htmlFor="dueDate"
              className="block text-sm font-medium text-slate-900 mb-2"
            >
              Due Date
            </label>
            <input
              defaultValue={task[0].dueDate}
              type="date"
              id="dueDate"
              name="dueDate"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-slate-900"
            />
          </div>
        </label>

        <label
          htmlFor="task-completed"
          className="block text-sm font-medium text-slate-900 mb-2"
        >
          Task Status
        </label>
        <div className="flex gap-4">
          <label className="flex items-center gap-2 text-slate-900">
            <input
              type="radio"
              name="task-completed"
              value="Inactive"
              className="w-4 h-4 accent-slate-900"
              defaultChecked={task[0].taskCompleted==="Inactive"?true:false}
            />
            Inactive
          </label>
          <label className="flex items-center gap-2 text-slate-900">
            <input
              type="radio"
              name="task-completed"
              value="Active"
              className="w-4 h-4 accent-slate-900"
              defaultChecked={task[0].taskCompleted==="Active"?true:false}
            />
            Active
          </label>
          <label className="flex items-center gap-2 text-slate-900">
            <input
              type="radio"
              name="task-completed"
              value="Completed"
              className="w-4 h-4 accent-slate-900"
              defaultChecked={task[0].taskCompleted==="Completed"?true:false}
            />
            Completed
          </label>
        </div>

        <div className="flex gap-4 mt-4 flex-row-reverse">
          <button
            type="button"
            onClick={handleSave}
            className="px-6 py-2 bg-slate-900 text-white font-medium rounded-md hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-900"
          >
            Save
          </button>
          <button
            type="button"
            onClick={()=>navigate("/")}
            className="px-6 py-2 bg-gray-300 text-gray-700 font-medium rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            Close
          </button>
        </div>
      </form>):(
        <div>No Result Found</div>
      )}
    </>
)
}
export default Task;