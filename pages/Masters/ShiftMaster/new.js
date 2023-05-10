import React, { useState, useEffect } from "react";
import Link from 'next/link';
import Layout from '@/components/layout/layout.js';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { apiService } from "@/services/api.service";
import { useRouter } from "next/router";

function ShiftMasterForm({ editData }) {
   const { register, handleSubmit, reset, formState } = useForm();
   const { errors } = formState;
   const router = useRouter();
   const [actionType, setActionType] = useState("insert");

   const onSubmit = async (data) => {
      if (actionType == "insert") {
         await apiService.commonPostCall("Master/InsertShiftMaster", data);
         Swal.fire("Data Inserted successfully");
         router.push("/Masters/ShiftMaster");
      } else {
         await apiService.commonPostCall("Master/UpdateShiftMaster", data);
         Swal.fire("Data Updated successfully");
         router.push("/Masters/ShiftMaster");
      }
   };

   function clearForm(shiftdata = null) {
      let details = {
         "ID": shiftdata ? shiftdata.id : "",
         "Short": shiftdata ? shiftdata.short : "",
         "Description": shiftdata ? shiftdata.description : "",
         "ShiftTimeings": shiftdata ? shiftdata.shiftTimeings : "",
         "Grace": shiftdata ? shiftdata.grace : "",
         "ShiftType": shiftdata ? shiftdata.shiftType : ""
      }
      reset(details);
      setActionType(shiftdata ? "update" : "insert");
   }

   useEffect(() => {
      const { id } = editData || {};
      if (id) {
         // This API is used to fetch the data from BarangayMaster ByID table
         getShiftMasterByID(id);
      } else {
         clearForm();
      }
   }, []);
   const getShiftMasterByID = async (id) => {
      const res = await apiService.commonGetCall(
         "Master/GetShiftMasterByID?ID=" + id
      );
      clearForm(res.data[0]);
   };


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
   );
}

export default ShiftMasterForm;
