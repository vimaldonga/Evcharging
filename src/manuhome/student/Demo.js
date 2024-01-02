import React, { useEffect, useState } from "react";
import axios from "axios";


const Demo = () => {
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

    const [inputData, setInputData] = useState({
        first_name: '',
        last_name: '',
        std: '',
        students_free: '',
        pay_fees: '',
        due_free: ""
    });

    const [newInput, setNewInput] = useState([]);

    const onInputChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setInputData({ ...inputData, [name]: value });



        const selectedStudent = data.find(student => student.first_name && student.last_name === value);
        if (selectedStudent) {
            setInputData(prevInputData => ({
                ...prevInputData,
                std: selectedStudent.std,
                students_free: selectedStudent.students_free
            }));
        };

        let updatedStudentsFree = " ";
        if (name === 'pay_fees') {
            const payFees = parseFloat(value) || 0;
            const currentStudentsFree = parseFloat(inputData.students_free) || 0;
            updatedStudentsFree = (currentStudentsFree - payFees).toFixed(2);
        }
        setInputData(prevInputData => ({
            ...prevInputData,
            [name]: value,
            due_free: updatedStudentsFree
        }));
    };



    const onAddData = (e) => {
        e.preventDefault();
        setNewInput([...newInput, inputData]);
        setInputData({ first_name: '', last_name: '', std: '', students_free: '', pay_fees: " ", due_free: " " });
    };


   
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    console.log("====onclick====");
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const [filteredData, setFilteredData] = useState([]);
const [filterFirstName, setFilterFirstName] = useState('');

const handleFirstNameFilter = () => {
    console.log("=====onclick====");
  const filtered = data.filter((student)=>{
       return student.first_name === filterFirstName.first_name ;
    
  })
  setFilteredData(filtered);
  setShowModal(false);
 

};


    return (
        <>
            <div className="container-fluid bg-light">
                <div className="m-0 p-2">
                    <div className=" m-0 p-2">
                        <div className="d-flex flex-row justify-content-between align-items-center">
                            <h3>demo Fees Detalis</h3>
                            <button type="button" className="btn btn-light border border-secondary-subtle fw-bold" data-bs-toggle="modal" data-bs-target="#exampleModal"> All Student details </button>
                        </div>

                        <form onSubmit={onAddData}>
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
                                                        <select className="w-75" name="first_name" value={inputData.first_name} onChange={onInputChange}>
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
                                                        <select className="w-75" name="last_name" value={inputData.last_name} onChange={onInputChange}>
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
                                                        <input type="text" className="w-75" name="std" value={inputData.std} onChange={onInputChange} />
                                                    </div>
                                                </div>

                                                <div className="row mb-3">
                                                    <label className="col-sm-2 col-form-label fw-bold"> students_free </label>
                                                    <div className="col-sm-10 ">
                                                        <input type="text" className="w-75" name="students_free" value={inputData.students_free} onChange={onInputChange} />
                                                    </div>
                                                </div>

                                                <div className="row mb-3">
                                                    <label className="col-sm-2 col-form-label fw-bold"> pay_free </label>
                                                    <div className="col-sm-10 ">
                                                        <input type="text" className="w-75" name="pay_fees" value={inputData.pay_fees} onChange={onInputChange} />
                                                    </div>
                                                </div>

                                                <div className="row mb-3">
                                                    <label className="col-sm-2 col-form-label fw-bold"> due_free </label>
                                                    <div className="col-sm-10 ">
                                                        <input type="text" className="w-75" name="due_free" value={inputData.due_free} onChange={onInputChange} />
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
                                <th scope="col">First_name <i className="fa-solid fa-filter text-info" title="filter" onClick={openModal} ></i></th>
                                {showModal && (
                                    

                                
                                    <div className="box d-flex flex-column justify-content-between align-items-center">


                                        <input type="text" placeholder="filter" onChange={(e) => setFilterFirstName(e.target.value)}   value={filterFirstName} />
                                        <div className="d-flex justify-content-between gap-3 ">
                                            <button onClick={handleFirstNameFilter}>submit</button>
                                            <button  onClick={closeModal}>close</button>

                                        </div>
                                        </div>

                                )}
                                <th scope="col">Last_name <i className="fa-solid fa-filter text-info" title="filter"></i></th>
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
                                                <button type="button" className="btn  p-1 m-1" title="view"><i className="fa-sharp fa-solid fa-eye"></i> </button>
                                                <button type="button" className="btn  p-1 m-1" title="delete"><i className="fa-sharp fa-solid fa-trash"></i> </button>
                                                <button type="button" className="btn  p-1 m-1" title="edit"><i className="fa-solid fa-pen-to-square"></i>  </button>


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

export default Demo;
