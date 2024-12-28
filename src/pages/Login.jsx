import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";

const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("")


  const loginUser = async (e) => {
    e.preventDefault();
    const api = "http://localhost:5000/api/user/login";
    console.log(email, password);

    try {
      const res = await axios.post(api, { email, password }, { withCredentials: true }); // Add this
      console.log(res);

      if (res?.data?.success) {
        toast.success("Login Successfully");
        window.location.reload()
      }
    } catch (error) {
      console.log(error.response.data.message);
      toast.error(error.response.data.message);
    }
  };



  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
          <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Login</h2>
          <form onSubmit={loginUser}>
            {/* Email Field */}
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Password Field */}
            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter your password"
                className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              Login
            </button>
          </form>
          <div className="mt-6 text-sm text-center text-gray-600">
            If you are not registered, contact admin at{' '}
            <a
              href="mailto:admin@gmail.com"
              className="text-blue-500 hover:underline"
            >
              admin@gmail.com
            </a>.
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
