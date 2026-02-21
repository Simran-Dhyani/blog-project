import React from "react";
import { useDispatch } from "react-redux";
import authService from "../../appwrite/auth";
import { logout } from "../../store/authSlice"
function LogOutBtn(){
    const dispatch=useDispatch();
    const logOutHandler=()=>{
        authService.logOut().then(()=>{
            dispatch(logout());
        })
    }
    return(
        <button className="inline-block rounded-full px-4 py-6 hover:bg-blue-950 bg-purple-900" onClick={logOutHandler}>LogOut</button>
    )


}
export default LogOutBtn