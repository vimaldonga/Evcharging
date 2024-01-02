import React  from "react";
import { Link, useParams } from 'react-router-dom';      

const Addgame =()=>{
    const { id } = useParams();
    return(
        <>
            <h1>add new game all student</h1>
            <Link to={`/view/${id}`}>
                        <button className="btn  btn-light border border-secondary-subtle fw-bold ">Back</button>
                    </Link>

        </>
    )   
}

export default Addgame ;