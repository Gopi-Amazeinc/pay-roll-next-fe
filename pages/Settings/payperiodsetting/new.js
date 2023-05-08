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
            <div>
                <h3 className='Heading  mt-3'>Pay Period Settings</h3>
                <div className='container-fluid'>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className='row  mt-4 shadow-lg rounded-3 p-3 '>
                            <div className='col-lg-3 mt-4'>
                                <p className='fw-bold'>Pay Code<i className='text-danger'>*</i></p>
                                <input type="text" placeholder='Pay Code' className='form-control' {...register('PayCode', { required: true })} />
                            </div>

                            <div className='col-lg-3 mt-4'>
                                <p className='fw-bold'>Pay Period<i className='text-danger'>*</i></p>
                                <select className='form-select' {...register('PayPeriod', { required: true })}>
                                    <option value="" disabled >Select Pay Period</option>
                                    <option>Semi Pay Period1</option>
                                    <option>Semi Pay Period2</option>
                                </select>
                            </div>

                            <div className='col-lg-3 mt-4'>
                                <p className='fw-bold'>Attendace Coverage Start Date<i className='text-danger'>*</i></p>
                                <input type="date" className='form-control' placeholder='Effective Date' {...register('AttendanceCoverageStartdate', { required: true })} />
                            </div>

                            <div className='col-lg-3 mt-4'>
                                <p className='fw-bold'>Attendace Coverage End Date<i className='text-danger'>*</i></p>
                                <input type="date" className='form-control' placeholder='Effective Date' {...register('AttendanceCoverageEndDate', { required: true })} />
                            </div>

                            <div className='col-lg-3 mt-4'>
                                <p className='fw-bold'>Payroll Start Date<i className='text-danger'>*</i></p>
                                <input type="date" className='form-control' placeholder='Effective Date' {...register('PayrollStartDate', { required: true })} />
                            </div>

                            <div className='col-lg-3 mt-4'>
                                <p className='fw-bold'>Payroll End Date<i className='text-danger'>*</i></p>
                                <input type="date" className='form-control' placeholder='Effective Date' {...register('PayrollEndDate', { required: true })} />
                            </div>

                            <div className='col-lg-3 mt-4'>
                                <p className='fw-bold'>Payroll Run Type<i className='text-danger'>*</i></p>
                                <select className='form-select' {...register('PayrollRunType', { required: true })}>
                                    <option value="" disabled >Select PayRoll RunType</option>
                                    <option>NormalRun</option>
                                </select>
                            </div>
                            <div className='col-lg-3 mt-4'>
                                <p className='fw-bold'>Pay Date<i className='text-danger'>*</i></p>
                                <input type="date" className='form-control' placeholder='Effective Date' {...register('PayDate', { required: true })} />
                            </div>

                            <div className='col-lg-3 mt-4'>
                                <p className='fw-bold'>Comments<i className='text-danger'>*</i></p>
                                <textarea className='form-control' placeholder='Comments' {...register('Comments', { required: true })}></textarea>
                            </div>

                            <div className='col-lg-6'></div>

                            <div className="col-lg-11">

                                <button type='submit' className={Styles.submitBtn} style={{ float: "right" }}>Submit</button>

                                <Link href="/Settings/payperiodsetting"><button className={Styles.submitBtn} style={{ float: "right", marginLeft: "5px" }} tabindex="0">CANCEL</button></Link>
                            </div>

                        </div>
                    </form>
                </div>
            </div>
        </Layout>
    )
}

