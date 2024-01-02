import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from "react-router-dom";

const Settelements = () => {
    const [data, setdata] = useState([]);

    useEffect(() => {
        fetchData();

    }, []);

    const API_URL = "http://localhost:9000/api/v1/getStudent";

    const fetchData = async () => {
        const studentId = JSON.parse(localStorage.getItem("userId"));
        const headers = {
            "user-Id": studentId,
        };
        try {
            const result = await axios.get(API_URL, { headers });
            console.log("result", result.data.data);
            setdata(result.data.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };


    const [inputdata, setinputdata] = useState({
        first_name: " ",
        middle_name: " ",
        last_name: " ",
        date_of_birth: " ",
        std: " ",
        students_free: " "
    });

    const oninputchnage = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setinputdata({ ...inputdata, [name]: value });
    };

    const onadddata = async (e) => {
        e.preventDefault();
        const studentId = JSON.parse(localStorage.getItem("userId"));
        const headers = {
            "user-Id": studentId,
        };

        try {
            const adddata = await axios.post("http://localhost:9000/api/v1/createStudent", inputdata, { headers });
            setinputdata({
                first_name: " ", middle_name: " ", last_name: " ", date_of_birth: " ", std: " ",
                students_free: " "
            });
            toast.success(" add data successfully", {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 1500,
                theme: "colored",
            });

            fetchData();

        } catch (error) {
            console.error("Error adding record:", error);
        }
    };

    const [editdata, seteditdata] = useState({
        first_name: " ",
        middle_name: " ",
        last_name: " ",
        date_of_birth: " ",
        std: " ",
        students_free: " "
    });

    const oneditchange = (e) => {
        e.preventDefault();
        const name = e.target.name;
        const value = e.target.value;
        seteditdata({ ...editdata, [name]: value });
    };

    const [editingId, setEditingId] = useState(null);

    const handleEditData = (id) => {
        const dataToEdit = data.find((item) => item._id === id);
        seteditdata(dataToEdit);
        setEditingId(id);
    };

    const hendaleupdatedata = async (id) => {


        try {
            const editresult = await axios.put(`http://localhost:9000/api/v1/upadteStudent?student_Id=${editingId}`, editdata);
            //  console.log("===edit=add====", editresult.data);
            const updatedDataList = data.map((item) => {
                return item._id === id ? editresult.data : item
            });
            setdata(updatedDataList);
            seteditdata({ first_name: " ", middle_name: " ", last_name: " ", date_of_birth: " ", std: " ", students_free: " " });

            toast.success("edit data successfully", {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 1500,
                theme: "colored",
            });
            fetchData();
            setviewmodel(null);
            setEditingId(null);
        } catch (error) {
            console.error("Error adding record:", error);
        }
    };




    const handleDeleteRecord = async (id) => {
        // console.log("===click delete====");

        const deleteapi = "http://localhost:9000/api/v1/deleteStudent?student_Id=";
        //  http://localhost:9000/api/v1/deleteStudent?student_Id=650e86b23184d6139b2d0a34

        try {
            const deleted = await axios.delete(`${deleteapi}${id}`).then(() => {
                setdata(data.filter((ele) => ele._id !== id));
            });
            // console.log("==delete==", deleted);
            toast.error("data delete succesfully", {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 1500,
                theme: "colored",
            });
            fetchData();
            setviewmodel(null);
        } catch (error) {
            console.error("Error deleting record:", error);
        }
    };



    const [viewmodel, setviewmodel] = useState(null);

    const viewopenmodel = (index) => {

        setviewmodel(index);
    }

    const closeviewmodel = () => {
        setviewmodel(null);
    }




    const [showModal, setShowModal] = useState(false);

    const openModal = (modalname) => {
        console.log("====onclick====");
        setShowModal(modalname);
    };

    const closeModal = () => {
        setShowModal(null);
        fetchData();
    };



    const [filterFirstName, setFilterFirstName] = useState('');

    const handleFirstNameFilter = () => {

        console.log("====onclick====");
        const filteredData = data.filter((item) =>
            item.first_name.toLowerCase().includes(filterFirstName.toLowerCase())
        );

        setdata(filteredData);

        setShowModal(false);
        setFilterFirstName(" ");

    };

    const handlelastNameFilter = () => {

        console.log("====onclick====");
        const filteredData = data.filter((item) =>
            item.last_name.toLowerCase().includes(filterFirstName.toLowerCase())
        );

        setdata(filteredData);

        setShowModal(false);
        setFilterFirstName(" ");

    };



    return (
        <>
            <div className="container-fluid bg-light text-center">
                <ToastContainer />
                <div className="m-0 p-2">
                    <div className=" m-0 py-2">
                        <div className="d-flex flex-row justify-content-between align-items-center">
                            <h3>Student Settelements </h3>
                            <button type="button" className="btn btn-light border border-secondary-subtle fw-bold" data-bs-toggle="modal" data-bs-target="#exampleModal"> Add student </button>
                        </div>

                        <form onSubmit={onadddata}>
                            <div className="modal fade" id="exampleModal" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div className="modal-dialog">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h1 className="modal-title fs-6 fw-bold" id="exampleModalLabel">Add student</h1>
                                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                        <div className="modal-body">
                                            <div style={{ width: "600px", height: "100%" }}>
                                                {/* <div className="row mb-3">
                          <label className="col-sm-2 col-form-label fw-bold"> Sr.No </label>
                          <div className="col-sm-10">
                            <input type="number" className="form-control w-75" name="srno" value={inputdata.srno} readOnly />
                          </div>
                        </div> */}
                                                <div className="row mb-3">
                                                    <label className="col-sm-2 col-form-label fw-bold"> first_name </label>
                                                    <div className="col-sm-10">
                                                        <input type="text" className="form-control w-75" name="first_name" value={inputdata.first_name} onChange={(e) => oninputchnage(e)} />
                                                    </div>
                                                </div>
                                                <div className="row mb-3">
                                                    <label className="col-sm-2 col-form-label fw-bold"> middle_name </label>
                                                    <div className="col-sm-10">
                                                        <input type="text" className="form-control w-75" name="middle_name" value={inputdata.middle_name} onChange={(e) => oninputchnage(e)} />
                                                    </div>
                                                </div>
                                                <div className="row mb-3">
                                                    <label className="col-sm-2 col-form-label fw-bold"> last_name </label>
                                                    <div className="col-sm-10">
                                                        <input type="text" className="form-control w-75" name="last_name" value={inputdata.last_name} onChange={(e) => oninputchnage(e)} />
                                                    </div>
                                                </div>

                                                <div className="row mb-3">
                                                    <label className="col-sm-2 col-form-label fw-bold"> date_of_birth </label>
                                                    <div className="col-sm-10 ">
                                                        <input type="date" id="date_of_birth" className="form-control w-75" name="date_of_birth" onChange={(e) => oninputchnage(e)} />
                                                    </div>
                                                </div>

                                                <div className="row mb-3">
                                                    <label className="col-sm-2 col-form-label fw-bold"> std </label>
                                                    <div className="col-sm-10 ">
                                                        <input type="number" className="form-control w-75" name="std" value={inputdata.std} onChange={(e) => oninputchnage(e)} />
                                                    </div>
                                                </div>

                                                <div className="row mb-3">
                                                    <label className="col-sm-2 col-form-label fw-bold"> students_free </label>
                                                    <div className="col-sm-10 ">
                                                        <input type="number" className="form-control w-75" name="students_free" value={inputdata.students_free} onChange={(e) => oninputchnage(e)} />
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                        <div className="modal-footer">
                                            <button type="submit" className="btn btn-primary" data-bs-dismiss="modal"> Add student </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>

                    <table className="table table-hover text-nowrap table-responsive-lg position-relative ">
                        <thead>
                            <tr>
                                <th scope="col">Id</th>
                                <th scope="col">First_name  <i className="fa-solid fa-filter text-info" title="filter" onClick={() => openModal('f')}></i></th>

                                {showModal === "f" && (
                                    <div className="box1 position-absolute d-flex flex-column justify-content-between align-items-center bg-body-secondary">
                                        <input type="text" className="form-control w-100" placeholder="first_name" onChange={(e) => setFilterFirstName(e.target.value)} value={filterFirstName} />
                                        <div className="d-flex justify-content-between gap-3 ">
                                            <button className="rounded btn-outline-secondary " onClick={handleFirstNameFilter}>submit</button>
                                            <button className="rounded  btn-outline-secondary " onClick={closeModal}>close</button>
                                        </div>
                                    </div>
                                )}

                                <th scope="col">Middle_name</th>
                                <th scope="col">Last_name  <i className="fa-solid fa-filter text-info" title="filter" onClick={() => openModal('l')}></i></th>
                                {showModal === "l" && (
                                    <div className=" box2 position-absolute d-flex flex-column justify-content-between align-items-center bg-body-secondary">
                                        <input type="text" className="form-control w-100" placeholder="last_name" onChange={(e) => setFilterFirstName(e.target.value)} value={filterFirstName} />
                                        <div className="d-flex justify-content-between gap-3 ">
                                            <button className="rounded btn-outline-secondary " onClick={handlelastNameFilter}>submit</button>
                                            <button className="rounded  btn-outline-secondary " onClick={closeModal}>close</button>
                                        </div>
                                    </div>
                                )}
                                <th scope="col">Date_of_birth</th>
                                <th scope="col">Std</th>
                                <th scope="col">Students_free</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((ele, index) => {
                                return (
                                    <tr key={index} id={ele._id}>
                                        <th scope="row">{ele._id}</th>
                                        <td>{ele.first_name}</td>
                                        <td>{ele.middle_name}</td>
                                        <td>{ele.last_name}</td>
                                        <td>{ele.date_of_birth}</td>
                                        <td>{ele.std}</td>
                                        <td>{ele.students_free}</td>

                                        <td className=" position-relative">
                                            <i className="fa-solid fa-ellipsis-vertical" onClick={() => viewopenmodel(index)}></i>
                                            {
                                                viewmodel === index && (
                                                    <div className="viewbox position-absolute  d-flex flex-column justify-content-between align-items-center">
                                                        <i className="fa-regular fa-circle-xmark d-flex align-items-end" onClick={closeviewmodel}></i>
                                                        <Link to={`/view/${ele._id}`} className="viewhover  text-black"><a>View</a></Link>
                                                        <a className="viewhover" onClick={() => handleEditData(ele._id)} data-bs-toggle="modal" data-bs-target="#editexampleModal">Edit</a>
                                                        <a className="viewhover" onClick={() => handleDeleteRecord(ele._id)}>Delete</a>

                                                    </div>
                                                )
                                            }
                                            <div>


                                                <div className="modal fade" id="editexampleModal">
                                                    <div className="modal-dialog">
                                                        <div className="modal-content">
                                                            <div className="modal-header">
                                                                <h1 className="modal-title fs-6 fw-bold" id="exampleModalLabel">  Edit student </h1>
                                                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" ></button>
                                                            </div>
                                                            <div className="modal-body">
                                                                <div style={{ width: "600px", height: "100%" }}>
                                                                    <div className="row mb-3">
                                                                        <label className="col-sm-2 col-form-label fw-bold"> first_name </label>
                                                                        <div className="col-sm-10">
                                                                            <input type="text" className="form-control w-75" name="first_name" value={editdata.first_name} onChange={oneditchange} />
                                                                        </div>
                                                                    </div>
                                                                    <div className="row mb-3">
                                                                        <label className="col-sm-2 col-form-label fw-bold">  middle_name </label>
                                                                        <div className="col-sm-10">
                                                                            <input type="text" className="form-control w-75" name="middle_name" value={editdata.middle_name} onChange={oneditchange} />
                                                                        </div>
                                                                    </div>
                                                                    <div className="row mb-3">
                                                                        <label className="col-sm-2 col-form-label fw-bold">  last_name </label>
                                                                        <div className="col-sm-10">
                                                                            <input type="text" className="form-control w-75" name="last_name" value={editdata.last_name} onChange={oneditchange} />
                                                                        </div>
                                                                    </div>

                                                                    <div className="row mb-3">
                                                                        <label className="col-sm-2 col-form-label fw-bold">date_of_birth</label>
                                                                        <div className="col-sm-10">
                                                                            <input
                                                                                type="date" className="form-control w-75" name="date_of_birth" value={editdata.date_of_birth} onChange={oneditchange} />
                                                                        </div>
                                                                    </div>

                                                                    <div className="row mb-3">
                                                                        <label className="col-sm-2 col-form-label fw-bold"> std </label>
                                                                        <div className="col-sm-10 ">
                                                                            <input type="number" className="form-control w-75" name="std" value={editdata.std} onChange={(e) => oneditchange(e)} />
                                                                        </div>
                                                                    </div>

                                                                    <div className="row mb-3">
                                                                        <label className="col-sm-2 col-form-label fw-bold"> students_free </label>
                                                                        <div className="col-sm-10 ">
                                                                            <input type="number" className="form-control w-75" name="students_free" value={editdata.students_free} onChange={(e) => oneditchange(e)} />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="modal-footer">
                                                                <button type="submit" className="btn btn-primary" data-bs-dismiss="modal" onClick={hendaleupdatedata}>Update </button>
                                                            </div>

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default Settelements;