import React from 'react'
import Styles from '../../styles/SubsidaryMasterDash.module.css'
import Link from 'next/link'
import Layout from '@/components/layout/layout.js';
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
    }, [1])

    const getData = (data) => {
        sessionStorage.setItem("id", data.id);
    }

    const clearData = () => {
        sessionStorage.setItem("id", "");
    }

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
        <Layout>
            <div>
                <br /><br />
                <p id={Styles.p}>SubsidaryMaster</p>


                <div className='card shadow-lg p-4 rounded-3' id={Styles.card}>
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
                    <div className='col-lg-9'></div>
                    <div className='col-lg-2'>

                        <Link id={Styles.addLink} href="/Masters/subsidarymasterform"> <button id={Styles.addButton} onClick={clearData.bind(this)}><AiOutlinePlusCircle id={Styles.icon} size={18} /> ADD New</button></Link>

                    </div>
                    <div className='col-lg-1'></div>

                </div>

                <div className='row '>

                    <table className=' table   table-bordered mt-3 text-center table-striped table-striped-odd   ' id={Styles.table}>
                        <thead>
                            <tr id={Styles.tr}>
                                <th className='text-white'>Subsidiary Name</th>
                                <th className='text-white'>Description</th>
                                <th className='text-white'>Action</th>
                            </tr>
                        </thead>
                        <tbody >
                            {SubsidaryMaster.filter(post => {
                                return Object.values(post).some(value =>
                                    value.toString().toLowerCase().includes(keyword.toLowerCase())
                                );
                            })
                                .map((data) => {
                                    return (
                                        <tr key={data.id}>
                                            <td>{data.name}</td>
                                            <td>{data.description}</td>

                                            <td>
                                                <Link href="/Masters/subsidarymasterform">
                                                    <button className="btn btn-primary" onClick={getData.bind(this, data)}>Edit</button>
                                                </Link>
                                                &nbsp;

                                                <button className="btn btn-danger" onClick={() => handleDelete(data.id)}>Delete</button>
                                            </td>

                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>

                </div>



            </div>
        </Layout>
    )
}
