import React from 'react'
import styles from "../../styles/CompanyForm.module.css";
import { useForm } from "react-hook-form";
import Layout from "@/components/layout/layout";
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { apiService } from '@/services/api.service';
import Swal from 'sweetalert2';
// import { useRouter } from 'next/router';


function Leaveform({ editData }) {
const router=useRouter()

    const { register, handleSubmit, watch, reset, formState: { errors }, } = useForm();

    const [actionType, setActionType] = useState("insert");

    const [leaveType, setLeaveType] = useState([]);

    async function leaveMaster() {
        let res = await apiService.commonGetCall("Master/GetLeaveType");
        setLeaveType(res.data);
        console.log(res.data);
    }


    useEffect(() => {
        leaveMaster();

    }, []);

    async function getLeaveById(id) {

        let res = await apiService.commonGetCall("Payroll/GetLeaveConfigurationByID?ID=" + id);
        clearForm(res.data[0]);

    }



    // useEffect(() => {
    //     const { id } = editData || {};
    //     if (id)
    //     // (id != null)
    //     {
    //         getLeaveById(id);

    //     }

    //     else {
    //         clearForm();

    //     }

    // }, []);
    useEffect(() => {
        const { id } = editData || {};
        if (id) {
            // This API is used to fetch the data from BarangayMaster ByID table
            getLeaveById(id);
        } else {
            clearForm();
        }
        // getMasters();
    }, []);



    // useEffect(() => {
    //     async function getLeaveById() {
    //         const id = sessionStorage.getItem("id");
    //         if (id) {

    //             let res = await apiService.commonGetCall("Payroll/GetLeaveConfigurationByID?ID=" + id);
    //             clearForm(res.data[0]);
    //         } else {
    //             clearForm();
    //         }
    //     }

    //     getLeaveById();
    //     leaveMaster();
    // }, [1]);



    function clearForm(LeaveData = null) {
        debugger;
        let details = {
            "ID": LeaveData ? LeaveData.id : "",
            "LeaveType": LeaveData ? LeaveData.leaveType : "",
            "LeaveCategory": LeaveData ? LeaveData.leaveCategory : "",
            "Grade": LeaveData ? LeaveData.grade : "",
            "BandLevel": LeaveData ? LeaveData.bandLevel : "",
            "EmploymentType": LeaveData ? LeaveData.employmentType : "",
            "Applicablefrom": LeaveData ? LeaveData.applicablefrom : "",
            "YearlyLimit": LeaveData ? LeaveData.yearlyLimit : "",
            "Accrual_Period": LeaveData ? LeaveData.accrual_Period : "",
            "IS_Prorated": LeaveData ? LeaveData.iS_Prorated : "",
            "CarryForward": LeaveData ? LeaveData.carryForward : "",
            "CarryForward1st": LeaveData ? LeaveData.carryForward1st : "",
            "CarryForwardPrevious": LeaveData ? LeaveData.carryForwardPrevious : "",
            "Is_Lapsable": LeaveData ? LeaveData.is_Lapsable : "",
            "Carry_Over_To": LeaveData ? LeaveData.carry_Over_To : "",
            "Remarks": LeaveData ? LeaveData.remarks : "",
            "MaxLeaveAllowed": LeaveData ? LeaveData.maxLeaveAllowed : "",
            "Min_Leave_Balance_Allowed": LeaveData ? LeaveData.min_Leave_Balance_Allowed : "",
            "Is_Half_Day_Allowed": LeaveData ? LeaveData.is_Half_Day_Allowed : "",
            "AllowNextYear": LeaveData ? LeaveData.allowNextYear : "",
            "AllowedDuringNotice": LeaveData ? LeaveData.allowedDuringNotice : "",
            "AutoApproval": LeaveData ? LeaveData.autoApproval : "",
            "Upload_file_Mandatory": LeaveData ? LeaveData.upload_file_Mandatory : "",
            "Gender": LeaveData ? LeaveData.gender : "",
            "Weekly_Off_Included": LeaveData ? LeaveData.weekly_Off_Included : "",
            "Holiday_Included": LeaveData ? LeaveData.holiday_Included : "",
            "AccrualTime": LeaveData ? LeaveData.accrualTime : "",
            "BasedOn": LeaveData ? LeaveData.basedOn : ""

        };
        reset(details);
        setActionType(LeaveData ? "update" : "insert");
    }


    const submit = async (data) => {
        debugger
        if (actionType == "insert"){
            let Entity= {
            LeaveType: data.LeaveType,
            LeaveCategory: data.LeaveCategory,
            Grade: data.Grade,
            BandLevel: data.BandLevel,
            EmploymentType: data.EmploymentType,
            Applicablefrom: data.Applicablefrom,
            YearlyLimit: data.YearlyLimit,
            Accrual_Period: data.Accrual_Period,
            IS_Prorated: data.IS_Prorated,
            CarryForward: data.CarryForward,
            CarryForward1st: data.CarryForward1st,
            CarryForwardPrevious: data.CarryForwardPrevious,
            Is_Lapsable: data.Is_Lapsable,
            Carry_Over_To: data.Carry_Over_To,
            Remarks: data.Remarks,
            MaxLeaveAllowed: data.MaxLeaveAllowed,
            Min_Leave_Balance_Allowed: data.Min_Leave_Balance_Allowed,
            Is_Half_Day_Allowed: data.Is_Half_Day_Allowed,
            AllowNextYear: data.AllowNextYear,
            AllowedDuringNotice: data.AllowedDuringNotice,
            AutoApproval: data.AutoApproval,
            Upload_file_Mandatory: data.Upload_file_Mandatory,
            Gender: data.Gender,
            Weekly_Off_Included: data.Weekly_Off_Included,
            Holiday_Included: data.Holiday_Included,
            AccrualTime: data.AccrualTime,
            BasedOn: data.BasedOn
            };
            await apiService.commonGetCall("Payroll/InsertLeaveConfigurationNew", Entity);
            Swal.fire("Data Inserted successfully");
            console.log("Insertde data", data)
            router.push("/Leaveconfiguration");
        } else {
            let Entity= {
            ID:data.ID,
            LeaveType: data.LeaveType,
            LeaveCategory: data.LeaveCategory,
            Grade: data.Grade,
            BandLevel: data.BandLevel,
            EmploymentType: data.EmploymentType,
            Applicablefrom: data.Applicablefrom,
            YearlyLimit: data.YearlyLimit,
            Accrual_Period: data.Accrual_Period,
            IS_Prorated: data.IS_Prorated,
            CarryForward: data.CarryForward,
            CarryForward1st: data.CarryForward1st,
            CarryForwardPrevious: data.CarryForwardPrevious,
            Is_Lapsable: data.Is_Lapsable,
            Carry_Over_To: data.Carry_Over_To,
            Remarks: data.Remarks,
            MaxLeaveAllowed: data.MaxLeaveAllowed,
            Min_Leave_Balance_Allowed: data.Min_Leave_Balance_Allowed,
            Is_Half_Day_Allowed: data.Is_Half_Day_Allowed,
            AllowNextYear: data.AllowNextYear,
            AllowedDuringNotice: data.AllowedDuringNotice,
            AutoApproval: data.AutoApproval,
            Upload_file_Mandatory: data.Upload_file_Mandatory,
            Gender: data.Gender,
            Weekly_Off_Included: data.Weekly_Off_Included,
            Holiday_Included: data.Holiday_Included,
            AccrualTime: data.AccrualTime,
            BasedOn: data.BasedOn

            }
            await apiService.commonGetCall("Payroll/UpdateLeaveConfigurationNew", Entity);
            Swal.fire("Data Updated successfully");
            router.push("/Leaveconfiguration");
        }
    };


    

    // http://localhost:4199/Payroll/InsertLeaveConfigurationNew

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
                            <form onSubmit={handleSubmit(submit)}>
                                <div className="row">
                                    <div className="col-lg-3">
                                        <label className={styles.p} >Leave Type*</label>
                                        <select className="form-select mt-2" {...register('LeaveType', { required: true })} >
                                            <option>Leave Type</option>
                                            {
                                                leaveType.map((data) => {
                                                    return (
                                                        <option value={data.id} key={data.id}>{data.short}</option>
                                                    )
                                                })
                                            }

                                        </select>
                                        {errors.LeaveType && <p className="error-message" style={{ color: "red" }}>{errors.LeaveType.message}</p>}
                                    </div>

                                    <div className="col-lg-3">
                                        <label className={styles.p}>Leave Category</label>
                                        <select className="form-select mt-2" {...register('LeaveCategory', { required: "Please add a LeaveCategory Name" })} >
                                            <option> Select Leave Category</option>
                                            <option value="Periodic">Periodic</option>
                                            <option value="Event">Event</option>
                                            <option value="Effort">Effort</option>
                                        </select>
                                        {errors.LeaveCategory && <p className="error-message" style={{ color: "red" }}>{errors.LeaveCategory.message}</p>}
                                    </div>

                                    <div className="col-lg-3">
                                        <label className={styles.p}>Grade</label>
                                        <select className="form-select mt-2" {...register('Grade', { required: "Please add a Grade Name" })} >
                                            <option>Select Grade</option>
                                            <option value="All">All</option>
                                            <option value="Regular">Regular</option>
                                        </select>
                                        {errors.Grade && <p className="error-message" style={{ color: "red" }}>{errors.Grade.message}</p>}
                                    </div>

                                    <div className="col-lg-3">
                                        <label className={styles.p}>Band Level</label>
                                        <select className="form-select mt-2" {...register('BandLevel', { required: "Please add a BandLevel Name" })} >
                                            <option>Select Band Level</option>
                                            <option value="All">All</option>
                                            <option value="MT">MT</option>
                                            <option value="Staff PMG">Staff PMG</option>
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
                                            <option value="All">All</option>
                                            <option value="Regular">Regular</option>
                                        </select>
                                        {errors.EmploymentType && <p className="error-message" style={{ color: "red" }}>{errors.EmploymentType.message}</p>}
                                    </div>

                                    <div className="col-lg-3">
                                        <label className={styles.p}>Applicablefrom</label>
                                        <select className="form-select mt-2" {...register('Applicablefrom', { required: "Please add a Applicablefrom Name" })} >
                                            <option>Select Applicable from</option>
                                            <option value="From DOJ">From DOJ</option>
                                            <option value="1 months from DOJ">1 months from DOJ</option>
                                            <option value="6 months from DOJ">6 months from DOJ</option>
                                            <option value="1 Year from DOJ">1 Year from DOJ</option>
                                            <option value="3 Year from DOJ">3 Year from DOJ</option>
                                        </select>
                                        {errors.Applicablefrom && <p className="error-message" style={{ color: "red" }}>{errors.Applicablefrom.message}</p>}
                                    </div>

                                    <div className="col-lg-3">
                                        <label className={styles.p}>Annual Entitlement</label>
                                        <input type="text" className="form-control" {...register('YearlyLimit', { required: "Please add a Accrual_Period Name" })} />
                                        {errors.YearlyLimit && <p className="error-message" style={{ color: "red" }}>{errors.YearlyLimit.message}</p>}
                                    </div>
                                    <div className="col-lg-3">
                                        <label className={styles.p}>Accrual Period</label>
                                        <select className="form-select mt-2" {...register('Accrual_Period', { required: "Please add a Accrual_Period Name" })} >
                                            <option>Select Accrual Period</option>
                                            <option value="Monthly">Monthly</option>
                                            <option value="Yearly">Yearly</option>
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
                                            <option value={true}>Yes</option>
                                            <option value={false}>No</option>

                                        </select>
                                        {errors.IS_Prorated && <p className="error-message" style={{ color: "red" }}>{errors.IS_Prorated.message}</p>}
                                    </div>

                                    <div className="col-lg-3">
                                        <label className={styles.p}>Carry Forward</label>
                                        <select className="form-select mt-2" {...register('CarryForward', { required: "Please add a CarryForward Name" })} >
                                            <option>Select Carry Forward</option>
                                            <option value={true}>Yes</option>
                                            <option value={false}>No</option>
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
                                            <option value={true}>Yes</option>
                                            <option value={false}>No</option>
                                        </select>
                                        {errors.Is_Lapsable && <p className="error-message" style={{ color: "red" }}>{errors.Is_Lapsable.message}</p>}
                                    </div>

                                    <div className="col-lg-3">
                                        <label className={styles.p}>Carry Over To</label>
                                        <select className="form-select mt-2" {...register('Carry_Over_To', { required: "Please add a Carry_Over_To Name" })} >
                                            <option>Select Carry Over To</option>
                                            {
                                                leaveType.map((data) => {
                                                    return (
                                                        <option value={data.id} key={data.id}>{data.short}</option>
                                                    )
                                                })
                                            }
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
                                        <input type="text" className="form-control" {...register('MaxLeaveAllowed', { required: "Please add a MaxRemainingLeaveBal Name" })} />

                                        {errors.MaxLeaveAllowed && <p className="error-message" style={{ color: "red" }}>{errors.MaxLeaveAllowed.message}</p>}
                                    </div>
                                </div>
                                <br />


                                <div className="row">
                                    <div className="col-lg-3">
                                        <label className={styles.p}>Min Leave Balance Allowed</label>
                                        <input type="text" className="form-control" {...register('Min_Leave_Balance_Allowed', { required: "Please add a Min_Leave_Balance_Allowed Name" })} />

                                        {errors.Min_Leave_Balance_Allowed && <p className="error-message" style={{ color: "red" }}>{errors.Min_Leave_Balance_Allowed.message}</p>}
                                    </div>

                                    <div className="col-lg-3">
                                        <label className={styles.p}>IS Half Day Allowed</label>
                                        <select className="form-select mt-2" {...register('Is_Half_Day_Allowed', { required: "Please add a Is_Half_Day_Allowed Name" })} >
                                            <option>Select IS Half Day Allowed</option>
                                            <option value={true}>Yes</option>
                                            <option value={false}>No</option>
                                        </select>
                                        {errors.Is_Half_Day_Allowed && <p className="error-message" style={{ color: "red" }}>{errors.Is_Half_Day_Allowed.message}</p>}
                                    </div>

                                    <div className="col-lg-3">
                                        <label className={styles.p}>Allow For Next Year</label>
                                        <select className="form-select mt-2" {...register('AllowNextYear', { required: "Please add a AllowNextYear Name" })} >
                                            <option>Select Allow for Next Year</option>
                                            <option value={true}>Yes</option>
                                            <option value={false}>No</option>
                                        </select>
                                        {errors.AllowNextYear && <p className="error-message" style={{ color: "red" }}>{errors.AllowNextYear.message}</p>}
                                    </div>
                                    <div className="col-lg-3">
                                        <label className={styles.p}>Allow During Notice Period</label>
                                        <select className="form-select mt-2" {...register('AllowedDuringNotice', { required: "Please add a AllowedDuringNotice Name" })} >
                                            <option>Select Allow During Notice Period</option>
                                            <option value={true}>Yes</option>
                                            <option value={false}>No</option>
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
                                            <option value={true}>Yes</option>
                                            <option value={false}>No</option>
                                        </select>
                                        {errors.AutoApproval && <p className="error-message" style={{ color: "red" }}>{errors.AutoApproval.message}</p>}
                                    </div>

                                    <div className="col-lg-3">
                                        <label className={styles.p}>Upload file Mandatory</label>
                                        <select className="form-select mt-2" {...register('Upload_file_Mandatory', { required: "Please add a Upload_file_Mandatory Name" })} >
                                            <option>Select Upload file Mandatory</option>
                                            <option value={true}>Yes</option>
                                            <option value={false}>No</option>
                                        </select>
                                        {errors.Upload_file_Mandatory && <p className="error-message" style={{ color: "red" }}>{errors.Upload_file_Mandatory.message}</p>}
                                    </div>

                                    <div className="col-lg-3">
                                        <label className={styles.p}>Gender</label>
                                        <select className="form-select mt-2" {...register('Gender', { required: "Please add a Gender Name" })} >
                                            <option>Select Gender</option>
                                            <option value="Male">Male</option>
                                            <option value="Female">Female</option>
                                            <option value="Both">Both</option>
                                        </select>
                                        {errors.Gender && <p className="error-message" style={{ color: "red" }}>{errors.Gender.message}</p>}
                                    </div>

                                    <div className="col-lg-3">
                                        <label className={styles.p}>Weekly Off</label>
                                        <select className="form-select mt-2" {...register('Weekly_Off_Included', { required: "Please add a Weekly_Off_Included Name" })} >
                                            <option>Select Weekly_Off_Included</option>
                                            <option value={true}>Yes</option>
                                            <option value={false}>No</option>
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
                                            <option value={true}>Yes</option>
                                            <option value={false}>No</option>
                                        </select>
                                        {errors.Holiday_Included && <p className="error-message" style={{ color: "red" }}>{errors.Holiday_Included.message}</p>}
                                    </div>

                                    <div className="col-lg-3">
                                        <label className={styles.p}>AccrualTime</label>
                                        <select className="form-select mt-2" {...register('AccrualTime', { required: "Please add a AccrualTime Name" })} >
                                            <option>Select AccrualTime</option>
                                            <option value="Start">Start</option>
                                            <option value="End">End</option>
                                        </select>
                                        {errors.AccrualTime && <p className="error-message" style={{ color: "red" }}>{errors.AccrualTime.message}</p>}
                                    </div>


                                    <div className="col-lg-3">
                                        <label className={styles.p}>Based On</label>
                                        <select className="form-select mt-2" {...register('BasedOn', { required: "Please add a BasedOn Name" })} >
                                            <option>Select Based On</option>
                                            <option value="Calendar Days">Calendar Days</option>
                                            <option value="Working Days">Working Days</option>

                                        </select>
                                        {errors.BasedOn && <p className="error-message" style={{ color: "red" }}>{errors.BasedOn.message}</p>}
                                    </div>
                                </div>
                                <br />
                                <br />

                                <div className="row">
                                    <div className="col-lg-6"></div>
                                    <div className="col-lg-3">
                                        {actionType == "insert" && (

                                            <button className={styles.button}>
                                                Save
                                            </button>
                                        )}
                                        {actionType == "update" && (
                                            <button className={styles.button}>
                                                Update
                                            </button>
                                        )}

                                    </div>
                                    <div className="col-lg-3">
                                        <Link href="/Leaveconfiguration">
                                            <button type="submit" className={styles.button}>Cancel</button>
                                        </Link>

                                    </div>
                                </div>

                            </form>

                        </div>

                    </div>
                </div>


            </div >
        </Layout >
    )
}

export default Leaveform
