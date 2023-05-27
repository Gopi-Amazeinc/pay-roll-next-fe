import React from "react";
import { useForm } from "react-hook-form";
import Layout from "@/components/layout/layout.js";
import Link from "next/link";
import axios from "axios";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { apiService } from "@/services/api.service";
import { useRouter } from "next/router";

const AttendanceCorrectionform = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [actionType, setActionType] = useState("insert");

  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  // const handleChangeStartTime = (Stime) => {
  //   debugger
  //   setStartTime(Stime);
  //   setEndTime("");
  // };

  // const handleChangeEndTime = (Etime) => {
  //   debugger
  //   setEndTime(Etime);
  //   return handleTimes(startTime,endTime)
  // };
  const handleChangeStartTime = (event) => {
    const sTime = event.target.value;
    setStartTime(sTime);
    setEndTime("");
  };

  const handleChangeEndTime = (event) => {
    const eTime = event.target.value;
    setEndTime(eTime);
    return handleTimes(startTime, Etime);
  };

  const compareTimes = (startTime, endTime) => {
    const start = new Date(startTime);
    const end = new Date(endTime);

    return start > end;
  };
  const handleTimes = (startTime, endTime) => {
    debugger;
    if (!compareTimes(startTime, endTime)) {
      Swal.fire("Start time must be greater than end time");
      return;
    }
  };
  // const [UserID, setUserIDdata] = useState("")

  // useEffect(() => {
  //     let res = sessionStorage.getItem("asd");
  //     setUserIDdata(res)
  // }, []);

  const onSubmit = async (data) => {
    await apiService.commonPostCall("Payroll/InsertAttendanceCorrection", data);
    Swal.fire("Data Inserted successfully");
    router.push("/Attendance/AttendanceCorrections");
  };

  const clearForm = (existingData = null) => {
    var StafID = sessionStorage.getItem("userID");

    let etty = {
      StaffID: StafID,
      SDate: existingData ? existingData.SDate : "",
      StartTime: existingData ? existingData.StartTime : "",
      EndTime: existingData ? existingData.EndTime : "",
      Comment: existingData ? existingData.Comment : "",
    };
    reset(etty);
    setActionType(existingData ? "update" : "insert");
  };

  useEffect(() => {
    clearForm();
  }, [1]);
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      width: "60%",
    },
    errorMsg: {
      fontSize: "12px",
      fontWeight: "500",
      color: "red",
    },
    inputLabel: {
      fontSize: "16px",
    },
  };
  return (
    <Layout>
      <div className="container">
        <h3 className=" fs-5 mt-3 fw-bold" style={{ color: "#3247d5" }}>
          Add Attendance Correction
        </h3>
        <div className="card p-3 border-0 shadow-lg ">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row">
              <div className="col-lg-3">
                <label>
                  <b> Select Date</b>
                  <i className="text-danger">*</i>
                </label>
                <input
                  type="date"
                  className="form-control"
                  {...register("SDate", { required: true })}
                />
                {errors.SDate && (
                  <p style={customStyles.errorMsg}>Select Valid Date</p>
                )}
              </div>
              <div className="col-lg-3">
                <label>
                  <b> Start Time</b> <i className="text-danger">*</i>
                </label>
                <input
                  type="time"
                  onChange={(e) => setStartTime(e.target.value)}
                  className="form-control"
                  // onChange={(e)=>handleChangeStartTime(e.target.value)}

                  {...register("StartTime", { required: true })}
                />
                {errors.StartTime && (
                  <p style={customStyles.errorMsg}>Select Valid Start Time</p>
                )}
              </div>
              <div className="col-lg-3">
                <label>
                  <b> End Time</b> <i className="text-danger">*</i>
                </label>
                <input
                  type="time"
                  className="form-control"
                  // onChange={(e)=>handleChangeEndTime(e.target.value)}
                  onChange={handleChangeEndTime}
                  {...register("EndTime", { required: true })}
                />

                {errors.EndTime && (
                  <p style={customStyles.errorMsg}>Select Valid End Time</p>
                )}
              </div>
              <div className="col-lg-3">
                <label>
                  <b>Comments </b>
                  <i className="text-danger">*</i>
                </label>
                <textarea
                  rows={6}
                  className="form-control"
<<<<<<< HEAD
                  minLength={10}
                  {...register("Comment", { required: true, })}
=======
                  maxLength={40}
                  {...register("Comment", { required: true })}
                />
                {errors?.Comment?.type === "required" && (
                  <p style={customStyles.errorMsg}>Please Enter Comments</p>
                )}
       
              </div>
            </div>
            <div className="row mt-5">
              <div className="col-lg-8"></div>
              <div className="col-lg-2">
                <Link href="/Attendance/AttendanceCorrections">
                  <button className="close-button">Cancel</button>
                </Link>
              </div>
              <div className="col-lg-2">
                <button type="submit" className=" submit-button">
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default AttendanceCorrectionform;
