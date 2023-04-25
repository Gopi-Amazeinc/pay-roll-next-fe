import React from 'react'
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import axios from 'axios';
import Modal from 'react-modal';


const BankAdviceList = () => {
    const [dashboard, setDashboardData] = useState([]);

    useEffect(() => {
        async function getData() {
            let hostURL = process.env.NEXT_PUBLIC_API_HOST_URL;
            // This API is used to Fetch the Employee salary  
            let res = await axios.get(hostURL + "Payroll/GetEmployeeSalary");
            setDashboardData(res.data);
        }
        getData()
    }, [1]);

    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            width: '60%'
        }
    };

    const [modalIsOpen, setIsOpen] = useState(false);

    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }
    return (
        <div>
            <div className="container-fluid mt-2">
                <div className="row shadow-lg p-2 rounded-4 p-3">
                    <h3 style={{ color: "red" }}>In this component API wants to be bind..!</h3>
                    <label >Normal Payroll - Bank Advice List</label>
                    <hr></hr>
                    <div className="row">
                        <div className="col-lg-2">
                            <label>Year :</label>
                        </div>
                        <div className="col-lg-3">
                            <select class="form-select" aria-label="Default select example">
                                <option selected>Select Year</option>
                                <option value="2020">2020</option>
                                <option value="2021">2021</option>
                                <option value="2022">2022</option>
                                <option value="2023">2023</option>
                            </select>
                        </div>
                    </div>
                    <br></br>
                    <br></br>
                    <br></br>
                    <div className="row">
                        <div className="col-lg-2">
                            <label>Month :</label>
                        </div>
                        <div className="col-lg-3">
                            <select class="form-select" aria-label="Default select example">
                                <option selected>Select Month</option>
                                <option>January</option>
                                <option>February</option>
                                <option>March</option>
                                <option>April </option>
                                <option>May</option>
                                <option>June</option>
                                <option>July</option>
                                <option>August</option>
                                <option>September</option>
                                <option>October</option>
                                <option>November</option>
                                <option>December</option>
                            </select>
                        </div>
                    </div>
                    <br></br>
                    <br></br>
                    <br></br>
                    <div className="row">
                        <div className="col-lg-2">
                            <label>Pay Period :</label>
                        </div>
                        <div className="col-lg-3">
                            <select class="form-select" aria-label="Default select example">
                                <option selected>Select Pay Period</option>
                                <option>1</option>
                                <option>2</option>
                            </select>
                        </div>
                    </div>
                    <br></br>
                    <br></br>
                    <br></br>
                    <div className="row">
                        <div className="col-lg-4"></div>
                        <div className="col-lg-4">
                            <button className="btn" onClick={openModal}>Generate </button>
                        </div>
                        <div className="col-lg-4"></div>
                    </div>
                </div>
                <Modal isOpen={modalIsOpen} style={customStyles}>
                    <div className="row">
                        <div className="col-lg-6">
                            <h6 style={{ color: '#3247d5', fontWeight: '500' }}> Bank Advice List</h6>
                        </div>
                        {/* <hr></hr> */}
                    </div>
                    <div className='row '>
                        <div className='col-lg-12'>
                            <table className='table table-bordered mt-4 text-center table-striped '>
                                <thead>
                                    <tr>
                                        {/* <th>Gross Salary</th>
                    <th>Address</th>
                    <th>Staff Name</th> */}
                                        <th>
                                            <td>
                                                companycode
                                            </td>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody >
                                    {
                                        dashboard.map((bank, index) => {
                                            return (
                                                <tr className="text-dark" key={index}>
                                                    <td>D{{ bank, companyCode }}{{ bank, payrollCutOFFDATE }}0{{ bank, batchfilenumber }}3{{ bank, bankAccountNumber }}{{ bank, bankfilenetpay }}{{ bank, hashNumber }}</td>
                                                </tr>
                                            )
                                        })
                                    }
                                    <tr>
                                        <td>

                                        </td>

                                    </tr>
                                </tbody>
                            </table>
                            <div className="row" style={{ textAlign: "center" }}>
                                <div className="col-lg-12">
                                    <button type='button' className="btn" onClick={closeModal}>Close</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal>
            </div>
        </div>
    )
}

export default BankAdviceList