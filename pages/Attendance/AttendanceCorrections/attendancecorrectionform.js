import React from 'react'
import { useForm } from 'react-hook-form';
import Layout from '@/components/layout/layout.js'
import Link from 'next/link';
import axios from 'axios';
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

export default function AttendanceCorrectionform() {

    const { register, handleSubmit, reset, formState: { errors }, } = useForm();
    const [actionType, setActionType] = useState("insert");

    const hostURL = process.env.NEXT_PUBLIC_API_HOST_URL;
    // const [UserID, setUserIDdata] = useState("")

    // useEffect(() => {
    //     let res = sessionStorage.getItem("asd");
    //     setUserIDdata(res)

    // }, []);


    async function onSubmit(data) {
        // const formData = { ...data, Attendance: Attendance };
        // console.log("form data", formData);
        debugger
        await axios.post(hostURL + "Payroll/InsertAttendanceCorrection", data);
        Swal.fire('Data Inserted successfully');
        location.href = "/Attendance/AttendanceCorrections";
        console.log("Inserted data:", data);
    }

    function clearForm(existingData = null) {
        var StafID = sessionStorage.getItem("userID")

        let etty = {
            "StaffID": StafID,
            "SDate": existingData ? existingData.SDate : "",
            "StartTime": existingData ? existingData.StartTime : "",
            "EndTime": existingData ? existingData.EndTime : "",
            "Comment": existingData ? existingData.Comment : "",
        }
        reset(etty);
        setActionType(existingData ? "update" : 'insert');
    }

    useEffect(() => {
        clearForm()
    }, [1])

    return (
        <Layout>
            <div className='container'>
                <h3 className='text-primary fs-5 mt-3 fw-bold'>Add Attendance Correction</h3>
                <div className='card p-3 border-0 shadow-lg '>
                    <form onSubmit={handleSubmit(onSubmit)} >
                        <div className='row'>
                            <div className='col-lg-3'>
                                <p>Select Date <i className='text-danger'>*</i></p>
                                <input type='date' className='form-control' {...register('SDate', { required: true })} />
                                {errors.SDate && (<p className='text-danger mt-2'>Select Valid Date</p>)}
                            </div>
                            <div className='col-lg-3'>
                                <p>Start Time <i className='text-danger'>*</i></p>
                                <input type='time' className='form-control' {...register('StartTime', { required: true })} />
                                {errors.StartTime && (<p className='text-danger mt-2'>Select Valid Start Time</p>)}
                            </div>
                            <div className='col-lg-3'>
                                <p>End Time <i className='text-danger'>*</i></p>
                                <input type='time' className='form-control' {...register('EndTime', { required: true })} />
                                {errors.EndTime && (<p className='text-danger mt-2'>Select Valid End Time</p>)}
                            </div>
                            <div className='col-lg-3'>
                                <p>Comments <i className='text-danger'>*</i></p>
                                <textarea rows={6} className='form-control' {...register('Comment', { required: true })}></textarea>
                                {errors.Comment && (<p className='text-danger mt-2'>Please Enter Comments</p>)}
                            </div>
                        </div>
                        <div className='row mt-5'>
                            <div className='col-lg-8'></div>
                            <div className='col-lg-2'>
                                <Link href="/Attendance/AttendanceCorrections"><button className='close-button'>Cancel</button></Link>
                            </div>
                            <div className='col-lg-2'>
                                <button type='submit' className=' submit-button'>Submit</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </Layout>
    )
}






