import React from 'react'
import { useDropzone } from 'react-dropzone'
import { useCallback } from 'react'

function EmployeeProfile() {
    const onDrop = useCallback(acceptedFiles => {
        // Do something with the files
    }, [])

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })
    return (
        <div>
            <div className='container'>
                <div className='card mt-4 shadow-lg border-0'>
                    <div className='row mt-2 p-2'>
                        <div className='col-lg-12'>
                            <p>My Information</p>
                            <hr />
                        </div>

                        <div className='col-lg-3'></div>
                        <div className='col-lg-2'>
                            <div className='mb-3'>
                                <span>Title</span><p></p>
                                <select className='form-select'>
                                    <option>Select title</option>
                                </select>
                            </div>

                            <div className='mb-3'>
                                <span>Nick Name</span><p></p>
                                <input type="text" className='form-control' placeholder='Nick Name' />
                            </div>

                            <div className='mb-3'>
                                <span>Gender</span><p></p>
                                <select className='form-select'>
                                    <option>Select Gender</option>
                                </select>
                            </div>

                            <div className='mb-3'>
                                <span>Father Name</span><p></p>
                                <input type="text" className='form-control' placeholder='Father Name' />
                            </div>

                            <div className='mb-3'>
                                <span>Personal Email <i className='text-danger'>*</i></span><p></p>
                                <input type="email" className='form-control' placeholder='Personal Email' />
                            </div>
                        </div>

                        <div className='col-lg-2'>
                            <div className='mb-3'>
                                <span>First Name <i className='text-danger'>*</i></span><p></p>
                                <input type="text" className='form-control' placeholder='First Name' />
                            </div>

                            <div className='mb-3'>
                                <span>Date Of Birth <i className='text-danger'>*</i></span><p></p>
                                <input type="date" className='form-control' />
                            </div>

                            <div className='mb-3'>
                                <span>Maritial Status <i className='text-danger'>*</i></span><p></p>
                                <select className='form-select'>
                                    <option>Select Status</option>
                                </select>
                            </div>

                            <div className='mb-3 Dropzone' {...getRootProps()}>
                                <input {...getInputProps()} />
                                {
                                    isDragActive ?
                                        <p>Drop the files here ...</p> :
                                        <p>Drop files here Only JPG,PNG,JPEG</p>
                                }
                            </div>
                        </div>

                        <div className='col-lg-2'>
                            <div className='mb-3'>
                                <span>Middle Name</span><p></p>
                                <input type="text" className='form-control' placeholder='Middle Name' />
                            </div>

                            <div className='mb-3'>
                                <span>Place of Birth</span><p></p>
                                <input type="text" className='form-control' placeholder='Place of Birth' />
                            </div>
                        </div>

                        <div className='col-lg-2'>
                            <div className='mb-3'>
                                <span>Last Name <i className='text-danger'>*</i></span><p></p>
                                <input type="text" className='form-control' placeholder='Last Name' />
                            </div>

                            <div className='mb-3'>
                                <span>Country of Birth</span><p></p>
                                <select className='form-select'>
                                    <option>Select Country</option>
                                </select>
                            </div>

                            <div className='mb-3'>
                                <span>Mother Name</span><p></p>
                                <input type="text" className='form-control' placeholder='Mother Name' />
                            </div>

                            <div className='mb-3'>
                                <span>Personal Contact Number <i className='text-danger'>*</i></span><p></p>
                                <input type="number" className='form-control' placeholder='Personal Contact Number' />
                            </div>
                        </div>
                    </div>
                </div>

                <div className='card mt-4 shadow-lg border-0'>
                    <div className='row mt-2 p-2'>
                        <div className='col-lg-12'>
                            <p>Ethnicity Information</p>
                            <hr />
                        </div>

                        <div className='col-lg-2'>
                            <div className='mb-3'>
                                <span>Religion</span><p></p>
                                <select className='form-select'>
                                    <option>Select Religion</option>
                                </select>
                            </div>
                        </div>

                        <div className='col-lg-2'>
                            <div className='mb-3'>
                                <span>Citizenship</span><p></p>
                                <input type="text" className='form-control' placeholder='Citizenship' />
                            </div>
                        </div>

                        <div className='col-lg-2'>
                            <div className='mb-3'>
                                <span>Nationality <i className='text-danger'>*</i></span><p></p>
                                <input type="text" className='form-control' placeholder='Nationality' />
                            </div>
                        </div>

                        <div className='col-lg-2'>
                            <div className='mb-3'>
                                <span>Language Spoken</span><p></p>
                                <select className='form-select'>
                                    <option>Select Language</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='card mt-4 shadow-lg border-0'>
                    <div className='row mt-2 p-2'>
                        <div className='col-lg-12'>
                            <p>Health Information</p>
                            <hr />
                        </div>

                        <div className='col-lg-2'>
                            <div className='mb-3'>
                                <span>Blood Type <i className='text-danger'>*</i></span><p></p>
                                <select className='form-select'>
                                    <option>Select Blood Type</option>
                                </select>
                            </div>
                        </div>

                        <div className='col-lg-2'>
                            <div className='mb-3 form-check form-switch'>
                                <span>Is Disable</span><br /><p></p>
                                <input type="checkbox" className='form-check-input ms-3' />
                            </div>
                        </div>

                        <div className='col-lg-2'>
                            <div className='mb-3'>
                                <span>Please Specify <i className='text-danger'>*</i></span><p></p>
                                <input type="text" className='form-control' placeholder='Please Specify' />
                            </div>
                        </div>
                    </div>
                </div>

                <div className='card mt-4 shadow-lg border-0'>
                    <div className='row mt-2 p-2'>
                        <div className='col-lg-12'>
                            <p>Ethnicity Information</p>
                            <hr />
                        </div>

                        <div className='col-lg-2'>
                            <div className='mb-3'>
                                <span>Orginlal BMS <i className='text-danger'>*</i></span><p></p>
                                <input type="text" className='form-control' placeholder='Orginlal BMS' />
                            </div>
                        </div>

                        <div className='col-lg-3'>
                            <div className='mb-3'>
                                <span>Effective date of Orginlal BMS <i className='text-danger'>*</i></span><p></p>
                                <input type="date" className='form-control' />
                            </div>
                        </div>

                        <div className='col-lg-2'>
                            <div className='mb-3'>
                                <span>Previous BMS <i className='text-danger'>*</i></span><p></p>
                                <input type="text" className='form-control' placeholder='Previous BMS' />
                            </div>
                        </div>

                        <div className='col-lg-3'>
                            <div className='mb-3'>
                                <span>Effective date of Previous BMS <i className='text-danger'>*</i></span><p></p>
                                <input type="date" className='form-control' />
                            </div>
                        </div>
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


            </div>
        </div>
    )
}

export default EmployeeProfile