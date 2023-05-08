import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import Layout from '../../../components/layout/layout'
import axios from 'axios';
import Swal from 'sweetalert2';
import Link from 'next/link';
function DivDivisionMaster() {

    let hostURL = process.env.NEXT_PUBLIC_API_HOST_URL;


    // get functions to build form with useForm() hook
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const onSubmit = async (data) => {

        await axios.post(hostURL + "Master/InsertDivisionMaster", data) // inserting new division master data [Shashank]
        location.href = "/Masters/DivisionMaster"
        Swal.fire({
            icon: 'success',
            title: 'Added Successfully',
        })

    }



    return (
        <Layout>
            <div className="container">
                <h3 className='Heading'>Division Master</h3>
                <div className='card p-3 border-0 shadow rounded-3 mt-3 mx-0'>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="row ">
                            <div className="col-lg-4">
                                <p>Short Name <i className="text-danger">*</i></p>
                                <input
                                    name="Short"
                                    className="form-control"
                                    type="text"
                                    {...register("Short", { required: true })}
                                    placeholder="Short Name"
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
                        <div className="row">
                            <div className="col-lg-8"></div>
                            <div className="col-lg-2">
                                <Link href="/Masters/DivisionMaster">
                                    <button
                                        type="button"
                                        className="AddButton" >
                                        Close
                                    </button>
                                </Link>
                            </div>
                            <div className="col-lg-2">

                                <button type='submit' className="AddButton">Save</button>


                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </Layout>
    )
}

export default DivDivisionMaster;

