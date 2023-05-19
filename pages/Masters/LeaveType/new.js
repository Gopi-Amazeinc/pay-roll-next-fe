import Link from 'next/link';
import { useForm } from 'react-hook-form';
import leaveform from '../../../styles/LeaveTypeForm.module.css'
import Layout from '../../../components/layout/layout';
import Swal from "sweetalert2";
import { apiService } from "@/services/api.service";
import { useRouter } from "next/router";
import React,{useState,useEffect} from 'react';

function LeaveTypeForm({ editData }) {
    const { register, handleSubmit, reset, formState } = useForm();
    const { errors } = formState;
    const router = useRouter();
    const [actionType, setActionType] = useState("insert");

    const onSubmit = async (data) => {
        if (actionType == "insert") {
            await apiService.commonPostCall("Master/InsertLeaveTypeMaster", data);
            Swal.fire("Data Inserted successfully");
            router.push("/Masters/LeaveType");
        } else {
            await apiService.commonPostCall("Master/UpdateLeaveTypeMaster", data);
            Swal.fire("Data Updated successfully");
            router.push("/Masters/LeaveType");
        }
    };

    const clearForm = (existingData = null) => {
        let etty = {
            ID: existingData ? existingData.id : "",
            Short: existingData ? existingData.short : "",
            Description: existingData ? existingData.description : "",
        };
        reset(etty);
        setActionType(existingData ? "update" : "insert");
    };

    useEffect(() => {
        const { id } = editData || {};
        if (id) {
            // This API is used to fetch the data from BarangayMaster ByID table
            geLeaveTypeByID(id);
        } else {
            clearForm();
        }
    }, []);
    const geLeaveTypeByID = async (id) => {
        const res = await apiService.commonGetCall(
            "Master/GetLeaveTypeByID?ID=" + id
        );
        clearForm(res.data[0]);
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
                                        {actionType == "insert" && (
                                            <button type="submit" className="AddButton">
                                                Save
                                            </button>
                                        )}
                                        {actionType == "update" && (
                                            <button type="submit" className="AddButton">
                                                Update
                                            </button>
                                        )}
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