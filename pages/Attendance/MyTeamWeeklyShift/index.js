import React from 'react';
import Layout from '@/components/layout/layout.js'
import Link from 'next/link';
import { useEffect, useState } from 'react'

const Index = () => {

    const [myTeamshiftDetails, setmyTeamshiftDetails] = useState([])
    let hostURL = process.env.NEXT_PUBLIC_API_HOST_URL;

    return (
        <Layout>
            <div className='row mt-3'>
                <div className='col-lg-3 text-end'>
                    <Link href="/Attendance/shiftdetails" className='Heading active' > My Weekly Shift</Link>
                </div>
                <div className='col-lg-3'>
                    <Link href="/Attendance/MyTeamWeeklyShift" className='Heading active'> My Team Weekly Shift</Link>
                </div>
            </div>
            <div className='card shadow-lg p-4 rounded-3 mt-4'>
                <div className='row'>
                    <div className='col-lg-3'>
                        <p >START DATE <span >*</span></p>
                        <input type='date' className='form-control form-control-sm' />
                    </div>
                    <div className='col-lg-3'>
                        <p >END DATE <span >*</span></p>
                        <input type='date' className='form-control form-control-sm' />
                    </div>
                    <div className="col-lg-4 mt-4">
                        <input type="text" className='form-control' placeholder='Serach For Band' />
                        {/* <Link href="/Attendance/StaffShiftForm/new" ><button className='button'>Add Shift Details</button></Link> */}
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-lg-9"></div>
                <div className="col-lg-3 mt-3">
                    <Link href="/Attendance/StaffShiftForm/new" ><button className='button'>Add Shift Details</button></Link>
                </div>
            </div>
            <div className='row mt-3'>
                <table className='table table-striped mt-3'  >
                    <thead>
                        <tr className='bg-info text-white'>
                            <th>BAND</th>
                            <th>START DATE</th>
                            <th>END DATE</th>
                            <th>SHIFT NAME</th>
                            <th>START TIME</th>
                            <th>END TIME</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            myTeamshiftDetails.map((data) => {
                                return (
                                    <tr key={data.id}>
                                        <td>{data.Band}</td>
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


        </Layout >
    );
}

export default Index;
