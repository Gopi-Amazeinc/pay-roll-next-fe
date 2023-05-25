import Link from "next/link";
import React from "react";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import { apiService } from "@/services/api.service";
import Styles from "@/styles/attendancedetails.module.css";
import { DownloadTableExcel } from "react-export-table-to-excel";
import ReactPaginate from "react-paginate";
import Modal from "react-modal";
import * as XLSX from "xlsx";


const CompanyAttendanceDetails = () => {
  const tableRef = useRef(null);
  const [CompanyAttendence, setCompanyAttendence] = useState([]);
  const [userID, setUserID] = useState();
  const [roleID, setRoleID] = useState();
  const router = useRouter();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [count, setcount] = useState("");
  const [StaffData, setStaffData] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [companystaff, setCompanystaff] = useState("");



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
      width: "40%",
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
  let hostURL = process.env.NEXT_PUBLIC_API_HOST_URL;

  useEffect(() => {
    const userid = sessionStorage.getItem("userID");
    const roleid = sessionStorage.getItem("roleID");
    setUserID(userid);
    setRoleID(roleid);
    // const  getAttendenceByID = async() => {
    //     debugger
    //      const userid = sessionStorage.getItem("userID");
    //     const SDate = '2023-10-10';
    //     const EDate = "2023-11-11";
    //     if (userid) {
    //         const res = await apiService.commonGetCall("HR/GetAttendanceByManagerID?&SDate=" + SDate + '&EDate=' + EDate);
    //         //   let res = await axios.get(hostURL + "HR/GetAttendanceByManagerID?SupervisorID=" + SupervisorID + '&SDate=' + SDate + '&EDate=' + EDate);
    //         setCompanyAttendence(res.data);
    //     }
    // }
    // getAttendenceByID();
  }, []);

  useEffect(() => {
    if (userID) {
      const resu = getCurrentMonthDates();
      if (resu) {
        getCompanyAttendance(resu.setStartDate, resu.setEndDate);
      }
    }
  }, [userID]);

  const PER_PAGE = 10;
  const [currentPage, setCurrentPage] = useState(0);

  const offset = currentPage * PER_PAGE;
  const paginatedData = CompanyAttendence.slice(offset, offset + PER_PAGE);
  const pageCount = Math.ceil(CompanyAttendence.length / PER_PAGE);
  // const pageCount = Math.ceil(CompanyAttendence.length / PER_PAGE);
  const handlePageClick = ({ selected: selectedPage }) => {
    setCurrentPage(selectedPage);
  };

  const getCurrentMonthDates = () => {
    let newDate = new Date();
    let firstDayOfMonth = new Date(newDate.getFullYear(), newDate.getMonth());
    let fromDate = formateDate(firstDayOfMonth);

    const year = newDate.getFullYear();
    const month = newDate.getMonth() + 1;
    const lastDay = new Date(year, month, 0).getDate();
    const toDate = `${year}-${month.toString().padStart(2, "0")}-${lastDay
      .toString()
      .padStart(2, "0")}`;
    setStartDate(fromDate);
    setEndDate(toDate);
    return {
      setStartDate: fromDate,
      setEndDate: toDate,
    };
  };
  const formateDate = (datetoformat) => {
    const day = datetoformat.getDate().toString().padStart(2, "0");
    const month = (datetoformat.getMonth() + 1).toString().padStart(2, "0");
    const year = datetoformat.getFullYear().toString();
    return `${year}-${month}-${day}`;
  };

  const getStartDate = (selectedDate) => {
    setStartDate(selectedDate);
    setEndDate("");
  };

  const getEndDate = (selectedDate) => {
    setEndDate(selectedDate);
    return getDateBySelectedDate(selectedDate);
  };
  const getDateBySelectedDate = (endDatesss) => {
    return getCompanyAttendance(startDate, endDatesss);
  };

  const getCompanyAttendance = async (SDate, EDate) => {
    if (userID) {
      const res = await apiService.commonGetCall(
        "Payroll/GetAttendanceByHR?SDate=" + SDate + "&EDate=" + EDate
      );
      setCompanyAttendence(res.data);
      setcount(res.data.length);
    }
  };
  useEffect(() => {
    if (userID) {
      debugger;
      getstaffDetails();
    }
  }, [userID]);
  const getstaffDetails = async () => {
    const staffDetails = await apiService.commonGetCall(
      "Payroll/GetAllStaffNewforstaffdashboard"
    );
    setStaffData(staffDetails.data);
    // setcount(res.data.length);
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
  const transformedAttendance = async (items) => {
    console.log(items);
    const loans = await Promise.all(
      items && items.length > 0
        ? items.map(async (attnd) => {
          const res = await apiService.commonGetCall(
            "Payroll/GetStaffByEmployeeID?EmployeID=" + attnd.EmployeeID
          );
          const staffData = res.data[0];
          return {
            UserID: staffData.id,
            SigninDate: attnd.Date,
            SignoutDate: attnd.Date,
            punchinip: attnd.Punchintime,
            punchoutip: attnd.PunchOuttime,
            ApprovalStatus: "Manager Approved & Hr Approved",
          };
        })
        : []
    );
    return loans;
  };

  //   Written By:-Gopi  => The data in excel file is uploaded to the backend API
  const uploadAttendance = async () => {
    debugger
    const transformedData = await transformedAttendance(items);
    if (transformedData.length > 0) {
      await apiService.commonPostCall(
        "Payroll/UploadbulkAttendanceWeb",
        transformedData
      );
      Swal.fire(" Employe Attendence Uploaded succefully!");
    } else {
      Swal.fire(" No Employe Attendence Uploaded!");
    }
    setModalOpen(false);
    getCompanyAttendance();
  };

  return (
    <div>
      <div className="container-fluid">
        <div className="row mt-3">
          <div className="col-lg-3 ">
            <Link
              className={Styles.mainheader}
              href="/Attendance/AttendanceDetails"
            >
              My Attendence Details
            </Link>
          </div>
          <div className="col-lg-3" style={{ marginLeft: "-30px" }}>
            <div
              className={Styles.mainheader}
              onClick={() =>
                router.push("/Attendance/CompanyAttendanceDetails")
              }
            >
              Company Attendance Details
            </div>
            <div className="line-border"></div>
          </div>
        </div>

        <div className="card p-3 border-0 shadow-lg rounded-3 mt-4">
          <div className="row">
            <div className="col-lg-1">
              <label ><b>     Filter By</b></label>

            </div>

            <div className="col-lg-2">
              <label ><b>Start Date</b></label>

              <input
                type="date"
                className="form-control"
                // value={startDate}
                onChange={(e) => getStartDate(e.target.value)}
              />
            </div>

            <div className="col-lg-2">
              <label ><b>End Date</b></label>

              <input
                type="date"
                className="form-control"
                // value={endDate || ""}
                onChange={(e) => getEndDate(e.target.value)}
              />
            </div>

            <div className="col-lg-2">
              <label ><b>Staff</b>  <i className="text-danger">*</i></label>
              <select className="form-select" onChange={(e) => setCompanystaff(e.target.value)}>
                <option>Select Staff</option>
                {StaffData.map((data, index) => {
                  return (
                    <option value={data.id} key={index}>
                      {data.firstName}
                    </option>
                  );
                })}
              </select>
            </div>

            <div className="col-lg-2">
              <label ><b>Search</b> <i className="text-danger">*</i></label>

              <input
                type="text"
                className="form-control"
                placeholder="Search" onChange={(e) => setKeyword(e.target.value)}
              />
            </div>

            <div className="col-lg-2">
              <button className="button" onClick={openEditModal}>Upload</button>
              <br />
              <p></p>        <DownloadTableExcel
                filename="users table"
                sheet="users"
                currentTableRef={tableRef.current}
              >
                <button className="button">Export To Excel</button>{" "}
              </DownloadTableExcel>
            </div>
            <div>



              <Modal
                isOpen={modalOpen}
                style={customStyles}
                contentLabel="Example Modal"
              >
                <div className=" modal-header">
                  <h5 className=" modal-title" id="exampleModalLabel">
                    Upload Attendence
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
                    <Link href="https://103.12.1.76/ALIAPI/Images/UploadAttendance.xlsx">
                      <span
                        style={{ color: "navy", textDecoration: "underline" }}
                      >
                        UploadAttendanceTemplate.XLSX
                      </span>
                    </Link>
                  </div>
                  <div className="row">
                    {/* <ModalFooter> */}
                    <div className="col-lg-5">
                      <br />
                      <button
                        className="button"
                        id={Styles.UploadStaffButton}
                        onClick={() => uploadAttendance()}
                        color="primary"
                        type="button"
                      >
                        Upload Attendence
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
        <br />
        <div className="row">
          <div className="col-lg-12">
            <h6 style={{ color: "#3247d5" }}>Showing {count} Results</h6>
            <table className="table  mt-2 " ref={tableRef}>
              <thead className="bg-info text-white ">
                <tr style={{ whiteSpace: "nowrap" }}>
                  <th>Date</th>
                  <th>Staff </th>
                  <th>Day Type </th>

                  <th>Expected In Time </th>
                  <th>Expected Out Time </th>
                  <th>Punch In Time</th>

                  <th>Punch Out Time </th>
                  <th>Work Hours(HH:MM) </th>
                  <th>Overtime</th>

                  <th>UnderTime</th>
                  <th>Late</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(CompanyAttendence) &&
                  CompanyAttendence.length > 0 && (
                    <>
                      {CompanyAttendence
                        .filter(post => {
                          return Object.values(post).some(value =>
                            value !== null && value.toString().toLowerCase().includes(keyword.toLowerCase())
                          );
                        })
                        .slice(offset, offset + PER_PAGE).map(
                          (data, index) => {
                            return (
                              <tr key={index} value={data.index}>
                                <td>{data.date}</td>
                                <td>{data.staffname}</td>
                                <td>{data.position}</td>

                                <td>{data.expectedIn}</td>
                                <td>{data.expectedOut}</td>
                                <td>{data.expectedIn}</td>

                                <td>{data.expectedOut}</td>
                                <td>{data.hr}</td>
                                <td>{data.overtime}</td>

                                <td>{data.expectedOutTime}</td>
                                <td>{data.late}</td>
                              </tr>
                            );
                          }
                        )}
                    </>
                  )}
              </tbody>
            </table>
          </div>
        </div>
        <div className="mb-4 mt-4 text-center">
          <ReactPaginate
            previousLabel={"Previous"}
            nextLabel={"Next"}
            breakLabel={"..."}
            pageCount={pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={3}
            onPageChange={handlePageClick}
            containerClassName={"pagination  justify-content-center"}
            pageClassName={"page-item "}
            pageLinkClassName={"page-link"}
            previousClassName={"page-item"}
            previousLinkClassName={"page-link"}
            nextClassName={"page-item"}
            nextLinkClassName={"page-link"}
            breakClassName={"page-item"}
            breakLinkClassName={"page-link"}
            activeClassName={"active primary"}
          />
        </div>
      </div>
    </div>
  );
};

export default CompanyAttendanceDetails;
