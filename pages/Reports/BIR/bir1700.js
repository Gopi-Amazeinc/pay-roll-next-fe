import React, { useState } from 'react'
import Layout from '../../../components/layout/layout';
function Bir1700() {
    let [generateState, setState] = useState(false)

    const toggleState = () => {
        setState(true)
    }
    return (
        <Layout>
            <div className='container'>
                <div className='card border-0 shadow rounded-3 mt-3'>
                    <div className='row'>
                        <div className='col-lg-4'></div>
                        <div className='col-lg-4'>
                            <p className='header-style'>BIR 1700</p>
                        </div>
                        <div className='col-lg-4'></div>
                    </div>
                    <hr />

                    <div className='row'>
                        <div className='col-lg-3'></div>
                        <div className='col-lg-3'>
                            <p className=' fs-6'>Select Year</p>
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
                            <p className=' fs-6'>Signatory Person</p>
                        </div>
                        <div className='col-lg-2'>
                            <select className='form-select'>
                                <option value="">Select</option>
                                <option>HR</option>
                            </select>
                        </div>
                        <div className='col-lg-3'></div>
                    </div>


                    <div className='row mt-3'>
                        <div className='col-lg-3'></div>
                        <div className='col-lg-3'>
                            <p className='fs-6'>Search</p>
                        </div>
                        <div className='col-lg-2'>
                            <input className='form-control' placeholder='Search' />
                        </div>
                        <div className='col-lg-3'></div>
                    </div>


                </div>


                <table className='table table-striped mt-4'>

                    <thead className='bg-info text-white'>
                        <tr>
                            <th colSpan={6}>ALPHALIST OF EMPLOYEES</th>
                        </tr>
                        <tr>
                            <th>Select</th>
                            <th>Employee ID</th>
                            <th>Name</th>
                            <th>Employee Status</th>
                            <th><input type='checkbox' /> Substitute</th>
                            <th>Posting Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><input type="checkbox" /></td>
                            <td>00010348</td>
                            <td>admin s	</td>
                            <td>Active</td>
                            <td><input type='checkbox' /></td>
                            <td>Unposted</td>
                        </tr>
                        <tr>
                            <td><input type="checkbox" /></td>
                            <td>00010348</td>
                            <td>admin s	</td>
                            <td>Active</td>
                            <td><input type='checkbox' /></td>
                            <td>Unposted</td>
                        </tr>
                    </tbody>
                </table>

                <div className='row mt-2'>
                    <div className='col-lg-4'></div>
                    <div className='col-lg-4'></div>
                    <div className='col-lg-2'>
                        <button onClick={toggleState} className='EditDelteBTN'>print</button>
                    </div>
                    <div className='col-lg-2'></div>
                </div>

                {
                    generateState && (
                        <div className='row mt-4'>
                            <div className='col-lg-4'></div>
                            <div className='col-lg-4'></div>
                            <div className='col-lg-4'>
                                <button className='EditDelteBTN'>convert to pdf</button>
                            </div>
                        </div>
                    )
                }
            </div>
        </Layout>
    )
}

export default Bir1700