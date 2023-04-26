import React, { useState, useEffect } from 'react'
import Styles from '../../../styles/DepartmentMasterForm.module.css'
import { useForm } from 'react-hook-form';
import Layout from '../../../components/layout/layout'
import Link from 'next/link';
import axios from 'axios';
import Swal from 'sweetalert2';
const DepartmentMasterForm = ({ editData }) => {



    // get functions to build form with useForm() hook
    const { register, handleSubmit, reset, formState } = useForm();
    const { errors } = formState;
    let [actionType, setActionType] = useState("insert");
    let hostURL = process.env.NEXT_PUBLIC_API_HOST_URL;




    async function onSubmit(data) {
        // alert(JSON.stringify(data))
        console.log(data);
        if (actionType == "insert") {


            await axios.post(hostURL + 'Master/InsertDepartmentMaster', data); //gurukiran@amazeinc.in api call for insert of data
            Swal.fire({ icon: "success", text: "Data Successfully added" })
            location.href = "/Masters/DepartmentMaster/";

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
                    axios.post(hostURL + 'Master/UpdateDepartmentMaster', data); //gurukiran@amazeinc.in api call for updating the data
                    Swal.fire(
                        'Updated!',
                        'Your file has been updated.',
                        'success'
                    )
                    location.href = "/Masters/DepartmentMaster/";
                }
            })
        }

    }
    function clearForm(departmentMaster = null) {
        let details = {
            "ID": departmentMaster ? departmentMaster.id : "",
            "Department_name": departmentMaster ? departmentMaster.department_name : "",
            "Department_Desc": departmentMaster ? departmentMaster.department_Desc : "",
        }
        reset(details);
        setActionType(departmentMaster ? "update" : 'insert')
    }

    useEffect(() => {
        async function getDepartmentMasterByID() {
            if (editData == "") {
                clearForm()
            }
            else {
                clearForm(editData);
            }
        }
        getDepartmentMasterByID();
    }, []);

    return (
        <Layout>
            <h5 className='fw-bold ' id={Styles.h5}>Department Master</h5>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="card shadow-lg mt-4 p-3" id={Styles.card}>
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
                    <div className="row">
                        <div className="col-lg-8"></div>

                        <div className="col-lg-2">
                            <Link href="/Masters/departmentmasterdashboard" className=" btn btn-primary form-control  shadow-lg" >Cancel</Link>
                        </div>
                        <div className="col-lg-2">
                            {actionType == "insert" && (

                                <button type="submit" id={Styles.actionBtn} className="btn btn-primary">

                                    Save

                                </button>

                            )}

                            {actionType == "update" && (

                                <button type="submit" id='AddButton' className="btn btn-primary">

                                    Update

                                </button>

                            )}
                            {/* <button className=" btn btn-primary form-control shadow-lg ">Submit</button> */}
                        </div>
                    </div>

                </div>
            </form>
        </Layout>
    )
}

export default DepartmentMasterForm