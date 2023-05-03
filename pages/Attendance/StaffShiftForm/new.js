import React, { useEffect, useState } from 'react';
import Layout from '@/components/layout/layout.js'
import Link from 'next/link';
import axios from 'axios';
import { useForm } from 'react-hook-form';
const New = () => {
    const [staffshift, setStaffShift] = useState([]);
    // const [selectedOption, setSelectedOption] = useState('');
    const { register, handleSubmit, watch, reset, formState } = useForm();
    const { errors } = formState;

    const getShiftname = async () => {
        let hostURL = process.env.NEXT_PUBLIC_API_HOST_URL;
        const res = await axios.get(hostURL + 'Master/GetShiftMaster')
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
    useEffect(() => {
        getShiftname();
    }, [])

    return (
        <Layout>
            <div className="row">
                <div className="col-lg-12">
                    <h3 className='Heading'>Add Shift Details</h3>
                </div>
                <form>
                    <div className="card shadow-lg mt-3">
                        <div className="row">


                            <div className="col-lg-2">
                                <label htmlFor="">Start Date</label>
                                <input type="date" name="" id="" className='form-control' {...register("startDate", { required: true })} />
                                {
                                    errors.startDate && <p className='text-danger'> Start Date is Required</p>
                                }
                            </div>

                            <div className="col-lg-2">
                                <label htmlFor="">End Date</label>
                                <input type="date" name="" id="" className='form-control'  {...register("endDate", { required: true })} />
                                {
                                    errors.endDate && <p className='text-danger'> End Date is Required</p>
                                }
                            </div>
                            <div className="col-lg-2">
                                <label htmlFor="">ShiftName</label>
                                <select name="" id="" className='form-select' onChange={getshiftTimings}  {...register("shiftName", { required: true })}>
                                    < option >Select</option>
                                    {
                                        staffshift.map((data, index) => {
                                            return (
                                                <option key={index} value={`${data.starttime},${data.endtime},${data.id}`} >{data.description}</option>
                                            )
                                        })
                                    }
                                    {
                                        errors.shiftName && <p className='text-danger'> Shift Name is Required</p>
                                    }

                                </select>
                            </div>
                            <div className="col-lg-2">
                                <label htmlFor="">Start Time</label>
                                <input type="text" value={startTime} disabled className='form-control'  {...register("startTime", { required: true })} />
                                {
                                    errors.startTime && <p className='text-danger'> Start Time is Required</p>
                                }
                            </div>
                            <div className="col-lg-2">
                                <label htmlFor="">End Time</label>
                                <input type="text" value={endTime} disabled className='form-control'   {...register("endTime", { required: true })} />
                                {
                                    errors.endTime && <p className='text-danger'> End Time is Required</p>
                                }
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
