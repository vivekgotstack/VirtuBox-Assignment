import { deleteStudent, getAllStudents, updateStudent, type Student } from "@/api/studentApi";
import { useState, useEffect } from "react";
import StudentForm from "./StudentForm";
import { toast } from "sonner";

function StudentList() {
    const [students, setStudents] = useState<Student[]>([]);
    const [loading, setLoading] = useState(true);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [editData, setEditData] = useState({
        name: "",
        email: "",
        age: "",
    });

    useEffect(() => {
        fetchStudents();
    }, []);

    const fetchStudents = async () => {
        const response = await getAllStudents();
        setStudents(response.data);
        setLoading(false);
    };

    const handleDelete = async (id?: number) => {
        if (!id) return;
        await deleteStudent(id);
        toast.success("Deleted Successfully");
        fetchStudents();
    };

    const startEdit = (student: Student) => {
        setEditingId(student.id!);
        setEditData({
            name: student.name,
            email: student.email,
            age: String(student.age),
        });
        toast.info("Editing...");
    };

    const cancelEdit = () => {
        setEditingId(null);
        toast.info("Cancelled Editing");
    };

    const saveEdit = async (id: number) => {
        await updateStudent(id, {
            name: editData.name,
            email: editData.email,
            age: Number(editData.age),
        });
        setEditingId(null);
        toast.success("Saved Successfully");
        fetchStudents();
    };

    if (loading)
        return (
            <p className="mt-20 text-center font-black text-xl">
                LOADING…
            </p>
        );

    return (
        <div className="min-h-screen bg-red-300 p-8">
            <div className="max-w-6xl mx-auto space-y-12">
                <StudentForm onStudentCreated={fetchStudents} />

                <div className="border-4 border-black bg-white shadow-[8px_8px_0_0_#000]">
                    <div className="border-b-4 border-black bg-yellow-300 px-6 py-4">
                        <h2 className="text-2xl text-center font-black tracking-tight">
                            STUDENTS
                        </h2>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                            <thead className="bg-black text-white">
                                <tr>
                                    <th className="border-4 border-black px-4 py-3 text-left text-s font-black tracking-widest">
                                        NAME
                                    </th>
                                    <th className="border-4 border-black px-4 py-3 text-left text-s font-black tracking-widest">
                                        EMAIL
                                    </th>
                                    <th className="border-4 border-black px-4 py-3 text-left text-s font-black tracking-widest">
                                        AGE
                                    </th>
                                    <th className="border-4 border-black px-4 py-3 text-right text-s font-black tracking-widest">
                                        ACTIONS
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                {students.map((s) => (
                                    <tr key={s.id} className="odd:bg-yellow-100">
                                        {["name", "email", "age"].map((field) => (
                                            <td
                                                key={field}
                                                className="border-4 border-black px-4 py-3 font-semibold"
                                            >
                                                {editingId === s.id ? (
                                                    <input
                                                        value={(editData as any)[field]}
                                                        onChange={(e) =>
                                                            setEditData({
                                                                ...editData,
                                                                [field]: e.target.value,
                                                            })
                                                        }
                                                        className="w-full border-4 border-black bg-white px-3 py-2 font-semibold focus:outline-none"
                                                    />
                                                ) : (
                                                    (s as any)[field]
                                                )}
                                            </td>
                                        ))}

                                        <td className="border-4 border-black px-4 py-3 text-right space-x-2">
                                            {editingId === s.id ? (
                                                <>
                                                    <button
                                                        onClick={() => saveEdit(s.id!)}
                                                        className="border-4 border-black bg-green-400 px-4 py-1.5 font-black shadow-[3px_3px_0_0_#000] active:translate-x-1 active:translate-y-1 active:shadow-none"
                                                    >
                                                        SAVE
                                                    </button>
                                                    <button
                                                        onClick={cancelEdit}
                                                        className="border-4 border-black bg-white px-4 py-1.5 font-black shadow-[3px_3px_0_0_#000] active:translate-x-1 active:translate-y-1 active:shadow-none"
                                                    >
                                                        CANCEL
                                                    </button>
                                                </>
                                            ) : (
                                                <>
                                                    <button
                                                        onClick={() => startEdit(s)}
                                                        className="border-4 border-black bg-yellow-300 px-4 py-1.5 font-black shadow-[3px_3px_0_0_#000] active:translate-x-1 active:translate-y-1 active:shadow-none"
                                                    >
                                                        EDIT
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(s.id)}
                                                        className="border-4 border-black bg-red-400 px-4 py-1.5 font-black shadow-[3px_3px_0_0_#000] active:translate-x-1 active:translate-y-1 active:shadow-none"
                                                    >
                                                        DELETE
                                                    </button>
                                                </>
                                            )}
                                        </td>
                                    </tr>
                                ))}

                                {students.length === 0 && (
                                    <tr>
                                        <td
                                            colSpan={4}
                                            className="border-4 border-black p-10 text-center font-black"
                                        >
                                            NO STUDENTS FOUND
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default StudentList;