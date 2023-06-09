import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import Link from 'next/link';
import Layout from '../../../components/layout/layout';
import Styles from '../../../styles/groupMasterForm.module.css'
import Swal from 'sweetalert2'
import { apiService } from "@/services/api.service";
import { useRouter } from "next/router";
function GroupMasterForm({ editData }) {
    const { register, handleSubmit, reset, formState } = useForm();
    const { errors } = formState;
    const [actionType, setActionType] = useState("insert");
    const router = useRouter();

    const onSubmit = async (data) => {
        if (actionType == "insert") {
            await apiService.commonPostCall("Master/InsertGroupMaster", data);
            Swal.fire("Data Inserted successfully");
            router.push("/Masters/GroupMaster");
        } else {
            await apiService.commonPostCall("Master/UpdateGroupMaster", data);
            Swal.fire("Data Updated successfully");
            router.push("/Masters/GroupMaster");
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
            getGroupMasterByID(id);
        } else {
            clearForm();
        }
    }, []);
    const getGroupMasterByID = async (id) => {
        const res = await apiService.commonGetCall(
            "Master/GetGroupMasterByID?ID=" + id
        );
        clearForm(res.data[0]);
    };

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
            <p className='Heading'>Group Master</p>
            <div className="container">
                <div className="card p-4 border-0 rounded-3 mt-3 mx-0">
                    <div className="row ">
                        <div className="col-lg-4" >
                            <label id={Styles.label}>Name<span id={Styles.asterisk}>* </span></label>
                        </div>
                        <div className="col-lg-4" >
                            <label id={Styles.label}>Description<span id={Styles.asterisk}>* </span></label>
                        </div>
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="row ">
                            <div className="col-lg-4">
                                <input
                                    name="Short"
                                    className="form-control"
                                    type="text"
                                    {...register("Short", { required: true })}
                                    placeholder="Short Name"
                                />
                                <div>
                                    {errors.Short && (
                                        <span style={customStyles.errorMsg}>
                                            Please enter name
                                        </span>
                                    )}
                                </div>
                            </div>
                            <div className="col-lg-4">
                                <textarea
                                    name="Description"
                                    className="form-control"
                                    {...register("Description", { required: true })}
                                    placeholder="Description"
                                />
                                <div>
                                    {errors.Description && (
                                        <span style={customStyles.errorMsg}>
                                            Please enter description
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                        <br></br>
                        <div className="row ">
                            <div className="col-lg-8"></div>
                            <div className="col-lg-2">
                                <Link href='/Masters/GroupMaster'><button
                                    type="button"
                                    className="AddButton"
                                >
                                    Close
                                </button></Link>
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
        </Layout>
    );
}

export default GroupMasterForm