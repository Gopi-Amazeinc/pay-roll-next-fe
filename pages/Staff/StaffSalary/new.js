import React from 'react'
import { useEffect, useState } from 'react';
import Layout from '../../../components/layout/layout'
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import axios from 'axios';
import Swal from 'sweetalert2';
import { apiService } from "@/services/api.service";
import { useRouter } from "next/router";

const AddStaffSalaryForm = ({ editData }) => {
   const router = useRouter();
   //  let hostURL = process.env.NEXT_PUBLIC_API_HOST_URL

    const { register, handleSubmit, reset, formState } = useForm();
    const [Staff, setStaff] = useState([]);
    const { errors } = formState;
 
    let [actionType, setActionType] = useState("insert");
 
    useEffect(() => {
        getData();
        const { id } = editData || {};
        if (id) {
         getByID(id);
        } else {
          clearForm();
        }
     }, [1]);

     const getData = async()=> {
        let res = await apiService.commonGetCall("HR/GetAllStaffNew"); // This API is used for fetch the  data for Dropdown
        setStaff(res.data);
     }
     const getByID = async (id)=>{
      debugger
      const res = await apiService.commonGetCall("HR/GetMyDetailsByStaffID?id="+id);
      clearForm(res.data[0]);
     }

     function clearForm(staffSalary = null) {
        let details = {
           "ID": staffSalary ? staffSalary.id : "",
           "BaseSal": staffSalary ? staffSalary.baseSal : "",
           "effectivedate": staffSalary ? staffSalary.effectivedate : "",
           "daysinmonth": staffSalary ? staffSalary.daysinmonth : "",
           "hoursinday": staffSalary ? staffSalary.hoursinday : "",
        }
        reset(details);
        setActionType(staffSalary ? "update" : 'insert')
     }

    const onSubmit = async(data) => {
      debugger
      if (actionType == "insert") {
          await apiService.commonPostCall('Payroll/UpdateDe_minimis_Detailsforstaff', data);
          Swal.fire({ icon: "success", text: "Data Successfully added" })
          location.href = ("/Payroll/staffsalarycomponent");
      } else 
      {
         await apiService.commonPostCall('Payroll/UpdateDe_minimis_Detailsforstaff', data);
         Swal.fire({ icon: "success", text: "Data updated successfully" })
         location.href = ("/Payroll/staffsalarycomponent");
      }

    }
    
    
 
    return (
       <Layout>
             <br />
             <form onSubmit={handleSubmit(onSubmit)}>
                <div className="container">
                   <div className="row">
                      <div className="col-lg-12">
                         
                           <h3 className="Heading">Salary Details</h3>
                         <br />

                         <div className="card p-3">
                            <div className="row">
                               <div className="col-lg-2"><label>Staff</label></div>
                               <div className="col-lg-3">
                                  <p>Basic Salary.</p>
                               </div>
                               <div className="col-lg-3">
                                  <p>Effective Date</p>
                               </div>
                               <div className="col-lg-2">
                                  <p>Working Days In Month</p>
                               </div>
                               <div className="col-lg-2">
                                  <p>Working Hours In Day</p>
                               </div>
                            </div>
                            <div className="row">
                               <div className="col-lg-2">
                                  <div className="dropdown">
                                     <select id="Staff" name="Staff" className="form-control" {...register("Staff", { required: true })}>
                                        <option value="" disabled="">
                                           Select staff </option>
                                        {
                                           Staff.map((data, index) => {
                                              return (
                                                 <option value={data.id} key={data.id}>{data.name}</option>
                                              )
                                           })
                                        }
                                     </select>
                                  </div>
                               </div>
                               <div className="col-lg-3"><input {...register('BaseSal')} type="number" id="BaseSal" name="BaseSal" placeholder="Basic Salary" className="form-control " /></div>
                               <div className="col-lg-3"><input {...register('effectivedate')} type="date" id="effectivedate" name="effectivedate" placeholder="New Salary" className="form-control " /></div>
                               <div className="col-lg-2"><input {...register('daysinmonth')} type="number" id="daysinmonth" name="daysinmonth" placeholder="Working Days In Month" className="form-control " /></div>
                               <div className="col-lg-2"><input {...register('hoursinday')} type="number" id="hoursinday" name="hoursinday" placeholder="Working Hours In Day" className="form-control " /></div>
                            </div>
                            <div className="row mt-3">
                               <div className='col-lg-8'></div>
                               <div className="col-lg-2">
 
                                     <button type="submit" className="AddButton">
 
                                        Save
 
                                     </button>
 
                               </div>
 
                               <div className='col-lg-2'>
                                  <Link href="/Staff/StaffSalary"><button className="AddButton">Cancel</button></Link>
                               </div>
 
                            </div>
                         </div>
                      </div>
                   </div>
                </div>
 
                <br />
             </form>
       </Layout>
    )
 }
 
 export default AddStaffSalaryForm