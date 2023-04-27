import React, { useState } from 'react'
import Layout from '../../../components/layout/layout';

const Bir1604cf = () => {
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
                            <p className='header-style'>1604-CF</p>
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
                            <p className='fw-bold fs-6'>Amended Return?</p>
                        </div>
                        <div className='col-lg-2'>
                            <div className='form-check form-check-inline'>
                                <label className='form-check-label'>Yes</label>
                                <input className='form-check-input' type='radio' name='Amended Return' />
                            </div>

                            <div className='form-check form-check-inline'>
                                <label className='form-check-label'>No</label>
                                <input className='form-check-input' type='radio' name='Amended Return' />
                            </div>
                        </div>
                        <div className='col-lg-3'></div>
                    </div>


                    <div className='row mt-3'>
                        <div className='col-lg-3'></div>
                        <div className='col-lg-3'>
                            <p className='fw-bold fs-6'>Signatory Person</p>
                        </div>
                        <div className='col-lg-2'>
                            <select className='form-select'>
                                <option value="">select </option>
                                <option>HR</option>
                                <option>Admin</option>
                            </select>
                        </div>
                        <div className='col-lg-3'></div>
                    </div>

                    <div className='row mt-2'>
                        <div className='col-lg-4'></div>
                        <div className='col-lg-4'>
                            <button onClick={toggleState} className='EditDelteBTN'>generate</button>
                        </div>
                    </div>
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

export default Bir1604cf