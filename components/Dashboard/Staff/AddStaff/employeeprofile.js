import React from 'react'
import { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import { useDropzone } from 'react-dropzone'
import axios from 'axios';

function EmployeeProfile() {


    const hostURL = process.env.NEXT_PUBLIC_API_HOST_URL;
    useEffect(() => {
        debugger
        getData();
    }, [1]);
    const getData = async () => {
        let GetTitleMaster = await axios.get(hostURL + "Master/GetTitleMaster");
        // setTitleMaster(GetTitleMaster.data);
        let GetCountryType = await axios.get(hostURL + "Master/GetCountryType");
        // setCountrylistData(GetCountryType.data);
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
        <div>
            <div className='container'>

                <div className='card mt-4 shadow-lg border-0'>
                    <div className='row mt-2 p-2'>
                        <div className='col-lg-12'>
                            <p>My Information</p>
                            <hr />
                        </div>

                        <div className='col-lg-3'></div>
                        <div className='col-lg-2'>
                            <div className='mb-3'>
                                <span>Title</span><p></p>
                                <select className='form-select'>
                                    <option>Select title</option>
                                </select>
                            </div>

                            <div className='mb-3'>
                                <span>Nick Name</span><p></p>
                                <input type="text" className='form-control' placeholder='Nick Name' />
                            </div>

                            <div className='mb-3'>
                                <span>Gender</span><p></p>
                                <select className='form-select'>
                                    <option>Select Gender</option>
                                </select>
                            </div>

                            <div className='mb-3'>
                                <span>Father Name</span><p></p>
                                <input type="text" className='form-control' placeholder='Father Name' />
                            </div>

                            <div className='mb-3'>
                                <span>Personal Email <i className='text-danger'>*</i></span><p></p>
                                <input type="email" className='form-control' placeholder='Personal Email' />
                            </div>
                        </div>

                        <div className='col-lg-2'>
                            <div className='mb-3'>
                                <span>First Name <i className='text-danger'>*</i></span><p></p>
                                <input type="text" className='form-control' placeholder='First Name' />
                            </div>

                            <div className='mb-3'>
                                <span>Date Of Birth <i className='text-danger'>*</i></span><p></p>
                                <input type="date" className='form-control' />
                            </div>

                            <div className='mb-3'>
                                <span>Maritial Status <i className='text-danger'>*</i></span><p></p>
                                <select className='form-select'>
                                    <option>Select Status</option>
                                </select>
                            </div>

                            {/* <div className='mb-3 Dropzone' {...getRootProps()}>
                                <input {...getInputProps()} />
                                {
                                    isDragActive ?
                                        <p>Drop the files here ...</p> :
                                        <p>Drop files here Only JPG,PNG,JPEG</p>
                                }
                            </div> */}
                        </div>

                        <div className='col-lg-2'>
                            <div className='mb-3'>
                                <span>Middle Name</span><p></p>
                                <input type="text" className='form-control' placeholder='Middle Name' />
                            </div>

                            <div className='mb-3'>
                                <span>Place of Birth</span><p></p>
                                <input type="text" className='form-control' placeholder='Place of Birth' />
                            </div>
                        </div>

                        <div className='col-lg-2'>
                            <div className='mb-3'>
                                <span>Last Name <i className='text-danger'>*</i></span><p></p>
                                <input type="text" className='form-control' placeholder='Last Name' />
                            </div>

                            <div className='mb-3'>
                                <span>Country of Birth</span><p></p>
                                <select className='form-select'>
                                    <option>Select Country</option>
                                </select>
                            </div>

                            <div className='mb-3'>
                                <span>Mother Name</span><p></p>
                                <input type="text" className='form-control' placeholder='Mother Name' />
                            </div>

                            <div className='mb-3'>
                                <span>Personal Contact Number <i className='text-danger'>*</i></span><p></p>
                                <input type="number" className='form-control' placeholder='Personal Contact Number' />
                            </div>
                        </div>
                    </div>
                </div>

                <div className='card mt-4 shadow-lg border-0'>
                    <div className='row mt-2 p-2'>
                        <div className='col-lg-12'>
                            <p>Ethnicity Information</p>
                            <hr />
                        </div>

                        <div className='col-lg-2'>
                            <div className='mb-3'>
                                <span>Religion</span><p></p>
                                <select className='form-select'>
                                    <option>Select Religion</option>
                                </select>
                            </div>
                        </div>

                        <div className='col-lg-2'>
                            <div className='mb-3'>
                                <span>Citizenship</span><p></p>
                                <input type="text" className='form-control' placeholder='Citizenship' />
                            </div>
                        </div>

                        <div className='col-lg-2'>
                            <div className='mb-3'>
                                <span>Nationality <i className='text-danger'>*</i></span><p></p>
                                <input type="text" className='form-control' placeholder='Nationality' />
                            </div>
                        </div>

                        <div className='col-lg-2'>
                            <div className='mb-3'>
                                <span>Language Spoken</span><p></p>
                                <select className='form-select'>
                                    <option>Select Language</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='card mt-4 shadow-lg border-0'>
                    <div className='row mt-2 p-2'>
                        <div className='col-lg-12'>
                            <p>Health Information</p>
                            <hr />
                        </div>

                        <div className='col-lg-2'>
                            <div className='mb-3'>
                                <span>Blood Type <i className='text-danger'>*</i></span><p></p>
                                <select className='form-select'>
                                    <option>Select Blood Type</option>
                                </select>
                            </div>
                        </div>

                        <div className='col-lg-2'>
                            <div className='mb-3 form-check form-switch'>
                                <span>Is Disable</span><br /><p></p>
                                <input type="checkbox" className='form-check-input ms-3' />
                            </div>
                        </div>

                        <div className='col-lg-2'>
                            <div className='mb-3'>
                                <span>Please Specify <i className='text-danger'>*</i></span><p></p>
                                <input type="text" className='form-control' placeholder='Please Specify' />
                            </div>
                        </div>
                    </div>
                </div>

                <div className='card mt-4 shadow-lg border-0'>
                    <div className='row mt-2 p-2'>
                        <div className='col-lg-12'>
                            <p>Ethnicity Information</p>
                            <hr />
                        </div>

                        <div className='col-lg-2'>
                            <div className='mb-3'>
                                <span>Orginlal BMS <i className='text-danger'>*</i></span><p></p>
                                <input type="text" className='form-control' placeholder='Orginlal BMS' />
                            </div>
                        </div>

                        <div className='col-lg-3'>
                            <div className='mb-3'>
                                <span>Effective date of Orginlal BMS <i className='text-danger'>*</i></span><p></p>
                                <input type="date" className='form-control' />
                            </div>
                        </div>

                        <div className='col-lg-2'>
                            <div className='mb-3'>
                                <span>Previous BMS <i className='text-danger'>*</i></span><p></p>
                                <input type="text" className='form-control' placeholder='Previous BMS' />
                            </div>
                        </div>

                        <div className='col-lg-3'>
                            <div className='mb-3'>
                                <span>Effective date of Previous BMS <i className='text-danger'>*</i></span><p></p>
                                <input type="date" className='form-control' />
                            </div>
                        </div>
                        <div className='col-lg-4'></div>
                        <div className='mt-3 mb-3 col-lg-3'>
                            <button className='btn btn-primary' id='AddButton'>Submit</button>
                        </div>
                        <div className='col-lg-5'></div>

                        <div className='col-lg-9'></div>
                        {/* <div className='col-lg-3'>
                            <div className='btn-group mb-3 mt-2 ms-5'>
                                <button className='btn btn-secondary'>Previous</button>
                                <button className='btn btn-primary'>Next</button>
                            </div>
                        </div> */}
                    </div>
                </div>


            </div>
        </div>

    )
}

export default EmployeeProfile