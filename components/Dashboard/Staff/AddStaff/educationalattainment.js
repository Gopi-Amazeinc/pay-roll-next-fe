import { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import axios from 'axios';
import Swal from 'sweetalert2';
// import Dropzone from '../../SharedComponent/dropzone'

export default function EducationDetails() {

    const [EducationDetals, setEducationData] = useState([]);
    const [LicenseOrCertificationMaster, setLicenseOrCertificationMaster] = useState([]);
    const [EducationAttainmentlist, setEducationAttainmentlistData] = useState([]);
    const [CourseDetails, setCourseDetailsData] = useState([]);
    const [MajorDetails, setMajorDetailsData] = useState([]);
    const [Countrylist, setCountryData] = useState([]);
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
            width: '48%',
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
            let Entity = {
                EducationTypeID: data.EducationTypeID,
                CourseID: data.CourseID,
                MajorID: data.MajorID,
                InstitutionName: data.InstitutionName,
                LicenseOrCertificationID: data.LicenseOrCertificationID,
                CountryID: data.CountryID,
                StartDate: data.StartDate,
                EndDate: data.EndDate,
                AttachmentEdu: "No Image",
                StaffID: sessionStorage.getItem('userID')
            }
            await axios.post(hostURL + "Master/InsertEducationDetails", Entity);
            Swal.fire("Added Successfully!")
            cleardata();
            getData();
        }
        else{
            let Entity = {
                ID: data.ID,
                EducationTypeID: data.EducationTypeID,
                CourseID: data.CourseID,
                MajorID: data.MajorID,
                InstitutionName: data.InstitutionName,
                LicenseOrCertificationID: data.LicenseOrCertificationID,
                CountryID: data.CountryID,
                StartDate: data.StartDate,
                EndDate: data.EndDate,
                AttachmentEdu: "No Image",
                StaffID: sessionStorage.getItem('userID')
            }

            await axios.post(hostURL + "HR/UpdateEducationDetails", Entity);
            Swal.fire("Updated Successfully!")
            getData();
        }
    }


    function cleardata(existingData = null) {
        debugger
        let etty = {
            ID : existingData ? existingData.id : "",
            EducationTypeID: existingData ? existingData.educationTypeID : "",
            CourseID: existingData ? existingData.courseID : "",
            MajorID: existingData ? existingData.majorID : "",
            InstitutionName: existingData ? existingData.institutionName : "",
            LicenseOrCertificationID: existingData ? existingData.licenseOrCertificationID : "",
            CountryID: existingData ? existingData.countryID : "",
            StartDate: existingData ? existingData.startDate : "",
            EndDate: existingData ? existingData.endDate : "",
            AttachmentEdu: "No Image",
            StaffID: sessionStorage.getItem('userID')
        }
        reset(etty);
        setActionType(existingData ? "update" : 'insert');
    }



    useEffect(() => {
        getData();
    }, [1]);

    async function getData() {
        let hostURL = process.env.NEXT_PUBLIC_API_HOST_URL;

        let res = await axios.get(hostURL + "/Master/GetEducationTypeMaster");
        setEducationAttainmentlistData(res.data);

        let res3 = await axios.get(hostURL + "/HR/GetEducationDetails");
        setEducationData(res3.data);

        let res2 = await axios.get(hostURL + "/Master/GetCountryType");
        setCountryData(res2.data);

        let res1 = await axios.get(hostURL + "/Master/GetLicenseOrCertificationMaster");
        setLicenseOrCertificationMaster(res1.data);

    }


    async function editData(data) {
        debugger;
        let hostURL = process.env.NEXT_PUBLIC_API_HOST_URL;
        let res = await axios.get(hostURL + "HR/GetEducationDetailsByID?ID=" + data);
        cleardata(res.data[0]);

    }

    async function deleteData(data) {
        let hostURL = process.env.NEXT_PUBLIC_API_HOST_URL;
        let res = await axios.get(hostURL + "Shared/DeleteIDDetails?ID=" + data);
        getData();

    }




    async function getType(data) {
        debugger
        let hostURL = process.env.NEXT_PUBLIC_API_HOST_URL;
        let courseresult = await axios.get(hostURL + "/Master/GetCourseMaster");
        courseresult.data.filter(x => x.educationAttainmentID == data.target.value)
        setCourseDetailsData(courseresult.data);
    }

    async function getMajorType(data) {
        debugger
        let hostURL = process.env.NEXT_PUBLIC_API_HOST_URL;
        let majorresult = await axios.get(hostURL + "/Master/GetMajorMaster");
        majorresult.data.filter(x => x.courseID == data.target.value)
        setMajorDetailsData(majorresult.data);
    }

    return (
        <div>
            <div className='container-fluid'>
                <div className='card'>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className='row'>
                            <div className='col-12'>
                                <div className="d-flex justify-content-between">
                                    <p className='modal-heading'>Educational Attainment Details</p>
                                </div>
                                <div style={customPopupDivision.popupcontent}>

                                    {
                                        <div style={customPopupDivision.popupinputs}>
                                            <p>Educational Attainment<span >*</span></p>
                                            {<div>
                                                <select className='form-control inputwidth' {...register("EducationTypeID", { required: true })} style={customStyles.inputLabel}
                                                    onChange={getType.bind(this)} >
                                                    <option value="">Select Educational Attainment</option>
                                                    {
                                                        EducationAttainmentlist.map((data) => {
                                                            return (
                                                                <option key={data.id} value={data.id}>{data.short}</option>
                                                            )
                                                        })
                                                    }
                                                </select>
                                                {errors.EducationTypeID && <span style={customStyles.errorMsg}> Please Enter Education Attainment</span>}
                                            </div>}
                                        </div>
                                    }


                                    {
                                        <div style={customPopupDivision.popupinputs}>
                                            <p>Course<span >*</span></p>
                                            {<div>
                                                <select className='form-control inputwidth' {...register("CourseID", { required: true })} style={customStyles.inputLabel}
                                                    onChange={getMajorType.bind(this)} >
                                                    <option value="">Select Course</option>
                                                    {
                                                        CourseDetails.map((data) => {
                                                            return (
                                                                <option key={data.id} value={data.id}>{data.short}</option>
                                                            )
                                                        })
                                                    }
                                                </select>
                                                {errors.CourseID && <span style={customStyles.errorMsg}> Please Enter Course</span>}
                                            </div>}
                                        </div>
                                    }

                                    {
                                        <div style={customPopupDivision.popupinputs}>
                                            <p>Major<span >*</span></p>
                                            {<div>
                                                <select className='form-control inputwidth' {...register("MajorID", { required: true })} style={customStyles.inputLabel}
                                                    onChange={getType.bind(this)} >
                                                    <option value="">Select Major</option>
                                                    {
                                                        MajorDetails.map((data) => {
                                                            return (
                                                                <option key={data.id} value={data.id}>{data.short}</option>
                                                            )
                                                        })
                                                    }
                                                </select>
                                                {errors.MajorID && <span style={customStyles.errorMsg}> Please Enter Major</span>}
                                            </div>}
                                        </div>
                                    }

                                    <div style={customPopupDivision.popupinputs}>
                                        <p>School Name <span >*</span></p>
                                        <div>
                                            <input type='text' placeholder='School Name'
                                                {...register("InstitutionName", { required: true })} className='form-control inputwidth' ></input>
                                            {errors.InstitutionName && <span style={customStyles.errorMsg}> Please Enter School Name</span>}
                                        </div>
                                    </div>



                                    <div style={customPopupDivision.popupinputs}>
                                        <p>Licenses/Certifications<span >*</span></p>
                                        {
                                            <div>
                                                <select className='form-control inputwidth' {...register("LicenseOrCertificationID", { required: true })} style={customStyles.inputLabel}>
                                                    <option value="">Select Licenses/Certifications</option>
                                                    {
                                                        LicenseOrCertificationMaster.map((data) => {
                                                            return (
                                                                <option key={data.id} value={data.id}>{data.short}</option>
                                                            )
                                                        })
                                                    }
                                                </select>
                                                {errors.LicenseOrCertificationID && <span style={customStyles.errorMsg}> Please Licenses/Certifications</span>}
                                            </div>
                                        }
                                    </div>

                                    {
                                        <div style={customPopupDivision.popupinputs}>
                                            <p>Country<span >*</span></p>
                                            {<div>
                                                <select className='form-control inputwidth' {...register("CountryID", { required: true })} style={customStyles.inputLabel}
                                                    onChange={getType.bind(this)} >
                                                    <option value="">Select Country</option>
                                                    {
                                                        Countrylist.map((data) => {
                                                            return (
                                                                <option key={data.id} value={data.id}>{data.short}</option>
                                                            )
                                                        })
                                                    }
                                                </select>
                                                {errors.CountryID && <span style={customStyles.errorMsg}> Please Enter Country</span>}
                                            </div>}
                                        </div>
                                    }


                                    <div style={customPopupDivision.popupinputs}>
                                        <p>Start Date <span >*</span></p>
                                        <div>
                                            <input type='date' placeholder='Start Date' max="{{maxdate}}"
                                                {...register("StartDate", { required: true })} className='form-control inputwidth' ></input>
                                            {errors.StartDate && <span style={customStyles.errorMsg}> Please Enter Start Date</span>}
                                        </div>
                                    </div>


                                    <div style={customPopupDivision.popupinputs}>
                                        <p>End Date <span >*</span></p>
                                        <div>
                                            <input type='date' placeholder='End Date' max="{{maxdate}}"
                                                {...register("EndDate", { required: true })} className='form-control inputwidth' ></input>
                                            {errors.EndDate && <span style={customStyles.errorMsg}> Please Enter End Date</span>}
                                        </div>
                                    </div>

                                    <div style={customPopupDivision.popupinputs}>
                                        <p>Attachment <span >*</span></p>
                                        <div>
                                            {/* <Dropzone></Dropzone> */}
                                        </div>
                                    </div>

                                </div>

                                <div class="d-flex justify-content-center w-100 mt-2 mb-2 pr-2">
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
                        </div>
                        <br></br>
                    </form>


                    <div className='row'>
                        <div className='col-12'>
                            <table className='table table-hover mb-5'>
                                <thead className='bg-info text-white '>
                                    <tr>
                                        <th>Educational Attainment</th>
                                        <th>Course</th>
                                        <th>Major</th>
                                        <th>School Name</th>
                                        <th>Licenses/Certifications</th>
                                        <th>Country</th>
                                        <th>Start Date</th>
                                        <th>End Date</th>
                                        <th>Attachment</th>
                                        <th>Status</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        EducationDetals.map((data, index) => {
                                            return (
                                                <tr className="text-dark" key={index}>
                                                    <td>{data.educationType}</td>
                                                    <td>{data.country}</td>
                                                    <td>{data.major}</td>
                                                    <td>{data.course}</td>
                                                    <td>{data.institutionName}</td>
                                                    <td>{data.licenseOrCertification}</td>
                                                    <td>{data.country}</td>
                                                    <td>{data.startDate}</td>
                                                    <td>{data.endDate}</td>
                                                    <td>{data.status}</td>
                                                    <td className='d-flex'>
                                                        <button className='editButton' onClick={editData.bind(this, data.id)}>Edit</button>
                                                        <button className='deleteButton' onClick={deleteData.bind(this, data.id)}>Delete</button>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )


}