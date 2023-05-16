import React from "react";
import Link from "next/link";
import Layout from "../../../../components/layout/layout";
import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { BiFilterAlt } from "react-icons/bi";
import { AiOutlinePlus } from "react-icons/ai";

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

        } catch (error) {
            console.error(error);
            alert("Failed to delete data");
        }
    }

    return (
        <Layout>
            <div className="container">
                <p className="Heading">Brand Master</p>
                <div className="card p-3 rounded-3 shadow border-0">
                    <div className="row">
                        <div className="col-1">
                            <p> <BiFilterAlt /> Filter By</p>
                        </div>
                        <div className="col-5">
                            <input
                                type="text"
                                placeholder="Search"
                                className="form-control"
                            ></input>
                        </div>
                    </div>
                </div>

                <div className="row mt-3">
                    <p className="col-2 result-heading">Showing {BrandMaster.length} Results</p>
                    <div className="col-8"></div>
                    <div className="col-2">
                        <Link href="/Masters/BrandMaster/new">
                            <button className=" AddButton">
                                <AiOutlinePlus />    Add New
                            </button>
                        </Link>
                    </div>
                </div>

                <div className="mt-3">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th >Short Name</th>
                                <th >Description</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Array.isArray(BrandMaster) &&
                                BrandMaster.length > 0 && (
                                    <>
                                        {BrandMaster.map((data, index) => {
                                            return (
                                                <tr key={index}>
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
                                                        &nbsp;&nbsp;
                                                        <button
                                                            onClick={() => DeleteBandMaster(data.id)}
                                                            className="edit-btn"
                                                        >
                                                            Delete
                                                        </button>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </>
                                )}
                        </tbody>
                    </table>
                </div>
            </div>
        </Layout>
    );
}

export default BrandMasterDashboard;
