import React from "react";
import Link from "next/link";
import Layout from '../../../components/layout/layout'
import { useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";


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

    useEffect(() => {
        async function getDropdownData() {
            let hostURL = process.env.NEXT_PUBLIC_API_HOST_URL;

            let res = await axios.get(hostURL + "Master/GetCountryType"); // this api call for master table this is used for DropDown data 
            setCountryData(res.data);

            res = await axios.get(hostURL + "Master/GetStateType"); // this api call for master table this is used for DropDown data 
            setProvinceData(res.data);
        }

        getDropdownData();
    }, [1]);


    async function onSubmit(data) {
        console.log(data);
        let hostURL = process.env.NEXT_PUBLIC_API_HOST_URL;
        await axios.post(hostURL + "Master/InsertCityType", data); // this for insrting the data using inserting Api call 
        Swal.fire({
            icon: "success",
            title: "Hurray...",
            text: "Data was added..!",
        });
        location.href = "/Masters/CityMaster"

    }

    return (
        <Layout>
            <div className="container">
                <h3 className="Heading fs-5">City Details</h3>
                <div className="card p-3 border-0 shadow rounded-3 mt-4 mx-0">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="row">
                            <div className="col-lg-2">
                                <p>
                                    Country<i className="text-danger">*</i>
                                </p>
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
                                <p>
                                    Province<i className="text-danger">*</i>
                                </p>
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

                            {/* <div className="col-lg-2">
                                <p>
                                    City<i className="text-danger">*</i>
                                </p>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="City"
                                    {...register("City", { required: true })}
                                />
                            </div> */}

                            <div className="col-lg-2">
                                <p>
                                    Short<i className="text-danger">*</i>
                                </p>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Short"
                                    {...register("Short", { required: true })}
                                />
                            </div>

                            <div className="col-lg-4">
                                <p>
                                    Description<i className="text-danger">*</i>
                                </p>
                                <textarea
                                    className="form-control"
                                    placeholder="Description"
                                    {...register("Description", { required: true })}
                                ></textarea>
                            </div>
                        </div>

                        <div className="row mt-5 mx-0">
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
                                <button
                                    type="submit"
                                    className="AddButton"
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
}

export default CityMasterForm;
