import React from 'react'
import { BiFilterAlt } from "react-icons/bi";
import { AiOutlinePlus } from "react-icons/ai";
import Link from 'next/link'
import { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2'

export default function SubsidaryMasterDash() {

    const [SubsidaryMaster, setSubsidaryMaster] = useState([]);
    const [keyword, setKeyword] = useState("");

    const hostURL = process.env.NEXT_PUBLIC_API_HOST_URL;

    const getSubsidaryMaster = async () => {
        let res = await axios.get(hostURL + "Master/GetSubsidaryMaster");
        setSubsidaryMaster(res.data);
    }

    useEffect(() => {
        getSubsidaryMaster()
    }, [1])


    const handleDelete = async (id) => {
        try {
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
        <div className="container">
            <p className="Heading">Subsidary Master</p>
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
                            onChange={get => { setKeyword(get.target.value) }}
                        ></input>
                    </div>
                </div>
            </div>

            <div className="row mt-3">
                <p className="col-2 result-heading">Showing {SubsidaryMaster.length} Results</p>
                <div className="col-8"></div>
                <div className="col-2">
                    <Link href="/Masters/SubSidaryMaster/new">
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
                        {Array.isArray(SubsidaryMaster) &&
                            SubsidaryMaster.length > 0 && (
                                <>
                                    {SubsidaryMaster.map((data, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>{data.name}</td>
                                                <td>{data.description}</td>
                                                <td>
                                                    <Link href={`/Masters/SubSidaryMaster/Edit/${data.id}`}>
                                                        <button
                                                            className="edit-btn"
                                                        >
                                                            Edit
                                                        </button>
                                                    </Link>
                                                    &nbsp;&nbsp;
                                                    <button
                                                        onClick={() => handleDelete(data.id)}
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
