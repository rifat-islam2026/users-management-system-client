import { useState } from 'react';
import { FaPencil, FaUserPlus } from 'react-icons/fa6';
import { ImCross } from 'react-icons/im';
import { Link, useLoaderData } from 'react-router-dom';
import Swal from 'sweetalert2';
import './App.css';

function App() {
  const loadedUsers = useLoaderData();
  const [users,setUsers] = useState(loadedUsers);
  console.log(users)
  const handelDelete = id => {
    console.log(id)
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:5000/users/${id}`, {
          method: "DELETE"
        })
          .then(res => res.json())
          .then(data => {
            console.log(data)
            if (data.deletedCount > 0) {
              Swal.fire({
                title: "Deleted!",
                text: "Your user has been deleted.",
                icon: "success"
              });
              const remaining = users.filter(user => user._id !== id);
              setUsers(remaining);
            }
          })       
      }
    });    
  }
  return (
    <>
      <h1 className='text-center font-bold text-3xl bg-teal-300 py-3 mb-10'>User Management System</h1>
      
      <button
        className='mx-20 py-5 text-indigo-500 font-semibold
        hover:translate-y-[-10px] transition-all duration-500'>
        <Link
          to="/newUser"
          className='flex items-center gap-3 py-2 px-4 shadow-lg'
        >Add User
          <FaUserPlus />
        </Link>
        </button>
      <div className="overflow-x-auto mx-20 shadow-xl">
        <table className="table">
          {/* head */}
          <thead className='bg-slate-800 text-white font-semibold'>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>@Email</th>
              <th>Gender</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          {
            users.map((user,idx) => <tbody key={user._id}>
              <tr className='hover'>
                <th>{idx+1}</th>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.gender}</td>
                <td>{user.status}</td>
                <td className='flex gap-3'>
                  <button
                    className='text-xl p-3 text-white bg-green-600 shadow-xl cursor-pointer hover:translate-y-[-10px] transition-all duration-500'
                  ><Link to="/updateUser"><FaPencil /></Link>
                  </button>
                  <button
                    onClick={()=>handelDelete(user._id)}
                    className='text-xl p-3 text-white bg-red-600 shadow-xl cursor-pointer hover:translate-y-[-10px] transition-all duration-500'
                  ><ImCross />
                  </button>
                </td>
              </tr>
            </tbody>)
         }
        </table>
      </div>
    </>
  )
}

export default App
