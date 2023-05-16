import React from "react";
import brandmaster from "../../../../styles/BrandMasterDashboard.module.css";
import Link from "next/link";
import Layout from "../../../../components/layout/layout";
import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

function BrandMasterDashboard() {
    const [BrandMaster, setBrandMaster] = useState([]);

    const getBrandMaster = async () => {
        let hostURL = process.env.NEXT_PUBLIC_API_HOST_URL;
        let res = await axios.get(hostURL + "Master/GetBrandMaster"); //This Api is useed for Get the Dashborad data band Master
        setBrandMaster(res.data);
    };

    useEffect(() => {
        getBrandMaster();
    }, [1]);

    const getBandMasterData = (data) => {
        sessionStorage.setItem("id", data.id);
        console.log(data.id);
    };

    const clearFormData = () => {
        sessionStorage.setItem("id", "");
    };

    async function DeleteBandMaster(id) {
        debugger;
        try {
            let hostURL = process.env.NEXT_PUBLIC_API_HOST_URL;
            Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!",
            }).then((res) => {
                if (res) {
                    axios.get(hostURL + `Master/DeleteBrandMaster?id=${id}`);  // this is for deleting the data for dashborad using delete api call         
                }
                getBrandMaster();
            });
            // const res = await axios.get(
            //   hostURL + `Master/DeleteBrandMaster?id=${id}`
            // );
            // console.log(res.data);
            // alert("Data Deleted Sucessfully");
            // getBrandMaster();
        } catch (error) {
            console.error(error);
            alert("Failed to delete data");
        }
    }

    return (
        <Layout>
            <div>
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="row">
                                <div className="col-lg-6">
                                    <h3 className="Heading">
                                        Brand Master
                                    </h3>
                                </div>
                            </div>
                            <br />
                            <div className={brandmaster.card}>
                                <div className="row">
                                    <div className="col-lg-1">
                                        <p>Filter By</p>
                                    </div>
                                    <div className="col-lg-5">
                                        <input
                                            type="text"
                                            placeholder="Search"
                                            id="term"
                                            className="form-control text"
                                        />
                                    </div>
                                </div>
                            </div>
                            <br />
                            <div className="row">
                                <div className="col-md-10">
                                    <p className="Heading fs-6 mt-2">
                                        SHOWING <span></span>RESULTS
                                    </p>
                                </div>
                                <div className="col-md-2">
                                    <Link href="/Masters/BrandMaster/new">
                                        <button
                                            className="AddButton"
                                        >
                                            Add New
                                        </button>
                                    </Link>
                                </div>
                            </div>
                            <br />
                            <div className="alignForm"></div>
                            <div className="row">
                                <div className="col-md-12">
                                    <table class="table table-striped">
                                        <thead>
                                            <tr class="head">
                                                <th >Short Name</th>
                                                <th >Description</th>
                                                <th >
                                                    Action
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {BrandMaster.map((data) => {
                                                return (
                                                    <tr key={data.id}>
                                                        <td>{data.short}</td>
                                                        <td>{data.description}</td>
                                                        <td>
                                                            <Link href={`/Masters/BrandMaster/Edit/${data.id}`}>
                                                                <button
                                                                    className="edit-btn"
                                                                >
                                                                    Edit
                                                                </button>
                                                            </Link>
                                                            &nbsp;
                                                            <button
                                                                className="edit-btn"
                                                                onClick={() => DeleteBandMaster(data.id)}
                                                            >
                                                                Delete
                                                            </button>
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default BrandMasterDashboard;
