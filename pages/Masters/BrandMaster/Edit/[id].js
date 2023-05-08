import React from "react";
import Link from "next/link";
import Layout from "../../../../components/layout/layout";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import axios from 'axios'
import { useRouter } from 'next/router'
import Swal from "sweetalert2";


function BrandMasterForm() {


    const router = useRouter()
    const { id } = router.query

    const { register, handleSubmit, watch, reset, formState: { errors }, } = useForm();
    let hostURL = process.env.NEXT_PUBLIC_API_HOST_URL;

    useEffect(() => {
        getData()
    }, [1]);

    const getData = async () => {
        if (id) {
            let response = await axios.get(hostURL + "Master/GetBrandMasterByID?ID=" + id);
            clearForm(response.data[0]);
        } else {
            clearForm();
        }
    }

    function clearForm(BandMasterData = null) {
        let details = {
            "ID": BandMasterData ? BandMasterData.id : "",
            "Short": BandMasterData ? BandMasterData.short : "",
            "Description": BandMasterData ? BandMasterData.description : "",
        };
        reset(details);

    }

    async function onSubmit(data) {

        await axios.post(hostURL + "Master/UpdateBrandMaster", data); // this is for updating or Modifiying the data using  Update Api call
        Swal.fire("Updated")
        router.push("/Masters/BrandMaster")
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
                                    {...register('Description', { required: true,})}
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

                                <button type="submit" className="AddButton">
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

export default BrandMasterForm;
