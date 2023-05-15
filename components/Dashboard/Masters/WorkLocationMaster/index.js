import Link from 'next/link'
import React from 'react'

import { useEffect, useState } from "react";

import axios from "axios";
import Swal from 'sweetalert2'

function WorkLocationMasterDash() {

    const [workLocation, setWorkLocationData] = useState([]);
    let hostURL = process.env.NEXT_PUBLIC_API_HOST_URL;

    useEffect(() => {
        getData();
    }, []);

    async function getData() {
        let res = await axios.get(
            hostURL + "Master/GetWorkingLocationMaster"     //naveen.th@amazeinc.in, Get API for Working location master dashboard, to fetch data
        );
        setWorkLocationData(res.data);
    }
    const deleteWorkLocation = async (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                axios.get(hostURL + "Master/DeleteWorkingLocationMaster?ID=" + id); //naveen.th@amazeinc.in, Delete API for Working location master, to delete data by ID
                getData()
            }
        });

    }
    return (

        <div>
            <h3 className=' Heading'>Worklocation Master</h3>
            <div className='card p-3 border-0 shadow rounded-3 mt-3 mx-0'>
                <div className='row'>
                    <div className='col-lg-1'>
                        <p>Filter By</p>
                    </div>
                    <div className='col-lg-5'>
                        <input type="text" className='form-control' placeholder='Search...' />
                    </div>
                </div>
            </div>
            <div className='row mt-3'>
                <div className='col-lg-10'>
                    <p className="Heading fs-6 mt-2">
                        SHOWING <span></span>RESULTS
                    </p>
                </div>
                <div className='col-lg-2 '>
                    <Link href="/Masters/WorkLocationMaster/new"  ><button className='AddButton'>Add New</button></Link>
                </div>
            </div>
            <table className='table table-striped mt-4 mx-0' >
                <thead className='bg-info text-white '>
                    <tr>
                        <th >Short Name</th>
                        <th >Description</th>
                        <th >Action</th>
                    </tr>
                </thead>
                <tbody >

                    {Array.isArray(workLocation) &&
                        workLocation.length > 0 && (
                            <>
                                {workLocation.map((data, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{data.short}</td>
                                            <td>{data.description}</td>
                                            <td>
                                                <Link href={`/Masters/WorkLocationMaster/Edit/${data.id}`}>
                                                    <button className='edit-btn'>Edit</button>
                                                </Link>&nbsp;&nbsp;&nbsp;&nbsp;
                                                <button className='edit-btn' onClick={deleteWorkLocation.bind(this, data.id)}>Delete</button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </>
                        )}
                </tbody>
            </table>
        </div>
    )
}

export default WorkLocationMasterDash