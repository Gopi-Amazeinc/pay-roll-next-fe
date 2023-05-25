import React from "react";
import { useEffect, useState } from "react";
import Layout from "../../../components/layout/layout";
import { useForm } from "react-hook-form";
import Link from "next/link";
import axios from "axios";
import Swal from "sweetalert2";
import { apiService } from "@/services/api.service";
import { useRouter } from "next/router";

const AddStaffSalaryForm = ({ editData }) => {
  const router = useRouter();

  const { register, handleSubmit, reset, formState } = useForm();
  const [Staff, setStaff] = useState([]);
  const { errors } = formState;

  let [actionType, setActionType] = useState("insert");

  useEffect(() => {
    getData();
    const { id } = editData || {};
    if (id) {
      getByID(id);
    } else {
      clearForm();
    }
  }, [1]);

  const getData = async () => {
    let res = await apiService.commonGetCall("HR/GetAllStaffNew"); // This API is used for fetch the  data for Dropdown
    setStaff(res.data);
  };
  const getByID = async (id) => {
    debugger;
    const res = await apiService.commonGetCall(
      "Payroll/GetStaffSalaryByID?ID=" + id
    );
    clearForm(res.data[0]);
  };

  function clearForm(staffSalary = null) {
    let details = {
      ID: staffSalary ? staffSalary.id : "",
      StaffID: staffSalary ? staffSalary.staffID : "",
      BasicSalary: staffSalary ? staffSalary.basicSalary : "",
      EffectiveDate: staffSalary ? staffSalary.effectiveDate : "",
      WorkDaysInMonth: staffSalary ? staffSalary.workDaysInMonth : "",
      WorkHoursInDay: staffSalary ? staffSalary.workHoursInDay : "",
      HourlyRate: staffSalary ? staffSalary.hourlyRate : "",
      DailyRate: staffSalary ? staffSalary.dailyRate : "",
    };
    reset(details);
    setActionType(staffSalary ? "update" : "insert");
  }

  const onSubmit = async (data) => {
    debugger;
    if (actionType == "insert") {
      let Entity = {
        StaffID: data.StaffID,
        BasicSalary: data.BasicSalary,
        EffectiveDate: data.EffectiveDate,
        WorkDaysInMonth: data.WorkDaysInMonth,
        WorkHoursInDay: data.WorkHoursInDay,
        HourlyRate: data.HourlyRate,
        DailyRate: data.DailyRate,
      };
      await apiService.commonPostCall("Payroll/InsertStaffSalary", Entity);
      Swal.fire({ icon: "success", text: "Data successfully added" });
      // router.push("Staff/StaffSalary");
    } else {
      let Entity = {
        ID: data.ID,
        StaffID: data.StaffID,
        BasicSalary: data.BasicSalary,
        EffectiveDate: data.EffectiveDate,
        WorkDaysInMonth: data.WorkDaysInMonth,
        WorkHoursInDay: data.WorkHoursInDay,
        HourlyRate: data.HourlyRate,
        DailyRate: data.DailyRate,
      };
      await apiService.commonPostCall("Payroll/UpdateStaffSalary", Entity);
      Swal.fire({ icon: "success", text: "Data updated successfully" });
      // router.push("Staff/StaffSalary");
    }
  };
  const customStyles = {
    span: {
      color: "red",
    },
    errorMsg: {
      fontSize: "12px",
      fontWeight: "500",
      color: "red",
    },
  };
  return (
    <Layout>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="container-fluid">
          <br></br>
          <h4 className="Heading">Salary Details</h4>
          <div className="card shadow p-3">
            <div className="row">
              <div className="col-lg-3">
                <label>
                  Staff<span style={customStyles.span}>*</span>
                </label>
                <select
                  id="Staff"
                  name="Staff"
                  className="form-select"
                  {...register("StaffID", { required: true })}
                >
                  <option value="" disabled="">
                    Select staff
                  </option>
                  {Staff.map((data, index) => {
                    return (
                      <option value={data.id} key={data.id}>
                        {data.name}
                      </option>
                    );
                  })}
                </select>
                {errors.StaffID && (
                  <span style={customStyles.errorMsg}>Please select staff</span>
                )}
              </div>
              <div className="col-lg-3">
                <label>
                  Basic Salary<span style={customStyles.span}>*</span>
                </label>
                <div>
                  <input
                    {...register("BasicSalary")}
                    type="number"
                    placeholder="Basic Salary"
                    className="form-control"
                  />
                  {errors.BasicSalary && (
                    <span style={customStyles.errorMsg}>
                      Please enter basic salary
                    </span>
                  )}
                </div>
              </div>
              <div className="col-lg-3">
                <label>
                  Effective Date<span style={customStyles.span}>*</span>
                </label>
                <input
                  {...register("EffectiveDate")}
                  type="date"
                  className="form-control"
                />
                {errors.EffectiveDate && (
                  <span style={customStyles.errorMsg}>
                    {" "}
                    Please select effective date
                  </span>
                )}
              </div>
              <div className="col-lg-3">
                <label>
                  Working Days In Month<span style={customStyles.span}>*</span>
                </label>
                <input
                  {...register("WorkDaysInMonth")}
                  type="number"
                  placeholder="Working Days In Month"
                  className="form-control "
                />
                {errors.WorkDaysInMonth && (
                  <span style={customStyles.errorMsg}>
                    {" "}
                    Please enter work days in a month
                  </span>
                )}
              </div>
            </div>
            <br></br>
            <div className="row">
              <div className="col-lg-3">
                <label>
                  Working Hours In Day<span style={customStyles.span}>*</span>
                </label>
                <input
                  {...register("WorkHoursInDay")}
                  type="number"
                  placeholder="Working Hours In Day"
                  className="form-control"
                />
                {errors.WorkDaysInMonth && (
                  <span style={customStyles.errorMsg}>
                    {" "}
                    Please enter work hours in a day
                  </span>
                )}
              </div>
              <div className="col-lg-3">
                <label>
                  Hourly Rate<span style={customStyles.span}>*</span>
                </label>
                <input
                  {...register("HourlyRate")}
                  type="number"
                  placeholder="Hourly Rate"
                  className="form-control "
                />
                {errors.HourlyRate && (
                  <span style={customStyles.errorMsg}>
                    {" "}
                    Please enter hourly rate
                  </span>
                )}
              </div>
              <div className="col-lg-3">
                <label>
                  Daily Rate<span style={customStyles.span}>*</span>
                </label>
                <input
                  {...register("DailyRate")}
                  type="number"
                  placeholder="Daily Rate"
                  className="form-control "
                />
                {errors.DailyRate && (
                  <span style={customStyles.errorMsg}>
                    {" "}
                    Please enter daily rate
                  </span>
                )}
              </div>
            </div>
            <br></br>
            <div className="row mt-3">
              <div className="col-lg-8"></div>
              <div className="col-lg-2">
                <Link href="/Staff/StaffSalary">
                  <button className="AddButton">Cancel</button>
                </Link>
              </div>
              <div className="col-lg-2">
                {actionType == "insert" && (
                  <button type="submit" className="AddButton">
                    Save
                  </button>
                )}
                {actionType == "update" && (
                  <button type="submit" className="AddButton">
                    Update
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </form>
    </Layout>
  );
};

export default AddStaffSalaryForm;
