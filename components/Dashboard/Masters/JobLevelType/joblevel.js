import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Layout from '../../../layout/layout'
import axios from 'axios'
import Swal from 'sweetalert2';
import { BiFilterAlt } from "react-icons/bi";
import { AiOutlinePlus } from "react-icons/ai";

function LevelTypeDash() {

    let [dashboard, setDashboardData] = useState([])
    let hostURL = process.env.NEXT_PUBLIC_API_HOST_URL;
    const getLevelType = async () => {
        const res = await axios.get(hostURL + "Master/GetLevelType") //getting job level type data and displayed in a table [Shashank]
        console.log(res.data)
        setDashboardData(res.data)
    }

    const deleteLevelType = (id) => {
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
                axios.get(hostURL + "Master/DeleteLevelType?ID=" + id) // deleting data based on ID [Shashank]
                Swal.fire({
                    icon: "success",
                    titleText: "Deleted Successfully"
                })
            }
            getLevelType();
        })

    }

    useEffect(() => {
        getLevelType();
    }, [])
    return (
        <Layout>
            <div className="container">
                <p className="Heading">Job Level Type</p>
                <div className="card p-3 rounded-3 shadow border-0">
                    <div className="row">
                        <div className="col-1">
                            <p> <BiFilterAlt /> Filter By</p>
                        </div>
                        <div className="col-5">
                            <input
                                type="text"
                                placeholder="Search"
                                className="form-control"
                            ></input>
                        </div>
                    </div>
                </div>

                <div className="row mt-3">
                    <p className="col-2 result-heading">Showing {dashboard.length} Results</p>
                    <div className="col-8"></div>
                    <div className="col-2">
                        <Link href="/Masters/JobLevel/new">
                            <button className=" AddButton">
                                <AiOutlinePlus />    Add New
                            </button>
                        </Link>
                    </div>
                </div>

                <div className="mt-3">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Leave Type</th>
                                <th>Description</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Array.isArray(dashboard) &&
                                dashboard.length > 0 && (
                                    <>
                                        {dashboard.map((data, index) => {
                                            return (
                                                <tr key={index}>
                                                    <td>{data.short}</td>
                                                    <td>{data.description}</td>
                                                    <td>
                                                        <Link href={`/Masters/JobLevel/Edit/${data.id}`}>
                                                            <button
                                                                className="edit-btn"
                                                            >
                                                                Edit
                                                            </button>
                                                        </Link>
                                                        &nbsp;&nbsp;
                                                        <button
                                                            onClick={deleteLevelType.bind(this, data.id)}
                                                            className="edit-btn"
                                                        >
                                                            Delete
                                                        </button>
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
        </Layout>
    )
}

export default LevelTypeDash