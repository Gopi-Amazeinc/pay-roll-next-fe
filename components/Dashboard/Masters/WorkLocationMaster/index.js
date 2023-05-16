import Link from 'next/link'
import React from 'react'
import { BiFilterAlt } from "react-icons/bi";
import { AiOutlinePlus } from "react-icons/ai";
import { useEffect, useState } from "react";
import axios from "axios";
import Swal from 'sweetalert2'

function WorkLocationMasterDash() {

    const [workLocation, setWorkLocationData] = useState([]);
    let hostURL = process.env.NEXT_PUBLIC_API_HOST_URL;

    useEffect(() => {
        getData();
    }, []);

    async function getData() {
        let res = await axios.get(
            hostURL + "Master/GetWorkingLocationMaster"     //naveen.th@amazeinc.in, Get API for Working location master dashboard, to fetch data
        );
        setWorkLocationData(res.data);
    }
    const deleteWorkLocation = async (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                axios.get(hostURL + "Master/DeleteWorkingLocationMaster?ID=" + id); //naveen.th@amazeinc.in, Delete API for Working location master, to delete data by ID
                getData()
            }
        });

    }
    return (
        <div className="container">
            <p className="Heading">Worklocation Master</p>
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
                <p className="col-2 result-heading">Showing {workLocation.length} Results</p>
                <div className="col-8"></div>
                <div className="col-2">
                    <Link href="/Masters/WorkLocationMaster/new">
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
                            <th >Short Name</th>
                            <th >Description</th>
                            <th >Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(workLocation) &&
                            workLocation.length > 0 && (
                                <>
                                    {workLocation.map((data, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>{data.short}</td>
                                                <td>{data.description}</td>
                                                <td>
                                                    <Link href={`/Masters/WorkLocationMaster/Edit/${data.id}`}>
                                                        <button
                                                            className="edit-btn"
                                                        >
                                                            Edit
                                                        </button>
                                                    </Link>
                                                    &nbsp;&nbsp;
                                                    <button
                                                        onClick={deleteWorkLocation.bind(this, data.id)}
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
    )
}

export default WorkLocationMasterDash