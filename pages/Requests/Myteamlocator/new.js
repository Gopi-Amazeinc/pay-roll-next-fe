import React from 'react'
import Layout from '@/Components/layout'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import Styles from "../../styles/Requests/locatordashboard.module.css";
import { BsCheckCircleFill } from 'react-icons/bs'
import { RxCrossCircled } from 'react-icons/rx'
import Swal from 'sweetalert2';
import Myteamlocatordashboard from '@/components/Dashboard/Requests/Myteamlocator';

const MyteamLocatordetails = ({ editData }) =>{

    const hostURL = process.env.NEXT_PUBLIC_API_HOST_URL;
    const [Stafflocator, setStafflocator] = useState([]);
    const [ApprovedStafflocatorrequests, setApprovedStafflocatorrequests] = useState([]);
    const [RejectedStafflocatorRequests, setRejectedStafflocatorRequests] = useState([]);
    const [selectedRows, setSelectedRows] = useState([]);


    const getStafflocator = async () => {
        let res = await axios.get(hostURL + "Payroll/GetLocatorRequests");
        setStafflocator(res.data);
        res = await axios.get(hostURL + "Payroll/GetApprovedStaffLocatorRequests");
        setApprovedStafflocatorrequests(res.data);
        res = await axios.get(hostURL + "Payroll/GetRejectStaffLocatorRequests");
        setRejectedStafflocatorRequests(res.data);
    }

    useEffect(() => {
        getStafflocator()
    }, [1])



    

    return (
        <Layout>
            <p>Here Aprroved and Rejected APi or Pending </p>
            <div className='row mt-3'>
                <div className='col-lg-3 text-end'>
                    <Link className='Heading active' href="/Requests/Locatorrequest">My OBASIS Details</Link>
                </div>
                <div className='col-lg-3'>
                    <Link className='Heading active' href="/Requests/Myteamlocator">Company OBASIS Details</Link>
                </div>
            </div> <br />
            <div className='card p-3 border-0 shadow-lg rounded-3 mt-4'>
                <div className='row'>
                    <div className='col-lg-1'>
                        <p>Filter By</p>
                    </div>

                    <div className='col-lg-3'>
                        <p>From Date</p>
                        <input type="date" className='form-control' />
                    </div>

                    <div className='col-lg-3'>
                        <p>To Date</p>
                        <input type="date" className='form-control' />
                    </div>

                    <div className='col-lg-4'><br /><p></p>
                        <input type="text" className='form-control' placeholder="Search For date ,or Status" />
                    </div>
                    <br />

                </div>
            </div>
            <br />
            <Myteamlocatordashboard></Myteamlocatordashboard>
           
        </Layout>
    )
}
export default MyteamLocatordetails
