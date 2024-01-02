import React from "react";
import Hederhome from "./Hederhome";
import Manuhome from "../manuhome/Manuhome";
import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";


const Home = () => {

    const [isopen, setisopen] = useState(true);

    const opennav = () => {
        setisopen(false);
        localStorage.setItem('isopen', 'false');
    };

    const closenav = () => {
        setisopen(true);
        localStorage.setItem('isopen', 'true');
    };


    useEffect(() => {
        const localIsOpen = localStorage.getItem('isopen');
        if (localIsOpen === 'false') {
            setisopen(false);
        } else {
            setisopen(true);
        }
    }, []);



    return (
        <>
            <div className="container-fluid bg-light position-relative">
                <div className="row w-100 ">
                    {isopen && (
                        <div className="col-2 pr-0 ">
                            <Manuhome />
                        </div>
                    )}

                    <div className={isopen ? "col-10 vh-100  overflow-scroll webkit p-0 position-absolute open " : "col-12 vh-100  overflow-scroll webkit px-0  position-absolute  open"}  >
                        <Hederhome onManuButtonClick={isopen ? opennav : closenav} />
                        <Outlet />
                    </div>
                </div>
            </div>
        </>
    )
}


export default Home;