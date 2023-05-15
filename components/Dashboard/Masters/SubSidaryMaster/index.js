import React from 'react'

import Link from 'next/link'

import { AiOutlinePlusCircle } from 'react-icons/ai'
import { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2'

export default function SubsidaryMasterDash() {

    const [SubsidaryMaster, setSubsidaryMaster] = useState([]);
    const [keyword, setKeyword] = useState("");


    const hostURL = process.env.NEXT_PUBLIC_API_HOST_URL;

    const getSubsidaryMaster = async () => {
        // This API is used to fetch The  data from  SubsidaryMaster  
        let res = await axios.get(hostURL + "Master/GetSubsidaryMaster");
        setSubsidaryMaster(res.data);
    }

    useEffect(() => {
        getSubsidaryMaster()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [1])


    const handleDelete = async (id) => {
        try {
            // This API is used to delete the SubsidaryMaster data based on ID
            let res = await axios.get(hostURL + `Master/DeleteSubsidaryMaster?id=${id}`);
            console.log(res.data);
            Swal.fire('Data deleted successfully')
            getSubsidaryMaster();
        } catch (error) {
            console.error(error);
            Swal.fire('failed to  delete data')
        }
    };


    return (

        <div>
            <p className='Heading'>SubsidaryMaster</p>
            <div className='card shadow p-3 rounded-3 mx-0 border-0' >
                <div className='row'>
                    <div className='col-lg-1'>
                        <p>Filter By</p>
                    </div>
                    <div className='col-lg-5'>
                        <input type="text" className='form-control form-control-sm' onChange={get => { setKeyword(get.target.value) }} />
                    </div>
                </div>

            </div>
            <div className='row mt-3'>
                <div className='col-lg-10'>
                    <p className="Heading fs-6 mt-2">
                        SHOWING <span></span>RESULTS
                    </p>
                </div>
                <div className='col-lg-2'>
                    <Link href="/Masters/SubSidaryMaster/new"> <button className='AddButton'><AiOutlinePlusCircle size={18} /> ADD New</button></Link>
                </div>
            </div>

            <table className=' table table-striped mt-3' >
                <thead>
                    <tr className='tr'>
                        <th className='text-white'>Subsidiary Name</th>
                        <th className='text-white'>Description</th>
                        <th className='text-white'>Action</th>
                    </tr>
                </thead>
                <tbody >

                    {Array.isArray(SubsidaryMaster) &&
                        SubsidaryMaster.length > 0 && (
                            <>
                                {SubsidaryMaster.map((data) => {
                                    return (
                                        <tr key={data.id}>
                                            <td>{data.name}</td>
                                            <td>{data.description}</td>

                                            <td>
                                                <Link href={`/Masters/SubSidaryMaster/Edit/${data.id}`}>
                                                    <button className="edit-btn">Edit</button>
                                                </Link>
                                                &nbsp;

                                                <button className="edit-btn" onClick={() => handleDelete(data.id)}>Delete</button>
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
