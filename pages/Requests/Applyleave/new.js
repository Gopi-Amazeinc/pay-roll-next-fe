import Layout from "@/components/layout/layout";
import Link from "next/link";
import ApplyLeaveDashboard from "@/components/Dashboard/Requests/Applyleave/index";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { apiService } from "@/services/api.service";
import { useRouter } from "next/router";
// import Astyle from 'styles//Requests//applyleave.module.css';
import { BsArrowLeftSquare } from "react-icons/bs";
import DropZone from "@/pages/SharedComponent/dropzone";
import { useForm } from "react-hook-form";

const ApplyLeave = () => {
  const { register, handleSubmit, reset, formState } = useForm();
  const { errors } = formState;
  const [leavetype, setLeaveType] = useState([]);
  const [userID, setUserId] = useState();
  const router = useRouter();
  const getDropdowndata = async () => {
    const res = await apiService.commonGetCall("Master/GetLeaveType");
    setLeaveType(res.data);
  };
  useEffect(() => {
    const userid = sessionStorage.getItem("userID");
    setUserId(userid);
    getDropdowndata();
  }, []);

  async function onSubmit(data) {
    let StaffID = sessionStorage.getItem("userID");
    let formData = { ...data, StaffID }
    debugger;
    await apiService.commonPostCall("HR/InsertStaffLeaves", formData);
    Swal.fire({
      icon: "success",
      text: "Leave request was inserted successfully...!",
    });
    sessionStorage.setItem("Sdate", data.SDateOfLeave);
    sessionStorage.setItem("Edate", data.EDateOfLeave);
    console.log(data);
    location.href("/Requests/Leaverequest");
  }
  return (
    <Layout>
      <Link href="/Requests/Leaverequest">
        <BsArrowLeftSquare /> Leave
      </Link>
      <div className="card p-3 border-0 shadow-lg  mt-4">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="row">
            <div className="col-lg-12">
              <h3>Leave Requests</h3>
              <hr />
            </div>

            <div className="col-lg-2">
              <label htmlFor="">
                Leave Type<i className="text-danger">*</i>
              </label>
              <select
                id="Department"
                name="Department"
                className="form-select"
                {...register("LeaveType", { required: "This field is required" })}
              >
                <option value="" disabled="">
                  Select Leave Type
                </option>
                {leavetype.map((data, index) => {
                  return (
                    <option value={data.id} key={data.id}>
                      {data.short}
                    </option>
                  );
                })}
              </select>
              {errors.LeaveType && <p className="error-message" style={{ color: "red" }}>{errors.LeaveType.message}</p>}
            </div>
            <div className="col-lg-2">
              <label htmlFor="">
                Leave Reason<i className="text-danger">*</i>
              </label>
              <textarea
                cols="20"
                rows="1"
                className="form-control"
                {...register("LeaveReason", { required: "This field is required" })}
                placeholder="Leave Reason"
              ></textarea>
              {errors.LeaveType && <p className="error-message" style={{ color: "red" }}>{errors.LeaveType.message}</p>}
            </div>
            <div className="col-lg-2">
              <label htmlFor="">
                Start Date<i className="text-danger">*</i>
              </label>
              <input
                type="date"
                className="form-control"
                {...register("SDateOfLeave", { required: "This field is required" })}
              />
              {errors.SDateOfLeave && <p className="error-message" style={{ color: "red" }}>{errors.SDateOfLeave.message}</p>}
            </div>
            <div className="col-lg-2">
              <label htmlFor="">
                End Date<i className="text-danger">*</i>
              </label>
              <input
                type="date"
                className="form-control"
                {...register("EDateOfLeave", { required: "This field is required" })}
              />
              {errors.EDateOfLeave && <p className="error-message" style={{ color: "red" }}>{errors.EDateOfLeave.message}</p>}
            </div>
            {/* <div className="col-lg-2">
              <label>Staff ID</label>
              <input
                type="text"
                className="form-control"
                value={userID}
                {...register("StaffID")}
                
              />
            </div> */}
          </div>
          <br />
          <div className="row">
            <div className="col-lg-3">
              <label htmlFor="">Attachment</label>
              {/* <DropZone {...register("MedicalUrl", { required: true })} /> */}
              <input
                type="file"
                className="form-control"
                {...register("MedicalUrl")}
              />
              {/* {errors.MedicalUrl && <p className="error-message" style={{ color: "red" }}>{errors.MedicalUrl.message}</p>} */}
            </div>
            <div className="col-lg-2"></div>
          </div>
          <div className="row">
            <div className="col-lg-8"></div>
            <div className="col-lg-2">
              <Link href="/Requests/Leaverequest">
                <button className="submit-button">
                  CANCEL
                </button>
              </Link>
            </div>
            <div className="col-lg-2" style={{ float: "right" }}>
              <button type="submit" className="submit-button">
                SAVE
              </button>
            </div>
          </div>
        </form>
      </div>
      <br />
      {/* <ApplyLeaveDashboard></ApplyLeaveDashboard> */}
    </Layout>
  );
};
export default ApplyLeave;
