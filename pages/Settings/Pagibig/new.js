import React from 'react'
import Link from 'next/link'
import Styles from '../../../styles/pagibigadd.module.css'
import axios from 'axios';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2'
import { useEffect, useState } from 'react';
import Layout from '@/components/layout/layout'
import { apiService } from "@/services/api.service";
import { useRouter } from 'next/router';
const PagibigForm = ({ editData }) => {
    const [actionType, setActionType] = useState("insert");
    const { register, handleSubmit, watch, reset, formState: { errors }, } = useForm()
    const router = useRouter();
    function clearForm(userData = null) {
        let details = {
            "ID": userData ? userData.id : "",
            "Taxiableincomelowlimit": userData ? userData.taxiableincomelowlimit : "",
            "Taxiableincomehighlimit": userData ? userData.taxiableincomehighlimit : "",
            "Pagibigvalue": userData ? userData.pagibigvalue : "",
            "Year": userData ? userData.year : "",
        }
        reset(details);
        setActionType(userData ? "update" : "insert");
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
            "HR/GetPagibigconfogarationByID?ID=" + id
        );
        clearForm(res.data[0]);
    };

    const onSubmit = async (data) => {
        if (actionType == "insert") {
            await apiService.commonPostCall("HR/InsertPagibigconfogaration", data) // inserting new division master data [Shashank]
            router.push('/Settings/Pagibig');
            Swal.fire({
                icon: 'success',
                title: 'Added Successfully',
            })
        } else {
            await apiService.commonPostCall("HR/UpdatePagibigconfogaration", data); // this is for updating or Modifiying the data using  Update Api call
            Swal.fire('Updated successfully')
            router.push('/Settings/Pagibig');
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

                <label className='Heading'>Pagibig Form</label>
                <br /><br />
                <div className='row'>
                    <div className='col-lg-12'>
                        <div className='card p-3 border-0  rounded-3'>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="row">
                                    <div className="col-lg-3">
                                        <label className='fw-bold' >Taxable income low limit <span className={Styles.span}>*</span></label>
                                        <input type="text" className='form-control'placeholder='Taxiable income low limit' 
                                         onKeyPress={(event) => {
                                            const charCode = (event.which) ? event.which : event.keyCode;
                                            if (charCode !== 46 && charCode > 31 && (charCode < 48 || charCode > 57)) {
                                                event.preventDefault();
                                            }
                                        }} maxLength={10}
                                        {...register('Taxiableincomelowlimit', { required: true})}
                                         />
                                         {errors.Taxiableincomelowlimit && <p style={customStyles.errorMsg}>Enter Low level Tax Limit</p>}
                                        <br />
                                    </div>

                                    <div className="col-lg-3">
                                        <label className='fw-bold'>Taxable income high limit <span className={Styles.span}>*</span></label>
                                        <input type="text" className='form-control' placeholder='Taxiable income high limit' 
                                         onKeyPress={(event) => {
                                            const charCode = (event.which) ? event.which : event.keyCode;
                                            if (charCode !== 46 && charCode > 31 && (charCode < 48 || charCode > 57)) {
                                                event.preventDefault();
                                            }
                                        }} maxLength={10}
                                        {...register('Taxiableincomehighlimit', { required: true })} />
                                        {errors.Taxiableincomehighlimit && <p style={customStyles.errorMsg}>Enter High level Tax Limit</p>}
                                    </div>

                                    <div className="col-lg-3">
                                        <label className='fw-bold'>Pagibig value <span className={Styles.span}>*</span></label> <br />
                                        <input type="text" className='form-control' placeholder='Pagibig value'  
                                         onKeyPress={(event) => {
                                            const charCode = (event.which) ? event.which : event.keyCode;
                                            if (charCode !== 46 && charCode > 31 && (charCode < 48 || charCode > 57)) {
                                                event.preventDefault();
                                            }
                                        }} maxLength={10}
                                        {...register('Pagibigvalue', { required: true})} />
                                        {errors.Pagibigvalue && <p style={customStyles.errorMsg}>Enter Pagibig Value</p>}
                                    </div>

                                    <div className="col-lg-3">
                                        <label className='fw-bold'>Year<span className={Styles.span}>*</span></label>
                                        <select className='form-control'    {...register('Year', { required: true })}   >
                                            <option value=''>Select year</option>
                                            <option>2023</option>
                                            <option>2024</option>
                                            <option>2025</option>
                                            <option>2026</option>
                                            <option>2027</option>
                                            <option>2028</option>
                                        </select>
                                        {errors.Pagibigvalue && <p style={customStyles.errorMsg}>Enter Year</p>}
                                    </div>
                                </div>
                                <br />
                                <div className="row ">
                                    <div className="col-lg-8"></div>
                                    <div className="col-lg-2">
                                        <Link href="/Settings/Pagibig"><button className='AddButton'>CANCEL</button></Link>
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















                {/* <form onSubmit={handleSubmit(onSubmit)}> */}
                {/* <div className={'card shadow-lg p-3 ' + Styles.card}>

                        <div className='row'>
                            <div className='col-lg-3'>


                                <label>Taxable income low limit <span id={Styles.span}>*</span></label>
                                <input name="lowLimit" type="text" className={`form-control mt-2 `} />
                                <div className="invalid-feedback">{errors.lowLimit?.message}</div>

                            </div>
                            <div className='col-lg-3'>

                                <label>Taxable income high limit <span id={Styles.span}>*</span></label>
                                <input name="highLimit" type="text" className={`form-control mt-2 `} />
                                <div className="invalid-feedback">{errors.highLimit?.message}</div>
                            </div>
                            <div className='col-lg-2'>

                                <label>Pagibig value <span id={Styles.span}>*</span></label>
                                <input name="Philhealth" type="text" className={`form-control mt-2`} />
                                <div className="invalid-feedback">{errors.Philhealth?.message}</div>
                            </div>
                            <div className='col-lg-2'>
                                <label>Year<span id={Styles.span}>*</span></label>
                                <select className='form-select'  >
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
                        <div className='row'>
                            <div className='col-lg-10'></div>
                            <div className='col-lg-1'>
                                <button id={Styles.Save}>Save</button>
                            </div>
                            <div className='col-lg-1'>
                                <Link href='/configuration/philhealthdash'><button id={Styles.Cancel}>Cancel</button></Link>
                            </div>
                        </div>

                    </div>
                </form> */}
            </div >
        </Layout>
    )
}

export default PagibigForm