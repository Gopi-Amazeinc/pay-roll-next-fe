import React from 'react'
import { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useForm } from 'react-hook-form';
import Link from 'next/link';

export default function PayPeriodSettingform() {

    const hostURL = process.env.NEXT_PUBLIC_API_HOST_URL;
    const { register, handleSubmit, reset, formState } = useForm();
    const { errors } = formState;

    const [actionType, setActionType] = useState("insert");


    useEffect(() => {
        const GetPayperiodsettingByID = async () => {
            debugger;
            const id = sessionStorage.getItem("id");
            if (id) {
                const response = await axios.get(hostURL + "Payroll/GetPayPeriodSettingByID?ID=" + id);
                clearForm(response.data[0]);
            } else {
                clearForm();
            }
        };
        GetPayperiodsettingByID();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [1]);

    function clearForm(payperiodsetting = null) {
        let details = {
            "ID": payperiodsetting ? payperiodsetting.id : "",
            "PayCode": payperiodsetting ? payperiodsetting.payCode : "",
            "PayPeriod": payperiodsetting ? payperiodsetting.payPeriod : "",
            "AttendanceCoverageStartdate": payperiodsetting ? payperiodsetting.attendanceCoverageStartdate : "",
            "AttendanceCoverageEndDate": payperiodsetting ? payperiodsetting.attendanceCoverageEndDate : "",
            "PayrollStartDate": payperiodsetting ? payperiodsetting.payrollStartDate : "",
            "PayrollEndDate": payperiodsetting ? payperiodsetting.payrollEndDate : "",
            "PayrollRunType": payperiodsetting ? payperiodsetting.payrollRunType : "",
            "PayDate": payperiodsetting ? payperiodsetting.payDate : "",
            "Comments": payperiodsetting ? payperiodsetting.comments : "",
        }
        reset(details);
        setActionType(payperiodsetting ? "update" : 'insert')
    }

    async function onSubmit(data) {
        if (actionType == "insert") {
            await axios.post(hostURL + "Payroll/InsertPayPeriodSetting", data);
            Swal.fire('data inserted successfully')
            console.log("Inserted data:", data);
        }
        else {
            await axios.post(hostURL + "Payroll/UpdatePayPeriodSetting", data);
            Swal.fire('Data Updated successfully')
        }
    }

    return (
        
            <div>
                <h3 className='text-primary fs-5 mt-3'>Pay Period Settings</h3>
                <div className='container-fluid'>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className='row  mt-4 shadow-lg rounded-3 p-3 '>
                            <div className='col-lg-3 mt-4'>
                                <p>Pay Code<i className='text-danger'>*</i></p>
                                <input type="text" placeholder='Pay Code' className='form-control' {...register('PayCode', { required: true })} />
                            </div>

                            <div className='col-lg-3 mt-4'>
                                <p>Pay Period<i className='text-danger'>*</i></p>
                                <select className='form-select' {...register('PayPeriod', { required: true })}>
                                    <option value="" disabled >Select Pay Period</option>
                                    <option>Semi Pay Period1</option>
                                    <option>Semi Pay Period2</option>
                                </select>
                            </div>

                            <div className='col-lg-3 mt-4'>
                                <p>Attendace Coverage Start Date<i className='text-danger'>*</i></p>
                                <input type="date" className='form-control' placeholder='Effective Date' {...register('AttendanceCoverageStartdate', { required: true })} />
                            </div>

                            <div className='col-lg-3 mt-4'>
                                <p>Attendace Coverage End Date<i className='text-danger'>*</i></p>
                                <input type="date" className='form-control' placeholder='Effective Date' {...register('AttendanceCoverageEndDate', { required: true })} />
                            </div>

                            <div className='col-lg-3 mt-4'>
                                <p>Payroll Start Date<i className='text-danger'>*</i></p>
                                <input type="date" className='form-control' placeholder='Effective Date' {...register('PayrollStartDate', { required: true })} />
                            </div>

                            <div className='col-lg-3 mt-4'>
                                <p>Payroll End Date<i className='text-danger'>*</i></p>
                                <input type="date" className='form-control' placeholder='Effective Date' {...register('PayrollEndDate', { required: true })} />
                            </div>

                            <div className='col-lg-3 mt-4'>
                                <p>Payroll Run Type<i className='text-danger'>*</i></p>
                                <select className='form-select' {...register('PayrollRunType', { required: true })}>
                                    <option value="" disabled >Select PayRoll RunType</option>
                                    <option>NormalRun</option>
                                </select>
                            </div>
                            <div className='col-lg-3 mt-4'>
                                <p>Pay Date<i className='text-danger'>*</i></p>
                                <input type="date" className='form-control' placeholder='Effective Date' {...register('PayDate', { required: true })} />
                            </div>

                            <div className='col-lg-3 mt-4'>
                                <p>Comments<i className='text-danger'>*</i></p>
                                <textarea className='form-control' placeholder='Comments' {...register('Comments', { required: true })}></textarea>
                            </div>

                            <div className='col-lg-6'></div>

                            <div className="col-lg-11">
                                <Link href="/Settings/payperiodsetting"><button className='btn btn-primary' style={{ float: "right", marginLeft: "5px" }} tabindex="0">CANCEL</button></Link>
                                {
                                    actionType == "insert" && (
                                        <button type='submit' className='btn btn-primary' style={{ float: "right" }}>Save</button>
                                    )
                                }
                                {
                                    actionType == "update" && (
                                        <button type='submit' className='btn btn-primary' style={{ float: "right" }}>Update</button>
                                    )
                                }
                            </div>

                        </div>
                    </form>
                </div>
            </div>
        
    )
}

