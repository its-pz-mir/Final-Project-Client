
const AddTeacher = () => {
  return (
    <div className="px-10 py-10">
      <div className="w-full text-white uppercase flex text-center items-center justify-center bg-blue-500">Add Teacher</div>
      <form>
        <div className="grid grid-cols-3 space-x-6 space-y-4 border-4 border-blue-500 px-4 py-5">

          <div className="flex flex-col">
            <label htmlFor="name" className="mb-[2px] text-blue-600 ml-1 uppercase">Full Name</label>
            <input className="border-slate-500 px-2 py-1 rounded-md border-2 outline-blue-600" type="text" name="name" placeholder="Usman Shouket" />
          </div>
          <div className="flex flex-col">
            <label htmlFor="name" className="mb-[2px] text-blue-600 ml-1 uppercase">Email</label>
            <input className="border-slate-500 px-2 py-1 rounded-md border-2 outline-blue-600" type="text" name="name" placeholder="Usman Shouket" />
          </div>
          <div className="flex flex-col">
            <label htmlFor="name" className="mb-[2px] text-blue-600 ml-1 uppercase">PHone</label>
            <input className="border-slate-500 px-2 py-1 rounded-md border-2 outline-blue-600" type="text" name="name" placeholder="Usman Shouket" />
          </div>
          <div className="flex flex-col">
            <label htmlFor="name" className="mb-[2px] text-blue-600 ml-1 uppercase">Landline</label>
            <input className="border-slate-500 px-2 py-1 rounded-md border-2 outline-blue-600" type="text" name="name" placeholder="Usman Shouket" />
          </div>
          <div className="flex flex-col">
            <label htmlFor="name" className="mb-[2px] text-blue-600 ml-1 uppercase">NIC</label>
            <input className="border-slate-500 px-2 py-1 rounded-md border-2 outline-blue-600" type="text" name="name" placeholder="Usman Shouket" />
          </div>
          <div className="flex flex-col">
            <label htmlFor="name" className="mb-[2px] text-blue-600 ml-1 uppercase">Age</label>
            <input className="border-slate-500 px-2 py-1 rounded-md border-2 outline-blue-600" type="text" name="name" placeholder="Usman Shouket" />
          </div>
          <div className="flex flex-col">
            <label htmlFor="name" className="mb-[2px] text-blue-600 ml-1 uppercase">Gender</label>
            <input className="border-slate-500 px-2 py-1 rounded-md border-2 outline-blue-600" type="text" name="name" placeholder="Usman Shouket" />
          </div>
        </div>
      </form>
    </div>
  )
}

export default AddTeacher