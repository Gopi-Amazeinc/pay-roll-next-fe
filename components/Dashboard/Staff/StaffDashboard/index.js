import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import { BiEdit } from "react-icons/bi";
import Styles from "../../../../styles/addStaff.module.css";
import ReactPaginate from "react-paginate";
import { useRef } from "react";
import { DownloadTableExcel } from "react-export-table-to-excel";
import Modal from "react-modal";
import * as XLSX from "xlsx";
import Swal from "sweetalert2";
import { apiService } from "@/services/api.service";

function StaffDashbaord() {
  const [staff, setStaffData] = useState([]);
  const tableRef = useRef(null);
  const [count, setcount] = useState("");
  const [keyword, setKeyword] = useState("");
  const [items, setItems] = useState([]);
  const [showButtons, setShowButtons] = useState(false);
  const [department, setDepartment] = useState([]);
  const [position, setPosition] = useState([]);
  const [level, setLevel] = useState([]);

  const [enableState, setEnableState] = useState(false);
  const [disableState, setDisableState] = useState(false);

  const [enableStaffState, setEnableStaffState] = useState(false);
  const [disableStaffState, setDisableStaffState] = useState(false);

  const hostURL = process.env.NEXT_PUBLIC_API_HOST_URL;

  useEffect(() => {
    getStaffDetails();
  }, []);

  const getStaffDetails = async () => {
    let res = await axios.get(
      hostURL + "Payroll/GetAllStaffNewforstaffdashboard"
    );
    setStaffData(res.data);
    setcount(res.data.length);
    if (res.data.attendanceEnable == 1) {
      setEnableState(true);
      // setDisableState(false);
    } else {
      setDisableState(true);
      // setEnableState(false);
    }

    if (res.data.enableDisable == 1) {
      setEnableStaffState(true);
      // setDisableStaffState(false)
    } else {
      setDisableStaffState(true);
      // setEnableStaffState(false)
    }

    let res1 = await axios.get(hostURL + "Master/GetDepartmentMaster");
    setDepartment(res1.data);

    let res2 = await axios.get(hostURL + "Master/GetPositionMaster");
    setPosition(res2.data);

    let res3 = await axios.get(hostURL + "Master/GetLevelType");
    setLevel(res3.data);
  };
 
  
  //enable-disable staff attendance
  const enableStaffAttendance = async (data) => {
    debugger;
    let entity = {
      StaffID: data.id,
      AttendanceEnable: 1,
    };
    let res = await axios.post(
      hostURL + "Payroll/UpdateAttendanceEnableDisable",
      entity
    );
    if (res.status == 200 && res != null) {
      setEnableState(true);
      setDisableState(false);
      Swal.fire("Attendance enabled");
    } else {
      setDisableState(false);
      setEnableState(true);
      Swal.fire("Attendance disabled");
    }
    getStaffDetails();
  };
  const disableStaffAttendance = async (data) => {
    debugger;
    let entity = {
      StaffID: data.id,
      AttendanceEnable: 0,
    };
    let res = await axios.post(
      hostURL + "Payroll/UpdateAttendanceEnableDisable",
      entity
    );
    if (res.status == 200 && res != null) {
      setDisableState(true);
      setEnableState(false);
      Swal.fire("Attendance disabled");
    } else {
      setEnableState(false);
      setDisableState(true);
      Swal.fire("Attendance enabled");
    }
    getStaffDetails();
  };

  //active-inactive staff
  const enableStaff = async (data) => {
    debugger
    let entity = {
      StaffID: data.id,
      EnableDisable: 0,
    };
    let res = await axios.post(
      hostURL + "HR/UpdateStaffEnableDisable",
      entity
    );
    if (res.status == 200 && res != null) {
      setEnableStaffState(true);
      setDisableStaffState(false)
      Swal.fire("Staff active");
    } else {
      setDisableStaffState(true)
      setEnableStaffState(false);
      Swal.fire("Staff in-active");
    }
    getStaffDetails();
  };
  const disableStaff = async (data) => {
    debugger
    let entity = {
      StaffID: data.id,
      EnableDisable: 1,
    };
    let res = await axios.post(
      hostURL + "HR/UpdateStaffEnableDisable",
      entity
    );
    if (res.status == 200 && res != null) {
      setDisableStaffState(true)
      setEnableStaffState(false);
      Swal.fire("Staff active");
    } else {
      setEnableStaffState(true);
      setDisableStaffState(false)
      Swal.fire("Staff in-active");
    }
    getStaffDetails();
  };
  const handleDelete = async (id) => {
    try {
      let res = await axios.get(hostURL + `Payroll/DeleteStaff?ID=${id}`);
      console.log(res.data);
      Swal.fire("Data deleted successfully");
      getStaffDetails();
    } catch (error) {
      console.error(error);
      Swal.fire("Failed to delete data");
    }
  };
  const handleActive = async (id) => {};
  const customStyles = {
    content: {
      top: "20%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      width: "30%",
      overflow: "hidden",
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

  const PER_PAGE = 7; //pagination
  const [currentPage, setCurrentPage] = useState(0);
  function handlePageClick({ selected: selectedPage }) {
    setCurrentPage(selectedPage);
  }
  const offset = currentPage * PER_PAGE;
  const pageCount = Math.ceil(staff.length / PER_PAGE);

  const [modalOpen, setModalOpen] = useState(false); //modal
  const openEditModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  const incomingfile = async (file) => {
    //excel upload
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

  const uploadStaff = async () => {
    const transformedData = await transformedStaff(items);
    if (transformedData.length > 0) {
      await apiService.commonPostCall(
        "Payroll/InsertStaffOvetimeOTupload",
        transformedData
      );
      Swal.fire("Component Bulk Uploaded Successfully!");
    } else {
      Swal.fire("Upload failed!");
    }
    setModalOpen(false);
    getStaffSalary();
  };

  const transformedStaff = async (items) => {
    console.log(items);
    debugger;
    const staffList = await Promise.all(
      items && items.length > 0
        ? items.map(async (staff) => {
            const res = await apiService.commonGetCall(
              "Payroll/GetStaffByEmployeeID?EmployeID=" + staff.EmployeeID
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
    return staffList;
  };

  const handleOnChange = (event) => {
    const { checked } = event.target;
    const data = JSON.parse(event.target.value);
    if (checked) {
    }
  };
  return (
    <div>
      <div className="container">
        <h5 className="Heading">Staff Dashboard</h5>
        <div className="card p-3 border-0 mt-4">
          <div className="row">
            <div className="col-lg-1">
              <p>Filter By</p>
            </div>

            <div className="col-lg-2">
              <select
                className="form-select"
                aria-label="Default select example"
                onChange={(e) => setKeyword(e.target.value)}
              >
                <option>Select Department</option>
                {department.map((data, index) => {
                  return (
                    <option key={data.id} value={data.id}>
                      {data.department_name}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="col-lg-2">
              <select
                className="form-select"
                aria-label="Default select example"
                onChange={(e) => setKeyword(e.target.value)}
              >
                <option>Select Level</option>
                {level.map((data, index) => {
                  return (
                    <option key={data.id} value={data.id}>
                      {data.short}
                    </option>
                  );
                })}
              </select>
            </div>

            <div className="col-lg-2">
              <select
                className="form-select"
                aria-label="Default select example"
                onChange={(e) => setKeyword(e.target.value)}
              >
                <option>Select Position</option>
                {position.map((data, index) => {
                  return (
                    <option key={data.id} value={data.id}>
                      {data.short}
                    </option>
                  );
                })}
              </select>
            </div>

            <div className="col-lg-2">
              <input
                type="text"
                className="form-control"
                placeholder="Search for Staff"
                onChange={(e) => setKeyword(e.target.value)}
              />
            </div>

            <div className="col-lg-2">
              {count > 0 ? (
                <>
                  <DownloadTableExcel
                    filename="users table"
                    sheet="users"
                    currentTableRef={tableRef.current}
                  >
                    <button className="button" id="AddButton">
                      Download
                    </button>
                  </DownloadTableExcel>
                </>
              ) : null}
            </div>
          </div>
        </div>
        <br></br>
        <div className="row">
          <div className="col-lg-6"></div>
          <div className="col-lg-2"></div>
          <div className="col-lg-2">
            <Link href="/Staff/AddStaff">
              <button type="button" className="AddButton">
                Add Staff
              </button>
            </Link>
          </div>
          <div className="col-lg-2">
            <button className="AddButton" onClick={openEditModal}>
              Upload Staff
            </button>
          </div>
        </div>

        <div className="row mt-4">
          <div className="col-lg-12">
            <div className="table-responsive">
              <table className="table" ref={tableRef}>
                <thead className={"bg-info text-white "}>
                  <tr style={{ whiteSpace: "nowrap" }}>
                    <th>Employee Id</th>
                    <th>Employee Name</th>
                    <th>Department</th>
                    <th>Level</th>
                    <th>Gender</th>
                    <th>Position</th>
                    <th>Email</th>
                    <th>Date Of Joining</th>
                    <th>Manager</th>
                    <th>Attendance Enable</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {staff
                    .slice(offset, offset + PER_PAGE)
                    .filter((post) => {
                      return Object.values(post).some(
                        (value) =>
                          value !== null &&
                          value
                            .toString()
                            .toLowerCase()
                            .includes(keyword.toLowerCase())
                      );
                    })
                    .map((data, index) => {
                      return (
                        <tr className="text-dark" key={index}>
                          <td>{data.employeID}</td>
                          <td>{data.firstName}</td>
                          <td>{data.department_name}</td>
                          <td>{data.level}</td>
                          <td>{data.gender}</td>
                          <td>{data.position}</td>
                          <td>{data.emailID}</td>
                          <td>{data.hiredDate}</td>
                          <td>{data.manager}</td>
                          <td className="text-center">
                            {/* <span onClick={() => enableDisableStaff(data)}>
                              {data.attendanceEnablee ? (
                                <button
                                  onClick={getData.bind(this, data)}
                                  className="enableDisableBtn"
                                >
                                  ENABLE
                                </button>
                              ) : (
                                <button
                                  onClick={getData.bind(this, data)}
                                  className="enableDisableBtn"
                                >
                                  DISABLE
                                </button>
                              )}
                            </span> */}

                            {enableState == true && (
                              <button
                                onClick={() => disableStaffAttendance(data)}
                                className="enableDisableBtn"
                              >
                                Disable
                              </button>
                            )}
                            {disableState == true && (
                              <button
                                onClick={() => enableStaffAttendance(data)}
                                className="enableDisableBtn"
                              >
                                Enable
                              </button>
                            )}
                          </td>

                          <td className="text-center">
                            <BiEdit
                              className={Styles.imgBtn}
                              onClick={() => setShowButtons(!showButtons)}
                            />

                            {showButtons && (
                              <>
                                <div className="card p-2 mt-1">
                                  <div>
                                    <div className="row">
                                      <Link
                                        href={`/Staff/AddStaff/Edit/${data.id}`}
                                      >
                                        <button className={Styles.editBtnn}>
                                          EDIT
                                        </button>
                                      </Link>
                                    </div>
                                    <br></br>
                                    <div className="row">
                                      <button
                                        className={Styles.deleteBtn}
                                        onClick={handleDelete.bind(
                                          this,
                                          data.id
                                        )}
                                      >
                                        DELETE
                                      </button>
                                    </div>
                                    <br></br>
                                    <div className="row">
                                      {enableStaffState == true && (
                                        <button
                                          onClick={() =>
                                            enableStaff(data)
                                          }
                                          className={Styles.activeBtn}
                                        >
                                          Active
                                        </button>
                                      )}
                                      {disableStaffState == true && (
                                        <button
                                          onClick={() =>
                                            disableStaff(data)
                                          }
                                          className={Styles.activeBtn}
                                        >
                                          Inactive
                                        </button>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>

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

              <Modal
                isOpen={modalOpen}
                style={customStyles}
                contentLabel="Example Modal"
              >
                <div className=" modal-header">
                  <h5 className=" modal-title" id="exampleModalLabel">
                    Upload staff
                  </h5>
                  <button
                    ariaLabel="Close"
                    // className={Styles.close}
                    type="button"
                    onClick={closeModal}
                  >
                    X
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
                  <div className="col-lg-5">
                    <Link href="https://103.12.1.76/ALIAPI/Images/.xlsx">
                      <span
                        style={{ color: "navy", textDecoration: "underline" }}
                      >
                        UploadTemplate.XLSX
                      </span>
                    </Link>
                  </div>
                  <div className="row">
                    {/* <ModalFooter> */}
                    <div className="col-lg-6">
                      <button
                        // className="mt-4"
                        className="AddButton mt-4"
                        onClick={() => uploadStaff()}
                        color="primary"
                        type="button"
                      >
                        UPLOAD
                      </button>
                    </div>
                  </div>
                </div>
              </Modal>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StaffDashbaord;
