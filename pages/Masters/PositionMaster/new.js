import { useForm } from 'react-hook-form';
import Layout from '@/components/layout/layout.js';
import Styles from "../../../styles/employmentJobHistory.module.css";
import Link from "next/link";
import Swal from "sweetalert2";
import { apiService } from "@/services/api.service";
import { useRouter } from "next/router";
import React, { useState, useEffect } from 'react';

const PositionMasterDetails = ({ editData }) => {

    const { register, handleSubmit, reset, formState } = useForm();
    const { errors } = formState;
    const router = useRouter();
    const [actionType, setActionType] = useState("insert");

    const onSubmit = async (data) => {
        if (actionType == "insert") {
            await apiService.commonPostCall("Master/InsertRoleType", data);
            Swal.fire("Data Inserted successfully");
            router.push("/Masters/PositionMaster");
        } else {
            await apiService.commonPostCall("Master/UpdateRoleType", data);
            Swal.fire("Data Updated successfully");
            router.push("/Masters/PositionMaster");
        }
    };

    function clearForm(positionMasterData = null) {
        let details = {
            "ID": positionMasterData ? positionMasterData.id : "",
            "Short": positionMasterData ? positionMasterData.short : "",
            "Description": positionMasterData ? positionMasterData.description : "",
        }
        reset(details);
        setActionType(positionMasterData ? "update" : "insert");
    }

    useEffect(() => {
        const { id } = editData || {};
        if (id) {
            // This API is used to fetch the data from BarangayMaster ByID table
            getPositionMasterByID(id);
        } else {
            clearForm();
        }
    }, []);
    const getPositionMasterByID = async (id) => {
        const res = await apiService.commonGetCall(
            "Master/GetRoleTypeByID?ID=" + id
        );
        clearForm(res.data[0]);
    };

    return (
        <Layout>
            <div>
                <div className="container">
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