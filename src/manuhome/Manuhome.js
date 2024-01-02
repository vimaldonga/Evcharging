import React from "react";
import { useNavigate } from "react-router";
import { NavLink } from "react-router-dom";
import Evicon from "../image/Evicon.jpg";


const Manuhome = () => {

    const navigate = useNavigate();

    const removeall = () => {

        localStorage.removeItem("userId");

        navigate("/signin");

    }



    return (
        <>
            <div className="container-fuid bg-light webkit p-2">
                <div className="px-3 py-2 text-dark text-center ">
                    <img className="img1" src={Evicon} alt="evicon" />
                    <span className="fw-bold"> T E C E L L</span>
                </div>
                <div className="d-flex flex-column gap-4 px-3 py-3">
                    <div className="d-flex flex-column gap-3" >
                        <p className="fw-lighter">Account</p>
                        <NavLink exact to="/profile" className="d-flex align-items-center gap-3 pl-2 hovereffect text-black text-decoration-none">
                            <i className="fa-solid fa-user"></i>
                            <div>Profile</div>
                        </NavLink>
                        <NavLink to="/student" className="d-flex align-items-center gap-3 pl-2 hovereffect text-black text-decoration-none">
                            <i className="fa-solid fa-users"></i>
                            <div>Student</div>
                        </NavLink>
                    </div>

                    <div className="d-flex flex-column gap-3">
                        <p className="fw-lighter">Activity</p>

                        <div className="d-flex align-items-center gap-2 pl-2 hovereffect">
                            <NavLink to="/overview" className="d-flex align-items-center gap-3  hovereffect text-black text-decoration-none">
                                <i className="fa-solid fa-users-viewfinder"></i>
                                <div>Overview</div>
                            </NavLink>
                        </div>

                        <div className="d-flex align-items-center gap-3 pl-2 hovereffect">
                            <NavLink to="/studentfees" className="d-flex align-items-center gap-3  hovereffect text-black text-decoration-none">
                                <i className="fa-solid fa-arrows-down-to-people"></i>
                                <div> Student Fees</div>
                            </NavLink>
                        </div>

                        <div className="d-flex align-items-center gap-3 pl-2 hovereffect">
                            <i className="fa-regular fa-note-sticky"></i>
                            <div>Charging sessions</div>
                        </div>
                        <div className="d-flex align-items-center gap-3 pl-2 hovereffect">
                            <i className="fa-solid fa-book-open"></i>
                            <div>Transactions</div>
                        </div>
                    </div>

                    <div className="d-flex flex-column gap-3">
                        <p className="fw-lighter">Activity</p>
                        <div className="d-flex align-items-center gap-3 pl-2 hovereffect">
                            <i className="fa-solid fa-charging-station"></i>
                            <div>Charging stations</div>
                        </div>
                        <div className="d-flex align-items-center gap-3 pl-2 hovereffect">
                            <i className="fa-solid fa-crown"></i>
                            <div>Site owners</div>
                        </div>
                        <div className="d-flex align-items-center gap-3 pl-2 hovereffect">
                            <i className="fa-solid fa-people-line"></i>
                            <div>E mobility providers</div>
                        </div>
                        <div className="d-flex align-items-center gap-3 pl-2  hovereffect">
                            <i className="fa-solid fa-user-group"></i>
                            <div>Partners</div>
                        </div>
                        <div className="d-flex align-items-center gap-3 pl-2  hovereffect">
                            <i className="fa-solid fa-car-on"></i>
                            <div>Drivers</div>
                        </div>
                    </div>

                    <div className="d-flex flex-column gap-3">
                        <p className="fw-lighter">Billings</p>
                        <div className="d-flex align-items-center gap-3 pl-2 hovereffect">
                            <NavLink to="/reports" className="d-flex align-items-center gap-3  hovereffect text-black text-decoration-none">
                                <i className="fa-regular fa-calendar-minus"></i>
                                <div>Reports </div>
                            </NavLink>
                        </div>

                        <div className="d-flex align-items-center gap-3 pl-2 hovereffect">
                            <NavLink to="/demo" className="d-flex align-items-center gap-3  hovereffect text-black text-decoration-none">
                                <i className="fa-solid fa-toolbox"></i>
                                <div>Demo</div>
                            </NavLink>
                        </div>

                        <div className="d-flex align-items-center gap-3 pl-2 hovereffect">
                            <NavLink to="/settelements" className="d-flex align-items-center gap-3  hovereffect text-black text-decoration-none">
                                <i className="fa-solid fa-users-viewfinder"></i>
                                <div>Settlements </div>
                            </NavLink>
                        </div>
                        <div className="d-flex align-items-center gap-3 pl-2 hovereffect">
                            <i className="fa-solid fa-gears"></i>
                            <div> Settings </div>
                        </div>

                    </div>
                    <div className="d-flex flex-column gap-3">
                        <p className="fw-lighter">Pricing & Vouchers</p>
                        <div className="d-flex align-items-center gap-3 pl-2 hovereffect">
                            <i className="fa-solid fa-comments-dollar"></i>
                            <div>Pricing plans</div>

                        </div>
                        <div className="d-flex align-items-center gap-3 pl-2 hovereffect">
                            <i className="fa-regular fa-address-card"></i>
                            <div>Vouchers</div>
                        </div>
                        <div className="d-flex align-items-center gap-3 pl-2 hovereffect">
                            <i className="fa-solid fa-power-off"></i>

                            <div onClick={removeall}>LogOut</div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Manuhome;