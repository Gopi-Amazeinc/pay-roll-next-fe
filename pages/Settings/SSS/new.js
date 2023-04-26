import React from 'react'
import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import Link from "next/link";
import Layout from '@/components/layout/layout'
import Styles from '@/Styles/sssconfigadd.module.css'
const SSSForm = ({ editData }) => {
    const yearOptions = [
        { id: 1, year: "2023" },
        { id: 2, year: "2023" },
        { id: 3, year: "2024" },
        { id: 4, year: "2025" },
        { id: 5, year: "2026" },
        { id: 6, year: "2027" },
        { id: 7, year: "2028" },
    ];

    let hostURL = process.env.NEXT_PUBLIC_API_HOST_URL;
    const [actionType, setActionType] = useState("insert");
    // form validation rules
    const { register, handleSubmit, reset, formState } = useForm();
    const { errors } = formState;

    // get functions to build form with useForm() hook
    // useEffect(() => {
    //     const getSssConfiguationist = async () => {
    //         debugger;
    //         const id = sessionStorage.getItem("id");
    //         if (id) {
    //             const response = await axios.get(
    //                 hostURL + "HR/GetSSSconfogarationByID?ID=" + id
    //             );
    //             clearForm(response.data[0]);
    //         } else {
    //             clearForm();
    //         }
    //     };
    //     getSssConfiguationist();
    // }, [1]);

    const onSubmit = async (data) => {
        debugger;
        console.log(data);
        if (actionType == "insert") {
            await axios.post(hostURL + "HR/InsertSSSconfogaration", data);
            Swal.fire("sss Inserted succefully!");
            location.href = "/Configuration/sss";
        } else {
            let res = await axios.post(hostURL + "HR/UpdateSSSconfogaration", data);
            sessionStorage.removeItem("id");
            Swal.fire("sss updated succefully!");
            location.href = "/Configuration/sss";
        }
    };
    const clearForm = (existingData = null) => {
        let etty = {
            ID: existingData ? existingData.id : "",
            Taxiableincomelowlimit: existingData ? existingData.taxiableincomelowlimit : "",
            Taxableincomehighlimit: existingData ? existingData.taxiableincomehighlimit : "",
            SSS_EEvalue: existingData ? existingData.ssS_EEvalue : "",
            SSS_ERvalue: existingData ? existingData.ssS_ERvalue : "",
            SSS_Ecvalue: existingData ? existingData.ssS_Ecvalue : "",
            Year: existingData ? existingData.year : "",
        };
        reset(etty);
        setActionType(existingData ? "update" : "insert");
    };
    const customStyles = {
        errorMsg: {
            fontSize: "12px",
            fontWeight: "500",
            color: "red",
        },
        inputLabel: {
            fontSize: "16px",
        },
    };
    useEffect(() => {
        if (editData == "") {
            clearForm();
        } else {
            clearForm(editData);
        }
    }, [1]);
    return (
        <Layout>
            <div>
                <div className={Styles.row}>
                    <div className="col-md-12">
                        <div className="row">
                            <div className="col-lg-3">
                                <br />
                                <h3 className="text-primary fs-5 mt-3 fw-bold">
                                    Sss Tax Configuration Form
                                </h3>
                            </div>
                            <div className="col-lg-7"></div>
                            <div className="col-lg-2"></div>
                        </div>
                        <br />
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div id={Styles.card} className="card shadow-lg p-3">
                                <div className="row">
                                    <div className="col-lg-3">
                                        <label className="fw-bold" style={customStyles.inputLabel}>
                                            Taxable income low limit <span id={Styles.span}>*</span>
                                        </label>
                                        <input
                                            name="lowLimit"
                                            type="text"
                                            className={`form-control mt-2 `}
                                            {...register("Taxiableincomelowlimit", { required: true })}
                                        />
                                        {errors.Taxiableincomelowlimit && (
                                            <span style={customStyles.errorMsg}>
                                                Please Taxiable income low limit
                                            </span>
                                        )}
                                    </div>
                                    <div className="col-lg-3">
                                        <label className="fw-bold" style={customStyles.inputLabel}>
                                            Taxable income high limit <span id={Styles.span}>*</span>
                                        </label>
                                        <input
                                            name="highLimit"
                                            type="text"
                                            className={`form-control mt-2`}
                                            {...register("Taxableincomehighlimit", { required: true })}

                                        />
                                        {errors.Taxableincomehighlimit && (
                                            <span style={customStyles.errorMsg}>
                                                Please Taxable income high limit
                                            </span>
                                        )}
                                    </div>
                                    <div className="col-lg-2">
                                        <label className="fw-bold" style={customStyles.inputLabel}>
                                            SSS_EE value <span id={Styles.span}>*</span>
                                        </label>
                                        <input
                                            name="Philhealth"
                                            type="text"
                                            className={`form-control mt-2 `}
                                            {...register("SSS_EEvalue", { required: true })}

                                        />
                                        {errors.SSS_EEvalue && (
                                            <span style={customStyles.errorMsg}>
                                                Please  Enter SSS EEvalue
                                            </span>
                                        )}
                                    </div>
                                    <div className="col-lg-2">
                                        <label className="fw-bold" style={customStyles.inputLabel}>
                                            SSS_ER value <span id={Styles.span}>*</span>
                                        </label>
                                        <input
                                            name="Philhealth"
                                            type="text"
                                            className={`form-control mt-2 `}
                                            {...register("SSS_ERvalue", { required: true })}

                                        />
                                        {errors.SSS_ERvalue && (
                                            <span style={customStyles.errorMsg}>
                                                Please Enter SSS ERvalue
                                            </span>
                                        )}
                                    </div>
                                    <div className="col-lg-2">
                                        <label className="fw-bold" style={customStyles.inputLabel}>
                                            SSS_EC value <span id={Styles.span}>*</span>
                                        </label>
                                        <input
                                            name="Philhealth"
                                            type="text"
                                            className={`form-control mt-2 `}
                                            {...register("SSS_Ecvalue", { required: true })}

                                        />
                                        {errors.SSS_Ecvalue && (
                                            <span style={customStyles.errorMsg}>
                                                Please Enter SSS Ecvalue
                                            </span>
                                        )}
                                    </div>
                                    <div className="col-lg-2">
                                        <label className="fw-bold" style={customStyles.inputLabel}>
                                            Year<span id={Styles.span}>*</span>
                                        </label>
                                        <select className="form-select"
                                            {...register("Year", { required: true })}

                                        >
                                            {yearOptions.map((year) => {
                                                return (
                                                    <option key={year.id} value={year.year}>
                                                        {year.year}
                                                    </option>
                                                );
                                            })}

                                        </select>
                                        {errors.Year && (
                                            <span style={customStyles.errorMsg}>
                                                Please select Year
                                            </span>
                                        )}
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-lg-9"></div>

                                    <div className="col-lg-1">
                                        <Link href="/Configuration/sss">
                                            <button id={Styles.Cancel}>Cancel</button>
                                        </Link>
                                    </div>
                                    <div className="col-lg-1">
                                        {actionType == "insert" && (
                                            <button
                                                type="submit"
                                                id={Styles.Save}
                                            >
                                                Save
                                            </button>
                                        )}
                                        {actionType == "update" && (
                                            <button
                                                type="submit"
                                                id={Styles.Save}
                                            >
                                                Update
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default SSSForm