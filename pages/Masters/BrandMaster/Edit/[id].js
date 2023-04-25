import { useRouter } from 'next/router'
import React from 'react'
import Link from "next/link";
import Layout from "@/components/layout/layout";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import axios from 'axios'
import Swal from 'sweetalert2'


const BrandMasterEdit = () => {
    const router = useRouter()
    const { id } = router.query

    const { register, handleSubmit, watch, reset, formState: { errors }, } = useForm();

    function clearForm(BandMasterData = null) {
        debugger;
        let details = {
            "ID": BandMasterData ? BandMasterData.id : "",
            "Short": BandMasterData ? BandMasterData.short : "",
            "Description": BandMasterData ? BandMasterData.description : "",
        };
        reset(details);
    }

    useEffect(() => {
        async function getBandMasterByID() {
            if (id) {
                let hostURL = process.env.NEXT_PUBLIC_API_HOST_URL;
                let res = await axios.get(
                    hostURL + "Master/GetBrandMasterByID?ID=" + id  // this Api is used for get the data by id  for updating exact value
                );
                clearForm(res.data[0]);
            } else {
                clearForm();
            }
        }

        getBandMasterByID();
    }, [1]);
    return (
        <Layout>
            <div>
                <h3 className="text-primary fs-5 mt-3">Band Master</h3>
                <div className="card p-3 border-0 shadow-lg rounded-3 mt-4">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="row">
                            <div className="col-lg-2">
                                <p>
                                    Short Name<i className="text-danger">*</i>
                                </p>
                                <input type="text" className="form-control" placeholder="Short Name"{...register('Name', { required: "Please add a Short Name", pattern: { value: /^[A-Za-z0-9]+$/, message: "Please enter a valid Short Name" } })} />
                                {errors.Name && <p className="error-message" style={{ color: "red" }}>{errors.Name.message}</p>}
                            </div>

                            <div className="col-lg-5">
                                <p>
                                    Description<i className="text-danger">*</i>
                                </p>
                                <textarea
                                    className="form-control"
                                    placeholder="Description"
                                    {...register('Name', { required: "Please add a Descrption Name", pattern: { value: /^[A-Za-z0-9]+$/, message: "Please enter a valid Descrption Name" } })}
                                ></textarea>
                                {errors.Name && <p className="error-message" style={{ color: "red" }}>{errors.Name.message}</p>}

                            </div>
                        </div>

                        <div className="row mt-5">
                            <div className="col-lg-8"></div>
                            <div className="col-lg-2  text-end">
                                <Link href="/Masters/brandmasterdashboard">
                                    <button type="submit" id="AddButton" className="btn btn-primary">Cancel</button>
                                </Link>
                            </div>
                            <div className="col-lg-2 ">
                                {/* <button id='AddButton' className='btn btn-primary'>Submit</button>
         */}
                                {actionType == "insert" && (
                                    <button type="submit" id='AddButton' className="btn btn-primary">
                                        Save
                                    </button>
                                )}
                                {actionType == "update" && (
                                    <button type="submit" id='AddButton' className="btn btn-primary">
                                        Update
                                    </button>
                                )}
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </Layout>
    )
}

export default BrandMasterEdit