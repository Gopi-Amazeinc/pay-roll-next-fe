import React from 'react'
import { useState, useEffect } from 'react'
import Layout from "@/components/layout/layout";
import Modal from 'react-modal';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import axios from 'axios';
import Styles from "@../../../pages/OT/Ot.module.css"
import Link from 'next/link';
import { apiService } from "@/services/api.service";
import { useRouter } from "next/router";
const OverTimeDetails = () => {
  const router = useRouter();
  const { register, handleSubmit, watch, reset, formState } = useForm();
  const [dashboardData, setDashboardData] = useState([]);
  const { errors } = formState;
  const [modalOpen, setModalOpen] = useState(false);
  const openEditModal = () => {
    setModalOpen(true)
  }
  const closeModal = () => {
    setModalOpen(false)
  }
  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      width: '50%',
      height: '50%'
    }
  }

  const getDetails = async () => {
    debugger;
    var startTime = watch("StartTime");
    var endTime = watch("EndTime");
    var date = watch("Date");
    var staffID = sessionStorage.getItem("userID");
    const res = await apiService.commonGetCall("HR/GetOtNightOt?StartTime=" + startTime + "&EndTime=" + endTime + "&Shift=1&StaffID=" + staffID + "&Date=" + date);
    setDashboardData(res.data);
    console.log(res.data);
    sessionStorage.setItem("Date", date);
    sessionStorage.setItem("StartTime", startTime);
    sessionStorage.setItem("EndTime", endTime);
  }


  async function insertDetails(data) {
    console.log(data);
    debugger;
    let details = {
      "StaffID": sessionStorage.getItem("userID"),
      "Date": sessionStorage.getItem("Date"),
      "StartTime": sessionStorage.getItem("Date") + " " + watch("StartTime"),
      "EndTime": sessionStorage.getItem("Date") + " " + watch("EndTime"),
      "NightOT": dashboardData[0].nightOt == null ? 0 : dashboardData[0].nightOt,
      "Comments": watch("comments"),
      "NSD_REGULAR": dashboardData[0].nsD_REGULAR == null ? 0 : dashboardData[0].nsD_REGULAR,
      "ExccessNormalOt": dashboardData[0].exccessNormalOt == null ? 0 : dashboardData[0].exccessNormalOt,
      "ExccessNightOt": dashboardData[0].exccessNightOt == null ? 0 : dashboardData[0].exccessNightOt,
      "RestNightOt": dashboardData[0].restNightOt == null ? 0 : dashboardData[0].restNightOt,
      "RestNormalOT": dashboardData[0].restNormalOT == null ? 0 : dashboardData[0].restNormalOT,
      "ExccessRestNormalOt": dashboardData[0].exccessRestNormalOt == null ? 0 : dashboardData[0].exccessRestNormalOt,
      "RestExccessNightOt": dashboardData[0].restExccessNightOt == null ? 0 : dashboardData[0].restExccessNightOt,
      "LegalNightOt": dashboardData[0].legalNightOt == null ? 0 : dashboardData[0].legalNightOt,
      "LegalNormalOT": dashboardData[0].legalNormalOT == null ? 0 : dashboardData[0].legalNormalOT,
      "LegalExccessNormalOt": dashboardData[0].legalExccessNormalOt == null ? 0 : dashboardData[0].legalExccessNormalOt,
      "LegalExccessNightOt": dashboardData[0].legalExccessNightOt == null ? 0 : dashboardData[0].legalExccessNightOt,
      "SpecialNightOt": dashboardData[0].specialNightOt == null ? 0 : dashboardData[0].specialNightOt,
      "SpecialNormalOT": dashboardData[0].specialNormalOT == null ? 0 : dashboardData[0].specialNormalOT,
      "SpecialExccessNormalOt": dashboardData[0].specialExccessNormalOt == null ? 0 : dashboardData[0].specialExccessNormalOt,
      "SpecialExccessNightOt": dashboardData[0].specialExccessNightOt == null ? 0 : dashboardData[0].specialExccessNightOt,
      "SpecialRestNightOt": dashboardData[0].specialRestNightOt == null ? 0 : dashboardData[0].specialRestNightOt,
      "SpecialRestNormalOT": dashboardData[0].specialRestNormalOT == null ? 0 : dashboardData[0].specialRestNormalOT,
      "SpecialRestExccessNormalOt": dashboardData[0].specialRestExccessNormalOt == null ? 0 : dashboardData[0].specialRestExccessNormalOt,
      "SpecialRestExccessNightOt": dashboardData[0].specialRestExccessNightOt == null ? 0 : dashboardData[0].specialRestExccessNightOt,
      "LegalRestNightOt": dashboardData[0].legalRestNightOt == null ? 0 : dashboardData[0].legalRestNightOt,
      "LegalRestNormalOT": dashboardData[0].legalRestNormalOT == null ? 0 : dashboardData[0].legalRestNormalOT,
      "LegalExccessRestNormalOt": dashboardData[0].legalExccessRestNormalOt == null ? 0 : dashboardData[0].legalExccessRestNormalOt,
      "LegalExccessRestNightOt": dashboardData[0].legalExccessRestNightOt == null ? 0 : dashboardData[0].legalExccessRestNightOt
    }
    await apiService.commonPostCall("HR/InsertStaffOverTimeDetails", details);
    Swal.fire('Data Inserted successfully');
    console.log("Inserted data:", details);
    router.push("/Requests/OverTimeDetails");
  }
  const customStylese = {
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
      <div className='container-fluid'>
        <div className='row'>
          <div className='col-lg-12'>
            <p className='Heading'>Add Actual Time</p>
            <div className="card p-3 border-0">
              <div>
                <form onSubmit={handleSubmit(insertDetails)}>
                  <div className='row mt-4'>
                    <div className='col-lg-4'>
                      <label style={{ fontWeight: "bold" }}>Date Request<span style={{ color: "red" }}>*</span></label>
                    </div>
                    <div className='col-lg-2'>
                      <label style={{ fontWeight: "bold" }}>Actual Start Time<span style={{ color: "red" }}>*</span></label>
                    </div>
                    <div className='col-lg-2'>
                      <label style={{ fontWeight: "bold" }}>Actual End Time<span style={{ color: "red" }}>*</span></label>
                    </div>
                    <div className='col-lg-4'>
                      <label style={{ fontWeight: "bold" }}>Select Date,Time for OT details<span style={{ color: "red" }}>*</span></label>
                    </div>
                  </div>
                  <div className='row'>
                    <div className='col-lg-4'>
                      <input type='date' id='Date' name="Date" className='form-control' {...register('Date', { required: "This field is required" })}></input>
                      {errors.Date && <label className="error-message" style={customStylese.errorMsg}>{errors.Date.message}</label>}
                    </div>
                    <div className='col-lg-2'>
                      {/* <input type="text" maxlength="2" class="form-control text-center bs-timepicker-field" placeholder="HH" /> */}
                      {/* <TimePicker onChange={handleTimeChange} value={time} disableClock={true} clearIcon={null} /> */}
                      <input type='time' className='form-control' id='StartTime' name='time' min="00:00" max="23:59" step="1" {...register('StartTime', { required: "This field is required" })} />
                      {errors.StartTime && <label className="error-message" style={customStylese.errorMsg}>{errors.StartTime.message}</label>}
                    </div>
                    {/* <div className='col-lg-2'></div> */}
                    <div className='col-lg-2'>
                      <input type="time" className='form-control' id='EndTime' name='time' min="00:00" max="23:59" step="1" {...register('EndTime', { required: "This field is required" })} />
                      {errors.EndTime && <label className="error-message" style={customStylese.errorMsg}>{errors.EndTime.message}</label>}
                    </div>
                    {/* <div className='col-lg-1'></div> */}
                    <div className='col-lg-2'>
                      <button type='button' className={Styles.addButton} onClick={getDetails}>Click</button>
                    </div>
                    <div className='col-lg-1'></div>
                  </div><br />
                  <div className='row'>
                    <div className='col-lg-4'>
                      <label style={{ fontWeight: "bold" }}>Purpose</label>
                      {/* <label>Supporting Documents</label> */}
                    </div>
                    <div className='col-lg-4'>
                      {/* <label>Purpose</label> */}
                    </div>
                    <div className='col-lg-4'></div>
                  </div>
                  <div className='row'>
                    <div className='col-lg-4'>
                      <textarea className='form-control' placeholder='Write here...' minLength={10}{...register('comments', { required: "This field is required" })}>
                      </textarea>
                      {errors.comments && <label className="error-message" style={customStylese.errorMsg}>{errors.comments.message}</label>}

                    </div>
                    {/* <div className='col-lg-4'>
                <input type='file' className='form-control' {...register('Attachments')}></input>
              </div> */}
                    <div className='col-lg-4'></div>
                  </div>
                  <div className='row mt-4'>
                    <div className='col-lg-6'></div>
                    <div className='col-lg-2'>
                      <Link href="/Requests/OverTimeDetails">
                        <button type='button' className={Styles.addButton} style={{ float: "right" }}>Cancel</button>
                      </Link>
                    </div>
                    <div className='col-lg-2'>
                      <button type='submit' className={Styles.addButton}>Submit</button>
                    </div>
                    <div className='col-lg-2'>
                      <button type='button' className={Styles.addButton} onClick={openEditModal} style={{ float: "left" }}>OT Details</button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <br />

        <div className='row'>
          <div className='col-lg-8'></div>
          {/* <div className='col-lg-2'>
            <button type='button' className={Styles.addButton} onClick={getDetails}>Click</button>
          </div> */}
          {/* <div className='col-lg-2'>
            
          </div> */}
        </div>
        <Modal ariaHideApp={false} isOpen={modalOpen} style={customStyles} contentLabel="Example Modal">
          <div className='row'>
            <div className='col-lg-6'>
              <div className=" modal-header">
                <h5 className=" modal-title" id="exampleModalLabel">
                  Overtime Details
                </h5>
              </div>
            </div>
            <div className='col-lg-5'></div>
            <div className='col-lg-1'>
              <button
                aria-label="Close"
                type="button"
                className={Styles.close}
                onClick={closeModal}
              >X
              </button>
            </div>

          </div>
          <div className='row'>
            <div className='col-lg-12'>
              <table className='modal-table'>
                <thead>
                  <tr>
                    <th>OT Type</th>
                    <th>No of Hours</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="table-row">
                    {dashboardData.map((data, index) => {
                      return (
                        <>
                          <tr>
                            <td key={index} className="table-row">
                              <tr className="table-row">
                                <td>Normal OT</td>
                              </tr>
                              <tr className="table-row">
                                <td>Night OT </td>
                              </tr>
                              <tr className="table-row">
                                <td> Excess Night OT </td>
                              </tr>
                              <tr className="table-row">
                                <td> Excess Normal OT </td>
                              </tr>
                              <tr className="table-row">
                                <td>Rest Normal OT </td>
                              </tr>
                              <tr className="table-row">
                                <td> Rest Night OT </td>
                              </tr>
                              <tr className="table-row">
                                <td> Excess Rest Normal OT </td>
                              </tr>
                              <tr className="table-row">
                                <td> Rest Excess Night OT </td>
                              </tr>
                              <tr className="table-row">
                                <td> Legal Night OT </td>
                              </tr>
                              <tr className="table-row">
                                <td> Legal Normal OT </td>
                              </tr>
                              <tr className="table-row">
                                <td> Legal Excess Normal OT </td>
                              </tr>
                              <tr className="table-row">
                                <td>Legal Excess Night OT </td>
                              </tr>
                              <tr className="table-row">
                                <td> Special Night OT </td>
                              </tr>
                              <tr className="table-row">
                                <td> Special Normal OT </td>
                              </tr>
                              <tr className="table-row">
                                <td> Special Excess Normal OT </td>
                              </tr>
                              <tr className="table-row">
                                <td> Special Excess Night OT </td>
                              </tr>
                              <tr className="table-row">
                                <td> Special Rest Night OT </td>
                              </tr>
                              <tr className="table-row">
                                <td>Special Rest Normal OT </td>
                              </tr>
                              <tr className="table-row">
                                <td> Special Rest Excess Normal OT </td>
                              </tr>
                              <tr className="table-row">
                                <td> Special Rest Excess Night OT </td>
                              </tr>
                              <tr className="table-row">
                                <td> Legal Rest Night OT </td>
                              </tr>
                              <tr className="table-row">
                                <td> Legal Rest Normal OT </td>
                              </tr>
                              <tr className="table-row">
                                <td> Legal Excess Rest Normal OT </td>
                              </tr>
                              <tr className="table-row">
                                <td> Legal Excess Rest Night OT </td>
                              </tr>
                            </td>
                          </tr>
                          <td key={index} className="table-row">
                            <tr className="table-row">
                              <td>{data.normalOT}</td>
                            </tr>
                            <tr className="table-row">
                              <td>{data.nightOt}</td>
                            </tr>
                            <tr className="table-row">
                              <td>{data.exccessNightOt}</td>
                            </tr>
                            <tr className="table-row">
                              <td>{data.exccessNormalOt}</td>
                            </tr>
                            <tr className="table-row">
                              <td>{data.restNormalOT}</td>
                            </tr>
                            <tr className="table-row">
                              <td>{data.restNightOt}</td>
                            </tr>
                            <tr className="table-row">
                              <td>{data.exccessRestNormalOt}</td>
                            </tr>
                            <tr className="table-row">
                              <td>{data.restExccessNightOt}</td>
                            </tr>
                            <tr className="table-row">
                              <td>{data.legalNightOt}</td>
                            </tr>
                            <tr className="table-row">
                              <td>{data.legalNormalOT}</td>
                            </tr>
                            <tr className="table-row">
                              <td>{data.legalExccessNormalOt}</td>
                            </tr>
                            <tr className="table-row">
                              <td>{data.legalExccessNightOt}</td>
                            </tr>
                            <tr className="table-row">
                              <td>{data.specialNightOt}</td>
                            </tr>
                            <tr className="table-row">
                              <td>{data.specialNormalOT}</td>
                            </tr>
                            <tr className="table-row">
                              <td>{data.specialExccessNormalOt}</td>
                            </tr>
                            <tr className="table-row">
                              <td>{data.specialExccessNightOt}</td>
                            </tr>
                            <tr className="table-row">
                              <td>{data.specialRestNightOt}</td>
                            </tr>
                            <tr className="table-row">
                              <td>{data.specialRestNormalOT}</td>
                            </tr>
                            <tr className="table-row">
                              <td>{data.specialRestExccessNormalOt}</td>
                            </tr>
                            <tr className="table-row">
                              <td>{data.specialRestExccessNightOt}</td>
                            </tr>
                            <tr className="table-row">
                              <td>{data.legalRestNightOt}</td>
                            </tr>
                            <tr className="table-row">
                              <td>{data.legalRestNormalOT}</td>
                            </tr>
                            <tr className="table-row">
                              <td>{data.legalExccessRestNormalOt}</td>
                            </tr>
                            <tr className="table-row">
                              <td>{data.legalExccessRestNightOt}</td>
                            </tr>
                          </td>
                        </>
                      );
                    })}

                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </Modal>
      </div>
    </Layout >

  )
}

export default OverTimeDetails