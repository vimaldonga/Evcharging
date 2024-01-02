import React from "react";
import { Link, useParams } from 'react-router-dom';

const Addstudentdetail = ()=>{
    const { id } = useParams();
    return (
        <>
            <h1> all student details </h1>
            <Link to={`/view/${id}`}>
                        <button className="btn  btn-light border border-secondary-subtle fw-bold ">Back</button>
                    </Link>

        </>
    )
}


export default Addstudentdetail ;