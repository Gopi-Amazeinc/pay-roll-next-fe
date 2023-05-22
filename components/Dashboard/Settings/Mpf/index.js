import React, { useState, useEffect } from "react";
import Link from "next/link";
import { apiService } from "@/services/api.service";
import Swal from 'sweetalert2';
import Styles from '../../../../styles/mpf.module.css'

function Mpf() {
    const [mpfDetails, setMpfDetails] = useState([]);
    const [keyword, setKeyword] = useState("");
    const getMpfdetails = async () => {
        let hostURL = process.env.NEXT_PUBLIC_API_HOST_URL;
        // This API is used to fetch the data from MPFConfogaration table
        let res = await apiService.commonGetCall( "HR/GetMPFconfogaration");
        setMpfDetails(res.data);
    }

    useEffect(() => {
        getMpfdetails()
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
            let res = await apiService.commonGetCall(`HR/DeleteMPFconfogaration?ID=${id}`);
            Swal.fire({
                icon: "success",
                title: "Hurray..",
                text: "Data was Deleted...!",
            });
            getMpfdetails();
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
            <div className="container-fluid">

                <label className='Heading'>MPF Configuration</label>
                <br /><br />
                <div className='row'>
                    <div className='col-lg-12'>
                        <div className='card p-3 border-0  rounded-3'>
                            <div className='row'>
                                <div className='col-lg-1'>
                                    <p>Filter By</p>
                                </div>

                                <div className='col-lg-3'>
                                    <input type="text" className='form-control' placeholder='Search...'onChange={e => setKeyword(e.target.value)} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='row '>
                    <div className='col-lg-10'>

                    </div>

                    <div className='col-lg-2'>
                        <br />
                        <Link href="/Settings/Mpf/new" > <button className='AddButton' onClick={clearData.bind(this)} > ADD NEW</button></Link>

                    </div>
                </div>
                <div className='row'>
                    <div className='col-lg-12'>
                        < div className='table-responsive'>
                            <table className='table mt-4 table-striped text-center ' >
                                <thead className='bg-info text-white '>
                                    <tr style={{ whiteSpace: "nowrap" }}>
                                        <th>Taxable income low limit</th>
                                        <th>Taxable income high limit</th>
                                        <th>MPF_EE value</th>
                                        <th>MPF_ER value</th>
                                        <th>MPF_Ec value</th>
                                        <th>Year</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        mpfDetails.filter(data => {
                                            if ((data.taxiableincomelowlimit.toString().includes(keyword.toString())) || (data.taxiableincomehighlimit.toString().includes(keyword.toString()))||
                                            (data.mpF_EEvalue.toString().includes(keyword.toString()))||
                                            (data.mpF_ERvalue.toString().includes(keyword.toString()))||
                                            (data.mpF_Ecvalue.toString().includes(keyword.toString()))||
                                            
                                            (data.year.toString().includes(keyword.toString()))) {
                                                return data;
                                            }
                                        }).map((data, index) => {
                                            return (
                                                <tr className="text-dark" key={index}>
                                                    <td>{data.taxiableincomelowlimit}</td>
                                                    <td>{data.taxiableincomehighlimit}</td>
                                                    <td>{data.mpF_EEvalue}</td>
                                                    <td>{data.mpF_ERvalue}</td>
                                                    <td>{data.mpF_Ecvalue}</td>
                                                    <td>{data.year}</td>
                                                    <td>
                                                        <Link href={`/Settings/Mpf/Edit/${data.id}`} style={{ marginRight: "10px" }}>
                                                            <button className='edit-btn' onClick={getData.bind(this, data)}>Edit</button>
                                                        </Link>
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
        </div>
    )
}

export default Mpf