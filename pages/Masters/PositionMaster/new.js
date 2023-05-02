import React, { useState, useEffect } from "react";
import { useForm } from 'react-hook-form';
import Layout from '@/components/layout/layout.js';
import Styles from "../../../styles/employmentJobHistory.module.css";
import axios from "axios";
import Link from "next/link";
import Swal from "sweetalert2";

const PositionMasterDetails = ({ editData }) => {

    const { register, handleSubmit, reset, formState } = useForm();
    const { errors } = formState;
    const [actionType, setActionType] = useState("insert");


    let hostURL = process.env.NEXT_PUBLIC_API_HOST_URL;



    function clearForm(positionMasterData = null) {
        debugger
        let details = {
            "ID": positionMasterData ? positionMasterData.id : "",
            "Short": positionMasterData ? positionMasterData.short : "",
            "Description": positionMasterData ? positionMasterData.description : "",

        }

        reset(details);
        setActionType(positionMasterData ? "update" : 'insert')
    }


    async function onSubmit(data) {

        console.log(data);
        if (actionType == "insert") {

            await axios.post(hostURL + 'Master/InsertRoleType', data); //gurukiran@amazeinc.in, api call to insert the data
            Swal.fire({ icon: "success", text: "Data Successfully added" })

            location.href = "/Masters/PositionMaster";
        }


        else {
            Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, Update it!'
            }).then((result) => {

                if (result.isConfirmed) {
                    axios.post(hostURL + 'Master/UpdateRoleType', data); //gurukiran@amazeinc.in api call for updating the data
                    Swal.fire(
                        'Updated!',
                        'Your file has been updated.',
                        'success'
                    )
                    location.href = "/Masters/PositionMaster";
                }
            })



        }

    }
    useEffect(() => {
        async function getPositionMasterbyID() {
            if (editData == "") {
                clearForm()
            }
            else {
                clearForm(editData);
            }
        }
        getPositionMasterbyID();
    }, []);

    return (
        <Layout>
            <div>
                <div className="container-fluid">
                    <div className={Styles.rowcss}>
                        <div className="col-md-12">
                            <div className="row">
                                <div className="col-lg-3">
                                    <h3 className="Heading">Postion Master Deatils</h3>
                                </div>
                                <div className="col-lg-8">
                                </div>
                                <div className="col-lg-1">
                                </div>
                            </div>


                            <div className={Styles.cardcss}>

                                <div className="row leavereq ">
                                    <div className="col-md-2">
                                        <label >Position Name<span className="text-danger">*</span></label>
                                    </div>
                                    <div className="col-md-4">
                                        <label > Description<span className="text-danger">*</span>
                                        </label>
                                    </div>
                                </div>
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <div className="row leavereq">
                                        <div className="col-md-2">
                                            <input type="text" className="form-control form-control-md"{...register('Short', {

                                                required: "Please add a Position Name", pattern: {

                                                    value: '^[A-Za-z0-9 ]+$',

                                                    message: "Please enter a valid Position Name"

                                                }

                                            })} placeholder="Position Name" />

                                            {errors.Short && <p className="error-message" style={{ color: "red" }}>{errors.Short.message}</p>}

                                        </div>
                                        <div className="col-md-4">
                                            <input name="Description"   {...register("Description", { required: true })} rows="3" type="text" placeholder='Description' className={`form-control `} />
                                            {
                                                errors.Description && <p className='text-danger'>Description is Required</p>
                                            }
                                        </div>
                                    </div>
                                    <br />
                                    <div className="row">
                                        <div className="col-lg-8">
                                        </div>
                                        <div className="col-lg-2">

                                            <Link href="/Masters/PositionMaster"> <button className="AddButton">CANCEL</button></Link>
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

            </div>
        </Layout>
    )
}

export default PositionMasterDetails