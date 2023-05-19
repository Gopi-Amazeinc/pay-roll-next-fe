import React, { useState, useEffect } from "react";
import Link from "next/link";
import Layout from "../../../components/layout/layout";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { apiService } from "@/services/api.service";
import { useRouter } from "next/router";

function BrandMasterForm({ editData }) {

    const { register, handleSubmit, watch, reset, formState: { errors }, } = useForm();
    const [actionType, setActionType] = useState("insert");
    const router = useRouter();

    function clearForm(BandMasterData = null) {
        let details = {
            "ID": BandMasterData ? BandMasterData.id : "",
            "Short": BandMasterData ? BandMasterData.short : "",
            "Description": BandMasterData ? BandMasterData.description : "",
        };
        reset(details);
        setActionType(BandMasterData ? "update" : "insert");
    }

    const onSubmit = async (data) => {
        if (actionType == "insert") {
            await apiService.commonPostCall("Master/InsertBrandMaster", data);
            Swal.fire("Data Inserted successfully");
            router.push("/Masters/BrandMaster");
        } else {
            await apiService.commonPostCall("Master/UpdateBrandMaster", data);
            Swal.fire("Data Updated successfully");
            router.push("/Masters/BrandMaster");
        }
    };

    useEffect(() => {
        const { id } = editData || {};
        if (id) {
            // This API is used to fetch the data from BarangayMaster ByID table
            getBrandMasterByID(id);
        } else {
            clearForm();
        }
    }, []);
    const getBrandMasterByID = async (id) => {
        const res = await apiService.commonGetCall(
            "Master/GetBrandMasterByID?ID=" + id
        );
        clearForm(res.data[0]);
    };

    return (
        <Layout>
            <div>
                <h3 className="Heading">Band Master</h3>
                <div className="card p-3 border-0 shadow rounded-3 mt-4 mx-0">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="row">
                            <div className="col-lg-2">
                                <p>
                                    Short Name<i className="text-danger">*</i>
                                </p>
                                <input type="text" className="form-control" placeholder="Short Name"{...register('Short', { required: true })} />
                                {errors.Short && <p className="error-message" style={{ color: "red" }}>Please enter a valid Short Name</p>}
                            </div>

                            <div className="col-lg-5">
                                <p>
                                    Description<i className="text-danger">*</i>
                                </p>
                                <textarea
                                    className="form-control"
                                    placeholder="Description"
                                    {...register('Description', { required: true, })}
                                ></textarea>
                                {errors.Description && <p className="text-danger" >Please enter a valid Descrption Name</p>}

                            </div>
                        </div>

                        <div className="row mt-4">
                            <div className="col-lg-8"></div>
                            <div className="col-lg-2">
                                <Link href="/Masters/BrandMaster">
                                    <button type="submit" className="AddButton">Cancel</button>
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
        </Layout>
    );
}

export default BrandMasterForm;
