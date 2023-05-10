import React, { useState, useEffect } from "react";
import Styles from "../../../styles/statemasterdashboard.module.css";
import { useForm } from "react-hook-form";
import Layout from '@/components/layout/layout.js';
import Link from "next/link";
import Swal from "sweetalert2";
import { apiService } from "@/services/api.service";
import { useRouter } from "next/router";
function StateMasterForm({editData}) {
  
  const [country, setCountryData] = useState([]);
  const { register, handleSubmit, reset, formState } = useForm();
  const { errors } = formState;
  const router = useRouter();
  const [actionType, setActionType] = useState("insert");

  const onSubmit = async (data) => {
    if (actionType == "insert") {
      await apiService.commonPostCall("Master/InsertStateType", data);
      Swal.fire("Data Inserted successfully");
      router.push("/Masters/StateMaster");
    } else {
      debugger
      await apiService.commonPostCall("Master/UpdateStateType", data);
      Swal.fire("Data Updated successfully");
      router.push("/Masters/StateMaster");
    }
  };

  const getMasters = async () => {
    const [countryRes] = await Promise.all([
      apiService.commonGetMasters("Master/GetCountryType"),
    ]);
    setCountryData(countryRes.data);
  };

  function clearForm(existingData = null) {
    let etty = {
      "ID": existingData ? existingData.id : "",
      "Short": existingData ? existingData.short : "",
      "Description": existingData ? existingData.description : "",
      "CountryID": existingData ? existingData.countryID : "",
    };
    reset(etty);
    setActionType(existingData ? "update" : "insert");
  }

  useEffect(() => {
    const { id } = editData || {};
    if (id) {
      // This API is used to fetch the data from BarangayMaster ByID table
      getStateMasterByID(id);
    } else {
      clearForm();
    }
    getMasters();
  }, []);

  const getStateMasterByID = async (id) => {
    const res = await apiService.commonGetCall(
      "Master/GetStateTypeByID?ID=" + id
    );
    clearForm(res.data[0]);
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
      <div>
        <h3 className="Heading fs-5 mt-3">Province Details</h3>
        <div className="card p-3 border-0 shadow rounded-3 mt-4 mx-0">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row">
              <div className="col-lg-3">
                <p>
                  Country<i className="text-danger">*</i>
                </p>
                <select
                  className="form-control"
                  {...register("CountryID", { required: true })}
                >
                  <option value="">Select Country</option>
                  {country.map((data) => {
                    return (
                      <option value={data.id} key={data.id}>
                        {data.short}
                      </option>
                    );
                  })}
                </select>
                {errors.CountryID && (
                  <span style={customStyles.errorMsg}>
                    Please select country
                  </span>
                )}
              </div>

              <div className="col-lg-3">
                <p>
                  Province<i className="text-danger">*</i>
                </p>
                <input
                  name="Short"
                  className="form-control"
                  type="text"
                  {...register("Short", { required: true })}
                  placeholder="Province"
                />
                <div>
                  {errors.Short && (
                    <span style={customStyles.errorMsg}>
                      Please enter province name
                    </span>
                  )}
                </div>
              </div>

              <div className="col-lg-4">
                <p>
                  Description<i className="text-danger">*</i>
                </p>
                <textarea
                  name="Description"
                  className="form-control"
                  {...register("Description", { required: true })}
                  placeholder="Description"
                />
                <div>
                  {errors.Description && (
                    <span style={customStyles.errorMsg}>
                      Please enter description
                    </span>
                  )}
                </div>
              </div>
            </div>
            <br></br>
            <div className="row mx-0">
              <div className="col-lg-8"></div>
              <div className="col-lg-2">
                <Link href="/Masters/StateMaster">
                  <button
                    type="button"
                    className="btn common-edit"
                    id={Styles.btn}
                  >
                    Close
                  </button>
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
          </form>
        </div>
      </div>
    </Layout>
  );
}

export default StateMasterForm;
