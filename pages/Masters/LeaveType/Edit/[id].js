import React from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import leaveform from '../../../../styles/LeaveTypeForm.module.css'
import axios from "axios";
import { useEffect, useState } from "react";
import Layout from '../../../../components/layout/layout'
import Swal from "sweetalert2";

function LeaveTypeForm() {

    const router = useRouter()
    const { id } = router.query

    let hostURL = process.env.NEXT_PUBLIC_API_HOST_URL;
    const { register, handleSubmit, reset, formState } = useForm();
    const { errors } = formState;

    const getData = async () => {
        if (id) {
            let response = await axios.get(hostURL + "Master/GetLeaveTypeByID?ID=" + id);
            console.log(response.data)
            clearForm(response.data[0]);
        } else {
            clearForm();
        }
    }

    useEffect(() => {
        getData()
    }, []);

    const onSubmit = async (data) => {
        let res = await axios.post(hostURL + "Master/UpdateLeaveTypeMaster", data);
        Swal.fire("Leave Type updated !");
        location.href = "/Masters/LeaveType";
    };
    const clearForm = (existingData = null) => {
        let etty = {
            ID: existingData ? existingData.id : "",
            Short: existingData ? existingData.short : "",
            Description: existingData ? existingData.description : "",
        };
        reset(etty);
    };
    const customStyles = {
        errorMsg: {
            fontSize: "12px",
            fontWeight: "500",
            color: "red",
        },
        inputLabel: {
            fontSize: "16px",
        },
    };



    return (
        <Layout>
            <div className='container'>
                <div className={leaveform.row}>
                    <div className="col-md-12">
                        <div className="row">
                            <div className="col-lg-2">

                                <h3 className="Heading">
                                    Leave Details
                                </h3><p></p>
                            </div>
                            <div className="col-lg-8"></div>
                            <div className="col-lg-2"></div>
                        </div>
                        <br />
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className={leaveform.card}>
                                <div className="row">
                                    <div className="col-md-2">
                                        <label className="fw-bold" style={customStyles.inputLabel}>
                                            Leave Type<span style={{ color: "red" }}>*</span>
                                        </label><p></p>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Enter Name"
                                            {...register("Short", { required: true })}
                                        ></input>
                                        {errors.Short && (
                                            <span style={customStyles.errorMsg}>
                                                Please Enter Leave Type
                                            </span>
                                        )}
                                    </div>


                                    <div className="col-md-4">
                                        <label className="fw-bold" style={customStyles.inputLabel}>
                                            Leave Description<span style={{ color: "red" }}>*</span>
                                        </label><p></p>
                                        <textarea
                                            className="form-control"
                                            name="Description"
                                            rows="3"
                                            type="text"
                                            {...register("Description", { required: true })}
                                            placeholder="Description"
                                        />
                                        {errors.Description && (
                                            <span style={customStyles.errorMsg}>
                                                Please Enter Leave Description
                                            </span>
                                        )}
                                    </div>
                                </div>
                                <br />
                                <br />
                                <div className="row">
                                    <div className="col-lg-8"></div>
                                    <div className="col-lg-2">
                                        <Link href="/Masters/LeaveType">
                                            <button className="AddButton">
                                                Cancel
                                            </button>
                                        </Link>
                                    </div>
                                    <div className="col-lg-2">
                                        <button
                                            type="submit"
                                            className="AddButton"
                                        >
                                            Update
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default LeaveTypeForm;