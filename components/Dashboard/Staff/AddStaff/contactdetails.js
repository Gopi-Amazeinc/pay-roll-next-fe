import React from 'react'
import { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import Swal from 'sweetalert2';
import axios from 'axios';


function ContactDetails() {


    useEffect(() => {
        debugger
        getData()
       getCountryofBirth();
       console.log("gsafsafsgafsgafsgfasgafgsfagsfagfsgafsgafsgafsgafsgafgsfasgf")

    }, [1]); 
    async function getData() {

        debugger
        let hostURL = process.env.NEXT_PUBLIC_API_HOST_URL;

        let res1 = await axios.get(hostURL + "/Master/GetCountryType");
        setAddrescountrylistData(res1.data);

        let res2 = await axios.get(hostURL + "/HR/GetStateType")
        setProvincelistData(res2.data);

        let res3 = await axios.get(hostURL + "/Master/GetCityType");
        setCitylistData(res3.data);

    }
    const [CountrylistData, setCountrylistData] = useState([]);
    const [Provincelist, setProvincelistData] = useState([]);
    const [Citylist, setCitylistData] = useState([]);
    const [adresscountrylistData, setAddrescountrylistData] = useState([]);

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

                AddressType1: data.AddressType1,
                AddressLine1: data.AddressLine1,
                AddressLine2: data.AddressLine2,
                CountryID1: data.CountryID1,
                ProvinceID1: data.ProvinceID1,
                CityID1: data.CityID1,
                AddressType2: data.AddressType2,
                AddressLine3: data.AddressLine3,
                AddressLine4: data.AddressLine4,
                CountryID2: data.CountryID2,
                ProvinceID2: data.ProvinceID2,
                CityID2: data.CityID2,
                EmergencyContactName1: data.EmergencyContactName1,
                EmergencyContactRelationship1: data.EmergencyContactRelationship1,
                EmergencyContactMobileNumber1: data.EmergencyContactMobileNumber1,
                EmergencyContactAddress1: data.EmergencyContactAddress1,
                EmergencyContactEmailID1: data.EmergencyContactEmailID1,
                EmergencyContactLandLineNumber1: data.EmergencyContactLandLineNumber1,
                EmergencyContactName2: data.EmergencyContactName2,
                EmergencyContactRelationship2: data.EmergencyContactRelationship2,
                EmergencyContactMobileNumber2: data.EmergencyContactMobileNumber2,
                EmergencyContactAddress2: data.EmergencyContactAddress2,
                EmergencyContactEmailID2: data.EmergencyContactEmailID2,
                EmergencyContactLandLineNumber2: data.EmergencyContactLandLineNumber2,
                StaffID: sessionStorage.getItem('userID')

            }
            let res = await axios.post(hostURL + "/HR/InsertMyAddressDetails", Enity);
            if (res.data && res.status == 200) {
                //  setInsertStatus(true);
                sessionStorage.setItem("InsertStatus", true)
                Swal.fire("Saved Succesfully!");
            }
        }
        else {

        }

    }
    async function getCountryofBirth() {
        debugger
        let hostURL = process.env.NEXT_PUBLIC_API_HOST_URL;
        let res = await axios.get(hostURL + "/Master/GetCountryType");
        setCountrylistData(res.data);
    }
    return (
        <div style={customStyles}>
            <form onSubmit={handleSubmit(onSubmit)} >
                <div className='container-fluid'>
                    <div className='card'>
                        <div className='row'>
                            <div className='col-12'>
                                <div className="d-flex justify-content-between">
                                    <p className='modal-heading'>Employee Address 1</p>
                                </div>
                                <div style={customPopupDivision.popupcontent}>
                                    {
                                        <div style={customPopupDivision.popupinputs}>
                                            <p>Address Type 1  <span >*</span></p>
                                            {<div>
                                                <select className='form-control inputwidth'  {...register("AddressType1", { required: true })} style={customStyles.inputLabel}>
                                                    <option value="">Select One</option>
                                                    <option value="Current" >Current</option>
                                                    <option value="Permanennt">Permanennt</option>

                                                </select>
                                                {errors.AddressType1 && <span style={customStyles.errorMsg}> Address Type 1 </span>}
                                            </div>}
                                        </div>
                                    }

                                    <div style={customPopupDivision.popupinputs}>
                                        <p>Address line 1<span >*</span></p>
                                        <div>
                                            <textarea type='text' placeholder='Address line 1 '
                                                {...register("AddressLine1", { required: true })} className='form-control inputwidth' ></textarea>
                                            {errors.AddressLine1 && <span style={customStyles.errorMsg}> Please Employee ID *</span>}
                                        </div>
                                    </div>

                                    <div style={customPopupDivision.popupinputs}>
                                        <p>Address line 2<span >*</span></p>
                                        <div>
                                            <textarea type='text' placeholder='Address line 2 '
                                                {...register("AddressLine2", { required: true })} className='form-control inputwidth' ></textarea>
                                            {errors.AddressLine2 && <span style={customStyles.errorMsg}> Please Employee ID *</span>}
                                        </div>
                                    </div>


                                    {
                                        <div style={customPopupDivision.popupinputs}>
                                            <p>Country<span >*</span></p>
                                            {<div>
                                                <select className='form-control inputwidth' {...register("CountryID1", { required: true })} style={customStyles.inputLabel}>
                                                    <option value="">Select Country</option>
                                                    {
                                                        adresscountrylistData.map((data, index) => {
                                                            return (
                                                                <option value={data.id}>{data.short}</option>
                                                            )
                                                        })
                                                    }
                                                </select>
                                                {errors.CountryID1 && <span style={customStyles.errorMsg}> Select Department</span>}
                                            </div>}
                                        </div>
                                    }

                                    {
                                        <div style={customPopupDivision.popupinputs}>
                                            <p>Province<span >*</span></p>
                                            {<div>
                                                <select className='form-control inputwidth' {...register("ProvinceID1", { required: true })} style={customStyles.inputLabel}>
                                                    <option value="">Select Province</option>
                                                    {
                                                        Provincelist.map((data, index) => {
                                                            return (
                                                                <option value={data.id}>{data.short}</option>
                                                            )
                                                        })
                                                    }
                                                </select>
                                                {errors.ProvinceID1 && <span style={customStyles.errorMsg}> Select Section</span>}
                                            </div>}
                                        </div>
                                    }


                                    {
                                        <div style={customPopupDivision.popupinputs}>
                                            <p>City <span >*</span></p>
                                            {<div>
                                                <select className='form-control inputwidth' {...register("CityID1", { required: true })} style={customStyles.inputLabel}>
                                                    <option value="">Select  City</option>
                                                    {
                                                        Citylist.map((data, index) => {
                                                            return (
                                                                <option value={data.id}>{data.short}</option>
                                                            )
                                                        })
                                                    }
                                                </select>
                                                {errors.CityID1 && <span style={customStyles.errorMsg}> Select ImmediateManager</span>}
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
                                    <p className='modal-heading'>Employee Address 2</p>
                                </div>
                                <div style={customPopupDivision.popupcontent}>


                                    {
                                        <div style={customPopupDivision.popupinputs}>
                                            <p>Address Type 2  <span >*</span></p>
                                            {<div>
                                                <select className='form-control inputwidth' {...register("AddressType2", { required: true })} style={customStyles.inputLabel}>
                                                    <option value="">Select One</option>
                                                    <option value="Permanent" >Permanent</option>
                                                    <option value="Current" >Current</option>

                                                </select>
                                                {errors.AddressType2 && <span style={customStyles.errorMsg}> Address Type 1 </span>}
                                            </div>}
                                        </div>
                                    }

                                    <div style={customPopupDivision.popupinputs}>
                                        <p>Address line 1<span >*</span></p>
                                        <div>
                                            <textarea type='text' placeholder='Address line 1 '
                                                {...register("AddressLine3", { required: true })} className='form-control inputwidth' ></textarea>
                                            {errors.AddressLine3 && <span style={customStyles.errorMsg}> Please Employee ID *</span>}
                                        </div>
                                    </div>

                                    <div style={customPopupDivision.popupinputs}>
                                        <p>Address line 2<span >*</span></p>
                                        <div>
                                            <textarea type='text' placeholder='Address line 2 '
                                                {...register("AddressLine4", { required: true })} className='form-control inputwidth' ></textarea>
                                            {errors.AddressLine4 && <span style={customStyles.errorMsg}> Please Employee ID *</span>}
                                        </div>
                                    </div>


                                    {
                                        <div style={customPopupDivision.popupinputs}>
                                            <p>Country<span >*</span></p>
                                            {<div>
                                                <select className='form-control inputwidth' {...register("CountryID2", { required: true })} style={customStyles.inputLabel}>
                                                    <option value="">Select Country</option>
                                                    {
                                                        CountrylistData.map((data, index) => {
                                                            return (
                                                                <option value={data.id}>{data.short}</option>
                                                            )
                                                        })
                                                    }
                                                </select>
                                                {errors.CountryID2 && <span style={customStyles.errorMsg}> Select Department</span>}
                                            </div>}
                                        </div>
                                    }

                                    {
                                        <div style={customPopupDivision.popupinputs}>
                                            <p>Province<span >*</span></p>
                                            {<div>
                                                <select className='form-control inputwidth' {...register("ProvinceID2", { required: true })} style={customStyles.inputLabel}>
                                                    <option value="">Select Province</option>
                                                    {
                                                        Provincelist.map((data, index) => {
                                                            return (
                                                                <option value={data.id}>{data.short}</option>
                                                            )
                                                        })
                                                    }
                                                </select>
                                                {errors.ProvinceID2 && <span style={customStyles.errorMsg}> Select Section</span>}
                                            </div>}
                                        </div>
                                    }


                                    {
                                        <div style={customPopupDivision.popupinputs}>
                                            <p>City <span >*</span></p>
                                            {<div>
                                                <select className='form-control inputwidth' {...register("CityID2", { required: true })} style={customStyles.inputLabel}>
                                                    <option value="">Select  City</option>
                                                    {
                                                        Citylist.map((data, index) => {
                                                            return (
                                                                <option value={data.id}>{data.short}</option>
                                                            )
                                                        })
                                                    }
                                                </select>
                                                {errors.CityID2 && <span style={customStyles.errorMsg}> Select ImmediateManager</span>}
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
                                    <p className='modal-heading'>Emergency Contact 1</p>
                                </div>
                                <div style={customPopupDivision.popupcontent}>


                                    <div style={customPopupDivision.popupinputs}>
                                        <p>Emergency Contact Name 1<span >*</span></p>
                                        <div>
                                            <input type='text' placeholder='First Name, Middle Initial and Last Name '
                                                {...register("EmergencyContactName1", { required: true })} className='form-control inputwidth' ></input>
                                            {errors.EmergencyContactName1 && <span style={customStyles.errorMsg}> Please Employee ID *</span>}
                                        </div>
                                    </div>
                                    <div style={customPopupDivision.popupinputs}>
                                        <p>Contact Relationship<span >*</span></p>
                                        <div>
                                            <input type='text' placeholder='Contact Relationship'
                                                {...register("EmergencyContactRelationship1", { required: true })} className='form-control inputwidth' ></input>
                                            {errors.EmergencyContactRelationship1 && <span style={customStyles.errorMsg}> Please Employee ID *</span>}
                                        </div>
                                    </div>


                                    <div style={customPopupDivision.popupinputs}>
                                        <p>Contact Mobile Number<span >*</span></p>
                                        <div>
                                            <input type='text' placeholder='+63 9xx xxx xxxxx '
                                                {...register("EmergencyContactMobileNumber1", { required: true })} className='form-control inputwidth' ></input>
                                            {errors.EmergencyContactMobileNumber1 && <span style={customStyles.errorMsg}> Please Employee ID *</span>}
                                        </div>
                                    </div>

                                    <div style={customPopupDivision.popupinputs}>
                                        <p>Contact Address<span >*</span></p>
                                        <div>
                                            <textarea type='text' placeholder=''
                                                {...register("EmergencyContactAddress1", { required: true })} className='form-control inputwidth' ></textarea>
                                            {errors.EmergencyContactAddress1 && <span style={customStyles.errorMsg}> Please Employee ID *</span>}
                                        </div>
                                    </div>

                                    <div style={customPopupDivision.popupinputs}>
                                        <p>Contact Email Address<span >*</span></p>
                                        <div>
                                            <input type='text' placeholder='Email Address '
                                                {...register("EmergencyContactEmailID1", { required: true })} className='form-control inputwidth' ></input>
                                            {errors.EmergencyContactEmailID1 && <span style={customStyles.errorMsg}> Please Employee ID *</span>}
                                        </div>
                                    </div>

                                    <div style={customPopupDivision.popupinputs}>
                                        <p>Landline<span >*</span></p>
                                        <div>
                                            <input type='text' placeholder='Landline '
                                                {...register("EmergencyContactLandLineNumber1", { required: true })} className='form-control inputwidth' ></input>
                                            {errors.EmergencyContactLandLineNumber1 && <span style={customStyles.errorMsg}> Please Employee ID *</span>}
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
                                    <p className='modal-heading'>Emergency Contact 2</p>
                                </div>
                                <div style={customPopupDivision.popupcontent}>


                                    <div style={customPopupDivision.popupinputs}>
                                        <p>Emergency Contact Name 2<span >*</span></p>
                                        <div>
                                            <input type='text' placeholder='First Name, Middle Initial and Last Name'
                                                {...register("EmergencyContactName2", { required: true })} className='form-control inputwidth' ></input>
                                            {errors.EmergencyContactName2 && <span style={customStyles.errorMsg}> Please Employee ID *</span>}
                                        </div>
                                    </div>
                                    <div style={customPopupDivision.popupinputs}>
                                        <p>Contact Relationship<span >*</span></p>
                                        <div>
                                            <input type='text' placeholder='Contact Relationship'
                                                {...register("EmergencyContactRelationship2", { required: true })} className='form-control inputwidth' ></input>
                                            {errors.EmergencyContactRelationship2 && <span style={customStyles.errorMsg}> Please Employee ID *</span>}
                                        </div>
                                    </div>


                                    <div style={customPopupDivision.popupinputs}>
                                        <p>Contact Mobile Number<span >*</span></p>
                                        <div>
                                            <input type='text' placeholder='+63 9xx xxx xxxxx '
                                                {...register("EmergencyContactMobileNumber2", { required: true })} className='form-control inputwidth' ></input>
                                            {errors.EmergencyContactMobileNumber2 && <span style={customStyles.errorMsg}> Please Employee ID *</span>}
                                        </div>
                                    </div>

                                    <div style={customPopupDivision.popupinputs}>
                                        <p>Contact Address<span >*</span></p>
                                        <div>
                                            <textarea type='text' placeholder='Contact Address'
                                                {...register("EmergencyContactAddress2", { required: true })} className='form-control inputwidth' ></textarea>
                                            {errors.EmergencyContactAddress2 && <span style={customStyles.errorMsg}> Please Employee ID *</span>}
                                        </div>
                                    </div>

                                    <div style={customPopupDivision.popupinputs}>
                                        <p>Contact Email Address<span >*</span></p>
                                        <div>
                                            <input type='text' placeholder=' Email Address'
                                                {...register("EmergencyContactEmailID2", { required: true })} className='form-control inputwidth' ></input>
                                            {errors.EmergencyContactEmailID2 && <span style={customStyles.errorMsg}> Please Employee ID *</span>}
                                        </div>
                                    </div>


                                    <div style={customPopupDivision.popupinputs}>
                                        <p>Landline<span >*</span></p>
                                        <div>
                                            <input type='text' placeholder='Landline'
                                                {...register("EmergencyContactLandLineNumber2", { required: true })} className='form-control inputwidth' ></input>
                                            {errors.EmergencyContactLandLineNumber2 && <span style={customStyles.errorMsg}> Please Employee ID *</span>}
                                        </div>
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
        </div>
    )
}

export default ContactDetails