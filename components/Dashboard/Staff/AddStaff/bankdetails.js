import React from 'react'

function BankDetails() {
    return (
        <div className='container'>
            <div className='card rounded-3 shadow-lg border-0 mt-3'>
                <div className='row mt-3 p-3'>
                    <div className='col-lg-12'>
                        <p>Bank Details</p>
                    </div>
                    <hr color='black' />
                </div>

                <div className='row p-4'>
                    <div className='col-lg-2'>
                        <div className='mb-3'>
                            <span>Name of Bank <i className='text-danger'>*</i> </span><p></p>
                            <select className=" form-select" >
                                <option value="1">One</option>
                            </select>
                        </div>
                    </div>

                    <div className='col-lg-3'>
                        <div className='mb-3'>
                            <div className='mb-3'>
                                <span>Account Holder Name <i className='text-danger'>*</i></span><p></p>
                                <input type="text" className='form-control' placeholder='Account Holder Name' />
                            </div>
                        </div>
                    </div>

                    <div className='col-lg-3'>
                        <div className='mb-3'>
                            <span>Bank Account Number <i className='text-danger'>*</i></span><p></p>
                            <input type="text" className='form-control' placeholder='Bank Account Number' />
                        </div>
                    </div>

                    <div className='col-lg-2'>
                        <div className='mb-3'>
                            <span>Account Type <i className='text-danger'>*</i> </span><p></p>
                            <select className=" form-select" >
                                <option value="1">One</option>
                            </select>
                        </div>
                    </div>
                    <div className='col-lg-2'></div>

                    <div className='col-lg-2'>
                        <div className='mb-3'>
                            <span>Branch Name <i className='text-danger'>*</i></span><p></p>
                            <input type="text" className='form-control' />
                        </div>
                    </div>

                    <div className='col-lg-2'>
                        <div className='mb-3'>
                            <span>Branch Address <i className='text-danger'>*</i></span><p></p>
                            <textarea className='form-control'></textarea>
                        </div>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-lg-4'></div>
                    <div className='mt-3 mb-3 col-lg-3'>
                        <button className='btn btn-primary' id='AddButton'>Submit</button>
                    </div>
                    <div className='col-lg-5'></div>
                </div>
            </div>

            <div className='row'>
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

export default BankDetails