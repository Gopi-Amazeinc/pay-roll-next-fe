import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import Layout from '../../../components/layout/layout'
import Link from 'next/link';
import { apiService } from "@/services/api.service";
import Swal from 'sweetalert2';
import { useRouter } from "next/router";
function DivDivisionMaster({ editData }) {

    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const router = useRouter();
    const [actionType, setActionType] = useState("insert");

    const onSubmit = async (data) => {
        if (actionType == "insert") {
            await apiService.commonPostCall("Master/InsertDivisionMaster", data);
            Swal.fire("Data Inserted successfully");
            router.push("/Masters/DivisionMaster");
        } else {
            await apiService.commonPostCall("Master/UpdateDivisionMaster", data);
            Swal.fire("Data Updated successfully");
            router.push("/Masters/DivisionMaster");
        }
    };


    function clearForm(existingData = null) {
        let etty = {
            "ID": existingData ? existingData.id : "",
            "Short": existingData ? existingData.short : "",
            "Description": existingData ? existingData.description : "",
        }
        reset(etty)
        setActionType(existingData ? "update" : "insert");
    }


    useEffect(() => {
        const { id } = editData || {};
        if (id) {
            // This API is used to fetch the data from BarangayMaster ByID table
            getDivisionMasterByID(id);
        } else {
            clearForm();
        }
    }, []);
    const getDivisionMasterByID = async (id) => {
        const res = await apiService.commonGetCall(
            "Master/GetDivisionMasterByID?ID=" + id
        );
        clearForm(res.data[0]);
    };

    return (
        <Layout>
            <div className="container-fluid">
                <p className='Heading'>Division Master</p>
                <div className='row'>
                    <div className='col-lg-12'>
                        <div className='card p-3 border-0 shadow rounded-3'>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="row ">
                                    <div className="col-lg-2">
                                        <label className='fw-bold'>Short Name <i className="text-danger">*</i></label>
                                        <input
                                            name="Short"
                                            className="form-control"
                                            type="text"
                                            {...register("Short", { required: true })}
                                            placeholder="Short Name"
                                        />
                                        <div>
                                            {errors.Short && (
                                                <span className="mt-2 text-danger">
                                                    Please enter name
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                    <div className="col-lg-5">
                                        <label className='fw-bold'>Description <i className="text-danger">*</i></label>
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
                                <div className="row">
                                    <div className="col-lg-8"></div>
                                    <div className="col-lg-2">
                                        <Link href="/Masters/DivisionMaster">
                                            <button
                                                type="button"
                                                className="AddButton" >
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
                </div>
            </div>
        </Layout>
    )
}

export default DivDivisionMaster;

