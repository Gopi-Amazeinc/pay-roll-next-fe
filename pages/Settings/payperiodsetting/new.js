import React from 'react'
import { useEffect, useState } from 'react';
import { apiService } from "@/services/api.service";
import Swal from 'sweetalert2';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import Layout from '@/components/layout/layout.js';
import { useRouter } from "next/router"
import Styles from '../../../styles/payperiodsettingform.module.css'
export default function PayPeriodSettingform({ editData }) {


    const { register, handleSubmit, reset, formState } = useForm();
    const { errors } = formState;
    const [actionType, setActionType] = useState("insert");
    const router = useRouter();
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
        setActionType(payperiodsetting ? "update" : "insert");
    }
    useEffect(() => {
        const { id } = editData || {};
        if (id) {

            getData(id);
        } else {
            clearForm();
        }
    }, []);
    const getData = async (id) => {
        const res = await apiService.commonGetCall(
            "Payroll/GetPayPeriodSettingByID?ID=" + id
        );
        clearForm(res.data[0]);
    };
    const onSubmit = async (data) => {
        if (actionType == "insert") {
            await apiService.commonPostCall("Payroll/InsertPayPeriodSetting", data) // inserting new division master data [Shashank]
            router.push('/Settings/payperiodsetting');
            Swal.fire({
                icon: 'success',
                title: 'Added Successfully',
            })
        } else {
            await apiService.commonPostCall("Payroll/UpdatePayPeriodSetting", data); // this is for updating or Modifiying the data using  Update Api call
            Swal.fire('Updated successfully')
            router.push('/Settings/payperiodsetting');
        }
    };




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
                                        <input type="text" placeholder='Pay Code' className='form-control' {...register('PayCode', { required: "This Field is required"})} />
                                        {errors.PayPeriod && <p className="PayCode" style={{ color: "red" }}>{errors.PayCode.message}</p>}
                                        <br></br>
                                    </div>

                                    <div className='col-lg-3 '>
                                        <label className='fw-bold'>Pay Period<i className='text-danger'>*</i></label>
                                        <select className='form-select' {...register('PayPeriod', { required: "This Field is required"})}>
                                            <option value="" disabled >Select Pay Period</option>
                                            <option>Semi Pay Period1</option>
                                            <option>Semi Pay Period2</option>
                                        </select>
                                        {errors.PayPeriod && <p className="error-message" style={{ color: "red" }}>{errors.PayPeriod.message}</p>}
                                    </div>

                                    <div className='col-lg-3 '>
                                        <label className='fw-bold'>Attendace Coverage Start Date<i className='text-danger'>*</i></label>
                                        <input type="date" className='form-control' placeholder='Effective Date' {...register('AttendanceCoverageStartdate', { required: "This Field is required" })} />
                                        {errors.AttendanceCoverageStartdate && <p className="error-message" style={{ color: "red" }}>{errors.AttendanceCoverageStartdate.message}</p>}
                                    </div>

                                    <div className='col-lg-3 '>
                                        <label className='fw-bold'>Attendace Coverage End Date<i className='text-danger'>*</i></label>
                                        <input type="date" className='form-control' placeholder='Effective Date' {...register('AttendanceCoverageEndDate', { required:"This Field is required" })} />
                                        {errors.AttendanceCoverageEndDate && <p className="error-message" style={{ color: "red" }}>{errors.AttendanceCoverageEndDate.message}</p>}
                                    </div>

                                    <div className='col-lg-3 '>
                                        <label className='fw-bold'>Payroll Start Date<i className='text-danger'>*</i></label>
                                        <input type="date" className='form-control' placeholder='Effective Date' {...register('PayrollStartDate', { required: "This Field is required"})} />
                                        {errors.PayrollStartDate && <p className="error-message" style={{ color: "red" }}>{errors.PayrollStartDate.message}</p>}
                                    </div>

                                    <div className='col-lg-3 '>
                                        <label className='fw-bold'>Payroll End Date<i className='text-danger'>*</i></label>
                                        <input type="date" className='form-control' placeholder='Effective Date' {...register('PayrollEndDate', { required: "This Field is required"})} />
                                        {errors.PayrollEndDate && <p className="error-message" style={{ color: "red" }}>{errors.PayrollEndDate.message}</p>}
                                    </div>

                                    <div className='col-lg-3 '>
                                        <label className='fw-bold'>Payroll Run Type<i className='text-danger'>*</i></label>
                                        <select className='form-select' {...register('PayrollRunType', { required: "This Field is required"})}>
                                            <option value="" disabled >Select PayRoll RunType</option>
                                            <option>NormalRun</option>
                                            {errors.PayrollRunType && <p className="error-message" style={{ color: "red" }}>{errors.PayrollRunType.message}</p>}
                                        </select>
                                    </div>
                                    <div className='col-lg-3 '>
                                        <label className='fw-bold'>Pay Date<i className='text-danger'>*</i></label>
                                        <input type="date" className='form-control' placeholder='Effective Date' {...register('PayDate', { required: "This Field is required" })} />
                                        {errors.PayDate && <p className="error-message" style={{ color: "red" }}>{errors.PayDate.message}</p>}
                                        <br />
                                    </div>

                                    <div className='col-lg-3 '>
                                        <label className='fw-bold'>Comments<i className='text-danger'>*</i></label>
                                        <textarea className='form-control' placeholder='Comments' {...register('Comments', { required: "This Field is required" })}></textarea>
                                        {errors.Comments && <p className="error-message" style={{ color: "red" }}>{errors.Comments.message}</p>}
                                    </div>

                                    <br />
                                    <div className="row ">
                                        <div className="col-lg-8"></div>

                                        <div className='col-lg-2'>
                                            <Link href="/Settings/payperiodsetting"><button className='AddButton' style={{ float: "right", marginLeft: "5px" }} tabIndex="0">CANCEL</button></Link>
                                        </div>
                                        <div className='col-lg-2'>
                                            {
                                                actionType == "insert" && (
                                                    <button type='submit' className="AddButton" >Save</button>
                                                )
                                            }
                                            {
                                                actionType == "update" && (
                                                    <button type='submit' className="AddButton" >Update</button>
                                                )
                                            }
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

