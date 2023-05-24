import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import Swal from "sweetalert2";
import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { apiService } from "@/services/api.service";

export default function EducationDetails({data}) {
    
  const [EducationDetals, setEducationData] = useState([]);
  const [LicenseOrCertificationMaster, setLicenseOrCertificationMaster] =
    useState([]);
  const [EducationAttainmentlist, setEducationAttainmentlistData] = useState(
    []
  );
  const [CourseDetails, setCourseDetailsData] = useState([]);
  const [MajorDetails, setMajorDetailsData] = useState([]);
  const [Countrylist, setCountryData] = useState([]);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  const [actionType, setActionType] = useState("insert");
  const [filePath, setFilePath] = useState();

  const onDrop = useCallback((acceptedFiles) => {
    debugger;
    console.log(acceptedFiles, "Uploaded file");
    uploadFile(acceptedFiles);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const uploadFile = async (data) => {
    let hostURL = process.env.NEXT_PUBLIC_API_HOST_URL;
    const formData = new FormData();
    formData.append("file_upload", data[0], data[0].name);
    let res = await axios.post(
      hostURL + "Payroll/ProjectAttachments",
      formData
    );
    console.log(res, "File Path");
    Swal.fire("Uploaded successfully");
    setFilePath(res.data);
  };
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
      width: "48%",
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

  async function onSubmit(data) {
    debugger;
    console.log(data);
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
        AttachmentEdu: filePath,
        StaffID:  sessionStorage.getItem('CreatedEmpID')
      };
      await axios.post(hostURL + "Payroll/InsertEducationDetails", Entity);
      Swal.fire("Added Successfully!");
      cleardata();
      getData();
    } else {
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
        StaffID:  sessionStorage.getItem('CreatedEmpID')
      };

      await axios.post(hostURL + "Payroll/UpdateEducationDetails", Entity);
      Swal.fire("Updated Successfully!");
      getData();
      cleardata();
    }
  }

  function cleardata(existingData = null) {
    debugger;
    let etty = {
      ID: existingData ? existingData.id : "",
      EducationTypeID: existingData ? existingData.educationTypeID : "",
      CourseID: existingData ? existingData.courseID : "",
      MajorID: existingData ? existingData.majorID : "",
      InstitutionName: existingData ? existingData.institutionName : "",
      LicenseOrCertificationID: existingData
        ? existingData.licenseOrCertificationID
        : "",
      CountryID: existingData ? existingData.countryID : "",
      StartDate: existingData ? existingData.startDate : "",
      EndDate: existingData ? existingData.endDate : "",
      AttachmentEdu: existingData ? existingData.attachmentEdu : "",
      StaffID:  sessionStorage.getItem('CreatedEmpID')
    };
    reset(etty);
    setActionType(existingData ? "update" : "insert");
  }

  useEffect(() => {
    debugger
    makecalls()
  }, [1]);
  function makecalls() {
    const { id } = data || {};
    if (id) {
      getByID(id);
    } else {
      cleardata()
      getData();
    }
  }
  const getByID = async (id) => {
    debugger;
    await getData();
    const res = await apiService.commonGetCall(
      "Payroll/GetEducationDetailsByStaffID?StaffID=" + id
    );
    setEducationData(res.data);
  };
  async function getData() {
    let hostURL = process.env.NEXT_PUBLIC_API_HOST_URL;

    let res = await axios.get(hostURL + "/Master/GetEducationTypeMaster");
    setEducationAttainmentlistData(res.data);

    // let res3 = await axios.get(hostURL + "/HR/GetEducationDetails");
    // setEducationData(res3.data);

    let res2 = await axios.get(hostURL + "/Master/GetCountryType");
    setCountryData(res2.data);

    let res1 = await axios.get(
      hostURL + "/Payroll/GetLicenseOrCertificationMaster"
    );
    setLicenseOrCertificationMaster(res1.data);
  }

  async function editData(data) {
    debugger;
    let hostURL = process.env.NEXT_PUBLIC_API_HOST_URL;
    let res = await axios.get(
      hostURL + "Payroll/GetEducationDetailsByID?ID=" + data
    );
    cleardata(res.data[0]);
  }

  async function deleteData(data) {
    debugger;
    let hostURL = process.env.NEXT_PUBLIC_API_HOST_URL;
    let res = await axios.get(hostURL + "HR/DeleteEducationDetails?ID=" + data);
    getData();
  }

  async function getType(data) {
    debugger;
    let hostURL = process.env.NEXT_PUBLIC_API_HOST_URL;
    let courseresult = await axios.get(hostURL + "/Master/GetCourseMaster");
    courseresult.data.filter(
      (x) => x.educationAttainmentID == data.target.value
    );
    setCourseDetailsData(courseresult.data);
  }

  async function getMajorType(data) {
    debugger;
    let hostURL = process.env.NEXT_PUBLIC_API_HOST_URL;
    let majorresult = await axios.get(hostURL + "/Master/GetMajorMaster");
    majorresult.data.filter((x) => x.courseID == data.target.value);
    setMajorDetailsData(majorresult.data);
  }

  return (
    <div>
      <div className="container-fluid">
        <div className="card p-3">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row">
              <div className="col-12">
              <h6>
                    Educational Attainment Details
                  </h6>
                  <hr/>
                <div style={customPopupDivision.popupcontent}>
                  {
                    <div style={customPopupDivision.popupinputs}>
                      <p>
                        Educational Attainment
                        <span style={customStyles.span}>*</span>
                      </p>
                      {
                        <div>
                          <select
                            className="form-select "
                            {...register("EducationTypeID", { required: true })}
                            style={customStyles.inputLabel}
                            onChange={getType.bind(this)}
                          >
                            <option value="">
                              Select Educational Attainment
                            </option>
                            {EducationAttainmentlist.map((data) => {
                              return (
                                <option key={data.id} value={data.id}>
                                  {data.short}
                                </option>
                              );
                            })}
                          </select>
                          {errors.EducationTypeID && (
                            <span style={customStyles.errorMsg}>
                              {" "}
                              Please select educational attainment
                            </span>
                          )}
                        </div>
                      }
                    </div>
                  }

                  {
                    <div style={customPopupDivision.popupinputs}>
                      <p>
                        Course<span style={customStyles.span}>*</span>
                      </p>
                      {
                        <div>
                          <select
                            className="form-select "
                            {...register("CourseID", { required: true })}
                            style={customStyles.inputLabel}
                            onChange={getMajorType.bind(this)}
                          >
                            <option value="">Select Course</option>
                            {CourseDetails.map((data) => {
                              return (
                                <option key={data.id} value={data.id}>
                                  {data.short}
                                </option>
                              );
                            })}
                          </select>
                          {errors.CourseID && (
                            <span style={customStyles.errorMsg}>
                              {" "}
                              Please select course
                            </span>
                          )}
                        </div>
                      }
                    </div>
                  }

                  {
                    <div style={customPopupDivision.popupinputs}>
                      <p>
                        Major<span style={customStyles.span}>*</span>
                      </p>
                      {
                        <div>
                          <select
                            className="form-select "
                            {...register("MajorID", { required: true })}
                            style={customStyles.inputLabel}
                            onChange={getType.bind(this)}
                          >
                            <option value="">Select Major</option>
                            {MajorDetails.map((data) => {
                              return (
                                <option key={data.id} value={data.id}>
                                  {data.short}
                                </option>
                              );
                            })}
                          </select>
                          {errors.MajorID && (
                            <span style={customStyles.errorMsg}>
                              {" "}
                              Please select major
                            </span>
                          )}
                        </div>
                      }
                    </div>
                  }

                  <div style={customPopupDivision.popupinputs}>
                    <p>
                      School Name <span style={customStyles.span}>*</span>
                    </p>
                    <div>
                      <input
                        type="text"
                        placeholder="School Name"
                        {...register("InstitutionName", { required: true })}
                        className="form-control "
                      ></input>
                      {errors.InstitutionName && (
                        <span style={customStyles.errorMsg}>
                          {" "}
                          Please enter school name
                        </span>
                      )}
                    </div>
                  </div>

                  <div style={customPopupDivision.popupinputs}>
                    <p>
                      Licenses/Certifications
                      <span style={customStyles.span}>*</span>
                    </p>
                    {
                      <div>
                        <select
                          className="form-select "
                          {...register("LicenseOrCertificationID", {
                            required: true,
                          })}
                          style={customStyles.inputLabel}
                        >
                          <option value="">
                            Select Licenses/Certifications
                          </option>
                          {LicenseOrCertificationMaster.map((data) => {
                            return (
                              <option key={data.id} value={data.id}>
                                {data.short}
                              </option>
                            );
                          })}
                        </select>
                        {errors.LicenseOrCertificationID && (
                          <span style={customStyles.errorMsg}>
                            {" "}
                            Please select Licenses/Certifications
                          </span>
                        )}
                      </div>
                    }
                  </div>

                  {
                    <div style={customPopupDivision.popupinputs}>
                      <p>
                        Country<span style={customStyles.span}>*</span>
                      </p>
                      {
                        <div>
                          <select
                            className="form-select "
                            {...register("CountryID", { required: true })}
                            style={customStyles.inputLabel}
                            onChange={getType.bind(this)}
                          >
                            <option value="">Select Country</option>
                            {Countrylist.map((data) => {
                              return (
                                <option key={data.id} value={data.id}>
                                  {data.short}
                                </option>
                              );
                            })}
                          </select>
                          {errors.CountryID && (
                            <span style={customStyles.errorMsg}>
                              {" "}
                              Please select country
                            </span>
                          )}
                        </div>
                      }
                    </div>
                  }

                  <div style={customPopupDivision.popupinputs}>
                    <p>
                      Start Date <span style={customStyles.span}>*</span>
                    </p>
                    <div>
                      <input
                        type="date"
                        placeholder="Start Date"
                        max="{{maxdate}}"
                        {...register("StartDate", { required: true })}
                        className="form-control "
                      ></input>
                      {errors.StartDate && (
                        <span style={customStyles.errorMsg}>
                          {" "}
                          Please select start date
                        </span>
                      )}
                    </div>
                  </div>

                  <div style={customPopupDivision.popupinputs}>
                    <p>
                      End Date <span style={customStyles.span}>*</span>
                    </p>
                    <div>
                      <input
                        type="date"
                        placeholder="End Date"
                        max="{{maxdate}}"
                        {...register("EndDate", { required: true })}
                        className="form-control "
                      ></input>
                      {errors.EndDate && (
                        <span style={customStyles.errorMsg}>
                          {" "}
                          Please select end date
                        </span>
                      )}
                    </div>
                  </div>

                  <div style={customPopupDivision.popupinputs}>
                    <p>
                      Attachment <span style={customStyles.span}>*</span>
                    </p>
                    <div>
                      <div {...getRootProps()}>
                        <input {...getInputProps()} />
                        {isDragActive ? (
                          <p>Drop the files here ...</p>
                        ) : (
                          <p>
                            Drag 'n' drop some files here, or click to select
                            files
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="d-flex justify-content-center w-100 mt-2 mb-2 pr-2">
                  {actionType == "insert" && (
                    <button className="staffSubmitBtn">Submit</button>
                  )}
                  {actionType == "update" && (
                    <button className="staffSubmitBtn">Update</button>
                  )}
                </div>
              </div>
            </div>
            <br></br>
          </form>

          <div className="row">
            <div className="col-12">
              <table className="table table-hover mb-5">
                <thead className="bg-info text-white ">
                  <tr>
                    <th>Educational Attainment</th>
                    <th>Country</th>
                    <th>Course</th>
                    <th>Major</th>
                    <th>School Name</th>
                    <th>Licenses/Certifications</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                    {/* <th>Attachment</th> */}
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {EducationDetals.map((data, index) => {
                    return (
                      <tr className="text-dark" key={index}>
                        <td>{data.educationType}</td>
                        <td>{data.country}</td>
                        <td>{data.course}</td>
                        <td>{data.major}</td>
                        <td>{data.institutionName}</td>
                        <td>{data.licenseOrCertification}</td>
                        <td>{data.startDate}</td>
                        <td>{data.endDate}</td>
                        {/* <th style={{width:'40%'}}>{data.attachmentEdu}</th> */}
                        <td>{data.status}</td>
                        <td className="d-flex">
                            <button
                              className="staffEditBtn"
                              onClick={editData.bind(this, data.id)}
                            >
                              Edit
                            </button>&nbsp;
                            <button
                              className="staffDeleteBtn"
                              onClick={deleteData.bind(this, data.id)}
                            >
                              Delete
                            </button>
                          </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
