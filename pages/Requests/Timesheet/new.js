import React, { useEffect, useState } from 'react'
import Layout from '@/components/layout/layout'
import { useForm } from 'react-hook-form'
import Link from 'next/link';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useRouter } from 'next/router';
import DropZone from "@/pages/SharedComponent/dropzone";
import timesheet from "../../../pages/Requests/Timesheet/timesheet.module.css"

const Timesheetdetails = () => {
    const { register, handleSubmit, reset, formState: { errors }, } = useForm();
    return (
        <div>
            <Layout>
                <h3 className='text-primary fs-5 mt-3 fw-bold'>Timesheet</h3>
                <div className='card px-10 border-0 shadow-lg mt-3'>
                    <form onSubmit={handleSubmit()}>
                        <div className='row'>
                            <div className='col-lg-2'>
                                <p style={{ fontWeight: "500" }}>Date <i className='text-danger'>*</i></p>
                                <input type='date' className='form-control' {...register('Date_Request', { required: true })} />
                            </div>
                            <div className='col-lg-2'>
                                <p style={{ fontWeight: "500" }}>Task <i className='text-danger'>*</i></p>
                                <input type="text" className='form-control' placeholder='task' />
                            </div>
                            <div className='col-lg-2'>
                                <p style={{ fontWeight: "500" }}>Start Time <i className='text-danger'>*</i></p>
                                <input type='time' className='form-control' {...register('Date_Request', { required: true })} />
                            </div>
                            <div className='col-lg-2'>
                                <p style={{ fontWeight: "500" }}>End Time <i className='text-danger'>*</i></p>
                                <input type='time' className='form-control' {...register('Date_Request', { required: true })} />
                            </div>
                            <div className='col-lg-3'>
                                <p style={{ fontWeight: "500" }}>Comments <i className='text-danger'>*</i></p>
                                <textarea className='form-control'></textarea>
                            </div>
                            <div className='col-lg-3'>
                                <p style={{ fontWeight: "500" }}>Attachment</p>
                                <DropZone />
                            </div>
                        </div>
                        <div className='row mt-5'>
                            <div className='col-lg-8'></div>
                            <div className='col-lg-2'>
                                <Link href="/Requests/Timesheet">
                                    <button className={timesheet.addButton}>ADD</button>
                                </Link>
                            </div>
                            <div className='col-lg-2'>
                                <Link href="/Requests/Timesheet">
                                    <button className={timesheet.cancelButton}>CANCEL</button>
                                </Link>
                            </div>
                        </div>
                    </form>
                </div>
            </Layout >
        </div>

    )
}

export default Timesheetdetails