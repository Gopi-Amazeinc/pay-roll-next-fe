import React from 'react'
import { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import Layout from '@/components/layout/layout.js';
import Styles from '../../../styles/payperiodsettingform.module.css'
export default function PayPeriodSettingform({ editData }) {

    const hostURL = process.env.NEXT_PUBLIC_API_HOST_URL;
    const { register, handleSubmit, reset, formState } = useForm();
    const { errors } = formState;

    async function onSubmit(data) {
        await axios.post(hostURL + "Payroll/InsertPayPeriodSetting", data);
        Swal.fire('data inserted successfully')
        console.log("Inserted data:", data);
        location.href = '/Settings/payperiodsetting';
    }

    return (
        <Layout>
            < div className='container-fluid'>

                <label className='Heading'>Pagibig Form</label>
                <br /><br />
                <div className='row'>
                    <div className='col-lg-12'>
                        <div className='card p-3 border-0  rounded-3'>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className='row '>
                                    <div className='col-lg-3 '>
                                        <label className='fw-bold'>Pay Code<i className='text-danger'>*</i></label>
                                        <input type="text" placeholder='Pay Code' className='form-control' {...register('PayCode', { required: true })} />
                                        <br></br>
                                    </div>

                                    <div className='col-lg-3 '>
                                        <label className='fw-bold'>Pay Period<i className='text-danger'>*</i></label>
                                        <select className='form-select' {...register('PayPeriod', { required: true })}>
                                            <option value="" disabled >Select Pay Period</option>
                                            <option>Semi Pay Period1</option>
                                            <option>Semi Pay Period2</option>
                                        </select>
                                    </div>

                                    <div className='col-lg-3 '>
                                        <label className='fw-bold'>Attendace Coverage Start Date<i className='text-danger'>*</i></label>
                                        <input type="date" className='form-control' placeholder='Effective Date' {...register('AttendanceCoverageStartdate', { required: true })} />
                                    </div>

                                    <div className='col-lg-3 '>
                                        <label className='fw-bold'>Attendace Coverage End Date<i className='text-danger'>*</i></label>
                                        <input type="date" className='form-control' placeholder='Effective Date' {...register('AttendanceCoverageEndDate', { required: true })} />
                                    </div>

                                    <div className='col-lg-3 '>
                                        <label className='fw-bold'>Payroll Start Date<i className='text-danger'>*</i></label>
                                        <input type="date" className='form-control' placeholder='Effective Date' {...register('PayrollStartDate', { required: true })} />
                                    </div>

                                    <div className='col-lg-3 '>
                                        <label className='fw-bold'>Payroll End Date<i className='text-danger'>*</i></label>
                                        <input type="date" className='form-control' placeholder='Effective Date' {...register('PayrollEndDate', { required: true })} />
                                    </div>

                                    <div className='col-lg-3 '>
                                        <label className='fw-bold'>Payroll Run Type<i className='text-danger'>*</i></label>
                                        <select className='form-select' {...register('PayrollRunType', { required: true })}>
                                            <option value="" disabled >Select PayRoll RunType</option>
                                            <option>NormalRun</option>
                                        </select>
                                    </div>
                                    <div className='col-lg-3 '>
                                        <label className='fw-bold'>Pay Date<i className='text-danger'>*</i></label>
                                        <input type="date" className='form-control' placeholder='Effective Date' {...register('PayDate', { required: true })} />
                                   <br/>
                                    </div>

                                    <div className='col-lg-3 '>
                                        <label className='fw-bold'>Comments<i className='text-danger'>*</i></label>
                                        <textarea className='form-control' placeholder='Comments' {...register('Comments', { required: true })}></textarea>
                                    </div>

                                    <br />
                                    <div className="row ">
                                        <div className="col-lg-8"></div>
                                        <div className="col-lg-2">
                                            <button type='submit' className='AddButton' style={{ float: "right" }}>Submit</button>
                                        </div>
                                        <div className='col-lg-2'>
                                            <Link href="/Settings/payperiodsetting"><button className='AddButton' style={{ float: "right", marginLeft: "5px" }} tabIndex="0">CANCEL</button></Link>
                                        </div>

                                    </div>   </div>
                            </form>

                        </div>
                    </div>
                </div>
            </div>

        </Layout>
    )
}

