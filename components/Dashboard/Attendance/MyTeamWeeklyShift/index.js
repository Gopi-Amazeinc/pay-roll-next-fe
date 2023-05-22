import React from 'react';
import Link from 'next/link';
import { apiService } from "@/services/api.service";
import { useEffect, useState } from 'react'
import { Modal, ModalBody, ModalFooter } from "reactstrap";
import { useForm } from 'react-hook-form';

const Index = () => {

    // const [pending, setPending] = useState(true)
    // const [approved, setApproved] = useState(false)
    // const [rejected, setRejected] = useState(false)
    // const [cancelled, setCancelled] = useState(false)

    // const togglePending = () => {
    //     setApproved(false)
    //     setRejected(false)
    //     setPending(true)
    //     setCancelled(false)
    // }

    // const toggleApproved = () => {
    //     setApproved(true)
    //     setPending(false)
    //     setRejected(false)
    //     setCancelled(false)
    // }

    // const toggleRejected = () => {
    //     setRejected(true)
    //     setApproved(false)
    //     setPending(false)
    //     setCancelled(false)
    // }

    // const toggleCancelled = () => {
    //     setCancelled(true)
    //     setApproved(false)
    //     setPending(false)
    //     setRejected(false)
    // }

    const [weeklyShiftData, getWeeklyShiftData] = useState([])
    const [modalOpen, setModalOpen] = useState(false);
    const { register, handleSubmit, reset, watch, formState: { errors } } = useForm();

    const getData = async () => {
        const res = await apiService.commonGetCall("HR/GetStaffShiftDetails");
        console.log(res.data)
        getWeeklyShiftData(res.data)
    }

    const approve = async (id) => {
        const res = await apiService.commonPostCall("Payroll/ApproveStaffShiftDetails", id)
        getData();
    }

    const reject = async (id) => {
        setModalOpen(!modalOpen)
        onReject(id)
    }

    const onReject = async (id) => {
        debugger
        let Reason = watch("reason")
        const res = await apiService.commonPostCall("Payroll/RejectStaffShiftDetails", Reason, id)
    }

    useEffect(() => {
        getData();
    }, [])

    return (
        <div className='container-fluid'>
            <div className='row'>
                <div className='col-lg-12'>
                    <div className='row'>

                        <div className='col-lg-3'>
                            <br />
                            <Link href="/Attendance/ShiftDetails" className="Heading">  My Weekly Shift</Link>
                        </div>
                        <div className='col-lg-3'>
                            <br />
                            <Link href="/Attendance/MyTeamWeeklyShift" className="Heading"> My Team Weekly Shift</Link>
                        </div>
                    </div>
                    <br />

                    <div className='card border-0 p-3 rounded-3'>
                        <div className='row'>
                            <div className="col-lg-1">
                                <p>Filter By</p>
                            </div>
                            <div className='col-lg-2'>
                                <label >START DATE <span style={{ color: "red" }} >*</span></label>
                                <input type='date' className='form-control' />
                            </div>
                            <div className='col-lg-2'>
                                <label >END DATE <span style={{ color: "red" }} >*</span></label>
                                <input type='date' className='form-control' />
                            </div>
                            <div className="col-lg-2">
                                <br />
                                <input type="text" className='form-control' placeholder='Serach For Band' />
                                {/* <Link href="/Attendance/StaffShiftForm/new" ><button className='button'>Add Shift Details</button></Link> */}
                            </div>
                            <div className="col-lg-1"></div>
                            <div className="col-lg-2">
                                <br />
                                <button className='button' >Export To excel</button>
                            </div>
                        </div>
                    </div>
                    {/* <br />
                    <div className='row'>
                        <div className='btn-group'>
                            <button onClick={togglePending} className={`toggleButton ${pending ? "focus" : ""}`}>Pending</button>
                            <button onClick={toggleApproved} className={`toggleButton ${approved ? "focus" : ""}`}>Approved</button>
                            <button onClick={toggleRejected} className={`toggleButton ${rejected ? "focus" : ""}`}>Rejected</button>
                            <button onClick={toggleCancelled} className={`toggleButton ${cancelled ? "focus" : ""}`}>Cancelled</button>
                        </div>
                    </div> */}
                    <br />

                    <div className='row'>
                        <div className='col-lg-12'>
                            <table>
                                <thead>
                                    <tr>
                                        <th>EMPLOYEID</th>
                                        <th>EMPLOYEE NAME</th>
                                        <th>START DATE</th>
                                        <th>END DATE</th>
                                        <th>SHIFT NAME</th>
                                        <th>START TIME</th>
                                        <th>END TIME</th>
                                        <th>REST DAYS</th>
                                        <th>Status</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {
                                        weeklyShiftData.map((data) => {
                                            return (
                                                <tr key={data.id}>
                                                    <td>{data.staffID}</td>
                                                    <td>{data.employeeName}</td>
                                                    <td>{data.shiftdate}</td>
                                                    <td>{data.endDate}</td>
                                                    <td>{data.shiftName}</td>
                                                    <td>{data.startTime1}</td>
                                                    <td>{data.endTime1}</td>
                                                    <td>{data.restDays}</td>
                                                    <td>{data.status}</td>
                                                    <td>
                                                        <button onClick={approve.bind(this, data.id)} className='edit-btn'>Approve</button>
                                                        &nbsp;
                                                        <button onClick={reject.bind(this, data.id)} className='edit-btn'>Rejected</button>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className='row'>
                        <Modal isOpen={modalOpen} >
                            <div className='modal-header'>
                                <div className='modal-title'>
                                    <p className='Heading'>Rejecting Request</p>
                                </div>
                                <button
                                    aria-label="Close"
                                    type="button"
                                    onClick={() => setModalOpen(!modalOpen)}
                                ></button>
                            </div>
                            <form onSubmit={handleSubmit(reject)}>
                                <ModalBody>
                                    <div className='row'>
                                        <div className='col-lg-12'>
                                            <label>Reason *</label>
                                            <textarea placeholder='Reason'{...register("reason", { required: true })} className='form-control'></textarea>
                                            {errors.reason && (
                                                <p className="text-danger">
                                                    Please enter Valid Reason
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                </ModalBody>
                                <ModalFooter>
                                    <div className='row'>
                                        <div className='col-lg-6'>
                                            <button onClick={() => setModalOpen(!modalOpen)} className='edit-btn'>Cancel</button>
                                        </div>
                                        <div className='col-lg-5'>
                                            <button onClick={onReject} className='edit-btn'>Reject</button>
                                        </div>
                                    </div>
                                </ModalFooter>
                            </form>
                        </Modal>
                    </div>

                    {/* <div className='row'>
                        <div className='col-lg-12'>
                            {
                                pending && (
                                    <table>
                                        <thead>
                                            <tr>
                                                <th><input type='checkbox' className='form-check' /></th>
                                                <th>CONTROLL NUMBER	</th>
                                                <th>EMPLOYEID</th>
                                                <th>EMPLOYEE NAME</th>
                                                <th>START DATE</th>
                                                <th>END DATE</th>
                                                <th>SHIFT NAME</th>
                                                <th>START TIME</th>
                                                <th>END TIME</th>
                                                <th>REST DAYS</th>
                                                <th>Status</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                    </table>
                                )
                            }

                            {
                                approved && (
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>CONTROLL NUMBER	</th>
                                                <th>EMPLOYEID</th>
                                                <th>EMPLOYEE NAME</th>
                                                <th>START DATE</th>
                                                <th>END DATE</th>
                                                <th>SHIFT NAME</th>
                                                <th>START TIME</th>
                                                <th>END TIME</th>
                                                <th>REST DAYS</th>
                                                <th>Status</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                    </table>
                                )
                            }

                            {
                                rejected && (
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>CONTROLL NUMBER	</th>
                                                <th>EMPLOYEID</th>
                                                <th>EMPLOYEE NAME</th>
                                                <th>START DATE</th>
                                                <th>END DATE</th>
                                                <th>SHIFT NAME</th>
                                                <th>START TIME</th>
                                                <th>END TIME</th>
                                                <th>REST DAYS</th>
                                                <th>Status</th>
                                            </tr>
                                        </thead>
                                    </table>
                                )
                            }

                            {
                                cancelled && (
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>CONTROLL NUMBER	</th>
                                                <th>EMPLOYEID</th>
                                                <th>EMPLOYEE NAME</th>
                                                <th>START DATE</th>
                                                <th>END DATE</th>
                                                <th>SHIFT NAME</th>
                                                <th>START TIME</th>
                                                <th>END TIME</th>
                                                <th>REST DAYS</th>
                                                <th>Hr Cancel Comments</th>
                                                <th>Status</th>
                                            </tr>
                                        </thead>
                                    </table>
                                )
                            }
                        </div>
                    </div> */}
                </div>
            </div>
        </div>
    );
}

export default Index;
