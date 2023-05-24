import React from 'react'
import styles from "../../styles/CompanyForm.module.css";
import { useForm } from "react-hook-form";
import Layout from "@/components/layout/layout";
import Link from 'next/link';



function Leaveform() {


    const { register, handleSubmit, watch, reset, formState: { errors }, } = useForm();















    return (
        <Layout>
            <div className="container-fluid">
                <br />
                <div className="row">
                    <div className="col-lg-12">
                        <h4 style={{ color: "blue" }}>Leave Configuration</h4>
                    </div>
                </div>
                <br />
                <div className="row">
                    <div className="col-lg-12">
                        <div class="shadow-lg p-3 mb-5 bg-body rounded">
                            <div className="row">
                                <div className="col-lg-3">
                                    <label className={styles.p} >Leave Type*</label>
                                    <select className="form-select mt-2" {...register('LeaveType', { required: true })} >
                                        <option>Leave Type</option>
                                        {/* {
                    countrydata.map((data) => {
                      return (
                        <option value={data.id} key={data.id}>{data.short}</option>

                      )
                    })
                  } */}

                                    </select>
                                    {errors.LeaveType && <p className="error-message" style={{ color: "red" }}>{errors.LeaveType.message}</p>}
                                </div>

                                <div className="col-lg-3">
                                    <label className={styles.p}>Leave Category</label>
                                    <select className="form-select mt-2" {...register('LeaveCategory', { required: "Please add a LeaveCategory Name" })} >
                                        <option>Leave Category</option>
                                        {/* {
                    countrydata.map((data) => {
                      return (
                        <option value={data.id} key={data.id}>{data.short}</option>

                      )
                    })
                  } */}


                                    </select>
                                    {errors.LeaveCategory && <p className="error-message" style={{ color: "red" }}>{errors.LeaveCategory.message}</p>}
                                </div>

                                <div className="col-lg-3">
                                    <label className={styles.p}>Grade</label>
                                    <select className="form-select mt-2" {...register('Grade', { required: "Please add a Grade Name" })} >
                                        <option>Select Grade</option>
                                        {/* {
                    countrydata.map((data) => {
                      return (
                        <option value={data.id} key={data.id}>{data.short}</option>

                      )
                    })
                  } */}


                                    </select>
                                    {errors.Grade && <p className="error-message" style={{ color: "red" }}>{errors.Grade.message}</p>}
                                </div>

                                <div className="col-lg-3">
                                    <label className={styles.p}>Band Level</label>
                                    <select className="form-select mt-2" {...register('BandLevel', { required: "Please add a BandLevel Name" })} >
                                        <option>Select BandLevel</option>
                                        {/* {
                    countrydata.map((data) => {
                      return (
                        <option value={data.id} key={data.id}>{data.short}</option>

                      )
                    })
                  } */}


                                    </select>
                                    {errors.BandLevel && <p className="error-message" style={{ color: "red" }}>{errors.BandLevel.message}</p>}
                                </div>
                            </div>
                            <br />




                            <div className="row">
                                <div className="col-lg-3">
                                    <label className={styles.p}>Employment Type</label>
                                    <select className="form-select mt-2" {...register('EmploymentType', { required: "Please add a EmploymentType Name" })} >
                                        <option>Select Employment Type</option>
                                        {/* {
                    countrydata.map((data) => {
                      return (
                        <option value={data.id} key={data.id}>{data.short}</option>

                      )
                    })
                  } */}

                                    </select>
                                    {errors.EmploymentType && <p className="error-message" style={{ color: "red" }}>{errors.EmploymentType.message}</p>}
                                </div>

                                <div className="col-lg-3">
                                    <label className={styles.p}>Applicablefrom</label>
                                    <select className="form-select mt-2" {...register('Applicablefrom', { required: "Please add a Applicablefrom Name" })} >
                                        <option>Select Applicable from</option>
                                        {/* {
                    countrydata.map((data) => {
                      return (
                        <option value={data.id} key={data.id}>{data.short}</option>

                      )
                    })
                  } */}


                                    </select>
                                    {errors.Applicablefrom && <p className="error-message" style={{ color: "red" }}>{errors.Applicablefrom.message}</p>}
                                </div>

                                <div className="col-lg-3">
                                    <label className={styles.p}>Annual Entitlement</label>
                                    <input type="text" className="form-control" {...register('AnnualEntitlement', { required: "Please add a Accrual_Period Name" })} />
                                    {errors.AnnualEntitlement && <p className="error-message" style={{ color: "red" }}>{errors.AnnualEntitlement.message}</p>}
                                </div>
                                <div className="col-lg-3">
                                    <label className={styles.p}>Accrual Period</label>
                                    <select className="form-select mt-2" {...register('Accrual_Period', { required: "Please add a Accrual_Period Name" })} >
                                        <option>Select Accrual_Period</option>
                                        {/* {
                    countrydata.map((data) => {
                      return (
                        <option value={data.id} key={data.id}>{data.short}</option>

                      )
                    })
                  } */}


                                    </select>
                                    {errors.Accrual_Period && <p className="error-message" style={{ color: "red" }}>{errors.Accrual_Period.message}</p>}
                                </div>
                            </div>
                            <br />



                            <div className="row">

                                <div className="col-lg-3">
                                    <label className={styles.p}>Is Prorated</label>
                                    <select className="form-select mt-2" {...register('IS_Prorated', { required: "Please add a IS_Prorated Name" })} >
                                        <option>Select Is Prorated</option>
                                        <option>Yes</option>
                                        <option>No</option>
                                        {/* {
                    countrydata.map((data) => {
                      return (
                        <option value={data.id} key={data.id}>{data.short}</option>

                      )
                    })
                  } */}

                                    </select>
                                    {errors.IS_Prorated && <p className="error-message" style={{ color: "red" }}>{errors.IS_Prorated.message}</p>}
                                </div>

                                <div className="col-lg-3">
                                    <label className={styles.p}>Carry Forward</label>
                                    <select className="form-select mt-2" {...register('CarryForward', { required: "Please add a CarryForward Name" })} >
                                        <option>Select Carry Forward</option>
                                        <option>Yes</option>
                                        <option>No</option>
                                        {/* {
                    countrydata.map((data) => {
                      return (
                        <option value={data.id} key={data.id}>{data.short}</option>

                      )
                    })
                  } */}


                                    </select>
                                    {errors.CarryForward && <p className="error-message" style={{ color: "red" }}>{errors.CarryForward.message}</p>}
                                </div>

                                <div className="col-lg-3">
                                    <label className={styles.p}>CarryForward First Year</label>
                                    <input type="text" className="form-control" {...register('CarryForward1st', { required: "Please add a CarryForward1st Name" })} />
                                    {errors.CarryForward1st && <p className="error-message" style={{ color: "red" }}>{errors.CarryForward1st.message}</p>}
                                </div>

                                <div className="col-lg-3">
                                    <label className={styles.p}>CarryForwardcPrevious year</label>
                                    <input type="text" className="form-control" {...register('CarryForwardPrevious', { required: "Please add a CarryForwardPrevious Name" })} />

                                    {errors.CarryForwardPrevious && <p className="error-message" style={{ color: "red" }}>{errors.CarryForwardPrevious.message}</p>}
                                </div>
                            </div>
                            <br />



                            <div className="row">

                                <div className="col-lg-3">
                                    <label className={styles.p}>Is Lapsable</label>
                                    <select className="form-select mt-2" {...register('Is_Lapsable', { required: "Please add a Is_Lapsable Name" })} >
                                        <option>Select Is Lapsable</option>
                                        <option>Yes</option>
                                        <option>No</option>
                                        {/* {
                    countrydata.map((data) => {
                      return (
                        <option value={data.id} key={data.id}>{data.short}</option>

                      )
                    })
                  } */}

                                    </select>
                                    {errors.Is_Lapsable && <p className="error-message" style={{ color: "red" }}>{errors.Is_Lapsable.message}</p>}
                                </div>

                                <div className="col-lg-3">
                                    <label className={styles.p}>Carry Over To</label>
                                    <select className="form-select mt-2" {...register('Carry_Over_To', { required: "Please add a Carry_Over_To Name" })} >
                                        <option>Select Carry Over To</option>
                                        {/* {
                    countrydata.map((data) => {
                      return (
                        <option value={data.id} key={data.id}>{data.short}</option>

                      )
                    })
                  } */}


                                    </select>
                                    {errors.Carry_Over_To && <p className="error-message" style={{ color: "red" }}>{errors.Carry_Over_To.message}</p>}
                                </div>

                                <div className="col-lg-3">
                                    <label className={styles.p}>Remarks</label>
                                    <textarea className="form-select mt-2" {...register('Remarks', { required: "Please add a Remarks Name" })}></textarea>

                                    {errors.Remarks && <p className="error-message" style={{ color: "red" }}>{errors.Remarks.message}</p>}
                                </div>

                                <div className="col-lg-3">
                                    <label className={styles.p}>Max Leave Period Allowed</label>
                                    <input type="text" className="form-control" {...register('MaxLeaveAllowed', { required: "Please add a MaxLeaveAllowed Name" })} />

                                    {errors.MaxLeaveAllowed && <p className="error-message" style={{ color: "red" }}>{errors.MaxLeaveAllowed.message}</p>}
                                </div>
                            </div>
                            <br />


                            <div className="row">
                                <div className="col-lg-3">
                                    <label className={styles.p}>Min Leave Balance Allowed</label>
                                    <input type="text" className="form-control" {...register('Min_Leave_Balance_Allowed', { required: "Please add a Min_Leave_Balance_Allowed Name" })}/>
         
                                    {errors.Min_Leave_Balance_Allowed && <p className="error-message" style={{ color: "red" }}>{errors.Min_Leave_Balance_Allowed.message}</p>}
                                </div>

                                <div className="col-lg-3">
                                    <label className={styles.p}>IS Half Day Allowed</label>
                                    <select className="form-select mt-2" {...register('Is_Half_Day_Allowed', { required: "Please add a Is_Half_Day_Allowed Name" })} >
                                        <option>Select IS Half Day Allowed</option>
                                        {/* {
                    countrydata.map((data) => {
                      return (
                        <option value={data.id} key={data.id}>{data.short}</option>

                      )
                    })
                  } */}


                                    </select>
                                    {errors.Is_Half_Day_Allowed && <p className="error-message" style={{ color: "red" }}>{errors.Is_Half_Day_Allowed.message}</p>}
                                </div>

                                <div className="col-lg-3">
                                    <label className={styles.p}>Allow For Next Year</label>
                                    <select className="form-select mt-2" {...register('AllowNextYear', { required: "Please add a AllowNextYear Name" })} >
                                        <option>Select Allow for Next Year</option>
                                        {/* {
                    countrydata.map((data) => {
                      return (
                        <option value={data.id} key={data.id}>{data.short}</option>

                      )
                    })
                  } */}


                                    </select>
                                    {errors.AllowNextYear && <p className="error-message" style={{ color: "red" }}>{errors.AllowNextYear.message}</p>}
                                </div>
                                <div className="col-lg-3">
                                    <label className={styles.p}>Allow During Notice Period</label>
                                    <select className="form-select mt-2" {...register('AllowedDuringNotice', { required: "Please add a AllowedDuringNotice Name" })} >
                                        <option>Select Allow During Notice Period</option>
                                        {/* {
                    countrydata.map((data) => {
                      return (
                        <option value={data.id} key={data.id}>{data.short}</option>

                      )
                    })
                  } */}


                                    </select>
                                    {errors.AllowedDuringNotice && <p className="error-message" style={{ color: "red" }}>{errors.AllowedDuringNotice.message}</p>}
                                </div>
                            </div>
                            <br />





                            <div className="row">

                                <div className="col-lg-3">
                                    <label className={styles.p}>Auto Approval*</label>
                                    <select className="form-select mt-2" {...register('AutoApproval', { required: "Please add a AutoApproval Name" })} >
                                        <option>Select Auto Approval*</option>
                                        {/* {
                    countrydata.map((data) => {
                      return (
                        <option value={data.id} key={data.id}>{data.short}</option>

                      )
                    })
                  } */}

                                    </select>
                                    {errors.AutoApproval && <p className="error-message" style={{ color: "red" }}>{errors.AutoApproval.message}</p>}
                                </div>

                                <div className="col-lg-3">
                                    <label className={styles.p}>Upload file Mandatory</label>
                                    <select className="form-select mt-2" {...register('Upload_file_Mandatory', { required: "Please add a Upload_file_Mandatory Name" })} >
                                        <option>Select Upload file Mandatory</option>
                                        {/* {
                    countrydata.map((data) => {
                      return (
                        <option value={data.id} key={data.id}>{data.short}</option>

                      )
                    })
                  } */}


                                    </select>
                                    {errors.Upload_file_Mandatory && <p className="error-message" style={{ color: "red" }}>{errors.Upload_file_Mandatory.message}</p>}
                                </div>

                                <div className="col-lg-3">
                                    <label className={styles.p}>Gender</label>
                                    <select className="form-select mt-2" {...register('Gender', { required: "Please add a Gender Name" })} >
                                        <option>Select Gender</option>
                                        {/* {
                    countrydata.map((data) => {
                      return (
                        <option value={data.id} key={data.id}>{data.short}</option>

                      )
                    })
                  } */}


                                    </select>
                                    {errors.Gender && <p className="error-message" style={{ color: "red" }}>{errors.Gender.message}</p>}
                                </div>

                                <div className="col-lg-3">
                                    <label className={styles.p}>Weekly Off</label>
                                    <select className="form-select mt-2" {...register('Weekly_Off_Included', { required: "Please add a Weekly_Off_Included Name" })} >
                                        <option>Select Weekly_Off_Included</option>
                                        {/* {
                    countrydata.map((data) => {
                      return (
                        <option value={data.id} key={data.id}>{data.short}</option>

                      )
                    })
                  } */}


                                    </select>
                                    {errors.Weekly_Off_Included && <p className="error-message" style={{ color: "red" }}>{errors.Weekly_Off_Included.message}</p>}
                                </div>
                            </div>
                            <br />






                            <div className="row">

                                <div className="col-lg-3">
                                    <label className={styles.p}>Holiday Included</label>
                                    <select className="form-select mt-2" {...register('Holiday_Included', { required: "Please add a Holiday_Included Name" })} >
                                        <option>Select Holiday Included</option>
                                        {/* {
                    countrydata.map((data) => {
                      return (
                        <option value={data.id} key={data.id}>{data.short}</option>

                      )
                    })
                  } */}

                                    </select>
                                    {errors.Holiday_Included && <p className="error-message" style={{ color: "red" }}>{errors.Holiday_Included.message}</p>}
                                </div>

                                <div className="col-lg-3">
                                    <label className={styles.p}>AccrualTime</label>
                                    <select className="form-select mt-2" {...register('AccrualTime', { required: "Please add a AccrualTime Name" })} >
                                        <option>Select AccrualTime</option>
                                        {/* {
                    countrydata.map((data) => {
                      return (
                        <option value={data.id} key={data.id}>{data.short}</option>

                      )
                    })
                  } */}


                                    </select>
                                    {errors.AccrualTime && <p className="error-message" style={{ color: "red" }}>{errors.AccrualTime.message}</p>}
                                </div>


                                <div className="col-lg-3">
                                    <label className={styles.p}>Based On</label>
                                    <select className="form-select mt-2" {...register('BasedOn', { required: "Please add a BasedOn Name" })} >
                                        <option>Select Based On</option>
                                        {/* {
                    countrydata.map((data) => {
                      return (
                        <option value={data.id} key={data.id}>{data.short}</option>

                      )
                    })
                  } */}


                                    </select>
                                    {errors.BasedOn && <p className="error-message" style={{ color: "red" }}>{errors.BasedOn.message}</p>}
                                </div>
                            </div>
                            <br />
                            <br />

                            <div className="row">
                                <div className="col-lg-6"></div>
                                <div className="col-lg-3">
                                    <Link href="/Leaveconfiguration">
                                        <button className={styles.button} >Cancel</button>
                                    </Link>


                                </div>
                                <div className="col-lg-3">
                                    <button className={styles.button} >Submit</button>


                                </div>
                            </div>

                        </div>

                    </div>
                </div>


            </div>
        </Layout>
    )
}

export default Leaveform
