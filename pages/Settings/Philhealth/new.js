import React from 'react'
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from 'next/link';
import Styles from '../../../styles/philhealthadd.module.css'
import Swal from 'sweetalert2';
import Layout from '@/components/layout/layout'

const PhilhealthForm = ({ editData }) => {
    const { register, handleSubmit, watch, reset, formState: { errors }, } = useForm();

    async function onSubmit(data) {
        let hostURL = process.env.NEXT_PUBLIC_API_HOST_URL;
        try {
            await axios.post(hostURL + "HR/InsertPhihealthconfogaration", data);
        } catch (error) { }
        Swal.fire("Added succesfullly");
        location.href = '/Settings/Philhealth';

    }

    return (
        <Layout>
            <div className='container-fluid'>

                <label className='Heading'>Phihealth Configuration Form</label>
                <br /><br />
                <div className='row'>
                    <div className='col-lg-12'>
                        <div className='card p-3 border-0  rounded-3'>
                            <form onSubmit={handleSubmit(onSubmit)}>

                                <div className="row">
                                    <div className="col-lg-3">
                                        <label className='fw-bold'>
                                            Taxable income low limit <span className={Styles.span} >*</span>
                                        </label>
                                        <input
                                            name="lowLimit"
                                            type="text"
                                            className='form-control'
                                            {...register("Taxiableincomelowlimit", {
                                                required: "Please add a Tax Name",
                                                pattern: {
                                                    value: /^[A-Za-z0-9]+$/,
                                                    message: "Please enter a valid Tax Name",
                                                },
                                            })}
                                        />
                                        <div className="invalid-feedback">
                                            {errors.lowLimit?.message}
                                        </div>
                                        <br/>
                                    </div>
                                    <div className="col-lg-3">
                                        <label className='fw-bold'>
                                            Taxable income high limit <span className={Styles.span}>*</span>
                                        </label>
                                        <input
                                            name="highLimit"
                                            type="text"
                                            className='form-control'
                                            {...register("Taxiableincomehighlimit", {
                                                required: "Please add a Tax Name",
                                                pattern: {
                                                    value: /^[A-Za-z0-9]+$/,
                                                    message: "Please enter a valid Tax Name",
                                                },
                                            })}
                                        />
                                        <div className="invalid-feedback">
                                            {errors.highLimit?.message}
                                        </div>
                                    </div>
                                    <div className="col-lg-2">
                                        <label className='fw-bold'>
                                            Phihealth value <span className={Styles.span}>*</span>
                                        </label>
                                        <input
                                            name="Philhealth"
                                            type="text"
                                            className='form-control'
                                            {...register("Phihealthvalue", {
                                                required: "Please add a Phihealth value",
                                                pattern: {
                                                    value: /^[A-Za-z0-9]+$/,
                                                    message: "Please enter a valid Phihealth value",
                                                },
                                            })}
                                        />
                                        <div className="invalid-feedback">
                                            {errors.Philhealth?.message}
                                        </div>
                                    </div>
                                    <div className="col-lg-2">
                                        <label className='fw-bold'>
                                            Year<span className={Styles.span}>*</span>
                                        </label>
                                        <select
                                            className="form-select"
                                            {...register("Year", {
                                                required: "Please add a year",
                                                pattern: {
                                                    value: /^[A-Za-z0-9]+$/,
                                                    message: "Please enter a valid year",
                                                },
                                            })}
                                        >
                                            <option>2023</option>
                                            <option>2023</option>
                                            <option>2024</option>
                                            <option>2025</option>
                                            <option>2026</option>
                                            <option>2027</option>
                                            <option>2028</option>
                                        </select>
                                    </div>
                                </div>
                                <br />
                                <div className="row ">
                                    <div className="col-lg-8"></div>
                                    <div className="col-lg-2">
                                        <Link href="/Settings/Philhealth">
                                            <button className='AddButton' >Cancel</button>
                                        </Link>
                                        {/* <button id={Styles.Save}>Save</button> */}
                                    </div>
                                    <div className="col-lg-2">

                                        <button
                                            type="submit"

                                            className='AddButton'
                                        >
                                            Save
                                        </button>



                                    </div>

                                </div>

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default PhilhealthForm