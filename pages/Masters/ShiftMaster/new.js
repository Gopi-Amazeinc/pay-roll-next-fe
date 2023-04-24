import React, { useState, useEffect } from "react";
import Styles from "../../styles/employmentJobHistory.module.css";
import Link from 'next/link';
import Layout from '@/Components/layout';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import Swal from 'sweetalert2';

function ShiftMasterForm() {
   const { register, handleSubmit, reset, formState } = useForm();
   const { errors } = formState;
   const [actionType, setActionType] = useState("insert");

   useEffect(() => {
      async function getShiftList() {
         const id = sessionStorage.getItem("id");
         if (id) {
            let hostURL = process.env.NEXT_PUBLIC_API_HOST_URL;
             // This API is used to fetch the dashboard data from ShiftMaster table based on ID
            const response = await axios.get(hostURL + "Master/GetShiftMasterByID?ID=" + id);
            clearForm(response.data[0])
         }
         else {
            clearForm();
         }
      }
      getShiftList();
   }, [1]);


   function clearForm(otData = null) {
      let details = {
         "ID": otData ? otData.id : "",
         "Short": otData ? otData.short : "",
         "Description": otData ? otData.description : "",
         "ShiftTimeings": otData ? otData.shiftTimeings : "",
         "Grace": otData ? otData.grace : "",
         "ShiftType": otData ? otData.shiftType : ""
      }
      reset(details);
      setActionType(otData ? "update" : 'insert')
   }

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
      }
      else {
          // This API is used to update the data in the ShiftMaster table
         await axios.post(hostURL + "Master/UpdateShiftMaster", data);
         Swal.fire({
            icon: "success",
            title: "Hurray..",
            text: "Data was updated...!",
         });
      }
   }
   return (
      <Layout>
         <div className="container-fluid">
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
               <div className="card">
                  <form onSubmit={handleSubmit(onSubmit)}>
                     <div className="row leavereq">
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
                     <div className="row" style={{ marginBottom: "10px" }}>
                        <div className="col-lg-7"></div>
                        <div className="col-lg-2">
                           <Link href="/Masters/shiftmaster" > <button className="btn btn-primary btn-sm shadow-lg" id={Styles.addNew}> Cancel</button></Link>
                        </div>
                        <div className="col-lg-3">
                           {/* <button className="btn btn-primary btn-sm shadow-lg" style={{ marginLeft: "10px" }} id={Styles.addNew} >Save </button> */}
                           {
                              actionType == "insert" && (
                                 <button type='submit' id={Styles.addNew} style={{ color: 'white' }} className="btn btn-primary btn-sm shadow-lg">Save</button>
                              )
                           }
                           {
                              actionType == "update" && (
                                 <button type='submit' id={Styles.addNew} style={{ color: 'white' }} className="btn btn-primary btn-sm shadow-lg">Update</button>
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
