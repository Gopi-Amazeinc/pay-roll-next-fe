import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import axios from 'axios';
import Layout from '../../../layout/layout'
import { BiFilterAlt } from "react-icons/bi";
import { AiOutlinePlus } from "react-icons/ai";
import Swal from 'sweetalert2'
function GroupMaster() {

    const [groupMaster, setGroupMasterData] = useState([]);
    let hostURL = process.env.NEXT_PUBLIC_API_HOST_URL;

    useEffect(() => {
        getData();
    }, []);

    async function getData() {
        let res = await axios.get(
            hostURL + "Master/GetGroupMaster"  //naveen.th@amazeinc.in, Get API for group master dashboard, to fetch data
        );
        setGroupMasterData(res.data);
    }

    const deleteGroupData = async (id) => {
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
                axios.get(hostURL + "Master/DeleteGroupMaster?ID=" + id); //naveen.th@amazeinc.in, Delete API for Group master dashboard, to delete data by ID
                getData();
            }
        });
    }

    return (
        <Layout>
            <div className="container">
                <p className="Heading">Group Master</p>
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
                    <p className="col-2 result-heading">Showing {groupMaster.length} Results</p>
                    <div className="col-8"></div>
                    <div className="col-2">
                        <Link href="/Masters/GroupMaster/new">
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
                                <th>Short</th>
                                <th>Description</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Array.isArray(groupMaster) &&
                                groupMaster.length > 0 && (
                                    <>
                                        {groupMaster.map((data, index) => {
                                            return (
                                                <tr key={index}>
                                                    <td>{data.short}</td>
                                                    <td>{data.description}</td>
                                                    <td>
                                                        <Link href={`/Masters/GroupMaster/Edit/${data.id}`}>
                                                            <button
                                                                className="edit-btn"
                                                            >
                                                                Edit
                                                            </button>
                                                        </Link>
                                                        &nbsp;&nbsp;
                                                        <button
                                                            onClick={deleteGroupData.bind(this, data.id)}
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
export default GroupMaster