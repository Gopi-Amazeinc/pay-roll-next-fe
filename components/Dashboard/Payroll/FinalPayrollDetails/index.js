import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import Swal from "sweetalert2";
import Link from "next/link";
import * as XLSX from "xlsx";
import Styles from "../.././../../styles/finalpayrolldetails.module.css";
import { apiService } from "@/services/api.service";
import ReactPaginate from "react-paginate";

const FinalPayrollDetails = () => {
  const [preliminarySalary, setPreliminarySalary] = useState([]);
  const [department, setDepartment] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("")

  const getData = async () => {
    // This API is used for fetch the Departmnent data for Dashboard and  Dropdown
    let res = await apiService.commonGetCall("Payroll/GetPreliminarySalary");
    debugger;
    setPreliminarySalary(res.data);
    console.log(res.data.length);
    // This API is used for fetch the Departmnent data for Dropdown
    res = await apiService.commonGetCall("Master/GetDepartmentMaster");
    setDepartment(res.data);
  };
  const [selectedRows, setSelectedRows] = useState([]);
  const [checkedState, setCheckedState] = useState([]);
  const [ischeckedstate,setischeckedstate] = useState(false);

  // const [selctedValues, setSelctedValues] = useState([]);
  // const [deleteSalary, setDeleteSalary] = useState();

  const handleRowSelect = (event, id) => {
    debugger;
    if (id === "all") {
      setCheckedState(event.target.checked ? preliminarySalary : []);
    } else {
      setCheckedState(
        checkedState.includes(id)
          ? checkedState.filter((rowId) => rowId !== id)
          : [...checkedState, id]
      );
    }
  };

  useEffect(() => {
    getData();
  }, []);
  const handleData = (data) => {
    let res = paycode.filter((x) => x.payCode == watch("PayCode"))[0]
      .endDateFormated;
    // let res = preliminarySalary.filter(data.staffID);
    // res = preliminarySalary.filter(data.endDate);
    // console.log(Object.values(res.data));
  };

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

  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  // const handleOnChange = (staffid, endDateformatedd) => {
  //   debugger;
  //   // setischecked(true);
  //   if(isChecked== true) {
  //   let entity = {
  //     staffID: staffid,
  //     endDateformated: endDateformatedd,
  //   };
  //   setCheckedState( [...checkedState, entity]);
  // }
  // };

  // tried:gopis
  const handleOnChange = (event) => {
    debugger;
    const { checked } = event.target;
    const data = JSON.parse(event.target.value);
    // console.log(`${value} is ${checked}`);
    if (checked) {
      preliminarySalary.find((x) => x.id == data.id).isChecked = true;
      // let entity = {
      //   staffID: data.staffID,
      //   endDateformated: data.endDateFormated,
      // };
      setCheckedState([...checkedState, data]);
    } else {
      preliminarySalary.find((x) => x.id == data.id).isChecked = false;
      const index = checkedState.indexOf(event.target.value);
      if (index !== -1) {
        setCheckedState(checkedState.splice(index, 1));
      }
    }
    // setIsChecked(event.target.checked);
    console.log("checked", event.target.value);
  };

  console.log(checkedState);


  const handleDelete = async () => {
    const deletedIDS = await deleteSalary(checkedState);
    console.log(deletedIDS);
    // checkedState[index].isCompleted = true;
    Swal.fire({
      icon: "success",
      title: "Hurray..",
      text: "Data Deleted Successfully...!",
    });
    getData();
  };

  const deleteSalary = async (checkedState) => {
    try {
      debugger;
      // const index = checkedState.indexOf(event.target.value);
      // if (index !== -1) {
      //   checkedState[index].isCompleted = true;
      //   setCheckedState(checkedState);
      // }
      // const deleteddddsalary = await Promise.all(
      checkedState && checkedState.length > 0;
      let entity = {
        employeID: 202,
        payrolltype: 1,
        month: 3,
        endyear: 2023,
        endDateFormated: "2023-03-15",
        name: "madhav",
        id: 272548,
        staffID: 38274,
        componentName: "OT_ON_SPECIAL_HOL_GREATER_THAN_8_hrs",
        componentValue: 646.71,
        endDate: "2023-03-15T00:00:00",
        modified: "2023-04-08T13:29:34.57",
        modifiedBy: "Admin",
        hidden: false,
        ded_type: "Earning",
        newvalue: 0,
        department_name: null,
        modifiedDate: "2023-04-08T13:29:34.57",
        isChecked: 0,
      };
      // ? checkedState.map(async (data) => {
      const res = await apiService.commonPostCall(
        // `Payroll/DeletePreliminary?staffID=${data.staffID}&Enddate=${data.endDateformated}`
        `Payroll/DeletePreliminary`,entity
        // checkedState
      );
      const deletedData = res.data[0] || res.data;
      // console.log(res.data);
      // })
      // : []
      // );
      return deleteddddsalary;

      // This API is used to delete the dashboard data based on StaffID,EndDate
    } catch (error) {
      // console.error(error);
      Swal.fire({
        icon: "error",
        title: "Oops..",
        text: "Data Not Deleted...!",
      });
    }
  };

  // // TODO: DELETE FUNCTIONALITY SHOULD NOT HAPPEND
  // handleDelete(data.staffID, data.endDateFormated);
  const PER_PAGE = 5;
  const [currentPage, setCurrentPage] = useState(0);
  function handlePageClick({ selected: selectedPage }) {
    setCurrentPage(selectedPage);
  }
  const offset = currentPage * PER_PAGE;
  const pageCount = Math.ceil(preliminarySalary.length / PER_PAGE);


  const exportToExcel = () => {
    let element = document.getElementById("payrollDataID");
    if (element) {
      const ws = XLSX.utils.table_to_sheet(element);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

      XLSX.writeFile(wb, "payrollData.xlsx");

    };
  }
  return (
    <div className="container-fluid">
      <h3 className=" Heading">Finalization Payroll Details</h3>
      <br />
      <div className="card p-3 ">
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
              onChange={(e) => {
                setKeyword(e.target.value);
              }}
              className="form-control"
              placeholder="Search..."
            />
          </div>
          <div className="col-lg-2">
            <select id="Department" name="Department" className="form-select">
              <option value="" disabled="">
                Select Department
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





            <button type="button" className=" EditDelteBTN" onClick={exportToExcel}>
              Export To Excel
            </button>

          </div>
        </div>
      </div>
      <br />
      <div className="row">
        <div className="col-lg-8"></div>

        <div
          className="col-lg-2"
          style={{ marginLeft: "95px", color: "#3247d5" }}
        >
          Total Amount:
        </div>
      </div>
      <br />
      <br />
      <div className="row">
        <div className="col-lg-4"></div>
        <div className="col-lg-4">
          <p className="Heading">Employees in selected Period</p>
        </div>
        <div className="col-lg-2" style={{ marginLeft: "83px" }}>
          <button
            type="button"
            className="EditDelteBTN "
            onClick={() => handleDelete()}
          >
            Delete
          </button>
        </div>
      </div>
      <div className="row ">
        <div className="col-lg-4"> </div>
        <div className="col-lg-5"></div>

        <div className="col-lg-12">
          {/* <span>
            Select All
            <input
              type="checkbox"
              checked={selectedRows.length === preliminarySalary.length}
              onChange={(e) => handleRowSelect(e, "all")}
            />
          </span> */}
          <br />
          <table
            style={{ whiteSpace: "nowrap" }}
            className="table text-center "
            id="payrollDataID"
          >
            <thead>
              <tr className="text-white">
                <th>Select
                <input
              type="checkbox"
              checked={ischeckedstate}
              onChange={(e) => handleRowSelect(e, "all")}
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
                .filter(post => {
                  return Object.values(post).some(value =>
                    value !== null &&
                    value.toString().toLowerCase().includes(keyword.toLowerCase()
                    )
                  );
                })
                .slice(offset, offset + PER_PAGE)
                .map((data, index) => {
                  return (
                    <tr className="text-dark" key={index}>
                      <td>
                        <input
                          type="checkbox"
                          checked={data.isChecked}
                          value={JSON.stringify(data)}
                          // onChange={() =>
                          //   handleOnChange(data.staffID, data.endDateFormated)
                          // }
                          onChange={handleOnChange}
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
                <button
                  aria-label="Close"
                  type="button"
                  className={Styles.close}
                  onClick={closeModal}
                >
                  X
                </button>
              </div>
            </div>
            <hr></hr>
          </div>
          <div className="modalbody">
            <div className="row">
              <div className="col-lg-12">
                <table className="table  text-center ">
                  <thead>
                    <tr>
                      <th className="text-white">Component Name</th>
                      <th className="text-white">Amount </th>
                      <th className="text-white">Component Type</th>
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
      <br />
    </div>
  );
};
export default FinalPayrollDetails;
