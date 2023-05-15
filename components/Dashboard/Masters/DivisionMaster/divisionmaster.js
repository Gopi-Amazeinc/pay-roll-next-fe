import React, { useEffect, useState } from "react";
import { BiFilterAlt } from "react-icons/bi";
import Styles from '../../../../styles/DivisionMasterDashboard.module.css'
import { AiOutlinePlusCircle } from "react-icons/ai";
import table from "../../../../styles/table.module.css";
import Link from "next/link";
import Layout from '../../../layout/layout'
import axios from "axios";
import Swal from "sweetalert2";
function DivisionMasterDashboard() {

    let [divisionData, setDivisionData] = useState([])
    let hostURL = process.env.NEXT_PUBLIC_API_HOST_URL;
    const getData = async () => {
        const res = await axios.get(hostURL + "Master/GetDivisionMaster") //getting division master data and displayed in a table [Shashank]
        console.log(res);
        setDivisionData(res.data)
    }

    const deleteDivision = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.get(hostURL + "Master/DeleteDivisionMaster?ID=" + id) // deleting data based on ID [Shashank]
                Swal.fire({
                    icon: "success",
                    titleText: "Deleted Successfully"
                })
            }
            getData();
        })

    }

    useEffect(() => {
        getData();
    }, [])

    return (
        <Layout>
            <div>
                <p className="Heading">Division Master</p>
                <div className="container mt-4">
                    <div className="row shadow p-2 rounded-3 ">
                        <div className="col-lg-1">
                            <b>
                                <p className="mt-2 text-center">

                                    <BiFilterAlt /> Filter by:
                                </p>
                            </b>
                        </div>
                        <div className="col-lg-5">
                            <input
                                type="search"
                                className=" mt-2 form-control"
                                placeholder="Search"
                            />
                        </div>
                    </div>
                    <div className="row mt-4">
                        <div className="col-lg-8">
                            <p className="Heading fs-6">SHOWING {divisionData.length} RESULTS</p>
                        </div>
                        <div className="col-lg-2"></div>
                        <div className="col-lg-2">
                            <Link href="/Masters/DivisionMaster/new"> <button
                                className="AddButton"
                            > <AiOutlinePlusCircle />
                                Add New
                            </button></Link>
                        </div>
                    </div>
                    <div className="row">
                        <table className="table table-striped mt-3">
                            <thead className="bg-info text-white">
                                <tr>
                                    <th>Short Name</th>
                                    <th>Description</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>

                                {Array.isArray(divisionData) &&
                                    divisionData.length > 0 && (
                                        <>
                                            {divisionData.map((data) => {
                                                return (
                                                    <tr key={data.id}>
                                                        <td>{data.short}</td>
                                                        <td>{data.description}</td>
                                                        <td>
                                                            <Link href={`/Masters/DivisionMaster/Edit/${data.id}`}><button className='edit-btn mx-2'>Edit</button></Link>
                                                            <button className='edit-btn' onClick={deleteDivision.bind(this, data.id)}>Delete</button>
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                        </>
                                    )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default DivisionMasterDashboard