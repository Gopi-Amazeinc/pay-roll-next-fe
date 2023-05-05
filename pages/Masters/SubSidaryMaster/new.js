import React from 'react'
import { useForm } from 'react-hook-form';
import subsidaryform from '../../../styles/SubsidaryMasterForm.module.css'
import Link from 'next/link';
import Layout from '@/components/layout/layout.js';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

export default function SubsidaryMasterForm({ editData }) {

    const hostURL = process.env.NEXT_PUBLIC_API_HOST_URL;

    const { register, handleSubmit, watch, reset, formState: { errors } } = useForm();

    const [actionType, setActionType] = useState("insert");

    useEffect(() => {
        GetSubsidaryMaster();
    }, []);

    async function GetSubsidaryMaster() {
        if (editData == "") {
            clearForm()
        }
        else {
            clearForm(editData);
        }
    }

    function clearForm(userData = null) {
        let details = {
            "ID": userData ? userData.id : "",
            "Name": userData ? userData.name : "",
            "Description": userData ? userData.description : "",
        }
        reset(details);
        setActionType(userData ? "update" : 'insert')
    }

    async function onSubmit(data) {
        if (actionType == "insert") {
            // This API is used to insert the data from SubsidaryMaster table
            await axios.post(hostURL + "Master/InsertSubsidaryMaster", data);
            Swal.fire('Data Inserted successfully')
            location.href = "/Masters/SubSidaryMaster"
        }
        else {
            // This API is used to Update the data from SubsidaryMaster table
            await axios.post(hostURL + "Master/UpdateSubsidaryMaster", data);
            Swal.fire('Data Updated successfully')
            location.href = "/Masters/SubSidaryMaster"
        }
    }

    return (
        <Layout>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-4">
                            <h3 className="Heading">Subsidiary Master Details</h3>
                        </div>
                        <div className="col-lg-6">
                        </div>
                        <div className="col-lg-2">
                        </div>
                    </div>
                    <br />
                    <div className="card border-0 mx-0">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="row">
                                <div className="col-lg-4">
                                    <label>Subsidiary Description<span className={subsidaryform.span}>*</span></label> <br />
                                    <input type="text" className="form-control" {...register('Name', {
                                        required: "Please add a Subsidiary Name", pattern: {
                                            value: '^[A-Za-z0-9 ]+$',
                                            message: "Please enter a valid Subsidiary Name"
                                        }
                                    })} placeholder="Subsidiary Name" />
                                    {errors.Name && <p className="error-message" style={{ color: "red" }}>{errors.Name.message}</p>}

                                </div>
                                <div className="col-lg-4" style={{ marginBottom: "20px" }}>
                                    <label >Subsidiary Description<span className={subsidaryform.span}>*</span></label> <br />
                                    <textarea className="form-control"{...register('Description', {
                                        required: "Please add a Description", pattern: {
                                            value: '^[A-Za-z0-9 ]+$',
                                            message: "Please enter a Description"
                                        }
                                    })} placeholder='Description' />
                                    {errors.Description && <p className="error-message" style={{ color: "red" }}>{errors.Description.message}</p>}
                                </div>
                                <div className='row'>
                                    <div className='col-lg-8'></div>
                                    <div className="col-lg-2">
                                        <Link href="/Masters/SubSidaryMaster"><button className='AddButton'>CANCEL</button></Link>
                                    </div>
                                    <div className='col-lg-2'>
                                        {
                                            actionType == "insert" && (
                                                <button type='submit' className='AddButton'>Save</button>
                                            )
                                        }
                                        {
                                            actionType == "update" && (
                                                <button type='submit' className='AddButton'>Update</button>
                                            )
                                        }
                                    </div>
                                </div>
                            </div>
                        </form>

                    </div>
                </div>
        </Layout >
    )
}

