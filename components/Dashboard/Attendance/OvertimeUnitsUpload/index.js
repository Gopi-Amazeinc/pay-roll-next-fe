import React, { useState, useEffect } from 'react'
// import { Button, Modal, ModalBody, ModalFooter } from "reactstrap";
// import overtime from '../../styles/myteamovertimedetails.module.css'
// import Layout from '../../Components/layout.js';
import { useRef } from 'react';
import { DownloadTableExcel } from 'react-export-table-to-excel';
import { Modal, ModalBody, ModalFooter } from 'reactstrap';
import Styles from "@/styles/shiftdetails.module.css";
import OvertimeUnitsUpload from '@/pages/Attendance/OverTimeUnitsUpload';
import { apiService } from "@/services/api.service";



const MyTeamOverTimeDetail = () => {

  const [overtimeUnitsUpload, SetovertimeUnitsUpload] = useState([]);
  const tableRef = useRef(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    let res = await apiService.commonGetCall("Master/GetLoanMaster");
    SetovertimeUnitsUpload(res.data);
  };


  return (

    <div>
      <div className="col-lg-12">
        <div className="row">
          <h6 className="mt-2">Yet to bind</h6>
        </div>
        <br></br>
        <div className={Styles.filter}>
          <div className="card p-3  border-0  rounded-3">
            <div className="row">
              <div className="col-lg-1">
                <p className={Styles.filterdate} >Filter By</p>
              </div>

              <div className="col-lg-4">
                <br />
                <input id="term" name="term" type="search" placeholder="Search for staff.. " className="form-control "></input>
              </div>
              <div className="col-lg-2"><br />
                <button color="primary" className='button' type="button" onClick={() => setModalOpen(!modalOpen)} >
                  Upload Overtime
                </button>
              </div>
              <Modal toggle={() => setModalOpen(!modalOpen)} isOpen={modalOpen}>
                <div className=" modal-header">
                  <h5 className=" modal-title" >
                    Upload Staff</h5>
                  <button
                    aria-label="Close"
                    className=" close"
                    type="button"
                    onClick={() => setModalOpen(!modalOpen)}
                  >
                    <span aria-hidden={true}>×</span>
                  </button>
                </div>
                <ModalBody >
                  <div className='row'>
                    <div className='col-lg-6'>
                      <input type="file" />
                      <div className='row'>
                        <ModalFooter>

                          <button color="primary" type="button" className='button'>
                            Upload Staff
                          </button>
                        </ModalFooter>
                      </div>
                    </div>

                  </div>
                </ModalBody>
              </Modal>


              < div className="col-lg-2">
                <br />
                <DownloadTableExcel
                  filename="UploadLoanTemplate"
                  sheet="users"
                  currentTableRef={tableRef.current}
                >
                  <button className='button'>Export to Excel</button>
                </DownloadTableExcel>

              </div>
            </div>
          </div>
        </div>
        <br />
        <div className="text-primary fs-6 fw-bold">
          <h6 style={{ color: "#3247d5" }} >Showing Results</h6>
        </div>
        < br />
        <div className="row">
          <div className="table-responsive">
            <table className="table table-striped  "  style={{ marginLeft: "0px", width: "100%" }}ref={tableRef} >
              <thead className={"bg-info text-white "}>
                <tr style={{ whiteSpace: "nowrap" }}>
                  <th>Employee ID</th>
                  <th>Employee Name</th>
                  <th>Pay Date </th>
                  <th>Component Name</th>
                  <th>No of Hours </th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(overtimeUnitsUpload) && overtimeUnitsUpload.length > 0 && (
                  <>
                    {overtimeUnitsUpload.map((data) => {
                      return (
                        <tr key={data.id}>
                          <td>{data.payrollComponentType}</td>
                          <td>{data.employeeName}</td>
                          <td>{data.payDtae}</td>
                          <td>{data.componentName}</td>
                          <td>{data.endTime}</td>
                          <td>{data.noofHours}</td>
                        </tr>
                      );
                    })}
                  </>
                )}
              </tbody>
            </table>
          </div>
        </div>








      </div>
    </div>
  )
}

export default MyTeamOverTimeDetail