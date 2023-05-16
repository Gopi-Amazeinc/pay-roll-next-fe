import React from 'react'
import { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import axios from 'axios';
import Swal from 'sweetalert2';


function PositionDetails() {
    const [rolelistData, setRolelistData] = useState([]);
    const [bandlistData, setBandlistData] = useState([]);
    const [levellistData, setLevellistData] = useState([]);
    const [divisionlistData, setDivisionllistData] = useState([]);
    const [departmentlistData, setDepartmentlistData] = useState([]);
    const [grouplistData, setGrouplistData] = useState([]);
    const [designationlistData, setDesignationlistData] = useState([]);
    const [sectionlistData, setSectionlistData] = useState([]);
    const [stafflistData, setStafflistData] = useState([]);
    const [costlistData, setCostlistData] = useState([]);
    const [Provincelist, setProvincelistData] = useState([]);
    const [Citylist, setCitylisttData] = useState([]);

    const [worklocationlist, setworklocationlisttData] = useState([]);
    const [workCountrylistData, setWorkCountryListData] = useState([]);

    const { register, handleSubmit, watch, reset, formState: { errors } } = useForm();
    const [actionType, setActionType] = useState("insert");
    const customStyles = {
        content: {
            width: '85%',
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            transform: 'translate(-50%, -50%)',
            height: "70%"
        },
        errorMsg: {
            fontSize: '12px',
            fontWeight: '500',
            color: 'red'
        },
    };

    const customPopupDivision = {
        popupcontent: {
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%'
        },
        popupinputs: {
            width: '32%',
            marginTop: '16px'
        },
        formcontrol: {
            width: '350px !important'
        },

        cardinputs: {
            display: 'flex',
            flexDirection: 'column',
            margin: '5px',
            width: '215px',
            justifyContent: 'center'
        }

    }

    async function onSubmit(data) {
        debugger
        console.log(data)
        let hostURL = process.env.NEXT_PUBLIC_API_HOST_URL;
        if (actionType == "insert") {
            let Enity = {
                EmployeeCode: data.EmployeeCode,
                BandID: data.BandID,
                PositionID: data.PositionID,
                Level: data.Level,
                DesignationID: data.DesignationID,
                PositionLogin: data.PositionLogin,
                Entity: data.Entity,
                GroupID: data.GroupID,
                DivisionID: data.DivisionID,
                DepartmentID: data.DepartmentID,
                SectionID: data.SectionID,
                ManagerID: data.ManagerID,
                NextLevelManagerID: data.NextLevelManagerID,
                SAPVendorNo: data.SAPVendorNo,
                WorkArrangement: data.WorkArrangement,
                WorksiteCountryID: data.WorksiteCountryID,
                WorksiteProvinceID: data.WorksiteProvinceID,
                WorksiteCityID: data.WorksiteCityID,
                WorksiteLocationID: data.WorksiteLocationID,
                EmployementTypeID: data.EmployementTypeID,
                EmploymentStatus: data.EmploymentStatus,
                HiredDate: data.HiredDate,
                ConfirmationDueDate: data.ConfirmationDueDate,
                ProbationStartDate: data.ProbationStartDate,
                ProbationEndDate: data.ProbationEndDate,
                StaffID: sessionStorage.getItem('userID')

            }
            let res = await axios.post(hostURL + "/HR/InsertPositionDetails", Enity);
            if (res.data && res.status == 200) {
               
                sessionStorage.setItem("InsertStatus", true)
                Swal.fire("Saved successfully!")
            }
        }

    }

    


    useEffect(() => {
        debugger
        getData()

    }, [1]);

    async function getData() {

        debugger
        let hostURL = process.env.NEXT_PUBLIC_API_HOST_URL;
        let res = await axios.get(hostURL + "/Master/GetRoleType");
        setRolelistData(res.data);

        let res1 = await axios.get(hostURL + "/Master/GetBandMaster");
        setBandlistData(res1.data);


        let res2 = await axios.get(hostURL + "/Master/GetLevelType");
        setLevellistData(res2.data);

        let res3 = await axios.get(hostURL + "/Master/GetDesignationMaster");
        setDesignationlistData(res3.data);

        let res4 = await axios.get(hostURL + "/Master/GetGroupMaster");
        setGrouplistData(res4.data);

        let res5 = await axios.get(hostURL + "/Master/GetDivisionMaster");
        setDivisionllistData(res5.data);

        let res6 = await axios.get(hostURL + "/Master/GetDepartmentMaster");
        setDepartmentlistData(res6.data);

        let res7 = await axios.get(hostURL + "/Master/GetSectionMaster");
        setSectionlistData(res7.data);


        let res8 = await axios.get(hostURL + "/HR/GetAllStaffNew");
        setStafflistData(res8.data);


        // let res9 = await axios.get(hostURL + "/HR/GetCostCentersMaster");
        // setCostlistData(res9.data);

        // let res10 = await axios.get(hostURL + "/Master/GetCountryType");
        // setCountrytypeListData(res10.data);


        let res11 = await axios.get(hostURL + "/Master/GetStateType");
        setProvincelistData(res11.data);

        let res12 = await axios.get(hostURL + "/Master/GetCityType");
        setCitylisttData(res12.data);


        let res13 = await axios.get(hostURL + "/Master/GetCountryType");
        setWorkCountryListData(res13.data);


        let res14 = await axios.get(hostURL + "/Master/GetWorkingLocationMaster");
        setworklocationlisttData(res14.data);




    }
    return (
        <div style={customStyles}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='container-fluid'>

                    <div className='card'>
                        <div className='row'>
                            <div className='col-12'>
                                <div className="d-flex justify-content-between">
                                    <p className='modal-heading'>Position Details</p>
                                </div>
                                <div style={customPopupDivision.popupcontent}>


                                    <div style={customPopupDivision.popupinputs}>
                                        <p>Employee ID<span >*</span></p>
                                        <div>
                                            <input type='text' placeholder='Employee ID '
                                                {...register("EmployeeCode", { required: true })} className='form-control inputwidth' ></input>
                                            {errors.EmployeeCode && <span style={customStyles.errorMsg}> Please Employee ID *</span>}
                                        </div>
                                    </div>
                                    {
                                        <div style={customPopupDivision.popupinputs}>
                                            <p>Position Title<span >*</span></p>
                                            {<div>
                                                <select className='form-control inputwidth' {...register("PositionID", { required: true })} style={customStyles.inputLabel}>
                                                    <option value="">Select Position</option>
                                                    {
                                                        rolelistData.map((data, index) => {
                                                            return (
                                                                <option   value={data.id}>{data.short}</option>
                                                            )
                                                        })
                                                    }
                                                </select>
                                                {errors.PositionID && <span style={customStyles.errorMsg}> Select  Position</span>}
                                            </div>}
                                        </div>
                                    }


                                    <div style={customPopupDivision.popupinputs}>
                                        <p>Band<span >*</span></p>
                                        {
                                            <div>
                                                <select className='form-control inputwidth' {...register("BandID", { required: true })} style={customStyles.inputLabel}>
                                                    <option value="">Select Band </option>
                                                    {
                                                        bandlistData.map((data, index) => {
                                                            return (
                                                                <option value={data.id}>{data.short}</option>
                                                            )
                                                        })
                                                    }
                                                </select>
                                                {errors.BandID && <span style={customStyles.errorMsg}> Please Enter Band</span>}
                                            </div>
                                        }
                                    </div>

                                    {
                                        <div style={customPopupDivision.popupinputs}>
                                            <p>Level <span >*</span></p>
                                            {<div>
                                                <select className='form-control inputwidth' {...register("Level", { required: true })} style={customStyles.inputLabel}>
                                                    <option value="">Select Level </option>
                                                    {
                                                        levellistData.map((data, index) => {
                                                            return (
                                                                <option   value={data.id}>{data.short}</option>
                                                            )
                                                        })
                                                    }
                                                </select>
                                                {errors.Level && <span style={customStyles.errorMsg}> Select Level</span>}
                                            </div>}
                                        </div>
                                    }


                                    {
                                        <div style={customPopupDivision.popupinputs}>
                                            <p>Designation<span >*</span></p>
                                            {<div>
                                                <select className='form-control inputwidth' {...register("DesignationID", { required: true })} style={customStyles.inputLabel}>
                                                    <option value="">Select Designation</option>
                                                    {
                                                        designationlistData.map((data, index) => {
                                                            return (
                                                                <option   value={data.id}>{data.short}</option>
                                                            )
                                                        })
                                                    }
                                                </select>
                                                {errors.DesignationID && <span style={customStyles.errorMsg}> Select Designation</span>}
                                            </div>}
                                        </div>
                                    }

                                    {
                                        <div style={customPopupDivision.popupinputs}>
                                            <p>Login Type<span >*</span></p>
                                            {<div>
                                                <select className='form-control inputwidth' {...register("PositionLogin", { required: true })} style={customStyles.inputLabel}>
                                                    <option value="">Select Login Type</option>
                                                    <option value="2">Manager</option>
                                                    <option value="6">Employee</option>
                                                    <option value="9">HR</option>
                                                    <option value="1">Admin</option>
                                                    <option value="8">Finance</option>
                                                    <option value="10">SBU</option>
                                                    <option value="11">IT Head</option>
                                                    <option value="12">HR Head</option>
                                                    <option value="17">Payroll Manager</option>
                                                </select>
                                                {errors.PositionLogin && <span style={customStyles.errorMsg}> Select LoginType</span>}
                                            </div>}
                                        </div>
                                    }

                                </div>
                            </div>
                        </div>
                    </div><br></br>

                    <div className='card'>
                        <div className='row'>
                            <div className='col-12'>
                                <div className="d-flex justify-content-between">
                                    <p className='modal-heading'>Organization Hierarchy</p>
                                </div>
                                <div style={customPopupDivision.popupcontent}>



                                    {
                                        <div style={customPopupDivision.popupinputs}>
                                            <p>Entity  <span >*</span></p>
                                            {<div>
                                                <select className='form-control inputwidth' {...register("Entity", { required: true })} style={customStyles.inputLabel}>
                                                    <option value="0" >Select Entity</option>
                                                    <option value="Ayala Land Premier Inc." >Ayala Land Premier Inc.</option>
                                                    <option value="Avida Land Corporation" >Avida Land Corporation
                                                    </option>
                                                    <option value="Ayalaland Offices, Inc." >Ayalaland Offices, Inc.
                                                    </option>
                                                    <option value="Ayala Land Inc." >Ayala Land Inc.
                                                    </option>
                                                </select>
                                                {errors.Entity && <span style={customStyles.errorMsg}> Select  Entity </span>}
                                            </div>}
                                        </div>
                                    }


                                    <div style={customPopupDivision.popupinputs}>
                                        <p>Group <span >*</span></p>
                                        {
                                            <div>
                                                <select className='form-control inputwidth' {...register("GroupID", { required: true })} style={customStyles.inputLabel}>
                                                    <option value="">Select Group </option>
                                                    {
                                                        grouplistData.map((data, index) => {
                                                            return (
                                                                <option   value={data.id}>{data.short}</option>
                                                            )
                                                        })
                                                    }
                                                </select>
                                                {errors.GroupID && <span style={customStyles.errorMsg}> Please Enter Group</span>}
                                            </div>
                                        }
                                    </div>

                                    {
                                        <div style={customPopupDivision.popupinputs}>
                                            <p>Division  <span >*</span></p>
                                            {<div>
                                                <select className='form-control inputwidth' {...register("DivisionID", { required: true })} style={customStyles.inputLabel}>
                                                    <option value="">Select Division  </option>
                                                    {
                                                        divisionlistData.map((data, index) => {
                                                            return (
                                                                <option   value={data.id}>{data.short}</option>
                                                            )
                                                        })
                                                    }
                                                </select>
                                                {errors.DivisionID && <span style={customStyles.errorMsg}> Select Division </span>}
                                            </div>}
                                        </div>
                                    }


                                    {
                                        <div style={customPopupDivision.popupinputs}>
                                            <p>Department<span >*</span></p>
                                            {<div>
                                                <select className='form-control inputwidth' {...register("DepartmentID", { required: true })} style={customStyles.inputLabel}>
                                                    <option value="">Select Department</option>
                                                    {
                                                        departmentlistData.map((data, index) => {
                                                            return (
                                                                <option   value={data.id}>{data.department_name}</option>
                                                            )
                                                        })
                                                    }
                                                </select>
                                                {errors.DepartmentID && <span style={customStyles.errorMsg}> Select Department</span>}
                                            </div>}
                                        </div>
                                    }

                                    {
                                        <div style={customPopupDivision.popupinputs}>
                                            <p>Section<span >*</span></p>
                                            {<div>
                                                <select className='form-control inputwidth' {...register("SectionID", { required: true })} style={customStyles.inputLabel}>
                                                    <option value="">Select Section</option>
                                                    {
                                                        sectionlistData.map((data, index) => {
                                                            return (
                                                                <option   value={data.id}>{data.sort}</option>
                                                            )
                                                        })
                                                    }
                                                </select>
                                                {errors.SectionID && <span style={customStyles.errorMsg}> Select Section</span>}
                                            </div>}
                                        </div>
                                    }


                                    {
                                        <div style={customPopupDivision.popupinputs}>
                                            <p>Immediate Manager<span >*</span></p>
                                            {<div>
                                                <select className='form-control inputwidth' {...register("ManagerID", { required: true })} style={customStyles.inputLabel}>
                                                    <option value="">Select  Name</option>
                                                    {
                                                        stafflistData.map((data, index) => {
                                                            return (
                                                                <option   value={data.id}>{data.name}</option>
                                                            )
                                                        })
                                                    }
                                                </select>
                                                {errors.ManagerID && <span style={customStyles.errorMsg}> Select ImmediateManager</span>}
                                            </div>}
                                        </div>
                                    }

                                    {
                                        <div style={customPopupDivision.popupinputs}>
                                            <p>Next Level Manager<span >*</span></p>
                                            {<div>
                                                <select className='form-control inputwidth' {...register("NextLevelManagerID", { required: true })} style={customStyles.inputLabel}>
                                                    <option value="">Select Name</option>
                                                    {
                                                        stafflistData.map((data, index) => {
                                                            return (
                                                                <option  value={data.id}>{data.name}</option>
                                                            )
                                                        })
                                                    }
                                                </select>
                                                {errors.NextLevelManagerID && <span style={customStyles.errorMsg}> Select Next Level Manager</span>}
                                            </div>}
                                        </div>
                                    }


                                    <div style={customPopupDivision.popupinputs}>
                                        <p>SAP Vendor Code<span >*</span></p>
                                        <div>
                                            <input type='text' placeholder='SAP Vendor Code '
                                                {...register("SAPVendorNo", { required: true })} className='form-control inputwidth' ></input>
                                            {errors.SAPVendorNo && <span style={customStyles.errorMsg}> Please SAP Vendor Code *</span>}
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div><br></br>

                    <div className='card'>
                        <div className='row'>
                            <div className='col-12'>
                                <div className="d-flex justify-content-between">
                                    <p className='modal-heading'>Work Location</p>
                                </div>
                                <div style={customPopupDivision.popupcontent}>
                                    {
                                        <div style={customPopupDivision.popupinputs}>
                                            <p>Work Arrangement  <span >*</span></p>
                                            {<div>
                                                <select className='form-control inputwidth' {...register("WorkArrangement", { required: true })} style={customStyles.inputLabel}>
                                                    <option value="">Select Work Arrangement </option>
                                                    <option value="Office Base">Office-based</option>
                                                    <option value="Site Base">Site-based</option>
                                                </select>
                                                {errors.WorkArrangement && <span style={customStyles.errorMsg}> Select  Work Arrangement </span>}
                                            </div>}
                                        </div>
                                    }


                                    <div style={customPopupDivision.popupinputs}>
                                        <p>Worksite Country <span >*</span></p>
                                        {
                                            <div>
                                                <select className='form-control inputwidth' {...register("WorksiteCountryID", { required: true })} style={customStyles.inputLabel}>
                                                    <option value="">Select  Country </option>
                                                    {
                                                        workCountrylistData.map((data, index) => {
                                                            return (
                                                                <option   value={data.id}>{data.short}</option>
                                                            )
                                                        })
                                                    }
                                                </select>
                                                {errors.WorksiteCountryID && <span style={customStyles.errorMsg}> Please Worksite Country </span>}
                                            </div>
                                        }
                                    </div>

                                    {
                                        <div style={customPopupDivision.popupinputs}>
                                            <p>Worksite Province  <span >*</span></p>
                                            {<div>
                                                <select className='form-control inputwidth' {...register("WorksiteProvinceID", { required: true })} style={customStyles.inputLabel}>
                                                    <option value="">Select  Province  </option>
                                                    {
                                                        Provincelist.map((data, index) => {
                                                            return (
                                                                <option   value={data.id}>{data.short}</option>
                                                            )
                                                        })
                                                    }
                                                </select>
                                                {errors.WorksiteProvinceID && <span style={customStyles.errorMsg}> Select Worksite Province </span>}
                                            </div>}
                                        </div>
                                    }


                                    {
                                        <div style={customPopupDivision.popupinputs}>
                                            <p>Worksite City<span >*</span></p>
                                            {<div>
                                                <select className='form-control inputwidth' {...register("WorksiteCityID", { required: true })} style={customStyles.inputLabel}>
                                                    <option value="">Select  City</option>
                                                    {
                                                        Citylist.map((data, index) => {
                                                            return (
                                                                <option   value={data.id}>{data.short}</option>
                                                            )
                                                        })
                                                    }
                                                </select>
                                                {errors.WorksiteCityID && <span style={customStyles.errorMsg}> Select Worksite City</span>}
                                            </div>}
                                        </div>
                                    }

                                    {
                                        <div style={customPopupDivision.popupinputs}>
                                            <p>Working Location<span >*</span></p>
                                            {<div>
                                                <select className='form-control inputwidth' {...register("WorksiteLocationID", { required: true })} style={customStyles.inputLabel}>
                                                    <option value="">Select Working Location</option>
                                                    {
                                                        worklocationlist.map((data, index) => {
                                                            return (
                                                                <option   value={data.id}>{data.short}</option>
                                                            )
                                                        })
                                                    }
                                                </select>
                                                {errors.WorksiteLocationID && <span style={customStyles.errorMsg}> Select Working Location</span>}
                                            </div>}
                                        </div>
                                    }

                                    {
                                        <div style={customPopupDivision.popupinputs}>
                                            { }
                                        </div>
                                    }


                                </div>
                            </div>
                        </div>
                    </div><br></br>
                    <div className='card'>
                        <div className='row'>
                            <div className='col-12'>
                                <div className="d-flex justify-content-between">
                                    <p className='modal-heading'>Employment Details</p>

                                </div>
                                <div style={customPopupDivision.popupcontent}>

                                    {
                                        <div style={customPopupDivision.popupinputs}>
                                            <p>Employment Type  <span >*</span></p>
                                            {<div>
                                                <select className='form-control inputwidth' {...register("EmployementTypeID", { required: true })} style={customStyles.inputLabel}>
                                                    <option value="0">Select Type</option>
                                                    <option value="1">Consultant</option>
                                                    <option value="2">Project Hire</option>
                                                    <option value="3">Regular</option>
                                                </select>
                                                {errors.EmployementTypeID && <span style={customStyles.errorMsg}> Select  Work Arrangement </span>}
                                            </div>}
                                        </div>
                                    }


                                    {
                                        <div style={customPopupDivision.popupinputs}>
                                            <p>Employment Status  <span >*</span></p>
                                            {<div>
                                                <select className='form-control inputwidth' {...register("EmploymentStatus", { required: true })} style={customStyles.inputLabel}>
                                                    <option value="">Select Status </option>
                                                    <option value="Active">Active</option>
                                                    <option value="Inactive">Inactive</option>
                                                </select>
                                                {errors.EmploymentStatus && <span style={customStyles.errorMsg}> Select  Work Arrangement </span>}
                                            </div>}
                                        </div>
                                    }


                                    <div style={customPopupDivision.popupinputs}>
                                        <p>Hired Date<span >*</span></p>
                                        <div>
                                            <input type='date'
                                                {...register("HiredDate", { required: true })} className='form-control inputwidth' ></input>
                                            {errors.HiredDate && <span style={customStyles.errorMsg}> Please Enter Hired Date *</span>}
                                        </div>
                                    </div>


                                    <div style={customPopupDivision.popupinputs}>
                                        <p>Confirmation Due Date<span >*</span></p>
                                        <div>
                                            <input type='date' placeholder='Confirmation Due Date'
                                                {...register("ConfirmationDueDate", { required: true })} className='form-control inputwidth' ></input>
                                            {errors.ConfirmationDueDate && <span style={customStyles.errorMsg}> Please Enter Previous Effectivity BMSDate</span>}
                                        </div>
                                    </div>

                                    <div style={customPopupDivision.popupinputs}>
                                        <p>Probation Start Date<span >*</span></p>
                                        <div>
                                            <input type='date' placeholder='Previous BMS'
                                                {...register("ProbationStartDate", { required: true })} className='form-control inputwidth' ></input>
                                            {errors.ProbationStartDate && <span style={customStyles.errorMsg}> Please Enter Previous BMS</span>}
                                        </div>
                                    </div>


                                    <div style={customPopupDivision.popupinputs}>
                                        <p>Probation End Date<span >*</span></p>
                                        <div>
                                            <input type='date' placeholder='ProbationEndDate'
                                                {...register("ProbationEndDate", { required: true })} className='form-control inputwidth' ></input>
                                            {errors.ProbationEndDate && <span style={customStyles.errorMsg}> Please Enter Effectivity date of Original BMS</span>}
                                        </div>
                                    </div>



                                    <div style={customPopupDivision.popupinputs}>

                                    </div>



                                </div>
                            </div>
                        </div>
                    </div><br></br>


                    <div className="d-flex justify-content-center w-100 mt-2 mb-2 pr-2">
                        <button className='submit-button'>Sumbit</button>
                    </div>


                </div>
            </form>
        </div >
    )
}
export default PositionDetails