import { useDropzone } from 'react-dropzone'
import { useCallback } from 'react'

function IDDetails() {
    const onDrop = useCallback(acceptedFiles => {
        // Do something with the files
    }, [])

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })
    return (
        <div className='container'>
            <div className='card rounded-3 shadow-lg border-0 mt-3'>
                <div className='row mt-3 p-3'>
                    <div className='col-lg-12'>
                        <p>ID Details</p>
                    </div>
                    <hr color='black' />
                </div>

                <div className='row p-4'>
                    <div className='col-lg-2'>
                        <div className='mb-3'>
                            <span>ID Type <i className='text-danger'>*</i> </span><p></p>
                            <select className=" form-select" >
                                <option value="1">One</option>
                            </select>
                        </div>
                    </div>

                    <div className='col-lg-2'>
                        <div className='mb-3'>
                            <span>ID Number <i className='text-danger'>*</i></span><p></p>
                            <input type="number" className='form-control' placeholder='ID Number' />
                        </div>
                    </div>

                    <div className='col-lg-3'>
                        <div className='mb-3'>
                            <span>Name on Document</span><p></p>
                            <input type="text" className='form-control' placeholder='Name on Document' />
                        </div>
                    </div>

                    <div className='col-lg-2'>
                        <div className='mb-3'>
                            <span>Issue Date</span><p></p>
                            <input type="date" className="form-control" />
                        </div>
                    </div>
                    <div className='col-lg-2'>
                        <div className='mb-3'>
                            <span>Expiry Date<i className='text-danger'>*</i></span><p></p>
                            <input type="date" className="form-control" />
                        </div>
                    </div>
                    <div className='col-lg-2'>
                        <div className='mb-3'>
                            <span>Issuing Authority</span><p></p>
                            <input type="text" className='form-control' placeholder='Issuing Authority' />
                        </div>
                    </div>

                    <div className='col-lg-2'>
                        <div className='mb-3'>
                            <span>Place of Issue</span><p></p>
                            <input type="text" className='form-control' placeholder='Place of Issue' />
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
                            <th>ID Type</th>
                            <th>ID Number</th>
                            <th>Name on Document</th>
                            <th>Issue Date</th>
                            <th>Expiry Date</th>
                            <th>Issuing Authority</th>
                            <th>Place of Issue</th>
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

export default IDDetails