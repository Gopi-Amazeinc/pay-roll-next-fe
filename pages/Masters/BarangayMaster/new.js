import React from "react";
import { useEffect, useState } from "react";
import Barangay from "../../../styles/BarangayMasterForm.module.css";
import axios from "axios";
import { useForm } from "react-hook-form";
import Link from "next/link";
import Swal from "sweetalert2";
import Layout from "@/components/layout/layout";
import { apiService } from "@/services/api.service";
import { useRouter } from "next/router";
const BarangayMasterForm = ({ editData }) => {
  const router = useRouter();

  // const hostURL = process.env.NEXT_PUBLIC_API_HOST_URL;

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  const [actionType, setActionType] = useState("insert");
  const [countrydata, setCountryData] = useState([]);
  const [provincedata, setProvinceData] = useState([]);
  const [citydata, setCityData] = useState([]);

  useEffect(() => {
    debugger;
    getMasters();
    const { id } = editData || {};
    console.log(id, "clggg");
    if (id) {
      // This API is used to fetch the data from BarangayMaster ByID table
      getBarangayMasterByID(id);
    } else {
      clearForm();
    }
  }, []);
  const getBarangayMasterByID = async (id) => {
    const res = await apiService.commonGetCall(
      "Master/GetBarangayMasterByID?ID=" + id
    );
    clearForm(res.data[0]);
    console.log("hello result", res.data[0]);
  };

  // let hostURL = process.env.NEXT_PUBLIC_API_HOST_URL;
  // This API is used to fetch the data from CountryType table
  const getMasters = async () => {
    const [countryRes, provinceRes, cityRes] = await Promise.all([
      apiService.commonGetMasters("Master/GetCountryType"),
      apiService.commonGetMasters("Master/GetStateType"),
      apiService.commonGetMasters("Master/GetCityType"),
    ]);

    setCountryData(countryRes.data);
    setProvinceData(provinceRes.data);
    setCityData(cityRes.data);
  };

  const clearForm = (userData = null) => {
    let details = {
      ID: userData ? userData.id : "",
      CountryID: userData ? userData.countryID : "",
      ProvinceID: userData ? userData.provinceID : "",
      CityID: userData ? userData.cityID : "",
      Name: userData ? userData.name : "",
    };
    reset(details);
    setActionType(userData ? "update" : "insert");
  };

  const onSubmit = async (data) => {
    if (actionType == "insert") {
      await apiService.commonPostCall("Master/InsertBarangayMaster", data);
      Swal.fire("Data Inserted successfully");
      router.push("/Masters/BarangayMaster");
    } else {
      await apiService.commonPostCall("Master/UpdateBarangayMaster", data);
      Swal.fire("Data Updated successfully");
      router.push("/Masters/BarangayMaster");
      
    }
  };
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
                  <button className="AddButton">CANCEL</button>
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
};
export default BarangayMasterForm;
