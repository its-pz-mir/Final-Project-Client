import { useEffect, useState } from "react";
import { FaPencilAlt } from "react-icons/fa"; // Using Font Awesome Pencil Icon
import TeacherHeader from "../../components/teacherHeader";
import axios from "axios";
import { toast } from "react-toastify"

const AboutTeacher = () => {
  const [teacher, setTeacher] = useState(null);
  const [editableData, setEditableData] = useState({});
  const [isEditable, setIsEditable] = useState(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const api = "http://localhost:5000/api/user/checkauth";
    const checkApiAuth = async (api) => {
      try {
        const res = await axios.get(api, { withCredentials: true });
        if (res?.data?.success) {
          setTeacher(res?.data?.user);
          setEditableData(res?.data?.user);  // Set editableData to fetched teacher data
        }
      } catch (error) {
        console.log(error);
      }
    };
    checkApiAuth(api);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditableData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setSaved(false);
  };

  const toggleEdit = (field) => {
    setIsEditable(field);
  };

  const saveChanges = async () => {
    try {
      const api = "http://localhost:5000/api/user/selfupdate";

      // Send `editableData` directly
      const res = await axios.put(api, editableData, { withCredentials: true });

      if (res?.data?.success) {
        toast.success("Changes Saved Successfully");
        setSaved(true);
        setIsEditable(null);
      } else {
        toast.error(res?.data?.message || "Failed to save changes");
      }
    } catch (error) {
      toast.error("An error occurred while saving changes");
      console.log(error);
    }
  };




  if (!teacher) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <TeacherHeader />
      <div className="container mx-auto mt-8 p-6 ">
        <div className="max-w-4xl mx-auto p-6 border-blue-500 border-b-2 rounded-md shadow-lg bg-white">
          <h2 className="text-3xl font-semibold text-blue-500 mb-6 text-center">Teacher Information</h2>
          <div className="grid md:grid-cols-2 gap-6">

            <div className="flex items-center mb-4">
              <span className="w-40 font-semibold">Name:</span>
              {isEditable === "name" ? (
                <input
                  type="text"
                  name="name"
                  value={editableData.name}
                  onChange={handleChange}
                  className="border px-4 py-2 rounded-md w-full"
                />
              ) : (
                <span className="w-full">{editableData.name}</span>
              )}
              {isEditable !== "name" && (
                <FaPencilAlt
                  onClick={() => toggleEdit("name")}
                  className="ml-2 cursor-pointer text-blue-500 hover:text-blue-700"
                />
              )}
            </div>

            <div className="flex items-center mb-4">
              <span className="w-40 font-semibold">Email:</span>
              {isEditable === "email" ? (
                <input
                  type="email"
                  name="email"
                  value={editableData.email}
                  onChange={handleChange}
                  className="border px-4 py-2 rounded-md w-full"
                />
              ) : (
                <span className="w-full">{editableData.email}</span>
              )}
              {isEditable !== "email" && (
                <FaPencilAlt
                  onClick={() => toggleEdit("email")}
                  className="ml-2 cursor-pointer text-blue-500 hover:text-blue-700"
                />
              )}
            </div>

            <div className="flex items-center mb-4">
              <span className="w-40 font-semibold">Phone:</span>
              {isEditable === "phone" ? (
                <input
                  type="text"
                  name="phone"
                  value={editableData.phone}
                  onChange={handleChange}
                  className="border px-4 py-2 rounded-md w-full"
                />
              ) : (
                <span className="w-full">{editableData.phone}</span>
              )}
              {isEditable !== "phone" && (
                <FaPencilAlt
                  onClick={() => toggleEdit("phone")}
                  className="ml-2 cursor-pointer text-blue-500 hover:text-blue-700"
                />
              )}
            </div>

            <div className="flex items-center mb-4">
              <span className="w-40 font-semibold">Expertise:</span>
              {isEditable === "expertise" ? (
                <input
                  type="text"
                  name="expertise"
                  value={editableData.expertise ? editableData.expertise.join(", ") : ""}
                  onChange={(e) => {
                    setEditableData((prevData) => ({
                      ...prevData,
                      expertise: e.target.value.split(","),
                    }));
                  }}
                  className="border px-4 py-2 rounded-md w-full"
                />
              ) : (
                <span className="w-full">{editableData.expertise ? editableData.expertise.join(", ") : ""}</span>
              )}
              {isEditable !== "expertise" && (
                <FaPencilAlt
                  onClick={() => toggleEdit("expertise")}
                  className="ml-2 cursor-pointer text-blue-500 hover:text-blue-700"
                />
              )}
            </div>

            <div className="flex items-center mb-4">
              <span className="w-40 font-semibold">Department:</span>
              <span>{editableData.department}</span>
            </div>
            <div className="flex items-center mb-4">
              <span className="w-40 font-semibold">CNIC:</span>
              <span>{editableData.nic}</span>
            </div>
            <div className="flex items-center mb-4">
              <span className="w-40 font-semibold">Age:</span>
              <span>{editableData.age}</span>
            </div>
            <div className="flex items-center mb-4">
              <span className="w-40 font-semibold">Date of Joining:</span>
              <span>{new Date(editableData.doj).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center mb-4">
              <span className="w-40 font-semibold">Latest Academic Degree:</span>
              <span>{editableData.lad}</span>
            </div>
          </div>

          {isEditable && (
            <div className="mt-4 flex justify-end">
              <button
                onClick={saveChanges}
                className={`px-6 py-2 rounded-md ${saved ? "bg-green-500" : "bg-blue-500"} text-white`}
                disabled={saved}
              >
                {saved ? "Changes Saved!" : "Save Changes"}
              </button>
            </div>
          )}

          {saved && (
            <div className="mt-4 text-center text-green-500 font-semibold">
              Data successfully saved!
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AboutTeacher;
