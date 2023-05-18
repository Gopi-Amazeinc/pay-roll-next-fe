import { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import axios from 'axios';
import Swal from 'sweetalert2';

export default function ContactDetails() {
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
        span:{
            color: 'red'
        }
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
            let res = await axios.post(hostURL + "Payroll/InsertMyAddressDetails", Enity);
            if (res.data && res.status == 200) {
                //  setInsertStatus(true);
                sessionStorage.setItem("InsertStatus", true)
                Swal.fire("Saved Succesfully!");
            }
        }
        else {

        }

    }



    useEffect(() => {
        debugger
        getData()
        getCountryofBirth()

    }, [9]);

    async function getData() {

        debugger
        let hostURL = process.env.NEXT_PUBLIC_API_HOST_URL;

        let res1 = await axios.get(hostURL + "Master/GetCountryType");
        setAddrescountrylistData(res1.data);

        let res2 = await axios.get(hostURL + "/Master/GetStateType")
        setProvincelistData(res2.data);

        let res3 = await axios.get(hostURL + "/Master/GetCityType");
        setCitylistData(res3.data);



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
                                
                                <h6>Employee Address 1</h6>
                                <hr />
                                <div style={customPopupDivision.popupcontent}>
                                    {
                                        <div style={customPopupDivision.popupinputs}>
                                            <p>Address Type 1<span style={customStyles.span}>*</span></p>
                                            {<div>
                                                <select className='form-select'  {...register("AddressType1", { required: true })} style={customStyles.inputLabel}>
                                                    <option value="">Select One</option>
                                                    <option value="Current" >Current</option>
                                                    <option value="Permanent">Permanent</option>

                                                </select>
                                                {errors.AddressType1 && <span style={customStyles.errorMsg}> Please select address type 1 </span>}
                                            </div>}
                                        </div>
                                    }

                                    <div style={customPopupDivision.popupinputs}>
                                        <p>Address line 1<span style={customStyles.span}>*</span></p>
                                        <div>
                                            <textarea type='text' placeholder='Address line 1'
                                                {...register("AddressLine1", { required: true })} className='form-control ' ></textarea>
                                            {errors.AddressLine1 && <span style={customStyles.errorMsg}> Please enter address line 1</span>}
                                        </div>
                                    </div>

                                    <div style={customPopupDivision.popupinputs}>
                                        <p>Address line 2<span style={customStyles.span}>*</span></p>
                                        <div>
                                            <textarea type='text' placeholder='Address line 2 '
                                                {...register("AddressLine2", { required: true })} className='form-control ' ></textarea>
                                            {errors.AddressLine2 && <span style={customStyles.errorMsg}> Please enter address line 2</span>}
                                        </div>
                                    </div>


                                    {
                                        <div style={customPopupDivision.popupinputs}>
                                            <p>Country<span style={customStyles.span}>*</span></p>
                                            {<div>
                                                <select className='form-select ' {...register("CountryID1", { required: true })} style={customStyles.inputLabel}>
                                                    <option value="">Select Country</option>
                                                    {
                                                        adresscountrylistData.map((data) => {
                                                            return (
                                                                <option key={data.id} value={data.id}>{data.short}</option>
                                                            )
                                                        })
                                                    }
                                                </select>
                                                {errors.CountryID1 && <span style={customStyles.errorMsg}> Please select country</span>}
                                            </div>}
                                        </div>
                                    }

                                    {
                                        <div style={customPopupDivision.popupinputs}>
                                            <p>Province<span style={customStyles.span}>*</span></p>
                                            {<div>
                                                <select className='form-select' {...register("ProvinceID1", { required: true })} style={customStyles.inputLabel}>
                                                    <option value="">Select Province</option>
                                                    {
                                                        Provincelist.map((data) => {
                                                            return (
                                                                <option key={data.id} value={data.id}>{data.short}</option>
                                                            )
                                                        })
                                                    }
                                                </select>
                                                {errors.ProvinceID1 && <span style={customStyles.errorMsg}> Please select province</span>}
                                            </div>}
                                        </div>
                                    }


                                    {
                                        <div style={customPopupDivision.popupinputs}>
                                            <p>City <span style={customStyles.span}>*</span></p>
                                            {<div>
                                                <select className='form-select ' {...register("CityID1", { required: true })} style={customStyles.inputLabel}>
                                                    <option value="">Select  City</option>
                                                    {
                                                        Citylist.map((data) => {
                                                            return (
                                                                <option key={data.id} value={data.id}>{data.short}</option>
                                                            )
                                                        })
                                                    }
                                                </select>
                                                {errors.CityID1 && <span style={customStyles.errorMsg}> Please select city</span>}
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
                            <h6>Employee Address 2</h6>
                                <hr />
                                <div style={customPopupDivision.popupcontent}>


                                    {
                                        <div style={customPopupDivision.popupinputs}>
                                            <p>Address Type 2  <span style={customStyles.span}>*</span></p>
                                            {<div>
                                                <select className='form-select ' {...register("AddressType2", { required: true })} style={customStyles.inputLabel}>
                                                    <option value="">Select One</option>
                                                    <option value="Permanent" >Permanent</option>
                                                    <option value="Current" >Current</option>

                                                </select>
                                                {errors.AddressType2 && <span style={customStyles.errorMsg}> Address Type 1 </span>}
                                            </div>}
                                        </div>
                                    }

                                    <div style={customPopupDivision.popupinputs}>
                                        <p>Address line 1<span style={customStyles.span}>*</span></p>
                                        <div>
                                            <textarea type='text' placeholder='Address line 1 '
                                                {...register("AddressLine3", { required: true })} className='form-control ' ></textarea>
                                            {errors.AddressLine3 && <span style={customStyles.errorMsg}> Please enter address line 1</span>}
                                        </div>
                                    </div>

                                    <div style={customPopupDivision.popupinputs}>
                                        <p>Address line 2<span style={customStyles.span}>*</span></p>
                                        <div>
                                            <textarea type='text' placeholder='Address line 2 '
                                                {...register("AddressLine4", { required: true })} className='form-control ' ></textarea>
                                            {errors.AddressLine4 && <span style={customStyles.errorMsg}> Please enter address line 2</span>}
                                        </div>
                                    </div>


                                    {
                                        <div style={customPopupDivision.popupinputs}>
                                            <p>Country<span style={customStyles.span}>*</span></p>
                                            {<div>
                                                <select className='form-select' {...register("CountryID2", { required: true })} style={customStyles.inputLabel}>
                                                    <option value="">Select Country</option>
                                                    {
                                                        CountrylistData.map((data) => {
                                                            return (
                                                                <option key={data.id} value={data.id}>{data.short}</option>
                                                            )
                                                        })
                                                    }
                                                </select>
                                                {errors.CountryID2 && <span style={customStyles.errorMsg}>Please select country</span>}
                                            </div>}
                                        </div>
                                    }

                                    {
                                        <div style={customPopupDivision.popupinputs}>
                                            <p>Province<span style={customStyles.span}>*</span></p>
                                            {<div>
                                                <select className='form-select ' {...register("ProvinceID2", { required: true })} style={customStyles.inputLabel}>
                                                    <option value="">Select Province</option>
                                                    {
                                                        Provincelist.map((data) => {
                                                            return (
                                                                <option key={data.id} value={data.id}>{data.short}</option>
                                                            )
                                                        })
                                                    }
                                                </select>
                                                {errors.ProvinceID2 && <span style={customStyles.errorMsg}> Please select province</span>}
                                            </div>}
                                        </div>
                                    }


                                    {
                                        <div style={customPopupDivision.popupinputs}>
                                            <p>City <span style={customStyles.span}>*</span></p>
                                            {<div>
                                                <select className='form-select ' {...register("CityID2", { required: true })} style={customStyles.inputLabel}>
                                                    <option value="">Select City</option>
                                                    {
                                                        Citylist.map((data) => {
                                                            return (
                                                                <option key={data.id} value={data.id}>{data.short}</option>
                                                            )
                                                        })
                                                    }
                                                </select>
                                                {errors.CityID2 && <span style={customStyles.errorMsg}> Please select city</span>}
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
                                <h6>Emergency Contact 1</h6>
                                <hr />
                                <div style={customPopupDivision.popupcontent}>


                                    <div style={customPopupDivision.popupinputs}>
                                        <p>Emergency Contact Name 1<span style={customStyles.span} >*</span></p>
                                        <div>
                                            <input type='text' placeholder='First Name, Middle Initial and Last Name '
                                                {...register("EmergencyContactName1", { required: true })} className='form-control ' ></input>
                                            {errors.EmergencyContactName1 && <span style={customStyles.errorMsg}> Please enter emergency contact name 1</span>}
                                        </div>
                                    </div>
                                    <div style={customPopupDivision.popupinputs}>
                                        <p>Contact Relationship<span style={customStyles.span} >*</span></p>
                                        <div>
                                            <input type='text' placeholder='Contact Relationship'
                                                {...register("EmergencyContactRelationship1", { required: true })} className='form-control ' ></input>
                                            {errors.EmergencyContactRelationship1 && <span style={customStyles.errorMsg}> Please enter conatct relatioship</span>}
                                        </div>
                                    </div>


                                    <div style={customPopupDivision.popupinputs}>
                                        <p>Contact Mobile Number<span style={customStyles.span} >*</span></p>
                                        <div>
                                            <input type='text' placeholder='+63 9xx xxx xxxxx '
                                                {...register("EmergencyContactMobileNumber1", { required: true })} className='form-control ' ></input>
                                            {errors.EmergencyContactMobileNumber1 && <span style={customStyles.errorMsg}> Please enter contact mobile number</span>}
                                        </div>
                                    </div>

                                    <div style={customPopupDivision.popupinputs}>
                                        <p>Contact Address<span style={customStyles.span} >*</span></p>
                                        <div>
                                            <textarea type='text' placeholder='Contact Address'
                                                {...register("EmergencyContactAddress1", { required: true })} className='form-control ' ></textarea>
                                            {errors.EmergencyContactAddress1 && <span style={customStyles.errorMsg}> Please enter contact address</span>}
                                        </div>
                                    </div>

                                    <div style={customPopupDivision.popupinputs}>
                                        <p>Contact Email ID<span style={customStyles.span} >*</span></p>
                                        <div>
                                            <input type='text' placeholder='Email Address '
                                                {...register("EmergencyContactEmailID1", { required: true })} className='form-control ' ></input>
                                            {errors.EmergencyContactEmailID1 && <span style={customStyles.errorMsg}> Please enter contact email ID</span>}
                                        </div>
                                    </div>

                                    <div style={customPopupDivision.popupinputs}>
                                        <p>Landline<span style={customStyles.span} >*</span></p>
                                        <div>
                                            <input type='text' placeholder='Landline '
                                                {...register("EmergencyContactLandLineNumber1", { required: true })} className='form-control ' ></input>
                                            {errors.EmergencyContactLandLineNumber1 && <span style={customStyles.errorMsg}> Please enter landline number</span>}
                                        </div>
                                    </div>



                                </div>
                            </div>
                        </div>
                    </div><br></br>


                    <div className='card'>
                        <div className='row'>
                            <div className='col-12'>
                            <h6>Emergency Contact 2</h6>
                                <hr />
                                <div style={customPopupDivision.popupcontent}>


                                    <div style={customPopupDivision.popupinputs}>
                                        <p>Emergency Contact Name 2<span style={customStyles.span}>*</span></p>
                                        <div>
                                            <input type='text' placeholder='First Name, Middle Initial and Last Name'
                                                {...register("EmergencyContactName2", { required: true })} className='form-control ' ></input>
                                            {errors.EmergencyContactName2 && <span style={customStyles.errorMsg}> Please enter emergency contact name 2</span>}
                                        </div>
                                    </div>
                                    <div style={customPopupDivision.popupinputs}>
                                        <p>Contact Relationship<span style={customStyles.span}>*</span></p>
                                        <div>
                                            <input type='text' placeholder='Contact Relationship'
                                                {...register("EmergencyContactRelationship2", { required: true })} className='form-control ' ></input>
                                            {errors.EmergencyContactRelationship2 && <span style={customStyles.errorMsg}> Please enter contact relatioship</span>}
                                        </div>
                                    </div>


                                    <div style={customPopupDivision.popupinputs}>
                                        <p>Contact Mobile Number<span style={customStyles.span}>*</span></p>
                                        <div>
                                            <input type='text' placeholder='+63 9xx xxx xxxxx '
                                                {...register("EmergencyContactMobileNumber2", { required: true })} className='form-control ' ></input>
                                            {errors.EmergencyContactMobileNumber2 && <span style={customStyles.errorMsg}> Please enter contact mobile number</span>}
                                        </div>
                                    </div>

                                    <div style={customPopupDivision.popupinputs}>
                                        <p>Contact Address<span style={customStyles.span}>*</span></p>
                                        <div>
                                            <textarea type='text' placeholder='Contact Address'
                                                {...register("EmergencyContactAddress2", { required: true })} className='form-control ' ></textarea>
                                            {errors.EmergencyContactAddress2 && <span style={customStyles.errorMsg}> Please enter contact address</span>}
                                        </div>
                                    </div>

                                    <div style={customPopupDivision.popupinputs}>
                                        <p>Contact Email ID<span style={customStyles.span}>*</span></p>
                                        <div>
                                            <input type='text' placeholder='Contact Email ID'
                                                {...register("EmergencyContactEmailID2", { required: true })} className='form-control ' ></input>
                                            {errors.EmergencyContactEmailID2 && <span style={customStyles.errorMsg}> Please enter contact email ID</span>}
                                        </div>
                                    </div>


                                    <div style={customPopupDivision.popupinputs}>
                                        <p>Landline<span style={customStyles.span}>*</span></p>
                                        <div>   
                                            <input type='text' placeholder='Landline'
                                                {...register("EmergencyContactLandLineNumber2", { required: true })} className='form-control ' ></input>
                                            {errors.EmergencyContactLandLineNumber2 && <span style={customStyles.errorMsg}> Please enter landline number</span>}
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div><br></br>


                    <div className="d-flex justify-content-center w-100 mt-2 mb-2 pr-2">
                        <button className='staffSubmitBtn'>Submit</button>
                    </div>
                </div>
            </form>
        </div>
    )
}