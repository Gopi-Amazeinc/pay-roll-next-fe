import React from 'react'
import Link from 'next/link'
import Styles from '../../../styles/pagibigadd.module.css'
import axios from 'axios';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2'
import { useEffect, useState } from 'react';
import Layout from '@/components/layout/layout'

const PagibigForm = () => {



    const { register, handleSubmit, watch, reset, formState: { errors }, } = useForm();


    async function onSubmit(data) {

        await axios.post(hostURL + "HR/InsertPagibigconfogaration", data) // inserting new division master data [Shashank]
        location.href = '/Settings/Pagibig';
        Swal.fire({
            icon: 'success',
            title: 'Added Successfully',
        })

    }


    return (
        <Layout>
            <div>
                <br />
                <p className={Styles.p}>Pagibig Form</p>
                <div className={Styles.card}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="row">
                            <div className="col-lg-3">
                                <label className={Styles.labels} >Taxable income low limit <span className={Styles.span}>*</span></label>
                                <input type="text" className={Styles.selecter}  {...register('Taxiableincomelowlimit', { required: true })} />
                            </div>

                            <div className="col-lg-3">
                                <label className={Styles.labels}>Taxable income high limit <span className={Styles.span}>*</span></label>
                                <input type="text" className={Styles.selecter}  {...register('Taxiableincomehighlimit', { required: true })} />
                            </div>

                            <div className="col-lg-3">
                                <label className={Styles.labels}>Pagibig value <span className={Styles.span}>*</span></label> <br />
                                <input type="text" className={Styles.selecter}  {...register('Pagibigvalue', { required: true })} />
                            </div>

                            <div className="col-lg-3">
                                <label className={Styles.labels}>Year<span className={Styles.span}>*</span></label>
                                <select className={Styles.selecter}   {...register('Year', { required: true })}   >
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
                                <Link href="/Settings/Pagibig"><button className={Styles.Cancel} style={{ float: "right", marginLeft: "5px" }} tabIndex="0">CANCEL</button></Link>
                                {/* {
                                    actionType == "insert" && (
                                        <button type='submit' className={Styles.Save} style={{ float: "right" }}>Save</button>
                                    )
                                }
                                {
                                    actionType == "update" && (
                                        <button type='submit' className={Styles.Save} style={{ float: "right" }}>Update</button>
                                    )
                                } */}

                                <button type='submit' className={Styles.Save} style={{ float: "right" }}>Save</button>
                            </div>
                        </div>


                    </form>
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