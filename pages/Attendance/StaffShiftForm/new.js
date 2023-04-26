import React from 'react';
import Layout from '@/components/layout/layout.js'
import Link from 'next/link';

const New = () => {
    return (
        <Layout>
            <div className="row">
                <div className="col-lg-12">
                    <h3>Add Shift Details</h3>
                </div>
                <div className="card shadow-lg mt-3">
                    <div className="row">


                        <div className="col-lg-2">
                            <label htmlFor="">Start Date</label>
                            <input type="date" name="" id="" className='form-control' />
                        </div>
                        <div className="col-lg-2">
                            <label htmlFor="">End Date</label>
                            <input type="date" name="" id="" className='form-control' />
                        </div>
                        <div className="col-lg-2">
                            <label htmlFor="">ShiftName</label>
                            <select name="" id="" className='form-control'>
                                <option value="" disabled>Select Shift</option>
                                <option value="" >01:00 pm 10:00 pm</option>
                                <option value="" >01:00 pm 10:00 pm</option>


                            </select>
                        </div>
                        <div className="col-lg-2">
                            <label htmlFor="">Start Time</label>
                            <input type="time" name="" id="" disabled className='form-control' />
                        </div>
                        <div className="col-lg-2">
                            <label htmlFor="">End Time</label>
                            <input type="eime" name="" id="" disabled className='form-control' />
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


            </div>
        </Layout>
    );
}

export default New;
