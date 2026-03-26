import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/components_lite/Home";
import Login from "./components/authentication/Login";
import Register from "./components/authentication/Register";
import Privacy from "./components/components_lite/privacy";
import Terms from "./components/components_lite/Terms";
import Jobs from "./components/components_lite/Jobs";
import Browse from "./components/components_lite/Browse";
import Profile from "./components/components_lite/Profile";
import Description from "./components/components_lite/Description";
import Companies from "./components/admincomponent/Companies";
import CompanyCreate from "./components/admincomponent/CompanyCreate";
import CompanySetup from "./components/admincomponent/CompanySetup";
import AdminJobs from "./components/admincomponent/AdminJobs";
import PostJob from "./components/admincomponent/PostJob";
import Applicants from "./components/admincomponent/Applicants";
import Creator from "./components/components_lite/Creator";

const appRouter = createBrowserRouter([
  { path : "/" , element : <Home/> },
  {
    path : "/login" , 
    element : <Login/>,
  },
  {
    path : "/register" , 
    element : <Register/>,
  },
    {
    path :"/profile",
    element : <Profile/>,
  },
   {
    path : "/privacy" , 
    element : <Privacy/>,
  },
  {
    path : "/terms" , 
    element : <Terms/>,
  },
  {
    path : "/jobs" , 
    element : <Jobs/>,
  },
  {
    path : "/Home" ,
    element : <Home/>,
  },
  {
    path :"/browse",
    element : <Browse/>,
  },
  {
    path :"/Creator",
    element : <Creator/>,
  },
  {
    path : "/description/:id" ,
    element : <Description/>,
  },


  // For Admin
  {
    path :"/admin/companies",
    element: <Companies/>
  },
  {
    path :"/admin/companies/create",
    element: <CompanyCreate/>
  },
  {
    path :"/admin/companies/:id",
    element: <CompanySetup/>
  },
  {
    path :"/admin/jobs",
    element: <AdminJobs/>
  },
  {
    path :"/admin/jobs/create",
    element: <PostJob/>
  },
  {
    path :"/admin/jobs/:id/applicants",
    element: <Applicants/>
  },

]);

function App() {
  return (
    <div>
      <RouterProvider router={appRouter}></RouterProvider>
    </div>
  );
}

export default App;
