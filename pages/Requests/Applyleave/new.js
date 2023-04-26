import Layout from "@/components/layout/layout"
import Link from "next/link";
import ApplyLeaveDashboard from '@/components/Dashboard/Requests/Applyleave/index';
import React, { useEffect, useState } from 'react'
import axios from "axios";

// import Astyle from 'styles//Requests//applyleave.module.css';
import { BsArrowLeftSquare } from 'react-icons/bs'
import DropZone from "@/pages/SharedComponent/dropzone";
import { useForm } from 'react-hook-form';

 const ApplyLeave =()=> {
    const hostURL = process.env.NEXT_PUBLIC_API_HOST_URL;
    const [leavetype, setLeaveType] = useState([])
    const getDropdowndata = async () => {
        const res = await axios.get(hostURL + "Master/GetLeaveType");
        setLeaveType(res.data);
    }
    useEffect(() => {
        getDropdowndata()
    }, []);
    return (
        <Layout>
            <Link href="/Requests/leavelistdashboard" > <BsArrowLeftSquare /> Leave</Link >
            <div className='card p-3 border-0 shadow-lg  mt-4'>
                <div className='row'>
                    <div className="col-lg-12">
                        <h3 >Leave Requests</h3>
                        <hr />
                    </div>
                    <div className="col-lg-2">
                        <label htmlFor="">Leave Type<i className='text-danger'>*</i> </label>
                        <select id="Department" name="Department" className='form-select'>
                            <option value="" disabled="">
                                Select Leave Type </option>
                            {
                                leavetype.map((data, index) => {
                                    return (
                                        <option value={data.id} key={data.id}>{data.short}</option>
                                    )
                                })
                            }
                        </select>
                    </div>
                    <div className="col-lg-2">
                        <label htmlFor="">Leave Reason<i className='text-danger'>*</i> </label>
                        <textarea cols="20" rows="1" className="form-control" placeholder="Leave Reason"></textarea>
                    </div>
                    <div className="col-lg-2">
                        <label htmlFor="">Start Date<i className='text-danger'>*</i></label>
                        <input type="date" className="form-control" />
                    </div>
                    <div className="col-lg-2">
                        <label htmlFor="">End Date<i className='text-danger'>*</i></label>
                        <input type="date" className="form-control" />
                    </div>
                    <div className="col-lg-2">
                        <label htmlFor="">Covering Staff <i className='text-danger'>*</i></label>
                        <input type="text" className="form-control" placeholder="Covering Staff" />
                    </div>
                </div>
                <br />
                <div className="row">
                    <div className="col-lg-12">
                        <label htmlFor="">Attachment</label>
                        <div className="col-lg-2">
                            <DropZone />

                        </div>
                    </div>
                    <div className="col-lg-10">
                        <button className="submit-button">SAVE</button>
                        <Link href="/Requests/leavelistdashboard"><button className="close-button">CANCEL</button></Link>
                    </div>
                </div>
            </div><br />
            <ApplyLeaveDashboard></ApplyLeaveDashboard>

        </Layout>
    )
}
export default ApplyLeave;