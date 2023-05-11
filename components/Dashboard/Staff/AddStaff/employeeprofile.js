import React from 'react'
import { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import { useDropzone } from 'react-dropzone'

function EmployeeProfile() {
    const [CountrylistData, setCountrylistData] = useState([]);
    const [LanguagelistData, setLanguagelistData] = useState([]);
    const [TitleMasterData, setTitleMaster] = useState([]);
    const [hostURL, sethostURL] = useState(process.env.NEXT_PUBLIC_API_HOST_URL);
    const { register, handleSubmit, watch, reset, formState: { errors } } = useForm();
    const [actionType, setActionType] = useState("insert");



    useEffect(() => {
        debugger
        getData();
    }, [1]);
    const getData = async () => {
        let GetTitleMaster = await axios.get(hostURL + "Master/GetTitleMaster");
        setTitleMaster(GetTitleMaster.data);
        let GetCountryType = await axios.get(hostURL + "Master/GetCountryType");
        setCountrylistData(GetCountryType.data);
    }

    async function getLanguagelist() {
        debugger
        let hostURL = process.env.NEXT_PUBLIC_API_HOST_URL;
        let res = await axios.get(hostURL + "Master/GetLanguageMaster");
        setLanguagelistData(res.data);
    }

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
            width: '24%',
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
                BuildingID: 56,
                Name: this.Name,
                // PhoneNo: this.MobilePersonal,
                PhoneNo: '9876543210',
                // 'EmailID': ((this.Personal_Email).replaceAll(' ', '')),
                EmailID: this.Personal_Email,
                TypeID: 6,
                // 'Type': Number(this.RoleType),
                Address: this.Address,
                Attachment: this.attachments3url[0],   // marriage certificate column
                doj: this.JoiningDate,
                Salary: 1000,

                LeavesPerMonth: this.LeavesPerMonth,
                WorkTimings: this.WorkTimings,
                ContactNumber: this.ContactNumber,
                // 'Supervisor': 20459,
                Supervisor: this.Supervisor,
                EmployeeID: this.EmployeeCode,
                ResignationDate: this.JoiningDate,
                ChaildTotal: 10,
                MedicalLeaveEntitlement: 10,
                MaternitityLeaveEntitlement: 105,
                PaternitityLeaveEntitlement: 7,
                CompassionateLeaveEntitlement: 10,
                Leavesfrompreviousyear: 10,
                ExtendedChildcareLeaveEntitlement: 10,
                MarriageLeaveEntitlement: 10,
                Title: this.Title,
                Middle_Name: this.Middle_Name,
                Last_Name: this.Last_Name,
                PlaceO_f_Birth: this.PlaceO_f_Birth,
                Country_Of_Birth: this.Country_Of_Birth,
                Age: this.Age,
                Gender: this.Gender == 'Male' ? 'Male' : 'Female',
                Status: this.Status,
                // 'Date_Of_Marriage' : (String(this.Date_Of_Marriage ) == "" ? "Null" + "," : "'" + String(this.Date_Of_Marriage) + "',"),

                Date_Of_Marriage:
                    this.Date_Of_Marriage == ' '
                        ? '1990-01-01 00:00:00.000'
                        : this.Date_Of_Marriage,
                // 'Date_Of_Marriage': this.Date_Of_Marriage,
                Religion: this.Religion == undefined ? null : this.Religion,
                Citizen_Ship: this.Citizen_Ship == undefined ? null : this.Citizen_Ship,
                Ethnicity: this.Ethnicity == undefined ? null : this.Ethnicity,
                Nationality: this.Nationality,
                Is_Disabled: this.Is_Disabled == 'yes' ? true : false,
                Blood_Group: this.Blood_Group,
                Height: this.Height == null ? 0 : this.Height,
                Weight: this.Weight == null ? 0 : this.Weight,
                MajorIllness: this.MajorIllness,
                IS_Night_Blind: this.IS_Night_Blind == null ? 0 : this.IS_Night_Blind,
                Is_Color_Blind: this.Is_Color_Blind == null ? 0 : this.Is_Color_Blind,
                DOB: this.DOB,
                Signature: this.attachments2url[0],
                Paygroup: this.Paygroup,
                PagiBig_ID: this.PagiBig_ID,
                PagiBigAccountNo: this.PagiBigAccountNo,
                PagibigMembership: this.PagibigMembership,
                PagibigRemarks: this.PagibigRemarks,
                EMPLOYEE_TIN: this.EMPLOYEE_TIN,
                PHILHEALTH_NO: this.PHILHEALTH_NO,
                SSSNO: this.SSSNO,

                department: this.Department == null || this.Department == undefined || this.Department == "" || this.Department == " " || this.Department == "0" ? 0 : this.Department,
                Level: this.level == null || this.level == "" ? 0 : this.level,
                ParentCompany: this.ParentCompany,
                AssignedCompany: this.AssignedCompany,
                ShiftID: 0,
                Restdays: this.Restdays,
                Is_Solo_Parent:
                    this.Is_Solo_Parent == undefined ? 0 : this.Is_Solo_Parent,
                OrginalBms: this.OrginalBms == undefined || this.OrginalBms == "" || this.OrginalBms == 0 ? 0 : this.OrginalBms,
                PreviousEffectivityBMSDate: this.PreviousEffectivityBMSDate == ' ' || this.PreviousEffectivityBMSDate == ""
                    ? '1990-01-01 00:00:00.000' : this.PreviousEffectivityBMSDate,
                PreviousBMS: this.PreviousBMS == null || this.PreviousBMS == "" ? 0 : this.PreviousBMS,
                CurrentEffectivityBMSDate: this.CurrentEffectivityBMSDate == ' ' || this.CurrentEffectivityBMSDate == ""
                    ? '1990-01-01 00:00:00.000' : this.CurrentEffectivityBMSDate,
                CurrentBMS: 1000,
                COLA: this.COLA == null || this.COLA == "" ? 0 : this.COLA,
                IncentiveLeave: this.IncentiveLeave == null ? 0 : this.IncentiveLeave,
                HMOInsurance: this.HMOInsurance == null ? 0 : this.HMOInsurance,
                MeritInsurance: this.MeritInsurance == null ? 0 : this.MeritInsurance,
                DailerLicense: this.DailerLicense == null ? 0 : this.DailerLicense,
                Incrementals: this.Incrementals == null ? 0 : this.Incrementals,
                TaxStatus: this.TaxStatus == null ? 0 : this.TaxStatus,
                GCashNumber: this.GCashNumber == null ? 0 : this.GCashNumber,
                TalentSegment: this.TalentSegment == null ? 0 : this.TalentSegment,
                CostCentre: this.CostCenter == null || this.CostCenter == "" ? 0 : this.CostCenter,

                TranspoAllowance:
                    this.TranspoAllowance == null ? 0 : this.TranspoAllowance,
                CommAllowance: this.CommAllowance == null ? 0 : this.CommAllowance,
                MealAllowance: this.MealAllowance == null ? 0 : this.MealAllowance,
                RiceAllowance: this.RiceAllowance == null ? 0 : this.RiceAllowance,
                MedicineAllowance:
                    this.MedicineAllowance == null ? 0 : this.MedicineAllowance,
                MaintenanceDepreciationAllowance:
                    this.MaintenanceDepreciationAllowance == null
                        ? 0
                        : this.MaintenanceDepreciationAllowance,
                EffectivityofAllowance:
                    this.EffectivityofAllowance == null ? 0 : this.EffectivityofAllowance,
                MotherMaidenName: this.MotherMaidenName,
                FatherMaidenName: this.FatherMaidenName,
                PleaseSpecify: this.PleaseSpecify,
                SpokenLanguage: this.SpokenLanguage == null || this.SpokenLanguage == 0 ? 0 : this.SpokenLanguage,
                NickName: this.NickName == null ? 0 : this.NickName,
                MarriageCertficate: this.attachments3url[0],
                // PWDDisabilityAttachment: this.attachments21[0],
                PWDDisabilityAttachment: this.attachments213url[0] == undefined
                    ? this.PWDDisabilityAttachmenturl
                    : this.attachments213url[0],
            }
            await axios.post(hostURL + "Master/InsertBuildingStaff", Enity);
        }
        else {
            let Enity = {
                "ID": data.ID,
                BuildingID: 56,
                Name: this.Name,
                // PhoneNo: this.MobilePersonal,
                PhoneNo: '9876543210',
                // 'EmailID': ((this.Personal_Email).replaceAll(' ', '')),
                EmailID: this.Personal_Email,
                TypeID: 6,
                // 'Type': Number(this.RoleType),
                Address: this.Address,
                Attachment: this.attachments3url[0],   // marriage certificate column
                doj: this.JoiningDate,
                Salary: 1000,

                LeavesPerMonth: this.LeavesPerMonth,
                WorkTimings: this.WorkTimings,
                ContactNumber: this.ContactNumber,
                // 'Supervisor': 20459,
                Supervisor: this.Supervisor,
                EmployeeID: this.EmployeeCode,
                ResignationDate: this.JoiningDate,
                ChaildTotal: 10,
                MedicalLeaveEntitlement: 10,
                MaternitityLeaveEntitlement: 105,
                PaternitityLeaveEntitlement: 7,
                CompassionateLeaveEntitlement: 10,
                Leavesfrompreviousyear: 10,
                ExtendedChildcareLeaveEntitlement: 10,
                MarriageLeaveEntitlement: 10,
                Title: this.Title,
                Middle_Name: this.Middle_Name,
                Last_Name: this.Last_Name,
                PlaceO_f_Birth: this.PlaceO_f_Birth,
                Country_Of_Birth: this.Country_Of_Birth,
                Age: this.Age,
                Gender: this.Gender == 'Male' ? 'Male' : 'Female',
                Status: this.Status,
                // 'Date_Of_Marriage' : (String(this.Date_Of_Marriage ) == "" ? "Null" + "," : "'" + String(this.Date_Of_Marriage) + "',"),

                Date_Of_Marriage:
                    this.Date_Of_Marriage == ' '
                        ? '1990-01-01 00:00:00.000'
                        : this.Date_Of_Marriage,
                // 'Date_Of_Marriage': this.Date_Of_Marriage,
                Religion: this.Religion == undefined ? null : this.Religion,
                Citizen_Ship: this.Citizen_Ship == undefined ? null : this.Citizen_Ship,
                Ethnicity: this.Ethnicity == undefined ? null : this.Ethnicity,
                Nationality: this.Nationality,
                Is_Disabled: this.Is_Disabled == 'yes' ? true : false,
                Blood_Group: this.Blood_Group,
                Height: this.Height == null ? 0 : this.Height,
                Weight: this.Weight == null ? 0 : this.Weight,
                MajorIllness: this.MajorIllness,
                IS_Night_Blind: this.IS_Night_Blind == null ? 0 : this.IS_Night_Blind,
                Is_Color_Blind: this.Is_Color_Blind == null ? 0 : this.Is_Color_Blind,
                DOB: this.DOB,
                Signature: this.attachments2url[0],
                Paygroup: this.Paygroup,
                PagiBig_ID: this.PagiBig_ID,
                PagiBigAccountNo: this.PagiBigAccountNo,
                PagibigMembership: this.PagibigMembership,
                PagibigRemarks: this.PagibigRemarks,
                EMPLOYEE_TIN: this.EMPLOYEE_TIN,
                PHILHEALTH_NO: this.PHILHEALTH_NO,
                SSSNO: this.SSSNO,

                department: this.Department == null || this.Department == undefined || this.Department == "" || this.Department == " " || this.Department == "0" ? 0 : this.Department,
                Level: this.level == null || this.level == "" ? 0 : this.level,
                ParentCompany: this.ParentCompany,
                AssignedCompany: this.AssignedCompany,
                ShiftID: 0,
                Restdays: this.Restdays,
                Is_Solo_Parent:
                    this.Is_Solo_Parent == undefined ? 0 : this.Is_Solo_Parent,
                OrginalBms: this.OrginalBms == undefined || this.OrginalBms == "" || this.OrginalBms == 0 ? 0 : this.OrginalBms,
                PreviousEffectivityBMSDate: this.PreviousEffectivityBMSDate == ' ' || this.PreviousEffectivityBMSDate == ""
                    ? '1990-01-01 00:00:00.000' : this.PreviousEffectivityBMSDate,
                PreviousBMS: this.PreviousBMS == null || this.PreviousBMS == "" ? 0 : this.PreviousBMS,
                CurrentEffectivityBMSDate: this.CurrentEffectivityBMSDate == ' ' || this.CurrentEffectivityBMSDate == ""
                    ? '1990-01-01 00:00:00.000' : this.CurrentEffectivityBMSDate,
                CurrentBMS: 1000,
                COLA: this.COLA == null || this.COLA == "" ? 0 : this.COLA,
                IncentiveLeave: this.IncentiveLeave == null ? 0 : this.IncentiveLeave,
                HMOInsurance: this.HMOInsurance == null ? 0 : this.HMOInsurance,
                MeritInsurance: this.MeritInsurance == null ? 0 : this.MeritInsurance,
                DailerLicense: this.DailerLicense == null ? 0 : this.DailerLicense,
                Incrementals: this.Incrementals == null ? 0 : this.Incrementals,
                TaxStatus: this.TaxStatus == null ? 0 : this.TaxStatus,
                GCashNumber: this.GCashNumber == null ? 0 : this.GCashNumber,
                TalentSegment: this.TalentSegment == null ? 0 : this.TalentSegment,
                CostCentre: this.CostCenter == null || this.CostCenter == "" ? 0 : this.CostCenter,

                TranspoAllowance:
                    this.TranspoAllowance == null ? 0 : this.TranspoAllowance,
                CommAllowance: this.CommAllowance == null ? 0 : this.CommAllowance,
                MealAllowance: this.MealAllowance == null ? 0 : this.MealAllowance,
                RiceAllowance: this.RiceAllowance == null ? 0 : this.RiceAllowance,
                MedicineAllowance:
                    this.MedicineAllowance == null ? 0 : this.MedicineAllowance,
                MaintenanceDepreciationAllowance:
                    this.MaintenanceDepreciationAllowance == null
                        ? 0
                        : this.MaintenanceDepreciationAllowance,
                EffectivityofAllowance:
                    this.EffectivityofAllowance == null ? 0 : this.EffectivityofAllowance,
                MotherMaidenName: this.MotherMaidenName,
                FatherMaidenName: this.FatherMaidenName,
                PleaseSpecify: this.PleaseSpecify,
                SpokenLanguage: this.SpokenLanguage == null || this.SpokenLanguage == 0 ? 0 : this.SpokenLanguage,
                NickName: this.NickName == null ? 0 : this.NickName,
                MarriageCertficate: this.attachments3url[0],
                // PWDDisabilityAttachment: this.attachments21[0],
                PWDDisabilityAttachment: this.attachments213url[0] == undefined
                    ? this.PWDDisabilityAttachmenturl
                    : this.attachments213url[0],
            }
            await axios.post(hostURL + "Master/UpdateBuildingStaff", Enity);
        }
        let res = await axios.get(hostURL + "Master/GetLeaveConfiguration");
        setLeaveConfigurationData(res.data);
        setIsOpen(false);
    }


    // const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })
    return (
        // <div>
        //     <div className='container'>

        //         <div className='card mt-4 shadow-lg border-0'>
        //             <div className='row mt-2 p-2'>
        //                 <div className='col-lg-12'>
        //                     <p>My Information</p>
        //                     <hr />
        //                 </div>

        //                 <div className='col-lg-3'></div>
        //                 <div className='col-lg-2'>
        //                     <div className='mb-3'>
        //                         <span>Title</span><p></p>
        //                         <select className='form-select'>
        //                             <option>Select title</option>
        //                         </select>
        //                     </div>

        //                     <div className='mb-3'>
        //                         <span>Nick Name</span><p></p>
        //                         <input type="text" className='form-control' placeholder='Nick Name' />
        //                     </div>

        //                     <div className='mb-3'>
        //                         <span>Gender</span><p></p>
        //                         <select className='form-select'>
        //                             <option>Select Gender</option>
        //                         </select>
        //                     </div>

        //                     <div className='mb-3'>
        //                         <span>Father Name</span><p></p>
        //                         <input type="text" className='form-control' placeholder='Father Name' />
        //                     </div>

        //                     <div className='mb-3'>
        //                         <span>Personal Email <i className='text-danger'>*</i></span><p></p>
        //                         <input type="email" className='form-control' placeholder='Personal Email' />
        //                     </div>
        //                 </div>

        //                 <div className='col-lg-2'>
        //                     <div className='mb-3'>
        //                         <span>First Name <i className='text-danger'>*</i></span><p></p>
        //                         <input type="text" className='form-control' placeholder='First Name' />
        //                     </div>

        //                     <div className='mb-3'>
        //                         <span>Date Of Birth <i className='text-danger'>*</i></span><p></p>
        //                         <input type="date" className='form-control' />
        //                     </div>

        //                     <div className='mb-3'>
        //                         <span>Maritial Status <i className='text-danger'>*</i></span><p></p>
        //                         <select className='form-select'>
        //                             <option>Select Status</option>
        //                         </select>
        //                     </div>

        //                     <div className='mb-3 Dropzone' {...getRootProps()}>
        //                         <input {...getInputProps()} />
        //                         {
        //                             isDragActive ?
        //                                 <p>Drop the files here ...</p> :
        //                                 <p>Drop files here Only JPG,PNG,JPEG</p>
        //                         }
        //                     </div>
        //                 </div>

        //                 <div className='col-lg-2'>
        //                     <div className='mb-3'>
        //                         <span>Middle Name</span><p></p>
        //                         <input type="text" className='form-control' placeholder='Middle Name' />
        //                     </div>

        //                     <div className='mb-3'>
        //                         <span>Place of Birth</span><p></p>
        //                         <input type="text" className='form-control' placeholder='Place of Birth' />
        //                     </div>
        //                 </div>

        //                 <div className='col-lg-2'>
        //                     <div className='mb-3'>
        //                         <span>Last Name <i className='text-danger'>*</i></span><p></p>
        //                         <input type="text" className='form-control' placeholder='Last Name' />
        //                     </div>

        //                     <div className='mb-3'>
        //                         <span>Country of Birth</span><p></p>
        //                         <select className='form-select'>
        //                             <option>Select Country</option>
        //                         </select>
        //                     </div>

        //                     <div className='mb-3'>
        //                         <span>Mother Name</span><p></p>
        //                         <input type="text" className='form-control' placeholder='Mother Name' />
        //                     </div>

        //                     <div className='mb-3'>
        //                         <span>Personal Contact Number <i className='text-danger'>*</i></span><p></p>
        //                         <input type="number" className='form-control' placeholder='Personal Contact Number' />
        //                     </div>
        //                 </div>
        //             </div>
        //         </div>

        //         <div className='card mt-4 shadow-lg border-0'>
        //             <div className='row mt-2 p-2'>
        //                 <div className='col-lg-12'>
        //                     <p>Ethnicity Information</p>
        //                     <hr />
        //                 </div>

        //                 <div className='col-lg-2'>
        //                     <div className='mb-3'>
        //                         <span>Religion</span><p></p>
        //                         <select className='form-select'>
        //                             <option>Select Religion</option>
        //                         </select>
        //                     </div>
        //                 </div>

        //                 <div className='col-lg-2'>
        //                     <div className='mb-3'>
        //                         <span>Citizenship</span><p></p>
        //                         <input type="text" className='form-control' placeholder='Citizenship' />
        //                     </div>
        //                 </div>

        //                 <div className='col-lg-2'>
        //                     <div className='mb-3'>
        //                         <span>Nationality <i className='text-danger'>*</i></span><p></p>
        //                         <input type="text" className='form-control' placeholder='Nationality' />
        //                     </div>
        //                 </div>

        //                 <div className='col-lg-2'>
        //                     <div className='mb-3'>
        //                         <span>Language Spoken</span><p></p>
        //                         <select className='form-select'>
        //                             <option>Select Language</option>
        //                         </select>
        //                     </div>
        //                 </div>
        //             </div>
        //         </div>

        //         <div className='card mt-4 shadow-lg border-0'>
        //             <div className='row mt-2 p-2'>
        //                 <div className='col-lg-12'>
        //                     <p>Health Information</p>
        //                     <hr />
        //                 </div>

        //                 <div className='col-lg-2'>
        //                     <div className='mb-3'>
        //                         <span>Blood Type <i className='text-danger'>*</i></span><p></p>
        //                         <select className='form-select'>
        //                             <option>Select Blood Type</option>
        //                         </select>
        //                     </div>
        //                 </div>

        //                 <div className='col-lg-2'>
        //                     <div className='mb-3 form-check form-switch'>
        //                         <span>Is Disable</span><br /><p></p>
        //                         <input type="checkbox" className='form-check-input ms-3' />
        //                     </div>
        //                 </div>

        //                 <div className='col-lg-2'>
        //                     <div className='mb-3'>
        //                         <span>Please Specify <i className='text-danger'>*</i></span><p></p>
        //                         <input type="text" className='form-control' placeholder='Please Specify' />
        //                     </div>
        //                 </div>
        //             </div>
        //         </div>

        //         <div className='card mt-4 shadow-lg border-0'>
        //             <div className='row mt-2 p-2'>
        //                 <div className='col-lg-12'>
        //                     <p>Ethnicity Information</p>
        //                     <hr />
        //                 </div>

        //                 <div className='col-lg-2'>
        //                     <div className='mb-3'>
        //                         <span>Orginlal BMS <i className='text-danger'>*</i></span><p></p>
        //                         <input type="text" className='form-control' placeholder='Orginlal BMS' />
        //                     </div>
        //                 </div>

        //                 <div className='col-lg-3'>
        //                     <div className='mb-3'>
        //                         <span>Effective date of Orginlal BMS <i className='text-danger'>*</i></span><p></p>
        //                         <input type="date" className='form-control' />
        //                     </div>
        //                 </div>

        //                 <div className='col-lg-2'>
        //                     <div className='mb-3'>
        //                         <span>Previous BMS <i className='text-danger'>*</i></span><p></p>
        //                         <input type="text" className='form-control' placeholder='Previous BMS' />
        //                     </div>
        //                 </div>

        //                 <div className='col-lg-3'>
        //                     <div className='mb-3'>
        //                         <span>Effective date of Previous BMS <i className='text-danger'>*</i></span><p></p>
        //                         <input type="date" className='form-control' />
        //                     </div>
        //                 </div>
        //                 <div className='col-lg-4'></div>
        //                 <div className='mt-3 mb-3 col-lg-3'>
        //                     <button className='btn btn-primary' id='AddButton'>Submit</button>
        //                 </div>
        //                 <div className='col-lg-5'></div>

        //                 <div className='col-lg-9'></div>
        //                 {/* <div className='col-lg-3'>
        //                     <div className='btn-group mb-3 mt-2 ms-5'>
        //                         <button className='btn btn-secondary'>Previous</button>
        //                         <button className='btn btn-primary'>Next</button>
        //                     </div>
        //                 </div> */}
        //             </div>
        //         </div>


        //     </div>
        // </div>
        <div style={customStyles}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='container-fluid'>
                    <div className='card'>
                        <div className='row'>
                            <div className='col-12'>
                                <div className="d-flex justify-content-between">
                                    <p className='modal-heading'>My Infromation</p>
                                </div>
                                <div style={customPopupDivision.popupcontent}>
                                    <div style={customPopupDivision.popupinputs}>
                                        {/* {
                                            { data.photo == 'https://103.12.1.76/ALIAPI/Images/EmptyProfile/noimage.png' ? { photo } : '' } {data.photo != 'https://103.12.1.76/ALIAPI/Images/EmptyProfile/noimage.png' ? 'NA' : ''}
                                        } */}
                                        {/* <Image src={Closelogo} style={customStyles.close} onClick={toggleSidebar} showSideBar={showSidebar} /> */}
                                    </div>
                                    <div style={customPopupDivision.popupinputs}>
                                        <p>Title<span >*</span></p>
                                        {
                                            <div>
                                                <select className='form-control inputwidth' {...register("Title", { required: true })} style={customStyles.inputLabel}>
                                                    <option value="">Select Title</option>
                                                    {
                                                        TitleMasterData.map((data, index) => {
                                                            return (
                                                                <option value={data.id}>{data.short}</option>
                                                            )
                                                        })
                                                    }
                                                </select>
                                                {errors.Title && <span style={customStyles.errorMsg}> Please Enter Title</span>}
                                            </div>
                                        }
                                    </div>

                                    <div style={customPopupDivision.popupinputs}>
                                        <p>First Name<span >*</span></p>
                                        <div>
                                            <input type='text' placeholder='First Name'
                                                {...register("FirstName", { required: true })} className='form-control inputwidth' ></input>
                                            {errors.FirstName && <span style={customStyles.errorMsg}> Please Enter First Name</span>}
                                        </div>
                                    </div>

                                    <div style={customPopupDivision.popupinputs}>
                                        <p>Middle Name<span >*</span></p>
                                        <div>
                                            <input type='text' placeholder='Middle Name'
                                                {...register("MiddleName", { required: true })} className='form-control inputwidth' ></input>
                                            {errors.MiddleName && <span style={customStyles.errorMsg}> Please Enter Middle Name</span>}
                                        </div>
                                    </div>
                                    <div style={customPopupDivision.popupinputs}></div>

                                    <div style={customPopupDivision.popupinputs}>
                                        <p>Last Name<span >*</span></p>
                                        <div>
                                            <input type='text' placeholder='Last Name'
                                                {...register("LastName", { required: true })} className='form-control inputwidth' ></input>
                                            {errors.LastName && <span style={customStyles.errorMsg}> Please Enter Last Name</span>}
                                        </div>
                                    </div>

                                    <div style={customPopupDivision.popupinputs}>
                                        <p>Nick Name<span >*</span></p>
                                        <div>
                                            <input type='text' placeholder='Nick Name'
                                                {...register("NickName", { required: true })} className='form-control inputwidth' ></input>
                                            {errors.NickName && <span style={customStyles.errorMsg}> Please Enter Nick Name</span>}
                                        </div>
                                    </div>

                                    <div style={customPopupDivision.popupinputs}>
                                        <p>Date of Birth<span >*</span></p>
                                        <div>
                                            <input type='date' placeholder='Date of Birth'
                                                {...register("DateOfBirth", { required: true })} className='form-control inputwidth' ></input>
                                            {errors.DateOfBirth && <span style={customStyles.errorMsg}> Please Enter Date of Birth</span>}
                                        </div>
                                    </div>
                                    <div style={customPopupDivision.popupinputs}></div>

                                    <div style={customPopupDivision.popupinputs}>
                                        <p>Place of Birth<span >*</span></p>
                                        <div>
                                            <input type='text' placeholder='Place of Birth'
                                                {...register("PlaceOfBirth", { required: true })} className='form-control inputwidth' ></input>
                                            {errors.PlaceOfBirth && <span style={customStyles.errorMsg}> Please Enter Place of Birth</span>}
                                        </div>
                                    </div>


                                    {
                                        <div style={customPopupDivision.popupinputs}>
                                            <p>Country of Birth<span >*</span></p>
                                            {<div>
                                                <select className='form-control inputwidth' {...register("Country_Of_Birth", { required: true })} style={customStyles.inputLabel}>
                                                    <option value="">Select Country Of Birth</option>
                                                    {
                                                        CountrylistData.map((data, index) => {
                                                            return (
                                                                <option value={data.id}>{data.short}</option>
                                                            )
                                                        })
                                                    }
                                                </select>
                                                {errors.Country_Of_Birth && <span style={customStyles.errorMsg}> Please Enter Country Of Birth</span>}
                                            </div>}
                                        </div>
                                    }


                                    <div style={customPopupDivision.popupinputs}>
                                        <p>Marital Status<span >*</span></p>
                                        {
                                            <div>
                                                <select className='form-control inputwidth' {...register("Title", { required: true })} style={customStyles.inputLabel}>
                                                    <option value="">Select Status</option>
                                                    <option value="Single" selected>Single</option>
                                                    <option value="Married" selected>Married</option>
                                                    <option value="Solo Parent" selected>Solo Parent</option>
                                                </select>
                                                {errors.Title && <span style={customStyles.errorMsg}> Please Enter Title</span>}
                                            </div>
                                        }
                                    </div>

                                    <div style={customPopupDivision.popupinputs}>
                                        <p>Date of Marriage<span >*</span></p>
                                        <div>
                                            <input type='date' placeholder='Date Of Marriage'
                                                {...register("Date_Of_Marriage", { required: true })} className='form-control inputwidth' ></input>
                                            {errors.Date_Of_Marriage && <span style={customStyles.errorMsg}> Please Enter Date Of Marriage</span>}
                                        </div>
                                    </div>


                                    <div style={customPopupDivision.popupinputs}>
                                        <p>Personal Email<span >*</span></p>
                                        <div>
                                            <input type='text' placeholder='Personal Email'
                                                {...register("Personal_Email", { required: true })} className='form-control inputwidth' ></input>
                                            {errors.Personal_Email && <span style={customStyles.errorMsg}> Please Enter Personal Email</span>}
                                        </div>
                                    </div>

                                    <div style={customPopupDivision.popupinputs}>
                                        <p>Mother's Maiden Name<span >*</span></p>
                                        <div>
                                            <input type='text' placeholder='Personal Email'
                                                {...register("MotherMaidenName", { required: true })} className='form-control inputwidth' ></input>
                                            {errors.MotherMaidenName && <span style={customStyles.errorMsg}> Please Enter Mother Maiden Name</span>}
                                        </div>
                                    </div>

                                    <div style={customPopupDivision.popupinputs}>
                                        <p>Father's Name<span >*</span></p>
                                        <div>
                                            <input type='text' placeholder='Father Maiden Name'
                                                {...register("FatherMaidenName", { required: true })} className='form-control inputwidth' ></input>
                                            {errors.FatherMaidenName && <span style={customStyles.errorMsg}> Please Enter Father Maiden Name</span>}
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
                                    <p className='modal-heading'>Ethnicity Information</p>
                                </div>
                                <div style={customPopupDivision.popupcontent}>
                                    {
                                        <div style={customPopupDivision.popupinputs}>
                                            <p>Religion<span >*</span></p>
                                            {<div>
                                                <select className='form-control inputwidth' {...register("Religion", { required: true })} style={customStyles.inputLabel}>
                                                    <option value="">Select Religion</option>
                                                    <option value="Ancient indigenous beliefs (OTHERS)">Ancient indigenous beliefs
                                                        (OTHERS)</option>
                                                    <option value="Apostolic Catholic Church (ACC)">Apostolic Catholic Church (ACC)
                                                    </option>
                                                    <option value="Association of Fundamental Baptists Churches in the Philipppines">
                                                        Association of Fundamental Baptists Churches in the Philipppines</option>
                                                    <option value="Atheism and agnosticism">Atheism and agnosticism</option>
                                                    <option value="Baptist Bible Fellowship in the Philippines (Baptist)">Baptist Bible
                                                        Fellowship in the Philippines (Baptist)</option>
                                                    <option value="Buddism">Buddism</option>
                                                    <option value="Roman Catholic">Roman Catholic</option>
                                                    <option value="Charismatic Renewal and Neocatechumenal Way">Charismatic Renewal and
                                                        Neocatechumenal Way</option>
                                                    <option value="Christ Living Epistel Minstries Inc. (Full Gospel/Pentecostal)">
                                                        Christ Living Epistel Minstries Inc. (Full Gospel/Pentecostal)</option>
                                                    <option value="Christian and Missionary Alliance">Christian and Missionary Alliance
                                                    </option>
                                                    <option value="Christianity">Christianity</option>
                                                    <option value="Church of the Forusquare Gospel in the Philippines (Pentecostal)">
                                                        Church of the Forusquare Gospel in the Philippines (Pentecostal)</option>
                                                    <option value="Conservative Baptist Association of the Philippines (Baptist)">
                                                        Conservative Baptist Association of the Philippines (Baptist)</option>
                                                    <option value="El Shaddai">El Shaddai</option>
                                                    <option value="Episcopal Church in the Philippines (Anglican)">Episcopal Church in
                                                        the Philippines (Anglican)</option>
                                                    <option value="Hinduism">Hinduism</option>
                                                    <option value="Iglesia Filipina Independiente or Aglipayans">Iglesia Filipina
                                                        Independiente or Aglipayans</option>
                                                    <option value="Iglesia ni Christo">Iglesia ni Christo</option>
                                                    <option value="Islam">Islam</option>
                                                    <option value="Jehovah's Witnessess">Jehovah's Witnessess</option>
                                                    <option value="Jesus is Lord Church(Pentecostal)">Jesus is Lord Church(Pentecostal)
                                                    </option>
                                                    <option value="Jesus is The Rock Church (Full Gospel)">Jesus is The Rock Church
                                                        (Full Gospel)</option>
                                                    <option value="Jesus Miracle Crusade (Pentecostal)">Jesus Miracle Crusade
                                                        (Pentecostal)</option>
                                                    <option value="Judaism">Judaism</option>
                                                    <option value="Lutheran Church of Philippines (Lutheran)">Lutheran Church of
                                                        Philippines (Lutheran)</option>
                                                    <option value="Luzon Convention of Southern Baptists (Baptist)">Luzon Convention of
                                                        Southern Baptists (Baptist)</option>
                                                    <option value="Members Church of God International">Members Church of God
                                                        International</option>
                                                    <option value="Mindanao and Visayas Convention of Southern Baptists (Baptist)">
                                                        Mindanao and Visayas Convention of Southern Baptists (Baptist)</option>
                                                    <option value="Most Holy Church of God in Christ Jesus">Most Holy Church of God in
                                                        Christ Jesus</option>
                                                    <option value="Orthodox Church">Orthodox Church</option>
                                                    <option value="Protestantism">Protestantism</option>
                                                    <option value="Restorationist">Restorationist</option>
                                                    <option value="Seventh-day Adventist Church">Seventh-day Adventist Church</option>
                                                    <option value="The Church of Jesus Christ of Latter-day Saints">The Church of Jesus
                                                        Christ of Latter-day Saints</option>
                                                    <option value="The Kingdom of Jesus Christ, the Name Above Every Name">The Kingdom
                                                        of Jesus Christ, the Name Above Every Name</option>
                                                    <option value="The United Methodist Church (Methodist)">The United Methodist Church
                                                        (Methodist)</option>
                                                    <option value="United Church of Christ in the Philippines">United Church of Christ
                                                        in the Philippines</option>
                                                    <option value="Victory Christian Fellowship (Pentecostal)">Victory Christian
                                                        Fellowship (Pentecostal)</option>
                                                    <option value="None">None</option>
                                                    <option value="Others">Others</option>
                                                </select>
                                                {errors.Religion && <span style={customStyles.errorMsg}> Please Enter Religion</span>}
                                            </div>}
                                        </div>
                                    }

                                    <div style={customPopupDivision.popupinputs}>
                                        <p>Citizenship<span >*</span></p>
                                        {
                                            <div>
                                                <select className='form-control inputwidth' {...register("Citizen_Ship", { required: true })} style={customStyles.inputLabel}>
                                                    <option value="">Select Citizenship</option>
                                                    <option value="Afghan">Afghan</option>
                                                    <option value="Albanian">Albanian</option>
                                                    <option value="Algerian">Algerian</option>
                                                    <option value="American">American</option>
                                                    <option value="Australian">Australian</option>
                                                    <option value="Austrian">Austrian</option>
                                                    <option value="British">British</option>
                                                    <option value="Cambodian">Cambodian</option>
                                                    <option value="Canadian">Canadian</option>
                                                    <option value="Chinese">Chinese</option>
                                                    <option value="Colombian">Colombian</option>
                                                    <option value="Dutch">Dutch</option>
                                                    <option value="Egyptian">Egyptian</option>
                                                    <option value="Estonian">Estonian</option>
                                                    <option value="French Citizen">French Citizen</option>
                                                    <option value="Filipino">Filipino</option>
                                                    <option value="Gambian">Gambian</option>
                                                    <option value="Georgian">Georgian</option>
                                                    <option value="German">German</option>
                                                    <option value="Greek">Greek</option>
                                                    <option value="Hungarian">Hungarian</option>
                                                    <option value="Indian">Indian</option>
                                                    <option value="Indonesian">Indonesian</option>
                                                    <option value="Iranian">Iranian</option>
                                                    <option value="Japanese">Japanese</option>
                                                    <option value="Korean">Korean</option>
                                                    <option value="Malaysian">Malaysian</option>
                                                    <option value="New Zealander">Newzealander</option>
                                                    <option value="Pakistani">Pakistani</option>
                                                    <option value="Portuguese">Portuguese</option>
                                                    <option value="Russian">Russian</option>
                                                    <option value="Singaporean">Singaporean</option>
                                                    <option value="Sri Lankan">Srilankan</option>
                                                    <option value="Zambian">Zambian</option>
                                                </select>
                                                {errors.Citizen_Ship && <span style={customStyles.errorMsg}> Please Enter Citizen Ship</span>}
                                            </div>
                                        }
                                    </div>

                                    {
                                        <div style={customPopupDivision.popupinputs}>
                                            <p>Nationality <span >*</span></p>
                                            {<div>
                                                <select className='form-control inputwidth' {...register("Nationality", { required: true })} style={customStyles.inputLabel}>
                                                    <option value="">Select Nationality </option>
                                                    <option value="Afghan">Afghan</option>
                                                    <option value="Albanian">Albanian</option>
                                                    <option value="Algerian">Algerian</option>
                                                    <option value="Australian">Australian</option>
                                                    <option value="Austrian">Austrian</option>
                                                    <option value="British">British</option>
                                                    <option value="Cambodian">Cambodian</option>
                                                    <option value="Canadian">Canadian</option>
                                                    <option value="Chinese">Chinese</option>
                                                    <option value="Colombian">Colombian</option>
                                                    <option value="Dutch">Dutch</option>
                                                    <option value="Egyptian">Egyptian</option>
                                                    <option value="Estonian">Estonian</option>
                                                    <option value="French citizen">French Citizen</option>
                                                    <option value="Filipino">Filipino</option>
                                                    <option value="Gambian">Gambian</option>
                                                    <option value="Georgian">Georgian</option>
                                                    <option value="German">German</option>
                                                    <option value="Greek">Greek</option>
                                                    <option value="Hungarian">Hungarian</option>
                                                    <option value="Indian">Indian</option>
                                                    <option value="Indonesian">Indonesian</option>
                                                    <option value="Iranian">Iranian</option>
                                                    <option value="Irish">Irish</option>
                                                    <option value="Japanese">Japanese</option>
                                                    <option value="Korean">Korean</option>
                                                    <option value="Malaysian">Malaysian</option>
                                                    <option value="New Zealander">New Zealander</option>
                                                    <option value="Pakistani">Pakistani</option>
                                                    <option value="Portuguese">Portuguese</option>
                                                    <option value="Russian">Russian</option>
                                                    <option value="Singaporean">Singaporean</option>
                                                    <option value="Sri Lankan">SriLankan</option>
                                                    <option value="Zambian">Zambian</option>
                                                </select>
                                                {errors.Nationality && <span style={customStyles.errorMsg}> Please Enter Nationality</span>}
                                            </div>}
                                        </div>
                                    }

                                    {
                                        <div style={customPopupDivision.popupinputs}>
                                            <p>Language Spoken<span >*</span></p>
                                            {<div>
                                                <select className='form-control inputwidth' {...register("SpokenLanguage", { required: true })} style={customStyles.inputLabel}>
                                                    <option value="">Select Language Spoken</option>
                                                    {
                                                        LanguagelistData.map((data, index) => {
                                                            return (
                                                                <option value={data.id}>{data.languageName}</option>
                                                            )
                                                        })
                                                    }
                                                </select>
                                                {errors.SpokenLanguage && <span style={customStyles.errorMsg}> Please Enter Spoken Language</span>}
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
                                    <p className='modal-heading'>Health Information</p>
                                </div>
                                <div style={customPopupDivision.popupcontent}>
                                    {
                                        <div style={customPopupDivision.popupinputs}>
                                            <p>Blood Type<span >*</span></p>
                                            {<div>
                                                <select className='form-control inputwidth' {...register("Blood_Group", { required: true })} style={customStyles.inputLabel}>
                                                    <option value="">Select Blood Type</option>

                                                    <option value="O+">O+</option>
                                                    <option value="O-">O-</option>
                                                    <option value="A+">A+</option>
                                                    <option value="A-">A-</option>
                                                    <option value="B+">B+</option>
                                                    <option value="B-">B-</option>
                                                    <option value="AB+">AB+</option>
                                                    <option value="AB-">AB-</option>
                                                    <option value="Not aware">Not aware</option>
                                                </select>
                                                {errors.Blood_Group && <span style={customStyles.errorMsg}> Please Enter Blood Group</span>}
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
                                    <p className='modal-heading'>BMS Details</p>

                                </div>
                                <div style={customPopupDivision.popupcontent}>


                                    <div style={customPopupDivision.popupinputs}>
                                        <p>Original BMS<span >*</span></p>
                                        <div>
                                            <input type='text' placeholder='Original BMS *'
                                                {...register("OriginalBMS", { required: true })} className='form-control inputwidth' ></input>
                                            {errors.OriginalBMS && <span style={customStyles.errorMsg}> Please Enter Original BMS *</span>}
                                        </div>
                                    </div>
                                    <div style={customPopupDivision.popupinputs}>
                                        <p>Effectivity date of Original BMS<span >*</span></p>
                                        <div>
                                            <input type='text' placeholder='Previous Effectivity BMSDate'
                                                {...register("PreviousEffectivityBMSDate", { required: true })} className='form-control inputwidth' ></input>
                                            {errors.PreviousEffectivityBMSDate && <span style={customStyles.errorMsg}> Please Enter Previous Effectivity BMSDate</span>}
                                        </div>
                                    </div>

                                    <div style={customPopupDivision.popupinputs}>
                                        <p>Previous BMS<span >*</span></p>
                                        <div>
                                            <input type='text' placeholder='Previous BMS'
                                                {...register("PreviousBMS", { required: true })} className='form-control inputwidth' ></input>
                                            {errors.PreviousBMS && <span style={customStyles.errorMsg}> Please Enter Previous BMS</span>}
                                        </div>
                                    </div>

                                    <div style={customPopupDivision.popupinputs}>
                                        <p>Effectivity date of Original BMS<span >*</span></p>
                                        <div>
                                            <input type='text' placeholder='CurrentEffectivityBMSDate'
                                                {...register("CurrentEffectivityBMSDate", { required: true })} className='form-control inputwidth' ></input>
                                            {errors.CurrentEffectivityBMSDate && <span style={customStyles.errorMsg}> Please Enter Effectivity date of Original BMS</span>}
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div><br></br>


                    <div className="d-flex justify-content-center w-100 mt-2 mb-2 pr-2">
                        {
                            actionType == "insert" && (
                                <button className='submit-button' >Submit</button>
                            )
                        }
                        {
                            actionType == "update" && (
                                <button className='submit-button' >Update</button>
                            )
                        }
                    </div>
                </div>
            </form>
        </div>
    )
}

export default EmployeeProfile