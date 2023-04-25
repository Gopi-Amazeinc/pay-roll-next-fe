import Layout from '@/components/layout/layout'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
// import overtime from "../../styles/Requests/overtimedetailsform.module.css"
import Modal from 'react-modal';
import axios from 'axios';
// import Styles from "../../styles/initialpayrolldetails.module.css";
import Link from 'next/link';

const Applyot = () => {
   const [overtimeDetail, setOvertimeDetail] = useState([]);
   useEffect(() => {
      async function getData() {
         let hostURL = process.env.NEXT_PUBLIC_API_HOST_URL;
         // This API is used for fetch the Requests data in modal//
         let res = await axios.get(hostURL + "HR/GetStaffOverTimeDetails");
         setOvertimeDetail(res.data);
      }
      getData()
   }, []);

   const customStyles = {
      content: {
         top: '50%',
         left: '50%',
         right: 'auto',
         marginRight: '-50%',
         transform: 'translate(-50%, -50%)',
         width: '60%'
      }
   };

   const [modalIsOpen, setIsOpen] = useState(false);
   const [date, getDate] = useState("")

   function openModal() {
      setIsOpen(true);
   }

   function closeModal() {
      setIsOpen(false);
   }
   const insertdata = async (data) => {
      debugger;
      let hostURL = process.env.NEXT_PUBLIC_API_HOST_URL;
      await axios.post(hostURL + "HR/InsertStaffOverTimeDetails", data);
      console.log(data);
   }


   const { register, handleSubmit, reset, formState: { errors }, } = useForm();
   return (
      <Layout>
         <div className="container-fluid">
            <div className="row card shadow">
               <form onClick={handleSubmit(insertdata)}>
                  <div className="col-12">
                     <p className="Heading">Add Actual Time</p>
                  </div>
                  <br />
                  <br />
                  <div className='row'>
                     <div className='col-lg-3'>
                        <p>Date Request <i className='text-danger'>*</i></p>
                        <input type='date' className='form-control' {...register('Date_Request', { required: true })} />
                        {errors.Date_Request && (<p className='text-danger mt-2'>Select Valid Date</p>)}
                     </div>
                     <div className='col-lg-3'>
                        <p>Start Date <i className='text-danger'>*</i></p>
                        <input type='time' className='form-control' {...register('Actuval_StartTime', { required: true })} />
                        {errors.Actuval_StartTime && (<p className='text-danger mt-2'>Select Valid Start Time</p>)}
                     </div>
                     <div className='col-lg-3'>
                        <p>End Date <i className='text-danger'>*</i></p>
                        <input type='time' className='form-control' {...register('Actuval_EndTime', { required: true })} />
                        {errors.Actuval_EndTime && (<p className='text-danger mt-2'>Select Valid End Time</p>)}
                     </div>
                  </div>
                  <br />
                  <br />
                  <div className='row' >
                     <div className='col-lg-3'>
                        <p>Supporting Documents</p>
                        {/* <div className={overtime.drop} > */}
                        <div>
                           <br />
                           <input type="file" id="undefined" multiple="" accept=".png,.jpg,.jpeg,application/pdf" />

                           <br />
                           <br />
                           Drop files here Only PDF,PNG,JPEG,JPG
                           (max 5mb)


                        </div>
                     </div>
                     <br />
                     <br />
                     <div className='col-lg-3'>
                        <p>Purpose</p>
                        <div ><textarea rows="3" id="Comments" name="Comments" type="text" placeholder="Write here..." className="form-control inputfield "></textarea></div>
                     </div>
                  </div >
                  <div className="d-flex justify-content-end w-100 mt-2 mb-2 pr-2">
                     <Link href="/OT/myovertimedetails"> <button className="submit-button" >Cancel</button></Link>
                     <button className="submit-button">Submit</button><button data-toggle="modal" data-target="#mytestid" className="submit-button" onClick={openModal}>OT Details</button>
                  </div>
               </form>
               <Modal isOpen={modalIsOpen} style={customStyles}>
                  <div className='modalheader'>
                     <div className='row'>
                        <div className="col-lg-6">
                           <h6 style={{ fontWeight: '500' }}>Component Details</h6>
                        </div>
                        <div className='col-lg-4'></div>
                        <div className='col-lg-2'>
                           <button className='btn btn-primary' onClick={closeModal}>Close</button>
                        </div>
                     </div>
                     <hr></hr>
                  </div>
                  <div className='modalbody'>
                     <div className="row">
                        <div className='col-lg-12'>
                           <table className='table table-bordered mt-4 text-center table-striped '>
                              <thead>
                                 <tr >
                                    <th className='text-white'>OT Type</th>
                                    <th className='text-white'>No of Hours </th>

                                 </tr>
                              </thead>
                              <tbody >
                                 {
                                    overtimeDetail.map((data, index) => {
                                       return (
                                          <tr className="text-dark" key={index}>
                                             <td>{data.componentName}</td>
                                             <td>{data.componentValue}</td>
                                             <td>{data.ded_type}</td>
                                          </tr>
                                       )
                                    })
                                 }
                              </tbody>
                           </table>
                        </div>
                     </div>
                  </div>
               </Modal>
            </div>

         </div>

      </Layout >
   )
}

export default Applyot;
