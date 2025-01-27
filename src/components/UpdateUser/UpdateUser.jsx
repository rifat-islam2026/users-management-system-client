import { IoMdArrowBack } from "react-icons/io";
import { Link, useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";

function UpdateUser() {
    const users = useLoaderData();
    console.log(users)
    const { name, email, _id} = users;
    const handelUpdateUser = e => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const gender = form.gender.value;
        const status = form.status.value;
        const newUser = { name, email, gender, status };
        console.log(newUser)
        fetch(`http://localhost:5000/users/${_id}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newUser)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.modifiedCount>0) {
                    Swal.fire({
                        title: 'User Updated successfully!',
                        text: 'Do you want to continue',
                        icon: 'success',
                        confirmButtonText: 'Okay'
                    })
                }
            })
    }
  return (
      <div className="p-20">
          <h2 className="text-3xl text-center font-bold py-5">Update User</h2>
          <form
              onSubmit={handelUpdateUser}
              className="w-2/3 mx-auto bg-gray-100 p-10 shadow-xl">
              <button className='py-5 text-indigo-500 font-semibold hover:translate-x-[-10px] transition-all duration-500'>
                  <Link
                      to="/"
                      className='flex items-center py-2 px-4 shadow-lg link'>
                      <IoMdArrowBack /> Back
                  </Link>
              </button>
              <div className="form-control mb-3">
                  <label htmlFor="" className="label">Name</label>
                  <input
                      name="name"
                      type="text"
                      defaultValue={name}
                      className="input input-bordered w-full" />
              </div>
              <div className="form-control mb-3">
                  <label htmlFor="" className="label">Email</label>
                  <input
                      name="email"
                      type="email"
                      defaultValue={email}
                      className="input input-bordered w-full"
                      required />
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
                  className="btn bg-success hover:bg-green-600 font-bold w-full rounded-none"/>
          </form>
    </div>
  )
}

export default UpdateUser
