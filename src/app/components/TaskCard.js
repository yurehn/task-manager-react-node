import { useEffect, useState } from "react";

const TaskCard = () => {
    const [tasks, setTasks] = useState([]);

   
    useEffect(() => {
        fetch('/api/tasks')
            .then(response => response.json())
            .then(data => {
                setTasks(data);
                console.log(data);
            })
            .catch(error => {

                console.error(error);
            });
    }, [])
    
    const [isOpen, setIsOpen] = useState(false);

    function handleButtonClick() {
        setIsOpen(!isOpen);
    }

    return (
        <div>
            <h2 className="uppercase mt-9 text-xl text-gray-700 font-semibold text-center">Tasks</h2>
            <div className=" py-8 sm:py-12">
                <div className="flex flex-wrap justify-center gap-y-5 gap-x-5">
                    {
                        tasks.map((task) => {
                            
                            return (
                                <div key={task._id} id={`task-card-${task._id}`} className="pt-5 pr-5 pl-5 pb-3 max-h-48 h-auto w-56 max-w-sm bg-gray-100 rounded-lg shadow-md relative">
                                    <div className="group absolute top-0 right-0 mt-2 mr-2">
                                        <svg className="w-4 h-4 text-gray-500 hover:text-black" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                                        </svg>
                                        <div className="hidden group-hover:block z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-32 absolute right-0 mt-0">
                                            <button className="block w-full text-left px-4 py-2 hover:text-violet-700" >
                                                Delete
                                            </button>
                                            <button className="block w-full text-left px-4 py-2 hover:text-violet-700" >
                                                Update
                                            </button>
                                        </div>
                                    </div>
                                    <h3 className="uppercase tracking-wide text-20 text-gray-700 font-semibold">
                                        {task.title}
                                        <span className="text-sm font-medium text-gray-500 ml-2">
                                            [{task.priority}]
                                        </span>
                                    </h3>
                                    <p className="mt-3 px-4 pb-2 group-hover:pb-0 text-gray-500 text-base">
                                        {task.description}
                                    </p>

                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
  )
}

export default TaskCard
