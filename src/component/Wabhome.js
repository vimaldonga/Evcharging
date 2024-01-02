import React from "react";

const Wabhome = () => {
    return (
        <>
            <div className="container-fuid bg-light">
                <div className="websection">
                    <div className="d-flex flex-row align-items-start gap-2 p-2">
                        <p className="fw-bold">Today</p>
                        <i className="fa-solid fa-angle-down"></i>
                    </div>

                    <div className="row mx-2 my-2">
                        <div className="col mx-2 bg-info-subtle pt-3 px-3 border border-white rounded-4 card ">
                            <p>New user</p>
                            <div className="d-flex flex-row align-items-start justify-content-between  p-3">
                                <h5>12</h5>
                                <div className="d-flex flex-row align-items-start gap-2">
                                    <p>+11.10%</p>
                                    <i className="fa-solid fa-arrow-trend-up"></i>
                                </div>
                            </div>
                        </div>
                        <div className="col mx-2 bg-body-secondary pt-3 px-3 border border-white rounded-4">
                            <p>New station</p>
                            <div className="d-flex flex-row align-items-start justify-content-between p-3">
                                <h5>12</h5>
                                <div className="d-flex flex-row align-items-start gap-2">
                                    <p>+11.10%</p>
                                    <i className="fa-solid fa-arrow-trend-up"></i>
                                </div>
                            </div>
                        </div>
                        <div className="col mx-2 bg-info-subtle pt-3 px-3 border border-white rounded-4">
                            <p>Active sessions</p>
                            <div className="d-flex flex-row align-items-start justify-content-between p-3">
                                <h5>12</h5>
                                <div className="d-flex flex-row align-items-start gap-2">
                                    <p>+11.10%</p>
                                    <i className="fa-solid fa-arrow-trend-up"></i>
                                </div>
                            </div>
                        </div>
                        <div className="col mx-2 bg-body-secondary pt-3 px-3 border border-white rounded-4">
                            <p>Faults</p>
                            <div className="d-flex flex-row align-items-start justify-content-between p-3">
                                <h5>12</h5>
                                <div className="d-flex flex-row align-items-start gap-2">
                                    <p>+11.10%</p>
                                    <i className="fa-solid fa-arrow-trend-up"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Wabhome;