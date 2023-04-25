import React, { useState } from 'react'
import { Button, Modal, ModalBody, ModalFooter } from "reactstrap";
import overtime from '../../styles/myteamovertimedetails.module.css'
// import Layout from '../../Components/layout.js';
import { useRef } from 'react';
import { DownloadTableExcel } from 'react-export-table-to-excel';
function MyTeamOverTimeDetail() {
  const tableRef = useRef(null);
  const [modalOpen, setModalOpen] = useState(false);
  return (

      <div>
        <div className="col-md-12">
          <div className="row">
          <h2>Yet to bind</h2>
            <div className="col-md-12">
              <ul>
              </ul>
            </div>
          </div>
          <br></br>
          <div className={overtime.card}>
            <div className={overtime.filtercard}>
              <div className="row">
                <div className="col-md-1"> Filter By </div>
                <div className="col-md-2">
                  <p>Pay Date </p>
                  <input type="date" onkeydown="return false" placeholder="Duration" id="sdate" name="sdate" className="form-control "></input>
                </div>
                <div className="col-md-4">
                  <p></p><br></br>
                  <input id="term" name="term" type="search" placeholder="Search for staff.. " className="form-control "></input>
                </div>
                <div className="col-md-3"><br></br><p></p>
                  <Button className={overtime.button}
                    color="primary"
                    type="button"
                    onClick={() => setModalOpen(!modalOpen)}
                  >
                    Upload OVERTIME
                  </Button>
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
                          <input type="file" className={overtime.input} />
                          <div className='row'>
                            <ModalFooter>

                              <Button className={overtime.UploadStaffButton} color="primary" type="button">
                                Upload Staff
                              </Button>
                            </ModalFooter>
                          </div>
                        </div>
                        <div className='col-lg-6'>
                          <div>
                            <DownloadTableExcel
                              filename="users table"
                              sheet="users"
                              currentTableRef={tableRef.current}>
                              <button type="button" className="form-control CancelBTN">Export To Excel </button>
                            </DownloadTableExcel>
                          </div>
                        </div>
                      </div>
                    </ModalBody>
                  </Modal>
                </div>
              </div>
            </div>
          </div>
          <br></br>
          <div className="row">
            <div className="col-lg-10">
            </div>
            <div className="col-lg-2"> <DownloadTableExcel
              filename="UploadLoanTemplate"
              sheet="users"
              currentTableRef={tableRef.current}
            >
              <button className={overtime.button}>Export to Excel</button>
            </DownloadTableExcel>

            </div>
          </div>
          <br></br>
          <div className="row">
            <div className="col-md-5">
            </div>
            <div className="col-md-5">
            </div>
            <div className="col-md-2">
            </div>
          </div>
          <br></br>
          <div className="row">
            <div className="row">
            </div>
            <br></br>
            <div>
              <div><br></br><br></br>
              </div>
            </div>
            <div className="col-md-1">
            </div>
          </div>
        </div>
      </div>
  )
}

export default MyTeamOverTimeDetail