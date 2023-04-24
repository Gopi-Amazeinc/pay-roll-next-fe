import React from "react";
import { useForm } from "react-hook-form";
import Layout from "@/Components/layout";
import { useEffect, useState } from "react";
import SubsectionFormStyles from "../../styles/SubSectionMasterForm.module.css";
import Link from "next/link";
import axios from "axios";
import Swal from "sweetalert2";

const SubSectionMasterForm = () => {
  let hostURL = process.env.NEXT_PUBLIC_API_HOST_URL;
  const [actionType, setActionType] = useState("insert");
  // form validation rules
  const { register, handleSubmit, reset, formState } = useForm();
  const { errors } = formState;

  // get functions to build form with useForm() hook
  useEffect(() => {
    const getSubSectionMasterList = async () => {
      debugger;
      const id = sessionStorage.getItem("id");
      if (id) {
        const response = await axios.get(
          hostURL + "Master/GetSubSectionMasterByID?ID=" + id
        );
        clearForm(response.data[0]);
      } else {
        clearForm();
      }
    };
    getSubSectionMasterList();
  }, [1]);

  const onSubmit = async (data) => {
    debugger;
    console.log(data);
    if (actionType == "insert") {
      await axios.post(hostURL + "Master/InsertSubSectionMaster", data);
      Swal.fire("SubSectionMaster Inserted succefully!");
      location.href = "/Masters/subsectionmaster";
    } else {
      let res = await axios.post(hostURL + "Master/UpdateSubSectionMaster", data);
      sessionStorage.removeItem("id");
      Swal.fire("SubSectionMaster updated succefully!");
      location.href = "/Masters/subsectionmaster";
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
      <div>
        <div className={SubsectionFormStyles.row}>
          <div className="col-md-12">
            <div className="row">
              <div className="col-lg-2">
                <br />
                <h3 className="text-primary fs-5 mt-3 fw-bold">
                  SubSection Master
                </h3>
              </div>
              <div className="col-lg-8"></div>
              <div className="col-lg-2"></div>
            </div>
            <br />
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className={SubsectionFormStyles.card}>
                <div className="row">
                  <div className="col-md-2">
                    <label className="fw-bold" style={customStyles.inputLabel}>
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
                    <label className="fw-bold" style={customStyles.inputLabel}>
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
              </div>

              <br />
              <br />
              <div className="row">
                <div className="col-lg-7"></div>
                <div className="col-lg-2">
                  <Link href="/Masters/subsectionmaster">
                    <button className={SubsectionFormStyles.button}>
                      Cancel
                    </button>
                  </Link>
                </div>
                <div className="col-lg-2">
                  {actionType == "insert" && (
                    <button
                      type="submit"
                      className={SubsectionFormStyles.button}
                    >
                      Save
                    </button>
                  )}
                  {actionType == "update" && (
                    <button
                      type="submit"
                      className={SubsectionFormStyles.button}
                    >
                      Update
                    </button>
                  )}
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SubSectionMasterForm;
