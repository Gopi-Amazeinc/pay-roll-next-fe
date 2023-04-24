import React, { useState, useEffect } from "react";
import Styles from "../../styles/statemasterdashboard.module.css";
import { useForm } from "react-hook-form";
import Layout from "@/Components/layout";
import Link from "next/link";
import axios from "axios";
import Swal from "sweetalert2";
function StateMasterForm() {
  const [actionType, setActionType] = useState("insert");
  const [country, setCountryData] = useState([]);
  const { register, handleSubmit, reset, formState } = useForm();
  const { errors } = formState;
  let ID;
  let hostURL = process.env.NEXT_PUBLIC_API_HOST_URL;

  async function onSubmit(data) {
    if (actionType == "insert") {
      await axios.post(hostURL + "Master/InsertStateType", data);  //naveen.th@amazeinc.in, Insert API for State master, to add new data
      Swal.fire("Added succesfullly");
      location.href = "/Masters/statemasterdashboard";
    } else {
      await axios.post(hostURL + "Master/UpdateStateType", data); //naveen.th@amazeinc.in, Update API for State master, to update data
      Swal.fire("Updated succesfullly");
      sessionStorage.removeItem("stateID");
      location.href = "/Masters/statemasterdashboard";
    }
    await axios.get(hostURL + "Master/GetStateType");
  }

  useEffect(() => {
    clearForm();
    ID = sessionStorage.getItem("stateID");
    if (ID) {
      getStateMasterByID();
    }
    getCountryList();
  }, []);

  const getCountryList= async() =>{
    let res = await axios.get(hostURL + "Master/GetCountryType"); //naveen.th@amazeinc.in, Get API for country master, to fetch data
    console.log(res.data);
    setCountryData(res.data);
  }

  const getStateMasterByID = async () => {
    let res = await axios.get(hostURL + "Master/GetStateTypeByID?ID=" + ID); //naveen.th@amazeinc.in, Get by ID API for State master, to fetch  data
    clearForm(res.data[0]);
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
        <h3 className="text-primary fs-5 mt-3">Province Details</h3>
        <div className="card p-3 border-0 shadow-lg rounded-3 mt-4">
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
            <div className="row ">
              <div className="col-lg-6"></div>
              <div className="col-lg-6">
                <Link href="/Masters/statemasterdashboard">
                  <button
                    type="button"
                    className="btn common-edit"
                    id={Styles.btn}
                  >
                    Close
                  </button>
                </Link>

                {actionType == "insert" && (
                  <button type="submit" className="btn" id={Styles.btn}>
                    Save
                  </button>
                )}
                {actionType == "update" && (
                  <button type="submit" className="btn" id={Styles.btn}>
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
