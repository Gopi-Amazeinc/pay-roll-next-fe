import React from 'react'
import Layout from '@/components/layout/layout'
import { useForm } from "react-hook-form";
import axios from "axios";
import Link from "next/link";
import Swal from "sweetalert2";
import { useState,useEffect } from 'react';


function Holidayform({editData}) {

  const { register, handleSubmit, watch, reset, formState: { errors }, } = useForm();
  const [actionType, setActionType] = useState("insert")

  useEffect(() => {
    if (editData == "") {
      clearForm();
  }
  else {

      clearForm(editData);
  }
  
  
  
  // getHoliday();
  }, [1]);


  function clearForm(HolidaysData = null) {
    debugger;
    let details = {
      "ID": HolidaysData ? HolidaysData.id : "",
      "Holiday": HolidaysData ? HolidaysData.holiday : "",
      "HolidayDescription": HolidaysData ? HolidaysData.holidayDescription : "",
      "HolidayDate": HolidaysData ? HolidaysData.holidayDate : "",
      "Attachment": HolidaysData ? HolidaysData.attachment : "",
      "HolidayCategory": HolidaysData ? HolidaysData.holidayCategory : "",
      "Region": HolidaysData ? HolidaysData.region : ""

    };
    reset(details);
    setActionType(HolidaysData ? "update" : "insert");
  }


  async function onSubmit(data) {

    console.log(data);
    let hostURL = process.env.NEXT_PUBLIC_API_HOST_URL;
    if (actionType == "insert") {
      try {
        await axios.post(hostURL + "HR/InsertHolidays", data); // this for insrting the data using inserting Api call 
        Swal.fire('Data Inserted successfully')
        location.href = "/Holiday";
      } catch (error) {
        alert("data not inserted")

      }

    } else {
      await axios.post(hostURL + "HR/UpdateHolidays", data); // this is for updating or Modifiying the data using  Update Api call
      Swal.fire('Updated successfully')
      location.href = "/Holiday";
    }
  }


  return (
    <div>
      <Layout>
        <div>
          <h3 className="text-primary fs-5 mt-3">Holidays</h3>
          <div className="card p-3 border-0 shadow-lg rounded-3 mt-4">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="row">
                <div className="col-lg-4">
                  <p>
                    Holiday<i className="text-danger">*</i>
                  </p>
                  <input type="text" className="form-control" placeholder="Holiday"{...register('Holiday', { required: "Please add a Short Name", pattern: { value: /^[A-Za-z0-9]+$/, message: "Please enter a valid Short Name" } })} />
                  {errors.Name && <p className="error-message" style={{ color: "red" }}>{errors.Name.message}</p>}
                </div>

                <div className="col-lg-4">
                  <p>
                    Holiday Description<i className="text-danger">*</i>
                  </p>
                  <textarea
                    className="form-control"
                    placeholder="Holiday Description"
                    {...register('HolidayDescription', { required: "Please add a Descrption Name", pattern: { value: /^[A-Za-z0-9]+$/, message: "Please enter a valid Descrption Name" } })}
                  ></textarea>
                  {errors.Name && <p className="error-message" style={{ color: "red" }}>{errors.Name.message}</p>}
                </div>

                <div className="col-lg-4">
                  <p>
                    Holiday Date<i className="text-danger">*</i>
                  </p>
                  <input type="date" className="form-control" placeholder="Holiday Date"{...register('HolidayDate', { required: "true" })} />
                  {errors.Name && <p className="error-message" style={{ color: "red" }}>{errors.Name.message}</p>}
                </div>
              </div>


              <div className="row">
                <div className="col-lg-4">
                  <p>
                    Attachment<i className="text-danger">*</i>
                  </p>
                  <input type="text" className="form-control" placeholder="Attachment"{...register('Attachment', { required: "Please add a Short Name", pattern: { value: /^[A-Za-z0-9]+$/, message: "Please enter a valid Short Name" } })} />
                  {errors.Name && <p className="error-message" style={{ color: "red" }}>{errors.Name.message}</p>}
                </div>
                <div className="col-lg-4">
                  <p>
                    Holiday Category<i className="text-danger">*</i>
                  </p>
                  <input type="text" className="form-control" placeholder="Holiday Category"{...register('HolidayCategory', { required: "Please add a Short Name", pattern: { value: /^[A-Za-z0-9]+$/, message: "Please enter a valid Short Name" } })} />
                  {errors.Name && <p className="error-message" style={{ color: "red" }}>{errors.Name.message}</p>}
                </div>
                <div className="col-lg-4">
                  <p>
                    Region<i className="text-danger">*</i>
                  </p>
                  <input type="text" className="form-control" placeholder="Region"{...register('Region', { required: "Please add a Short Name", pattern: { value: /^[A-Za-z0-9]+$/, message: "Please enter a valid Short Name" } })} />
                  {errors.Name && <p className="error-message" style={{ color: "red" }}>{errors.Name.message}</p>}
                </div>
              </div>

              <div className="row mt-5">
                <div className="col-lg-8"></div>
                <div className="col-lg-2  text-end">
                  <Link href="/Holiday">
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
    </div>
  )
}

export default Holidayform





