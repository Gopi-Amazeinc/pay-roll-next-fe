import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import Link from "next/link";
import Swal from "sweetalert2";
import Layout from "@/components/layout/layout";
import { useRouter } from 'next/router';

const AddStaffSalaryForm = () => {
  let hostURL = process.env.NEXT_PUBLIC_API_HOST_URL

  const { register, handleSubmit, reset, formState } = useForm();
  const [Staff, setStaff] = useState([]);
  const router = useRouter()
  const { id } = router.query
  const { errors } = formState;

  useEffect(() => {
      getData();
      getByID();
   }, [1]);

   async function getData() {
      let res = await axios.get(hostURL + "HR/GetAllStaffNew"); // This API is used for fetch the  data for Dropdown
      setStaff(res.data);
   }
   const getByID = async () => {
    if (id) {
      let response = await axios.get(
        hostURL + "HR/GetMyDetailsByStaffID?id=" + id
      );
      clearForm(response.data[0])
    } else {
      clearForm();
    }
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
   }

  async function onSubmit(data) {
        await axios.post(hostURL + 'Payroll/UpdateDe_minimis_Detailsforstaff', data);
        Swal.fire({ icon: "success", text: "Data Successfully added" })
        location.href = ("/Payroll/staffsalarycomponent");
     }
    
  return (
     <Layout>
        <div className="col-lg-10" >
           <br />
           <form onSubmit={handleSubmit(onSubmit)}>
              <div className="container-fluid">
                 <div className="row">
                    <div className="col-md-12">
                       <div className="row">
                          <div className="col-lg-8">
                             <h3 className="Heading">Salary Details</h3>
                          </div>
                          <div className="col-lg-1"></div>
                          <div className="col-lg-2"></div>
                       </div>
                       <br />
                       <div className="card shadow-lg p-4">
                          <div className="row leavereq">
                             <div className="col-md-2"><label>Staff</label></div>
                             <div className="col-md-3">
                                <p>Basic Salary.</p>
                             </div>
                             <div className="col-md-3">
                                <p>Effective Date</p>
                             </div>
                             <div className="col-md-2">
                                <p>Working Days In Month</p>
                             </div>
                             <div className="col-md-2">
                                <p>Working Hours In Day</p>
                             </div>
                          </div>
                          <div className="row leavereq">
                             <div className="col-md-2">
                                <div className="dropdown">
                                   <select id="Staff" name="Staff" className="form-control" {...register("Staff", { required: true })}>
                                      <option value="" disabled="">
                                         Select staff </option>
                                      {
                                         Staff.map((data) => {
                                            return (
                                               <option value={data.id} key={data.id}>{data.name}</option>
                                            )
                                         })
                                      }
                                   </select>
                                </div>
                             </div>
                             <div className="col-md-3"><input {...register('BaseSal')} type="number" id="BaseSal" name="BaseSal" placeholder="Basic Salary" className="form-control " /></div>
                             <div className="col-md-3"><input {...register('effectivedate')} type="date" id="effectivedate" name="effectivedate" placeholder="New Salary" className="form-control " /></div>
                             <div className="col-md-2"><input {...register('daysinmonth')} type="number" id="daysinmonth" name="daysinmonth" placeholder="Working Days In Month" className="form-control " /></div>
                             <div className="col-md-2"><input {...register('hoursinday')} type="number" id="hoursinday" name="hoursinday" placeholder="Working Hours In Day" className="form-control " /></div>
                          </div>
                          <div className="row mt-3">
                             <div className='col-lg-8'></div>
                             <div className="col-lg-2">

                                   <button type="submit" className="btn btn-primary AddButton">

                                      Update

                                   </button>

                             </div>

                             <div className='col-lg-2'>
                                <Link href="/Staff/staffsalarycomponent"><button className="btn btn-primary AddButton">Cancel</button></Link>
                             </div>

                          </div>
                       </div>
                    </div>
                 </div>
              </div>

              <br />
           </form>
        </div>
     </Layout>
  )
}

export default AddStaffSalaryForm
