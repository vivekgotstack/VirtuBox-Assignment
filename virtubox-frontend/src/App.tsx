import StudentList from "./components/StudentList";
import "./App.css";
import { Toaster } from "./components/ui/sonner";
import { SignedIn, SignedOut, SignIn, UserButton } from "@clerk/clerk-react";
import { SparklesText } from "./components/ui/sparkles-text";

function App() {
  return (
    <div className="min-h-screen bg-red-300">
      <SignedOut>
        <div className="flex items-center justify-center min-h-screen">
          <SignIn />
        </div>
      </SignedOut>

      <SignedIn>
        <div className="flex items-center justify-between p-4">
          <div className="text-center font-semibold">
            <SparklesText>VIRTUBOX ASSIGNMENT</SparklesText>
          </div>
          <UserButton />
        </div>

        <StudentList />
        <Toaster />
      </SignedIn>
    </div>
  );
}

export default App;