// import Layout from 'Components/layout/layout.js';
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import axios from 'axios'
// import Styles from '../../styles/shiftdetails.module.css'
const shiftdetails = () => {
    const [shiftDetails, setShiftDetails] = useState([])
    let hostURL = process.env.NEXT_PUBLIC_API_HOST_URL;
    let staffID;

    const getShiftDetails = async () => {
        staffID = sessionStorage.getItem("userID")
        const { data } = await axios.get(hostURL + "HR/GetStaffShiftDetailsByband?staffID=" + staffID)
        console.log(data)
        setShiftDetails(data);
    }
    useEffect(() => {
        getShiftDetails();
    }, [])
    return (
     <>
            <Link href="/Attendence/shiftdetails">My Weekly Shift</Link>
            {/* <div className={'card shadow-lg p-2 mt-3 mb-3 ' + Styles.card}> */}
            <div className='row'>
                <div className='col-lg-3'>
                    <p >START DATE <span >*</span></p>
                    <input type='date' className='form-control form-control-sm' />
                </div>
                <div className='col-lg-3'>
                    <p >END DATE <span >*</span></p>
                    <input type='date' className='form-control form-control-sm' />
                </div>
            </div>
            {/* </div> */}
            <div className='row mt-3'>
                <table >
                    <thead>
                        <tr className='bg-info text-white'>
                            <th>START DATE</th>
                            <th>END DATE</th>
                            <th>SHIFT NAME</th>
                            <th>START TIME</th>
                            <th>END TIME</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            shiftDetails.map((data) => {
                                return (
                                    <tr>
                                        <td>{data.shiftDate}</td>
                                        <td>{data.endDate}</td>
                                        <td>{data.shiftName}</td>
                                        <td>{data.startTime}</td>
                                        <td>{data.endTime}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </>)
}

export default shiftdetails