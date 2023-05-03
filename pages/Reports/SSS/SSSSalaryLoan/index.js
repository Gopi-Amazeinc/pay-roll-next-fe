import React, { useState } from 'react'
import Layout from '@/components/layout/layout.js';

const SSSLoanReport = () => {
    let [tableState, setState] = useState(false)

    const toggleTable = () => {
        setState(!tableState)
    }

    return (
        <Layout>
            <div className='container'>
                <div className='card p-3 border-0 shadow mt-3'>
                    <div className='row'>
                        <div className='col-lg-4'></div>
                        <div className='col-lg-4'>
                            <p className='header-style'>SSS SALARY LOAN REPORT</p>
                        </div>
                        <hr />
                        <div className='col-lg-4'></div>
                    </div>

                    <div className='row'>
                        <div className='col-lg-2'></div>
                        <div className='col-lg-2'>
                            <p className='text-dark fw-bold fs-5 text-end'>Select Date Coverage:</p>
                        </div>

                        <div className="col-lg-2">
                            <select className='form-select'>
                                <option>Select Month</option>
                            </select>
                        </div>

                        <div className='col-lg-2'>
                            <select className='form-select'>
                                <option>Select Year</option>
                            </select>
                        </div>
                    </div>

                    <div className='row mt-5'>
                        <div className='col-lg-4'></div>
                        <div className='col-lg-4'>
                            <button onClick={toggleTable} className='EditDelteBTN'>fetch</button>
                        </div>
                        <div className='col-lg-4'></div>
                    </div>
                </div>

                {
                    tableState && (
                        <div className='row mt-4'>
                            <div className='col-lg-4'>Ayala Land, Inc.</div>
                            <div className='col-lg-4'>
                                Billing Month -
                            </div>
                            <div className='col-lg-4'>
                                <button className='EditDelteBTN'>export to excel</button>
                            </div>


                            <table className='table table-striped mt-5'>
                                <thead className='bg-info text-white'>
                                    <tr>
                                        <th>SSS NUMBER</th>
                                        <th>Name of Employee</th>
                                        <th>Loan Type</th>
                                        <th>Loan Date</th>
                                        <th>Principal Amount</th>
                                        <th>Penalty Amount</th>
                                        <th>Amort Amount</th>
                                        <th>Total</th>
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

export default SSSLoanReport