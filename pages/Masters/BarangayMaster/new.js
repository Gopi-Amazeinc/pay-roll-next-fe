import React, { Component } from "react";
import { useEffect, useState } from "react";
import Barangay from "../../../styles/BarangayMasterForm.module.css";
import axios from "axios";
import { useForm } from "react-hook-form";
import Link from "next/link";
import Swal from "sweetalert2";
import Layout from "@/components/layout/layout";

const BarangayMasterForm = ({ editData }) => {
  const hostURL = process.env.NEXT_PUBLIC_API_HOST_URL;

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  const [countrydata, setCountryData] = useState([]);
  const [provincedata, setProvinceData] = useState([]);
  const [citydata, setCityData] = useState([]);
  const [actionType, setAction] = useState("insert");

  useEffect(() => {
    getData();
  }, [1]);

  function clearForm(userData = null) {
    let details = {
      ID: userData ? userData.id : "",
      CountryID: userData ? userData.countryID : "",
      ProvinceID: userData ? userData.provinceID : "",
      CityID: userData ? userData.cityID : "",
      Name: userData ? userData.name : "",
    };
    setAction(userData ? "update" : "insert");
    reset(details);
  }

  async function getData() {
    let hostURL = process.env.NEXT_PUBLIC_API_HOST_URL;
    // This API is used to fetch the data from CountryType table 
    let res = await axios.get(hostURL + "Master/GetCountryType");
    setCountryData(res.data);
    // This API is used to fetch the data from StateType table
    res = await axios.get(hostURL + "Master/GetStateType");
    setProvinceData(res.data);
    // This API is used to fetch the data from CityType table
    res = await axios.get(hostURL + "Master/GetCityType");
    setCityData(res.data);
    debugger
    if (editData == "") {
      clearForm();
    }
    else {
      clearForm(editData);
    }
  }

  async function onSubmit(data) {
    if (actionType == "insert") {
      await axios.post(hostURL + "Master/InsertBarangayMaster", data);
      Swal.fire("Data Inserted successfully");
      location.href = "/Masters/BarangayMaster";
    } else {
      await axios.post(hostURL + "Master/UpdateBarangayMaster", data);
      Swal.fire("Updated successfully");
      location.href = "/Masters/BarangayMaster";
    }
  }
  return (
    <Layout>
      <div className="container">
        <div className="row">
          <div className="col-lg-5">
            <h3 className="Heading">Barangay Details</h3>
          </div>
          <div className="col-lg-3"></div>
          <div className="col-lg-2"></div>
        </div>
        <br />
        <div className={Barangay.card}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row">
              <div className="col-lg-3">
                <label className={Barangay.labels}>
                  Country Name<span style={{ color: "red" }}>*</span>{" "}
                </label>{" "}
                <br />
                <select
                  className={Barangay.selecter}
                  {...register("CountryID", { required: true })}
                >
                  <option value="" className={Barangay.options}>
                    Select Country
                  </option>
                  {countrydata.map((data) => {
                    return (
                      <option value={data.id} key={data.id}>
                        {data.short}
                      </option>
                    );
                  })}
                </select>
                {errors.CountryID && (
                  <p style={{ color: "red" }} className="error">
                    Please select a country
                  </p>
                )}
              </div>
              <div className="col-lg-3">
                <label className={Barangay.labels}>
                  Province<span style={{ color: "red" }}>*</span>
                </label>
                <br />
                <select
                  className={Barangay.selecter}
                  {...register("ProvinceID", { required: true })}
                >
                  <option value="">Select State</option>
                  {provincedata.map((data) => {
                    return (
                      <option value={data.id} key={data.id}>
                        {data.short}
                      </option>
                    );
                  })}
                </select>
                {errors.ProvinceID && (
                  <p style={{ color: "red" }} className="error">
                    Please select a Province
                  </p>
                )}
              </div>
              <div className="col-lg-3">
                <label className={Barangay.labels}>
                  City<span style={{ color: "red" }}>*</span>{" "}
                </label>
                <br />
                <select
                  className={Barangay.selecter}
                  {...register("CityID", { required: true })}
                >
                  <option value="">Select City</option>
                  {citydata.map((data) => {
                    return (
                      <option value={data.id} key={data.id}>
                        {data.short}
                      </option>
                    );
                  })}
                </select>
                {errors.CityID && (
                  <p style={{ color: "red" }} className="error">
                    Please select a City
                  </p>
                )}
              </div>
              <div className="col-lg-3">
                <label className={Barangay.labels}>
                  Barangay<span style={{ color: "red" }}>*</span>{" "}
                </label>
                <br />
                <input
                  type="text"
                  className={Barangay.selecter}
                  {...register("Name", { required: true })}
                />
                {errors.Name && (
                  <p style={{ color: "red" }} className="error">
                    Please Enter a Barangay
                  </p>
                )}
              </div>
            </div>
            <br /> 
            <div className="row">
              <div className="col-lg-8"></div>
              <div className="col-lg-2">
                <Link href="/Masters/BarangayMaster">
                  <button
                    className="AddButton"
                  >
                    CANCEL
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
          </form>
        </div>
      </div>
    </Layout>
  );
};
export default BarangayMasterForm;
