import React, { useEffect, useState } from "react";
import { BiFilterAlt } from "react-icons/bi";
import { AiOutlinePlus } from "react-icons/ai";
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
            <div className="container">
                <p className="Heading">Division Master</p>
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
                    <p className="col-2 result-heading">Showing {divisionData.length} Results</p>
                    <div className="col-8"></div>
                    <div className="col-2">
                        <Link href="/Masters/DivisionMaster/new">
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
                                <th>Short Name</th>
                                <th>Description</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Array.isArray(divisionData) &&
                                divisionData.length > 0 && (
                                    <>
                                        {divisionData.map((data, index) => {
                                            return (
                                                <tr key={index}>
                                                    <td>{data.short}</td>
                                                    <td>{data.description}</td>
                                                    <td>
                                                        <Link href={`/Masters/DivisionMaster/Edit/${data.id}`}>
                                                            <button
                                                                className="edit-btn"
                                                            >
                                                                Edit
                                                            </button>
                                                        </Link>
                                                        &nbsp;&nbsp;
                                                        <button
                                                            onClick={deleteDivision.bind(this, data.id)}
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

export default DivisionMasterDashboard