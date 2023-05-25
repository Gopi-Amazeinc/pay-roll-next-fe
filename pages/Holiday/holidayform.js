import React from 'react'
import Layout from '@/components/layout/layout'
import { useForm } from "react-hook-form";
import axios from "axios";
import Link from "next/link";
import Swal from "sweetalert2";
import { useState, useEffect } from 'react';
import { apiService } from "@/services/api.service";
import { useRouter } from "next/router";


function Holidayform({ editData }) {

  const { register, handleSubmit, watch, reset, formState: { errors }, } = useForm();
  let hostURL = process.env.NEXT_PUBLIC_API_HOST_URL;
  const router = useRouter();
  const [actionType, setActionType] = useState("insert");


  useEffect(() => {
    const { id } = editData || {};
    if (id) {
      getHolidayByID(id);
    } else {
      clearForm();
    }
  }, []);
  const getHolidayByID = async (id) => {
    const res = await apiService.commonGetCall("HR/GetHolidaysByID?ID=" + id);
    clearForm(res.data[0]);
  };


  function clearForm(HolidaysData = null) {
    // debugger;
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



  const onSubmit = async (data) => {
    if (actionType == "insert") {
      await apiService.commonPostCall("HR/InsertHolidays", data);
      Swal.fire("Data Inserted successfully");
      router.push("/Holiday");
    } else {
      await apiService.commonPostCall("HR/UpdateHolidays", data);
      Swal.fire("Data Updated successfully");
      router.push("/Holiday");
    }
  };



  // async function onSubmit(data) {
  //   console.log(data);
  //   let hostURL = process.env.NEXT_PUBLIC_API_HOST_URL;
  //   if (actionType == "insert") {
  //     try {
  //       await axios.post(hostURL +"HR/InsertHolidays", data); // this for insrting the data using inserting Api call 
  //       alert("Data inserted")
  //       location.href = "/Holiday"
  //     } catch (error) {
  //       alert("data not inserted")

  //     }

  //   } else {
  //     await axios.post(hostURL + "HR/UpdateHolidays", data); // this is for updating or Modifiying the data using  Update Api call
  //     alert("updated");
  //     location.href = "/Holiday";
  //   }
  // }


  return (
    <Layout>
      <div className='container-fluid'>
        <p className='Heading'>Holidays</p>
        <div className='row'>
          <div className='col-lg-12'>
            <div className='card border-0 p-3 rounded-3'>
              <div className='row'>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="row">
                    <div className="col-lg-4">
                      <p>
                        Holiday<i className="text-danger">*</i>
                      </p>
                      <input type="text" className="form-control" placeholder="Holiday"
                        {...register('Holiday', { required: "Please add a  Name" })} />
                      {errors.Holiday && <p className="error-message" style={customStyles.errorMsg}>{errors.Holiday.message}</p>}
                    </div>

                    <div className="col-lg-4">
                      <p>
                        Holiday Description<i className="text-danger">*</i>
                      </p>
                      <textarea
                        className="form-control"
                        placeholder="Holiday Description" minLength={10}
                        {...register('HolidayDescription', { required: "Please add a Descrption " })}
                      ></textarea>
                      {errors.HolidayDescription && <p className="error-message" style={customStyles.errorMsg}>{errors.HolidayDescription.message}</p>}
                    </div>

                    <div className="col-lg-4">
                      <p>
                        Holiday Date<i className="text-danger">*</i>
                      </p>
                      <input type="date" className="form-control" placeholder="Holiday Date"{...register('HolidayDate', { required: "Please add Date " })} />
                      {errors.HolidayDate && <p className="error-message" style={customStyles.errorMsg}>{errors.HolidayDate.message}</p>}
                    </div>
                  </div>


                  <div className="row">
                    <div className="col-lg-4">
                      <p>
                        Attachment<i className="text-danger">*</i>
                      </p>
                      <input type="text" className="form-control" placeholder="Attachment"{...register('Attachment', { required: "Please add file" })} />
                      {errors.Name && <p className="error-message"  style={customStyles.errorMsg}>{errors.Name.message}</p>} {errors.Attachment && <p className="error-message" style={{ color: "red" }}>{errors.Attachment.message}</p>}
                    </div>
                    <div className="col-lg-4">
                      <p>
                        Holiday Category<i className="text-danger">*</i>
                      </p>
                      <input type="text" className="form-control" placeholder="Holiday Category"{...register('HolidayCategory', { required: "Please add HolidayCategory"})} />
                      {errors.HolidayCategory && <p className="error-message"  style={customStyles.errorMsg}>{errors.HolidayCategory.message}</p>}
                    </div>
                    <div className="col-lg-4">
                      <p>
                        Region<i className="text-danger">*</i>
                      </p>
                      <input type="text" className="form-control" placeholder="Region"{...register('Region', { required: "Please add Region" })} />
                      {errors.Region && <p className="error-message"  style={customStyles.errorMsg}>{errors.Region.message}</p>}
                    </div>
                  </div>
                  <br />
                  <div className="row">
                    <div className="col-lg-8"></div>
                    <div className="col-lg-2">
                      <Link href="/Holiday">
                        <button type="submit" className="AddButton">Cancel</button>
                      </Link>
                    </div>
                    <div className="col-lg-2 ">
                      {actionType == "insert" && (
                        <button type="submit" className="AddButton"> Save</button>)}

                      {actionType == "update" && (
                        <button type="submit" className="AddButton">  Update </button>)}
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Holidayform





