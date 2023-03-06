import TaskCard from "./components/TaskCard";
import TaskForm from "./components/TaskForm";

const App = () => {
    return (
        <div className="flex flex-col mx-8 md:flex-row ">
            <div className="flex items-center justify-center h-screen md:w-1/2">
                <TaskForm />
            </div>
            <div className=" md:w-1/2">
                <TaskCard />
            </div>
        </div>
    );
}

export default App;
