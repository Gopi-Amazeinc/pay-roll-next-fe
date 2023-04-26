import React from 'react'



function PositionDetails() {
    return (
        <div className='container'>
            <div className='card mt-4 rounded-3 shadow-lg border-0'>
                <div className='row mt-2 p-2'>
                    <div className='col-lg-12'>
                        <p>Position Details</p>
                    </div>

                    <div className='col-lg-2'>
                        <div className='mb-3'>
                            <span>Employee Code <i className='text-danger'>*</i></span><p></p>
                            <input type="text" className='form-control' placeholder='Employee Code' />
                        </div>

                        <div className='mb-3'>
                            <span>Official Email <i className='text-danger'>*</i></span><p></p>
                            <input type="email" className='form-control' placeholder='Official Email' />
                        </div>
                    </div>

                    <div className='col-lg-2'>
                        <div className='mb-3'>
                            <span>Position Title <i className='text-danger'>*</i></span><p></p>
                            <select className=" form-select" >
                                <option value="1">One</option>
                            </select>
                        </div>

                        <div className='mb-3'>
                            <span>Company Mobile <i className='text-danger'>*</i></span><p></p>
                            <input type="number" className='form-control' placeholder='Official Email' />
                        </div>
                    </div>

                    <div className='col-lg-2'>
                        <div className='mb-3'>
                            <span>Employment Type <i className='text-danger'>*</i></span><p></p>
                            <select className=" form-select" >
                                <option value="1">One</option>
                            </select>
                        </div>

                        <div className='mb-3'>
                            <span>Cost Centre </span><p></p>
                            <select className=" form-select" >
                                <option value="1">One</option>
                            </select>
                        </div>
                    </div>

                    <div className='col-lg-2'>
                        <div className='mb-3'>
                            <span>Employment Status <i className='text-danger'>*</i></span><p></p>
                            <select className=" form-select" >
                                <option value="1">One</option>
                            </select>
                        </div>

                        <div className='mb-3'>
                            <span>SAP Vendor NO <i className='text-danger'>*</i></span><p></p>
                            <input type="email" className='form-control' placeholder='section' />
                        </div>
                    </div>

                    <div className='col-lg-2'>
                        <div className='mb-3'>
                            <span>Department</span><p></p>
                            <select className=" form-select" >
                                <option value="1">One</option>
                            </select>
                        </div>
                    </div>

                    <div className='col-lg-2'>
                        <div className='mb-3'>
                            <span>Designation <i className='text-danger'>*</i></span><p></p>
                            <select className=" form-select" >
                                <option value="1">One</option>
                            </select>
                        </div>
                    </div>
                </div>
                <hr color='black' />

                <div className='row mt-2 p-2'>
                    <div className='col-lg-2'>
                        <div className='mb-3'>
                            <span>Work Arrangment <i className='text-danger'>*</i></span><p></p>
                            <select className='form-select'>
                                <option></option>
                            </select>
                        </div>

                        <div className='mb-3'>
                            <span>Division </span><p></p>
                            <select className='form-select'>
                                <option></option>
                            </select>
                        </div>
                    </div>

                    <div className='col-lg-2'>
                        <div className='mb-3'>
                            <span>Worksite Country <i className='text-danger'>*</i></span><p></p>
                            <select className='form-select'>
                                <option></option>
                            </select>
                        </div>

                        <div className='mb-3'>
                            <span>Section <i className='text-danger'>*</i></span><p></p>
                            <select className='form-select'>
                                <option></option>
                            </select>
                        </div>
                    </div>

                    <div className='col-lg-2'>
                        <div className='mb-3'>
                            <span>Worksite Province <i className='text-danger'>*</i></span><p></p>
                            <select className='form-select'>
                                <option></option>
                            </select>
                        </div>

                        <div className='mb-3'>
                            <span>Sub Section <i className='text-danger'>*</i></span><p></p>
                            <input className='form-control' placeholder='Sub Section' />
                        </div>
                    </div>

                    <div className='col-lg-2'>
                        <div className='mb-3'>
                            <span>Worksite City <i className='text-danger'>*</i></span><p></p>
                            <select className='form-select'>
                                <option></option>
                            </select>
                        </div>

                        <div className='mb-3'>
                            <span>Working Location <i className='text-danger'>*</i></span><p></p>
                            <select className='form-select'>
                                <option></option>
                            </select>
                        </div>
                    </div>

                    <div className='col-lg-2'>
                        <div className='mb-3'>
                            <span>Start Date <i className='text-danger'>*</i></span><p></p>
                            <input type="date" className="form-control" />
                        </div>
                    </div>

                    <div className='col-lg-2'>
                        <div className='mb-3'>
                            <span>End Date </span><p></p>
                            <input type="date" className="form-control" />
                        </div>
                    </div>
                </div>
                <hr color='black' />

                <div className='row mt-2 p-2'>
                    <div className='col-lg-2'>
                        <div className='mb-3'>
                            <span>Hired Date <i className='text-danger'>*</i></span><p></p>
                            <input type="date" className="form-control" />
                        </div>

                        <div className='mb-3'>
                            <span>Confirmation Due Date <i className='text-danger'>*</i></span><p></p>
                            <input type="date" className="form-control" />
                        </div>
                    </div>

                    <div className='col-lg-2'>
                        <div className='mb-3'>
                            <span>Notice Period<i className='text-danger'>*</i></span><p></p>
                            <select className='form-select'>
                                <option></option>
                            </select>
                        </div>


                        <div className='mb-3'>
                            <span>Probation Start Date </span><p></p>
                            <input type="date" className="form-control" />
                        </div>
                    </div>

                    <div className='col-lg-2'>
                        <div className='mb-3'>
                            <span>Separation Date </span><p></p>
                            <input type="date" className="form-control" disabled />
                        </div>

                        <div className='mb-3'>
                            <span>Probation End Date </span><p></p>
                            <input type="date" className="form-control" />
                        </div>
                    </div>

                    <div className='col-lg-2'>
                        <div className='mb-3'>
                            <span>Separation Grace Period</span><p></p>
                            <input className='form-control' type="text" placeholder='Probition Period' disabled />
                        </div>

                        <div className='mb-3'>
                            <span>Contract End date <i className='text-danger'>*</i></span><p></p>
                            <input type="date" className="form-control" />
                        </div>
                    </div>

                    <div className='col-lg-2'>
                        <div className='mb-3'>
                            <span>Actual Confirmation date </span><p></p>
                            <input type="date" className="form-control" />
                        </div>
                    </div>

                    <div className='col-lg-2'>
                        <div className='mb-3'>
                            <span>Confirmation Status </span><p></p>
                            <select className='form-select'>
                                <option></option>
                            </select>
                        </div>
                    </div>
                </div>
                <hr color='black' />

                <div className='row mt-2 p-2'>
                    <div className='col-lg-2'>
                        <div className='mb-3'>
                            <span>Immediate Manager <i className='text-danger'>*</i></span><p></p>
                            <select className='form-select'>
                                <option></option>
                            </select>
                        </div>

                        <div className='mb-3'>
                            <span>Band <i className='text-danger'>*</i></span><p></p>
                            <select className='form-select'>
                                <option></option>
                            </select>
                        </div>
                    </div>

                    <div className='col-lg-2'>
                        <div className='mb-3'>
                            <span>Next Level Manager </span><p></p>
                            <select className='form-select'>
                                <option></option>
                            </select>
                        </div>


                        <div className='mb-3'>
                            <span>Entity </span><p></p>
                            <input type="text" className="form-control" placeholder='Entity' />
                        </div>
                    </div>

                    <div className='col-lg-2'>
                        <div className='mb-3'>
                            <span>Group Head </span><p></p>
                            <select className='form-select'>
                                <option></option>
                            </select>
                        </div>

                        <div className='mb-3'>
                            <span>Group</span><p></p>
                            <select className='form-select'>
                                <option></option>
                            </select>
                        </div>
                    </div>

                    <div className='col-lg-2'>
                        <div className='mb-3'>
                            <span>HR Manager</span><p></p>
                            <select className='form-select'>
                                <option></option>
                            </select>
                        </div>

                        <div className='mb-3'>
                            <span>Level <i className='text-danger'>*</i></span><p></p>
                            <select className='form-select'>
                                <option></option>
                            </select>
                        </div>
                    </div>

                    <div className='col-lg-2'>
                        <div className='mb-3'>
                            <span>Alternate HR Manager </span><p></p>
                            <select className='form-select'>
                                <option></option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            <div className='row'>
                <div className='col-lg-4'></div>
                <div className='mt-3 mb-3 col-lg-3'>
                    <button className='btn btn-primary' id='AddButton'>Submit</button>
                </div>
                <div className='col-lg-5'></div>

                <div className='col-lg-9'></div>
                <div className='col-lg-3'>
                    <div className='btn-group mb-3 mt-2 ms-5'>
                        <button className='btn btn-secondary'>Previous</button>
                        <button className='btn btn-primary'>Next</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PositionDetails