import React from 'react'
import Layout from '@/components/layout/layout'
import { useForm } from "react-hook-form";
import axios from "axios";
import Link from "next/link";
import Swal from "sweetalert2";
import { useState, useEffect } from 'react';
import { apiService } from "@/services/api.service";
import { useRouter } from "next/router";
import { useDropzone } from 'react-dropzone';
import { useCallback } from 'react';



function Holidayform({ editData }) {

  const { register, handleSubmit, watch, reset, formState: { errors }, } = useForm();
  let hostURL = process.env.NEXT_PUBLIC_API_HOST_URL;
  const router = useRouter();
  const [actionType, setActionType] = useState("insert");
  const [filePath, setFilePath] = useState();
  const [fileName, setFileName] = useState();


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
    debugger

    if (actionType == "insert") {
      let entity = {
        "Attachment": filePath
      }
      const formData = { ...data, ...entity }
      await apiService.commonPostCall("HR/InsertHolidays", formData);
      Swal.fire("Data Inserted successfully");
      router.push("/Holiday");
    } else {
      let entity = {
        "Attachment": filePath
      }
      const formData = { ...data, ...entity }
      await apiService.commonPostCall("HR/UpdateHolidays", formData);
      Swal.fire("Data Updated successfully");
      router.push("/Holiday");
    }
  };


  const onDrop = useCallback((acceptedFiles) => {
    debugger;
    console.log(acceptedFiles, "Uploaded file");
    uploadFile(acceptedFiles);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const uploadFile = async (data) => {
    debugger
    let hostURL = process.env.NEXT_PUBLIC_API_HOST_URL;
    const formData = new FormData();
    formData.append("file_upload", data[0], data[0].name);
    setFileName(data[0].name)
    console.log(data[0].name)
    let invoiceURL = await axios.post(
      hostURL + "Payroll/ProjectAttachments",
      formData
    );
    // console.log(res, "File Path");
    // Swal.fire("Uploaded successfully");
    // setFilePath(res.data);

    // TODO: Gopi's code for validation
    let environmentVariable = "https://103.12.1.103";

    let imagePath = invoiceURL.data.split("\\", 1);
    let Preview = invoiceURL.data.replace(imagePath, environmentVariable);
    Swal.fire('Uploaded successfully.');
    // setFilePath(invoiceURL.data);
    setFilePath(Preview);
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
                      {/* <input type="text" className="form-control" placeholder="Attachment"{...register('Attachment', { required: "Please add file" })} /> */}
                      <div style={{ border: '2px dashed black' }}>
                        <div {...getRootProps()}>
                          <input {...getInputProps()} />
                          {isDragActive ? (
                            <p>Drop the files here ...</p>
                          ) : (
                            <p style={{ padding: "6%" }}>
                              {
                                filePath == null && (
                                  <p>Drag 'n' drop some files here, or click to select
                                    files</p>
                                )
                              }
                              {
                                filePath && (
                                  <p>{fileName}</p>
                                )
                              }
                            </p>
                          )}
                        </div>

                      </div>
                      {errors.Name && <p className="error-message" style={customStyles.errorMsg}>{errors.Name.message}</p>} {errors.Attachment && <p className="error-message" style={{ color: "red" }}>{errors.Attachment.message}</p>}
                    </div>
                    <div className="col-lg-4">
                      <p>
                        Holiday Category<i className="text-danger">*</i>
                      </p>
                      <input type="text" className="form-control" placeholder="Holiday Category"{...register('HolidayCategory', { required: "Please add HolidayCategory" })} />
                      {errors.HolidayCategory && <p className="error-message" style={customStyles.errorMsg}>{errors.HolidayCategory.message}</p>}
                    </div>
                    <div className="col-lg-4">
                      <p>
                        Region<i className="text-danger">*</i>
                      </p>
                      <input type="text" className="form-control" placeholder="Region"{...register('Region', { required: "Please add Region" })} />
                      {errors.Region && <p className="error-message" style={customStyles.errorMsg}>{errors.Region.message}</p>}
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





