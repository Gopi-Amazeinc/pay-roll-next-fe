import React from "react";
import { useEffect, useState } from "react";
import Styles from "../../../styles/ComponentBulkUpload.module.css"
import axios from "axios";
import { useForm } from "react-hook-form";
import Link from "next/link";
import Swal from "sweetalert2";
import Layout from "@/components/layout/layout";
import { apiService } from "@/services/api.service";
import { useRouter } from "next/router";

const ComponentBulkUploadForm = ({ editData }) => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  const [staff, setStaffData] = useState([]);
  const [component, setComponentData] = useState([]);
  const [payment, setPayment] = useState([]);
  const [actionType, setActionType] = useState("insert");

  useEffect(() => {
    getData();
    const { id } = editData || {};
    if (id) {
      getByID(id);
    } else {
      clearForm();
    }
  }, [1]);

  async function getData() {
    let res = await apiService.commonGetCall("HR/GetAllStaffNew");
    setStaffData(res.data);
  }
 const getByID =async(id)=>{
  const res = await apiService.commonGetCall(
    "Payroll/GetPayrollComponentBulkUploadByID?ID=" + id
  );
  clearForm(res.data[0]);
 }

 function clearForm(userData = null) {
    let details = {
      ID: userData ? userData.id : "",
      EmployeeID: userData ? userData.employeeID : "",
      PayCode: userData ? userData.payCode : "",
      Amount: userData ? userData.amount : "",
      Paymentfrequeicy: userData ? userData.paymentfrequeicy : "",
    };
    reset(details);
    setActionType(userData ? "update" : "insert");
  }
  const onSubmit= async(data)=> {
    if (actionType == "insert") {
    await apiService.commonPostCall("HR/InsertPayrollComponentBulkUpload", data);
    Swal.fire("Data Inserted successfully");
    router.push("/Staff/ComponentBulkUpload")
  } else {
    await apiService.commonPostCall("HR/UpdatePayrollComponentBulkUpload", data);
    Swal.fire("Data Updated successfully");
    router.push("/Staff/ComponentBulkUpload");
  }
  }

  return (
    <Layout>
      <div className="container">
        <div className={Styles.card}>
          <h3 className="text-primary fs-5 mb-2 fw-bold">Staff Add Component Mapping</h3>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row">
              <div className="col-lg-3">
                <label className={Styles.labels}>
                  Staff Name<span style={{ color: "red" }}>*</span>{" "}
                </label>{" "}
                <br />
                <select
                  className={Styles.selector}
                  {...register("EmployeeID", { required: true })}
                >
                  <option value="" className={Styles.options}>
                    Select Staff
                  </option>
                  {staff.map((data) => {
                    return (
                      <option value={data.id} key={data.id}>
                        {data.name}
                      </option>

                    );
                  })}
                </select>
                {errors.EmployeeID && (
                  <p style={{ color: "red" }} className="error">
                    Please select a staff
                  </p>
                )}
              </div>
              <div className="col-lg-3">
                <label className={Styles.labels}>
                  Component<span style={{ color: "red" }}>*</span>
                </label>
                <br />
                <select
                  className={Styles.selector}
                  {...register("PayCode", { required: true })}
                >
                  <option value="">Select Component</option>
                  <option value="test">Test</option>
                  {/* {component.map((data) => {
                    return (
                        
                        <option value={data.id} key={data.id}>
                        {data.short}
                      </option>
                    );
                  })} */}
                </select>
                {errors.PayCode && (
                  <p style={{ color: "red" }} className="error">
                    Please select component
                  </p>
                )}
              </div>
              <div className="col-lg-3">
                <label className={Styles.labels}>
                  Amount<span style={{ color: "red" }}>*</span>{" "}
                </label>
                <br />
                <input
                  type="number"
                  className={Styles.selector}
                  {...register("Amount", { required: true })}
                />
                {errors.Amount && (
                  <p style={{ color: "red" }} className="error">
                    Please enter amount
                  </p>
                )}
              </div>
              <div className="col-lg-3">
                <label className={Styles.labels}>
                  Payment Frequency<span style={{ color: "red" }}>*</span>{" "}
                </label>
                <br />
                <select
                  className={Styles.selector}
                  {...register("Paymentfrequeicy", { required: true })}
                >
                  <option value="">Select Payment Frequency</option>
                  <option value="Recurring Pay Period">Recurring Pay Period</option>
                  <option value="One Time Monthly">One Time Monthly</option>
                  <option value="One Time Yearly">One Time Yearly</option>
                  <option value="Life Time">Life Time</option>

                </select>
                {errors.Paymentfrequeicy && (
                  <p style={{ color: "red" }} className="error">
                    Please select payment frequency
                  </p>
                )}
              </div>

            </div>
            <br />
            <div className="row">
              <div className="col-lg-11">
                <Link href="/Staff/ComponentBulkUpload">
                  <button
                    className="btn btn-primary"
                    style={{ float: "right", marginLeft: "5px" }}
                  >
                    Cancel
                  </button>
                </Link>
                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ float: "right" }}
                >
                  Save
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};
export default ComponentBulkUploadForm;