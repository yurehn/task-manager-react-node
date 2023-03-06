import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TaskForm = () => {

  const handleSubmit = (event) => {
    
    const { title, priority, description } = event.target;

    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: title.value,
        priority: priority.value,
        description: description.value
      })
    };
    
    fetch('/api/tasks', options)
      .then(response => response.json())
      .then(data => {
        toast.success(data.message, {
          position: "bottom-left",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          });
          
          title.value = '';
          priority.value = 'High';
          description.value = '';
      })
      .catch(error => {
        toast.error('The task could not be saved', {
          position: "bottom-left",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          });

        console.error(error);
      });

    
    event.preventDefault();
  }

  return (
    <div className="min-w-xl overflow-hidden shadow rounded-md">
      <form onSubmit={handleSubmit}>
        <div>
          <div className="bg-white px-4 py-5 sm:p-6">
            <div className="grid grid-cols-2 gap-6">
              
              <div className="col-span-2 sm:col-span-1">
                <label htmlFor="title" className="block text-base font-medium leading-5 text-gray-900">Title</label>
                <input type="text" name="title" id="title" autoComplete="title" required className="mt-2 block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:outline-none focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
              </div>

              <div className="col-span-2 sm:col-span-1">
                <label htmlFor="priority" className="block text-base font-medium leading-5 text-gray-900">Priority</label>
                <select id="priority" name="priority" autoComplete="priority-type" required className="mt-2 block w-1/2 rounded-md border-0 bg-white py-1.5 px-1 stext-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:outline-none focus:ring-indigo-600 sm:text-sm sm:leading-6">
                  <option>High</option>
                  <option>Medium</option>
                  <option>Low</option>
                </select>
              </div>

              <div className="col-span-2">
                <label htmlFor="description" className="block text-base font-semibold leading-5 text-gray-900">Description</label>
                <textarea name="description" id="description" rows="4" required className="mt-2 block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:outline-none focus:ring-indigo-600 sm:text-sm sm:leading-6"></textarea>
              </div>

            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
            <button type="submit" className="rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700">Save</button>
          </div>
        </div>
      </form>
      <ToastContainer/>
    </div>
  )
}

export default TaskForm;
