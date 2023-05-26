import React from "react";
import { useEffect, useState } from "react";
import Barangay from "../../../styles/BarangayMasterForm.module.css";
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
    getMasters();
    const { id } = editData || {};
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
        <p className="Heading">Barangay Details</p>
        <div className="row">
          <div className="col-lg-12">
            <div className="card p-3 rounded-3 border-0">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="row">
                  <div className="col-lg-3">
                    <label className="fw-bold" >
                      Country Name<span style={{ color: "red" }}>*</span>
                    </label>
                    
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
                      <p style={customStyles.errorMsg} className="error">
                        Please select a country
                      </p>
                    )}
                  </div>
                  <div className="col-lg-3">
                    <label className="fw-bold">
                      Province<span style={{ color: "red" }}>*</span>
                    </label>
                    
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
                      <p style={customStyles.errorMsg} className="error">
                        Please select a Province
                      </p>
                    )}
                  </div>
                  <div className="col-lg-3">
                    <label className="fw-bold">
                      City<span style={{ color: "red" }}>*</span>
                    </label>
                    
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
                      <p style={customStyles.errorMsg} className="error">
                        Please select a City
                      </p>
                    )}
                  </div>
                  <div className="col-lg-3">
                    <label className="fw-bold">
                      Barangay<span style={{ color: "red" }}>*</span>
                    </label>
                    
                    <input
                      type="text"
                      className={Barangay.selecter}
                      {...register("Name", { required: true })}
                    />
                    {errors.Name && (
                      <p style={customStyles.errorMsg} className="error">
                        Please Enter a Barangay
                      </p>
                    )}
                  </div>
                </div>
                <br/>
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
        </div>
      </div>
    </Layout>
  );
};
export default BarangayMasterForm;
