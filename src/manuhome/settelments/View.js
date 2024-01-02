
import React, { useEffect, useState } from "react";
import { Link, useParams } from 'react-router-dom';
import axios from "axios";


const View = () => {

    const [showEducationData, setShowEducationData] = useState(true);
    const toggleDataDisplay = () => {
        setShowEducationData(true);
    };

    const toggleDatapart = ()=>{
        setShowEducationData(false);

    }
    const { id } = useParams();

    const [data, setdata] = useState(null);
    useEffect(() => {
        fetchData();

    }, [id]);

    const API_URL = "http://localhost:9000/api/v1/getStudent";

    const fetchData = async () => {

        try {
            const result = await axios.get(API_URL);

            const newdata = result.data.data;
            console.log("result", newdata);

            const selectview = newdata.find((ele) => ele._id === id);
            console.log("====seceleted view=====", selectview);


            setdata(selectview);

        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    return (
        <>
            <div className="container-fluid bg-light p-3">
                <div className="d-flex flex-column justify-content-between  gap-1 mb-2">
                    <Link to="/settelements">
                        <button className="btn  btn-light border border-secondary-subtle fw-bold ">Back</button>
                    </Link>

                    <h5>view detail student </h5>

                </div>

                {
                    data && (


                        <div className="row pl-3">
                            <div className="col-6">


                                <h6>first_name: <span className="fw-light">{data.first_name}</span> </h6>
                                <h6>middle_name: <span className="fw-light">{data.middle_name}</span> </h6>
                                <h6>last_name: <span className="fw-light">{data.last_name}</span></h6>

                            </div>
                            <div className="col-6">
                                <h6>date_of_birth: <span className="fw-light">{data.date_of_birth}</span></h6>
                                <h6>std: <span className="fw-light">{data.std}</span></h6>
                                <h6>students_free: <span className="fw-light">{data.students_free}</span></h6>

                            </div>


                        </div>
                    )
                }



                <div className="mt-5">
                    <div className="border-bottom border-secondary-subtle ">
                        <h5>students details</h5>
                    </div>
                    <div className="d-flex flex-row justify-content-between align-items-center pt-3">
                        <div className="d-flex gap-3">
                            <button className=" btn btn-light" onClick={toggleDataDisplay} >Student eduction  </button>
                            <button className="btn btn-light" onClick={toggleDatapart} >Student participentis</button>

                        </div>
{
    showEducationData ? (
        <Link to ={`/addstudentdetail/${id}`}>
        <button className="btn  btn-light border border-secondary-subtle fw-bold">Add Student detail </button>
        </Link>
      
    ):(
        <Link to ={`/addgame/${id}`}>
        <button className="btn  btn-light border border-secondary-subtle fw-bold">Add Game </button> 
        </Link>
        
    )
}
                        
                    </div>





                    {
                        data && showEducationData ? (

                            <div className="mt-3 ">




                                <table class="table">
                                    <thead>
                                        <tr>
                                            <th scope="col">First_name</th>
                                            <th scope="col">Middle_name</th>
                                            <th scope="col">Last_name </th>
                                            <th scope="col">Date_of_birth</th>
                                            <th scope="col">Std</th>
                                            <th scope="col">Students_free</th>

                                        </tr>
                                    </thead>
                                    <tbody>

                                        <tr>
                                            <td>{data.first_name}</td>
                                            <td>{data.middle_name}</td>
                                            <td>{data.last_name}</td>
                                            <td>{data.date_of_birth}</td>
                                            <td>{data.std}</td>
                                            <td>{data.students_free}</td>
                                        </tr>
                                    </tbody>
                                </table>

                            </div>
                        ) : (<div className="mt-3 ">




                            <table class="table">
                                <thead>
                                    <tr>
                                        <th scope="col">Student_name</th>
                                        <th scope="col">participentis</th>
                                        <th scope="col">no of student </th>
                                        <th scope="col">Rank</th>
                                        <th scope="col">winner</th>
                                        <th scope="col">date</th>

                                    </tr>
                                </thead>
                                <tbody>

                                    <tr>
                                        <td>aaaaaaa</td>
                                        <td>chech</td>
                                        <td>10</td>
                                        <td>2</td>
                                        <td> silver medal</td>
                                        <td>11/10/2023</td>
                                    </tr>
                                </tbody>
                            </table>

                        </div>)
                    }

                </div>




            </div>


        </>
    )
}
export default View;