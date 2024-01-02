import React from "react";


const Hederhome = ({onManuButtonClick}) => {
    return (
        <>
            <header className=" container-fluid navbar navbar-dark sticky-top bg-light border-top border-bottom p-3">
            <div>
                    <i className="fa-solid fa-align-right fs-4 " onClick={onManuButtonClick}></i>
                </div>

                <div className="d-flex  gap-3 justify-content-center align-items-center">
                    <div className="position-relative">
                        <i className=" position-absolute icon2 fa-solid fa-magnifying-glass"></i>
                        <input className="form-control form-control-dark bg-light px-5" type="text" placeholder="Search" aria-label="Search"></input>
                    </div>


                    <div>
                        <i className="fa-solid fa-sun iconhome"></i>
                    </div>
                    <div>
                        <i className="fa-solid fa-clock-rotate-left iconhome"></i>
                    </div>
                    <div>
                        <i className="fa-solid fa-bell iconhome"></i>
                    </div>
                    <div>
                        <i className="fa-solid fa-tv iconhome"></i>
                    </div>
                </div>   
            </header>
        </>
    )
}


export default Hederhome; 