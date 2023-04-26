import React from 'react'
import Link from 'next/link'
import axios from 'axios';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2'
import { useEffect, useState } from 'react';
import Layout from '@/components/layout/layout'

const PagibigForm = ({ editData }) => {
    const { register, handleSubmit, reset, formState } = useForm();
    const { errors } = formState;

    const [actionType, setActionType] = useState("insert");


    const hostURL = process.env.NEXT_PUBLIC_API_HOST_URL;




    useEffect(() => {
        if (editData == "") {
            clearForm();
        } else {
            clearForm(editData);
        }
    }, [1]);


    async function onSubmit(data) {
        if (actionType == "insert") {
            await axios.post(hostURL + "HR/InsertPagibigconfogaration", data);
            Swal.fire('Data Inserted successfully')
            console.log("Inserted data:", data);
        }
        else {
            await axios.post(hostURL + "HR/UpdatePagibigconfogaration", data);
            Swal.fire('Data Updated successfully')
        }
    }

    function clearForm(userData = null) {
        let details = {
            "ID": userData ? userData.id : "",
            "Taxiableincomelowlimit": userData ? userData.taxiableincomelowlimit : "",
            "Taxiableincomehighlimit": userData ? userData.taxiableincomehighlimit : "",
            "Pagibigvalue": userData ? userData.pagibigvalue : "",
            "Year": userData ? userData.year : "",
        }
        reset(details);
        setActionType(userData ? "update" : 'insert')
    }

    return (
        <Layout>
            <div>
                <br />
                <p>Phihealth Configuration Form</p>
                <div >
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="row">
                            <div className="col-lg-3">
                                <label className >Taxable income low limit <span >*</span></label>
                                <input type="text"   {...register('Taxiableincomelowlimit', { required: true })} />
                            </div>

                            <div className="col-lg-3">
                                <label >Taxable income high limit <span >*</span></label>
                                <input type="text"   {...register('Taxiableincomehighlimit', { required: true })} />
                            </div>

                            <div className="col-lg-3">
                                <label >Pagibig value <span >*</span></label> <br />
                                <input type="text"   {...register('Pagibigvalue', { required: true })} />
                            </div>

                            <div className="col-lg-3">
                                <label >Year<span >*</span></label>
                                <select    {...register('Year', { required: true })}   >
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
                        <div className="row">
                            <div className="col-lg-11">
                                <Link href="/Configuration/pagibig"><button className='btn btn-primary' style={{ float: "right", marginLeft: "5px" }} tabindex="0">CANCEL</button></Link>
                                {
                                    actionType == "insert" && (
                                        <button type='submit' className='btn btn-primary' style={{ float: "right" }}>Save</button>
                                    )
                                }
                                {
                                    actionType == "update" && (
                                        <button type='submit' className='btn btn-primary' style={{ float: "right" }}>Update</button>
                                    )
                                }
                            </div>
                        </div>


                    </form>
                </div>















                {/* <form onSubmit={handleSubmit(onSubmit)}> */}
                {/* <div className={'card shadow-lg p-3 ' + Styles.card}>

                        <div className='row'>
                            <div className='col-lg-3'>


                                <label>Taxable income low limit <span >*</span></label>
                                <input name="lowLimit" type="text" className={`form-control mt-2 `} />
                                <div className="invalid-feedback">{errors.lowLimit?.message}</div>

                            </div>
                            <div className='col-lg-3'>

                                <label>Taxable income high limit <span >*</span></label>
                                <input name="highLimit" type="text" className={`form-control mt-2 `} />
                                <div className="invalid-feedback">{errors.highLimit?.message}</div>
                            </div>
                            <div className='col-lg-2'>

                                <label>Pagibig value <span >*</span></label>
                                <input name="Philhealth" type="text" className={`form-control mt-2`} />
                                <div className="invalid-feedback">{errors.Philhealth?.message}</div>
                            </div>
                            <div className='col-lg-2'>
                                <label>Year<span >*</span></label>
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