import React, { useEffect, useState, useRef } from "react";
import Modal from "react-modal";
import Swal from "sweetalert2";
import axios from "axios";
// import ReactPaginate from "react-paginate";
import Styles from "../.././../../styles/finalpayrolldetails.module.css";

import Link from "next/link";
import { DownloadTableExcel } from "react-export-table-to-excel";
import { IoIosClose } from "react-icons/io";
import { apiService } from "@/services/api.service";

const InitialPayrollDetails = () => {
  const [keyword, setKeyword] = useState("");
  const tableRef = useRef(null);

  const [modalIsOpen, setIsOpen] = useState(false);

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      width: "60%",
    },
  };

  const [preliminarySalary, setPreliminarySalary] = useState([]);

  const [department, setDepartment] = useState([]);

  const [allSelected, setAllSelected] = useState(false);

  const [departmentFilter, setDepartmentFilter] = useState("");

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    let res = await apiService.commonGetCall("Payroll/GetPreliminarySalary");
    setPreliminarySalary(res.data);
    let departementData = await apiService.commonGetCall(
      "Master/GetDepartmentMaster"
    );
    setDepartment(departementData.data);
  };

//   const PER_PAGE = 5;
//   const [currentPage, setCurrentPage] = useState(0);
//   function handlePageClick({ selected: selectedPage }) {
//     setCurrentPage(selectedPage);
//   }
//   const offset = currentPage * PER_PAGE;
//   const pageCount = Math.ceil(preliminarySalary.length / PER_PAGE);

  const selcteAllRows = (event, id) => {
    setAllSelected(event.target.checked);
    for (let i = 0; i < preliminarySalary.length; i++) {
      preliminarySalary[i].isChecked = event.target.checked;
    }
    setPreliminarySalary(preliminarySalary);
  };

  const selectMultipleRows = (event) => {
    debugger;
    const { checked, value } = event.target;
    const data = JSON.parse(value);

    let myList = preliminarySalary;

    for (let i = 0; i < myList.length; i++) {
      if (myList[i].id == data.id) {
        myList[i].isChecked = event.target.checked;
        debugger
        setPreliminarySalary([]);
        setPreliminarySalary(myList);
        break;
      }
    }
  };

  const deleteSlectedRows = async () => {
    debugger;
    let dataToDelete = preliminarySalary.filter((x) => x.isChecked == true);
    const deletedIDS = await deleteAllSelectedSalary(dataToDelete);
    if (deletedIDS) {
      Swal.fire({
        icon: "success",
        title: "Hurray..",
        text: "Data Deleted Successfully...!",
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops..",
        text: "Data Not Deleted...!",
      });
    }
    getData();
  };

  const deleteAllSelectedSalary = async (checkedState) => {
    debugger;
    try {
      checkedState && checkedState.length > 0;
      const res = await apiService.commonPostCall(
        `Payroll/DeletePreliminary`,
        checkedState
      );
      const deletedData = res.data[0] || res.data;
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops..",
        text: "Data Not Deleted...!",
      });
    }
  };
  return (
    <div className="container-fluid">
      <p className=" Heading">Initial Payroll Details</p>
      <br />
      <div className="card p-4 ">
        <div className="row">
          <div className="col-lg-1">
            <p>Filter By</p>
          </div>
          <div className="col-lg-2">
            <input type="date" className="form-control" />
          </div>
          <div className="col-lg-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search..."
              onChange={(e) => {
                setKeyword(e.target.value);
              }}
            />
          </div>
          <div className="col-lg-2">
            <select
              className="form-select"
              onChange={(e) => {
                setDepartmentFilter(e.target.value);
              }}
            >
              <option value="" disabled="">
                Select Department{" "}
              </option>
              {department.map((data, index) => {
                return (
                  <option value={data.id} key={data.id}>
                    {data.department_name}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="col-lg-3">
            <DownloadTableExcel
              filename="users table"
              sheet="users"
              currentTableRef={tableRef.current}
            >
              <button type="button" className="EditDelteBTN ">
                Export To Excel{" "}
              </button>
            </DownloadTableExcel>
          </div>
        </div>
      </div>
      <br />
      <br />
      <div className="row ">
        <div className="col-lg-4"> </div>
        <div className="col-lg-4">
          <p className="Heading">Employees in selected Period</p>
        </div>
        <div className="col-lg-2" style={{ marginLeft: "83px" }}>
          <button
            type="button"
            className="EditDelteBTN"
            onClick={deleteSlectedRows}
          >
            Delete
          </button>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-12">
          {/* <span>Select All <input type="checkbox" checked={checkedState.map((data) => data.length ) === preliminarySalary.length} onChange={e => handleRowSelect(e, 'all')} /></span> */}
          <br />
          <table className="table text-center" ref={tableRef}>
            <thead>
              <tr className="text-white" style={{ whiteSpace: "nowrap" }}>
                <th>
                  Select All
                  <input
                    type="checkbox"
                    checked={allSelected}
                    onChange={(e) => selcteAllRows(e, "all")}
                  />
                </th>
                <th>Employee ID</th>
                <th>Staff ID</th>
                <th>Employee Name</th>
                <th>End Date </th>
                <th>Department</th>
                <th>Basic Monthly Salary</th>
                <th>Semi Monthly Salary</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {preliminarySalary
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
                // .slice(offset, offset + PER_PAGE)
                .map((data, index) => {
                  return (
                    <tr className="text-dark" key={index}>
                      <td>
                        <input
                          type="checkbox"
                          checked={data.isChecked}
                          value={JSON.stringify(data)}
                          onChange={selectMultipleRows}
                        />
                      </td>
                      <td>{data.employeID}</td>
                      <td>{data.staffID}</td>
                      <td>{data.name}</td>
                      <td>{data.endDateFormated}</td>
                      <td>{data.department_name}</td>
                      <td>{data.baseSal}</td>
                      <td>{data.componentValue}</td>
                      <td>
                        <button
                          className={Styles.actionButton}
                          onClick={openModal}
                        >
                          View Component Details
                        </button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
        <Modal isOpen={modalIsOpen} style={customStyles}>
          <div className="modalheader">
            <div className="row">
              <div className="col-lg-6">
                <h6 style={{ fontWeight: "500" }}>Component Details</h6>
              </div>
              <div className="col-lg-4"></div>
              <div className="col-lg-2">
                <button className="btn btn-primary" onClick={closeModal}>
                  <IoIosClose />
                </button>
              </div>
            </div>
            <hr></hr>
          </div>
          <div className="modalbody">
            <div className="row">
              <div className="col-lg-12">
                <table className="table  table-bordered mt-4 text-center  ">
                  <thead>
                    <tr className="text-white">
                      <th>Component Name</th>
                      <th>Amount </th>
                      <th>Component Type</th>
                    </tr>
                  </thead>
                  <tbody>
                    {preliminarySalary.map((data, index) => {
                      return (
                        <tr className="text-dark" key={index}>
                          <td>{data.componentName}</td>
                          <td>{data.componentValue}</td>
                          <td>{data.ded_type}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </Modal>
      </div>
      <div className="text-center">
        {/* <ReactPaginate
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
        /> */}
      </div>
    </div>
  );
};

export default InitialPayrollDetails;
