import React from 'react'
import Link from 'next/link';
import axios from "axios";
import Swal from "sweetalert2";
import { useEffect, useState } from 'react';
import Styles from '@/Styles/sss.module.css'

function SSS() {
    let hostURL = process.env.NEXT_PUBLIC_API_HOST_URL;
    const [sssData, SetSssData] = useState([]);

    useEffect(() => {
        getData();
    }, [1]);

    const getDataByID = (data) => {
        sessionStorage.setItem("id", data.id);
    };

    const clearData = () => {
        sessionStorage.setItem("id", "");
    };

    //   Written By:-Gopi  => This API call will load the sss configuration
    const getData = async () => {
        let res = await axios.get(hostURL + "HR/GetSSSconfogaration");
        SetSssData(res.data);
    }


    //   Written By:-Gopi  => will Delete data by id using the api 
    const handelDelete = (id) => {
        debugger;
        Swal.fire({
            title: "Are you sure want to delete ?",
            text: "",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3247d5",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes",
        }).then(async (result) => {
            if (result.isConfirmed) {
                await axios.get(hostURL + "HR/DeleteSSSconfogaration?ID=" + id)
                Swal.fire("SSS Deleted successfully.");
                getData();
            }
        });
    };
    return (
        <div>
            <div>
                <br />
                <p id={Styles.p}>SSS Configuration</p>

                <div className='card shadow-lg p-4 rounded-2 mt-4' id={Styles.card}>
                    <div className='row'>
                        <div className='col-lg-1'></div>
                        <div className='col-lg-4'>
                            <input type="text" placeholder='Search..' className='form-control form-control-md' />
                        </div>
                    </div>
                </div>

                <div className='row mt-3'>
                    <div className='col-lg-11'></div>
                    <div className='col-lg-1'>

                        <Link href="/Configuration/sssconfigadd"
                            onClick={clearData.bind(this)}
                            id={Styles.addLink} >
                            <button id={Styles.addButton} >  ADD </button></Link>

                    </div>

                </div>

                <table id={Styles.table} className='table  table-striped mt-3 text-center'>
                    <thead>
                        <tr className='bg-info text-white '>
                            <th>Taxable income Low Limit</th>
                            <th>Taxable income High Limit</th>
                            <th>SSS_EE value</th>
                            <th>SSS_ER value</th>
                            <th>SSS_EC value</th>
                            <th>Year</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sssData.map((data, index) => {
                            return (
                                <tr className="text-dark" key={index}>
                                    <td>{data.taxiableincomelowlimit}</td>
                                    <td>{data.taxiableincomehighlimit}</td>
                                    <td>{data.ssS_EEvalue}</td>
                                    <td>{data.ssS_ERvalue}</td>
                                    <td>{data.ssS_Ecvalue}</td>
                                    <td>{data.year}</td>
                                    <td>
                                        <Link href={`/Masters/SSS/Edit/${data.id}`}>
                                            <button
                                                id={Styles.actionButton}
                                                style={{ fontSize: "12px", marginRight: "5%" }}

                                            >
                                                Edit
                                            </button>
                                        </Link>
                                        <button
                                            id={Styles.actionButton}
                                            style={{ fontSize: "12px" }}
                                            onClick={() => handelDelete(data.id)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>

            </div>
        </div>
    )
}

export default SSS