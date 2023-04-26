import Link from 'next/link';
import React from 'react';

const MyTeamAttendence = () => {
    return (
        <div>
            <div className='container'>
                <div className='row mt-3'>
                    <div className='col-lg-3 text-end'>
                        <Link className='Heading active' href="/Attendence/attendencedetails">My Attendence Details</Link>
                    </div>
                </div>

                <div className='card p-3 border-0 shadow-lg rounded-3 mt-4'>
                    <div className='row'>
                        <div className='col-lg-1'>
                            <p>Filter By</p>
                        </div>

                        <div className='col-lg-2'>
                            <p>Start Date</p>
                            <input type="date" className='form-control' />
                        </div>

                        <div className='col-lg-2'>
                            <p>End Date</p>
                            <input type="date" className='form-control' />
                        </div>

                        <div className='col-lg-2'>
                            <p>Staff<i className='text-danger'>*</i></p>
                            <select className='form-select'>
                                <option>Select Staff</option>
                            </select>
                        </div>

                        <div className='col-lg-2'>
                            <p>Search<i className='text-danger'>*</i></p>
                            <input type="text" className='form-control' placeholder='Search' />
                        </div>

                        <div className='col-lg-3'>
                            <button className='btn btn-primary' id='AddButton'>Upload</button><br /><p></p>
                            <button className='btn btn-primary' id='AddButton'>Export To Excel</button>
                        </div>
                    </div>
                </div>

                <table className='table table-hover mt-2 '>
                    <thead className='bg-info text-white '>
                        <tr>
                            <th>Date</th>
                            <th>Staff Name</th>
                            <th>Position</th>
                            <th>Department</th>
                            <th>Sign in Type</th>
                            <th>Expected in Time</th>
                            <th>Punch in Time</th>
                            <th>Punch in Location/IP Address</th>
                            <th>Punched in From</th>
                            <th>Sign in Type</th>
                            <th>Expected Out Time</th>
                        </tr>
                    </thead>
                </table>
            </div>
        </div>
    );
}

export default MyTeamAttendence;
