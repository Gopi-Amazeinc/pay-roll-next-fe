import React from 'react'
import Link from 'next/link'
// import Styles from '../styles/SupportTickets.module.css'
import Styles from "./supportTickets.module.css"
import { useCallback } from 'react'
import { useDropzone } from "react-dropzone"
import Layout from '@/components/layout/layout'

const Supportform = () => {
    const onDrop = useCallback(acceptedFiles => {
        // Do something with the files
    }, [])
    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })
    return (
        <Layout>
            <div className="container-fluid">
                <br />
                <div className="row">
                    <div className="col-lg-12">
                        <p id={Styles.p}>Support Tickets</p>
                    </div>
                </div>
                <div className="row">
                    <div className="co-lg-12">
                    <div class="shadow-lg p-3 bg-white rounded">
                        <div className="row">
                            <div className="col-lg-3">
                            <label>Date </label>
                            <input type="date" className='form-control' />
                            </div>
                            <div className="col-lg-3">
                                <label>Time</label>
                                <input type="time" className='form-control' />

                            </div>
                            <div className="col-lg-3">
                            <label>Type of Issues</label>
                            <select className="form-select form-select-md  ">
                                <option value="0" enebled>Select Issue</option>
                                <option value="UI Issue">UI Issue</option>
                                <option value="Data Issue">Data Issue</option>
                                <option value="Functionality Issue">Functionality Issue</option>
                            </select>

                            </div>
                            <div className="col-lg-3">
                            <label>Priority<span id={Styles.span}>*</span></label>
                            <select className="form-select form-select-md  ">
                                <option value="0" enebled>Select Priority Type</option>
                                <option value="UI Issue">UI Issue</option>
                                <option value="Data Issue">Data Issue</option>
                                <option value="Functionality Issue">Functionality Issue</option>
                            </select>
                            </div>
                        </div>

                        <br/>
                        <div className="row">
                            <div className="col-lg-3">
                            {/* <label>Upload Issue Images <span id={Styles.span}>*</span> </label> */}
                            <label>Upload Issue Images</label>
                            <div className='mt-2'  {...getRootProps()} id={Styles.Dropzone}>
                                <input {...getInputProps()} />
                                {
                                    isDragActive ?
                                        <p></p> :
                                        <p id={Styles.dropzoneText} >Please Attach Photo! </p>
                                }
                            </div>
                            </div>
                            <div className="col-lg-3">
                            <label>Comments </label>
                            <textarea rows="3" type="text" placeholder='Comments' className='form-control '></textarea>
                            </div>
                        </div>
                        <br />

                        <div className="row">
                            <div className="col-lg-6"></div>
                            <div className="col-lg-3">
                            <button id={Styles.SaveButton}>Save</button>
                            </div>
                            <div className="col-lg-3">
                            <Link href="/SupportTickets"> <button id={Styles.CancelButton}>Cancel</button></Link>
                            </div>
                        </div>

                    </div>
                    </div>
                </div>

            </div>

        </Layout>
    )
}

export default Supportform;
