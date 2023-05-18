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
            <div>
                <p id={Styles.p}>Support Tickets</p>
                <div id={Styles.card} className='card p-3 shadow-lg'>
                    <div className='row'>
                        <div className='col-lg-3'>
                            <label>Date <span id={Styles.span}>*</span></label>
                            <input type="date" data-date="" data-date-format="DD MMMM YYYY" value="2015-08-09" className='form-control form-control-md mt-3' disabled />
    
                        </div>
                        <div className='col-lg-3'>
                            <label>Time<span id={Styles.span}>*</span></label>
                            <input type="time" className='form-control form-control-md mt-3' />
                        </div>
                        <div className='col-lg-3'>
                            <label>Type of Issues<span id={Styles.span}>*</span></label>
                            <select className="form-select form-select-md mt-3  ">
                                <option value="0" disabled>Select Issue</option>
                                <option value="UI Issue">UI Issue</option>
                                <option value="Data Issue">Data Issue</option>
                                <option value="Functionality Issue">Functionality Issue</option>
                            </select>
                        </div>
                        <div className='col-lg-3'>
                            <label>Priority<span id={Styles.span}>*</span></label>
                            <select className='form-select form-select-md mt-3'>
                                <option disabled >Select Priority Type </option>
                                <option >P1</option>
                                <option >P2</option>
                                <option >P3</option>
                            </select>
                        </div>
                    </div>
                    <div className='row mt-5'>
                        <div className='col-lg-3'>
                            <label>Upload Issue Images <span id={Styles.span}>*</span> </label>
                            <div className='mt-3' {...getRootProps()} id={Styles.Dropzone}>
                                <input {...getInputProps()} />
                                {
                                    isDragActive ?
                                        <p></p> :
                                        <p id={Styles.dropzoneText} >Please Attach Photo! </p>
                                }
                            </div>
    
                        </div>
                        <div className='col-lg-4'>
                            <label>Comments <span id={Styles.span}>*</span></label>
                            <textarea rows="3" type="text" placeholder='Comments' className='form-control mt-3'></textarea>
                        </div>
    
                    </div>
                    <div className='row mt-3'>
                        <div className='col-lg-7'></div>
                        <div className='col-lg-2'>
                            <button id={Styles.SaveButton}>Save</button></div>
                        <div className='col-lg-2'>
                            <Link href="/SupportTickets"> <button id={Styles.CancelButton}>Cancel</button></Link>
                        </div>
                    </div>
    
                </div>
    
            </div>
            </Layout>
        )
}

export default Supportform;
