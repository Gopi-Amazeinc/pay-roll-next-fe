import React from "react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import Swal from "sweetalert2";
import { apiService } from "@/services/api.service";

function PositionDetails({ data }) {
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
  // const [empID, setEmpID] = useState();

  const [worklocationlist, setworklocationlisttData] = useState([]);
  const [workCountrylistData, setWorkCountryListData] = useState([]);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  const [actionType, setActionType] = useState("insert");
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
      width: "32%",
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
        // ManagerID: data.ManagerID,
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
        StaffID: sessionStorage.getItem("CreatedEmpID"),
      };
      let res = await axios.post(
        hostURL + "/Payroll/InsertPositionDetails",
        Enity
      );
      if (res.data && res.status == 200) {
        // sessionStorage.setItem("InsertStatus", true);
        Swal.fire("Saved successfully!");
      }
    } else {
      let Entity = {
        ID: data.ID,
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
        // ManagerID: data.ManagerID,
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
        StaffID: sessionStorage.getItem("CreatedEmpID"),
      };
      await axios.post(hostURL + "/Payroll/UpdatePositionDetails", Entity);
      Swal.fire("Updated Successfully!")
    }
  }

  useEffect(() => {
    debugger;
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
      "Payroll/GetPositionDetailsByID?ID=" + id
    );
    clearForm(res.data[0]);
  };

  async function getData() {
    debugger;
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

    let res11 = await axios.get(hostURL + "/Master/GetStateType");
    setProvincelistData(res11.data);

    let res12 = await axios.get(hostURL + "/Master/GetCityType");
    setCitylisttData(res12.data);

    let res13 = await axios.get(hostURL + "/Master/GetCountryType");
    setWorkCountryListData(res13.data);

    let res14 = await axios.get(hostURL + "/Master/GetWorkingLocationMaster");
    setworklocationlisttData(res14.data);
  }

  async function clearForm(data = null) {
    let details = {
      ID: data ? data.id : "",
      EmployeeCode: data ? data.employeeCode : "",
      BandID: data ? data.bandID : "",
      PositionID: data ? data.positionID : "",
      Level: data ? data.level : "",
      DesignationID: data ? data.designationID : "",
      PositionLogin: data ? data.positionLogin : "",
      Entity: data ? data.entity : "",
      GroupID: data ? data.groupID : "",
      DivisionID: data ? data.divisionID : "",
      DepartmentID: data ? data.departmentID : "",
      SectionID: data ? data.sectionID : "",
      // ManagerID: data ? data.managerID : "",
      NextLevelManagerID: data ? data.nextLevelManagerID : "",
      SAPVendorNo: data ? data.sapVendorNo : "",
      WorkArrangement: data ? data.workArrangement : "",
      WorksiteCountryID: data ? data.worksiteCountryID : "",
      WorksiteProvinceID: data ? data.worksiteProvinceID : "",
      WorksiteCityID: data ? data.worksiteCityID : "",
      WorksiteLocationID: data ? data.worksiteLocationID : "",
      EmployementTypeID: data ? data.employementTypeID : "",
      EmploymentStatus: data ? data.employmentStatus : "",
      HiredDate: data ? data.hiredDate : "",
      ConfirmationDueDate: data ? data.confirmationDueDate : "",
      ProbationStartDate: data ? data.probationStartDate : "",
      ProbationEndDate: data ? data.probationEndDate : "",
      StaffID: sessionStorage.getItem("CreatedEmpID"),
    };
    reset(details);
    setActionType(data ? "update" : "insert");
  }
  return (
    <div style={customStyles}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="container-fluid">
          <div className="card p-3 border-0">
            <div className="row">
              <div className="col-12">
                <h6>Position Details</h6>
                <hr></hr>
                <div style={customPopupDivision.popupcontent}>
                  <div style={customPopupDivision.popupinputs}>
                    <p>
                      Employee ID<span style={customStyles.span}>*</span>
                    </p>
                    <div>
                      <input
                        type="text"
                        placeholder="Employee ID"
                        {...register("EmployeeCode", { required: true })}
                        className="form-control "
                      ></input>
                      {errors.EmployeeCode && (
                        <span style={customStyles.errorMsg}>
                          {" "}
                          Please enter Employee ID *
                        </span>
                      )}
                    </div>
                  </div>
                  {
                    <div style={customPopupDivision.popupinputs}>
                      <p>
                        Position Title<span style={customStyles.span}>*</span>
                      </p>
                      {
                        <div>
                          <select
                            className="form-select"
                            {...register("PositionID", { required: true })}
                            style={customStyles.inputLabel}
                          >
                            <option value="">Select Position</option>
                            {rolelistData.map((data, index) => {
                              return (
                                <option key={data.id} value={data.id}>
                                  {data.short}
                                </option>
                              );
                            })}
                          </select>
                          {errors.PositionID && (
                            <span style={customStyles.errorMsg}>
                              {" "}
                              Please select position
                            </span>
                          )}
                        </div>
                      }
                    </div>
                  }

                  <div style={customPopupDivision.popupinputs}>
                    <p>
                      Band<span style={customStyles.span}>*</span>
                    </p>
                    {
                      <div>
                        <select
                          className="form-select"
                          {...register("BandID", { required: true })}
                          style={customStyles.inputLabel}
                        >
                          <option value="">Select Band </option>
                          {bandlistData.map((data, index) => {
                            return (
                              <option key={data.id} value={data.id}>
                                {data.short}
                              </option>
                            );
                          })}
                        </select>
                        {errors.BandID && (
                          <span style={customStyles.errorMsg}>
                            {" "}
                            Please select band
                          </span>
                        )}
                      </div>
                    }
                  </div>

                  {
                    <div style={customPopupDivision.popupinputs}>
                      <p>
                        Level<span style={customStyles.span}>*</span>
                      </p>
                      {
                        <div>
                          <select
                            className="form-control "
                            {...register("Level", { required: true })}
                            style={customStyles.inputLabel}
                          >
                            <option value="">Select Level</option>
                            {levellistData.map((data) => {
                              return (
                                <option key={data.id} value={data.id}>
                                  {data.short}
                                </option>
                              );
                            })}
                          </select>
                          {errors.Level && (
                            <span style={customStyles.errorMsg}>
                              PLease select level
                            </span>
                          )}
                        </div>
                      }
                    </div>
                  }

                  {
                    <div style={customPopupDivision.popupinputs}>
                      <p>
                        Designation<span style={customStyles.span}>*</span>
                      </p>
                      {
                        <div>
                          <select
                            className="form-select"
                            {...register("DesignationID", { required: true })}
                            style={customStyles.inputLabel}
                          >
                            <option value="">Select Designation</option>
                            {designationlistData.map((data) => {
                              return (
                                <option key={data.id} value={data.id}>
                                  {data.short}
                                </option>
                              );
                            })}
                          </select>
                          {errors.DesignationID && (
                            <span style={customStyles.errorMsg}>
                              PLease select designation
                            </span>
                          )}
                        </div>
                      }
                    </div>
                  }

                  {
                    <div style={customPopupDivision.popupinputs}>
                      <p>
                        Login Type<span style={customStyles.span}>*</span>
                      </p>
                      {
                        <div>
                          <select
                            className="form-select"
                            {...register("PositionLogin", { required: true })}
                            style={customStyles.inputLabel}
                          >
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
                          {errors.PositionLogin && (
                            <span style={customStyles.errorMsg}>
                              Please select login type
                            </span>
                          )}
                        </div>
                      }
                    </div>
                  }
                </div>
              </div>
            </div>
          </div>
          <br></br>

          <div className="card p-3 border-0">
            <div className="row">
              <div className="col-12">
                <h6>Organization Hierarchy</h6>
                <hr></hr>
                <div style={customPopupDivision.popupcontent}>
                  {
                    <div style={customPopupDivision.popupinputs}>
                      <p>
                        Entity<span style={customStyles.span}>*</span>
                      </p>
                      {
                        <div>
                          <select
                            className="form-select"
                            {...register("Entity", { required: true })}
                            style={customStyles.inputLabel}
                          >
                            <option value="">Select Entity</option>
                            <option value="Ayala Land Premier Inc.">
                              Ayala Land Premier Inc.
                            </option>
                            <option value="Avida Land Corporation">
                              Avida Land Corporation
                            </option>
                            <option value="Ayalaland Offices, Inc.">
                              Ayalaland Offices, Inc.
                            </option>
                            <option value="Ayala Land Inc.">
                              Ayala Land Inc.
                            </option>
                          </select>
                          {errors.Entity && (
                            <span style={customStyles.errorMsg}>
                              Please select entity{" "}
                            </span>
                          )}
                        </div>
                      }
                    </div>
                  }

                  <div style={customPopupDivision.popupinputs}>
                    <p>
                      Group <span style={customStyles.span}>*</span>
                    </p>
                    {
                      <div>
                        <select
                          className="form-select"
                          {...register("GroupID", { required: true })}
                          style={customStyles.inputLabel}
                        >
                          <option value="">Select Group </option>
                          {grouplistData.map((data, index) => {
                            return (
                              <option key={data.id} value={data.id}>
                                {data.short}
                              </option>
                            );
                          })}
                        </select>
                        {errors.GroupID && (
                          <span style={customStyles.errorMsg}>
                            {" "}
                            Please select group
                          </span>
                        )}
                      </div>
                    }
                  </div>

                  {
                    <div style={customPopupDivision.popupinputs}>
                      <p>
                        Division<span style={customStyles.span}>*</span>
                      </p>
                      {
                        <div>
                          <select
                            className="form-select "
                            {...register("DivisionID", { required: true })}
                            style={customStyles.inputLabel}
                          >
                            <option value="">Select Division </option>
                            {divisionlistData.map((data, index) => {
                              return (
                                <option key={data.id} value={data.id}>
                                  {data.short}
                                </option>
                              );
                            })}
                          </select>
                          {errors.DivisionID && (
                            <span style={customStyles.errorMsg}>
                              {" "}
                              Select Division{" "}
                            </span>
                          )}
                        </div>
                      }
                    </div>
                  }

                  {
                    <div style={customPopupDivision.popupinputs}>
                      <p>
                        Department<span style={customStyles.span}>*</span>
                      </p>
                      {
                        <div>
                          <select
                            className="form-select "
                            {...register("DepartmentID", { required: true })}
                            style={customStyles.inputLabel}
                          >
                            <option value="">Select Department</option>
                            {departmentlistData.map((data, index) => {
                              return (
                                <option key={data.id} value={data.id}>
                                  {data.department_name}
                                </option>
                              );
                            })}
                          </select>
                          {errors.DepartmentID && (
                            <span style={customStyles.errorMsg}>
                              Please select department
                            </span>
                          )}
                        </div>
                      }
                    </div>
                  }

                  {
                    <div style={customPopupDivision.popupinputs}>
                      <p>
                        Section<span style={customStyles.span}>*</span>
                      </p>
                      {
                        <div>
                          <select
                            className="form-select"
                            {...register("SectionID", { required: true })}
                            style={customStyles.inputLabel}
                          >
                            <option value="">Select Section</option>
                            {sectionlistData.map((data, index) => {
                              return (
                                <option key={data.id} value={data.id}>
                                  {data.sort}
                                </option>
                              );
                            })}
                          </select>
                          {errors.SectionID && (
                            <span style={customStyles.errorMsg}>
                              Please select section
                            </span>
                          )}
                        </div>
                      }
                    </div>
                  }

                  {/* {
                    <div style={customPopupDivision.popupinputs}>
                      <p>
                        Immediate Manager
                        <span style={customStyles.span}>*</span>
                      </p>
                      {
                        <div>
                          <select
                            className="form-select"
                            {...register("ManagerID", { required: true })}
                            style={customStyles.inputLabel}
                          >
                            <option value="">Select Immediate Manager</option>
                            {stafflistData.map((data, index) => {
                              return (
                                <option key={data.id} value={data.id}>
                                  {data.name}
                                </option>
                              );
                            })}
                          </select>
                          {errors.ManagerID && (
                            <span style={customStyles.errorMsg}>
                              Please select immediate manager
                            </span>
                          )}
                        </div>
                      }
                    </div>
                  } */}

                  {
                    <div style={customPopupDivision.popupinputs}>
                      <p>
                        Next Level Manager
                        <span style={customStyles.span}>*</span>
                      </p>
                      {
                        <div>
                          <select
                            className="form-select "
                            {...register("NextLevelManagerID", {
                              required: true,
                            })}
                            style={customStyles.inputLabel}
                          >
                            <option value="">Select Next Level Manager</option>
                            {stafflistData.map((data, index) => {
                              return (
                                <option key={data.id} value={data.id}>
                                  {data.name}
                                </option>
                              );
                            })}
                          </select>
                          {errors.NextLevelManagerID && (
                            <span style={customStyles.errorMsg}>
                              Please select next level manager
                            </span>
                          )}
                        </div>
                      }
                    </div>
                  }

                  <div style={customPopupDivision.popupinputs}>
                    <p>
                      SAP Vendor Code<span style={customStyles.span}>*</span>
                    </p>
                    <div>
                      <input
                        type="text"
                        placeholder="SAP Vendor Code "
                        {...register("SAPVendorNo", { required: true })}
                        className="form-control "
                      ></input>
                      {errors.SAPVendorNo && (
                        <span style={customStyles.errorMsg}>
                          {" "}
                          Please SAP vendor code
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <br></br>

          <div className="card p-3 border-0">
            <div className="row">
              <div className="col-12">
                <h6>Work Location</h6>
                <hr></hr>
                <div style={customPopupDivision.popupcontent}>
                  {
                    <div style={customPopupDivision.popupinputs}>
                      <p>
                        Work Arrangement{" "}
                        <span style={customStyles.span}>*</span>
                      </p>
                      {
                        <div>
                          <select
                            className="form-select "
                            {...register("WorkArrangement", { required: true })}
                            style={customStyles.inputLabel}
                          >
                            <option value="">Select Work Arrangement </option>
                            <option value="Office Base">Office-based</option>
                            <option value="Site Base">Site-based</option>
                          </select>
                          {errors.WorkArrangement && (
                            <span style={customStyles.errorMsg}>
                              Please select work arrangement{" "}
                            </span>
                          )}
                        </div>
                      }
                    </div>
                  }

                  <div style={customPopupDivision.popupinputs}>
                    <p>
                      Worksite Country <span style={customStyles.span}>*</span>
                    </p>
                    {
                      <div>
                        <select
                          className="form-select "
                          {...register("WorksiteCountryID", { required: true })}
                          style={customStyles.inputLabel}
                        >
                          <option value="">Select Worksite Country </option>
                          {workCountrylistData.map((data, index) => {
                            return (
                              <option key={data.id} value={data.id}>
                                {data.short}
                              </option>
                            );
                          })}
                        </select>
                        {errors.WorksiteCountryID && (
                          <span style={customStyles.errorMsg}>
                            {" "}
                            Please select worksite country{" "}
                          </span>
                        )}
                      </div>
                    }
                  </div>

                  {
                    <div style={customPopupDivision.popupinputs}>
                      <p>
                        Worksite Province{" "}
                        <span style={customStyles.span}>*</span>
                      </p>
                      {
                        <div>
                          <select
                            className="form-select "
                            {...register("WorksiteProvinceID", {
                              required: true,
                            })}
                            style={customStyles.inputLabel}
                          >
                            <option value="">Select Province </option>
                            {Provincelist.map((data, index) => {
                              return (
                                <option key={data.id} value={data.id}>
                                  {data.short}
                                </option>
                              );
                            })}
                          </select>
                          {errors.WorksiteProvinceID && (
                            <span style={customStyles.errorMsg}>
                              {" "}
                              Select worksite province{" "}
                            </span>
                          )}
                        </div>
                      }
                    </div>
                  }

                  {
                    <div style={customPopupDivision.popupinputs}>
                      <p>
                        Worksite City<span style={customStyles.span}>*</span>
                      </p>
                      {
                        <div>
                          <select
                            className="form-select "
                            {...register("WorksiteCityID", { required: true })}
                            style={customStyles.inputLabel}
                          >
                            <option value="">Select City</option>
                            {Citylist.map((data, index) => {
                              return (
                                <option key={data.id} value={data.id}>
                                  {data.short}
                                </option>
                              );
                            })}
                          </select>
                          {errors.WorksiteCityID && (
                            <span style={customStyles.errorMsg}>
                              Please select worksite city
                            </span>
                          )}
                        </div>
                      }
                    </div>
                  }

                  {
                    <div style={customPopupDivision.popupinputs}>
                      <p>
                        Working Location<span style={customStyles.span}>*</span>
                      </p>
                      {
                        <div>
                          <select
                            className="form-select "
                            {...register("WorksiteLocationID", {
                              required: true,
                            })}
                            style={customStyles.inputLabel}
                          >
                            <option value="">Select Working Location</option>
                            {worklocationlist.map((data, index) => {
                              return (
                                <option key={data.id} value={data.id}>
                                  {data.short}
                                </option>
                              );
                            })}
                          </select>
                          {errors.WorksiteLocationID && (
                            <span style={customStyles.errorMsg}>
                              Please select working location
                            </span>
                          )}
                        </div>
                      }
                    </div>
                  }

                  {<div style={customPopupDivision.popupinputs}>{}</div>}
                </div>
              </div>
            </div>
          </div>
          <br></br>
          <div className="card p-3 border-0">
            <div className="row">
              <div className="col-12">
                <h6>Employment Details</h6>
                <hr />
                <div style={customPopupDivision.popupcontent}>
                  {
                    <div style={customPopupDivision.popupinputs}>
                      <p>
                        Employment Type<span style={customStyles.span}>*</span>
                      </p>
                      {
                        <div>
                          <select
                            className="form-select "
                            {...register("EmployementTypeID", {
                              required: true,
                            })}
                            style={customStyles.inputLabel}
                          >
                            <option value="">Select Type</option>
                            <option value="1">Consultant</option>
                            <option value="2">Project Hire</option>
                            <option value="3">Regular</option>
                          </select>
                          {errors.EmployementTypeID && (
                            <span style={customStyles.errorMsg}>
                              Please select employment type{" "}
                            </span>
                          )}
                        </div>
                      }
                    </div>
                  }

                  {
                    <div style={customPopupDivision.popupinputs}>
                      <p>
                        Employment Status
                        <span style={customStyles.span}>*</span>
                      </p>
                      {
                        <div>
                          <select
                            className="form-select "
                            {...register("EmploymentStatus", {
                              required: true,
                            })}
                            style={customStyles.inputLabel}
                          >
                            <option value="">Select Status </option>
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                          </select>
                          {errors.EmploymentStatus && (
                            <span style={customStyles.errorMsg}>
                              Please select employment status
                            </span>
                          )}
                        </div>
                      }
                    </div>
                  }

                  <div style={customPopupDivision.popupinputs}>
                    <p>
                      Hired Date<span style={customStyles.span}>*</span>
                    </p>
                    <div>
                      <input
                        type="date"
                        {...register("HiredDate", { required: true })}
                        className="form-control "
                      ></input>
                      {errors.HiredDate && (
                        <span style={customStyles.errorMsg}>
                          {" "}
                          Please enter hired date
                        </span>
                      )}
                    </div>
                  </div>

                  <div style={customPopupDivision.popupinputs}>
                    <p>
                      Confirmation Due Date
                      <span style={customStyles.span}>*</span>
                    </p>
                    <div>
                      <input
                        type="date"
                        {...register("ConfirmationDueDate", { required: true })}
                        className="form-control "
                      ></input>
                      {errors.ConfirmationDueDate && (
                        <span style={customStyles.errorMsg}>
                          {" "}
                          Please enter confirmation due date
                        </span>
                      )}
                    </div>
                  </div>

                  <div style={customPopupDivision.popupinputs}>
                    <p>
                      Probation Start Date
                      <span style={customStyles.span}>*</span>
                    </p>
                    <div>
                      <input
                        type="date"
                        {...register("ProbationStartDate", { required: true })}
                        className="form-control "
                      ></input>
                      {errors.ProbationStartDate && (
                        <span style={customStyles.errorMsg}>
                          {" "}
                          Please enter start date
                        </span>
                      )}
                    </div>
                  </div>

                  <div style={customPopupDivision.popupinputs}>
                    <p>
                      Probation End Date<span style={customStyles.span}>*</span>
                    </p>
                    <div>
                      <input
                        type="date"
                        placeholder="ProbationEndDate"
                        {...register("ProbationEndDate", { required: true })}
                        className="form-control "
                      ></input>
                      {errors.ProbationEndDate && (
                        <span style={customStyles.errorMsg}>
                          {" "}
                          Please enter probation end date
                        </span>
                      )}
                    </div>
                  </div>

                  <div style={customPopupDivision.popupinputs}></div>
                </div>
              </div>
            </div>
          </div>
          <br></br>

          <div className="d-flex justify-content-center w-100 mt-2 mb-2 pr-2">
            {actionType == "insert" && (
              <button className="staffSubmitBtn">Submit</button>
            )}
            {actionType == "update" && (
              <button className="staffSubmitBtn">Update</button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}
export default PositionDetails;
