import React from 'react'

import axios from "axios";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import Link from "next/link";
import Layout from '@/components/layout/layout'
import Styles from '../../../styles/sssconfigadd.module.css'
const SSSForm = ({ }) => {
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

        await axios.post(hostURL + "HR/InsertSSSconfogaration", data);
        Swal.fire("sss Inserted succefully!");
        location.href = "/Settings/SSS";

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
                <label className='Heading'>SSS Tax Configuration Form</label>
                <br /><br />
                <div className='row'>
                    <div className='col-lg-12'>
                        <div className='card p-3 border-0  rounded-3'>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                
                                    <div className="row">
                                        <div className="col-lg-3">
                                            <label className="fw-bold" >
                                                Taxable income low limit <span className={Styles.span}>*</span>
                                            </label>
                                            <input
                                                name="lowLimit"
                                                type="text"
                                                className='form-control mt-2'
                                                {...register("Taxiableincomelowlimit", { required: true })}
                                            />
                                            {errors.Taxiableincomelowlimit && (
                                                <span style={customStyles.errorMsg}>
                                                    Please Taxiable income low limit
                                                </span>
                                            )}
                                            <br/>
                                        </div>
                                        <div className="col-lg-3">
                                            <label className="fw-bold" >
                                                Taxable income high limit <span className={Styles.span}>*</span>
                                            </label>
                                            <input
                                                name="highLimit"
                                                type="text"
                                                className='form-control'
                                                {...register("taxiableincomehighlimit", { required: true })}

                                            />
                                            {errors.Taxableincomehighlimit && (
                                                <span style={customStyles.errorMsg}>
                                                    Please Taxable income high limit
                                                </span>
                                            )}
                                        </div>
                                        <div className="col-lg-2">
                                            <label className="fw-bold" >
                                                SSS_EE value <span className={Styles.span}>*</span>
                                            </label>
                                            <input
                                                name="Philhealth"
                                                type="text"
                                                className='form-control '
                                                {...register("SSS_EEvalue", { required: true })}

                                            />
                                            {errors.SSS_EEvalue && (
                                                <span style={customStyles.errorMsg}>
                                                    Please  Enter SSS EEvalue
                                                </span>
                                            )}
                                        </div>
                                        <div className="col-lg-2">
                                            <label className="fw-bold" >
                                                SSS_ER value <span className={Styles.span}>*</span>
                                            </label>
                                            <input
                                                name="Philhealth"
                                                type="text"
                                                className='form-control'
                                                {...register("SSS_ERvalue", { required: true })}

                                            />
                                            {errors.SSS_ERvalue && (
                                                <span style={customStyles.errorMsg}>
                                                    Please Enter SSS ERvalue
                                                </span>
                                            )}
                                        </div>
                                        <div className="col-lg-2">
                                            <label className="fw-bold">
                                                SSS_EC value <span className={Styles.span}>*</span>
                                            </label>
                                            <input
                                                name="Philhealth"
                                                type="text"
                                                className='form-control'
                                                {...register("SSS_Ecvalue", { required: true })}

                                            />
                                            {errors.SSS_Ecvalue && (
                                                <span style={customStyles.errorMsg}>
                                                    Please Enter SSS Ecvalue
                                                </span>
                                            )}
                                        </div>
                                        <div className="col-lg-2">
                                            <label className="fw-bold" >
                                                Year<span className={Styles.span}>*</span>
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
                                    <br/>
                                    <div className="row ">
                                    <div className="col-lg-8"></div>
                                    <div className="col-lg-2">
                                            <Link href="/Settings/SSS">
                                                <button className='AddButton'>Cancel</button>
                                            </Link>
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

export default SSSForm