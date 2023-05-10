import { useForm } from "react-hook-form";
import Layout from '../../../components/layout/layout';
import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import Link from "next/link";
import { apiService } from "@/services/api.service";
import { useRouter } from "next/router";
function LevelTypeForm({ editData }) {
    const router = useRouter();
    const [actionType, setActionType] = useState("insert");
    const { register, handleSubmit, reset, formState: { errors }, } = useForm();

    const onSubmit = async (data) => {
        if (actionType == "insert") {
            await apiService.commonPostCall("Master/InsertLevelType", data);
            Swal.fire("Data Inserted successfully");
            router.push("/Masters/JobLevel");
        } else {
            await apiService.commonPostCall("Master/UpdateLevelType", data);
            Swal.fire("Data Updated successfully");
            router.push("/Masters/JobLevel");
        }
    };

    function clearForm(existingData = null) {
        let etty = {
            "ID": existingData ? existingData.id : "",
            "Short": existingData ? existingData.short : "",
            "Description": existingData ? existingData.description : "",
        }
        reset(etty);
        setActionType(existingData ? "update" : "insert");
    }

    useEffect(() => {
        const { id } = editData || {};
        if (id) {
            // This API is used to fetch the data from BarangayMaster ByID table
            geJobLevelByID(id);
        } else {
            clearForm();
        }
    }, []);
    const geJobLevelByID = async (id) => {
        const res = await apiService.commonGetCall(
            "Master/GetLevelTypeByID?ID=" + id
        );
        clearForm(res.data[0]);
    };

    return (
        <Layout>
            <div className="container">
                <h3 className='Heading'>Job Level Type Details</h3>
                <div className='card p-4 border-0 rounded-3 mt-4 mx-0'>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="row ">
                            <div className="col-lg-4">
                                <p>Level Type <i className="text-danger">*</i></p>
                                <input
                                    name="Short"
                                    className="form-control"
                                    type="text"
                                    {...register("Short", { required: true })}
                                    placeholder="Level Type"
                                />
                                <div>
                                    {errors.Short && (
                                        <span className="mt-2 text-danger">
                                            Please enter name
                                        </span>
                                    )}
                                </div>
                            </div>
                            <div className="col-lg-4">
                                <p>Description <i className="text-danger">*</i></p>
                                <textarea
                                    name="Description"
                                    className="form-control"
                                    {...register("Description", { required: true })}
                                    placeholder="Description"
                                />
                                <div>
                                    {errors.Description && (
                                        <span className="text-danger mt-2" >
                                            Please enter description
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                        <br></br>
                        <div className="row ">
                            <div className="col-lg-8"></div>
                            <div className="col-lg-2 ">
                                <Link href="/Masters/JobLevel">
                                    <button
                                        type="button"
                                        className=" AddButton" >
                                        Close
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
                    </form>
                </div>
            </div>
        </Layout>
    )
}

export default LevelTypeForm