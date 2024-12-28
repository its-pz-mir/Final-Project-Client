import { useNavigate } from "react-router-dom"
import AdminHeader from "../../components/adminHeader"
import AdminTeachers from "../../components/adminTeachers"

const AdminHome = () => {

  const navigate = useNavigate();
  const handleNavigate = async () => {
    navigate("/admin/add")
  }

  return (
    <div>
      <AdminHeader />
      <div className="flex justify-center items-center my-5">
        <button onClick={handleNavigate} className="bg-blue-500 text-white px-3 py-2 hover:shadow-lg hover:bg-blue-600 font-semibold text-xl">Add Teacher</button>
      </div>
      <AdminTeachers />
    </div>
  )
}

export default AdminHome