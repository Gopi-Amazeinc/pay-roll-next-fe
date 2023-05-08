import React from 'react'
import Styles from '../../../styles/LoanMasterForm.module.css'
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import Layout from '@/components/layout/layout.js';
import axios from "axios";
import Swal from "sweetalert2";

function LoanMasterForm() {

  let hostURL = process.env.NEXT_PUBLIC_API_HOST_URL;
  // form validation rules
  const { register, handleSubmit, reset, formState } = useForm();
  const { errors } = formState;

  const onSubmit = async (data) => {
    await axios.post(hostURL + "Master/InsertLoanMaster", data);
    Swal.fire("LoanMaster Inserted !");
    location.href = "/Masters/LoanMaster";
  };

  const customStyles = {
    errorMsg: {
      fontSize: "12px",
      fontWeight: "500",
      color: "red",
    },
    inputLabel: {
      fontSize: "16px",
    },
  };



  return (
    <Layout>
      <div>
        <p></p>
        <h4 className='Heading mb-4'>Loan Type</h4>
        <form onSubmit={handleSubmit(onSubmit)} >
          <div className={Styles.card}>
            <div className="row">
              <div className="col-md-2">
                <label className="fw-bold" style={customStyles.inputLabel}>
                  Loan Type<span style={{ color: "red" }}>*</span>
                </label><p></p>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Loan Type"
                  {...register("Type", { required: true })}
                ></input>
                {errors.Type && (
                  <span style={customStyles.errorMsg}>
                    Please Loan Type
                  </span>
                )}
              </div>

              <div className="col-md-4">
                <label className="fw-bold" style={customStyles.inputLabel}>
                  Description<span style={{ color: "red" }}>*</span>
                </label><p></p>
                <textarea
                  className="form-control"
                  name="Description"
                  rows="3"
                  type="text"
                  {...register("Description", { required: true })}
                  placeholder="Description"
                />
                {errors.Description && (
                  <span style={customStyles.errorMsg}>
                    Please Enter Description
                  </span>
                )}
                <br />
                <br />
              </div>

            </div>
            <div className="row">
              <div className="col-lg-8"></div>
              <div className="col-lg-2">
                <Link href="/Masters/LoanMaster">
                  <button className="AddButton">
                    Cancel
                  </button>
                </Link>
              </div>
              <div className="col-lg-2">
                <button
                  type="submit"
                  className="AddButton"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </form>
      </div >
    </Layout>
  )
}

export default LoanMasterForm