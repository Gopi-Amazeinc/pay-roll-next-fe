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
         <div className="container-fluid">
            <p className="Heading">Shift Master Details </p>
            <div className="row">
               <div className="col-lg-12">
                  <div className="card border-0 rounded-3 p-3">
                     <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="row">
                           <div className="col-lg-2">
                              <label className="fw-bold">Short<span style={{ color: "red" }}>*</span></label>
                              <input type="text" placeholder="Enter Shift Name" name="Short" id="Short" className="form-control " {...register("Short", { required: "This field is required", pattern: { value: '^[A-Za-z0-9 ]+$', message: "Please enter a valid Detail" } })} />
                              {errors.Short && <p className="error-message" style={customStyles.errorMsg}>{errors.Short.message}</p>}
                           </div>
                           <div className="col-lg-2">
                              <label className="fw-bold">Description<span style={{ color: "red" }}>*</span></label>
                              <input type="text" placeholder="Enter Description" name="Description" id="Description" className="form-control " {...register("Description", { required: "This field is required", pattern: { value: '^[A-Za-z0-9 ]+$', message: "Please enter a valid Detail" } })} />
                              {errors.Description && <p className="error-message" style={customStyles.errorMsg}>{errors.Description.message}</p>}
                           </div>
                           <div className="col-lg-2">
                              <label className="fw-bold">Shift Timings<span style={{ color: "red" }}>*</span></label>
                              <input type="text" placeholder="Enter Shift Timeings" name="ShiftTimeings" id="ShiftTimeings" className="form-control " {...register("ShiftTimeings", { required: "This field is required" })} />
                              {errors.ShiftTimeings && <p className="error-message" style={customStyles.errorMsg}>{errors.ShiftTimeings.message}</p>}
                           </div>
                           <div className="col-lg-2">
                              <label className="fw-bold">Grace Period<span style={{ color: "red" }}>*</span></label>
                              <input type="tel" placeholder="Enter Grace Period" name="Grace" id="Grace" className="form-control " {...register("Grace", { required: "This field is required" })} />
                              {errors.Grace && <p className="error-message" style={customStyles.errorMsg}>{errors.Grace.message}</p>}
                           </div>
                           <div className="col-lg-2">
                              <label className="fw-bold">Shift Type<span style={{ color: "red" }}>*</span></label>
                              <input type="tel" placeholder="Enter Shift Type" name="ShiftType" id="ShiftType" className="form-control " {...register("ShiftType", { required: "This field is required" })} />
                              {errors.ShiftType && <p className="error-message" style={customStyles.errorMsg}>{errors.ShiftType.message}</p>}
                           </div>
                        </div>
                        <br></br>
                        <div className="row" >
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
         </div>
      </Layout>
   );
}

export default ShiftMasterForm;
