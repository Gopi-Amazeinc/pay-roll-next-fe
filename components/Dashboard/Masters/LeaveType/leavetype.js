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
            <div>
                <div class="row">
                    <div class="col-lg-4">
                        <br />
                        <h3 class="text-primary fs-5 mt-3 fw-bold">Leave Type </h3>
                    </div>
                    <div class="col-lg-4"></div>
                    <div class="col-lg-2"></div>
                </div>
                <br />
                <div class={leavetypeStyles.card}>
                    <br></br>
                    <div class="row">
                        <div class="col-lg-1">
                            <p class="filter">Filter By</p>
                        </div>
                        <div class="col-lg-5" style={{ marginLeft: "15px" }}>
                            <input
                                type="text"
                                placeholder="Search"
                                id="term"
                                class="form-control"
                            ></input>
                        </div>
                        <div class="col-lg-3" style={{ textAlign: "center" }}></div>
                    </div>
                    <br></br>
                </div>
                <br></br>
                <div class="row">
                    <div class="col-md-10">
                        <p class="text-primary fs-6 mt-3 fw-bold">
                            SHOWING <span>{leaveTypeData.length} </span>RESULTS
                        </p>
                    </div>
                    <div class="col-md-2">
                        <Link href="/Masters/LeaveType/new">
                            <button class={leavetypeStyles.button} tabindex="0">
                                Add New
                            </button>
                        </Link>
                    </div>
                </div>
                <br></br>
                <div class="row" style={{ marginLeft: "-99px" }}></div>
                <div class="row">
                    <div class="col-md-12">
                        <div class="container-fluid">
                            <table class="table table-striped table-hover mt-4">
                                <thead class="bg-info text-white">
                                    <tr>
                                        <th>Leave Type</th>
                                        <th>Description</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {leaveTypeData.map((data, index) => {
                                        return (
                                            <tr className="text-dark" key={index}>
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
                    <div class="col-md-1"></div>
                </div>
            </div>
        </Layout>
    );
}

export default LeaveTypeDashboard;
