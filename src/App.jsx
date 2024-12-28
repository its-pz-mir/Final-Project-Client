import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/teacher/Home'
import AboutTeacher from './pages/teacher/aboutTeacher'
import AdminHome from './pages/admin/adminHome'
import AdminTeacherDetails from './pages/admin/AdminTeacherDetails'
import Notfound from './components/Notfound'
import Login from './pages/Login'
import CheckAuth from './components/CheckAuth'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { useEffect, useState } from 'react'
import axios from "axios";
import AddTeacher from './pages/admin/addTeacher'

function App() {
  const [newUser, setNewUser] = useState();

  const isAuth = newUser?.activeStatus;
  const user = newUser;

  useEffect(() => {
    const api = "http://localhost:5000/api/user/checkauth";
    const checkApiAuth = async (api) => {
      try {
        const res = await axios.get(api, { withCredentials: true });
        if (res?.data?.success) {
          setNewUser(res?.data?.user)
        }
      } catch (error) {
        console.log(error);
      }
    }
    checkApiAuth(api)
  }, [])


  return (
    <>
      <ToastContainer
        position="bottom-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition:Bounce
      />
      <Routes>
        <Route path='/login' element={
          <CheckAuth isAuth={isAuth} user={user}>
            <Login />
          </CheckAuth>
        } />
        <Route path='/teacher'>
          <Route index element={
            <CheckAuth isAuth={isAuth} user={user}>
              <Home />
            </CheckAuth>
          } />
          <Route path='about' element={
            <CheckAuth isAuth={isAuth} user={user}>
              <AboutTeacher />
            </CheckAuth>
          } />
        </Route>
        <Route path='/admin'>
          <Route index element={
            <CheckAuth isAuth={isAuth} user={user}>
              <AdminHome />
            </CheckAuth>
          } />
          <Route path='details/:id' element={
            <CheckAuth isAuth={isAuth} user={user}>
              <AdminTeacherDetails />
            </CheckAuth>
          } />
          <Route path='add' element={
            <CheckAuth isAuth={isAuth} user={user}>
              <AddTeacher />
            </CheckAuth>
          } />
        </Route>
        <Route path='*' element={<Notfound />} />
      </Routes>
    </>
  )
}

export default App
