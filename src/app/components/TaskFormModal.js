import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const TaskFormModal = ({ setShowModal, fetchTasks, task=null }) => {

  const defaultValues = {
    title: "",
    priority: "High",
    description: ""
  }

  const [values, setValues] = useState(task ? task : defaultValues);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };


  const toastOptions = {
      position: "bottom-left",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark"
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    const { title, priority, description } = event.target;
    const apiUrl = task ? `/api/tasks/${task._id}` : '/api/tasks/';

    const options = {
      method: task ? 'PUT': 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: title.value,
        priority: priority.value,
        description: description.value
      })
    };

    fetch(apiUrl, options)
      .then(response => response.json())
      .then(data => {
        toast.success(data.message, toastOptions)

        setValues(defaultValues);
        fetchTasks();
      })
      .catch(error => {
        toast.error('The task could not be saved', toastOptions)
        console.error(error);
      });
  }

  return (
    <>
      <div className="flex justify-center items-center fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="rounded-lg bg-white shadow-xl py-4 px-6">
          {/* Header */}
          <div className="relative text-2xl font-semibold w-full mb-7">
            <button className="absolute top-0 right-0 leading-none" onClick={() => setShowModal(false)}>
              <i className="fa-solid fa-xmark"></i>
            </button>
            <h2 className="mr-10">Add Task</h2>
          </div>

          {/* Body */}
          <div>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-2 gap-6">
                <div className="col-span-2 sm:col-span-1">
                  <label htmlFor="title" className="block text-base font-medium leading-5 text-gray-900">Title*</label>
                  <input value={values.title} onChange={handleChange} autoFocus type="text" name="title" id="title" autoComplete="title" required className="mt-2 block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:outline-none focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label htmlFor="priority" className="block text-base font-medium leading-5 text-gray-900">Priority*</label>
                  <select value={values.priority} onChange={handleChange} id="priority" name="priority" autoComplete="priority-type" required className="mt-2 block w-1/2 rounded-md border-0 bg-white py-1.5 px-1 stext-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:outline-none focus:ring-indigo-600 sm:text-sm sm:leading-6">
                    <option>High</option>
                    <option>Medium</option>
                    <option>Low</option>
                  </select>
                </div>
                <div className="col-span-2">
                  <label htmlFor="description" className="block text-base font-semibold leading-5 text-gray-900">Description*</label>
                  <textarea value={values.description} onChange={handleChange}  name="description" id="description" rows="4" required className="mt-2 block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:outline-none focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                </div>
              </div>
              
              {/* Body - button */}
              <div className="bg-gray-50 text-right w-full mt-7">
                <button type="submit" className="w-1/2 rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-gray-500 "></div>
      <ToastContainer />
    </>
  )
}

export default TaskFormModal;
