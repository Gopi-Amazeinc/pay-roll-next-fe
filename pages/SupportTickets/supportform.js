import React from 'react'
import Link from 'next/link'
// import Styles from '../styles/SupportTickets.module.css'
import Styles from "./supportTickets.module.css"
import { useCallback } from 'react'
import { useDropzone } from "react-dropzone"
import Layout from '@/components/layout/layout'
import { useForm } from "react-hook-form";
const Supportform = () => {
    const onDrop = useCallback(acceptedFiles => {
        // Do something with the files
    }, [])
    const { register, handleSubmit, watch, reset, formState: { errors }, } = useForm();
    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })
    const customStyles = {
        content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
            width: "60%",
        },
        errorMsg: {
            fontSize: "12px",
            fontWeight: "500",
            color: "red",
        },
        inputLabel: {
            fontSize: "16px",
        },
    };
    const onSubmit = async () => { }

    return (
        <Layout>
            <div className="container-fluid">
                <br />
                <div className="row">
                    <div className="col-lg-12">
                        <p id={Styles.p}>Support Tickets</p>
                    </div>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="row">
                        <div className="co-lg-12">
                            <div class="shadow-lg p-3 bg-white rounded">
                                <div className="row">
                                    <div className="col-lg-3">
                                        <label>Date </label>
                                        <input type="date" className='form-control'   {...register("date", {
                                            required: true
                                        })} />
                                        <div className="error-message" style={customStyles.errorMsg}>

                                            {errors.date?.type === 'required' &&
                                                " Please enter Date"}
                                        </div>
                                    </div>
                                    <div className="col-lg-3">
                                        <label>Time</label>
                                        <input type="time" className='form-control' {...register("time", {
                                            required: true
                                        })} />
                                        <div className="error-message" style={customStyles.errorMsg}>

                                            {errors.time?.type === 'required' &&
                                                " Please enter time"}
                                        </div>
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

                                <br />
                                <div className="row">
                                    <div className="col-lg-3">
                                        {/* <label>Upload Issue Images <span id={Styles.span}>*</span> </label> */}
                                        <label>Upload Issue Images</label>
                                        <div className='mt-2'  {...getRootProps()} id={Styles.Dropzone}>
                                            <input {...getInputProps()} {...register("drop", {
                                                required: true
                                            })} />
                                            {
                                                isDragActive ?
                                                    <p></p> :
                                                    <p id={Styles.dropzoneText} >Please Attach Photo! </p>
                                            }
                                        </div> <div className="error-message" style={customStyles.errorMsg}>

                                            {errors.drop?.type === 'required' &&
                                                " Please enter file"}
                                        </div>
                                    </div>
                                    <div className="col-lg-3">
                                        <label>Comments </label>
                                        <textarea rows="3" type="text" placeholder='Comments' className='form-control'minLength={10}{...register("Comments", {
                                            required: true
                                        })} />
                                        <div className="error-message" style={customStyles.errorMsg}>

                                            {errors.Comments?.type === 'required' &&
                                                " Please enter comment"}
                                        </div>
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
                </form>
            </div>

        </Layout>
    )
}

export default Supportform;
