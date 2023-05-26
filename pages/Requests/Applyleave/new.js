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
import { useDropzone } from "react-dropzone";
import { useCallback } from "react";

const ApplyLeave = () => {
  const { register, handleSubmit, reset, formState } = useForm();
  const { errors } = formState;
  const [leavetype, setLeaveType] = useState([]);
  const [userID, setUserId] = useState();
  const router = useRouter();
  const [filePath, setFilePath] = useState();
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
    router.push("/Requests/Leaverequest");
  }
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
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-12">
            <h3 className=" fs-5 mt-3 fw-bold" style={{ color: "#3247d5" }}>
             Leave Request
            </h3>
            <div className="card p-3 border-0 shadow-lg  mt-4">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="row">
                  <div className="col-lg-12">
                  </div>
                  <div className="col-lg-2">
                    <label style={{ fontWeight: "bold" }}>
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
                    {errors.LeaveType && <p className="error-message" style={customStyles.errorMsg}>{errors.LeaveType.message}</p>}
                  </div>
                  <div className="col-lg-2">
                    <label style={{ fontWeight: "bold" }}>
                      Leave Reason<i className="text-danger">*</i>
                    </label>
                    <textarea
                      cols="20"
                      rows="1"
                      className="form-control"
                      {...register("LeaveReason", { required: "This field is required" })}
                      placeholder="Leave Reason"
                    ></textarea>
                    {errors.LeaveType && <p className="error-message" style={customStyles.errorMsg}>{errors.LeaveType.message}</p>}
                  </div>
                  <div className="col-lg-2">
                    <label style={{ fontWeight: "bold" }}>
                      Start Date<i className="text-danger">*</i>
                    </label>
                    <input
                      type="date"
                      className="form-control"
                      {...register("SDateOfLeave", { required: "This field is required" })}
                    />
                    {errors.SDateOfLeave && <p className="error-message" style={customStyles.errorMsg}>{errors.SDateOfLeave.message}</p>}
                  </div>
                  <div className="col-lg-2">
                    <label style={{ fontWeight: "bold" }}>
                      End Date<i className="text-danger">*</i>
                    </label>
                    <input
                      type="date"
                      className="form-control"
                      {...register("EDateOfLeave", { required: "This field is required" })}
                    />
                    {errors.EDateOfLeave && <p className="error-message" style={customStyles.errorMsg}>{errors.EDateOfLeave.message}</p>}
                  </div>
                </div>
                <br />
                <div className="row">
                  <div className="col-lg-3">
                    <label style={{ fontWeight: "bold" }}>Attachment</label>
                    {/* <DropZone {...register("MedicalUrl", { required: true })} /> */}
                    <div style={{ border: '2px dashed blue', height: "100px" }}>
                      <div {...getRootProps()}>
                        <input {...getInputProps()}{...register("Attachment", { required: "This field is required" })} />

                        {isDragActive ? (
                          <p>Drop the files here ...</p>
                        ) : (
                          <p style={{ marginTop: "30px", textAlign: "center" }}>
                            Drop the files here ..
                          </p>
                        )}
                      </div>
                    </div>{errors.Attachment && <p className="error-message" style={customStyles.errorMsg}>{errors.Attachment.message}</p>}
                    {/* {errors.MedicalUrl && <p className="error-message" style={{ color: "red" }}>{errors.MedicalUrl.message}</p>} */}
                  </div>
                  <div className="col-lg-2"></div>
                </div>
                <div className="row">
                  <div className="col-lg-8"></div>
                  <div className="col-lg-2">
                    <Link href="/Requests/Leaverequest">
                      <button className="AddButton">
                        Cancel
                      </button>
                    </Link>
                  </div>
                  <div className="col-lg-2" style={{ float: "right" }}>
                    <button type="submit" className="AddButton">
                      Save
                    </button>
                  </div>
                </div>
              </form>
            </div>
            <br />
          </div>
        </div>
      </div>
    </Layout>
  );
};
export default ApplyLeave;
