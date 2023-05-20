import React from 'react'
import Link from 'next/link'
import Styles from '../../../../styles/payperiodsetting.module.css'
import { useEffect, useState } from 'react';
import { apiService } from "@/services/api.service";
import Swal from 'sweetalert2';


export default function PayperiodSettingsDash() {

    const hostURL = process.env.NEXT_PUBLIC_API_HOST_URL;

    const [payperiodSettingsDashboard, setpayperiodSettingsDashboard] = useState([]);
    const [keyword, setKeyword] = useState("");

    const getpayperiodSettingsDashboard = async () => {
        let res = await apiService.commonGetCall("Payroll/GetPayPeriodSetting");
        setpayperiodSettingsDashboard(res.data);
    }

    useEffect(() => {
        getpayperiodSettingsDashboard()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [1])

    const getData = (data) => {
        sessionStorage.setItem("id", data.id);
    }


    const clearData = () => {
        sessionStorage.setItem("id", "");
    }

    const handleDelete = async (id) => {
        let res = await apiService.commonGetCall(`Payroll/DeletePayPeriodSetting?id=${id}`);
        console.log(res.data);
        Swal.fire('Data deleted successfully')
        getpayperiodSettingsDashboard();
    };

    return (

        <div className='container-fluid'>
            <label className='Heading'>Pay Period Settings</label>
            <br /><br />
            <div className='row'>
                <div className='col-lg-12'>
                    <div className='card p-3 border-0  rounded-3'>
                        <div className='row'>
                            <div className='col-lg-1'>
                                <p>Filter By</p>
                            </div>

                            <div className='col-lg-3'>
                                <input type="text" className='form-control' placeholder='Search...' onChange={e => setKeyword(e.target.value)} />
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
                    <Link href="/Settings/payperiodsetting/new" > <button className='AddButton' >Add New</button> </Link>
                </div>
            </div>
            <div className='row'><div className='col-lg-12'>
                < div className='table-responsive'>
                    <table className='table mt-4 table-striped text-center ' >
                        <thead className='bg-info text-white '>
                            <tr style={{ whiteSpace: "nowrap" }}>
                                <th>Pay Code</th>
                                <th>Pay Period</th>
                                <th>Attendance Coverage Startdate</th>
                                <th>Attendance Coverage Enddate</th>
                                <th>Payroll Start date</th>
                                <th>Payroll End date</th>
                                <th>Payroll Run Type</th>
                                <th>Comments</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {payperiodSettingsDashboard.filter(data => {
                                if ((data.payCode.toLowerCase().includes(keyword.toLowerCase())) || (data.payPeriod.toLowerCase().includes(keyword))) {
                                    return data;
                                }
                            }).map((data, index) => {
                                return (
                                    <tr className="text-dark" key={index}>
                                        <td>{data.payCode}</td>
                                        <td>{data.payPeriod}</td>
                                        <td>{data.attendanceCoverageStartdate}</td>
                                        <td>{data.attendanceCoverageEndDate}</td>
                                        <td>{data.payrollStartDate}</td>
                                        <td>{data.payrollEndDate}</td>
                                        <td>{data.payrollRunType}</td>
                                        <td>{data.comments}</td>
                                        <td> <Link href={`/Settings/payperiodsetting/Edit/${data.id}`}>
                                            <button className='edit-btn mb-2' >Edit</button>
                                        </Link>
                                            <button className='edit-btn ' onClick={() => handleDelete(data.id)}>Delete</button>




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

    );

}

