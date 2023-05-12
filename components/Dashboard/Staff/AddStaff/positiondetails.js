import React from 'react'
import { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import axios from 'axios';


function PositionDetails() {
    const [LeaveConfiguration, setLeaveConfigurationData] = useState([]);
    const [Countrytypelist, setCountrylistData] = useState([]);
    const [rolelistData, setRolelistData] = useState([]);
    const [bandlistData, setBandlistData] = useState([]);
    const [levellistData, setLevellistData] = useState([]);
    const [divisionlistData, setDivisionllistData] = useState([]);
    const [departmentlistData, setDepartmentlistData] = useState([]);
    const [grouplistData, setGrouplistData] = useState([]);
    const [designationlistData, setDesignationlistData] = useState([]);
    const [CountrylistData, setCountrytypeListData] = useState([]);
    const [sectionlistData, setSectionlistData] = useState([]);
    const [stafflistData, setStafflistData] = useState([]);
    const [costlistData, setCostlistData] = useState([]);
    const [Provincelist, setProvincelistData] = useState([]);
    const [Citylist, setCitylisttData] = useState([]);

    const [worklocationlist, setworklocationlisttData] = useState([]);
    const [workCountrylistData, setWorkCountryListData] = useState([]);
    const [modalIsOpen, setIsOpen] = useState(false);
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

        // if (actionType == "insert") {
        //     let Enity = {

        //     }
        //     await axios.post(hostURL + "", Enity);
        // }
        // else {
        //     let Enity = {

        //     }
        //     await axios.post(hostURL + "", Enity);
        // }
        // let res = await axios.get(hostURL + "");
        setLeaveConfigurationData(res.data);
        setIsOpen(false);
    }

    const deleteModal = async (id) => {
        debugger
        let hostURL = process.env.NEXT_PUBLIC_API_HOST_URL;
        // let res = await axios.get(hostURL + "/?ID=" + id);
        // let res1 = await axios.get(hostURL + "/");
        setLeaveConfigurationData(res1.data);
    }

    function openModal() {
        clearForm();
        setIsOpen(true);
    }
    function closeModal() {
        setIsOpen(false);
    }

    const openEditModal = async (id) => {
        let hostURL = process.env.NEXT_PUBLIC_API_HOST_URL;
        let res = await axios.get(hostURL + "/?ID=" + id);
        clearForm(res.data[0]);
        setIsOpen(true);
    }

    function clearForm(existingData = null) {
        debugger
        let etty = {

        }
        reset(etty);
        setActionType(existingData ? "update" : 'insert');
    }

    useEffect(() => {
        debugger
       getData()
       getCountryofBirth()

    }, [9]);

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


        let res9 = await axios.get(hostURL + "/HR/GetCostCentersMaster");
        setCostlistData(res9.data);

        let res10 = await axios.get(hostURL + "/Master/GetCountryType");
        setCountrytypeListData(res10.data);


        let res11 = await axios.get(hostURL + "/Master/GetStateType");
        setProvincelistData(res11.data);

        let res12 = await axios.get(hostURL + "/Master/GetCityType");
        setCitylisttData(res12.data);


        let res13 = await axios.get(hostURL + "/Master/GetCountryType");
        setWorkCountryListData(res13.data);


        let res14 = await axios.get(hostURL + "/Master/GetWorkingLocationMaster");
        setworklocationlisttData(res14.data);




    }

    async function getCountryofBirth() {
        debugger
        let hostURL = process.env.NEXT_PUBLIC_API_HOST_URL;
        let res = await axios.get(hostURL + "/Master/GetCountryType");
        setCountrylistData(res.data);
    }

    // <AiFillCloseCircle />
    return (
        <div style={customStyles}>
            <form >
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
                                                {...register("EmployeeID", { required: true })} className='form-control inputwidth' ></input>
                                            {errors.EmployeeID && <span style={customStyles.errorMsg}> Please Employee ID *</span>}
                                        </div>
                                    </div>
                                    {
                                        <div style={customPopupDivision.popupinputs}>
                                            <p>Position Title<span >*</span></p>
                                            {<div>
                                                <select className='form-control inputwidth' {...register("PositionTitle", { required: true })} style={customStyles.inputLabel}>
                                                    <option value="">Select Position</option>
                                                    {
                                                        rolelistData.map((data, index) => {
                                                            return (
                                                                <option  key={data.id} value={data.id}>{data.short}</option>
                                                            )
                                                        })
                                                    }
                                                </select>
                                                {errors.PositionTitle && <span style={customStyles.errorMsg}> Select  Position</span>}
                                            </div>}
                                        </div>
                                    }


                                    <div style={customPopupDivision.popupinputs}>
                                        <p>Band<span >*</span></p>
                                        {
                                            <div>
                                                <select className='form-control inputwidth' {...register("Band ", { required: true })} style={customStyles.inputLabel}>
                                                    <option value="">Select Band </option>
                                                    {
                                                        bandlistData.map((data, index) => {
                                                            return (
                                                                <option key={data.id} value={data.id}>{data.short}</option>
                                                            )
                                                        })
                                                    }
                                                </select>
                                                {errors.Band && <span style={customStyles.errorMsg}> Please Enter Band</span>}
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
                                                                <option  key={data.id} value={data.id}>{data.short}</option>
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
                                                <select className='form-control inputwidth' {...register("Designation", { required: true })} style={customStyles.inputLabel}>
                                                    <option value="">Select Designation</option>
                                                    {
                                                        designationlistData.map((data, index) => {
                                                            return (
                                                                <option  key={data.id} value={data.id}>{data.short}</option>
                                                            )
                                                        })
                                                    }
                                                </select>
                                                {errors.Designation && <span style={customStyles.errorMsg}> Select Designation</span>}
                                            </div>}
                                        </div>
                                    }

                                    {
                                        <div style={customPopupDivision.popupinputs}>
                                            <p>Login Type<span >*</span></p>
                                            {<div>
                                                <select className='form-control inputwidth' {...register("LoginType", { required: true })} style={customStyles.inputLabel}>
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
                                                {errors.LoginType && <span style={customStyles.errorMsg}> Select LoginType</span>}
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
                                                <select className='form-control inputwidth' {...register("Entity ", { required: true })} style={customStyles.inputLabel}>
                                                    <option value="0" >Select Entity</option>
                                                    <option value="1" >Ayala Land Premier Inc.</option>
                                                    <option value="2" >Avida Land Corporation
                                                    </option>
                                                    <option value="3" >Ayalaland Offices, Inc.
                                                    </option>
                                                    <option value="4" >Ayala Land Inc.
                                                    </option>
                                                </select>
                                                {errors.PositionTitle && <span style={customStyles.errorMsg}> Select  Entity </span>}
                                            </div>}
                                        </div>
                                    }


                                    <div style={customPopupDivision.popupinputs}>
                                        <p>Group <span >*</span></p>
                                        {
                                            <div>
                                                <select className='form-control inputwidth' {...register("Group ", { required: true })} style={customStyles.inputLabel}>
                                                    <option value="">Select Group </option>
                                                    {
                                                        grouplistData.map((data, index) => {
                                                            return (
                                                                <option  key={data.id} value={data.id}>{data.short}</option>
                                                            )
                                                        })
                                                    }
                                                </select>
                                                {errors.Group && <span style={customStyles.errorMsg}> Please Enter Group</span>}
                                            </div>
                                        }
                                    </div>

                                    {
                                        <div style={customPopupDivision.popupinputs}>
                                            <p>Division  <span >*</span></p>
                                            {<div>
                                                <select className='form-control inputwidth' {...register("Division ", { required: true })} style={customStyles.inputLabel}>
                                                    <option value="">Select Division  </option>
                                                    {
                                                        divisionlistData.map((data, index) => {
                                                            return (
                                                                <option  key={data.id} value={data.id}>{data.sort}</option>
                                                            )
                                                        })
                                                    }
                                                </select>
                                                {errors.Division && <span style={customStyles.errorMsg}> Select Division </span>}
                                            </div>}
                                        </div>
                                    }


                                    {
                                        <div style={customPopupDivision.popupinputs}>
                                            <p>Department<span >*</span></p>
                                            {<div>
                                                <select className='form-control inputwidth' {...register("Department", { required: true })} style={customStyles.inputLabel}>
                                                    <option value="">Select Department</option>
                                                    {
                                                        departmentlistData.map((data, index) => {
                                                            return (
                                                                <option  key={data.id} value={data.id}>{data.department_name}</option>
                                                            )
                                                        })
                                                    }
                                                </select>
                                                {errors.Department && <span style={customStyles.errorMsg}> Select Department</span>}
                                            </div>}
                                        </div>
                                    }

                                    {
                                        <div style={customPopupDivision.popupinputs}>
                                            <p>Section<span >*</span></p>
                                            {<div>
                                                <select className='form-control inputwidth' {...register("Section", { required: true })} style={customStyles.inputLabel}>
                                                    <option value="">Select Section</option>
                                                    {
                                                        sectionlistData.map((data, index) => {
                                                            return (
                                                                <option  key={data.id} value={data.id}>{data.name}</option>
                                                            )
                                                        })
                                                    }
                                                </select>
                                                {errors.Section && <span style={customStyles.errorMsg}> Select Section</span>}
                                            </div>}
                                        </div>
                                    }


                                    {
                                        <div style={customPopupDivision.popupinputs}>
                                            <p>Immediate Manager<span >*</span></p>
                                            {<div>
                                                <select className='form-control inputwidth' {...register("ImmediateManager", { required: true })} style={customStyles.inputLabel}>
                                                    <option value="">Select  Name</option>
                                                    {
                                                        stafflistData.map((data, index) => {
                                                            return (
                                                                <option  key={data.id} value={data.id}>{data.fullname}</option>
                                                            )
                                                        })
                                                    }
                                                </select>
                                                {errors.ImmediateManager && <span style={customStyles.errorMsg}> Select ImmediateManager</span>}
                                            </div>}
                                        </div>
                                    }

                                    {
                                        <div style={customPopupDivision.popupinputs}>
                                            <p>Next Level Manager<span >*</span></p>
                                            {<div>
                                                <select className='form-control inputwidth' {...register("NextLevelManager", { required: true })} style={customStyles.inputLabel}>
                                                    <option value="">Select Name</option>
                                                    {
                                                        stafflistData.map((data, index) => {
                                                            return (
                                                                <option key={data.id} value={data.id}>{data.fullname}</option>
                                                            )
                                                        })
                                                    }
                                                </select>
                                                {errors.NextLevelManager && <span style={customStyles.errorMsg}> Select Next Level Manager</span>}
                                            </div>}
                                        </div>
                                    }

                                    {
                                        <div style={customPopupDivision.popupinputs}>
                                            <p>Group Head<span >*</span></p>
                                            {<div>
                                                <select className='form-control inputwidth' {...register("GroupHead", { required: true })} style={customStyles.inputLabel}>
                                                    <option value="">Select Name</option>
                                                    {
                                                        stafflistData.map((data, index) => {
                                                            return (
                                                                <option  key={data.id} value={data.id}>{data.fullname}</option>
                                                            )
                                                        })
                                                    }
                                                </select>
                                                {errors.GroupHead && <span style={customStyles.errorMsg}> Select Group Head</span>}
                                            </div>}
                                        </div>
                                    }

                                    {
                                        <div style={customPopupDivision.popupinputs}>
                                            <p>Cost Center<span >*</span></p>
                                            {<div>
                                                <select className='form-control inputwidth' {...register("CostCenter", { required: true })} style={customStyles.inputLabel}>
                                                    <option value="">Select Cost Center</option>
                                                    {
                                                        costlistData.map((data, index) => {
                                                            return (
                                                                <option  key={data.id} value={data.id}>{data.short}</option>
                                                            )
                                                        })
                                                    }
                                                </select>
                                                {errors.CostCenter && <span style={customStyles.errorMsg}> Select Cost Center</span>}
                                            </div>}
                                        </div>
                                    }






                                    <div style={customPopupDivision.popupinputs}>
                                        <p>SAP Vendor Code<span >*</span></p>
                                        <div>
                                            <input type='text' placeholder='SAP Vendor Code '
                                                {...register("SAPVendorCode", { required: true })} className='form-control inputwidth' ></input>
                                            {errors.EmployeeID && <span style={customStyles.errorMsg}> Please SAP Vendor Code *</span>}
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
                                                <select className='form-control inputwidth' {...register("WorkArrangement ", { required: true })} style={customStyles.inputLabel}>
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
                                                <select className='form-control inputwidth' {...register("WorksiteCountry ", { required: true })} style={customStyles.inputLabel}>
                                                    <option value="">Select  Country </option>
                                                    {
                                                        workCountrylistData.map((data, index) => {
                                                            return (
                                                                <option  key={data.id} value={data.id}>{data.short}</option>
                                                            )
                                                        })
                                                    }
                                                </select>
                                                {errors.WorksiteCountry && <span style={customStyles.errorMsg}> Please Worksite Country </span>}
                                            </div>
                                        }
                                    </div>

                                    {
                                        <div style={customPopupDivision.popupinputs}>
                                            <p>Worksite Province  <span >*</span></p>
                                            {<div>
                                                <select className='form-control inputwidth' {...register("WorksiteProvince ", { required: true })} style={customStyles.inputLabel}>
                                                    <option value="">Select  Province  </option>
                                                    {
                                                        Provincelist.map((data, index) => {
                                                            return (
                                                                <option  key={data.id} value={data.id}>{data.short}</option>
                                                            )
                                                        })
                                                    }
                                                </select>
                                                {errors.WorksiteProvince && <span style={customStyles.errorMsg}> Select Worksite Province </span>}
                                            </div>}
                                        </div>
                                    }


                                    {
                                        <div style={customPopupDivision.popupinputs}>
                                            <p>Worksite City<span >*</span></p>
                                            {<div>
                                                <select className='form-control inputwidth' {...register("WorksiteCity", { required: true })} style={customStyles.inputLabel}>
                                                    <option value="">Select  City</option>
                                                    {
                                                        Citylist.map((data, index) => {
                                                            return (
                                                                <option  key={data.id} value={data.id}>{data.short}</option>
                                                            )
                                                        })
                                                    }
                                                </select>
                                                {errors.WorksiteCity && <span style={customStyles.errorMsg}> Select Worksite City</span>}
                                            </div>}
                                        </div>
                                    }

                                    {
                                        <div style={customPopupDivision.popupinputs}>
                                            <p>Working Location<span >*</span></p>
                                            {<div>
                                                <select className='form-control inputwidth' {...register("WorkingLocation", { required: true })} style={customStyles.inputLabel}>
                                                    <option value="">Select Working Location</option>
                                                    {
                                                        worklocationlist.map((data, index) => {
                                                            return (
                                                                <option  key={data.id} value={data.id}>{data.short}</option>
                                                            )
                                                        })
                                                    }
                                                </select>
                                                {errors.WorkingLocation && <span style={customStyles.errorMsg}> Select Working Location</span>}
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
                                                <select className='form-control inputwidth' {...register("Employmenttype ", { required: true })} style={customStyles.inputLabel}>
                                                    <option value="0">Select Type</option>
                                                    <option value="Consultant">Consultant</option>
                                                    <option value="Project Hire">Project Hire</option>
                                                    <option value="Regular">Regular</option>
                                                </select>
                                                {errors.Employmenttype && <span style={customStyles.errorMsg}> Select  Work Arrangement </span>}
                                            </div>}
                                        </div>
                                    }


                                    {
                                        <div style={customPopupDivision.popupinputs}>
                                            <p>Employment Status  <span >*</span></p>
                                            {<div>
                                                <select className='form-control inputwidth' {...register("EmploymentStatus ", { required: true })} style={customStyles.inputLabel}>
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
                                            <input type='date' placeholder='Original BMS *'
                                                {...register("OriginalBMS", { required: true })} className='form-control inputwidth' ></input>
                                            {errors.OriginalBMS && <span style={customStyles.errorMsg}> Please Enter Original BMS *</span>}
                                        </div>
                                    </div>


                                    <div style={customPopupDivision.popupinputs}>
                                        <p>Confirmation Due Date<span >*</span></p>
                                        <div>
                                            <input type='date' placeholder='Previous Effectivity BMSDate'
                                                {...register("PreviousEffectivityBMSDate", { required: true })} className='form-control inputwidth' ></input>
                                            {errors.PreviousEffectivityBMSDate && <span style={customStyles.errorMsg}> Please Enter Previous Effectivity BMSDate</span>}
                                        </div>
                                    </div>

                                    <div style={customPopupDivision.popupinputs}>
                                        <p>Actual Confirmation Date<span >*</span></p>
                                        <div>
                                            <input type='date' placeholder='Previous BMS'
                                                {...register("PreviousBMS", { required: true })} className='form-control inputwidth' ></input>
                                            {errors.PreviousBMS && <span style={customStyles.errorMsg}> Please Enter Previous BMS</span>}
                                        </div>
                                    </div>

                                    <div style={customPopupDivision.popupinputs}>
                                        <p>Separation Date<span >*</span></p>
                                        <div>
                                            <input type='date' placeholder='CurrentEffectivityBMSDate'
                                                {...register("CurrentEffectivityBMSDate", { required: true })} className='form-control inputwidth' ></input>
                                            {errors.CurrentEffectivityBMSDate && <span style={customStyles.errorMsg}> Please Enter Effectivity date of Original BMS</span>}
                                        </div>
                                    </div>
                                    <div style={customPopupDivision.popupinputs}>
                                        <p>Probation End Date<span >*</span></p>
                                        <div>
                                            <input type='date' placeholder='CurrentEffectivityBMSDate'
                                                {...register("CurrentEffectivityBMSDate", { required: true })} className='form-control inputwidth' ></input>
                                            {errors.CurrentEffectivityBMSDate && <span style={customStyles.errorMsg}> Please Enter Effectivity date of Original BMS</span>}
                                        </div>
                                    </div>

                                    <div style={customPopupDivision.popupinputs}>
                                        <p>Contract End Date<span >*</span></p>
                                        <div>
                                            <input type='date' placeholder='CurrentEffectivityBMSDate'
                                                {...register("CurrentEffectivityBMSDate", { required: true })} className='form-control inputwidth' ></input>
                                            {errors.CurrentEffectivityBMSDate && <span style={customStyles.errorMsg}> Please Enter Effectivity date of Original BMS</span>}
                                        </div>
                                    </div>

                                    <div style={customPopupDivision.popupinputs}>

                                    </div>



                                </div>
                            </div>
                        </div>
                    </div><br></br>


                    <div class="d-flex justify-content-center w-100 mt-2 mb-2 pr-2">
                        <button className='submit-button'>Sumbit</button>
                    </div>


                </div>
            </form>
        </div >
    )
}
export default PositionDetails