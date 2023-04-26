import React, { useState, useEffect } from 'react'
import Layout from '@/components/layout/layout'
import { useForm } from "react-hook-form";
import axios from 'axios'
import Link from "next/link";
import Swal from 'sweetalert2';
import Styles from '@/Styles/AnnualTaxForm.module.css'


const AnnualTaxForm = ({ editData }) => {
    const [actionType, setActionType] = useState("insert");
    const { register, handleSubmit, reset, formState } = useForm();
    const { errors } = formState;
    let ID;
    let hostURL = process.env.NEXT_PUBLIC_API_HOST_URL;

    async function onSubmit(data) {
        if (actionType == "insert") {
            await axios.post(hostURL + "HR/InsertTaxconfigaration", data); //naveen.th@amazeinc.in, Insert API for tax configuration, to add new data
            Swal.fire("Added succesfullly");
            location.href = "/Masters/AnnualTax";
        } else {
            await axios.post(hostURL + "HR/UpdateTaxconfigaration", data); //naveen.th@amazeinc.in, Update API for tax configuration, to update data
            Swal.fire("Updated succesfullly");
            sessionStorage.removeItem("annualTaxID");
            location.href = "/Masters/AnnualTax";
        }
        await axios.get(hostURL + "HR/GetTaxconfigaration");
    }
    useEffect(() => {
        if (editData == "") {
            clearForm();
        } else {
            clearForm(editData);
        }
    }, [1]);
    // const getAnnualTaxByID = async () => {
    //     let res = await axios.get(hostURL + "HR/GetTaxconfigarationByID?ID=" + ID);  //naveen.th@amazeinc.in, Get by ID API for tax configuration, to fetch data
    //     clearForm(res.data[0]);
    // };
    function clearForm(existingData = null) {
        let etty = {
            "ID": existingData ? existingData.id : "",
            "Taxlowlevellimit": existingData ? existingData.taxlowlevellimit : "",
            "Taxhighlevellimit": existingData ? existingData.taxhighlevellimit : "",
            "slab": existingData ? existingData.slab : "",
            "Percentage": existingData ? existingData.percentage : "",
            "Taxexcessamount": existingData ? existingData.taxexcessamount : "",
            "Taxdeductionamount": existingData ? existingData.taxdeductionamount : "",
            "Year": existingData ? existingData.year : "",
        };
        reset(etty);
        setActionType(existingData ? "update" : "insert");
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
            <div>
                <h3 className="Heading fs-5 mt-3">
                    Annual Tax Configuration Form
                </h3>
                <div className="card p-3 border-0 shadow-lg rounded-3 mt-4">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="row">
                            <div className="col-lg-2 mt-4">
                                <p>
                                    Tax low level limit <i className="text-danger">*</i>
                                </p>
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
                                <div>
                                    {errors.Taxlowlevellimit && (
                                        <span style={customStyles.errorMsg}>
                                            Please enter tax low level limit
                                        </span>
                                    )}
                                </div>
                            </div>

                            <div className="col-lg-2 mt-4">
                                <p>
                                    Tax high level limit <i className="text-danger">*</i>
                                </p>
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

                            <div className="col-lg-2 mt-4">
                                <p>
                                    Slab <i className="text-danger">*</i>
                                </p>
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

                            <div className="col-lg-2 mt-4">
                                <p>
                                    Percentage <i className="text-danger">*</i>
                                </p>
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

                            <div className="col-lg-2 mt-4">
                                <p>
                                    Tax excess amount <i className="text-danger">*</i>
                                </p>
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

                            <div className="col-lg-2 mt-4">
                                <p>
                                    Tax deduction amount <i className="text-danger">*</i>
                                </p>
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

                            <div className="col-lg-2 mt-4">
                                <p>
                                    Year <i className="text-danger">*</i>
                                </p>
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
                        <div className="row ">
                            <div className="col-lg-6"></div>
                            <div className="col-lg-6">
                                <Link href="/Masters/AnnualTax">
                                    <button
                                        type="button"
                                        className={'mx-3 ' + Styles.SaveCloseBtn}

                                    >
                                        Cancel
                                    </button>
                                </Link>



                                {actionType == "insert" && (
                                    <button type="submit" className={Styles.SaveCloseBtn}>
                                        Save
                                    </button>
                                )}

                                {actionType == "update" && (
                                    <button type="submit" className={Styles.SaveCloseBtn} >
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

export default AnnualTaxForm

