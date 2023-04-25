import React from 'react'

function ContactDetails() {
    return (
        <div className='container'>
            <div className='card shadow-lg p-3 mt-3 rounded-3' >
                <div className='row'>
                    <p >Contact Details</p>
                </div>

                <div className='row'>
                    <hr />
                    <div className='col-lg-2 '>
                        <label className='mt-3' >Address Type 1 <span >*</span></label> <br />
                        <select className='form-select form-select-md mt-3'>
                            <option>Current</option>
                            <option>Permanent</option>
                        </select>

                    </div>
                    <div className='col-lg-3'>
                        <label className='mt-3' >Address line 1  <span >*</span> </label> <br />
                        <input type="text" className='form-control form-control-md  mt-3' placeholder='Address line 1 ' />
                    </div>
                    <div className='col-lg-3'>
                        <label className='mt-3'>Address line 2 </label> <br />
                        <input type="text" className='form-control form-control-md mt-3' placeholder='Address line 1 ' />
                    </div>
                </div>
                <div className='row'>
                    <div className='col-lg-2'>
                        <label className='mt-3'>Country  <span >*</span> </label> <br />
                        <select className='form-select form-select-md mt-3'>
                            <option>UNITED STATES</option>
                            <option>INDIA</option>
                        </select>

                    </div>
                    <div className='col-lg-2'>
                        <label className='mt-3'>Province</label> <br />
                        <select className='form-select form-select-md mt-3'>
                            <option>Current</option>
                            <option>Permanent</option>
                        </select>


                    </div>
                    <div className='col-lg-2'>
                        <label className='mt-3'>City</label> <br />
                        <select className='form-select form-select-md mt-3'>
                            <option>Bangalore</option>
                            <option>Mysore</option>
                        </select>


                    </div>
                    <div className='col-lg-2'>
                        <label className='mt-3'>Barangay </label>
                        <select className='form-select form-select-md mt-3 '>
                            <option>Current</option>
                            <option>Permanent</option>
                        </select>
                    </div>
                    <div className='col-lg-2'>
                        <label className='mt-3'>Postcode</label>
                        <input type="text" placeholder='Postcode' className='form-control form-control-md mt-3' />
                    </div>
                    <div className='col-lg-2'>
                        <label className='mt-3'>Personal Contact No</label>
                        <input type="text" placeholder='Personal Contact No' className='form-control form-control-md mt-3' />
                    </div>


                </div>
                <div className='row'>
                    <div className='col-lg-2'>
                        <label className='mt-3'>Address Type 2</label> <br />
                        <select className='form-select form-select-md mt-3'>
                            <option>Current</option>
                            <option>Permanent</option>
                        </select>

                    </div>
                    <div className='col-lg-3'>
                        <label className='mt-3'>Address line 1 </label> <br />
                        <input type="text" className='form-control form-control-md mt-3' placeholder='Address line 1 ' />
                    </div>
                    <div className='col-lg-3'>
                        <label className='mt-3'>Address line 2 </label> <br />
                        <input type="text" className='form-control form-control-md mt-3' placeholder='Address line 1 ' />
                    </div>
                </div>
                <div className='row'>
                    <div className='col-lg-2'>
                        <label className='mt-3'>Country</label> <br />
                        <select className='form-select form-select-md mt-3'>
                            <option>INDIA</option>
                            <option>Permanent</option>
                        </select>

                    </div>
                    <div className='col-lg-2'>
                        <label className='mt-3'>Province</label> <br />
                        <select className='form-select form-select-md mt-3'>
                            <option>Current</option>
                            <option>Permanent</option>
                        </select>


                    </div>
                    <div className='col-lg-2'>
                        <label className='mt-3'>City</label> <br />
                        <select className='form-select form-select-md mt-3'>
                            <option>Current</option>
                            <option>Permanent</option>
                        </select>


                    </div>
                    <div className='col-lg-2'>
                        <label className='mt-3'>Barangay </label>
                        <select className='form-select form-select-md mt-3 '>
                            <option>Current</option>
                            <option>Permanent</option>
                        </select>
                    </div>
                    <div className='col-lg-2'>
                        <label className='mt-3'>Postcode</label>
                        <input type="text" placeholder='Postcode' className='form-control form-control-md mt-3' />
                    </div>
                </div>

                <label className='mt-4 mb-2'>Emergency Contact</label>
                <hr />
                <div className='row '>
                    <div className='col-lg-2'>
                        <label className='mt-3'>Contact Name  <span >*</span> </label>
                        <input type="text" placeholder='Contact Name' className='form-control mt-3' />
                    </div>
                    <div className='col-lg-2'>
                        <label className='mt-3'>Contact Relationship</label>
                        <input type="text" placeholder='Contact Relationship' className='form-control mt-3' />
                    </div>
                    <div className='col-lg-2'>
                        <label className='mt-3'>Mobile Number

                        </label>
                        <input type="text" placeholder='Mobile Number' className='form-control mt-3' />
                    </div>
                    <div className='col-lg-2'>
                        <label className='mt-3'>Contact Address  </label>
                        <input type="text" placeholder='Contact Address' className='form-control mt-3' />
                    </div>
                </div>
                <div className='row'>
                    <div className='col-lg-2'>
                        <label className='mt-3'>Landline Number</label>
                        <input type="text" placeholder='Landline Number' className='form-control form-control-md mt-3' />
                    </div>
                    <div className='col-lg-2'>
                        <label className='mt-3'>Email-ID</label>
                        <input type="text" placeholder='Email-ID' className='form-control form-control-md mt-3' />
                    </div>
                </div>
                <div className='row'>
                    <div className='col-lg-6'></div>
                    <div className='col-lg-2'>
                        <button className='btn btn-primary' id='AddButton'>SUBMIT</button>
                    </div>
                </div>

            </div>

        </div >
    )
}

export default ContactDetails