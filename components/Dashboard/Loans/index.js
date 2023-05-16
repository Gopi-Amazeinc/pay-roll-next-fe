import React, { useState, useEffect } from "react";
import Styles from "@/pages/Loans/Loans.module.css";
import Modal from "react-modal";
import { useRef } from "react";
import Link from "next/link";
import { apiService } from "@/services/api.service";
import Swal from "sweetalert2";
import * as XLSX from "xlsx";

const TeamLoans = () => {

  const [loansData, setLoansData] = useState([]);

  const [userID, setUserID] = useState();
  const [roleID, setRoleID] = useState();

  const tableRef = useRef(null);
  const [modalOpen, setModalOpen] = useState(false);

  const [items, setItems] = useState([]);

  const openEditModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  const customStyles = {
    content: {
      top: "20%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      width: "30%",
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

  useEffect(() => {
    const userid = sessionStorage.getItem("userID");
    const roleid = sessionStorage.getItem("roleID");
    setUserID(userid);
    setRoleID(roleid);
    getEmployeeLoans();
  }, [1]);

  //   Written By:-Gopi  => We are making an API To Get All EmployeLoans
  const getEmployeeLoans = async () => {
    let res = await apiService.commonGetCall("Payroll/GetEmployeeLoans");
    setLoansData(res.data);
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

  //   Written By:-Gopi  => The data in excel file is uploaded to the backend API
  const uploadLoan = async () => {
    const transformedData = await transformedLoans(items);
    if (transformedData.length > 0) {
      await apiService.commonGetCall(
        "Payroll/InsertEmployeeLoans",
        transformedData
      );
      Swal.fire(" Employe Loans Uploaded succefully!");
    } else {
      Swal.fire(" No Employe Loans Uploaded!");
    }
    setModalOpen(false);
    getEmployeeLoans();
  };
  return (
    <>
      <div>
        <br />
        <br />
        <p id={Styles.p}>&#x2022; My Loan Details</p>

        <div className="card shadow-lg p-4 rounded-3" id={Styles.card}>
          <div className="row">
            <div className="col-lg-1">
              <p>Filter By</p>
            </div>
            <div className="col-lg-4">
              <input
                type="text"
                className="form-control form-control-sm"
                placeholder="Search..."
              />
            </div>
            <div className="col-lg-3">
              <button
                id={Styles.UploadLoansButton}
                color="primary"
                type="button"
                onClick={openEditModal}
              >
                UPLOAD LOANS
              </button>
            </div>
            <div>
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
                    <Link href="https://103.12.1.76/ALIAPI/Images/UploadLoanTemplate.xlsx">
                      <span
                        style={{ color: "navy", textDecoration: "underline" }}
                      >
                        UploadLoanTemplate.XLSX
                      </span>
                    </Link>
                  </div>
                  <div className="row">
                    {/* <ModalFooter> */}
                    <div className="col-lg-6">
                      <button
                        className="mt-4"
                        id={Styles.UploadStaffButton}
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
            </div>
          </div>
        </div>
      </div>
      <div className="row ">
        <table
          className=" table mt-3 text-center"
          id={Styles.table}
          ref={tableRef}
        >
          <thead>
            <tr id={Styles.tr}>
              <th className="text-white">Employee Id</th>
              <th className="text-white">Employee Name</th>
              <th className="text-white">Loan Type</th>
              <th className="text-white">Category</th>
              <th className="text-white">Loan Amount</th>
              <th className="text-white">Ammortization</th>
              <th className="text-white">Tenure</th>
              <th className="text-white">Comments</th>
            </tr>
          </thead>
          <tbody>
            {loansData.map((data, index) => {
              return (
                <tr className="text-dark" key={index}>
                  <td>{data.staffID}</td>
                  <td>{data.name}</td>
                  <td>{data.loanType}</td>
                  <td>{data.category}</td>
                  <td>{data.loanAmount}</td>
                  <td>{data.emiAmount}</td>
                  <td>{data.period}</td>
                  <td>{data.comments}</td>
                  <td></td>
                  <td></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default TeamLoans;
