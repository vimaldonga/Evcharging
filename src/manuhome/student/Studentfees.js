import React, { useEffect, useState } from "react";
import axios from "axios";


const Studentfees = () => {
    const [data, setdata] = useState([]);

    useEffect(() => {
        fetchData();

    }, []);

    const API_URL = "http://localhost:9000/api/v1/getStudent";

    const fetchData = async () => {
        const result = await axios.get(API_URL);
        console.log("result", result.data.data);
        setdata(result.data.data);
    };



    const [inputdata, setinputdata] = useState({
        first_name: " ",
        last_name: " ",
        std: " ",
        students_free: " ",
        pay_fees: '',
        due_free: ""
    });

    

    const [newInput, setNewInput] = useState([]);

    const onInputChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setinputdata({ ...inputdata, [name]: value });

        const selectedStudent = data.find(student => student.first_name && student.last_name === value);
        if (selectedStudent) {
            setinputdata(prevInputData => ({
                ...prevInputData,
                std: selectedStudent.std,
                students_free: selectedStudent.students_free
            }));
        }
        
        let updatedStudentsFree = " ";
        if (name === 'pay_fees') {
            const payFees = parseFloat(value) || 0; 
            const currentStudentsFree = parseFloat(inputdata.students_free) || 0;  
              updatedStudentsFree = (currentStudentsFree - payFees).toFixed(2);  
        }
        setinputdata(prevInputData => ({
            ...prevInputData,
            [name]: value,
            due_free: updatedStudentsFree
        }));
    };

    const onadddata = (e) => {
        e.preventDefault();
        setNewInput([...newInput, inputdata]);
        setinputdata({
            first_name: '',
            last_name: '',
            std: '',
            students_free: '',
            pay_fees: '',
            due_free: ""
        });
    };

    const [editdata, seteditdata] = useState({
        first_name: " ",
        last_name: " ",
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
            fetchData();
            setEditingId(null);
        } catch (error) {
            console.error("Error adding record:", error);
        }
    };




    const handleDeleteRecord = async (id) => {
        console.log("===click delete====");

        const deleteapi = "http://localhost:9000/api/v1/deleteStudent?student_Id=";
        //  http://localhost:9000/api/v1/deleteStudent?student_Id=650e86b23184d6139b2d0a34

        try {
            const deleted = await axios.delete(`${deleteapi}${id}`).then(() => {
                setdata(data.filter((ele) => ele._id !== id));
            });
            console.log("==delete==", deleted);
            fetchData();
        } catch (error) {
            console.error("Error deleting record:", error);
        }
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
                            <h3>Student Fees Detalis</h3>
                            <button type="button" className="btn btn-light border border-secondary-subtle fw-bold" data-bs-toggle="modal" data-bs-target="#exampleModal"> All Student details </button>
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
                                            <div style={{ width: "700px", height: "100%" }}>

                                            <div className="row mb-3">
                                                    <label className="col-sm-2 col-form-label fw-bold"> first_name </label>
                                                    <div className="col-sm-10">
                                                    <select className="w-50" name="first_name" value={inputdata.first_name} onChange={onInputChange}>
                                                            <option value="">Select First Name</option>
                                                            {data.map((student, index) => (
                                                                <option key={index} value={student.first_name}>
                                                                    {student.first_name}
                                                                </option>
                                                            ))}
                                                        </select>

                                                    </div>

                                                </div>



                                                <div className="row mb-3">
                                                    <label className="col-sm-2 col-form-label fw-bold"> last_name </label>
                                                    <div className="col-sm-10">
                                                    <select className="w-50" name="last_name" value={inputdata.last_name} onChange={onInputChange}>
                                                            <option value="">Select Last Name</option>
                                                            {data.map((student, index) => (
                                                                <option key={index} value={student.last_name}>
                                                                    {student.last_name}
                                                                </option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                </div>



                                                <div className="row mb-3">
                                                    <label className="col-sm-2 col-form-label fw-bold"> std </label>
                                                    <div className="col-sm-10 ">
                                                    <input type="text" className="w-50" name="std" value={inputdata.std} onChange={onInputChange} disabled={true} />
                                                    </div>
                                                </div>

                                                <div className="row mb-3">
                                                    <label className="col-sm-2 col-form-label fw-bold"> students_free </label>
                                                    <div className="col-sm-10 ">
                                                    <input type="text" className="w-50" name="students_free" value={inputdata.students_free} onChange={onInputChange} disabled={true} />
                                                    </div>
                                                </div>

                                                
                                                <div className="row mb-3">
                                                    <label className="col-sm-2 col-form-label fw-bold"> pay_free </label>
                                                    <div className="col-sm-10 ">
                                                        <input type="text" className="w-50" name="pay_fees" value={inputdata.pay_fees} onChange={onInputChange} />
                                                    </div>
                                                </div>

                                                <div className="row mb-3">
                                                    <label className="col-sm-2 col-form-label fw-bold"> due_free </label>
                                                    <div className="col-sm-10 ">
                                                        <input type="text" className="w-50" name="due_free" value={inputdata.due_free} onChange={onInputChange} />
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
                                <th scope="col">First_name</th>
                                <th scope="col">Last_name</th>
                                <th scope="col">Std</th>
                                <th scope="col">Students_free</th>
                                <th scope="col">pay_free</th>
                                <th scope="col">due_free</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {newInput.map((ele, index) => {

                                return (

                                    <tr key={index} id={ele._id}>
                                        <td>{ele.first_name}</td>
                                        <td>{ele.last_name}</td>
                                        <td>{ele.std}</td>
                                        <td>{ele.students_free}</td>
                                        <td>{ele.pay_fees}</td>
                                        <td>{ele.due_free}</td>

                                        <td>
                                            <div>
                                                <button type="button" className="btn  p-1 m-1" title="view" onClick={() => handleViewStudent(ele._id)} data-bs-toggle="modal" data-bs-target="#viewexampleModal"><i className="fa-sharp fa-solid fa-eye"></i> </button>
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
                                                                                    <p><label className="fw-bold">Std:- </label> {item.std}</p>
                                                                                    <p><label className="fw-bold">Student Fees:-</label> {item.students_free}</p>

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
                                                <button type="button" className="btn  p-1 m-1" title="delete" onClick={() => handleDeleteRecord(ele._id)} >  <i className="fa-sharp fa-solid fa-trash"></i> </button>
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
    );
};

export default Studentfees;
