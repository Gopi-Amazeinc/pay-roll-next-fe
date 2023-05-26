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
    const customStyles = {
        content: {
          top: "50%",
          left: "50%",
          right: "auto",
          bottom: "auto",
          marginRight: "-50%",
          transform: "translate(-50%, -50%)",
          width: "60%",
        },
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
            <div>
                <div className="container-fluid">
                    <p className="Heading">Position Master Deatils</p>
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="card rounded-3 border-0 p-3">
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <div className="row ">
                                        <div className="col-lg-2">
                                            <label className='fw-bold'>Position Name<span className="text-danger">*</span></label>
                                            <input type="text" className="form-control"{...register('Short', {

                                                required: "Please add a Position Name", pattern: {

                                                    value: '^[A-Za-z0-9 ]+$',

                                                    message: "Please enter a valid Position Name"

                                                }

                                            })} placeholder="Position Name" />

                                            {errors.Short && <p className="error-message" style={customStyles.errorMsg}>{errors.Short.message}</p>}

                                        </div>
                                        <div className="col-lg-5">
                                            <label className='fw-bold'> Description<span className="text-danger">*</span></label>
                                            <input name="Description"  minLength={10} {...register("Description", { required: true })} rows="3" type="text" placeholder='Description' className={`form-control `} />
                                            {
                                                errors.Description && <p  className="error-message" style={customStyles.errorMsg}>Description is Required</p>
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