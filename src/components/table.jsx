import axios from "axios";
import { useEffect, useState } from "react";

const TeacherTable = () => {
    const [teachers, setTeachers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 8;

    useEffect(() => {
        const api = "http://localhost:5000/api/user/teachers";

        const getAllTeachers = async () => {
            try {
                const res = await axios.get(api, { withCredentials: true });
                if (res?.data?.success) {
                    const activeTeachers = res?.data?.teachers.filter((teacher) => {
                        return teacher.activeStatus === true;
                    })
                    setTeachers(activeTeachers)

                }
            } catch (error) {
                console.error("Error fetching teachers:", error.message);
                setTeachers([]);
            }
        };

        getAllTeachers();
    }, []);

    const totalPages = Math.ceil(teachers.length / rowsPerPage);
    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    const currentRows = teachers.slice(indexOfFirstRow, indexOfLastRow);

    const goToPage = (pageNumber) => {
        if (pageNumber > 0 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
        }
    };

    return (
        <div className="container mx-auto mt-8">
            <div className="overflow-x-auto">
                <table className="min-w-full border-collapse border border-gray-300">
                    <thead className="bg-blue-500 text-white">
                        <tr>
                            <th className="px-4 py-2 border border-gray-300 text-left">#</th>
                            <th className="px-4 py-2 border border-gray-300 text-left">Name</th>
                            <th className="px-4 py-2 border border-gray-300 text-left">Email</th>
                            <th className="px-4 py-2 border border-gray-300 text-left">Department</th>
                            <th className="px-4 py-2 border border-gray-300 text-left">Expertise</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentRows.length === 0 ? (
                            <tr>
                                <td colSpan="5" className="px-4 py-2 text-center">
                                    No teachers available.
                                </td>
                            </tr>
                        ) : (
                            currentRows.map((teacher, index) => (
                                <tr
                                    key={teacher._id}
                                    className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
                                >
                                    <td className="px-4 py-2 border border-gray-300">
                                        {indexOfFirstRow + index + 1}
                                    </td>
                                    <td className="px-4 py-2 border border-gray-300">{teacher.name}</td>
                                    <td className="px-4 py-2 border border-gray-300">{teacher.email}</td>
                                    <td className="px-4 py-2 border border-gray-300">{teacher.department}</td>
                                    <td className="px-4 py-2 border border-gray-300">
                                        {Array.isArray(teacher.expertise)
                                            ? teacher.expertise.join(", ")
                                            : teacher.expertise}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            <div className="flex justify-between items-center mt-4">
                <button
                    onClick={() => goToPage(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`px-4 py-2 text-sm font-semibold rounded-lg ${currentPage === 1
                        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                        : "bg-blue-500 text-white hover:bg-blue-600"
                        }`}
                >
                    Previous
                </button>
                <div className="flex items-center space-x-2">
                    {Array.from({ length: totalPages }, (_, i) => (
                        <button
                            key={i}
                            onClick={() => goToPage(i + 1)}
                            className={`px-3 py-1 text-sm rounded-lg ${currentPage === i + 1
                                ? "bg-blue-500 text-white"
                                : "bg-gray-200 text-gray-600 hover:bg-blue-100"
                                }`}
                        >
                            {i + 1}
                        </button>
                    ))}
                </div>
                <button
                    onClick={() => goToPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={`px-4 py-2 text-sm font-semibold rounded-lg ${currentPage === totalPages
                        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                        : "bg-blue-500 text-white hover:bg-blue-600"
                        }`}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default TeacherTable;
