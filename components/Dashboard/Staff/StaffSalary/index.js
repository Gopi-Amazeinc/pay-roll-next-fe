import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Swal from "sweetalert2";
import ReactPaginate from "react-paginate";
import { apiService } from "@/services/api.service";
import Modal from "react-modal";
import * as XLSX from "xlsx";
import Styles from "../../../../styles/addStaff.module.css";

function StaffSalaryComponent() {
  const [password, setPassword] = useState("");
  const [showProtectedContent, setShowProtectedContent] = useState(false);
  const correctPassword = "123";

  const checkPassword = () => {
    if (password === correctPassword) {
      console.log("Password correct!");
      setShowProtectedContent(true); // Show protected content
    } else {
      console.log("Incorrect password!");
    }
  };

  const router = useRouter();
  let hostURL = process.env.NEXT_PUBLIC_API_HOST_URL;
  const [items, setItems] = useState([]);
  const [staffSalary, setstaffSalary] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [department, setDepartment] = useState([]);
  const [position, setPosition] = useState([]);

  useEffect(() => {
    getStaffSalary();
  }, []);

  const getStaffSalary = async () => {
    let res = await axios.get(hostURL + "Payroll/GetStaffSalary");
    setstaffSalary(res.data);

    let res1 = await axios.get(hostURL + "Master/GetDepartmentMaster");
    setDepartment(res1.data);

    let res2 = await axios.get(hostURL + "Master/GetPositionMaster");
    setPosition(res2.data);
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

  const addPayrollsalary = async () => {
    if (items == "") {
      Swal.fire({
        icon: "danger",
        titleText: "Invalid file",
        text: "Please Select Valid File",
      });
    } else {
      await axios.post(
        hostURL + "Payroll/UpdateDe_minimis_Detailsforstaff",
        items
      );
      Swal.fire({
        icon: "success",
        text: "Uploaded Successfully",
      });
      router.push("/Payroll/employmentjobhistory");
    }
  };

  const [modalOpen, setModalOpen] = useState(false); //modal
  const openEditModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
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

  const uploadSalary = async () => {
    const transformedData = await transformedSalary(items);
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

  const transformedSalary = async (items) => {
    console.log(items);
    debugger;
    const loans = await Promise.all(
      items && items.length > 0
        ? items.map(async (salary) => {
            const res = await apiService.commonGetCall(
              "Payroll/GetStaffByEmployeeID?EmployeID=" + salary.EmployeeID
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

  const PER_PAGE = 5; //pagination
  const [currentPage, setCurrentPage] = useState(0);
  function handlePageClick({ selected: selectedPage }) {
    setCurrentPage(selectedPage);
  }
  const offset = currentPage * PER_PAGE;
  const pageCount = Math.ceil(staffSalary.length / PER_PAGE);
  return (
    <div>
      {showProtectedContent ? (
        <div className="container">
          <div>
            <h3 className="Heading">Staff Salary Details</h3>
            <div className="card p-3 border-0 rounded-3 mt-4">
              <div className="row">
                <div className="col-lg-1">
                  <p>Filter By</p>
                </div>
                <div className="col-lg-2">
                  <p>Position</p>
                  <select className="form-select" onChange={(e) => setKeyword(e.target.value)}>
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
                  <p>Department</p>
                  <select className="form-select" onChange={(e) => setKeyword(e.target.value)}>
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

                <div className="col-lg-3">
                  <p>Search</p>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search..."
                    onChange={(e) => setKeyword(e.target.value)}
                  />
                </div>

                <div className="col-lg-2"></div>
                <div className="col-lg-1 text-primary">
                  <p>Count : {staffSalary.length}</p>
                </div>
              </div>
            </div>
            <br></br>
            <div className="row">
              <div className="col-lg-8"></div>
              <div className="col-lg-2 mt-2 text-end">
                <Link href="/Staff/StaffSalary/new">
                  <button className="AddButton">Add</button>
                </Link>
              </div>
              <div className="col-lg-2 mt-2">
                <button className="AddButton" onClick={openEditModal}>
                  Upload Salary
                </button>
              </div>
            </div>
            <br></br>
            <div className="row">
              <div className="col-lg-12">
                <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Staff Name</th>
                        <th>Position</th>
                        <th>Department</th>
                        <th>Basic Salary</th>
                        <th>Effective Date</th>
                        <th>Working Days In Month </th>
                        <th>Working Hours In Day </th>
                        <th>Hourly Rate</th>
                        <th>Daily Rate</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {staffSalary
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
                        .map((data) => {
                          return (
                            <tr key={data.id}>
                              <td>{data.staffID} </td>
                              <td>NA</td>
                              <td>NA</td>
                              <td>{data.basicSalary}</td>
                              <td>{data.effectiveDate}</td>
                              <td>{data.workDaysInMonth}</td>
                              <td>{data.workHoursInDay}</td>
                              <td>{data.hourlyRate}</td>
                              <td>{data.dailyRate}</td>
                              <td>
                                <Link
                                  href={`/Staff/StaffSalary/Edit/${data.id}`}
                                >
                                  <button
                                    style={{
                                      textShadow: "none",
                                      letterSpacing: ".5px",
                                      borderRadius: "5px",
                                      border: "none",
                                      padding: "5px",
                                      backgroundColor: "#3247d5",
                                      color: "#fff",
                                      fontWeight: "700",
                                      width: "100px",
                                    }}
                                  >
                                    EDIT
                                  </button>
                                </Link>
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
                        Upload salary
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
                            style={{
                              color: "navy",
                              textDecoration: "underline",
                            }}
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
                            onClick={() => uploadSalary()}
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
      ) : (
        <div>
          <div className="container">
            <div className="card p-4 border-0" style={{ marginTop: "200px" }}>
              <div className="row">
                <div className="col-lg-4"></div>
                <div className="col-lg-4">
                  <input
                    className="form-control"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password"
                  />
                </div>
                <div className="col-lg-4"></div>
              </div>
              <br></br>
              <div className="row">
                <div className="col-lg-4"></div>
                <div className="col-lg-4 text-center">
                  <button onClick={checkPassword} className={Styles.submitBtn}>
                    SUBMIT
                  </button>
                </div>
                <div className="col-lg-4"></div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default StaffSalaryComponent;
