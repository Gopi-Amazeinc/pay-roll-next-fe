import React from "react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDropzone } from "react-dropzone";
import axios from "axios";

function EmployeeProfile() {
  let hostURL = process.env.NEXT_PUBLIC_API_HOST_URL;
  const [CountrylistData, setCountrylistData] = useState([]);
  const [LanguagelistData, setLanguagelistData] = useState([]);
  const [TitleMasterData, setTitleMaster] = useState([]);
  const [MaritalStatusData, setMaritalStatusData] = useState([]);
  const [GenderMasterData, setGenderMasterData] = useState([]);
  const [ReligionMasterData, setReligionMasterData] = useState([]);
  const [CitizenshipMasterData, setCitizenshipMasterData] = useState([]);
  const [NationalityMasterData, setNationalityMasterData] = useState([]);
  const [LanguageSpokenMasterData, setLanguageSpokenMasterData] = useState([]);
  const [BloodTypeMasterData, setBloodTypeMasterData] = useState([]);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  const [actionType, setActionType] = useState("insert");

  useEffect(() => {
    debugger;
    getData();
  }, [1]);

  const getData = async () => {
    let GetTitleMaster = await axios.get(hostURL + "Master/GetTitleMaster");
    setTitleMaster(GetTitleMaster.data);

    let GetCountryType = await axios.get(hostURL + "Master/GetCountryType");
    setCountrylistData(GetCountryType.data);

    let GetMaritalStatus = await axios.get(hostURL + "Master/GetMaritalStatus");
    setMaritalStatusData(GetMaritalStatus.data);

    let GetGenderMaster = await axios.get(hostURL + "Master/GetGenderMaster");
    setGenderMasterData(GetGenderMaster.data);

    let GetReligionMaster = await axios.get(
      hostURL + "Master/GetReligionMaster"
    );
    setReligionMasterData(GetReligionMaster.data);

    let GetCitizenshipMaster = await axios.get(
      hostURL + "Master/GetCitizenshipMaster"
    );
    setCitizenshipMasterData(GetCitizenshipMaster.data);

    let GetNationalityMaster = await axios.get(
      hostURL + "Master/GetNationalityMaster"
    );
    setNationalityMasterData(GetNationalityMaster.data);

    let GetLanguageSpokenMaster = await axios.get(
      hostURL + "Master/GetLanguageSpokenMaster"
    );
    setLanguageSpokenMasterData(GetLanguageSpokenMaster.data);

    let GetBloodTypeMaster = await axios.get(
      hostURL + "Master/GetBloodTypeMaster"
    );
    setBloodTypeMasterData(GetBloodTypeMaster.data);
  };

  async function onSubmit(data) {
    debugger
    console.log(data)
    let hostURL = process.env.NEXT_PUBLIC_API_HOST_URL;

    if (actionType == "insert") {
        let Enity = {
            'Title': data.Title,
            'FirstName': data.FirstName,
            'MiddleName': data.MiddleName,
            'LastName': data.LastName,
            'NickName': data.NickName,
            'DateOfBirth': data.DateOfBirth,
            'PlaceOfBirth': data.PlaceOfBirth,
            'CountryOfBirthID': data.CountryOfBirthID,
            'GenderID': data.GenderID,
            'MaritalStatusID': data.MaritalStatusID,
            'PersonalEmail': data.PersonalEmail,
            'MothersName': data.MothersName,
            'FathersName': data.FathersName,
            'ReligionID': data.ReligionID,
            'CitizenshipID': data.CitizenshipID,
            'NationalityID': data.NationalityID,
            'LanguageSpokenID': data.LanguageSpokenID,

            'BloodTypeID': data.BloodTypeID,
            'IsPWD': data.IsPWD,

            'OriginalBMS': data.OriginalBMS,
            'EffectivityDateOfOriginalBMS': data.EffectivityDateOfOriginalBMS,
            'PreviousBMS': data.PreviousBMS,
            'EffectivityOfPreviousBMS': data.EffectivityOfPreviousBMS
        }
        let res = await axios.post(hostURL + "Employee/InsertStaff", Enity);
        if (res.data && res.status == 200) {
            setInsertStatus(true);
            <MyProfile data={{ InsertStatus }} />
        }

        console.log(res)

    }
    // else {
    //     let Enity = {
    //         "ID": data.ID,
    //         'Title': data.Title,
    //         'FirstName': data.FirstName,
    //         'MiddleName': data.MiddleName,
    //         'LastName': data.LastName,
    //         'NickName': data.NickName,
    //         'DateOfBirth': data.DateOfBirth,
    //         'PlaceOfBirth': data.PlaceOfBirth,
    //         'CountryOfBirthID': data.CountryOfBirthID,
    //         'GenderID': data.GenderID,
    //         'MaritalStatusID': data.MaritalStatusID,
    //         'PersonalEmail': data.PersonalEmail,
    //         'MothersName': data.MothersName,
    //         'FathersName': data.FathersName,
    //         'ReligionID': data.ReligionID,
    //         'CitizenshipID': data.CitizenshipID,
    //         'NationalityID': data.NationalityID,
    //         'LanguageSpokenID': data.LanguageSpokenID,

    //         'BloodTypeID': data.BloodTypeID,
    //         'IsPWD': data.IsPWD,

    //         'OriginalBMS': data.OriginalBMS,
    //         'EffectivityDateOfOriginalBMS': data.EffectivityDateOfOriginalBMS,
    //         'PreviousBMS': data.PreviousBMS,
    //         'EffectivityOfPreviousBMS': data.EffectivityOfPreviousBMS
    //     }
    //     await axios.post(hostURL + "Master/UpdateBuildingStaff", Enity);
    // }

}

  const customStyles = {
    content: {
      width: "85%",
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      transform: "translate(-50%, -50%)",
      height: "70%",
    },
    errorMsg: {
      fontSize: "12px",
      fontWeight: "500",
      color: "red",
    },
    span: {
      color: "red",
    },
  };

  const customPopupDivision = {
    popupcontent: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "space-between",
      alignItems: "center",
      width: "100%",
    },
    popupinputs: {
      width: "24%",
      marginTop: "16px",
    },
    formcontrol: {
      width: "350px !important",
    },

    cardinputs: {
      display: "flex",
      flexDirection: "column",
      margin: "5px",
      width: "215px",
      justifyContent: "center",
    },
  };
  // const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })
  return (
    <div>
      <div className="container">
        <div className="card mt-4 shadow-lg border-0">
          <div className="row">
            <p>My Information</p>
            <hr></hr>
            <div className="col-lg-3">
              <p>
                Title<span style={customStyles.span}>*</span>
              </p>
              {
                <div>
                  <select
                    className="form-select"
                    {...register("Title", { required: true })}
                  >
                    <option value="">Select Title</option>
                    {TitleMasterData.map((data, index) => {
                      return <option value={data.id}>{data.short}</option>;
                    })}
                  </select>
                  {errors.Title && (
                    <span style={customStyles.errorMsg}>
                      {" "}
                      Please Enter Title
                    </span>
                  )}
                </div>
              }
            </div>
            <div className="col-lg-3">
              <p>
                First Name<span style={customStyles.span}>*</span>
              </p>
              <div>
                <input
                  type="text"
                  placeholder="First Name"
                  {...register("FirstName", { required: true })}
                  className="form-control "
                ></input>
                {errors.FirstName && <span> Please Enter First Name</span>}
              </div>
            </div>
            <div className="col-lg-3">
              <p>
                Middle Name<span style={customStyles.span}>*</span>
              </p>
              <div>
                <input
                  type="text"
                  placeholder="Middle Name"
                  {...register("MiddleName", { required: true })}
                  className="form-control "
                ></input>
                {errors.MiddleName && <span> Please Enter Middle Name</span>}
              </div>
            </div>
            <div className="col-lg-3">
              <p>
                Last Name<span style={customStyles.span}>*</span>
              </p>
              <div>
                <input
                  type="text"
                  placeholder="Last Name"
                  {...register("LastName", { required: true })}
                  className="form-control "
                ></input>
                {errors.LastName && (
                  <span style={customStyles.errorMsg}>
                    {" "}
                    Please Enter Last Name
                  </span>
                )}
              </div>
            </div>
          </div>
          <br></br>
          <div className="row">
            <div className="col-lg-3">
              <p>
                Nick Name<span style={customStyles.span}>*</span>
              </p>
              <div>
                <input
                  type="text"
                  placeholder="Nick Name"
                  {...register("NickName", { required: true })}
                  className="form-control "
                ></input>
                {errors.NickName && <span> Please Enter Nick Name</span>}
              </div>
            </div>
            <div className="col-lg-3">
              <p>
                Date of Birth<span style={customStyles.span}>*</span>
              </p>
              <div>
                <input
                  type="date"
                  placeholder="Date of Birth"
                  {...register("DateOfBirth", { required: true })}
                  className="form-control "
                ></input>
                {errors.DateOfBirth && (
                  <span style={customStyles.errorMsg}>
                    {" "}
                    Please Enter Date of Birth
                  </span>
                )}
              </div>
            </div>
            <div className="col-lg-3">
              <p>
                Place of Birth<span style={customStyles.span}>*</span>
              </p>
              <div>
                <input
                  type="text"
                  placeholder="Place of Birth"
                  {...register("PlaceOfBirth", { required: true })}
                  className="form-control "
                ></input>
                {errors.PlaceOfBirth && (
                  <span> Please Enter Place of Birth</span>
                )}
              </div>
            </div>
            <div className="col-lg-3">
              <p>
                Country of Birth<span style={customStyles.span}>*</span>
              </p>
              {
                <div>
                  <select
                    className="form-select "
                    {...register("Country_Of_Birth", { required: true })}
                  >
                    <option value="">Select Country Of Birth</option>
                    {CountrylistData.map((data, index) => {
                      return <option value={data.id}>{data.short}</option>;
                    })}
                  </select>
                  {errors.Country_Of_Birth && (
                    <span> Please Enter Country Of Birth</span>
                  )}
                </div>
              }
            </div>
          </div>
          <br></br>
          <div className="row">
            <div className="col-lg-3">
              <p>
                Gender<span style={customStyles.span}>*</span>
              </p>
              {
                <div>
                  <select
                    className="form-select "
                    {...register("GenderID", { required: true })}
                  >
                    <option value="">Select Gender</option>
                    {GenderMasterData.map((data, index) => {
                      return <option value={data.id}>{data.short}</option>;
                    })}
                  </select>
                  {errors.GenderID && (
                    <span style={customStyles.errorMsg}>
                      {" "}
                      Please Enter Gender
                    </span>
                  )}
                </div>
              }
            </div>
            <div className="col-lg-3">
              <p>
                Marital Status<span style={customStyles.span}>*</span>
              </p>
              {
                <div>
                  <select
                    className="form-select "
                    {...register("MaritalStatusID", { required: true })}
                  >
                    <option value="">Select Marital Status</option>
                    {MaritalStatusData.map((data, index) => {
                      return <option value={data.id}>{data.short}</option>;
                    })}
                  </select>
                  {errors.MaritalStatusID && (
                    <span style={customStyles.errorMsg}>
                      {" "}
                      Please Enter Marital Status
                    </span>
                  )}
                </div>
              }
            </div>
            <div className="col-lg-3">
              <p>
                Personal Email<span style={customStyles.span}>*</span>
              </p>
              <div>
                <input
                  type="text"
                  placeholder="Personal Email"
                  {...register("PersonalEmail", { required: true })}
                  className="form-control "
                ></input>
                {errors.PersonalEmail && (
                  <span style={customStyles.errorMsg}>
                    {" "}
                    Please Enter Personal Email
                  </span>
                )}
              </div>
            </div>
            <div className="col-lg-3">
              <p>
                Mother's Maiden Name<span style={customStyles.span}>*</span>
              </p>
              <div>
                <input
                  type="text"
                  placeholder="Personal Email"
                  {...register("MothersName", { required: true })}
                  className="form-control "
                ></input>
                {errors.MothersName && (
                  <span style={customStyles.errorMsg}>
                    {" "}
                    Please Enter Mother Maiden Name
                  </span>
                )}
              </div>
            </div>
          </div>
          <br></br>
          <div className="row">
            <div className="col-lg-3">
              <p>
                Father's Name<span style={customStyles.span}>*</span>
              </p>
              <div>
                <input
                  type="text"
                  placeholder="Father Maiden Name"
                  {...register("FathersName", { required: true })}
                  className="form-control "
                ></input>
                {errors.FathersName && (
                  <span style={customStyles.errorMsg}>
                    {" "}
                    Please Enter Father Maiden Name
                  </span>
                )}
              </div>
            </div>
            <div className="col-lg-3">dropzone goes here</div>
            <div className="col-lg-3"></div>
            <div className="col-lg-3"></div>
          </div>
        </div>

        <div className="card mt-4 shadow-lg border-0">
        <p>Ethnicity Information</p>
        <hr />
          <div className="row">
            <div className="col-lg-3">
            <p>Religion<span style={customStyles.span}>*</span></p>
                                            <div>
                                                <select className='form-select ' {...register("ReligionID", { required: true })}>
                                                    <option value="">Select Religion</option>
                                                    {
                                                        ReligionMasterData.map((data, index) => {
                                                            return (
                                                                <option value={data.id}>{data.short}</option>
                                                            )
                                                        })
                                                    }
                                                </select>
                                                {errors.ReligionID && <span style={customStyles.errorMsg}> Please Enter Religion</span>}
                                            </div>
                                        </div>
            <div className="col-lg-3">
            <p>Citizenship<span style={customStyles.span}>*</span></p>
                                        {
                                            <div>
                                                <select className='form-select ' {...register("CitizenshipID", { required: true })} style={customStyles.inputLabel}>
                                                    <option value="">Select Citizenship</option>
                                                    {
                                                        CitizenshipMasterData.map((data, index) => {
                                                            return (
                                                                <option value={data.id}>{data.short}</option>
                                                            )
                                                        })
                                                    }
                                                </select>
                                                {errors.CitizenshipID && <span style={customStyles.errorMsg}> Please Enter Citizen Ship</span>}
                                            </div>
                                        }
            </div>
            <div className="col-lg-3">
            <p>Nationality <span style={customStyles.span}>*</span></p>
                                            {<div>
                                                <select className='form-select ' {...register("NationalityID", { required: true })} >
                                                    <option value="">Select Nationality</option>
                                                    {
                                                        NationalityMasterData.map((data, index) => {
                                                            return (
                                                                <option value={data.id}>{data.short}</option>
                                                            )
                                                        })
                                                    }
                                                </select>
                                                {errors.NationalityID && <span style={customStyles.errorMsg}> Please Enter Nationality</span>}
                                            </div>}
            </div>
            <div className="col-lg-3">
            <p>Language Spoken<span style={customStyles.span}>*</span></p>
                                            {<div>
                                                <select className='form-select ' {...register("LanguageSpokenID", { required: true })} >
                                                    <option value="">Select Language Spoken</option>
                                                    {
                                                        LanguageSpokenMasterData.map((data, index) => {
                                                            return (
                                                                <option value={data.id}>{data.short}</option>
                                                            )
                                                        })
                                                    }
                                                </select>
                                                {errors.LanguageSpokenID && <span style={customStyles.errorMsg}> Please Enter Spoken Language</span>}
                                            </div>}</div>  
          </div>
        </div>

        <div className="card mt-4 shadow-lg border-0">
        <p>Health Information</p>
            <div className="row">
                <div className="col-lg-3">
                <p>Blood Type<span style={customStyles.span}>*</span></p>
                                            {<div>
                                                <select className='form-select' {...register("BloodTypeID", { required: true })} >
                                                    <option value="">Select Blood Type</option>
                                                    {
                                                        BloodTypeMasterData.map((data, index) => {
                                                            return (
                                                                <option value={data.id}>{data.short}</option>
                                                            )
                                                        })
                                                    }
                                                </select>
                                                {errors.BloodTypeID && <span style={customStyles.errorMsg}> Please Enter Blood Group</span>}
                                            </div>}
                </div>
                <div className="col-lg-3">
                <p>Is PWD<span style={customStyles.span}>*</span></p>
                                            {<div>
                                                <input type="radio" value="1" name="IsPWD" {...register("IsPWD", { required: true })} /> Yes
                                                <input type="radio" value="0" name="IsPWD" {...register("IsPWD", { required: true })} />  No
                                                {errors.IsPWD && <span style={customStyles.errorMsg}> Please Enter Blood Group</span>}
                                            </div>}
                </div>
                <div className="col-lg-3"></div>
                <div className="col-lg-3"></div>
            
            </div>
        </div>

        <div className="card mt-4 shadow-lg border-0">
        <p>BMS Details</p>
        <hr/>
          <div className="row">
            <div className="col-lg-3">
            <p>Original BMS<span style={customStyles.span}>*</span></p>
                                        <div>
                                            <input type='text' placeholder='Original BMS *'
                                                {...register("OriginalBMS", { required: true })} className='form-control' ></input>
                                            {errors.OriginalBMS && <span style={customStyles.errorMsg}> Please Enter Original BMS *</span>}
                                        </div>
            </div>
            <div className="col-lg-3">
            <p>Effectivity date of Original BMS<span style={customStyles.span}>*</span></p>
                                        <div>
                                            <input type='date' placeholder='Previous Effectivity BMSDate'
                                                {...register("EffectivityDateOfOriginalBMS", { required: true })} className='form-control' ></input>
                                            {errors.EffectivityDateOfOriginalBMS && <span style={customStyles.errorMsg}> Please Enter Effectivity date of Original BMS</span>}
                                        </div>
            </div>
            <div className="col-lg-3">
            <p>Previous BMS<span style={customStyles.span}>*</span></p>
                                        <div>
                                            <input type='text' placeholder='Previous BMS'
                                                {...register("PreviousBMS", { required: true })} className='form-control' ></input>
                                            {errors.PreviousBMS && <span style={customStyles.errorMsg}> Please Enter Previous BMS</span>}
                                        </div>
            </div>
            <div className="col-lg-3">
            <p>Effectivity date of Original BMS<span style={customStyles.span}>*</span></p>
                                        <div>
                                            <input type='date' placeholder='EffectivityOfPreviousBMS'
                                                {...register("EffectivityOfPreviousBMS", { required: true })} className='form-control inputwidth' ></input>
                                            {errors.EffectivityOfPreviousBMS && <span style={customStyles.errorMsg}> Please Enter Effectivity date of Original BMS</span>}
                                        </div>
            </div>

          </div>
          <br></br>
          <div className="row">
          <div className="d-flex">
              <button className="btn btn-primary" id="AddButton">
                Submit
              </button>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}

export default EmployeeProfile;
