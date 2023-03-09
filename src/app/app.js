import { useState, useEffect } from "react";
import TaskCard from "./components/TaskCard";
import TaskFormModal from "./components/TaskFormModal";


const App = () => {

  const [showModal, setShowModal] = useState(false);
  const [tasks, setTasks] = useState([]);

  const fetchTasks = () => {
    fetch('/api/tasks')
      .then(response => response.json())
      .then(data => {
        setTasks(data);
        console.log(data);
      })
      .catch(error => {
        console.error(error);
      });
  }

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <>
      <div className="mx-auto mt-16 h-full w-4/5">
        <div className="flex flex-row justify-center items-center mb-16">
          <h1 className="uppercase text-3xl text-gray-700 font-semibold mr-4">Tasks</h1>
          <button
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-normal py-[2px] px-2 rounded"
            onClick={() => {setShowModal(true)}}
          >
            <i className="fa-solid fa-plus"></i>
          </button>
        </div>
        <TaskCard tasks={tasks} fetchTasks={fetchTasks} />
      </div>
      {
        showModal && <TaskFormModal setShowModal={setShowModal} fetchTasks={fetchTasks}/>
      }
    </>
  );
}

export default App;
