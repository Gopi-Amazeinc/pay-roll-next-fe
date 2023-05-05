import React, { useState } from 'react'
import Layout from '@/components/layout/layout.js';

const SSSR1Report = () => {
    let [generateState, setState] = useState(false)

    const toggleState = () => {
        setState(true)
    }

    return (
        <Layout>
            <div className='container'>
                <div className='card p-3 border-0 shadow mt-3'>
                    <div className='row'>
                        <div className='col-lg-4'></div>
                        <div className='col-lg-4'>
                            <p className='header-style'>R-5</p>
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
                        <div className='col-lg-2'></div>
                        <div className='col-lg-2'>
                            <p className='text-dark fw-bold fs-5 text-end'>Signatory Person:</p>
                        </div>

                        <div className="col-lg-4">
                            <select className='form-select'>
                                <option>Select Person</option>
                            </select>
                        </div>
                    </div>

                    <div className='row mt-5'>
                        <div className='col-lg-4'></div>
                        <div className='col-lg-4'>
                            <button onClick={toggleState} className='EditDelteBTN'>generate</button>
                        </div>
                        <div className='col-lg-4'></div>
                    </div>

                </div>

                {
                    generateState && (
                        <div className='row mt-4'>
                            <div className='col-lg-4'></div>
                            <div className='col-lg-4'></div>
                            <div className='col-lg-4'>
                                <button className='EditDelteBTN'>export to pdf</button>
                            </div>
                        </div>
                    )
                }
            </div>
        </Layout>
    )
}
export default SSSR1Report