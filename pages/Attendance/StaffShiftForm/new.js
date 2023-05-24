import React, { useEffect, useState } from 'react';
import Layout from '@/components/layout/layout.js'
import Link from 'next/link';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { useRouter } from "next/router";
import { apiService } from "@/services/api.service";


const New = () => {
    const [staffshift, setStaffShift] = useState([]);
    const router = useRouter();
    // const [selectedOption, setSelectedOption] = useState('');
    const { register, handleSubmit, watch, reset, formState } = useForm();
    const { errors } = formState;

    const [endDate, setEndDate] = useState('');

    const getShiftname = async () => {
        const res = await apiService.commonGetCall("Master/GetShiftMaster");
        setStaffShift(res.data)
    }

    let [startTime, setStartTime] = useState("");
    let [endTime, setEndTime] = useState("");
    const getshiftTimings = (event) => {
        console.log(event.target.value);
        const [startTime, endTime] = event.target.value.split(',');
        setStartTime(startTime)
        setEndTime(endTime)
    }
    function clearForm() {
        let UserID = sessionStorage.getItem("userID")
        let details = {
            "StaffID": UserID,
            "ShiftDate": "",
            "ShiftName": "",
            "StartTime": "",
            "EndTime": "",
            "EndDate": "",
        }
        reset(details);
    }
    const onSubmit = async (data) => {
        await apiService.commonPostCall("HR/InsertStaffShiftDetails", data);
        Swal.fire("Added successfully!");
        // console.log(data);
        router.push("/Attendance/ShiftDetails")
    }

    useEffect(() => {
        clearForm()
        getShiftname();
    }, [])


    const handleEndDateChange = (e) => {
        const endDateValue = new Date(e.target.value);
        const startDateValue = new Date();

        if (endDateValue < startDateValue) {
            Swal.fire("End Date should be greater than Start Date");
        } else {
            setEndDate(e.target.value);
        }
    };

    return (
        <Layout>
            <div className="row">
                <div className="col-lg-12">
                    <h3 className='Heading'>Add Shift Details</h3>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="card shadow-lg mt-3" style={{ padding: "15px" }}>
                        <div className="row">


                            <div className="col-lg-2">
                                <label htmlFor=""><b>Start Date</b></label>
                                <input type="date" name="" id="" className='form-control'  {...register("ShiftDate", { required: true })} />
                                {
                                    errors.startDate && <p className='text-danger'> Start Date is Required</p>
                                }
                            </div>

                            <div className="col-lg-2">
                                <label htmlFor=""><b>End Date</b></label>
                                <input type="date" name="" id="" className='form-control'
                                    {...register("EndDate", { required: true })}
                                    onChange={handleEndDateChange}
                                />
                            </div>
                            <div className="col-lg-2">
                                <label htmlFor=""><b>ShiftName</b></label>
                                <select name="" id="" className='form-select' {...register('ShiftName')} onChange={getshiftTimings} >
                                    < option   >Select</option>
                                    {
                                        staffshift.map((data, index) => {
                                            return (
                                                <option key={index} value={`${data.starttime},${data.endtime}`} >{data.description}</option>
                                            )
                                        })
                                    }


                                </select>

                            </div>
                            <div className="col-lg-2">
                                <label htmlFor=""><b>Start Time</b></label>
                                <input type="text" {...register('StartTime', { required: true })} value={startTime} className='form-control' disabled />

                            </div>
                            <div className="col-lg-2">
                                <label htmlFor=""><b>End Time</b></label>
                                <input type="text" name='' {...register('EndTime', { required: true })} value={endTime} className='form-control' disabled />

                            </div>
                        </div>
                        <br />
                        <div className="row">
                            <div className="col-lg-8"></div>

                            <div className="col-lg-2">
                                <Link href="/Attendance/ShiftDetails"> <button className='button'>Cancel</button></Link>

                            </div>
                            <div className="col-lg-2">
                                <button className='button'>Submit</button>
                            </div>
                        </div>
                    </div>
                </form>

            </div>
        </Layout>
    );
}

export default New;
