import React from 'react'
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import Link from 'next/link';
import Styles from '../../../styles/philhealthadd.module.css'
import Swal from 'sweetalert2';
import Layout from '@/components/layout/layout'
import { apiService } from "@/services/api.service";

const PhilhealthForm = ({ editData }) => {
    const { register, handleSubmit, watch, reset, formState } = useForm();
    const [actionType, setActionType] = useState("insert");
    const { errors } = formState;
    const router = useRouter();

    function clearForm(PhillhealthData = null) {
        debugger;
        let details = {
            ID: PhillhealthData ? PhillhealthData.id : "",
            Taxiableincomelowlimit: PhillhealthData
                ? PhillhealthData.taxiableincomelowlimit
                : "",
            Taxiableincomehighlimit: PhillhealthData
                ? PhillhealthData.taxiableincomehighlimit
                : "",
            Phihealthvalue: PhillhealthData ? PhillhealthData.phihealthvalue : "",
            Year: PhillhealthData ? PhillhealthData.year : "",
        };
        reset(details);
        setActionType(PhillhealthData ? "update" : "insert");
    }
    useEffect(() => {
        const { id } = editData || {};
        if (id) {
            // This API is used to fetch the data from BarangayMaster ByID table
            getData(id);
        } else {
            clearForm();
        }
    }, []);

    const getData = async (id) => {
        const res = await apiService.commonGetCall(
            "HR/GetPhihealthconfogarationByID?ID=" + id
        );
        clearForm(res.data[0]);
    };

    const onSubmit = async (data) => {
        if (actionType == "insert") {
            await apiService.commonPostCall("HR/InsertPhihealthconfogaration", data) // inserting new division master data [Shashank]
            router.push('/Settings/Philhealth');
            Swal.fire({
                icon: 'success',
                title: 'Added Successfully',
            })
        } else {
            await apiService.commonPostCall("HR/UpdatePhihealthconfogaration", data); // this is for updating or Modifiying the data using  Update Api call
            Swal.fire('Updated successfully')
            router.push('/Settings/Philhealth');
        }
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
                                            className='form-control' placeholder='Taxiable income low limit'
                                            onKeyPress={(event) => {
                                                const charCode = (event.which) ? event.which : event.keyCode;
                                                if (charCode !== 46 && charCode > 31 && (charCode < 48 || charCode > 57)) {
                                                    event.preventDefault();
                                                }
                                            }} maxLength={10}
                                            {...register("Taxiableincomelowlimit", {
                                                required: true,
                                                pattern: {
                                                    value: /^[A-Za-z0-9]+$/,
                                                    message: "Please enter a valid Tax Name",
                                                },
                                            })}
                                        />
                                        {errors.Taxiableincomelowlimit && (
                                            <span style={customStyles.errorMsg}>
                                                Please enter a limit
                                            </span>
                                        )}
                                        <br />
                                    </div>
                                    <div className="col-lg-3">
                                        <label className='fw-bold'>
                                            Taxable income high limit <span className={Styles.span}>*</span>
                                        </label>
                                        <input
                                            name="highLimit"
                                            type="text"
                                            className='form-control' placeholder='Taxiable income high limit'
                                            onKeyPress={(event) => {
                                                const charCode = (event.which) ? event.which : event.keyCode;
                                                if (charCode !== 46 && charCode > 31 && (charCode < 48 || charCode > 57)) {
                                                    event.preventDefault();
                                                }
                                            }} maxLength={10}
                                            {...register("Taxiableincomehighlimit", {
                                                required: true,
                                                pattern: {
                                                    value: /^[A-Za-z0-9]+$/,
                                                    message: "Please enter a limit",
                                                },
                                            })}
                                        />
                                        {errors.Taxiableincomehighlimit && (
                                            <span style={customStyles.errorMsg}>
                                                Please enter a valid Tax Name
                                            </span>
                                        )}
                                    </div>
                                    <div className="col-lg-2">
                                        <label className='fw-bold'>
                                            Phihealth value <span className={Styles.span}>*</span>
                                        </label>
                                        <input
                                            name="Philhealth"
                                            type="text"
                                            className='form-control' placeholder='Phihealth value'
                                            onKeyPress={(event) => {
                                                const charCode = (event.which) ? event.which : event.keyCode;
                                                if (charCode !== 46 && charCode > 31 && (charCode < 48 || charCode > 57)) {
                                                    event.preventDefault();
                                                }
                                            }}
                                            {...register("Phihealthvalue", { required: true })}
                                        />
                                        {errors.Phihealthvalue?.type === 'required' && (
                                            <span style={customStyles.errorMsg}>
                                                Please enter a valid Phihealth value
                                            </span>
                                        )}
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
                                            <option value=''>Select Year</option>
                                            <option>2023</option>
                                            <option>2023</option>
                                            <option>2024</option>
                                            <option>2025</option>
                                            <option>2026</option>
                                            <option>2027</option>
                                            <option>2028</option>
                                        </select>
                                        {errors.Year && (
                                            <span style={customStyles.errorMsg}>
                                                Please enter Year
                                            </span>
                                        )}
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
                                    <div className='col-lg-2'>
                                        {
                                            actionType == "insert" && (
                                                <button type='submit' className="AddButton" >Save</button>
                                            )
                                        }
                                        {
                                            actionType == "update" && (
                                                <button type='submit' className="AddButton" >Update</button>
                                            )
                                        }
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