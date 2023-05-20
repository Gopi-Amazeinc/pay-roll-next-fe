import React, { useState, useEffect } from 'react'
import Layout from '@/components/layout/layout'
import { useForm } from "react-hook-form";
import axios from 'axios'
import Link from "next/link";
import Swal from 'sweetalert2';
import Styles from '../../../styles/annualtaxform.module.css'


const AnnualTaxForm = () => {


    const { register, handleSubmit, watch, reset, formState: { errors }, } = useForm();


    async function onSubmit(data) {

        await axios.post(hostURL + "HR/InsertTaxconfigaration", data) // inserting new division master data [Shashank]
        location.href = "/Settings/AnnualTax";
        Swal.fire({
            icon: 'success',
            title: 'Added Successfully',
        })

    }

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
            <div className='container-fluid'>

                <label className='Heading'>Annual Tax Configuration Form</label>
                <br /><br />
                <div className='row'>
                    <div className='col-lg-12'>
                        <div className='card p-3 border-0  rounded-3'>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="row">
                                    <div className="col-lg-2 ">
                                        <label className='fw-bold'>
                                            Tax low level limit <i className="text-danger">*</i>
                                        </label>
                                        <input
                                            name="Taxlowlevellimit"
                                            className="form-control"
                                            type="text"
                                            onKeyPress={(event) => {
                                                const charCode = (event.which) ? event.which : event.keyCode;
                                                if (charCode !== 46 && charCode > 31 && (charCode < 48 || charCode > 57)) {
                                                    event.preventDefault();
                                                }
                                            }} maxLength={10}
                                            {...register("Taxlowlevellimit", { required: true })}
                                            placeholder="Tax low level limit"
                                        />
                                        <br/>
                                        <div>
                                            {errors.Taxlowlevellimit && (
                                                <span style={customStyles.errorMsg}>
                                                    Please enter tax low level limit
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    <div className="col-lg-2 ">
                                        <label className='fw-bold'>
                                            Tax high level limit <i className="text-danger">*</i>
                                        </label>
                                        <input
                                            name="Taxhighlevellimit"
                                            className="form-control"
                                            type="text"
                                            onKeyPress={(event) => {
                                                const charCode = (event.which) ? event.which : event.keyCode;
                                                if (charCode !== 46 && charCode > 31 && (charCode < 48 || charCode > 57)) {
                                                    event.preventDefault();
                                                }
                                            }} maxLength={10}
                                            {...register("Taxhighlevellimit", { required: true })}
                                            placeholder="Tax high level limit"
                                        />
                                        <div>
                                            {errors.Taxhighlevellimit && (
                                                <span style={customStyles.errorMsg}>
                                                    Please enter tax high level limit
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    <div className="col-lg-2 ">
                                        <label className='fw-bold'>
                                            Slab <i className="text-danger">*</i>
                                        </label>
                                        <input
                                            name="slab"
                                            className="form-control"
                                            type="text"
                                            onKeyPress={(event) => {
                                                const charCode = (event.which) ? event.which : event.keyCode;
                                                if (charCode !== 46 && charCode > 31 && (charCode < 48 || charCode > 57)) {
                                                    event.preventDefault();
                                                }
                                            }} maxLength={10}
                                            {...register("slab", { required: true })}
                                            placeholder="Slab"
                                        />
                                        <div>
                                            {errors.slab && (
                                                <span style={customStyles.errorMsg}>
                                                    Please enter slab
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    <div className="col-lg-2 ">
                                        <label className='fw-bold'>
                                            Percentage <i className="text-danger">*</i>
                                        </label>
                                        <input
                                            name="Percentage"
                                            className="form-control"
                                            type="text"
                                            onKeyPress={(event) => {
                                                const charCode = (event.which) ? event.which : event.keyCode;
                                                if (charCode !== 46 && charCode > 31 && (charCode < 48 || charCode > 57)) {
                                                    event.preventDefault();
                                                }
                                            }} maxLength={10}
                                            {...register("Percentage", { required: true })}
                                            placeholder="Percentage(%)"
                                        />
                                        <div>
                                            {errors.Percentage && (
                                                <span style={customStyles.errorMsg}>
                                                    Please enter percentage
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    <div className="col-lg-2 ">
                                        <label className='fw-bold'>
                                            Tax excess amount <i className="text-danger">*</i>
                                        </label>
                                        <input
                                            name="Taxexcessamount"
                                            className="form-control"
                                            type="text"
                                            onKeyPress={(event) => {
                                                const charCode = (event.which) ? event.which : event.keyCode;
                                                if (charCode !== 46 && charCode > 31 && (charCode < 48 || charCode > 57)) {
                                                    event.preventDefault();
                                                }
                                            }} maxLength={10}
                                            {...register("Taxexcessamount", { required: true })}
                                            placeholder="Tax excess amount"
                                        />
                                        <div>
                                            {errors.Taxexcessamount && (
                                                <span style={customStyles.errorMsg}>
                                                    Please enter tax excess amount
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    <div className="col-lg-2 ">
                                        <label className='fw-bold'>
                                            Tax deduction amount <i className="text-danger">*</i>
                                        </label>
                                        <input
                                            name="Taxdeductionamount"
                                            className="form-control"
                                            type="text"
                                            onKeyPress={(event) => {
                                                const charCode = (event.which) ? event.which : event.keyCode;
                                                if (charCode !== 46 && charCode > 31 && (charCode < 48 || charCode > 57)) {
                                                    event.preventDefault();
                                                }
                                            }} maxLength={10}
                                            {...register("Taxdeductionamount", { required: true })}
                                            placeholder="Tax deduction amount"
                                        />
                                        <div>
                                            {errors.Taxexcessamount && (
                                                <span style={customStyles.errorMsg}>
                                                    Please enter tax deduction amount
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    <div className="col-lg-2 ">
                                        <label className='fw-bold'>
                                            Year <i className="text-danger">*</i>
                                        </label>
                                        <select className="form-select" {...register("Year", { required: true })}>
                                            <option selected>Select Year</option>
                                            <option value={2023}>2023</option>
                                            <option value={2024}>2024</option>
                                            <option value={2025}>2025</option>
                                            <option value={2026}>2026</option>
                                            <option value={2027}>2027</option>
                                            <option value={2028}>2028</option>
                                        </select>
                                    </div>
                                </div>
                                <br />
                                <div className="row ">
                                    <div className="col-lg-8"></div>
                                    <div className="col-lg-2">
                                        <Link href="/Settings/AnnualTax">
                                            <button
                                                type="button"
                                                className='AddButton'

                                            >
                                                Cancel
                                            </button>
                                        </Link>



                                        {/* {actionType == "insert" && (
                                    <button type="submit" className={Styles.SaveCloseBtn}>
                                        Save
                                    </button>
                                )}

                                {actionType == "update" && (
                                    <button type="submit" className={Styles.SaveCloseBtn} >
                                        Update
                                    </button>
                                )} */}
                                    </div><div className='col-lg-2'>
                                        <button type='submit' className='AddButton'>Save</button>
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

export default AnnualTaxForm

