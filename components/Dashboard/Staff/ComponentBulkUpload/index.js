import React from "react";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import ReactPaginate from "react-paginate";
import { DownloadTableExcel } from "react-export-table-to-excel";
import { useRef } from "react";
import Modal from "react-modal";
import * as XLSX from "xlsx";
import Styles from "../../../../styles/ComponentBulkUpload.module.css";

const Index = () => {
  const [bulkUpload, setBulkUploadData] = useState([]);
  const [component, setComponentData] = useState([]);
  const tableRef = useRef(null);
  const [items, setItems] = useState([]);
  const [count, setcount] = useState("");
  const [keyword, setKeyword] = useState("");
  const hostURL = process.env.NEXT_PUBLIC_API_HOST_URL;

  useEffect(() => {
    getbulkUploadData();
    getData();
  }, []);
  const getbulkUploadData = async () => {
    let res = await axios.get(hostURL + "HR/GetPayrollComponentBulkUpload");
    setBulkUploadData(res.data);
    setcount(res.data.length);
  };
  const getData = async () => {
    let res = await axios.get(hostURL + "Payroll/GetComponentMapping");
    setComponentData(res.data);
  };
  const handleDelete = async (id) => {
    try {
      let res = await axios.get(
        hostURL + `HR/DeletePayrollComponentBulkUpload?id=${id}`
      );
      console.log(res.data);
      Swal.fire("Data deleted successfully");
      getbulkUploadData();
    } catch (error) {
      console.error(error);
      Swal.fire("Failed to delete data");
    }
  };
  const enableDisableStaff = async (data) => {
    debugger;
    let entity = {
      ID: data.employeID,
      Enable: 1,
    };
    await axios.post(
      hostURL + "Master/UpdatePayrollComponentBulkUploadEnableDisable",
      entity
    );
    if (entity.AttendanceEnable == true) {
      Swal.fire("Payroll enabled");
    } else {
      Swal.fire("Payroll disabled");
    }
    getData();
  };

  const PER_PAGE = 5; //pagination
  const [currentPage, setCurrentPage] = useState(0);
  function handlePageClick({ selected: selectedPage }) {
    setCurrentPage(selectedPage);
  }
  const offset = currentPage * PER_PAGE;
  const pageCount = Math.ceil(bulkUpload.length / PER_PAGE);

  const [modalOpen, setModalOpen] = useState(false); //modal
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

  const uploadBulkComp = async () => {
    const transformedData = await transformedBulkComp(items);
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
    getbulkUploadData();
  };

  const transformedBulkComp = async (items) => {
    console.log(items);
    debugger;
    const loans = await Promise.all(
      items && items.length > 0
        ? items.map(async (bulk) => {
            const res = await apiService.commonGetCall(
              "Payroll/GetStaffByEmployeeID?EmployeID=" + bulk.EmployeeID
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
  return (
    <div className="container">
      <h5 className="Heading">Upload Payroll Component</h5>
      <div className="card p-4 border-0 rounded-3 mt-4">
        <div className="row">
          <div className="col-lg-1">
            <p>Filter By:</p>
          </div>
          <div className="col-lg-2">
            <input
              type="text"
              placeholder="Search"
              className="form-control"
              onChange={(e) => setKeyword(e.target.value)}
            />
          </div>
          <div className="col-lg-2">
            <select className="form-select">
              <option value="">Select Component</option>
              {component.map((data) => {
                return (
                  <option value={data.id} key={data.id}>
                    {data.componentName}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="col-lg-2">
            {count > 0 ? (
              <>
                <DownloadTableExcel
                  filename="users table"
                  sheet="users"
                  currentTableRef={tableRef.current}
                >
                  <button className="AddButton">Export to Excel</button>
                </DownloadTableExcel>
              </>
            ) : null}
          </div>
          <div className="col-lg-2">
            <button className="AddButton" onClick={openEditModal}>
              Upload
            </button>
          </div>
          <div className="col-lg-2">
            <Link href="/Staff/ComponentBulkUpload/new">
              <button className="AddButton">Add New</button>
            </Link>
          </div>
        </div>
      </div>
      <br></br>
      <div className="table-responsive">
        <table className="table" ref={tableRef}>
          <thead>
            <tr className="bg-info text-white ">
              <th>Employee ID</th>
              <th>Name</th>
              <th>Component Code</th>
              <th>Amount</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {bulkUpload
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
                    <td>{data.id}</td>
                    <td>{data.name}</td>
                    <td>{data.payCode}</td>
                    <td>{data.amount}</td>
                    <td>
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
                      <Link href={`/Staff/ComponentBulkUpload/Edit/${data.id}`}>
                        <button className="editDeleteBtnTable mx-2">
                          Edit
                        </button>
                      </Link>
                      <button
                        className="editDeleteBtnTable mx-2"
                        onClick={() => handleDelete(data.id)}
                      >
                        Delete
                      </button>
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
              Upload component in bulk
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
                <span style={{ color: "navy", textDecoration: "underline" }}>
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
                  onClick={() => uploadBulkComp()}
                  color="primary"
                  type="button"
                >
                  UPLOAD
                </button>
              </div>
              <div className="col-lg-6"></div>
            </div>
            <div className="col-lg-6"></div>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default Index;
