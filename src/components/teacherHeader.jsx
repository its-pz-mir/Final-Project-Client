import axios from "axios";
import { useEffect, useState } from "react";
import { FaUser, FaSignOutAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const TeacherHeader = () => {
    const [newUser, setNewUser] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        const api = "http://localhost:5000/api/user/checkauth";
        const checkApiAuth = async (api) => {
            try {
                const res = await axios.get(api, { withCredentials: true });
                if (res?.data?.success) {
                    setNewUser(res?.data?.user);
                }
            } catch (error) {
                console.log(error);
            }
        };
        checkApiAuth(api);
    }, []);

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleLogout = async () => {
        try {
            const api = "http://localhost:5000/api/user/logout";
            await axios.get(api, { withCredentials: true });
            navigate("/login");
            window.location.reload()
        } catch (error) {
            console.log("Logout failed", error);
        }
    };

    return (
        <header className="bg-blue-600 text-white py-4 px-6 flex justify-between items-center shadow-lg">
            <div className="text-lg font-semibold">
                Welcome, {newUser?.male ? "Mr" : "Mrs"}. {newUser?.name}
            </div>

            <div className="relative">
                <div
                    className="flex items-center cursor-pointer"
                    onClick={toggleDropdown}
                >
                    <FaUser className="text-xl mr-2" />
                    <span className="text-sm font-medium">My Profile</span>
                </div>

                {isDropdownOpen && (
                    <div className="absolute right-0 mt-2 bg-white text-gray-700 shadow-md rounded-md py-2 w-40">
                        <Link
                            to="/teacher/about"
                            className="block px-4 py-2 hover:bg-gray-100"
                        >
                            My Profile
                        </Link>
                        <button
                            onClick={handleLogout}
                            className="w-full text-left px-4 py-2 hover:bg-gray-100"
                        >
                            <FaSignOutAlt className="inline mr-2 text-red-500" />
                            Logout
                        </button>
                    </div>
                )}
            </div>
        </header>
    );
};

export default TeacherHeader;
