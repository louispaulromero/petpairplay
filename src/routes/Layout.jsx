import React from "react";
import Header from "../components/header/Header.jsx";
import { Outlet, Link } from "react-router-dom"

const Layout = ()=>{
    return(
        <div>
            <Header/>

            <Outlet/>
        </div>
    )
}

export default Layout