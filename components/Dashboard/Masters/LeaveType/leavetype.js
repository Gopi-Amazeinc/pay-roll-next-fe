import React from "react";
import Link from "next/link";
import leavetypeStyles from "../../../../styles/LeaveTypeDashboard.module.css";
import Layout from '../../../layout/layout'
import { useState, useEffect } from 'react'
import axios from "axios";
import Swal from "sweetalert2";
function LeaveTypeDashboard() {
    let hostURL = process.env.NEXT_PUBLIC_API_HOST_URL;
    const [leaveTypeData, SetleaveTypeData] = useState([]);


    useEffect(() => {
        getData();
    }, [1]);

    const getData = async () => {
        let res = await axios.get(hostURL + "Master/GetLeaveType");
        SetleaveTypeData(res.data);
    };

    const handelDelete = (id) => {
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
                await axios.get(hostURL + "Master/DeleteLeaveTypeMaster?ID=" + id);
                Swal.fire("SubSection Deleted successfully.");
                getData();
            }
        });
    };
    return (
        <Layout>
            <div className="container">
                <div className="row">
                    <div className="col-lg-4">
                        <h3 className=" Heading">Leave Type </h3>
                    </div>
                    <div className="col-lg-4"></div>
                    <div className="col-lg-2"></div>
                </div>
                <br />
                <div className={leavetypeStyles.card}>
                    <br></br>
                    <div className="row">
                        <div className="col-lg-1">
                            <p className="filter">Filter By</p>
                        </div>
                        <div className="col-lg-5" style={{ marginLeft: "15px" }}>
                            <input
                                type="text"
                                placeholder="Search"
                                id="term"
                                className="form-control"
                            ></input>
                        </div>
                        <div className="col-lg-3" style={{ textAlign: "center" }}></div>
                    </div>
                    <br></br>
                </div>
                <br></br>
                <div className="row">
                    <div className="col-md-6">
                        <p className="text-primary fs-6 mt-3 fw-bold">
                            SHOWING <span>{leaveTypeData.length} </span>RESULTS
                        </p>
                    </div>
                    <div className="col-md-4"></div>
                    <div className="col-md-1">
                        <Link href="/Masters/LeaveType/new">
                            <button className="AddButton" tabindex="0">
                                Add New
                            </button>
                        </Link>
                    </div>
                </div>
                <br></br>
                <div className="row" style={{ marginLeft: "-99px" }}></div>
                <div className="row">
                    <div className="col-md-12">
                        <div className="container-fluid">
                            <table className="table table-striped table-hover mt-4">
                                <thead className="bg-info text-white th">
                                    <tr>
                                        <th>Leave Type</th>
                                        <th>Description</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {leaveTypeData.map((data, index) => {
                                        return (
                                            <tr classNameName="text-dark" key={index}>
                                                <td>{data.short}</td>
                                                <td>{data.description}</td>
                                                <td>
                                                    <Link href={`/Masters/LeaveType/Edit/${data.id}`}>
                                                        <button
                                                            id={leavetypeStyles.actionButton}
                                                            style={{ fontSize: "12px", marginRight: "5%" }}
                                                        >
                                                            Edit
                                                        </button>
                                                    </Link>
                                                    <button
                                                        id={leavetypeStyles.actionButton}
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
                    <div className="col-md-1"></div>
                </div>
            </div>
        </Layout>
    );
}

export default LeaveTypeDashboard;
