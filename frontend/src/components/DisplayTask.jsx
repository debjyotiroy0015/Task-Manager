// eslint-disable-next-line no-unused-vars
import React from "react";
import {useSelector} from "react-redux"
import TaskCard from "./TaskCard";
const DisplayTask = () => {
  const tasks = useSelector((state)=>state.tasks)
  return (
    <div className="w-full p-5 flex flex-col flex-wrap gap-5 items-center sm:justify-start sm:flex-row">
      {
        tasks.map((task)=>(
          <TaskCard task={task} key={task.id}/>
        ))
      }
    </div>
  );
};

export default DisplayTask;
