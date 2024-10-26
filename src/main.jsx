import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import App from './App.jsx';
import NewUser from './components/NewUser/NewUser.jsx';
import UpdateUser from './components/UpdateUser/UpdateUser.jsx';
import './index.css';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    loader: () => fetch('http://localhost:5000/users')
  },
  {
    path: "/newUser",
    element:<NewUser/>
  },
  {
    path: "/updateUser/:id",
    element: <UpdateUser />,
    loader: ({params}) => fetch(`http://localhost:5000/users/${params.id}`)
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
