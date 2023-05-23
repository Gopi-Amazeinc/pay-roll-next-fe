import React, { useEffect, useState } from 'react'
import Layout from '@/components/layout/layout'
import { useForm } from 'react-hook-form'
import Link from 'next/link';
import Swal from 'sweetalert2';
import { useRouter } from 'next/router';
import { apiService } from "@/services/api.service";

const Compensationtimeoutform = () => {
    const router = useRouter();

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { register, handleSubmit, reset, formState: { errors }, } = useForm();
    const [actionType, setActionType] = useState("insert")

    const onSubmit = async (data) => {
        if (actionType == "insert") {
            // debugger
            await apiService.commonPostCall("/Payroll/InsertCompensationTimeOut", data)
            // router.push("/Requests/compensationtimeout")
            router.push("/Requests/Compensationtimeout");
            Swal.fire({
                icon: 'success',
                title: 'Added Successfully',
            })
        }
    }

    function clearForm(existingData = null) {
        var StaffID = sessionStorage.getItem("userID");
        let etty = {
            "StaffID": StaffID,
            "Date_Request": existingData ? existingData.Date_Request : "",
            "Actuval_StartTime": existingData ? existingData.Actuval_StartTime : "",
            "Actuval_EndTime": existingData ? existingData.Actuval_EndTime : "",
            "Comments": existingData ? existingData.Comments : "",
            "Status": 'Manager Pending',
        }
        reset(etty)
        setActionType(existingData ? "update" : "insert")
    }

    useEffect(() => {
        clearForm()

    }, [1])


    return (
        <Layout>
            <div className='container-fluid'>
                <div className='row'>
                    <div className='col-lg-12'>
                        <label className='Heading'>Add Compensation</label><br /><br />
                        <div className='card p-3 border-0 shadow-lg '>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className='row'>
                                    <div className='col-lg-3'>
                                        <label style={{ fontWeight: "bold" }}>Date Request <i className='text-danger'>*</i></label>
                                        <input type='date' className='form-control' {...register('Date_Request', { required: "Select Valid Date" })} />
                                        {errors.Date_Request && <p className="error-message" style={{ color: "red" }}>{errors.Date_Request.message}</p>}
                                    </div>
                                    <div className='col-lg-3'>
                                        <label style={{ fontWeight: "bold" }}>Start Time <i className='text-danger'>*</i></label>
                                        <input type='time' className='form-control' {...register('Actuval_StartTime', { required: "Select Valid Start Time" })} />
                                        {errors.Actuval_StartTime && <p className="error-message" style={{ color: "red" }}>{errors.Actuval_StartTime.message}</p>}
                                    </div>
                                    <div className='col-lg-3'>
                                        <label style={{ fontWeight: "bold" }}>End Time <i className='text-danger'>*</i></label>
                                        <input type='time' className='form-control' {...register('Actuval_EndTime', { required: "Select Valid End Time" })} />
                                        {errors.Actuval_EndTime && <p className="error-message" style={{ color: "red" }}>{errors.Actuval_EndTime.message}</p>}
                                    </div>
                                    <div className='col-lg-3'>
                                        <label style={{ fontWeight: "bold" }}>Comments <i className='text-danger'>*</i></label>
                                        <textarea rows={6} className='form-control' {...register('Comments', { required: "Please Enter Comments" })}></textarea>
                                        {errors.Comments && <p className="error-message" style={{ color: "red" }}>{errors.Comments.message}</p>}
                                    </div>
                                </div><br /><br />
                                <div className='row'>
                                    <div className='col-lg-8'></div>
                                    <div className='col-lg-2'>
                                        <Link href="/Requests/Compensationtimeout"><button className='submit-button'>Cancel</button></Link>
                                    </div>
                                    <div className='col-lg-2'>
                                        <button type='submit' className=' submit-button'>Submit</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Compensationtimeoutform
