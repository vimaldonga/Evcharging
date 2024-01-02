
import React, { useState } from "react";
import { useNavigate } from "react-router";
import { NavLink } from "react-router-dom";
import Map from "../image/Map.jpg";
import Evicon from "../image/Evicon.jpg";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Signin = () => {



    const navigate = useNavigate();

    const [input, setinput] = useState({
        userName: "",
        password: ""
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
        const { userName, password } = input;
        setErrors(newErrors);

        if (!userName) {
            newErrors.userName = "plzz Enter the Username";

        } else if (!password) {
            newErrors.password = "plzz Enter the password";
        }
        else {
            const apiUrl = "http://localhost:9000/api/v1/user/loginUser";
            try {

                const response = await axios.post(apiUrl, input);
                const result = response.data.data.userId;

                localStorage.setItem("userId", JSON.stringify(result));
                // console.log('Response.data:', response.data);

                toast.success("singin successfully", {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 1500,
                    theme: "colored",
                });

                setTimeout(() => {
                    navigate("/");
                }, 1500)

            } catch (error) {
                // console.error('Error:', error);
                toast.error("Account not created , velide username and password", {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 1500,
                    theme: "colored",
                });
            }

            setinput({ userName: "", password: "" });

        }


    }

    const [passshow, setpassshow] = useState(false);
    const passwordshow = () => {
        setpassshow(passshow ? false : true)
    }



    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="m-3"><img className="img1" src={Evicon} alt="evicon" /><span className="fw-bold"> T E C E L L</span></div>
                   
                    <div className="col-lg-6  col-md-12 section1 " >
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
                                <p>you can <NavLink to="/signup"  className="link-primary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover"> Register Here ? </NavLink></p>
                            </div>
                            <br />
                            <img src={Map} alt="map image" />
                        </div>
                    </div>

                    <div className="col-lg-6  col-md-12 section2 ">
                        <div className="loginsection">

                            <form onSubmit={submiteddata}>

                                <div className="">
                                    <h6 className="text1">Welcome To <span className=" text-success">LOREM</span></h6>
                                    <div className="text2 fw-bold ">Sign In</div>
                                </div>
                                <br />

                                <div className="inputsection">
                                    <div className="icon">
                                        <button className="bg-lightgray rounded border border-1 border-lightgray text-info"> <span><i className="fa-brands fa-google"></i></span>  Sign in with google</button>
                                        <div><i className="fa-brands text-info fs-5 fa-facebook"></i></div>
                                        <div><i className="fa-brands  fs-5 fa-apple"></i></div>
                                    </div>
                                    <br />

                                    <div className="d-flex flex-column gap-2">
                                        <label className=" text fw-bold ">Enter your Username</label>
                                        <input className="form-control fs-6  py-1 rounded px-2" type="text"
                                            placeholder="Enter Your Username "
                                            name="userName" value={input.userName} onChange={newinput} />
                                    </div>
                                    {errors.userName && <span style={{ color: "red" }}>{errors.userName}</span>}

                                    <div className="d-flex flex-column gap-2" style={{ position: "relative" }}>
                                        <label className="text fw-bold">Password</label>
                                        <input className="form-control  py-1 rounded px-2 " type={passshow ? "text" : "password"}
                                            placeholder="Password"
                                            name="password" value={input.password} onChange={newinput} />
                                        <span style={{ position: "absolute", top: "51%", right: "8%" }} onClick={passwordshow}><i className="fa-sharp fa-solid fa-eye-slash"></i></span>
                                    </div>
                                    {errors.password && <span style={{ color: "red" }}>{errors.password}</span>}

                                </div>
                                <NavLink to="/recover">
                                    <div className="text-info text-end ">Forgot Password</div>
                                </NavLink>
                                <br />
                                <div className="text-end">
                                    <button className="bg-success  text-white fw-bold py-1 px-4 rounded">Sign In</button>
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


export default Signin;