import React from 'react'
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from 'next/link';
import Styles from '../../../../styles/philhealthadd.module.css'
import Swal from 'sweetalert2';
import Layout from '@/components/layout/layout'
import { useRouter } from 'next/router'

const PhilhealthForm = ({ }) => {
  const router = useRouter()
  const { id } = router.query

  const { register, handleSubmit, watch, reset, formState: { errors }, } = useForm();
  let hostURL = process.env.NEXT_PUBLIC_API_HOST_URL;

  const getData = async () => {
    if (id) {
      let response = await axios.get(hostURL + "HR/GetPhihealthconfogarationByID?ID=" + id);
      clearForm(response.data[0]);
    } else {
      clearForm();
    }
  }

  useEffect(() => {
    getData()
  }, [1]);

  function clearForm(PhillhealthData = null) {
    debugger;
    let details = {
      ID: PhillhealthData ? PhillhealthData.id : "",
      Taxiableincomelowlimit: PhillhealthData
        ? PhillhealthData.taxiableincomelowlimit
        : "",
      Taxiableincomehighlimit: PhillhealthData
        ? PhillhealthData.taxiableincomehighlimit
        : "",
      Phihealthvalue: PhillhealthData ? PhillhealthData.phihealthvalue : "",
      Year: PhillhealthData ? PhillhealthData.year : "",
    };
    reset(details);

  }

  async function onSubmit(data) {
    console.log(data);

    await axios.post(hostURL + "HR/UpdatePhihealthconfogaration", data);
    Swal.fire("Updated succesfullly");
    location.href = '/Settings/Philhealth';

  }

  return (
    <Layout>
      <div>
        <br />
        <p className={Styles.p}>Phihealth Configuration Form</p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div id={Styles.card} className="card shadow-lg p-3">
            <div className="row">
              <div className="col-lg-3">
                <label>
                  Taxable income low limit <span className={Styles.span} >*</span>
                </label>
                <input
                  name="lowLimit"
                  type="text"
                  className={`form-control mt-2`}
                  {...register("Taxiableincomelowlimit", {
                    required: "Please add a Tax Name",
                    pattern: {
                      value: /^[A-Za-z0-9]+$/,
                      message: "Please enter a valid Tax Name",
                    },
                  })}
                />
                <div className="invalid-feedback">
                  {errors.lowLimit?.message}
                </div>
              </div>
              <div className="col-lg-3">
                <label>
                  Taxable income high limit <span className={Styles.span}>*</span>
                </label>
                <input
                  name="highLimit"
                  type="text"
                  className={`form-control mt-2 `}
                  {...register("Taxiableincomehighlimit", {
                    required: "Please add a Tax Name",
                    pattern: {
                      value: /^[A-Za-z0-9]+$/,
                      message: "Please enter a valid Tax Name",
                    },
                  })}
                />
                <div className="invalid-feedback">
                  {errors.highLimit?.message}
                </div>
              </div>
              <div className="col-lg-2">
                <label>
                  Phihealth value <span className={Styles.span}>*</span>
                </label>
                <input
                  name="Philhealth"
                  type="text"
                  className={`form-control mt-2 `}
                  {...register("Phihealthvalue", {
                    required: "Please add a Phihealth value",
                    pattern: {
                      value: /^[A-Za-z0-9]+$/,
                      message: "Please enter a valid Phihealth value",
                    },
                  })}
                />
                <div className="invalid-feedback">
                  {errors.Philhealth?.message}
                </div>
              </div>
              <div className="col-lg-2">
                <label>
                  Year<span className={Styles.span}>*</span>
                </label>
                <select
                  className="form-select"
                  {...register("Year", {
                    required: "Please add a year",
                    pattern: {
                      value: /^[A-Za-z0-9]+$/,
                      message: "Please enter a valid year",
                    },
                  })}
                >
                  <option>2023</option>
                  <option>2023</option>
                  <option>2024</option>
                  <option>2025</option>
                  <option>2026</option>
                  <option>2027</option>
                  <option>2028</option>
                </select>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-10"></div>
              <div className="col-lg-1">
                <Link href="/Settings/Philhealth">
                  <button className={Styles.Cancel} >Cancel</button>
                </Link>
                {/* <button id={Styles.Save}>Save</button> */}
              </div>
              <div className="col-lg-1">

                <button
                  type="submit"

                  className={Styles.Save}
                >
                  Update
                </button>

              </div>
              <div className="col-lg-2 ">
                {/* <button id='AddButton' className='btn btn-primary'>Submit</button>
                 */}
              </div>
            </div>
          </div>
        </form>
      </div>
    </Layout>
  )
}

export default PhilhealthForm