import React from 'react'
import Link from 'next/link';
import { apiService } from "@/services/api.service";
import Swal from "sweetalert2";
import { useEffect, useState } from 'react';
import Styles from '../../../../styles/sss.module.css'
import { BiFilterAlt } from "react-icons/bi";
function SSS() {
    const [keyword, setKeyword] = useState("");
    const [sssData, SetSssData] = useState([]);

    useEffect(() => {
        getData();
    }, []);

    const getDataByID = (data) => {
        sessionStorage.setItem("id", data.id);
    };

    const clearData = () => {
        sessionStorage.setItem("id", "");
    };

    //   Written By:-Gopi  => This API call will load the sss configuration
    const getData = async () => {
        let res = await apiService.commonGetCall("HR/GetSSSconfogaration");
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
                let res =  apiService.commonGetCall("HR/DeleteSSSconfogaration?ID=" + id)
                console.log(res.data);
                Swal.fire("SSS Deleted successfully.");
                getData();
            }
        });
    };
    return (
        <div>
            <div className='container-fluid'>

                <label className='Heading'>SSS Configuration</label>
                <br /><br />
                <div className='row'><div className="col-lg-12">
                    <div className='card p-3 border-0 rounded-3 '>
                        <div className='row'>
                        <div className="col-lg-1">
                                    <p> <BiFilterAlt /> Filter By</p>
                                </div>
                            

                            <div className='col-lg-3'>
                                <input type="text" className='form-control' placeholder='Search...'onChange={e => setKeyword(e.target.value)} />
                            </div>
                        </div>
                    </div>
                </div>
                </div>

                <div className='row'>
                    <div className='col-lg-10'></div>
                    <div className='col-lg-2'>
                        <br />
                        <Link href="/Settings/SSS/new"><button
                            onClick={clearData.bind(this)}
                            className='AddButton'
                        >  ADD New </button></Link>

                    </div>

                </div>
                <br />
                <div className='row'>
                    <div className='col-lg-12'>
                        <table className='table table-hover'>
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
                                {sssData.filter(data => {
                                    if ((data.taxiableincomelowlimit.toString().includes(keyword.toString())) || (data.taxiableincomehighlimit.toString().includes(keyword.toString()))||
                                    (data.ssS_EEvalue.toString().includes(keyword.toString()))||
                                    (data.ssS_ERvalue.toString().includes(keyword.toString()))||
                                    (data.ssS_Ecvalue.toString().includes(keyword.toString()))||
                                    (data.year.toString().includes(keyword.toString()))) {
                                        return data;
                                    }
                                }).map((data, index) => {
                                    return (
                                        <tr className="text-dark" key={index}>
                                            <td>{data.taxiableincomelowlimit}</td>
                                            <td>{data.taxiableincomehighlimit}</td>
                                            <td>{data.ssS_EEvalue}</td>
                                            <td>{data.ssS_ERvalue}</td>
                                            <td>{data.ssS_Ecvalue}</td>
                                            <td>{data.year}</td>
                                            <td>
                                                <Link href={`/Settings/SSS/Edit/${data.id}`}>
                                                    <button
                                                        className='edit-btn'
                                                        style={{ fontSize: "12px", marginRight: "5%" }}

                                                    >
                                                        Edit
                                                    </button>
                                                </Link>
                                                <button
                                                    className='edit-btn'
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
            </div>
        </div>
    )
}

export default SSS