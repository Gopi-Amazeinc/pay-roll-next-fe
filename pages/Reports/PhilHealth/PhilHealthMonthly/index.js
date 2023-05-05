

import React, { useEffect, useState } from 'react'
import Layout from '@/components/layout/layout.js';

function RFreport() {

    let [tableState, setState] = useState(false)

    const toggleTable = () => {
        setState(!tableState)
    }

    return (
        <Layout>
            <div >
                <br />
                <div className="container-fluid ">
                    <div className="col-12">
                        <div className="row">
                            <h2>PhilHealth Monthly Contribution</h2>

                        </div>

                        <br /><br /><br />
                        <div className="card shadow p-3">
                            <div className="row">

                                <div className="col-lg-7 mx-4">
                                    <h5 className="leavereq">Select Start Month and  Year </h5>
                                    <div className="row">
                                        <div className="col-lg-5">
                                            <select class="form-select form-select-sm" aria-label=".form-select-sm example">
                                                <option selected>Select Month</option>
                                                <option value="1">January</option>
                                                <option value="2">February</option>
                                                <option value="3">March</option>
                                                <option value="3">April</option>
                                                <option value="1">May</option>
                                                <option value="2">June</option>
                                                <option value="3">July</option>
                                                <option value="3">August</option>
                                                <option value="1">September</option>
                                                <option value="2">October</option>
                                                <option value="3">November</option>
                                                <option value="3">December</option>
                                            </select>
                                        </div>
                                        <div className="col-lg-5">
                                            <select class="form-select form-select-sm" aria-label=".form-select-sm example">
                                                <option selected>Select Year</option>
                                                <option value="1">2025</option>
                                                <option value="2">2024</option>
                                                <option value="3">2023</option>
                                                <option value="1">2022</option>
                                                <option value="2">2021</option>
                                                <option value="3">2020</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-1"></div>
                                <div className="col-lg-4">

                                    <button onClick={toggleTable} className='edit-btn'>fetch</button>

                                </div>
                            </div>
                            <br />
                            <div className='row mt-3'>
                                <div className='col-lg-4 mx-4'>

                                </div>
                            </div>



                        </div>
                    </div>
                </div>
                {
                    tableState && (
                        <div className='row mt-4'>
                            <div className='col-lg-4'></div>
                            <div className='col-lg-4'></div>
                            <div className='col-lg-4'>
                                <button className='EditDelteBTN'>export to excel</button>
                            </div>


                            <table className='table table-striped mt-5'>
                                <thead className='bg-info text-white'>
                                    <tr>
                                        <th>Last Name</th>
                                        <th>First Name</th>
                                        <th>PhilHealth No</th>
                                        <th>Actual Salary</th>
                                        <th>Base Monthly salary</th>
                                        <th>Birth Date</th>
                                        <th>Employee Share</th>
                                    </tr>
                                </thead>
                            </table>
                        </div>
                    )
                }
            </div>
        </Layout>
    )
}

export default RFreport
