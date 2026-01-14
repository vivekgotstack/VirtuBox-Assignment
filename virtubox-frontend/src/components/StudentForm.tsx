import { useState } from "react";
import { createStudent } from "../api/studentApi";
import { toast } from "sonner";
import { getRandomStudent } from "@/api/randomUserApi";
import { Spinner } from "./ui/spinner";
import { Button } from "./ui/button";

type Props = {
    onStudentCreated: () => void;
};

function StudentForm({ onStudentCreated }: Props) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [age, setAge] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!name.trim() || !email.trim()) {
            toast.warning("Name and Email are required");
            return;
        }

        try {
            setLoading(true);

            await createStudent({
                name,
                email,
                age: Number(age),
            });

            toast.success("Student added successfully");
            setName("");
            setEmail("");
            setAge("");
            onStudentCreated();

        } catch (error: any) {
            if (error.response?.status === 409 || error.response?.status === 500) {
                toast.error("Student with this email already exists");
            } else {
                toast.error("Something went wrong. Try again.");
            }
        } finally {
            setLoading(false);
        }
    };

    const fillRandomStudent = async () => {
        try {
            setLoading(true)
            const student = await getRandomStudent()

            setName(student.name)
            setEmail(student.email)
            setAge(String(student.age))

            toast.success("Random student generated")
        } catch {
            toast.error("Failed to generate student")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="border-4 border-black bg-yellow-300 p-6 mb-10 shadow-[6px_6px_0_0_#000]">
            <h2 className="text-2xl font-black mb-6">ADD STUDENT</h2>

            <form className="space-y-4" onSubmit={handleSubmit}>
                <input
                    className="w-full border-4 border-black px-4 py-3 font-semibold focus:outline-none"
                    placeholder="NAME"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <input
                    className="w-full border-4 border-black px-4 py-3 font-semibold focus:outline-none"
                    placeholder="EMAIL"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type="number"
                    className="w-full border-4 border-black px-4 py-3 font-semibold focus:outline-none"
                    placeholder="AGE"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                />

                <button
                    disabled={loading}
                    className="w-full border-4 border-black bg-white px-6 py-3 font-black shadow-[4px_4px_0_0_#000] active:translate-x-1 active:translate-y-1 active:shadow-none disabled:opacity-50"
                >
                    {loading ?
                        (<Button disabled variant={"ghost"} className="text-lg">
                            <Spinner/>
                            Loading...
                        </Button>)
                        : "ADD"}
                </button>

                <button
                    type="button"
                    onClick={fillRandomStudent}
                    disabled={loading}
                    className="w-full border-4 border-black bg-blue-300 px-6 py-3 font-black shadow-[4px_4px_0_0_#000]
                        active:translate-x-1 active:translate-y-1 active:shadow-none disabled:opacity-50"
                >
                    GENERATE RANDOM STUDENT
                </button>
            </form>
        </div>
    );
}

export default StudentForm;