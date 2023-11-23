import React from "react";
import Login from "./cmp/login";
import Signup from "./cmp/signup";
import Home from "./cmp/home";
import Department from "./cmp/department";
import Employee from "./cmp/employee";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/department",
    element: <Department />,
  },
  {
    path: "/employee",
    element: <Employee />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
]);

const App = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
