import StudentList from "./components/StudentList";
import "./App.css";
import { Toaster } from "./components/ui/sonner";
import { SignedIn, SignedOut, SignIn, UserButton } from "@clerk/clerk-react";

function App() {
  return (
    <div className="min-h-screen bg-red-300">
      <SignedOut>
        <div className="flex items-center justify-center min-h-screen">
          <SignIn />
        </div>
      </SignedOut>

      <SignedIn>
        <div className="flex justify-end p-4">
          <UserButton />
        </div>

        <StudentList />
        <Toaster />
      </SignedIn>
    </div>
  );
}

export default App;