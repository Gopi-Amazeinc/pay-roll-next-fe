import React from "react";
import Link from "next/link";
import Layout from "../../../components/layout/layout";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import axios from 'axios'



function BrandMasterForm({ editData }) {

    const { register, handleSubmit, watch, reset, formState: { errors }, } = useForm();

    const [actionType, setActionType] = useState("insert");
    console.log(editData)

    useEffect(() => {
        if (editData == "") {
            clearForm();
        } else {
            clearForm(editData);
        }
    }, [1]);

    function clearForm(BandMasterData = null) {
        let details = {
            "ID": BandMasterData ? BandMasterData.id : "",
            "Short": BandMasterData ? BandMasterData.short : "",
            "Description": BandMasterData ? BandMasterData.description : "",
        };
        reset(details);
        setActionType(BandMasterData ? "update" : "insert");
    }

    async function onSubmit(data) {
        console.log(data);
        let hostURL = process.env.NEXT_PUBLIC_API_HOST_URL;
        if (actionType == "insert") {
            try {

                await axios.post(hostURL + "Master/InsertBrandMaster", data); // this for insrting the data using inserting Api call 
            } catch (error) {

            }


        } else {
            await axios.post(hostURL + "Master/UpdateBrandMaster", data); // this is for updating or Modifiying the data using  Update Api call
            alert("updated");
        }
    }

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
                                <input type="text" className="form-control" placeholder="Short Name"{...register('Short', { required: "Please add a Short Name", pattern: { value: /^[A-Za-z0-9]+$/, message: "Please enter a valid Short Name" } })} />
                                {errors.Short && <p className="error-message" style={{ color: "red" }}>{errors.Name.message}</p>}
                            </div>

                            <div className="col-lg-5">
                                <p>
                                    Description<i className="text-danger">*</i>
                                </p>
                                <textarea
                                    className="form-control"
                                    placeholder="Description"
                                    {...register('Description', { required: "Please add a Descrption Name", pattern: { value: /^[A-Za-z0-9]+$/, message: "Please enter a valid Descrption Name" } })}
                                ></textarea>
                                {errors.Description && <p className="error-message" style={{ color: "red" }}>{errors.Name.message}</p>}

                            </div>
                        </div>

                        <div className="row mt-4">
                            <div className="col-lg-8"></div>
                            <div className="col-lg-2">
                                <Link href="/Masters/BrandMaster">
                                    <button type="submit"className="AddButton">Cancel</button>
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
