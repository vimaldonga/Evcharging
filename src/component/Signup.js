import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import Evicon from "../image/Evicon.jpg";
import Map from "../image/Map.jpg";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { NavLink } from "react-router-dom";


const Signup = () => {

    const navigate = useNavigate();
    const [input, setinput] = useState({
        email: "",
        userName: "",
        contactNumber: "",
        password: ""
    });

    const newinput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setinput({ ...input, [name]: value });
    }

    const [errors, setErrors] = useState({});
    const submiteddata = async (e) => {
        e.preventDefault();
        const newErrors = {};

        // console.log("===newerrors===", newErrors);
        const { email, userName, contactNumber, password } = input;
        setErrors(newErrors);


        if (!email) {
            newErrors.email = "Email is required ";
        } else if (!userName) {
            newErrors.userName = "Username is required";
        } else if (!contactNumber) {
            newErrors.contactNumber = "Contact Number is required";
        } else if (!password) {
            newErrors.password = "Password is required";
        }

        else {
            const apiUrl = "http://localhost:9000/api/v1/user/createUser";
            try {
                const response = await axios.post(apiUrl, input)

                toast.success("Congratulations, Your Account Has Been Successfully Created.", {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 1500,
                    theme: "colored",
                });

                setTimeout(() => {
                    navigate("/signin");
                }, 3000);

                // console.log('Response:', response.data);

            } catch (error) {
                toast.error(" not  crected  form", {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 3000,
                    theme: "colored",
                });

                // console.error('Error:', error);
            }

            setinput({ email: "", userName: "", contactNumber: "", password: "" });

        }
    }

    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="m-3 logo"><img className="img1" src={Evicon} alt="evicon" /><span className="fw-bold"> T E C E L L</span>
                    </div>
                    <div className="col-lg-6  col-md-12 section1  section1 " >
                        <div className="obj2">
                            <div className="obj1">
                                <h3 className="text2 fw-bold">Sign-up in to the network </h3>
                                <div className="text3">
                                    <h5 className="fw-bolder">Convenience of </h5>
                                    <h5 className="fw-bolder">charging with TECELL</h5>
                                </div>
                            </div>
                            <div>
                                <div>if you don't have an account register</div>
                                <p> You can <a href="#" className="link-primary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover"> Register page</a></p>
                            </div>
                            <br />
                            <img className="img2" src={Map} alt="map image" />
                        </div>
                    </div>

                    <div className="col-lg-6  col-md-12   section2  position-relative">
                        <div className="loginsection">
                            <form onSubmit={submiteddata}>
                                <div>
                                    <h6 className="text1">Welcome To <span className=" text-success">LOREM</span></h6>
                                    <div className="text2 fw-bold ">Sign Up</div>
                                </div>
                                <br />

                                <div className="inputsection">
                                    <div className="d-flex flex-column gap-0">
                                        <label className=" text fw-bold ">Enter Your  Email Address</label>
                                        <input className="form-control fs-6  py-1 rounded px-2 " type="text"
                                            placeholder="Your Email Address"
                                            name="email" value={input.email} onChange={newinput} />
                                    </div>
                                    {errors.email && <span style={{ color: 'red' }}>{errors.email}</span>}

                                    <div className="subsection">
                                        <div className="d-flex flex-column gap-0">
                                            <label className="text fw-bold">Username</label>
                                            <input className="form-control fs-6  py-1 rounded px-2" type="text"
                                                placeholder="Username"
                                                name="userName" value={input.userName} onChange={newinput} />
                                        </div>
                                        <div className="d-flex flex-column gap-0">
                                            <label className="text fw-bold">Contect Number</label>
                                            <input className="form-control  fs-6  py-1 rounded px-2" type="number"
                                                placeholder="Contect Number"
                                                name="contactNumber" value={input.contactNumber} onChange={newinput} />
                                        </div>

                                    </div>
                                    {errors.userName && <span style={{ color: 'red' }}>{errors.userName}</span>}
                                    {errors.contactNumber && <span style={{ color: 'red' }}>{errors.contactNumber}</span>}
                                    <label style={{ fontSize: "10px" }}>{ }</label>

                                    <div className="d-flex flex-column gap-0">
                                        <label className="text fw-bold">Password</label>
                                        <input className="form-control  py-1 rounded px-2 " type="text"
                                            placeholder="Password"
                                            name="password" value={input.password} onChange={newinput} />
                                    </div>
                                    <span style={{ color: 'red' }}>{errors.password}</span>

                                </div>
                                
                                    <p>All ready Signup ?<NavLink to={"/signin"} className="link-primary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover"> Signin
                                </NavLink></p>

                                <div className="text-end">
                                    <button className="bg-success  text-white fw-bold py-1 px-4 rounded">Sign Up</button>
                                </div>
                                <ToastContainer />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}


export default Signup;