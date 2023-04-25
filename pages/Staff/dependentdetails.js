import React from 'react'
import { useDropzone } from 'react-dropzone'
import { useCallback } from 'react'

function DependentDetails() {
    const onDrop = useCallback(acceptedFiles => {
        // Do something with the files
    }, [])

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })
    return (
        <div className='container'>
            <div className='card rounded-3 shadow-lg border-0 mt-3'>
                <div className='row mt-3 p-3'>
                    <div className='col-lg-12'>
                        <p>Dependent Details</p>
                    </div>
                    <hr color='black' />
                </div>

                <div className='row p-4'>
                    <div className='col-lg-2'>
                        <div className='mb-3'>
                            <span>Department Name <i className='text-danger'>*</i></span><p></p>
                            <input type="text" className='form-control' placeholder='Department Name ' />
                        </div>
                    </div>

                    <div className='col-lg-2'>
                        <div className='mb-3'>
                            <span>Relationship <i className='text-danger'>*</i></span><p></p>
                            <select className=" form-select" >
                                <option value="1">One</option>
                            </select>
                        </div>
                    </div>

                    <div className='col-lg-2'>
                        <div className='mb-3'>
                            <span>Gender <i className='text-danger'>*</i></span><p></p>
                            <select className=" form-select" >
                                <option value="1">One</option>
                            </select>
                        </div>
                    </div>

                    <div className='col-lg-2'>
                        <div className='mb-3'>
                            <span>Date Of Birth </span><p></p>
                            <input type="date" className="form-control" />
                        </div>
                    </div>

                    <div className='col-lg-2'>
                        <span>Attachment <i className='text-danger'>*</i></span><p></p>
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
                            <th>Dependent Name</th>
                            <th>Relationship</th>
                            <th>Gender</th>
                            <th>Date Of Birth</th>
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

export default DependentDetails