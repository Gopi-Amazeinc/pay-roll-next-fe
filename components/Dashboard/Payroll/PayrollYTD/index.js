import React, { useState, useEffect } from 'react'
import Modal from 'react-modal';
import { AiOutlineClose } from 'react-icons/ai'
import * as XLSX from "xlsx";
import axios from 'axios';
import Swal from 'sweetalert2';
import Styles from '../../../../styles/payrollytd.module.css'
import { useRouter } from "next/router";


const Employmentjobhistory = () => {
    const [items, setItems] = useState([]);
    const [ModalIsOpen, setModalIsOpen] = useState(false);
    const [PayrollYTD, setPayrollYTD] = useState(false);
    const [dashboard, setDashboard] = useState([])
    const [YTDlist, setYTDlist] = useState([])
    const [PayrollHistory, setPayrollHistory] = useState(false)
    const [keyword, setKeyword] = useState("");

    const router = useRouter();



    const handleModalOpen = () => {
        setModalIsOpen(true);
    };


    const handlePayrollYTD = (data) => {
        const payrollytdlist = dashboard.filter(x => x.id === data.id);
        setYTDlist(payrollytdlist);
        setPayrollYTD(true)
    }
    const payrollHistory = (data) => {
        setPayrollHistory(true)
        // const payrollytdlist = dashboard.filter(x => x.id === data.id);
        // setYTDlist(payrollytdlist);
        // setPayrollYTD(true)
    }

    let hostURL = process.env.NEXT_PUBLIC_API_HOST_URL;

    const customStyles = {
        content: {
            top: '25%',
            left: '50%',
            right: '70%',
            bottom: '38%',
            marginRight: '-40%',
            transform: 'translate(-50%, -50%)',
        },
    };

    const payrollYTDStyle = {
        content: {
            top: '15%',
            left: '20%',
            right: '10%',
            bottom: '65%',
            // marginRight: '-40%',
            // transform: 'translate(-50%, -50%)',
        },
    };

    const addPayrollYTD = async () => {

        if (items == "") {
            Swal.fire({
                icon: "danger",
                titleText: "Invalid file",
                text: "Please Select Valid File"
            })
        }
        else {
            await axios.post(hostURL + "Payroll/InsertPayrollYTD", items)
            Swal.fire({
                icon: "success",
                text: "Uploaded Successfully"
            })
            router.push("/Payroll/PayrollYTD")
        }
    }

    const payrollHistorymodal = async () => {

        if (items == "") {
            Swal.fire({
                icon: "danger",
                titleText: "Invalid file",
                text: "Please Select Valid File"
            })
        }
        else {
            await axios.post(hostURL + "Payroll/InsertPayrollYTD", items)
            Swal.fire({
                icon: "success",
                text: "Uploaded Successfully"
            })
            router.push("/Payroll/PayrollYTD")
        }
    }

    const readExcel = async (file) => {
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

    const getPayroll = async () => {
        const res = await axios.get(hostURL + "Payroll/GetPayrollYTD")
        console.log(res.data)
        setDashboard(res.data)
    }

    useEffect(() => {
        getPayroll();
    }, [])
    return (
        <div className='container-fluid'>
            <p className='Heading '>Payroll YTD Upload</p>
            <br />
            <div className='card p-4'>
                <div className='row '>
                    <div className='col-lg-1 '>
                        <p>Filter By</p>
                    </div>
                    <div className='col-lg-4'>
                        <input type='text' className='form-control' placeholder='Search for Staff ,Date of Joining or Role' onChange={e => { setKeyword(e.target.value) }} />
                    </div>
                </div>
            </div>
            <br />
            <div className='row  '>
                <div className='col-lg-3'>
                    <p className='text-primary fw-bold'>Showing {dashboard.length} Results</p>
                </div>
                <div className='col-lg-4'></div>
                <div className='col-lg-2'>
                    <button type='submit' onClick={handleModalOpen} className={Styles.button} >Payroll YTD</button>
                </div>
                <div className='col-lg-2' >
                    <button type='submit' onClick={payrollHistory} className={Styles.button}>Payroll History</button>
                </div>
                <div className='col-lg-1'></div>
            </div>


            {/* <div className='col-lg-5'></div> */}

            <Modal isOpen={ModalIsOpen} style={customStyles}>
                <div className='container'>
                    <div className='row card-header'>
                        <div className='col-lg-8 mt-3'>
                            <h4>Upload Payroll YTD</h4>
                        </div>
                        <div className='col-lg-3'></div>
                        <div className='col-lg-1 mt-3 mb-3'>
                            <button onClick={() => setModalIsOpen(false)} className='btn-primary'><AiOutlineClose /></button>
                        </div>
                    </div>
                    <hr />
                    <div className='row mt-3'>
                        <div className='col-lg-6'>
                            <input
                                className='form-control'
                                type="file"
                                accept=".xlsx"
                                onChange={(e) => {
                                    const file = e.target.files[0];
                                    readExcel(file);
                                }}
                            />
                        </div>
                    </div>
                    <div className='col-lg-4 mb-3'>
                        <button type='submit' onClick={addPayrollYTD} className='submit-button  mt-4'>Upload Payroll YTD</button>
                    </div>
                </div>
            </Modal>

            <Modal isOpen={PayrollHistory} style={customStyles}>
                <div className='container'>
                    <div className='row card-header'>
                        <div className='col-lg-8 mt-3'>
                            <h5>Upload Payroll History</h5>

                        </div>
                        <div className='col-lg-3'></div>
                        <div className='col-lg-1 mt-3 mb-3'>
                            <button onClick={() => setPayrollHistory(false)} className='btn-primary'><AiOutlineClose /></button>
                        </div>
                    </div>
                    <hr />
                    <div className='row mt-3'>
                        <div className='col-lg-6'>
                            <input
                                className='form-control'
                                type="file"
                                accept=".xlsx"
                                onChange={(e) => {
                                    const file = e.target.files[0];
                                    readExcel(file);
                                }}
                            />
                        </div>
                    </div>
                    <div className='col-lg-4 mb-3'>
                        <button type='submit' onClick={payrollHistorymodal} className='submit-button  mt-4'>Upload Payroll History</button>
                    </div>
                </div>
            </Modal>


            <Modal isOpen={PayrollYTD} style={payrollYTDStyle} onRequestClose={() => setPayrollYTD(false)}>

                <div className='container' >
                    <div className='row'>
                        <table className='table text-center'>
                            <thead className='bg-info text-white'>
                                <tr>
                                    <th>Employee ID</th>
                                    <th>Employee Name</th>
                                    <th>Net Taxable YTD</th>
                                    <th>Taxable YTD</th>
                                    <th>Taxable Bonus YTD</th>
                                    <th>Non Taxable Bonus YTD</th>
                                </tr>
                            </thead>

                            <tbody>
                                {
                                    YTDlist.filter(data => {
                                        if ((data.nettaxableYTD.toString().includes(keyword.toString())) || (data.firstAndLastName.toLowercase().includes(keyword.toLowercase()))) {
                                            return data;
                                        }
                                    }).map((YTD) => {
                                        return (
                                            <tr key={YTD.id}>
                                                <td>{YTD.employeID}</td>
                                                <td>{YTD.firstAndLastName}</td>
                                                <td>{YTD.nettaxableYTD}</td>
                                                <td>{YTD.taxYTD}</td>
                                                <td>{YTD.taxableBonusYTD}</td>
                                                <td>{YTD.nonTaxableBonusYTD}</td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>

            </Modal>

            <br />

            <div className='row'>
                <div className='col-lg-12'>
                    <table className='table text-center'>
                        <thead >
                            <tr>
                                <th>Employee ID</th>
                                <th>Employee Name</th>
                                <th>Department</th>
                                <th>Position</th>
                                <th>Email</th>
                                <th>Date Of Joining</th>
                                <th>Manager</th>
                                <th colSpan={2} className='text-center'>Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                dashboard.map((data) => {
                                    return (
                                        <tr key={data.id}>
                                            <td>{data.employeID}</td>
                                            <td>{data.name}</td>
                                            <td>{data.department}</td>
                                            <td></td>
                                            <td>{data.emailID}</td>
                                            <td>{data.joiningDate}</td>
                                            <td></td>
                                            <td>
                                                <button onClick={handlePayrollYTD.bind(this, data)} className={Styles.upload}>Payroll History</button>
                                                &nbsp; &nbsp;
                                                <button onClick={handlePayrollYTD.bind(this, data)} className={Styles.upload}>Payroll YTD</button>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div >
    )
}

export default Employmentjobhistory