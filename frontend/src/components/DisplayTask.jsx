// eslint-disable-next-line no-unused-vars
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import TaskCard from "./TaskCard";

const DisplayTask = ({ setHeight }) => {
  const allTasks = useSelector((state) => state.tasks);
  const [tasks, setTasks] = useState([]);
  const [taskStatus, setTaskStatus] = useState("ALL"); // Default selected is "ALL"

  useEffect(() => {
    if (taskStatus === "ALL") {
      const filteredTasks = allTasks.filter((item) => item.deleted === "present");
      setTasks(filteredTasks);
    } else {
      const filteredTasks = allTasks.filter((item) => item.priority === taskStatus && item.deleted === "present");
      setTasks(filteredTasks);
    }
  }, [taskStatus, allTasks]);

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

  return (
    <div>
      <div className="taskPriorities flex p-5 justify-center sm:justify-start" ref={taskFormRef}>
        {['All', 'High', 'Medium', 'Low'].map((priority) => (
          <div 
            key={priority}
            className={`p-2 border-solid border-slate-900 border-2 w-[80px] text-center cursor-pointer hover:bg-slate-400 
              ${taskStatus === priority ? 'bg-slate-900 text-white' : ''}`} 
            onClick={() => setTaskStatus(priority)}
          >
            {priority}
          </div>
        ))}
      </div>
      {tasks.length>0?
      (<div className="w-full p-5 flex flex-col flex-wrap gap-5 items-center sm:justify-start sm:flex-row">
        {tasks.map((task) => (
          <TaskCard task={task} key={task.id} />
        ))}
      </div>):
      (<div className="flex flex-col gap-3 justify-center items-center">
        <img src="src/assets/no-results.png" width="200px" />
        <span className="font-medium">No Results Found</span>
      </div>)
      }
    </div>
  );
};

export default DisplayTask;
