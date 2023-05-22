import React, { useState, useEffect } from "react";
// import { Button, Modal, ModalBody, ModalFooter } from "reactstrap";
// import overtime from '../../styles/myteamovertimedetails.module.css'
// import Layout from '../../Components/layout.js';
import { useRef } from "react";
import { DownloadTableExcel } from "react-export-table-to-excel";
// import { Modal, ModalBody, ModalFooter } from 'reactstrap';
import Modal from "react-modal";
import Styles from "@/styles/shiftdetails.module.css";
import OvertimeUnitsUpload from "@/pages/Attendance/OverTimeUnitsUpload";
import { apiService } from "@/services/api.service";
import Link from "next/link";
import Swal from "sweetalert2";
import * as XLSX from "xlsx";

const MyTeamOverTimeDetail = () => {
  const [overtimeUnitsUpload, SetovertimeUnitsUpload] = useState([]);
  const tableRef = useRef(null);
  const [modalOpen, setModalOpen] = useState(false);

  const [items, setItems] = useState([]);

  const openEditModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    let res = await apiService.commonGetCall("Master/GetLoanMaster");
    SetovertimeUnitsUpload(res.data);
  };

  //   Written By:-Gopi  => Read the uploaded excel file and convert that into array - used "XLSX" package
  const incomingfile = async (file) => {
    const promise = new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(file);
      fileReader.onload = (e) => {
        const bufferArray = e.target.result;
        const wb = XLSX.read(bufferArray, { type: "buffer" });
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        const data = XLSX.utils.sheet_to_json(ws);
        resolve(data);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
    promise.then((d) => {
      setItems(d);
    });
  };

  //   Written By:-Gopi  => The data in excel file is transfered to required feild to the backend API
  const transformedLoans = async (items) => {
    console.log(items);
    const loans = await Promise.all(
      items && items.length > 0
        ? items.map(async (loan) => {
            const res = await apiService.commonGetCall(
              "Payroll/GetStaffByEmployeeID?EmployeID=" + loan.EmployeeID
            );
            const staffData = res.data[0];
            return {
              StaffID: staffData.id,
              LoanType: loan.LoanType,
              LoanAmount: loan.LoanAmount,
              EMIAmount: loan.SemiMonthlyAmmortization,
              Period: loan.Period,
              Category: "NA",
              Status: "Manager Approved",
              Attachment: "NA",
              Comments: loan.Comments,
            };
          })
        : []
    );
    return loans;
  };

  // TODO:  Written By:-Gopi  => The data in excel file is uploaded to the backend API
  const uploadLoan = async () => {
    const transformedData = await transformedLoans(items);
    if (transformedData.length > 0) {
      await apiService.commonPostCall(
        "Payroll/InsertStaffOvetimeOTupload",
        transformedData
      );
      Swal.fire(" Ovetime Uploaded succefully!");
    } else {
      Swal.fire(" No Ovetime Uploaded!");
    }
    setModalOpen(false);
    getEmployeeLoans();
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
                <p className={Styles.filterdate}>Filter By</p>
              </div>

              <div className="col-lg-4">
                <br />
                <input
                  id="term"
                  name="term"
                  type="search"
                  placeholder="Search for staff.. "
                  className="form-control "
                ></input>
              </div>
              <div className="col-lg-2">
                <br />
                <button
                  color="primary"
                  className="button"
                  type="button"
                  onClick={() => setModalOpen(!modalOpen)}
                >
                  Upload Overtime
                </button>
              </div>
              <Modal
                isOpen={modalOpen}
                style={customStyles}
                contentLabel="Example Modal"
              >
                <div className=" modal-header">
                  <h5 className=" modal-title" id="exampleModalLabel">
                    Upload Loans
                  </h5>
                  <button
                    aria-label="Close"
                    className={Styles.close}
                    type="button"
                    onClick={closeModal}
                  >
                    X{/* <i onClick={closeModal} class="mdi mdi-close"></i> */}
                    {/* <span aria-hidden={true}>×</span> */}
                  </button>
                </div>
                <hr></hr>
                <div className="row">
                  <div className="col-lg-7">
                    <input
                      type="file"
                      accept=".xls,.xlsx"
                      style={{ display: "inline-block" }}
                      onChange={(e) => {
                        const file = e.target.files[0];
                        incomingfile(file);
                      }}
                      placeholder="Upload file"
                    />
                  </div>
                  <div className="col-lg-4">
                    <Link href="UploadOvertim Here">
                      <span
                        style={{ color: "navy", textDecoration: "underline" }}
                      >
                        UploadOvertime.XLSX
                      </span>
                    </Link>
                  </div>
                  <div className="row">
                    {/* <ModalFooter> */}
                    <div className="col-lg-6">
                      <button
                        className="mt-4"
                        id={Styles.UploadOvetimefButton}
                        onClick={() => uploadLoan()}
                        color="primary"
                        type="button"
                      >
                        Upload Loans
                      </button>
                    </div>
                    <div className="col-lg-6"></div>
                  </div>
                  <div className="col-lg-6"></div>
                </div>
              </Modal>
              {/* <Modal toggle={() => setModalOpen(!modalOpen)} isOpen={modalOpen}>
                <div className=" modal-header">
                  <h5 className=" modal-title" >
                    Upload Staff</h5>
                  <button
                    aria-label="Close"
                    className=" close"
                    type="button"
                    onClick={() => setModalOpen(!modalOpen)}
                  >
                    <span>X</span>
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
              </Modal> */}

              <div className="col-lg-2">
                <br />
                <DownloadTableExcel
                  filename="UploadLoanTemplate"
                  sheet="users"
                  currentTableRef={tableRef.current}
                >
                  <button className="button">Export to Excel</button>
                </DownloadTableExcel>
              </div>
            </div>
          </div>
        </div>
        <br />
        <div className="text-primary fs-6 fw-bold">
          <h6 style={{ color: "#3247d5" }}>Showing Results</h6>
        </div>
        <br />
        <div className="row">
          <div className="col-lg-12">
            <div className="table-responsive">
              <table
                className="table table-striped  "
                style={{ marginLeft: "0px", width: "99%" }}
                ref={tableRef}
              >
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
    </div>
  );
};

export default MyTeamOverTimeDetail;
