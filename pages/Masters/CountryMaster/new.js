import React, { useState, useEffect } from "react";
import Styles from "../../../styles/CountryMasterForm.module.css";
import { useForm } from "react-hook-form";
import Link from "next/link";
import axios from "axios";
import Layout from '../../../components/layout/layout'
import Swal from "sweetalert2";

function CountryMasterForm({ editData }) {
    const [actionType, setActionType] = useState("insert");
    const { register, handleSubmit, reset, formState } = useForm();
    const { errors } = formState;
    let hostURL = process.env.NEXT_PUBLIC_API_HOST_URL;

    async function onSubmit(data) {
        if (actionType == "insert") {
            await axios.post(hostURL + "Master/InsertCountryType", data);  //naveen.th@amazeinc.in, Insert API for Country master, to add new data
            Swal.fire(
                'Added succesfullly'
            );
            location.href = "/Masters/CountryMaster";
        }
        else {
            await axios.post(hostURL + "Master/UpdateCountryType", data); //naveen.th@amazeinc.in, Update API for Country master, to update data
            Swal.fire(
                "Updated succesfullly"
            );
            location.href = "/Masters/CountryMaster";
        }
        await axios.get(hostURL + "Master/GetCountryType"); //naveen.th@amazeinc.in, Get API for Country master, to fetch updated data 
    }

    useEffect(() => {
        getById()
    }, []);

    function getById() {
        if (editData == "") {
            clearForm();
        }
        else {

            clearForm(editData);
        }
    }

    function clearForm(existingData = null) {
        let etty = {
            "ID": existingData ? existingData.id : "",
            "Short": existingData ? existingData.short : "",
            "Description": existingData ? existingData.description : "",
        }
        reset(etty);
        setActionType(existingData ? "update" : 'insert');
    }
    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            width: '60%'
        },
        errorMsg: {
            fontSize: '12px',
            fontWeight: '500',
            color: 'red'
        },
        inputLabel: {
            fontSize: '16px'
        }
    };
    return (
        <Layout>
            <div>
                <br></br>
                <p className="Heading">Country Master Details</p>
                <div className="container mt-2">
                    <div className="row shadow p-2 rounded-3 ">
                        <div className="row ">
                            <div className="col-lg-4" >
                                <label id={Styles.label}>Country<span id={Styles.asterisk}>* </span></label>
                            </div>
                            <div className="col-lg-4" >
                                <label id={Styles.label}>Country Description<span id={Styles.asterisk}>* </span></label>
                            </div>
                        </div>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="row ">
                                <div className="col-lg-4">
                                    <input name="Country" type="text" {...register("Short", { required: true })}
                                        placeholder="Country Name" className="form-control"
                                    />
                                    <div>{errors.Short && <span style={customStyles.errorMsg}>Please enter country name</span>}</div>
                                </div>
                                <div className="col-lg-4">
                                    <textarea name="Description" className="form-control" {...register("Description", { required: true })} placeholder="Description" />
                                    <div>{errors.Description && <span style={customStyles.errorMsg} >Please enter description</span>}</div>
                                </div>
                            </div>
                            <br></br>
                            <div className="row mx-0">
                                <div className="col-lg-8"></div>
                                <div className="col-lg-2">
                                    <Link href='/Masters/CountryMaster'>
                                        <button type='button' className='btn common-edit' id={Styles.btn}>Close</button></Link>
                                </div>
                                <div className="col-lg-2">
                                    {
                                        actionType == "insert" && (
                                            <button type='submit' className='btn' id={Styles.btn}>Save</button>
                                        )
                                    }
                                    {
                                        actionType == "update" && (
                                            <button type='submit' className='btn' id={Styles.btn} >Update</button>
                                        )
                                    }
                                </div>



                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default CountryMasterForm;
