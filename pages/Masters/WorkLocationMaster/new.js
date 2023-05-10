import React, { useState, useEffect } from "react";
import Styles from '../../../styles/WorkLocationMasterForm.module.css'
import { useForm } from "react-hook-form";
import Layout from '@/components/layout/layout.js';
import Link from "next/link";
import Swal from "sweetalert2";
import { apiService } from "@/services/api.service";
import { useRouter } from "next/router";

function WorkLocationMasterForm({ editData }) {

  const { register, handleSubmit, reset, formState } = useForm();
  const { errors } = formState;
  const router = useRouter();
  const [actionType, setActionType] = useState("insert");

  const onSubmit = async (data) => {
    if (actionType == "insert") {
      await apiService.commonPostCall("Master/InsertWorkingLocationMaster", data);
      Swal.fire("Data Inserted successfully");
      router.push("/Masters/WorkLocationMaster");
    } else {
      await apiService.commonPostCall("Master/UpdateWorkingLocationMaster", data);
      Swal.fire("Data Updated successfully");
      router.push("/Masters/WorkLocationMaster");
    }
  };

  function clearForm(existingData = null) {
    let etty = {
      "ID": existingData ? existingData.id : "",
      "Short": existingData ? existingData.short : "",
      "Description": existingData ? existingData.description : "",
    }
    reset(etty);
    setActionType(existingData ? "update" : "insert");
  }

  useEffect(() => {
    const { id } = editData || {};
    if (id) {
      // This API is used to fetch the data from BarangayMaster ByID table
      getWorkLocationMasterByID(id);
    } else {
      clearForm();
    }
  }, []);

  const getWorkLocationMasterByID = async (id) => {
    const res = await apiService.commonGetCall(
      "Master/GetWorkingLocationMasterByID?ID=" + id
    );
    clearForm(res.data[0]);
  };


  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      width: '60%'
    },
    errorMsg: {
      fontSize: '12px',
      fontWeight: '500',
      color: 'red'
    },
    inputLabel: {
      fontSize: '16px'
    }
  };
  return (
    <Layout>
      <div>
        <p className="Heading">Work Location Master</p>
        <div className="container mt-4">
          <div className="row shadow p-2 rounded-4 ">
            <div className="row ">
              <div className="col-lg-4" >
                <label id={Styles.label}>Short Name<span id={Styles.asterisk}>* </span></label>
              </div>
              <div className="col-lg-4" >
                <label id={Styles.label}>Description<span id={Styles.asterisk}>* </span></label>
              </div>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="row ">
                <div className="col-lg-4">
                  <input name="Short" className="form-control" type="text" {...register("Short", { required: true })} placeholder="Short Name" />
                  <div>{errors.Short && <span style={customStyles.errorMsg}>Please enter short name</span>}</div>

                </div>
                <div className="col-lg-4">
                  <textarea name="Description" className="form-control" {...register("Description", { required: true })} placeholder="Description" />
                  <div>{errors.Description && <span style={customStyles.errorMsg} >Please enter description</span>}</div>
                </div>
              </div>
              <br></br>
              <div className="row mx-0">
                <div className="col-lg-8"></div>
                <div className="col-lg-2">
                  <Link href='/Masters/WorkLocationMaster'>
                    <button type='button' className='btn common-edit edit-btn' id={Styles.btn}>Close</button></Link>
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
    </Layout>
  )
}

export default WorkLocationMasterForm