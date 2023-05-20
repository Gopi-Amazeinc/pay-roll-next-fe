import React from 'react'
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import Layout from '@/components/layout/layout.js';
import axios from "axios";
import Swal from "sweetalert2";
import { useRouter } from 'next/router';

function LoanMasterForm() {

  let hostURL = process.env.NEXT_PUBLIC_API_HOST_URL;
  // form validation rules
  const { register, handleSubmit, reset, formState } = useForm();
  const { errors } = formState;
  const router = useRouter();

  const onSubmit = async (data) => {
    await axios.post(hostURL + "Master/InsertLoanMaster", data);
    Swal.fire("LoanMaster Inserted !");
    router.push("/Masters/LoanMaster")
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
      <div className='container-fluid'>
        <p className='Heading'>Loan Type</p>
        <div className='row'>
          <div className='col-lg-12'>
            <div className='card border-0 p-3 rounded-3'>
              <form onSubmit={handleSubmit(onSubmit)} >
                <div className="row">
                  <div className="col-lg-2">
                    <label className="fw-bold">
                      Loan Type<span style={{ color: "red" }}>*</span>
                    </label>
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

                  <div className="col-lg-5">
                    <label className="fw-bold">
                      Description<span style={{ color: "red" }}>*</span>
                    </label>
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

                  </div>
                </div>
                <br />
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
              </form>
            </div>
          </div>
        </div>
      </div >
    </Layout>
  )
}

export default LoanMasterForm