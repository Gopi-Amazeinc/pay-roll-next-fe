import React, { useState, useEffect } from "react";
import Styles from "../../../styles/employmentJobHistory.module.css";
import Link from 'next/link';
import Layout from '@/components/layout/layout.js';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import Swal from 'sweetalert2';

function ShiftMasterForm({ editData }) {
   const { register, handleSubmit, reset, formState } = useForm();
   const { errors } = formState;
   const [actionType, setActionType] = useState("insert");

   async function onSubmit(data) {
      let hostURL = process.env.NEXT_PUBLIC_API_HOST_URL;

      if (actionType == "insert") {
         // This API is used to insert the data to the ShiftMaster table
         await axios.post(hostURL + "Master/InsertShiftMaster", data);
         Swal.fire({
            icon: "success",
            title: "Hurray..",
            text: "Data was inserted...!",
         });
         location.href = "/Masters/ShiftMaster"
      }
      else {
         // This API is used to update the data in the ShiftMaster table
         debugger
         let dsfdsfd = await axios.post(hostURL + "Master/UpdateShiftMaster/", data);
         Swal.fire({
            icon: "success",
            title: "Hurray..",
            text: "Data was updated...!",
         });
         location.href = "/Masters/ShiftMaster"
      }
   }

   function clearForm(otData = null) {
      let details = {
         "ID":otData ? otData.id : "",
         "Short": otData ? otData.short : "",
         "Description": otData ? otData.description : "",
         "ShiftTimeings": otData ? otData.shiftTimeings : "",
         "Grace": otData ? otData.grace : "",
         "ShiftType": otData ? otData.shiftType : ""
      }
      reset(details);
      setActionType(otData ? "update" : 'insert')
   }

   useEffect(() => {
      if (editData == "") {
         clearForm()
      }
      else {
         clearForm(editData);
      }
   }, []);
   return (
      <Layout>
         <div className="container">
            <div className="row">
               <div className="col-md-12">
                  <div className="row">
                     <div className="col-lg-2">
                        <h3 className="Heading">Shift Master Details </h3>
                     </div>
                     <div className="col-lg-8">
                     </div>
                     <div className="col-lg-2">
                     </div>
                  </div>
               </div>
               <div className="card border-0 shadow mt-2 mx-0">
                  <form onSubmit={handleSubmit(onSubmit)}>
                     <div className="row">
                        <div className="col-md-2">
                           <label >Short<span style={{ color: "red" }}>*</span></label>
                           <input type="text" placeholder="Enter Shift Name" name="Short" id="Short" className="form-control " {...register("Short", { required: "This field is required", pattern: { value: '^[A-Za-z0-9 ]+$', message: "Please enter a valid Detail" } })} />
                           {errors.Short && <p className="error-message" style={{ color: "red" }}>{errors.Short.message}</p>}
                        </div>
                        <div className="col-md-2">
                           <label >Description<span style={{ color: "red" }}>*</span></label>
                           <input type="text" placeholder="Enter Description" name="Description" id="Description" className="form-control " {...register("Description", { required: "This field is required", pattern: { value: '^[A-Za-z0-9 ]+$', message: "Please enter a valid Detail" } })} />
                           {errors.Description && <p className="error-message" style={{ color: "red" }}>{errors.Description.message}</p>}
                        </div>
                        <div className="col-md-2">
                           <label >Shift Timings<span style={{ color: "red" }}>*</span></label>
                           <input type="text" placeholder="Enter Shift Timeings" name="ShiftTimeings" id="ShiftTimeings" className="form-control " {...register("ShiftTimeings", { required: "This field is required" })} />
                           {errors.ShiftTimeings && <p className="error-message" style={{ color: "red" }}>{errors.ShiftTimeings.message}</p>}
                        </div>
                        <div className="col-md-2">
                           <label >Grace Period<span style={{ color: "red" }}>*</span></label>
                           <input type="tel" placeholder="Enter Grace Period" name="Grace" id="Grace" className="form-control " {...register("Grace", { required: "This field is required" })} />
                           {errors.Grace && <p className="error-message" style={{ color: "red" }}>{errors.Grace.message}</p>}
                        </div>
                        <div className="col-md-2">
                           <label >Shift Type<span style={{ color: "red" }}>*</span></label>
                           <input type="tel" placeholder="Enter Shift Type" name="ShiftType" id="ShiftType" className="form-control " {...register("ShiftType", { required: "This field is required" })} />
                           {errors.ShiftType && <p className="error-message" style={{ color: "red" }}>{errors.ShiftType.message}</p>}
                        </div>
                     </div>
                     <br></br>
                     <div className="row mx-0" style={{ marginBottom: "5px" }}>
                        <div className="col-lg-8"></div>
                        <div className="col-lg-2 ">
                           <Link href="/Masters/ShiftMaster" > <button className="AddButton"> Cancel</button></Link>
                        </div>
                        <div className="col-lg-2 ">
                           {/* <button className="btn btn-primary btn-sm shadow-lg" style={{ marginLeft: "10px" }} id={Styles.addNew} >Save </button> */}
                           {
                              actionType == "insert" && (
                                 <button type='submit' style={{ color: 'white' }} className="AddButton">Save</button>
                              )
                           }
                           {
                              actionType == "update" && (
                                 <button type='submit' style={{ color: 'white' }} className="AddButton">Update</button>
                              )
                           }
                        </div>
                     </div>
                  </form>
               </div>
            </div>
         </div>
      </Layout>
   );
}

export default ShiftMasterForm;
