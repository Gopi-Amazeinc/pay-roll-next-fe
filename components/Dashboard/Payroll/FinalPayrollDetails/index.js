import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import Swal from "sweetalert2";
import Link from "next/link";
import { DownloadTableExcel } from "react-export-table-to-excel";
import Styles from "../.././../../styles/finalpayrolldetails.module.css";
import { apiService } from "@/services/api.service";
import ReactPaginate from "react-paginate";
import { useRef } from 'react';




const FinalPayrollDetails = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [preliminarySalary, setPreliminarySalary] = useState([]);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [department, setDepartment] = useState([]);
  const [keyword, setKeyword] = useState("");

  const tableRef = useRef(null);

  const getData = async () => {
    // This API is used for fetch the Departmnent data for Dashboard and  Dropdown
    let res = await apiService.commonGetCall("Payroll/GetPreliminarySalary");
    setPreliminarySalary(res.data);
    // This API is used for fetch the Departmnent data for Dropdown
    res = await apiService.commonGetCall("Master/GetDepartmentMaster");
    setDepartment(res.data);
  };
  const [selectedRows, setSelectedRows] = useState([]);
  // const handleRowSelect = (event, id) => {
  //     if (id === 'all') {
  //         setSelectedRows(event.target.checked ? preliminarySalary.map(data => data.id) : []);
  //     } else {
  //         setSelectedRows(selectedRows.includes(id) ? selectedRows.filter(rowId => rowId !== id) : [...selectedRows, id]);
  //     }
  // };

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

  const handleDelete = async (staffID, endDateFormated) => {
    try {
      debugger;
      // This API is used to delete the dashboard data based on StaffID,EndDate
      const res = await apiService.commonGetCall(`Payroll/DeletePreliminary?staffID=${staffID}&Enddate=${endDateFormated}`);
      Swal.fire({
        icon: "success",
        title: "Hurray..",
        text: "Data was Deleted...!",
      });
      console.log(res.data);
      getData();
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Oops..",
        text: "Data was Not Deleted...!",
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
  return (
    <div className='container-fluid'>
      <h3 className=' Heading'>Finalization   Payroll Details</h3>
      <br />
      <div className='card p-3 '>
        <div className='row'>
          <div className='col-lg-1'>
            <p>Filter By</p>
          </div>
          <div className='col-lg-2'>
            <input type='date' className='form-control' />
          </div>
          <div className='col-lg-3'>
            <input type="text" onChange={e => { setKeyword(e.target.value) }} className='form-control' placeholder='Search...' />
          </div>
          <div className='col-lg-2'>
            <select id="Department" name="Department" className='form-select'>
              <option value="" disabled="">
                Select Department </option>
              {
                department.map((data, index) => {
                  return (
                    <option value={data.id} key={data.id}>{data.department_name}</option>
                  )
                })
              }
            </select>
          </div>
          <div className='col-lg-3'>
            <DownloadTableExcel
              filename="users table"
              sheet="users"
              currentTableRef={tableRef.current}
            >
              <button type="button" className=" EditDelteBTN">Export To Excel </button>
            </DownloadTableExcel>
          </div>
        </div>
      </div><br />
      <div className='row'>
        <div className='col-lg-10'></div>
        <div className='col-lg-2'>Total Amount:</div>
      </div>
      <br />
      <br />
      <div className='row'>
        <div className='col-lg-9'></div>
        <div className='col-lg-2'>

          <button type='button' className='EditDelteBTN fw-bold' onClick={() => handleDelete.bind(this)}>Delete</button>


        </div>
      </div>
      <div className='row '>
        <div className='col-lg-4'> </div>
        <div className='col-lg-5'>
          <h4 className='Heading' >Employees in selected Period</h4>
        </div>

        <div className='col-lg-12'>
          <span>Select All <input type="checkbox" checked={selectedRows.length === preliminarySalary.length} onChange={e => handleRowSelect(e, 'all')} /></span>
          <br />
          <table style={{ whiteSpace: "nowrap" }} className='table text-center ' ref={tableRef}>
            <thead>
              <tr className='text-white' >
                <th >Select</th>
                <th>Employee ID</th>
                <th >Staff ID</th>
                <th >Employee Name</th>
                <th >End Date </th>
                <th >Department</th>
                <th >Basic Monthly Salary</th>
                <th >Semi Monthly Salary</th>
                <th >Action</th>
              </tr>
            </thead>
            <tbody >
              {
                preliminarySalary.filter(data => {
                  if ((data.staffID.toString().includes(keyword)) || (data.componentValue.toString().includes(keyword))) {
                    return data;
                  }
                }).slice(offset, offset + PER_PAGE).map((data, index) => {
                  return (
                    <tr className="text-dark" key={index}>
                      <td>
                        <input type="checkbox" onChange={handleData.bind(this, data)} />
                      </td>
                      <td>{data.employeID}</td>
                      <td>{data.staffID}</td>
                      <td>{data.name}</td>
                      <td>{data.endDateFormated}</td>
                      <td>{data.department_name}</td>
                      <td>{data.baseSal}</td>
                      <td>{data.componentValue}</td>
                      <td>
                        <button className={Styles.actionButton} onClick={openModal}>View Component Details</button>
                      </td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
        </div>
        <Modal isOpen={modalIsOpen} style={customStyles}>
          <div className='modalheader'>
            <div className='row'>
              <div className="col-lg-6">
                <h6 style={{ fontWeight: '500' }}>Component Details</h6>
              </div>
              <div className='col-lg-4'></div>
              <div className='col-lg-2'>
                <button aria-label="Close" type="button" className={Styles.close} onClick={closeModal} >X</button>
              </div>
            </div>
            <hr></hr>
          </div>
          <div className='modalbody'>
            <div className="row">
              <div className='col-lg-12'>
                <table className='table  table-bordered mt-4 text-center table-striped ' >
                  <thead>
                    <tr >
                      <th className='text-white'>Component Name</th>
                      <th className='text-white'>Amount </th>
                      <th className='text-white'>Component Type</th>
                    </tr>
                  </thead>
                  <tbody >
                    {
                      preliminarySalary.map((data, index) => {
                        return (
                          <tr className="text-dark" key={index}>
                            <td>{data.componentName}</td>
                            <td>{data.componentValue}</td>
                            <td>{data.ded_type}</td>
                          </tr>
                        )
                      })
                    }
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
  )
}
export default FinalPayrollDetails;
