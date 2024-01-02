import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import Map from "../image/Map.jpg";
import Evicon from "../image/Evicon.jpg";
import axios from 'axios';
import { useNavigate } from "react-router";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Resetpassword = () => {
    const navigate = useNavigate();

    const [input, setinput] = useState({
        email: "",
        otp: "",
        resetpassword: ""
    });


    const [errors, setErrors] = useState({});

    const newinput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setinput({ ...input, [name]: value });
    }

    const submiteddata = async (e) => {
        e.preventDefault();
        const newerrors = {};
        setErrors(newerrors);
        const { email, otp, resetpassword } = input;

        if (!email) {
            newerrors.email = "plzz Enter the email";
        } else if (!otp) {
            newerrors.otp = "enter vealied otp";
        } else if (!resetpassword)
            newerrors.resetpassword = "plzz enter the new set password ";
        else {

            const paylode = {
                "email": input.email,
                "otp": Number(input.otp),
                "newPassword": input.resetpassword
            }

            const apiUrl = "http://localhost:9000/api/v1/user/forgotPassword";
            try {
                const response = await axios.post(apiUrl, paylode)

                toast.success("password chnage successfully", {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 2000,
                    theme: "colored",
                });
                // console.log('Response:', response.data);

                setTimeout(() => {
                    navigate("/signin");
                }, 2000);

            } catch (error) {
                toast.error(" not  crected  form", {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 2000,
                    theme: "colored",
                });

                // console.error('Error:', error);
            }

            setinput({ email: "", otp: " ", resetpassword: "" });

        }
    }

    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="m-3 logo"><img className="img1" src={Evicon} alt="evicon" /><span className="fw-bold"> T E C E L L</span></div>
                    <div className="col-6  section1 " >
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
                                <p>you can <NavLink to="/signup"><span className="text-primary"> Register here ?</span></NavLink></p>
                            </div>
                            <br />
                            <img src={Map} alt="map image" />
                        </div>
                    </div>

                    <div className="col-6 section2 ">
                        <div className="loginsection">
                            <form>
                                <div className="">
                                    <h6 className="text1">welcome to <span className=" text-success">LOREM</span></h6>
                                    <div className="text2 fw-bold ">Reset Password</div>
                                </div>
                                <br />

                                <div className="inputsection">
                                    <div className="d-flex flex-column gap-2">
                                        <label className=" text fw-bold ">Enter your  Email Address</label>
                                        <input className="form-control fs-6  py-1 rounded px-2" type="text"
                                            placeholder="Enter Your Email Address"
                                            name="email" value={input.email} onChange={newinput} />
                                    </div>
                                    {errors.email && <span style={{ color: "red" }}>{errors.email}</span>}
                                    <div className="d-flex flex-column gap-2">
                                        <label className="text fw-bold">Enter The OTP Your Received</label>
                                        <div className="d-flex gap-2">
                                            <input type="tel" className="form-control" placeholder="Enter Reciverd OTP " name="otp" value={input.otp} onChange={newinput} />

                                        </div>

                                    </div>
                                    {errors.otp && <span style={{ color: "red" }}>{errors.otp}</span>}

                                    <div className="d-flex flex-column gap-2">
                                        <label className="text fw-bold">ResetPassword</label>
                                        <input className="form-control  py-1 rounded px-2 " type="text"
                                            placeholder="ResetPassword"
                                            name="resetpassword" value={input.password} onChange={newinput} />
                                    </div>
                                    {errors.resetpassword && <span style={{ color: "red" }}>{errors.resetpassword}</span>}
                                </div>
                                <br />

                                <div className="text-end">
                                    <button className="bg-success  text-white fw-bold py-1 px-4 rounded" onClick={submiteddata}>Sign in</button>
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

export default Resetpassword;