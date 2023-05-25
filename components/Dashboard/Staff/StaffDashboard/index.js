import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import { BiEdit } from "react-icons/bi";
import Styles from "../../../../styles/addStaff.module.css";
import ReactPaginate from "react-paginate";

function StaffDashbaord() {
  const [staff, setStaffData] = useState([]);
  const hostURL = process.env.NEXT_PUBLIC_API_HOST_URL;

  useEffect(() => {
    getStaffDetails();
  }, []);

  const getStaffDetails = async () => {
    let res = await axios.get(
      hostURL + "Payroll/GetAllStaffNewforstaffdashboard"
    );
    setStaffData(res.data);
  };
  const getData = (data) => {
    // sessionStorage.setItem("id", data.id);
  };
  const clearData = () => {
    // sessionStorage.setItem("id", "");
  };
  const enableDisableStaff = async (data) => {
    let entity = {
      StaffID: data.employeID,
      AttendanceEnable: !data.attendanceEnable,
    };
    await axios.post(hostURL + "Payroll/UpdateAttendanceEnableDisable", entity);
    if (etty.AttendanceEnable == true) {
      Swal.fire("Attendance enabled");
    } else {
      Swal.fire("Attendance disabled");
    }
    getData();
  };
  const handleDelete = async (id) => {
    try {
      let res = await axios.get(hostURL + ``);
      console.log(res.data);
      Swal.fire("Data deleted successfully");
      getbarangaymaster();
    } catch (error) {
      console.error(error);
      Swal.fire("Failed to delete data");
    }
  };

  const PER_PAGE = 7;
  const [currentPage, setCurrentPage] = useState(0);
  function handlePageClick({ selected: selectedPage }) {
    setCurrentPage(selectedPage);
  }
  const offset = currentPage * PER_PAGE;
  const pageCount = Math.ceil(staff.length / PER_PAGE);


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
              >
                <option>Select Department</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </select>
            </div>
            <div className="col-lg-2">
              <select
                className="form-select"
                aria-label="Default select example"
              >
                <option>Select Level</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </select>
            </div>

            <div className="col-lg-2">
              <select
                className="form-select"
                aria-label="Default select example"
              >
                <option>Select Position</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </select>
            </div>

            <div className="col-lg-2">
              <input
                type="text"
                className="form-control"
                placeholder="Search for Staff"
              />
            </div>

            <div className="col-lg-2">
              <button type="button" className="AddButton">
                Export Excel
              </button>
            </div>
          </div>
        </div>
        <br></br>
        <div className="row">
          <div className="col-lg-6">
          </div>
          <div className="col-lg-2"></div>
          <div className="col-lg-2">
            <Link href="/Staff/AddStaff">
              <button
                type="button"
                className="AddButton"
                style={{ marginTop: "5%" }}
              >
                Add Staff
              </button>
            </Link>
          </div>
          <div className="col-lg-2">
            <button
              type="button"
              className="AddButton"
              style={{ marginTop: "5%" }}
            >
              Upload Staff
            </button>
          </div>
        </div>

        <div className="row mt-4">
          <div className="col-lg-12">
            <div className="table-responsive">
              <table className="table table-striped table-bordered ">
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
                  {staff.slice(offset, offset + PER_PAGE).map((data, index) => {
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
                          <span onClick={() => enableDisableStaff(data)}>
                            {data.attendanceEnable ? (
                              <button
                                onClick={getData.bind(this, data)}
                                className="enableDisableBtn"
                              >
                                DISABLE
                              </button>
                            ) : (
                              <button
                                onClick={getData.bind(this, data)}
                                className="enableDisableBtn"
                              >
                                ENABLE
                              </button>
                            )}
                          </span>
                        </td >
                        <td className="text-center">
                          <Link href={`/Staff/AddStaff/Edit/${data.id}`}>
                            {/* <buttton style={{
                              textShadow: "none",
                              letterSpacing: ".5px",
                              borderRadius: "5px",
                              borderColor: "#3247d5",
                              backgroundColor: "white",
                              color: "#3247d5",
                              fontWeight: "600",
                              width: "53px",
                              height: "26px",
                              border: "2px solid #3247d5"
                                  }}>Edit</buttton> */}
                            <div style={{ width: "50px" }}>
                              <BiEdit />
                            </div>
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StaffDashbaord;
