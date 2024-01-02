import React, { useState } from "react";
import Map from "../image/Map.jpg";
import Evicon from "../image/Evicon.jpg";
import { NavLink } from "react-router-dom";
import axios from 'axios';
import { useNavigate } from "react-router";

const Recover = () => {

    const navigate = useNavigate();

    const [input, setinput] = useState({
        email: ""
    });
    const [errors, setErrors] = useState({});

    const newinput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setinput({ ...input, [name]: value });

    }

    const submiteddata = async (e) => {
        e.preventDefault();
        const newErrors = {};
        setErrors(newErrors);
        const { email } = input;

        if (!email) {
            newErrors.email = "enter the email in send otp";

        } else {
            const apiUrl = "http://localhost:9000/api/v1/user/sendMailOTP";
            try {

                const response = await axios.post(apiUrl, input);
                const result = response.data;
                console.log('Response.data:', result);


                alert(response.data.message);
                navigate("/resetpassword")

            } catch (error) {
                console.error('Error:', error);
                alert("error not created form");
            }

            setinput({ email: "" });
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

                                <h4 className="text2 fw-bold">Sign in to the network </h4>
                                <div className="text3">
                                    <h5 className="fw-bolder">Convenience of </h5>
                                    <h5 className="fw-bolder">charging with TECELL</h5>
                                </div>
                            </div>
                            <div>
                                <div>if you don't have an account register</div>
                                <p>you can <NavLink to="/signup"><span className="text-primary"> Register Here ?</span> </NavLink></p>
                            </div>
                            <br />
                            <img src={Map} alt="map image" />
                        </div>





                    </div>
                    <div className="col-6 section2 ">
                        <div className="loginsection">

                            <form>

                                <div>
                                    <h6 className="text1">welcome to <span className=" text-success">LOREM</span></h6>
                                    <div className="text2 fw-bold ">Recover</div>
                                </div>
                                <br />

                                <div className="inputsection d-flex flex-column gap-5">

                                    <div className="d-flex flex-column gap-2">
                                        <label className=" text fw-bold ">Enter your  Email Address</label>
                                        <input className="form-control fs-6  py-1 rounded px-2" type="text"
                                            placeholder="Your Email Address"
                                            name="email" onChange={newinput} />
                                    </div>
                                    {errors.email && <span style={{ color: "red" }}>{errors.email}</span>}

                                    <div>
                                        <p className=" text fw-bold  text-secondary">
                                            TECELL will senf the recovery code if you are registretion with us
                                        </p>
                                    </div>

                                </div>
                                <br />

                                <div className="text-end">
                                    <NavLink to="/resetpassword">
                                        <button className="bg-success  text-white fw-bold py-1 px-4 rounded" onClick={submiteddata}>Send OTP</button>
                                    </NavLink>

                                </div>

                            </form>


                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default Recover;