import React from "react";
import Link from "next/link";
import Layout from '../../../../components/layout/layout'
import { useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { useRouter } from "next/router";

function CityMasterForm() {

    const router = useRouter()
    const { id } = router.query
    const [countryData, setCountryData] = useState([]);
    const [provinceData, setProvinceData] = useState([]);
    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
    } = useForm();
    let hostURL = process.env.NEXT_PUBLIC_API_HOST_URL;
    useEffect(() => {
        async function getDropdownData() {


            let res = await axios.get(hostURL + "Master/GetCountryType"); // this api call for master table this is used for DropDown data 
            setCountryData(res.data);

            res = await axios.get(hostURL + "Master/GetStateType"); // this api call for master table this is used for DropDown data 
            setProvinceData(res.data)

        }
        getData();
        getDropdownData();
    }, [1]);

    const getData = async () => {
        if (id) {
            let response = await axios.get(hostURL + "Master/GetCityTypeByID?ID=" + id);
            clearForm(response.data[0]);
        } else {
            clearForm();
        }
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
    }

    async function onSubmit(data) {
        await axios.post(hostURL + "Master/UpdateCityType", data); //  this is for updating or Modifiying the data using  Update Api call
        Swal.fire({
            icon: "success",
            title: "Hurray...",
            text: "Data was Updated..!",
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
                                    Update
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
