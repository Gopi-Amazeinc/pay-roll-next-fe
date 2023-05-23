import React, { useState, useEffect } from "react";
import Styles from '../../../styles/WorkLocationMasterForm.module.css'
import Link from "next/link";
import Layout from '@/components/layout/layout.js';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { apiService } from "@/services/api.service";
import { useRouter } from "next/router";
function Otmaster({ editData }) {

  const { register, handleSubmit, reset, formState } = useForm();
  const { errors } = formState;
  const router = useRouter();
  const [actionType, setActionType] = useState("insert");

  const onSubmit = async (data) => {
    if (actionType == "insert") {
      await apiService.commonPostCall("Master/InsertOTRates", data);
      Swal.fire("Data Inserted successfully");
      router.push("/Masters/OtMaster");
    } else {
      await apiService.commonPostCall("Master/UpdateOTRates", data);
      Swal.fire("Data Updated successfully");
      router.push("/Masters/OtMaster");
    }
  };

  function clearForm(otData = null) {
    let details = {
      "ID": otData ? otData.id : "",
      "Day": otData ? otData.day : "",
      "Normal": otData ? otData.normal : "",
      "OT": otData ? otData.ot : "",
      "ND": otData ? otData.nd : "",
      "NDOT": otData ? otData.ndot : ""
    }
    reset(details);
    setActionType(otData ? "update" : "insert");
  }

  useEffect(() => {
    const { id } = editData || {};
    if (id) {
      // This API is used to fetch the data from BarangayMaster ByID table
      getOtMasterByID(id);
    } else {
      clearForm();
    }
  }, []);
  const getOtMasterByID = async (id) => {
    const res = await apiService.commonGetCall(
      "Master/GetOTRatesByID?ID=" + id
    );
    clearForm(res.data[0]);
  };

  return (
    <Layout>

      <div className="container-fluid">
        <p className="Heading">OT Master</p>
        <div className="row">
          <div className="col-lg-12">
            <div className="card border-0 p-3 rounded-3">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="row">
                  <div className="col-lg-4">
                    <label className="fw-bold"> Day<span style={{ color: "red" }}>*</span></label>
                    <input type="text" name="day" className='form-control'placeholder="Day" {...register("Day", {
                      required: "This field is required", pattern: { value: '^[A-Za-z0-9 ]+$', message: "Please enter a valid Day" }
                    })} />
                    {errors.Day && <p className="error-message" style={{ color: "red" }}>{errors.Day.message}</p>}
                  </div>
                  <div className="col-lg-4">
                    <label className="fw-bold"> Normal<span style={{ color: "red" }}>*</span></label>
                    <input type="text" name="normal" className='form-control' placeholder="Normal" {...register("Normal", {
                      required: "This field is required", pattern: { value: '^[A-Za-z0-9 ]+$', message: "Please enter valid Details" }
                    })} />
                    {errors.Normal && <p className="error-message" style={{ color: "red" }}>{errors.Normal.message}</p>}
                  </div>
                  <div className="col-lg-4">
                    <label className="fw-bold"> OT<span style={{ color: "red" }}>*</span></label>
                    <input type="text" name="ot" className='form-control' placeholder="OT" onkeypress='return ((event.charCode >= 48 && event.charCode <= 57) || (event.charCode == 46))' {...register("OT", {
                      required: "This field is required", pattern: {
                        value: '^[0-9 .]+$', message: "Please enter valid Details"
                      }
                    })} />
                    {errors.OT && <p className="error-message" style={{ color: "red" }}>{errors.OT.message}</p>}
                  </div>
                  <div className="col-lg-4">
                    <label className="fw-bold"> ND<span style={{ color: "red" }}>*</span></label>
                    <input type="text" name="nd" className='form-control' placeholder="ND" {...register("ND", {
                      required: "This field is required", pattern: { value: '^[A-Za-z0-9 ]+$', message: "Please enter valid Details" }
                    })} />
                    {errors.ND && <p className="error-message" style={{ color: "red" }}>{errors.ND.message}</p>}
                  </div>
                  <div className="col-lg-4">
                    <label className="fw-bold"> NDOT<span style={{ color: "red" }}>*</span></label>
                    <input type="text" name="ndot" className='form-control' placeholder="NDOT" {...register("NDOT", {
                      required: "This field is required", pattern: { value: '^[A-Za-z0-9 ]+$', message: "Please enter valid Details" }
                    })} />
                    {errors.NDOT && <p className="error-message" style={{ color: "red" }}>{errors.NDOT.message}</p>}
                  </div>
                </div>
                <br />
                <div className="row">
                  <div className="col-lg-8">
                  </div>
                  <div className="col-lg-2">
                    <Link href="/Masters/OtMaster"><button className="AddButton" tabIndex="0">CANCEL</button></Link>
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
}

export default Otmaster;
