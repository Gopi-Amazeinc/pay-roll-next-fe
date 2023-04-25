import Link from 'next/link'
import React from 'react'
import { useEffect, useState } from 'react';

import { AiOutlinePlusCircle } from 'react-icons/ai'
import Layout from '@/components/Layout/index';
import axios from 'axios';
import Swal from 'sweetalert2';

function OTRateDash() {
    const [otDetails, setOtDetails] = useState([]);
    const getOtdetails = async () => {
        let hostURL = process.env.NEXT_PUBLIC_API_HOST_URL;
        // This API is used to fetch the data from OTRates table
        const res = await axios.get(hostURL + "Master/GetOTRates");
        setOtDetails(res.data);
    }

    useEffect(() => {
        getOtdetails()
    }, [1])


    const getData = (data) => {
        sessionStorage.setItem("id", data.id);
    }
    const clearData = () => {
        sessionStorage.setItem("id", "");
    }

    const handleDelete = async (id) => {
        try {
            let hostURL = process.env.NEXT_PUBLIC_API_HOST_URL;
            // This API is used to delete the dashboard data based on ID
            const res = await axios.get(hostURL + `Master/DeleteOTRates?id=${id}`);
            Swal.fire({
                icon: "success",
                title: "Hurray..",
                text: "Data was Deleted...!",
            });
            getOtdetails();
        } catch (error) {
            console.error(error);
            Swal.fire({
                icon: "error",
                title: "Oops..",
                text: "Data was Not Deleted...!",
            });
        }
    };



    return (
        
            <div>
                <p className='Heading'>OT Master</p>
                <div className='container-fluid'>
                    <div className='card p-4'>
                        <div className='row'>
                            <div className='col-lg-1'>
                                <p>Filter by</p>
                            </div>
                            <div className='col-lg-4'>
                                <input type="text" placeholder="Search" className='form-control form-control-sm' />
                            </div>
                            <div className='col-lg-7'></div>
                        </div>
                    </div>
                    <div className='row mt-4'>
                        <div className='col-lg-10'></div>
                        <div className='col-lg-2'>
                        <Link  href="/Masters/otmaster">  <button className='AddButton' onClick={clearData.bind(this)}>  <AiOutlinePlusCircle  size={18} /> ADD New</button></Link>
                        </div>
                    </div>

                    <div className='row '>
                        <div className='col-lg-12'>
                            <table className='table table-bordered mt-4 text-center table-striped table' >
                                <thead>
                                    <tr className='tr'>
                                        <th className='text-white'>Day</th>
                                        <th className='text-white'>	Normal</th>
                                        <th className='text-white'>	OT </th>
                                        <th className='text-white'>ND</th>
                                        <th className='text-white'>NDOT</th>
                                        <th className='text-white'>Action</th>
                                    </tr>
                                </thead>
                                <tbody >
                                    {
                                        otDetails.map((data, index) => {
                                            return (
                                                <tr className="text-dark" key={index}>
                                                    <td>{data.day}</td>
                                                    <td>{data.normal}</td>
                                                    <td>{data.ot}</td>
                                                    <td>{data.nd}</td>
                                                    <td>{data.ndot}</td>
                                                    <td>
                                                        <Link href="/Masters/otmaster">
                                                            <button className='edit-btn' onClick={getData.bind(this, data)}>Edit</button>
                                                        </Link>
                                                        &nbsp; &nbsp; &nbsp;
                                                        <button className='edit-btn' onClick={() => handleDelete(data.id)}>Delete</button>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
      

    )
}

export default OTRateDash
