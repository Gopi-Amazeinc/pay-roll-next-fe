import React from 'react'

import { DownloadTableExcel } from 'react-export-table-to-excel';
import { useRef } from 'react';
import Link from 'next/link';


function ComponentMaster() {

    const tableRef = useRef(null);

    return (

        <div>
            <h2>Yet to bind</h2>
            <h5 className='mt-3 Heading' >  Component Master Dashboard</h5>
            <div className='container-fluid mt-3'>
                <div className='card p-3 shadow-lg rounded-4'>
                    <div className='row'>

                        <div className='col-lg-1'>
                            <p>Filter By</p>
                        </div>
                        <div className='col-lg-4'>
                            <input type="text" placeholder='Search...' className='form-control form-control-sm' />
                        </div>
                        <div className='col-lg-9'></div>
                    </div>
                </div>

                <div className='row mt-4'>
                    <div className='col-lg-9'></div>
                    <div className='col-lg-2'>
                        <div>
                            <DownloadTableExcel
                                filename="Attendance Report"
                                sheet="users"
                                currentTableRef={tableRef.current}
                            >    <button  className='btn btn-primary btn-sm'>EXPORT TO EXCEL</button>
                            </DownloadTableExcel>
                        </div>

                    </div>
                    <div className='col-lg-1'>
                        <Link href="/Settings/componentmaster/new"> <button className='btn btn-primary AddButton'>ADD NEW
                        </button></Link>

                    </div>
                </div>
                <br />

                <table className='table table-sm table-striped rounded-4 text-center table' ref={tableRef}>
                    <thead>
                        <tr className='bg-info text-white tr'>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <td>ASSOCIATE MANAGER ALLOWANCE</td>
                        <td>	ASSOCIATE MANAGER ALLOWANCE</td>
                        <td>
                            <button className='btn btn-sm edit-btn' >EDIT</button>
                            <br />
                            <button className='btn btn-sm mt-2 edit-btn' >DELETE</button>
                        </td>
                        <tr>
                            <td>Other Allowance</td>
                            <td>		Other Allowance</td>
                            <td>
                                <button className='btn btn-sm edit-btn' >EDIT</button>
                                <br />
                                <button className='btn btn-sm mt-2 edit-btn' >DELETE</button>
                            </td>
                        </tr>
                        <tr>
                            <td>SUNDAY PREMIUM</td>
                            <td>	SUNDAY PREMIUM</td>
                            <td>
                                <button className='btn btn-sm edit-btn' >EDIT</button>
                                <br />
                                <button className='btn btn-sm mt-2 edit-btn' >DELETE</button>
                            </td>
                        </tr>
                        <tr>
                            <td>SUNDAY PREMIUM</td>
                            <td>	SUNDAY PREMIUM</td>
                            <td>
                                <button className='btn btn-sm edit-btn' >EDIT</button>
                                <br />
                                <button className='btn btn-sm mt-2 edit-btn' >DELETE</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        
    )
}
export default ComponentMaster