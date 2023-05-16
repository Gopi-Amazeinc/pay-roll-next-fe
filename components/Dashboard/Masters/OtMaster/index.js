import Link from 'next/link'
import React from 'react'
import { useEffect, useState } from 'react';
import { BiFilterAlt } from "react-icons/bi";
import { AiOutlinePlus } from "react-icons/ai";
import axios from 'axios';
import Swal from 'sweetalert2';

function OTRateDash() {
    const [otDetails, setOtDetails] = useState([]);
    const getOtdetails = async () => {
        let hostURL = process.env.NEXT_PUBLIC_API_HOST_URL;
        const res = await axios.get(hostURL + "Master/GetOTRates");
        setOtDetails(res.data);
    }

    useEffect(() => {
        getOtdetails()
    }, [1])

    const handleDelete = async (id) => {
        try {
            let hostURL = process.env.NEXT_PUBLIC_API_HOST_URL;
            const res = await axios.get(hostURL + `Master/DeleteOTRates?id=${id}`);
            Swal.fire({
                icon: "success",
                title: "Hurray..",
                text: "Data was Deleted...!",
            });
            getOtdetails();
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
        <div className="container">
            <p className="Heading">OT Master</p>
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
                <p className="col-2 result-heading">Showing {otDetails.length} Results</p>
                <div className="col-8"></div>
                <div className="col-2">
                    <Link href="/Masters/OtMaster/new">
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
                            <th >Day</th>
                            <th >Normal</th>
                            <th >OT </th>
                            <th >ND</th>
                            <th >NDOT</th>
                            <th >Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(otDetails) &&
                            otDetails.length > 0 && (
                                <>
                                    {otDetails.map((data, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>{data.day}</td>
                                                <td>{data.normal}</td>
                                                <td>{data.ot}</td>
                                                <td>{data.nd}</td>
                                                <td>{data.ndot}</td>
                                                <td>
                                                    <Link href={`/Masters/OtMaster/Edit/${data.id}`}>
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

export default OTRateDash
