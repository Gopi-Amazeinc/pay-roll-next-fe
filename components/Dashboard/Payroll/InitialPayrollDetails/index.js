import React, { useEffect, useState } from 'react'
import Modal from 'react-modal';
import Swal from 'sweetalert2';
import axios from 'axios'
import Link from 'next/link'
import { DownloadTableExcel } from 'react-export-table-to-excel';


const InitialPayrollDetails = () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [preliminarySalary, setPreliminarySalary] = useState([]);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [department, setDepartment] = useState([]);
    const [selectedRows, setSelectedRows] = useState([]);
    const handleRowSelect = (event, id) => {
        if (id === 'all') {
            setSelectedRows(event.target.checked ? preliminarySalary.map(data => data.id) : []);
        } else {
            setSelectedRows(selectedRows.includes(id) ? selectedRows.filter(rowId => rowId !== id) : [...selectedRows, id]);
        }
    };

    const getData = async () => {
        let hostURL = process.env.NEXT_PUBLIC_API_HOST_URL;
        // This API is used for fetch the Departmnent data for Dashboard and  Dropdown
        let res = await axios.get(hostURL + "Payroll/GetPreliminarySalary");
        setPreliminarySalary(res.data);
        // This API is used for fetch the Departmnent data for Dropdown
        res = await axios.get(hostURL + "Master/GetDepartmentMaster");
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

    const handleDelete = async (staffID, endDateFormated) => {
        try {
            debugger;
            let hostURL = process.env.NEXT_PUBLIC_API_HOST_URL;
            // This API is used to delete the dashboard data based on StaffID,EndDate
            const res = await axios.get(hostURL + `Payroll/DeletePreliminary?staffID=${staffID}&Enddate=${endDateFormated}`);
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
    return (
        <div>
            <h3 style={{ color: "red" }}>For Delete operation Date wants to be formatted..!</h3>
            <h3 className='text-primary fs-5 mt-3 Heading'>Initial Payroll Details</h3>
            <div className='card p-3 border-0 shadow-lg rounded-3 mt-4'>
                <div className='row'>
                    <div className='col-lg-1'>
                        <p>Filter By</p>
                    </div>
                    <div className='col-lg-2'>
                        <input type='date' className='form-control' />
                    </div>
                    <div className='col-lg-3'>
                        <input type="text" className='form-control' placeholder='Search...' />
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
                        // currentTableRef={tableRef.current}
                        >
                            <button type="button" className="form-control CancelBTN">Export To Excel </button>
                        </DownloadTableExcel>
                    </div>
                </div>
            </div><br /><br />
            <div className='row '>
                <div className='col-lg-4'> </div>
                <div className='col-lg-5'>
                    <h4 className='Heading' >Employees in selected Period</h4>
                </div>
                <div className='col-lg-3'>
                    <button type='button' className='EditDelteBTN' onClick={() => handleDelete.bind(this)}>Delete</button>
                </div>

                <div className='col-lg-12'>
                    <span>Select All <input type="checkbox" checked={selectedRows.length === preliminarySalary.length} onChange={e => handleRowSelect(e, 'all')} /></span>
                    <table style={{ width: "80%" }} className='table  mt-4 text-cente table-smr table-striped  text-center'>
                        <thead>
                            <tr className='tr' style={{ whiteSpace: 'nowrap' }}>
                                <th className='text-white'>Select</th>
                                <th className='text-white'>Employee ID</th>
                                <th className='text-white'>Staff ID</th>
                                <th className='text-white'>Employee Name</th>
                                <th className='text-white'>End Date </th>
                                <th className='text-white'>Department</th>
                                <th className='text-white'>Basic Monthly Salary</th>
                                <th className='text-white'>Semi Monthly Salary</th>
                                <th className='text-white'>Action</th>
                            </tr>
                        </thead>
                        <tbody >
                            {
                                preliminarySalary.map((data, index) => {
                                    return (
                                        <tr className="text-dark" key={index}>
                                            <td>
                                                <input type="checkbox" checked={selectedRows.includes(data.id)} onChange={e => handleRowSelect(e, data.id)} />
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
                                <button className='btn btn-primary' onClick={closeModal}>Close</button>
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

        </div>

    )
}

export default InitialPayrollDetails