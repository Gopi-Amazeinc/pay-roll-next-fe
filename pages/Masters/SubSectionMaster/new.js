import React from "react";
import { useForm } from "react-hook-form";
import Layout from '@/components/layout/layout.js';
import { useEffect, useState } from "react";
import SubsectionFormStyles from "../../../styles/SubSectionMasterForm.module.css";
import Link from "next/link";
import axios from "axios";
import Swal from "sweetalert2";

const SubSectionMasterForm = ({ editData }) => {
  let hostURL = process.env.NEXT_PUBLIC_API_HOST_URL;
  const [actionType, setActionType] = useState("insert");
  // form validation rules
  const { register, handleSubmit, reset, formState } = useForm();
  const { errors } = formState;

  // get functions to build form with useForm() hook
  useEffect(() => {
    const getSubSectionMasterList = async () => {
      if (editData == "") {
        clearForm();
      } else {
        clearForm(editData);
      }
    };
    getSubSectionMasterList();
  }, []);

  const onSubmit = async (data) => {
    console.log(data);
    if (actionType == "insert") {
      await axios.post(hostURL + "Master/InsertSubSectionMaster", data);
      Swal.fire("SubSectionMaster Inserted succefully!");
      location.href = "/Masters/SubSectionMaster";
    } else {
      let res = await axios.post(hostURL + "Master/UpdateSubSectionMaster", data);
      sessionStorage.removeItem("id");
      Swal.fire("SubSectionMaster updated succefully!");
      location.href = "/Masters/SubSectionMaster";
    }
  };
  const clearForm = (existingData = null) => {
    let etty = {
      ID: existingData ? existingData.id : "",
      Short: existingData ? existingData.short : "",
      Description: existingData ? existingData.description : "",
    };
    reset(etty);
    setActionType(existingData ? "update" : "insert");
  };
  const customStyles = {
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
        <div className="col-md-12">
          <div className="row">
            <div className="col-lg-2">
              <br />
              <h3 className="Heading">
                SubSection Master
              </h3>
            </div>
            <div className="col-lg-8"></div>
            <div className="col-lg-2"></div>
          </div>
          <br />
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="card border-0  mx-0 p-3">
              <div className="row">
                <div className="col-md-2">
                  <label style={customStyles.inputLabel}>
                    Name<span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Name"
                    {...register("Short", { required: true })}
                  ></input>
                  {errors.Short && (
                    <span style={customStyles.errorMsg}>
                      Please Enter Name
                    </span>
                  )}
                </div>

                <div className="col-md-4">
                  <label style={customStyles.inputLabel}>
                    {" "}
                    Description<span style={{ color: "red" }}>*</span>
                  </label>
                  <textarea
                    className="form-control"
                    name="Description"
                    rows="3"
                    type="text"
                    {...register("Description", { required: true })}
                    placeholder="Description"
                  />
                  {errors.Description && (
                    <span style={customStyles.errorMsg}>
                      Please Enter Description
                    </span>
                  )}
                </div>
              </div>

              <div className="row p-2">
                <div className="col-lg-8"></div>
                <div className="col-lg-2">
                  <Link href="/Masters/SubSectionMaster">
                    <button className="AddButton">
                      Cancel
                    </button>
                  </Link>
                </div>
                <div className="col-lg-2">
                  {actionType == "insert" && (
                    <button
                      type="submit"
                      className="AddButton"
                    >
                      Save
                    </button>
                  )}
                  {actionType == "update" && (
                    <button
                      type="submit"
                      className="AddButton"
                    >
                      Update
                    </button>
                  )}
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default SubSectionMasterForm;
