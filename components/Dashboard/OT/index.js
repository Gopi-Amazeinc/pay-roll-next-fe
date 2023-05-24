import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import Link from "next/link";
import Swal from "sweetalert2";
import * as XLSX from "xlsx";
import Styles from "@/pages/OT/Ot.module.css";
import { useRef } from "react";
import { DownloadTableExcel } from "react-export-table-to-excel";
import { apiService } from "@/services/api.service";

const Myovertimedetails = () => {
  const [otDetails, setotDetails] = useState([]);
  const [items, setItems] = useState([]);
  const tableRef = useRef(null);

  useEffect(() => {
    // TODO:CHECK API
    getApproveStaffOverTimeDetails();
  }, []);

  const getApproveStaffOverTimeDetails = async () => {
    const staffOverTimeDetails = await apiService.commonGetCall(
      "Payroll/GetStaffOverTimeDetailsUpload"
    );
    staffOverTimeDetails.data.length > 0
      ? setotDetails(staffOverTimeDetails.data)
      : Swal.fire("Sorry, No Data!");
  };

  const [modalOpen, setModalOpen] = useState(false);
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

  const uploadot = async () => {
    const transformedData = await transformedot(items);
    if (transformedData.length > 0) {
      await apiService.commonPostCall(
        "Payroll/InsertStaffOvetimeOTupload",
        transformedData
      );
      Swal.fire(" Over Time Uploaded succefully!");
    } else {
      Swal.fire(" No Over Time Uploaded!");
    }
    setModalOpen(false);
    getApproveStaffOverTimeDetails();
  };

  const transformedot = async (items) => {
    console.log(items);
    debugger;
    const loans = await Promise.all(
      items && items.length > 0
        ? items.map(async (ot) => {
            const res = await apiService.commonGetCall(
              "Payroll/GetStaffByEmployeeID?EmployeID=" + ot.EmployeeID
            );
            let staffData;
            // const staffData = res.data[0];
            if (res.length != 0) {
              staffData = res[0].id;
            } else {
              staffData = 0;
            }
            return {
              StaffID: staffData,
              OT_name: ot.name,
              Hours: ot.hours,
              PayDate: ot.Date,
            };
          })
        : []
    );
    return loans;
  };

  // TODO: Download excel usinf react-export toexcel
  // const { onDownload } = useDownloadExcel({
  //   currentTableRef: tableRef.current,
  //   filename: "Users table",
  //   sheet: "Users"
  // });

  // TODO: Download excel using xlsx method
  const exportToExcel = () => {
    /* table id is passed over here */
    let element = document.getElementById("lvs");
    const ws = XLSX.utils.table_to_sheet(element);

    /* generate workbook and add the worksheet */
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

    /* save to file */
    XLSX.writeFile(wb, "AttendanceUnitsUploadTemplate.xlsx");
  };

  /* 
  // TODO: Example code
const data = [
  { Name: "John", Age: 30, Email: "john@example.com" },
  { Name: "Jane", Age: 25, Email: "jane@example.com" },
  { Name: "Bob", Age: 40, Email: "bob@example.com" },
];

const workbook = XLSX.utils.book_new();
const worksheet = XLSX.utils.json_to_sheet(data);

XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

XLSX.writeFile(workbook, "output.xlsx");


*/

  return (
    <div>
      <br />
      <div className="container-fluid ">
        <div className="row">
          <div className="col-12">
            <div className="card shadow-lg p-4 rounded-3">
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
                    className="form-control CancelBTN"
                    onClick={openEditModal}
                  >
                    Upload Overtime
                  </button>
                </div>
                <div className="col-lg-3">
                  <DownloadTableExcel
                    filename="users table"
                    sheet="users"
                    // currentTableRef={tableRef.current}
                  >
                    <button
                      type="button"
                      id={Styles.UploadLoansButton}
                      className="form-control CancelBTN"
                    >
                      Export To Excel
                    </button>
                  </DownloadTableExcel>
                </div>
              </div>
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
                  ariaLabel="Close"
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
                  <Link href="https://103.12.1.76/ALIAPI/Images/.xlsx">
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
                      onClick={() => uploadot()}
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
            <div className="row mt-3">
              <div className="container">
                <table className="table table-hover">
                  <thead className="bg-info text-white">
                    <tr>
                      <th>Employee ID </th>
                      <th>Employee Name</th>
                      {/* <th>Position</th> */}
                      <th>Pay Date</th>
                      <th>Component Name</th>
                      <th>No of Hours</th>
                    </tr>
                  </thead>
                  <tbody>
                    {otDetails.map((data) => {
                      return (
                        <tr key={data.id}>
                          <td>{data.employeID}</td>
                          <td>{data.staffname}</td>
                          <td>{data.filterdate}</td>
                          <td>{data.oT_name}</td>
                          <td>{data.hours}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Myovertimedetails;
