import React, { useEffect, useState, useRef } from 'react'
import Modal from 'react-modal';
import Swal from 'sweetalert2';
import axios from 'axios'
import ReactPaginate from "react-paginate";
import Link from 'next/link'
import { DownloadTableExcel } from 'react-export-table-to-excel';
import { IoIosClose } from 'react-icons/io'
import { apiService } from '@/services/api.service';

const InitialPayrollDetails = () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [preliminarySalary, setPreliminarySalary] = useState([]);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [department, setDepartment] = useState([]);
    const [selectedRows, setSelectedRows] = useState([]);
    const [checkedState, setCheckedState] = useState([]);
    const handleRowSelect = (event, id) => {
        debugger
        if (id === 'all') {
            setSelectedRows(event.target.checked ? preliminarySalary.map(data => data.id) : []);
        } else {
            setSelectedRows(selectedRows.includes(id) ? selectedRows.filter(rowId => rowId !== id) : [...selectedRows, id]);
        }
    };
    const [keyword, setKeyword] = useState("");
    const tableRef = useRef(null);


    const getData = async () => {
        // let hostURL = process.env.NEXT_PUBLIC_API_HOST_URL;
        // This API is used for fetch the Departmnent data for Dashboard and  Dropdown
        let res = await apiService.commonGetCall("Payroll/GetPreliminarySalary");
        setPreliminarySalary(res.data);
        // This API is used for fetch the Departmnent data for Dropdown
        res = await apiService.commonGetCall("Master/GetDepartmentMaster");
        setDepartment(res.data);
    }

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
        getData();
    }, []);
    const handleData = (data) => {
        // let res = preliminarySalary.filter(data.staffID);
        // res = preliminarySalary.filter(data.endDate);
        // console.log(Object.values(res.data));
        handleDelete(data.staffID, data.endDateFormated);
    }
    const PER_PAGE = 5;
    const [currentPage, setCurrentPage] = useState(0);
    function handlePageClick({ selected: selectedPage }) {
        setCurrentPage(selectedPage);
    }
    const offset = currentPage * PER_PAGE;
    const pageCount = Math.ceil(preliminarySalary.length / PER_PAGE);
    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            width: '60%'
        }
    };

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [modalIsOpen, setIsOpen] = useState(false);

    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }

    const handleOnChange = (event) => {
        debugger;
        const { checked } = event.target;
        const data = JSON.parse(event.target.value);
        // console.log(`${value} is ${checked}`);
        if (checked) {
            preliminarySalary.find((x) => x.id == data.id).isChecked = true;
            let entity = {
                staffID: data.staffID,
                endDateformated: data.endDateFormated,
            };
            setCheckedState([...checkedState, entity]);
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

    // const handleDelete = async (staffID, endDateFormated) => {
    //     try {
    //         debugger;
    //         let hostURL = process.env.NEXT_PUBLIC_API_HOST_URL;
    //         // This API is used to delete the dashboard data based on StaffID,EndDate
    //         const res = await apiService.commonGetCall(`Payroll/DeletePreliminary?staffID=${staffID}&Enddate=${endDateFormated}`);
    //         Swal.fire({
    //             icon: "success",
    //             title: "Hurray..",
    //             text: "Data was Deleted...!",
    //         });
    //         console.log(res.data);
    //         getData();
    //     } catch (error) {
    //         console.error(error);
    //         Swal.fire({
    //             icon: "error",
    //             title: "Oops..",
    //             text: "Data was Not Deleted...!",
    //         });
    //     }
    // };

    const deleteSalary = async (checkedState) => {
        try {
            debugger;
            // const index = checkedState.indexOf(event.target.value);
            // if (index !== -1) {
            //   checkedState[index].isCompleted = true;
            //   setCheckedState(checkedState);
            // }
            const deleteddddsalary = await Promise.all(
                checkedState && checkedState.length > 0
                    ? checkedState.map(async (data) => {
                        const res = await apiService.commonGetCall(
                            `Payroll/DeletePreliminary?staffID=${data.staffID}&Enddate=${data.endDateformated}`
                        );
                        const deletedData = res.data[0] || res.data;
                        // console.log(res.data);
                    })
                    : []
            );
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
    return (
        <div className='container-fluid'>

            <p className=' Heading'>Initial Payroll Details</p>
            <br />
            <div className='card p-4 '>
                <div className='row'>
                    <div className='col-lg-1'>
                        <p>Filter By</p>
                    </div>
                    <div className='col-lg-2'>
                        <input type='date' className='form-control' />
                    </div>
                    <div className='col-lg-3'>
                        <input type="text" className='form-control' placeholder='Search...' onChange={e => { setKeyword(e.target.value) }} />
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
                            <button type="button" className="EditDelteBTN ">Export To Excel </button>
                        </DownloadTableExcel>
                    </div>
                </div>
            </div><br /><br />
            <div className='row '>
                <div className='col-lg-4'> </div>
                <div className='col-lg-5'>
                    <p className='Heading' >Employees in selected Period</p>
                </div>
                <div className='col-lg-2'>
                    <button type='button' className='EditDelteBTN' onClick={() => handleDelete()}>Delete</button>
                </div>
            </div>
            <div className='row'>
                <div className='col-lg-12'>
                    <span>Select All <input type="checkbox" checked={selectedRows.length === preliminarySalary.length} onChange={e => handleRowSelect(e, 'all')} /></span>
                    <br />
                    <table className='table' ref={tableRef}>
                        <thead>
                            <tr className='text-white' style={{ whiteSpace: 'nowrap' }}>
                                <th>Select</th>
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
                        <tbody >
                            {
                                preliminarySalary.filter((data) => {
                                    if ((data.staffID.toString().includes(keyword)) || (data.componentValue.toString().includes(keyword.toString()))) {
                                        return data;
                                    }
                                }).slice(offset, offset + PER_PAGE).map((data, index) => {
                                    return (
                                        <tr className="text-dark" key={index}>
                                            <td>
                                                <input type="checkbox" checked={data.isChecked}
                                                    value={JSON.stringify(data)} onChange={handleOnChange} />
                                            </td>
                                            <td>{data.employeID}</td>
                                            <td>{data.staffID}</td>
                                            <td>{data.name}</td>
                                            <td>{data.endDateFormated}</td>
                                            <td>{data.department_name}</td>
                                            <td>{data.baseSal}</td>
                                            <td>{data.componentValue}</td>
                                            <td>
                                                <button className='submit-button fw-bold ' onClick={openModal}>View Component Details</button>
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
                                <button className='btn btn-primary' onClick={closeModal}><IoIosClose /></button>
                            </div>
                        </div>
                        <hr></hr>
                    </div>
                    <div className='modalbody'>
                        <div className="row">
                            <div className='col-lg-12'>
                                <table className='table  table-bordered mt-4 text-center  ' >
                                    <thead>
                                        <tr className='text-white' >
                                            <th>Component Name</th>
                                            <th>Amount </th>
                                            <th>Component Type</th>
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
        </div >

    )
}

export default InitialPayrollDetails