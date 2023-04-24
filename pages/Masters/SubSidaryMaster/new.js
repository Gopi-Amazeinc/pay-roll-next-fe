import React from 'react'
import { useForm } from 'react-hook-form';
import subsidaryform from '../../styles/SubsidaryMasterForm.module.css'
import Link from 'next/link';
import Layout from '@/Components/layout'
import axios from 'axios';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

export default function SubsidaryMasterForm() {

    const hostURL = process.env.NEXT_PUBLIC_API_HOST_URL;

    const { register, handleSubmit, watch, reset, formState: { errors } } = useForm();

    const [actionType, setActionType] = useState("insert");

    useEffect(() => {
        async function GetSubsidaryMaster() {
            const id = sessionStorage.getItem("id");
            if (id) {
                // This API is used to fetch the data from GSubsidaryMaster based on id 
                const response = await axios.get(hostURL + "Master/GetSubsidaryMasterByID?ID=" + id);
                clearForm(response.data[0])
            }
            else {
                clearForm();
            }
        }
        GetSubsidaryMaster();

    }, [1]);

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
        }
        else {
            // This API is used to Update the data from SubsidaryMaster table
            await axios.post(hostURL + "Master/UpdateSubsidaryMaster", data);
            Swal.fire('Data Updated successfully')
        }
    }

    return (
        <Layout>
            <div>
                <div className="container-fluid">
                    <div className={subsidaryform.row}>
                        <div className="col-lg-4">
                            <h3 className="text-primary fs-5 mt-3 fw-bold">Subsidiary Master Details</h3>
                        </div>
                        <div className="col-lg-6">
                        </div>
                        <div className="col-lg-2">
                        </div>
                    </div>
                    <br />
                    <div className={subsidaryform.card}>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="row">
                                <div className="col-lg-4">
                                    <label className='fw-bold' >Subsidiary Description<span className={subsidaryform.span}>*</span></label> <br />
                                    <input type="text" style={{ width: "100%", padding: "7px", borderRadius: "3px", marginTop: "10px" }} {...register('Name', {
                                        required: "Please add a Subsidiary Name", pattern: {
                                            value: '^[A-Za-z0-9 ]+$',
                                            message: "Please enter a valid Subsidiary Name"
                                        }
                                    })} placeholder="Subsidiary Name" name="Name" id="Name" className={subsidaryform.fileds} />
                                    {errors.Name && <p className="error-message" style={{ color: "red" }}>{errors.Name.message}</p>}

                                </div>
                                <div className="col-lg-1"></div>
                                <div className="col-lg-7" style={{ marginBottom: "20px" }}>
                                    <label className='fw-bold' >Subsidiary Description<span className={subsidaryform.span}>*</span></label> <br />
                                    <textarea style={{ marginTop: "10px" }} name="Description" rows="2" cols="70" type="text"{...register('Description', {
                                        required: "Please add a Description", pattern: {
                                            value: '^[A-Za-z0-9 ]+$',
                                            message: "Please enter a Description"
                                        }
                                    })} placeholder='Description' />
                                    {errors.Description && <p className="error-message" style={{ color: "red" }}>{errors.Description.message}</p>}
                                </div>
                                <div className="col-lg-11 ">
                                    <Link href="/Masters/subsidarymasterdashboard"><button className='btn btn-primary' style={{ float: "right", marginLeft: "5px" }} tabindex="0">CANCEL</button></Link>
                                    {
                                        actionType == "insert" && (
                                            <button type='submit' className='btn btn-primary' style={{ float: "right" }}>Save</button>
                                        )
                                    }
                                    {
                                        actionType == "update" && (
                                            <button type='submit' className='btn btn-primary' style={{ float: "right" }}>Update</button>
                                        )
                                    }
                                </div>
                            </div>
                        </form>

                    </div>
                </div>
            </div>
        </Layout >
    )
}

