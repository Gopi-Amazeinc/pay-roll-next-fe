import React from 'react'
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import axios from 'axios';
import Modal from 'react-modal';
import { apiService } from "@/services/api.service";



const BankAdviceList = () => {
    const [dashboard, setDashboardData] = useState([]);

    useEffect(() => {
        async function getEmployeeSalary() {

            // This API is used to Fetch the Employee salary  
            let res = await apiService.commonGetCall("Payroll/GetEmployeeSalary");
            setDashboardData(res.data);
        }
        getEmployeeSalary()
    }, []);

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
        <div className='container-fluid'>
            <br />
            <div className='row'>
                <div className='col-lg-2'>
                    <p className='Heading'>Normal Payroll</p>
                </div>
                <div className='col-lg-10'></div>
            </div>
            <br />
            <div className='row'>
                <div className='col-lg-3'></div>
                <div className='col-lg-6'>
                    <div className='row'>
                        <div className='card p-3'>
                            <div className='row '>
                                <div className='col-lg-4'></div>
                                <div className='col-lg-5'>
                                    <label className='Heading'>Bank Advice List</label>
                                </div>
                                <hr />
                            </div>
                            <div className='row'>
                                <div className='col-lg-2'></div>
                                <div className='col-lg-2 text-end'>
                                    <span>Year:</span>
                                </div>

                                <div className='col-lg-5'>
                                    <select className='form-select'>
                                        <option value="0" disabled>Select Year</option>
                                        <option>2023</option>
                                        <option>2022</option>
                                        <option>2021</option>
                                        <option>2020</option>
                                    </select>
                                </div>
                            </div>
                            <br />
                            <div className='row'>
                                <div className='col-lg-2'></div>
                                <div className='col-lg-2 text-end'>
                                    <span>Month:</span>
                                </div>

                                <div className='col-lg-5'>
                                    <select className='form-select'>
                                        <option value="0" disabled>Select Year</option>
                                        <option>2023</option>
                                        <option>2022</option>
                                        <option>2021</option>
                                        <option>2020</option>
                                    </select>
                                </div>
                            </div>
                            <br />
                            <div className='row'>
                                <div className='col-lg-2'></div>
                                <div className='col-lg-2 text-end'>
                                    <span>Pay Period:</span>
                                </div>

                                <div className='col-lg-5'>
                                    <select className='form-select'>
                                        <option value="0" disabled>Select Year</option>
                                        <option>2023</option>
                                        <option>2022</option>
                                        <option>2021</option>
                                        <option>2020</option>
                                    </select>
                                </div>
                            </div>
                            <br />
                            <div className='row'>
                                <div className='col-lg-2'></div>
                                <div className='col-lg-2'></div>
                                {/* <div className='col-lg-3'></div> */}

                                <div className='col-lg-5'>
                                    <button className='EditDelteBTN'>Generate</button>
                                </div>
                                <div className='col-lg-4'></div>
                            </div>
                            <br />

                        </div>
                    </div>

                </div>
                <div className='col-lg-3'></div>
            </div>

        </div >
    )
}

export default BankAdviceList