import React, { useContext } from "react";
import ReactLink from "./ReactLink";
import { Outlet, Route, Routes } from "react-router-dom";
import AdminRegister from "./WebUsers/AdminRegister";
import AdminVerify from "./WebUsers/AdminVerify";
import AdminLogin from "./WebUsers/AdminLogin";
import AdminProfile from "./WebUsers/AdminProfile";
import AdminLogout from "./WebUsers/AdminLogout";
import AdminProfileUpdate from "./WebUsers/AdminProfileUpdate";
import AdminUpdatePassword from "./WebUsers/AdminUpdatePassword";
import AdminForgotPassword from "./WebUsers/AdminForgotPassword";
import AdminResetPassword from "./WebUsers/AdminResetPassword";
import ReadAllUsers from "./WebUsers/ReadAllUsers";
import UserDetails from "./WebUsers/UserDetails";
import UpdateUserDetails from "./WebUsers/UpdateUserDetails";
import { GlobalVariableContext } from "../App";

const ReactRouter = () => {
  let global = useContext(GlobalVariableContext);
  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <div>
              
              <ReactLink></ReactLink>
              <Outlet></Outlet>
            </div>
          }
        >
          <Route index element={<div>Home Page</div>}></Route>

          <Route
            path="web-users"
            element={
              <div>
                <Outlet></Outlet>
              </div>
            }
          >
            <Route
              path="verify-email"
              element={<AdminVerify></AdminVerify>}
            ></Route>

            <Route
              path="reset-password"
              element={<AdminResetPassword></AdminResetPassword>}
            ></Route>
          </Route>

          <Route
            path="admin"
            element={
              <div>
                <Outlet></Outlet>
              </div>
            }
          >
            <Route index element={<div>This is admin dashboard</div>}></Route>
            <Route
              path="register"
              element={<AdminRegister></AdminRegister>}
            ></Route>

            <Route path="login" element={<AdminLogin></AdminLogin>}></Route>

            <Route
              path="forgot-password"
              element={<AdminForgotPassword></AdminForgotPassword>}
            ></Route>


{
global.token?<>
<Route
              path="my-profile"
              element={<AdminProfile></AdminProfile>}
            ></Route>
            <Route
              path="update-profile"
              element={<AdminProfileUpdate></AdminProfileUpdate>}
            ></Route>
            <Route
              path="update-password"
              element={<AdminUpdatePassword></AdminUpdatePassword>}
            ></Route>
</>:null
}
            

{
  global.token?<>
  <Route path="logout" element={<AdminLogout></AdminLogout>}></Route>
            <Route path="read-all-users" element={<ReadAllUsers></ReadAllUsers>}></Route>
            <Route path=":id" element={<UserDetails/>}></Route>
            <Route path="update" element={<div><Outlet></Outlet></div>}>
            <Route path=":id" element={<UpdateUserDetails/>}></Route>
            </Route>
  </>:null
}

            
          </Route>
        

        <Route path="*" element={<div>Not Found 404</div>}></Route>
        <Route path="/:id/*" element={<div>Not Found 404</div>}></Route>
        </Route>
      </Routes>
    </div>
  );
};

export default ReactRouter;
