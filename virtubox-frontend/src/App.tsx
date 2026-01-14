import StudentList from "./components/StudentList";
import "./App.css";
import { Toaster } from "./components/ui/sonner";

function App() {
    return (
        <div className="min-h-screen bg-gray-100">
            <StudentList />
            <Toaster />
        </div>
    );
}
export default App