import React from 'react'
import { useState, useEffect } from 'react'
import Layout from "@/components/layout/layout";
import Modal from 'react-modal';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import axios from 'axios';
import Styles from "@../../../pages/OT/Ot.module.css"
import Link from 'next/link';
const OverTimeDetails = () => {
  const { register, handleSubmit, watch, reset, formState } = useForm();
  const [dashboardData, setDashboardData] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);


  const hostURL = process.env.NEXT_PUBLIC_API_HOST_URL;

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
      width: '60%',
      height: '70%'
    }
  }

  const getDetails = async () => {
    var startTime = watch("StartTime");
    var endTime = watch("EndTime");
    var date = watch("Date");
    var staffID = sessionStorage.getItem("userID");
    const res = await axios.get(hostURL + "HR/GetOtNightOt?StartTime=" + startTime + "&EndTime=" + endTime + "&Shift=1&StaffID=" + staffID + "&Date=" + date);
    setDashboardData(res.data);
    console.log(res.data);
    onSubmit(res.data);
    sessionStorage.setItem("Date", date);
  }

  async function onSubmit(data) {
    try {
      console.log("form data", data);

    } catch (error) {

    }
  }
  // let staffID;
  // staffID = sessionStorage.getItem("StaffID")

  // let Date;
  // Date = sessionStorage.getItem("Date")

  // function clearForm() {
  //   let details = {
  //     "StaffID": sessionStorage.getItem("userID"),
  //     "Date": sessionStorage.getItem("Date"),
  //     "StartTime": "2023/03/04" + watch("StartTime"),
  //     "EndTime": "2023/03/04" + watch("EndTime"),
  //     "noofhours": "",
  //     "NightOT": dashboardData.filter(x => x.dashboardData == nightOt)[0].nightOt,
  //     "Comments": watch("Comments"),
  //     "Attachment": watch("Attachment"),
  //     "NSD_REGULAR": dashboardData.filter(x => x.dashboardData == nsD_REGULAR)[0].nsD_REGULAR,
  //     "ExccessNightOt": dashboardData.filter(x => x.dashboardData == exccessNightOt)[0].exccessNightOt,
  //     "ExccessNormalOt": dashboardData.filter(x => x.dashboardData == exccessNormalOt)[0].exccessNormalOt,
  //     "RestNightOt": dashboardData.filter(x => x.dashboardData == restNightOt)[0].restNightOt,
  //     "RestNormalOT": dashboardData.filter(x => x.dashboardData == restNormalOT)[0].restNormalOT,
  //     "ExccessRestNormalOt": dashboardData.filter(x => x.dashboardData == exccessRestNormalOt)[0].exccessRestNormalOt,
  //     "RestExccessNightOt": dashboardData.filter(x => x.dashboardData == restExccessNightOt)[0].restExccessNightOt,
  //     "LegalNightOt": dashboardData.filter(x => x.dashboardData == legalNightOt)[0].legalNightOt,
  //     "LegalNormalOT": dashboardData.filter(x => x.dashboardData == legalNormalOT)[0].legalNormalOT,
  //     "LegalExccessNormalOt": dashboardData.filter(x => x.dashboardData == legalExccessNormalOt)[0].legalExccessNormalOt,
  //     "LegalExccessNightOt": dashboardData.filter(x => x.dashboardData == legalExccessNightOt)[0].legalExccessNightOt,
  //     "SpecialNightOt": dashboardData.filter(x => x.dashboardData == specialNightOt)[0].specialNightOt,
  //     "SpecialNormalOT": dashboardData.filter(x => x.dashboardData == specialNormalOT)[0].specialNormalOT,
  //     "SpecialExccessNormalOt": dashboardData.filter(x => x.dashboardData == specialExccessNormalOt)[0].specialExccessNormalOt,
  //     "SpecialExccessNightOt": dashboardData.filter(x => x.dashboardData == specialExccessNightOt)[0].specialExccessNightOt,
  //     "SpecialRestNightOt": dashboardData.filter(x => x.dashboardData == specialRestNightOt)[0].specialRestNightOt,
  //     "SpecialRestNormalOT": dashboardData.filter(x => x.dashboardData == specialRestNormalOT)[0].specialRestNormalOT,
  //     "SpecialRestExccessNormalOt": dashboardData.filter(x => x.dashboardData == specialRestExccessNormalOt)[0].specialRestExccessNormalOt,
  //     "SpecialRestExccessNightOt": dashboardData.filter(x => x.dashboardData == specialRestExccessNightOt)[0].specialRestExccessNightOt,
  //     "LegalRestNightOt": dashboardData.filter(x => x.dashboardData == legalRestNightOt)[0].legalRestNightOt,
  //     "LegalRestNormalOT": dashboardData.filter(x => x.dashboardData == legalRestNormalOT)[0].legalRestNormalOT,
  //     "LegalExccessRestNormalOt": dashboardData.filter(x => x.dashboardData == legalExccessRestNormalOt)[0].legalExccessRestNormalOt,
  //     "LegalExccessRestNightOt": dashboardData.filter(x => x.dashboardData == legalExccessRestNightOt)[0].legalExccessRestNightOt
  //   }
  //   reset(details);
  //   insertDetails(details)

  // }



  // useEffect(() => {
  //   clearForm()
  // }, [])

  const insertDetails = async () => {

    try {
      await axios.post(hostURL + "HR/InsertStaffOverTimeDetails", details);
      Swal.fire('Data Inserted successfully')
      console.log("Inserted data:", details);
      location.href = ("/OT");

    }
    catch {
      Swal.fire("Insert is not working");
    }
  }

  return (
    <Layout>
      <h5>Insert  operation is not Done</h5>
      <form onSubmit={handleSubmit(insertDetails)}>
        <div className="shadow-lg p-3 mt-3 mb-5 bg-white rounded">
          <div>
            <h4 style={{ color: "blue" }}>Add Actual Time</h4>
            <div className='row mt-4'>
              <div className='col-lg-4'>
                <p>Date Request<span style={{ color: "red" }}>*</span></p>

              </div>
              <div className='col-lg-2'>
                <p>Actual Start Time<span style={{ color: "red" }}>*</span></p>
              </div>
              <div className='col-lg-2'>
                <p>Actual End Time<span style={{ color: "red" }}>*</span></p>
              </div>
            </div>
            <div className='row'>
              <div className='col-lg-4'>
                <input type='date' className='form-control'  {...register('Date', { required: true })} ></input>
              </div>
              <div className='col-lg-2'>
                {/* <TimePicker onChange={handleTimeChange} value={time} disableClock={true} clearIcon={null} /> */}
                <input type='time' className='form-control' name='time' min="00:00" max="23:59" step="1" {...register('StartTime', { required: true })} />
              </div>
              <div className='col-lg-2'>
                <input type="time" className='form-control' name='time' min="00:00" max="23:59" step="1" {...register('EndTime', { required: true })} />
              </div>
              <div className='col-lg-2'>
                <button className='submit-button' onClick={getDetails}>Click</button>
              </div>
            </div><br />
            <div className='row'>
              <div className='col-lg-4'>
                <p>Supporting Documents</p>
              </div>
              <div className='col-lg-4'>
                <p>Purpose</p>
              </div>
              <div className='col-lg-4'></div>
            </div>
            <div className='row'>
              <div className='col-lg-4'>
                <input type='file' className='form-control' {...register('Attachments', { required: true })}></input>
              </div>
              <div className='col-lg-4'>
                <textarea className='form-control' placeholder='Write here...' {...register('Comments', { required: true })}></textarea>
              </div>
              <div className='col-lg-4'></div>
            </div>
            <div className='row mt-4'>
              <div className='col-lg-6'></div>
              <div className='col-lg-2'>
                <Link href="/Requests/OverTimeDetails">
                  <button className='submit-button' style={{ float: "right" }}>Cancel</button>
                </Link>
              </div>
              <div className='col-lg-2'>
                <button className='submit-button' onClick={insertDetails}>Submit</button>
              </div>
              <div className='col-lg-2'>
                <button className='submit-button' onClick={openEditModal} style={{ float: "left" }}>OT Details</button>
              </div>
            </div>
          </div>
        </div>
      </form>
      <Modal isOpen={modalOpen} style={customStyles} contentLabel="Example Modal">
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
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>OT Type</th>
                  <th>No of Hours</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  {dashboardData.map((data, index) => {
                    return (
                      <>
                        <td key={index}>
                          <tr>
                            <td>Normal OT</td>
                          </tr>
                          <tr>
                            <td>Night OT </td>
                          </tr>
                          <tr>
                            <td> Excess Night OT </td>
                          </tr>
                          <tr>
                            <td> Excess Normal OT </td>
                          </tr>
                          <tr>
                            <td>Rest Normal OT </td>
                          </tr>
                          <tr>
                            <td> Rest Night OT </td>
                          </tr>
                          <tr>
                            <td> Excess Rest Normal OT </td>
                          </tr>
                          <tr>
                            <td> Rest Excess Night OT </td>
                          </tr>
                          <tr>
                            <td> Legal Night OT </td>
                          </tr>
                          <tr>
                            <td> Legal Normal OT </td>
                          </tr>
                          <tr>
                            <td> Legal Excess Normal OT </td>
                          </tr>
                          <tr>
                            <td>Legal Excess Night OT </td>
                          </tr>
                          <tr>
                            <td> Special Night OT </td>
                          </tr>
                          <tr>
                            <td> Special Normal OT </td>
                          </tr>
                          <tr>
                            <td> Special Excess Normal OT </td>
                          </tr>
                          <tr>
                            <td> Special Excess Night OT </td>
                          </tr>
                          <tr>
                            <td> Special Rest Night OT </td>
                          </tr>
                          <tr>
                            <td>Special Rest Normal OT </td>
                          </tr>
                          <tr>
                            <td> Special Rest Excess Normal OT </td>
                          </tr>
                          <tr>
                            <td> Special Rest Excess Night OT </td>
                          </tr>
                          <tr>
                            <td> Legal Rest Night OT </td>
                          </tr>
                          <tr>
                            <td> Legal Rest Normal OT </td>
                          </tr>
                          <tr>
                            <td> Legal Excess Rest Normal OT </td>
                          </tr>
                          <tr>
                            <td> Legal Excess Rest Night OT </td>
                          </tr>
                        </td>
                        <td key={index}>
                          <tr>
                            <td>{data.normalOT}</td>
                          </tr>
                          <tr>
                            <td>{data.nightOt}</td>
                          </tr>
                          <tr>
                            <td>{data.exccessNightOt}</td>
                          </tr>
                          <tr>
                            <td>{data.exccessNormalOt}</td>
                          </tr>
                          <tr>
                            <td>{data.restNormalOT}</td>
                          </tr>
                          <tr>
                            <td>{data.restNightOt}</td>
                          </tr>
                          <tr>
                            <td>{data.exccessRestNormalOt}</td>
                          </tr>
                          <tr>
                            <td>{data.restExccessNightOt}</td>
                          </tr>
                          <tr>
                            <td>{data.legalNightOt}</td>
                          </tr>
                          <tr>
                            <td>{data.legalNormalOT}</td>
                          </tr>
                          <tr>
                            <td>{data.legalExccessNormalOt}</td>
                          </tr>
                          <tr>
                            <td>{data.legalExccessNightOt}</td>
                          </tr>
                          <tr>
                            <td>{data.specialNightOt}</td>
                          </tr>
                          <tr>
                            <td>{data.specialNormalOT}</td>
                          </tr>
                          <tr>
                            <td>{data.specialExccessNormalOt}</td>
                          </tr>
                          <tr>
                            <td>{data.specialExccessNightOt}</td>
                          </tr>
                          <tr>
                            <td>{data.specialRestNightOt}</td>
                          </tr>
                          <tr>
                            <td>{data.specialRestNormalOT}</td>
                          </tr>
                          <tr>
                            <td>{data.specialRestExccessNormalOt}</td>
                          </tr>
                          <tr>
                            <td>{data.specialRestExccessNightOt}</td>
                          </tr>
                          <tr>
                            <td>{data.legalRestNightOt}</td>
                          </tr>
                          <tr>
                            <td>{data.legalRestNormalOT}</td>
                          </tr>
                          <tr>
                            <td>{data.legalExccessRestNormalOt}</td>
                          </tr>
                          <tr>
                            <td>{data.legalExccessRestNightOt}</td>
                          </tr>
                        </td>
                      </>
                    )
                  })
                  }

                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </Modal>
    </Layout>

  )
}

export default OverTimeDetails