import React, { useState, useEffect } from "react";
import Styles from "../../../styles/statemasterdashboard.module.css";
import { useForm } from "react-hook-form";
import Layout from '@/components/layout/layout.js';
import Link from "next/link";
import axios from "axios";
import Swal from "sweetalert2";
function StateMasterForm() {
  const [country, setCountryData] = useState([]);
  const { register, handleSubmit, reset, formState } = useForm();
  const { errors } = formState;

  let hostURL = process.env.NEXT_PUBLIC_API_HOST_URL;

  async function onSubmit(data) {
      await axios.post(hostURL + "Master/InsertStateType", data);  //naveen.th@amazeinc.in, Insert API for State master, to add new data
      Swal.fire("Added succesfullly");
      location.href = "/Masters/StateMaster/";
  }

  useEffect(() => {
    getCountryList();
  }, []);

  const getCountryList = async () => {
    let res = await axios.get(hostURL + "Master/GetCountryType"); //naveen.th@amazeinc.in, Get API for country master, to fetch data
    console.log(res.data);
    setCountryData(res.data);
  }


  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      width: "60%",
    },
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
        <h3 className="Heading fs-5 mt-3">Province Details</h3>
        <div className="card p-3 border-0 shadow rounded-3 mt-4 mx-0">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row">
              <div className="col-lg-3">
                <p>
                  Country<i className="text-danger">*</i>
                </p>
                <select
                  className="form-control"
                  {...register("CountryID", { required: true })}
                >
                  <option value="">Select Country</option>
                  {country.map((data) => {
                    return (
                      <option value={data.id} key={data.id}>
                        {data.short}
                      </option>
                    );
                  })}
                </select>
                {errors.CountryID && (
                  <span style={customStyles.errorMsg}>
                    Please select country
                  </span>
                )}
              </div>

              <div className="col-lg-3">
                <p>
                  Province<i className="text-danger">*</i>
                </p>
                <input
                  name="Short"
                  className="form-control"
                  type="text"
                  {...register("Short", { required: true })}
                  placeholder="Province"
                />
                <div>
                  {errors.Short && (
                    <span style={customStyles.errorMsg}>
                      Please enter province name
                    </span>
                  )}
                </div>
              </div>

              <div className="col-lg-4">
                <p>
                  Description<i className="text-danger">*</i>
                </p>
                <textarea
                  name="Description"
                  className="form-control"
                  {...register("Description", { required: true })}
                  placeholder="Description"
                />
                <div>
                  {errors.Description && (
                    <span style={customStyles.errorMsg}>
                      Please enter description
                    </span>
                  )}
                </div>
              </div>
            </div>
            <br></br>
            <div className="row mx-0">
              <div className="col-lg-8"></div>
              <div className="col-lg-2">
                <Link href="/Masters/StateMaster">
                  <button
                    type="button"
                    className="btn common-edit"
                    id={Styles.btn}
                  >
                    Close
                  </button>
                </Link>
              </div>
              <div className="col-lg-2">
               
                  <button type="submit" className="btn" id={Styles.btn}>
                    Save
                  </button>
                
              </div>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
}

export default StateMasterForm;
