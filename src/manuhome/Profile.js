import React from "react";
const Profile = () => {
    return (
        <>
            <div className="container-fluid bg-light">
                <div className="row col-12 ">
                    <div className="p-2">
                        <h3>Student Profile</h3>
                    </div>
                    <div className="row ">
                        <div className="col-2">  </div>
                        <div className="col-8  bg-body p-4 shadow  rounded ">
                            <div className="position-relative">
                                <div>
                                    <h5 className="fw-bold text-body-tertiary"> Profile Image </h5>
                                    <div className="d-create-file d-flex gap-3 align-items-center " >
                                        <img style={{ height: '100px', width: '100px' }} id="image" className=" w-full h-32" src="images/blank-profile.jpg" />
                                        <div>
                                            <input type="file" accept=".png,.jpg,.gif,.webo,.mp4" id="upload_file" name="image" />
                                        </div>

                                    </div>
                                </div>

                            </div>

                            <div className="pt-3 mt-2 ">
                                <h5 className="fw-bold text-body-tertiary">Student Info</h5>
                                <div className="row row-cols-3">
                                    <div className="mb-3 cols ">
                                        <label className="fw-bold text-body-tertiary ">Frist name :-</label>
                                        <input type="text" placeholder='Frist Name*' className='form-control form-control-dark bg-light px-2' />
                                    </div>

                                    <div className="mb-3  cols">
                                        <label className="fw-bold text-body-tertiary ">middle name :-</label>
                                        <input type="text" placeholder='middle Name*' className='form-control form-control-dark bg-light px-2' />
                                    </div>

                                    <div className="mb-3  cols">
                                        <label className="fw-bold text-body-tertiary ">last name :-</label>
                                        <input type="text" placeholder='Last Name*' className='form-control form-control-dark bg-light px-2' />
                                    </div>
                                    <div className="mb-3  cols">
                                        <label className="fw-bold text-body-tertiary ">mother name :-</label>
                                        <input type="text" placeholder='Last Name*' className='form-control form-control-dark bg-light px-2' />
                                    </div>
                                    <div className="mb-3  cols">
                                        <label className="fw-bold text-body-tertiary ">mobile number :-</label>
                                        <input type="number" placeholder='Last Name*' className='form-control form-control-dark bg-light px-2' />
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="row ">
                        <div className="col-2">  </div>
                        <div className="col-8  bg-body my-4 p-4  shadow  rounded">
                            <h5 className="fw-bold text-body-tertiary">Address</h5>
                            <div className="row">
                                <div className="mb-3 col-6">
                                    <input type="text" placeholder='Address*' className='form-control form-control-dark bg-light px-2' />
                                </div>

                                <div className="mb-3 col-6">
                                    <input type="text" placeholder='city*' className='form-control form-control-dark bg-light px-2' />
                                </div>
                            </div>
                            <div className="row">
                                <div className="mb-3 col-6">
                                    <input type="number" placeholder='pin code*' className='form-control form-control-dark bg-light px-2' />
                                </div>
                                <div className="mb-3 col-6">
                                    <input type="text" placeholder='state*' className='form-control form-control-dark bg-light px-2' />
                                </div>
                            </div>
                            <div>
                                <button type="button" title="submited" className=' form-control form-control-dark bg-success text-white px-2'>update profile</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}


export default Profile;