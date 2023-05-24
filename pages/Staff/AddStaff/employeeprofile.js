import React from "react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import Swal from "sweetalert2";
import { apiService } from "@/services/api.service";
import { useRouter } from "next/router";

function EmployeeProfile({ data }) {
  const router = useRouter();
  const [CountrylistData, setCountrylistData] = useState([]);
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
    makecalls();
  }, [1]);

  function makecalls() {
    const { id } = data || {};
    if (id) {
      getByID(id);
    } else {
      clearForm();
      getData();
    }
  }

  const getByID = async (id) => {
    debugger;
    await getData();
    const res = await apiService.commonGetCall(
      "Payroll/GetStaffByStaffID?ID=" + id
    );
    clearForm(res.data[0]);
  };

  const getData = async () => {
    let GetTitleMaster = await apiService.commonGetCall(
      "Master/GetTitleMaster"
    );
    setTitleMaster(GetTitleMaster.data);

    let GetCountryType = await apiService.commonGetCall(
      "Master/GetCountryType"
    );
    setCountrylistData(GetCountryType.data);

    let GetMaritalStatus = await apiService.commonGetCall(
      "Master/GetMaritalStatus"
    );
    setMaritalStatusData(GetMaritalStatus.data);

    let GetGenderMaster = await apiService.commonGetCall(
      "Master/GetGenderMaster"
    );
    setGenderMasterData(GetGenderMaster.data);

    let GetReligionMaster = await apiService.commonGetCall(
      "Master/GetReligionMaster"
    );
    setReligionMasterData(GetReligionMaster.data);

    let GetCitizenshipMaster = await apiService.commonGetCall(
      "Master/GetCitizenshipMaster"
    );
    setCitizenshipMasterData(GetCitizenshipMaster.data);

    let GetNationalityMaster = await apiService.commonGetCall(
      "Master/GetNationalityMaster"
    );
    setNationalityMasterData(GetNationalityMaster.data);

    let GetLanguageSpokenMaster = await apiService.commonGetCall(
      "Master/GetLanguageSpokenMaster"
    );
    setLanguageSpokenMasterData(GetLanguageSpokenMaster.data);

    let GetBloodTypeMaster = await apiService.commonGetCall(
      "Master/GetBloodTypeMaster"
    );
    setBloodTypeMasterData(GetBloodTypeMaster.data);
  };

  async function onSubmit(data) {
    debugger;
    console.log(data);

    if (actionType == "insert") {
      let Entity = {
        Title: data.Title,
        FirstName: data.FirstName,
        MiddleName: data.MiddleName,
        LastName: data.LastName,
        NickName: data.NickName,
        DateOfBirth: data.DateOfBirth,
        PlaceOfBirth: data.PlaceOfBirth,
        CountryOfBirthID: data.CountryOfBirthID,
        GenderID: data.GenderID,
        MaritalStatusID: data.MaritalStatusID,
        PersonalEmail: data.PersonalEmail,
        MothersName: data.MothersName,
        FathersName: data.FathersName,
        ReligionID: data.ReligionID,
        CitizenshipID: data.CitizenshipID,
        NationalityID: data.NationalityID,
        LanguageSpokenID: data.LanguageSpokenID,
        BloodTypeID: data.BloodTypeID,
        IsPWD: data.IsPWD,
        OriginalBMS: data.OriginalBMS,
        EffectivityDateOfOriginalBMS: data.EffectivityDateOfOriginalBMS,
        PreviousBMS: data.PreviousBMS,
        EffectivityOfPreviousBMS: data.EffectivityOfPreviousBMS,
      };
      let res = await apiService.commonPostCall("Payroll/InsertStaff", Entity);
      if (res.data && res.status == 200) {
        console.log(res.data, "idddddddddddddddddddddddddd");
        sessionStorage.setItem("CreatedEmpID", res.data);
        Swal.fire("Added successfully!!");
      }
    } else {
      let Entity = {
        ID: data.ID,
        Title: data.Title,
        FirstName: data.FirstName,
        MiddleName: data.MiddleName,
        LastName: data.LastName,
        NickName: data.NickName,
        DateOfBirth: data.DateOfBirth,
        PlaceOfBirth: data.PlaceOfBirth,
        CountryOfBirthID: data.CountryOfBirthID,
        GenderID: data.GenderID,
        MaritalStatusID: data.MaritalStatusID,
        PersonalEmail: data.PersonalEmail,
        MothersName: data.MothersName,
        FathersName: data.FathersName,
        ReligionID: data.ReligionID,
        CitizenshipID: data.CitizenshipID,
        NationalityID: data.NationalityID,
        LanguageSpokenID: data.LanguageSpokenID,

        BloodTypeID: data.BloodTypeID,
        IsPWD: data.IsPWD,

        OriginalBMS: data.OriginalBMS,
        EffectivityDateOfOriginalBMS: data.EffectivityDateOfOriginalBMS,
        PreviousBMS: data.PreviousBMS,
        EffectivityOfPreviousBMS: data.EffectivityOfPreviousBMS,
      };
      await apiService.commonPostCall("Payroll/UpdateStaff", Entity);
      Swal.fire("Updated successfully!!");
    }
  }

  async function clearForm(staffData = null) {
    let details = {
      ID: staffData ? staffData.id : "",
      Title: staffData ? staffData.title : "",
      FirstName: staffData ? staffData.firstName : "",
      MiddleName: staffData ? staffData.middleName : "",
      LastName: staffData ? staffData.lastName : "",
      NickName: staffData ? staffData.nickName : "",
      DateOfBirth: staffData ? staffData.dateOfBirth : "",
      PlaceOfBirth: staffData ? staffData.placeOfBirth : "",
      CountryOfBirthID: staffData ? staffData.countryOfBirthID : "",
      GenderID: staffData ? staffData.genderID : "",
      MaritalStatusID: staffData ? staffData.maritalStatusID : "",
      PersonalEmail: staffData ? staffData.personalEmail : "",
      MothersName: staffData ? staffData.mothersName : "",
      FathersName: staffData ? staffData.fathersName : "",
      ReligionID: staffData ? staffData.religionID : "",
      CitizenshipID: staffData ? staffData.citizenshipID : "",
      NationalityID: staffData ? staffData.nationalityID : "",
      LanguageSpokenID: staffData ? staffData.languageSpokenID : "",
      BloodTypeID: staffData ? staffData.bloodTypeID : "",
      IsPWD: staffData ? staffData.isPWD : "",
      OriginalBMS: staffData ? staffData.originalBMS : "",
      EffectivityDateOfOriginalBMS: staffData
        ? staffData.effectivityDateOfOriginalBMS
        : "",
      PreviousBMS: staffData ? staffData.previousBMS : "",
      EffectivityOfPreviousBMS: staffData
        ? staffData.effectivityOfPreviousBMS
        : "",
    };
    reset(details);
    setActionType(staffData ? "update" : "insert");
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

  // const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })
  return (
    <div>
      <div className="container">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="card p-3">
            <div className="row">
              <h6>My Information</h6>
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
                        return (
                          <option key={data.id} value={data.id}>
                            {data.short}
                          </option>
                        );
                      })}
                    </select>
                    {errors.Title && (
                      <span style={customStyles.errorMsg}>
                        Please enter title
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
                  {errors.FirstName && (
                    <span style={customStyles.errorMsg}>
                      Please enter first name
                    </span>
                  )}
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
                  {errors.MiddleName && (
                    <span style={customStyles.errorMsg}>
                      Please enter middle name
                    </span>
                  )}
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
                      Please enter last name
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
                  {errors.NickName && (
                    <span style={customStyles.errorMsg}>
                      {" "}
                      Please enter nick name
                    </span>
                  )}
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
                      Please select date of birth
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
                    <span style={customStyles.errorMsg}>
                      {" "}
                      Please enter place of birth
                    </span>
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
                      {...register("CountryOfBirthID", { required: true })}
                    >
                      <option value="">Select Country Of Birth</option>
                      {CountrylistData.map((data, index) => {
                        return (
                          <option key={data.id} value={data.id}>
                            {data.short}
                          </option>
                        );
                      })}
                    </select>
                    {errors.Country_Of_Birth && (
                      <span style={customStyles.errorMsg}>
                        {" "}
                        Please select country of birth
                      </span>
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
                        return (
                          <option key={data.id} value={data.id}>
                            {data.short}
                          </option>
                        );
                      })}
                    </select>
                    {errors.GenderID && (
                      <span style={customStyles.errorMsg}>
                        Please select gender
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
                      className="form-select"
                      {...register("MaritalStatusID", { required: true })}
                    >
                      <option value="">Select Marital Status</option>
                      {MaritalStatusData.map((data, index) => {
                        return (
                          <option key={data.id} value={data.id}>
                            {data.short}
                          </option>
                        );
                      })}
                    </select>
                    {errors.MaritalStatusID && (
                      <span style={customStyles.errorMsg}>
                        Please enter marital status
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
                      Please enter personal email
                    </span>
                  )}
                </div>
              </div>
              <div className="col-lg-3">
                <p>
                  Mother's Name<span style={customStyles.span}>*</span>
                </p>
                <div>
                  <input
                    type="text"
                    placeholder="Mothers Name"
                    {...register("MothersName", { required: true })}
                    className="form-control "
                  ></input>
                  {errors.MothersName && (
                    <span style={customStyles.errorMsg}>
                      Please enter mother's name
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
                    placeholder="Father's Name"
                    {...register("FathersName", { required: true })}
                    className="form-control "
                  ></input>
                  {errors.FathersName && (
                    <span style={customStyles.errorMsg}>
                      Please enter father's name
                    </span>
                  )}
                </div>
              </div>
              {/* <div className="col-lg-3"><h5>dropzone goes here</h5></div> */}
              <div className="col-lg-3"></div>
              <div className="col-lg-3"></div>
            </div>
          </div>

          <div className="card p-3 mt-4 ">
            <div className="row">
              <h6>Ethnicity Information</h6>
              <hr />
              <div className="col-lg-3">
                <p>
                  Religion<span style={customStyles.span}>*</span>
                </p>
                <div>
                  <select
                    className="form-select"
                    {...register("ReligionID", { required: true })}
                  >
                    <option value="">Select Religion</option>
                    {ReligionMasterData.map((data, index) => {
                      return (
                        <option key={data.id} value={data.id}>
                          {data.short}
                        </option>
                      );
                    })}
                  </select>
                  {errors.ReligionID && (
                    <span style={customStyles.errorMsg}>
                      Please select religion
                    </span>
                  )}
                </div>
              </div>
              <div className="col-lg-3">
                <p>
                  Citizenship<span style={customStyles.span}>*</span>
                </p>
                {
                  <div>
                    <select
                      className="form-select "
                      {...register("CitizenshipID", { required: true })}
                      style={customStyles.inputLabel}
                    >
                      <option value="">Select Citizenship</option>
                      {CitizenshipMasterData.map((data, index) => {
                        return (
                          <option key={data.id} value={data.id}>
                            {data.short}
                          </option>
                        );
                      })}
                    </select>
                    {errors.CitizenshipID && (
                      <span style={customStyles.errorMsg}>
                        Please select citizenship
                      </span>
                    )}
                  </div>
                }
              </div>
              <div className="col-lg-3">
                <p>
                  Nationality <span style={customStyles.span}>*</span>
                </p>
                {
                  <div>
                    <select
                      className="form-select "
                      {...register("NationalityID", { required: true })}
                    >
                      <option value="">Select Nationality</option>
                      {NationalityMasterData.map((data, index) => {
                        return (
                          <option key={data.id} value={data.id}>
                            {data.short}
                          </option>
                        );
                      })}
                    </select>
                    {errors.NationalityID && (
                      <span style={customStyles.errorMsg}>
                        Please select nationality
                      </span>
                    )}
                  </div>
                }
              </div>
              <div className="col-lg-3">
                <p>
                  Language Spoken<span style={customStyles.span}>*</span>
                </p>
                {
                  <div>
                    <select
                      className="form-select "
                      {...register("LanguageSpokenID", { required: true })}
                    >
                      <option value="">Select Language Spoken</option>
                      {LanguageSpokenMasterData.map((data, index) => {
                        return (
                          <option key={data.id} value={data.id}>
                            {data.short}
                          </option>
                        );
                      })}
                    </select>
                    {errors.LanguageSpokenID && (
                      <span style={customStyles.errorMsg}>
                        Please select language spoken
                      </span>
                    )}
                  </div>
                }
              </div>
            </div>
          </div>

          <div className="card p-3 mt-4">
            <div className="row">
              <h6>Health Information</h6>
              <hr></hr>
              <div className="col-lg-3">
                <p>
                  Blood Type<span style={customStyles.span}>*</span>
                </p>
                {
                  <div>
                    <select
                      className="form-select"
                      {...register("BloodTypeID", { required: true })}
                    >
                      <option value="">Select Blood Type</option>
                      {BloodTypeMasterData.map((data, index) => {
                        return (
                          <option key={data.id} value={data.id}>
                            {data.short}
                          </option>
                        );
                      })}
                    </select>
                    {errors.BloodTypeID && (
                      <span style={customStyles.errorMsg}>
                        Please select blood group
                      </span>
                    )}
                  </div>
                }
              </div>
              <div className="col-lg-3">
                <p>
                  Is PWD<span style={customStyles.span}>*</span>
                </p>
                {
                  <div>
                    <input
                      type="radio"
                      value="true"
                      name="IsPWD"
                      {...register("IsPWD", { required: true })}
                    />
                    Yes &nbsp;
                    <input
                      type="radio"
                      value="false"
                      name="IsPWD"
                      {...register("IsPWD", { required: true })}
                    />
                    No
                    <div>
                      {errors.IsPWD && (
                        <span style={customStyles.errorMsg}>
                          Please select PWD
                        </span>
                      )}
                    </div>
                  </div>
                }
              </div>
              <div className="col-lg-3"></div>
              <div className="col-lg-3"></div>
            </div>
          </div>

          <div className="card p-3 mt-4">
            <div className="row">
              <h6>BMS Details</h6>
              <hr />
              <div className="col-lg-3">
                <p>
                  Original BMS<span style={customStyles.span}>*</span>
                </p>
                <div>
                  <input
                    type="text"
                    placeholder="Original BMS"
                    {...register("OriginalBMS", { required: true })}
                    className="form-control"
                  ></input>
                  {errors.OriginalBMS && (
                    <span style={customStyles.errorMsg}>
                      Please enter original BMS
                    </span>
                  )}
                </div>
              </div>
              <div className="col-lg-3">
                <p>
                  Effectivity date of Original BMS
                  <span style={customStyles.span}>*</span>
                </p>
                <div>
                  <input
                    type="date"
                    placeholder="Previous Effectivity BMS Date"
                    {...register("EffectivityDateOfOriginalBMS", {
                      required: true,
                    })}
                    className="form-control"
                  ></input>
                  {errors.EffectivityDateOfOriginalBMS && (
                    <span style={customStyles.errorMsg}>
                      Please enter effectivity date of original BMS
                    </span>
                  )}
                </div>
              </div>
              <div className="col-lg-3">
                <p>
                  Previous BMS<span style={customStyles.span}>*</span>
                </p>
                <div>
                  <input
                    type="text"
                    placeholder="Previous BMS"
                    {...register("PreviousBMS", { required: true })}
                    className="form-control"
                  ></input>
                  {errors.PreviousBMS && (
                    <span style={customStyles.errorMsg}>
                      Please enter previous BMS
                    </span>
                  )}
                </div>
              </div>
              <div className="col-lg-3">
                <p>
                  Effectivity date of Original BMS
                  <span style={customStyles.span}>*</span>
                </p>
                <div>
                  <input
                    type="date"
                    placeholder="EffectivityOfPreviousBMS"
                    {...register("EffectivityOfPreviousBMS", {
                      required: true,
                    })}
                    className="form-control inputwidth"
                  ></input>
                  {errors.EffectivityOfPreviousBMS && (
                    <span style={customStyles.errorMsg}>
                      Please enter effectivity date of original BMS
                    </span>
                  )}
                </div>
              </div>
            </div>
            <br></br>
          </div>

          <div className="d-flex justify-content-center w-100 mt-4 mb-2 pr-2">
            {actionType == "insert" && (
              <button className="staffSubmitBtn">Submit</button>
            )}
            {actionType == "update" && (
              <button className="staffSubmitBtn">Update</button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default EmployeeProfile;