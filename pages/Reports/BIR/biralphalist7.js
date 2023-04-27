import React, { useState } from 'react'
import Layout from '../../../components/layout/layout';
const biralphalist7 = () => {
    let [generateState, setState] = useState(false)

    const toggleState = () => {
        setState(true)
    }
    return (
        <Layout>
            <div className='container'>
                <div className='row'>
                    <div className='col-lg-4'></div>
                    <div className='col-lg-4'>
                        <p className='header-style'>Alpha List 7.0</p>
                    </div>
                    <div className='col-lg-4'></div>
                </div>
                <hr />

                <div className='row'>
                    <div className='col-lg-3'></div>
                    <div className='col-lg-3'>
                        <p className='fw-bold fs-6'>Year</p>
                    </div>
                    <div className='col-lg-2'>
                        <select className='form-select'>
                            <option value="">select Year</option>
                            <option>2020</option>
                            <option>2021</option>
                            <option>2022</option>
                        </select>
                    </div>
                    <div className='col-lg-3'></div>
                </div>


                <div className='row mt-3'>
                    <div className='col-lg-3'></div>
                    <div className='col-lg-3'>
                        <p className='fw-bold fs-6'>Amended Return</p>
                    </div>
                    <div className='col-lg-2'>
                        <select className='form-select'>
                            <option value="">select </option>
                            <option>2020</option>
                            <option>2021</option>
                            <option>2022</option>
                        </select>
                    </div>
                    <div className='col-lg-3'></div>
                </div>


                <table className='table table-striped mt-4'>
                    <thead className='bg-info text-white'>
                        <tr>
                            <th colSpan={2}>Select ALL</th>
                            <th colSpan={4}>ALPHALIST OF EMPLOYEES</th>
                        </tr>
                        <tr>
                            <th>Select</th>
                            <th>Employee ID</th>
                            <th>Name</th>
                            <th>Employee Status</th>
                        </tr>
                    </thead>
                </table>

                <div className='row mt-2'>
                    <div className='col-lg-4'></div>
                    <div className='col-lg-4'>
                        <button onClick={toggleState} className='EditDelteBTN rounded-4'>generate schedule 1</button>
                    </div>
                    <div className='col-lg-4'></div>
                </div>

                {
                    generateState && (
                        <div className="container">
                            <div className='row mt-4'>
                                <div className='col-lg-4'></div>
                                <div className='col-lg-4'></div>
                                <div className='col-lg-4'>
                                    <button className='EditDelteBTN'>convert to pdf</button>
                                </div>
                            </div>

                            <table className='table table-striped mt-4'>
                                <thead className='bg-info text-white'>
                                    <tr>
                                        <th colSpan={2}>Select ALL</th>
                                        <th colSpan={4}>ALPHALIST OF EMPLOYEES</th>
                                    </tr>
                                    <tr>
                                        <th>Seq No.</th>
                                        <th>Name Of The Employees (First Name,Last Name)</th>
                                        <th>Nationality / Resident</th>
                                        <th>Cuurent Employee Status*</th>
                                        <th>Period Of Employement From</th>
                                        <th>Period Of Employement To</th>
                                        <th>Period Of Employement From</th>
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

export default biralphalist7