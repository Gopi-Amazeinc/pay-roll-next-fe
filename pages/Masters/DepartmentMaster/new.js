import React, { useState, useEffect } from 'react'
import Styles from '../../../styles/DepartmentMasterForm.module.css'
import { useForm } from 'react-hook-form';
import Layout from '../../../components/layout/layout'
import Link from 'next/link';
import Swal from 'sweetalert2';
import { apiService } from "@/services/api.service";
import { useRouter } from "next/router";
const DepartmentMasterForm = ({ editData }) => {
    // get functions to build form with useForm() hook
    const { register, handleSubmit, reset, formState } = useForm();
    const { errors } = formState;
    const router = useRouter();
    const [actionType, setActionType] = useState("insert");

    const onSubmit = async (data) => {
        if (actionType == "insert") {
            await apiService.commonPostCall("Master/InsertDepartmentMaster", data);
            Swal.fire("Data Inserted successfully");
            router.push("/Masters/DepartmentMaster");
        } else {
            debugger
            await apiService.commonPostCall("Master/UpdateDepartmentMaster", data);
            Swal.fire("Data Updated successfully");
            router.push("/Masters/DepartmentMaster");
        }
    };

    function clearForm(departmentMaster = null) {
        let details = {
            "ID": departmentMaster ? departmentMaster.id : "",
            "Department_name": departmentMaster ? departmentMaster.department_name : "",
            "Department_Desc": departmentMaster ? departmentMaster.department_Desc : "",
        }
        reset(details);
        setActionType(departmentMaster ? "update" : "insert");
    }

    useEffect(() => {
        const { id } = editData || {};
        if (id) {
            // This API is used to fetch the data from BarangayMaster ByID table
            getDepartmentMasterByID(id);
        } else {
            clearForm();
        }
    }, []);
    const getDepartmentMasterByID = async (id) => {
        const res = await apiService.commonGetCall(
            "Master/GetDepartmentMasterByID?ID=" + id
        );
        clearForm(res.data[0]);
    };



    return (
        <Layout>
            <h5 className="Heading">Department Master</h5>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="card shadow p-3 border-0 mx-0 mt-3">
                    <div className="row ">
                        <div className="col-lg-2">
                            <label >Department Name<span id={Styles.span}>*</span></label>
                        </div>
                        <div className="col-lg-4">
                            <label >Department Description<span id={Styles.span}>*</span></label>
                        </div>
                    </div>
                    <div className="row ">
                        <div className="col-lg-2">
                            <input name="DepartmentMaster" type="text" {...register('Department_name', {
                                required: "Department Name is required", pattern: {

                                    value: '^[A-Za-z0-9 ]+$',

                                    message: "Please enter a valid Position Name"

                                }
                            })} className={`form-control`} />

                            {errors.Department_name && <p className="error-message" style={{ color: "red" }}>{errors.Department_name.message}</p>}

                            {/* <div className="invalid-feedback">{errors.Department_name?.message}</div> */}

                        </div>
                        <div className="col-lg-4">
                            <textarea rows="3" type="text"  {...register('Department_Desc', {
                                required: "Please add a Description ", pattern: {

                                    value: '^[A-Za-z0-9 ]+$',

                                    message: "Please enter a valid Position Name"

                                }
                            })} placeholder="Description" className="form-control"></textarea>
                            {errors.Department_Desc && <p className="error-message" style={{ color: "red" }}>{errors.Department_Desc.message}</p>}


                        </div>
                    </div>
                    <br /><br />
                    <div className="row mx-0">
                        <div className="col-lg-8"></div>

                        <div className="col-lg-2">
                            <Link href="/Masters/DepartmentMaster"  ><button className="AddButton">Cancel</button></Link>
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

                </div>
            </form>
        </Layout>
    )
}

export default DepartmentMasterForm