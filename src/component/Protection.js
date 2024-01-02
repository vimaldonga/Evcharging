import React from "react";
import {Outlet,Navigate} from "react-router-dom";

const Protection = ()=>{

    const data = localStorage.getItem("userId");
    return data ? <Outlet/>:<Navigate to={"/signin"}/>;
    
}

export default Protection ;