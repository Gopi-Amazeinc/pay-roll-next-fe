import React from 'react'
import { useDropzone } from 'react-dropzone'
import { useCallback } from 'react'

function EducationalAttainment() {
    const onDrop = useCallback(acceptedFiles => {
        // Do something with the files
    }, [])

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })
    return (
        <div className='container'>
            <div className='card rounded-3 shadow-lg border-0 mt-3'>
                <div className='row mt-3 p-3'>
                    <div className='col-lg-12'>
                        <p>Educational Attainment</p>
                    </div>
                    <hr color='black' />
                </div>

                <div className='row p-4'>
                    <div className='col-lg-2'>
                        <div className='mb-3'>
                            <span> Education Type <i className='text-danger'>*</i> </span><p></p>
                            <select className=" form-select" >
                                <option value="1">One</option>
                            </select>
                        </div>
                    </div>

                    <div className='col-lg-2'>
                        <div className='mb-3'>
                            <span> Course <i className='text-danger'>*</i> </span><p></p>
                            <select className=" form-select" >
                                <option value="1">One</option>
                            </select>
                        </div>
                    </div>

                    <div className='col-lg-2'>
                        <div className='mb-3'>
                            <span>Major <i className='text-danger'>*</i></span><p></p>
                            <select className=" form-select" >
                                <option value="1">One</option>
                            </select>
                        </div>
                    </div>

                    <div className='col-lg-2'>
                        <div className='mb-3'>
                            <span>School Name</span><p></p>
                            <input type="text" className='form-control' placeholder='School Name' />
                        </div>
                    </div>
                    <div className='col-lg-2'>
                        <div className='mb-3'>
                            <span>Licenses/Certifications</span><p></p>
                            <input type="text" className='form-control' placeholder='Licenses/Certifications' />
                        </div>
                    </div>


                    <div className='col-lg-2'>
                        <div className='mb-3'>
                            <span>Country </span><p></p>
                            <select className=" form-select" >
                                <option value="1">One</option>
                            </select>
                        </div>
                    </div>

                    <div className='col-lg-2'>
                        <div className='mb-3'>
                            <span>Start Date</span><p></p>
                            <input type="date" className="form-control" />
                        </div>
                    </div>
                    <div className='col-lg-2'>
                        <div className='mb-3'>
                            <span>End Date</span><p></p>
                            <input type="date" className="form-control" />
                        </div>
                    </div>

                    <div className='col-lg-2'>
                        <span>Attachment </span><p></p>
                        <div className='mb-3 Dropzone' {...getRootProps()}>
                            <input {...getInputProps()} />
                            {
                                isDragActive ?
                                    <p>Drop the files here ...</p> :
                                    <p className='ms-4'>Drop files here</p>
                            }
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
                <table className='table table-hover mb-5'>
                    <thead className='bg-info text-white '>
                        <tr>
                            <th>Education Type</th>
                            <th>Course</th>
                            <th>Major</th>
                            <th>School Name</th>
                            <th>Licenses/Certifications</th>
                            <th>Country</th>
                            <th>Start Date</th>
                            <th>End Date</th>
                            <th>Attachment</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                </table>
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

export default EducationalAttainment
