import React, { useState, useEffect } from 'react'
import Layout from '@/components/layout/layout'
import { useForm } from "react-hook-form";
import { apiService } from "@/services/api.service";
import Link from "next/link";
import Swal from 'sweetalert2';
import Styles from '../../../styles/annualtaxform.module.css'

import { useRouter } from "next/router"
const AnnualTaxForm = ({ editData }) => {
    const router = useRouter();

    const { register, handleSubmit, watch, reset, formState: { errors }, } = useForm();
    const [actionType, setActionType] = useState("insert");


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

    useEffect(() => {
        const { id } = editData || {};
        if (id) {

            getData(id);
        } else {
            clearForm();
        }
    }, []);
    const getData = async (id) => {
        const res = await apiService.commonGetCall(
            "HR/GetTaxconfigarationByID?ID=" + id
        );
        clearForm(res.data[0]);
    };
    const onSubmit = async (data) => {
        if (actionType == "insert") {
            await apiService.commonPostCall("HR/InsertTaxconfigaration", data) // inserting new division master data [Shashank]
            router.push('/Settings/AnnualTax');
            Swal.fire({
                icon: 'success',
                title: 'Added Successfully',
            })
        } else {
            await apiService.commonPostCall("HR/UpdateTaxconfigaration", data); // this is for updating or Modifiying the data using  Update Api call
            Swal.fire('Updated successfully')
            router.push('/Settings/AnnualTax');
        }
    };



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
                                            {...register("Taxlowlevellimit", {
                                                required: true,
                                                pattern: /^\d+/
                                            })} />
                                        <div className="error-message" style={customStyles.errorMsg}>

                                            {errors.Taxlowlevellimit?.type === 'required' &&
                                                " Please enter tax low level limit"}
                                            {errors.Taxlowlevellimit?.type === "pattern" &&
                                                "Value only"
                                            }
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
                                            {...register("Taxhighlevellimit", {
                                                required: true,
                                                pattern: /^\d+/
                                            })} />
                                        <div className="error-message" style={customStyles.errorMsg}>

                                            {errors.Taxhighlevellimit?.type === 'required' &&
                                                " Please enter tax high level limit"}
                                            {errors.Taxhighlevellimit?.type === "pattern" &&
                                                "Value only"
                                            }
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
                                            }} maxLength={3}
                                            {...register("Percentage", { required: true,pattern:/^((100)|(\d{1,2}?))$/g })}
                                            placeholder="Percentage(%)"
                                        />
                                        <div>
                                            {errors.Percentage?.type==='required' && (
                                                <span style={customStyles.errorMsg}>
                                                    Please enter percentage
                                                </span>
                                            )}
                                              {errors.Percentage?.type==='pattern' && (
                                                <span style={customStyles.errorMsg}>
                                                    Please enter percentage (eg 0-100)
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
                                        <select className="form-select" {...register("Year", { required: "Enter Year" })}>
                                            <option value=''>Select Year</option>
                                            <option value={2023}>2023</option>
                                            <option value={2024}>2024</option>
                                            <option value={2025}>2025</option>
                                            <option value={2026}>2026</option>
                                            <option value={2027}>2027</option>
                                            <option value={2028}>2028</option>
                                        </select>
                                        {errors.Year && <p className="error-message" style={customStyles.errorMsg}>{errors.Year.message}</p>}
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

export default AnnualTaxForm

