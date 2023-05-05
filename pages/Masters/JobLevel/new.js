import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Layout from '../../../components/layout/layout';
import axios from "axios";
import Swal from "sweetalert2";
import Link from "next/link";
function LevelTypeForm({ editData }) {

    const { register, handleSubmit, reset, formState: { errors }, } = useForm();



    let [actionType, setActionType] = useState("insert");



    const onSubmit = async (data) => {
        console.log(JSON.stringify(data));
        let hostURL = process.env.NEXT_PUBLIC_API_HOST_URL;
        if (actionType == "insert") {
            await axios.post(hostURL + "Master/InsertLevelType", data) // inserting new job level type data [Shashank]
            location.href = "/Masters/JobLevel";
            Swal.fire({
                icon: 'success',
                title: 'Added Successfully',
            })

        } else {
            Swal.fire({
                title: 'Are you sure to update?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, update it!'
            }).then((result) => {
                if (result.isConfirmed) {
                    axios.post(hostURL + "Master/UpdateLevelType", data) // updating existing data [Shashank]
                    sessionStorage.removeItem("id");
                    Swal.fire({
                        icon: "success",
                        titleText: "Updated Successfully"
                    })
                    location.href = "/Masters/JobLevel";
                }
            })

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

    let ID;

    useEffect(() => {
        if (editData == "") {
            clearForm();
        }
        else {
            clearForm(editData);
        }
    }, [])


    return (
        <Layout>
            <div className="container">
                <h3 className='Heading'>Job Level Type Details</h3>
                <div className='card p-4 border-0 rounded-3 mt-4 mx-0'>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="row ">
                            <div className="col-lg-4">
                                <p>Level Type <i className="text-danger">*</i></p>
                                <input
                                    name="Short"
                                    className="form-control"
                                    type="text"
                                    {...register("Short", { required: true })}
                                    placeholder="Level Type"
                                />
                                <div>
                                    {errors.Short && (
                                        <span className="mt-2 text-danger">
                                            Please enter name
                                        </span>
                                    )}
                                </div>
                            </div>
                            <div className="col-lg-4">
                                <p>Description <i className="text-danger">*</i></p>
                                <textarea
                                    name="Description"
                                    className="form-control"
                                    {...register("Description", { required: true })}
                                    placeholder="Description"
                                />
                                <div>
                                    {errors.Description && (
                                        <span className="text-danger mt-2" >
                                            Please enter description
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                        <br></br>
                        <div className="row ">
                            <div className="col-lg-8"></div>
                            <div className="col-lg-2 ">
                                <Link href="/Masters/JobLevel">
                                    <button
                                        type="button"
                                        className=" AddButton" >
                                        Close
                                    </button>
                                </Link>
                            </div>
                            <div className="col-lg-2">
                                {actionType == "insert" && (
                                    <button type="submit" className="AddButton" >
                                        Save
                                    </button>
                                )}
                                {actionType == "update" && (
                                    <button type="submit" className="AddButton" >
                                        Update
                                    </button>
                                )}
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </Layout>
    )
}

export default LevelTypeForm