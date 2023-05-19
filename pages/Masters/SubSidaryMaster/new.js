import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form';
import subsidaryform from '../../../styles/SubsidaryMasterForm.module.css'
import Link from 'next/link';
import Layout from '@/components/layout/layout.js';
import axios from 'axios';
import Swal from 'sweetalert2';
import { apiService } from "@/services/api.service";
import { useRouter } from "next/router";

export default function SubsidaryMasterForm({ editData }) {

    const router = useRouter();
    const [actionType, setActionType] = useState("insert");
    const { register, handleSubmit, watch, reset, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        if (actionType == "insert") {
            await apiService.commonPostCall("Master/InsertSubsidaryMaster", data);
            Swal.fire("Data Inserted successfully");
            router.push("/Masters/SubSidaryMaster");
        } else {
            await apiService.commonPostCall("Master/UpdateSubsidaryMaster", data);
            Swal.fire("Data Updated successfully");
            router.push("/Masters/SubSidaryMaster");
        }
    };

    function clearForm(userData = null) {
        let details = {
            "ID": userData ? userData.id : "",
            "Name": userData ? userData.name : "",
            "Description": userData ? userData.description : "",
        }
        reset(details);
        setActionType(userData ? "update" : "insert");
    }

    useEffect(() => {
        const { id } = editData || {};
        if (id) {
            // This API is used to fetch the data from BarangayMaster ByID table
            getSubsidaryMasterByID(id);
        } else {
            clearForm();
        }
    }, []);

    const getSubsidaryMasterByID = async (id) => {
        const res = await apiService.commonGetCall(
            "Master/GetSubsidaryMasterByID?ID=" + id
        );
        clearForm(res.data[0]);
    };

    return (
        <Layout>
            <div className="container-fluid">
                <p className="Heading">Subsidiary Master Details</p>
                <div className='row'>
                    <div className='col-lg-12'>
                        <div className="card border-0 rounded-3 p-3">
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className='row'>
                                    <div className="col-lg-2">
                                        <label className='fw-bold'>Subsidiary Description<span className={subsidaryform.span}>*</span></label> <br />
                                        <input type="text" className="form-control" {...register('Name', {
                                            required: "Please add a Subsidiary Name", pattern: {
                                                value: '^[A-Za-z0-9 ]+$',
                                                message: "Please enter a valid Subsidiary Name"
                                            }
                                        })} placeholder="Subsidiary Name" />
                                        {errors.Name && <p className="error-message" style={{ color: "red" }}>{errors.Name.message}</p>}

                                    </div>
                                    <div className="col-lg-5" style={{ marginBottom: "20px" }}>
                                        <label className='fw-bold'>Subsidiary Description<span className={subsidaryform.span}>*</span></label> <br />
                                        <textarea className="form-control"{...register('Description', {
                                            required: "Please add a Description", pattern: {
                                                value: '^[A-Za-z0-9 ]+$',
                                                message: "Please enter a Description"
                                            }
                                        })} placeholder='Description' />
                                        {errors.Description && <p className="error-message" style={{ color: "red" }}>{errors.Description.message}</p>}
                                    </div>
                                </div>
                                <br />
                                <div className='row'>
                                    <div className='col-lg-8'></div>
                                    <div className="col-lg-2">
                                        <Link href="/Masters/SubSidaryMaster"><button className='AddButton'>CANCEL</button></Link>
                                    </div>
                                    <div className='col-lg-2'>
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
        </Layout >
    )
}

