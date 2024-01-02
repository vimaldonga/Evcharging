import React from "react";
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteData, editData, addData } from "./Userslice";
import axios from "axios";
import { addItemAPI, deleteItemAPI, editItemAPI } from "./api";

const Overview = () => {
  const dispatch = useDispatch();

  const [data, setdata] = useState([]);

  useEffect(() => {
    fetchData()

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
    await addItemAPI(inputdata);
    dispatch(addData(inputdata));
    fetchData();
    setinputdata({ first_name: " ", middle_name: " ", last_name: " ", date_of_birth: " " , std: " ",students_free: " " });
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
     await editItemAPI(editingId, editdata);
    dispatch(editData({ editingId, editdata }));
    seteditdata({ first_name: " ", middle_name: " ", last_name: " ", date_of_birth: " " , std: " ",students_free: " "  });
    fetchData();
    setEditingId(null);
  };



  const handleDeleteRecord = async (id) => {
    await deleteItemAPI(id);
    dispatch(deleteData(id));
    fetchData();
  };

  const [view, setview] = useState([]);

  const handleViewStudent = async (id) => {
    const viewstudent = data.filter((ele) => ele._id === id)
    console.log("====viewstudent====", viewstudent);
    setview(viewstudent);
    fetchData();
  };

  return (
    <>
      <div className="container-fluid bg-light">
        <div className="m-0 p-2">
          <div className=" m-0 p-2">
            <div className="d-flex flex-row justify-content-between align-items-center">
              <h3> overview reduxtoolkit Student detalis</h3>
              <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal"> Add student </button>
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

          <table className="table table-hover text-nowrap table-responsive-lg ">
            <thead>
              <tr>
                <th scope="col">Id</th>
                <th scope="col">first_name</th>
                <th scope="col">middle_name</th>
                <th scope="col">last_name</th>
                <th scope="col">date_of_birth</th>
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

                    <td>
                      <div>
                        <button type="button" className="btn  p-1 m-1" title="view" data-bs-toggle="modal" data-bs-target="#viewexampleModal" onClick={() => handleViewStudent(ele._id)}><i className="fa-sharp fa-solid fa-eye"></i> </button>
                        <div className="modal fade" id="viewexampleModal">
                          <div className="modal-dialog">
                            <div className="modal-content">
                              <div className="modal-header">
                                <h1 className="modal-title fs-6 fw-bold" id="exampleModalLabel">  view details student </h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" ></button>
                              </div>
                              <div className="modal-body">
                                <div style={{ width: "600px", height: "100%" }}>

                                  {
                                    view.map((item) => {
                                      return (
                                        <>
                                          <p><label className="fw-bold">Id:- </label> {item._id}</p>
                                          <p><label className="fw-bold">First_Name:- </label> {item.first_name}</p>
                                          <p> <label className="fw-bold">Middle_Name:- </label> {item.middle_name}</p>
                                          <p><label className="fw-bold">last_name:- </label> {item.last_name}</p>
                                          <p><label className="fw-bold">Date_Of_Birth:-</label> {item.date_of_birth}</p>

                                        </>

                                      )
                                    })
                                  }


                                </div>
                              </div>
                              <div className="modal-footer">
                                <button type="submit" className="btn btn-primary" data-bs-dismiss="modal">close </button>
                              </div>
                            </div>
                          </div>
                        </div>
                        <button type="button" className="btn p-1 m-1" title="delete" onClick={() => handleDeleteRecord(ele._id)}>  <i className="fa-sharp fa-solid fa-trash"></i> </button>
                        <button type="button" className="btn  p-1 m-1" title="edit" onClick={() => handleEditData(ele._id)} data-bs-toggle="modal" data-bs-target="#editexampleModal">  <i className="fa-solid fa-pen-to-square"></i>  </button>

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
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}


export default Overview;