import { IoIosArrowBack } from "react-icons/io";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

function NewUser() {
    const handelNewUser = e => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const gender = form.gender.value;
        const status = form.status.value;
        const users = { name, email, gender, status };
        console.log(users)
        fetch('http://localhost:5000/users', {
            method: 'POST',
            headers:{
                'content-type':'application/json'
            },
            body:JSON.stringify(users)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.insertedId) {
                    Swal.fire({
                        title: 'User added successfully!',
                        text: 'Do you want to continue',
                        icon: 'success',
                        confirmButtonText: 'Okay'
                    })
                }
        })
    }
  return (
    <div className="p-20">
          <h2 className="text-3xl text-center font-bold">New User</h2>
          <p className="text-center py-3 text-gray-400 text-xl font-semibold">Use the below from to create a new account</p>
          
          <form
              onSubmit={handelNewUser}
              className="w-2/3 mx-auto bg-gray-100 p-10 shadow-xl">
              <button className='py-5 text-indigo-500 font-semibold hover:translate-x-[-10px] transition-all duration-500'>
                  <Link
                      to="/"
                      className='flex items-center py-2 px-4 shadow-lg'>
                      <IoIosArrowBack/><IoIosArrowBack /> All User
                  </Link>
              </button>
              <div className="form-control mb-3">
                  <label htmlFor="" className="label">Name</label>
                  <input
                      name="name"
                      type="text"
                      placeholder="Name"
                      className="input input-bordered w-full" />
              </div>
              <div className="form-control mb-3">
                  <label htmlFor="" className="label">Email</label>
                  <input
                      name="email"
                      type="email"
                      placeholder="Email"
                      className="input input-bordered w-full"
                      required/>
              </div>
              <div className="flex items-center gap-7 mt-5">
                  <p className="font-semibold text-gray-400">Gender</p>
                  <div className="flex items-center gap-5">
                      <input type="radio" name="gender" className="radio radio-accent" value='Female' />
                      <label>Female</label>
                      <input type="radio" name="gender" className="radio radio-accent" value='Male' />
                      <label>Male</label>
                  </div>
              </div>
              <div className="flex items-center gap-7 my-5">
                  <p className="font-semibold text-gray-400">Status</p>
                  <div className="flex items-center gap-5">
                      <input type="radio" name="status" className="radio radio-accent" value='Active' />
                      <label>Active</label>
                      <input type="radio" name="status" className="radio radio-accent" value='Inactive' />
                      <label>Inactive</label>
                  </div>
              </div>
              <input
                  type="submit"
                  value="Save"
                  className="btn bg-success hover:bg-green-600 font-bold w-full rounded-none" />
          </form>
    </div>
  )
}

export default NewUser
