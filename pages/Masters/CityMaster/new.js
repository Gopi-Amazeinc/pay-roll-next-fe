import React from "react";
import Link from "next/link";
import Layout from '../../../components/layout/layout'
import { useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { useRouter } from "next/router";
import { apiService } from "@/services/api.service";


function CityMasterForm({ editData }) {
    const [countryData, setCountryData] = useState([]);
    const [provinceData, setProvinceData] = useState([]);
    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
    } = useForm();
    const router = useRouter();
    const [actionType, setActionType] = useState("insert");

    const getMasters = async () => {
        const [countryRes, provinceRes] = await Promise.all([
            apiService.commonGetMasters("Master/GetCountryType"),
            apiService.commonGetMasters("Master/GetStateType"),
        ]);

        setCountryData(countryRes.data);
        setProvinceData(provinceRes.data);
    }

    function clearForm(userData = null) {
        debugger;
        let details = {
            ID: userData ? userData.id : "",
            CountryID: userData ? userData.countryID : "",
            StateID: userData ? userData.stateID : "",
            // City:userData ? userData.city : "",
            Short: userData ? userData.short : "",
            Description: userData ? userData.description : "",
        };
        reset(details);
        setActionType(userData ? "update" : "insert");
    }

    const onSubmit = async (data) => {
        if (actionType == "insert") {
            await apiService.commonPostCall("Master/InsertCityType", data);
            Swal.fire("Data Inserted successfully");
            router.push("/Masters/CityMaster");
        } else {
            await apiService.commonPostCall("Master/UpdateCityType", data);
            Swal.fire("Data Updated successfully");
            router.push("/Masters/CityMaster");
        }
    };

    useEffect(() => {
        const { id } = editData || {};
        if (id) {
            // This API is used to fetch the data from BarangayMaster ByID table
            getCityMasterByID(id);
        } else {
            clearForm();
        }
        getMasters();
    }, []);
    const getCityMasterByID = async (id) => {
        const res = await apiService.commonGetCall(
            "Master/GetCityTypeByID?ID=" + id
        );
        clearForm(res.data[0]);
    };

    return (
        <Layout>
            <div className="container-fluid">
                <p className="Heading">City Details</p>
                <div className="row">
                    <div className="col-lg-12">
                        <div className="card p-3 border-0  rounded-3">
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="row">
                                    <div className="col-lg-2">
                                        <label className="fw-bold">
                                            Country<i className="text-danger">*</i>
                                        </label>
                                        <select
                                            className="form-select"
                                            {...register("CountryID", { required: true })}
                                        >
                                            <option value={""}>Select Country</option>
                                            {countryData.map((option) => (
                                                <option value={option.id} key={option.id}>
                                                    {option.short}{" "}
                                                </option>
                                            ))}
                                            ;
                                        </select>
                                    </div>

                                    <div className="col-lg-2">
                                        <label className="fw-bold">
                                            Province<i className="text-danger">*</i>
                                        </label>
                                        <select
                                            className="form-select"
                                            {...register("StateID", { required: true })}
                                        >
                                            <option value={""}>Select State</option>
                                            {provinceData.map((option) => (
                                                <option value={option.id} key={option.id}>
                                                    {option.short}{" "}
                                                </option>
                                            ))}
                                            ;
                                        </select>
                                    </div>

                                    <div className="col-lg-2">
                                        <label className="fw-bold">
                                            Short<i className="text-danger">*</i>
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Short"
                                            {...register("Short", { required: true })}
                                        />
                                    </div>

                                    <div className="col-lg-4">
                                        <label className="fw-bold">
                                            Description<i className="text-danger">*</i>
                                        </label>
                                        <textarea
                                            className="form-control"
                                            placeholder="Description"
                                            {...register("Description", { required: true })}
                                        ></textarea>
                                    </div>
                                </div>
                                <br />
                                <div className="row">
                                    <div className="col-lg-8"></div>
                                    <div className="col-lg-2 ">
                                        <Link href="/Masters/CityMaster">
                                            {" "}
                                            <button className="AddButton">
                                                Cancel
                                            </button>
                                        </Link>
                                    </div>

                                    <div className="col-lg-2 ">
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
}

export default CityMasterForm;
