import React from 'react'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { BsCheckCircleFill } from 'react-icons/bs'
import { RxCrossCircled } from 'react-icons/rx'
import Swal from 'sweetalert2';
import loan from "../../../../pages/Requests/Applyloans/applyloans.module.css"

const Index = () => {
  const hostURL = process.env.NEXT_PUBLIC_API_HOST_URL;
  const [pending, setPending] = useState(false)
  const [approved, setApproved] = useState(false)
  const [rejected, setRejected] = useState(false);
  const [newDashboard, setNewDashboardData] = useState([]);
  const [newApproved, setnewApprovedData] = useState([]);
  const togglePending = () => {
    setPending(true)
    setApproved(false)
    setRejected(false)

  }

  const toggleApproved = () => {
    setApproved(true)
    setPending(false)
    setRejected(false)

  }
  const toggleRejected = () => {
    setRejected(true)
    setApproved(false)
    setPending(false)

  }


  return (
    <div>
      <div className='card p-3 border-0 shadow-lg rounded-3 mt-4'>
        <div className='row'>
          <div className='col-lg-1'>
            <p>Filter By</p>
          </div>
          <div className='col-lg-3'>
            <p>From Date</p>
            <input type="date" className='form-control' />
          </div>
          <div className='col-lg-3'>
            <p>To Date</p>
            <input type="date" className='form-control' />
          </div>
          <div className='col-lg-4'><br /><p></p>
            <input type="text" className='form-control' placeholder="Search For Start Date,Status" />
          </div>
          <br />
        </div>
      </div>
      <div className="row mt-3">
        <div className="col-lg-9"></div>
        <div className="col-lg-3">
          <Link href="/Requests/Timesheet/new">
            <button className={loan.addButton}>ADD NEW</button>
          </Link>
        </div>
      </div>
      <div className="row mt-2">
        <div className="col-lg-12 dashbutton bttn">
          <div className='col-lg-4 mx-2'><br />
            <div className='btn-group'>
              <button onClick={togglePending} className={loan.tabBtn}>Pending</button>
              <button onClick={toggleApproved} className={loan.tabBtn}>Approved</button>
              <button onClick={toggleRejected} className={loan.tabBtn}>Rejected</button>
            </div>
          </div>
          <div className='row mt-2'>
            <div className='col-lg-2 text-primary fs-6 fw-bold'>
              <h6>Showing Results</h6>
            </div>
          </div><br />
        </div>
      </div>
      {
        pending && (
          <table className='table table-hover'>
            <thead className='bg-info text-white'>
              <tr>
                <th>Date</th>
                <th>Start Time</th>
                <th>End Time</th>
                <th>No of Hours</th>
                <th>Task</th>
                <th>Attachment</th>
                <th>Comments</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {
                newDashboard.map((data) => {
                  return (
                    <tr key={data.id}>
                      <td>{data.date}</td>
                      <td>{data.actuval_StartTime}</td>
                      <td>{data.actuval_EndTime}</td>
                      <td>{data.comments}</td>
                      <td>{data.status}</td>
                      <td>
                        <button onClick={Delete.bind(this, data.id)} className='edit-btn'>Cancel</button>
                      </td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
        )
      }
      {
        approved && (
          <table className='table table-hover'>
            <thead className='bg-info text-white'>
              <tr>
                <th>Date</th>
                <th>Start Time</th>
                <th>End Time</th>
                <th>No of Hours</th>
                <th>Task</th>
                <th>Attachment</th>
                <th>Comments</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {
                newApproved.map((data) => {
                  return (
                    <tr key={data.id}>
                      <td>{data.date}</td>
                      <td>{data.actuval_StartTime}</td>
                      <td>{data.actuval_EndTime}</td>

                    </tr>
                  )
                })
              }
            </tbody>
          </table>
        )
      }
      {
        rejected && (
          <table className='table table-hover'>
            <thead className='bg-info text-white'>
              <tr>
                <th>Date</th>
                <th>Start Time</th>
                <th>End Time</th>
                <th>No of Hours</th>
                <th>Task</th>
                <th>Attachment</th>
                <th>Comments</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {
                newApproved.map((data) => {
                  return (
                    <tr key={data.id}>
                      <td>{data.date}</td>
                      <td>{data.actuval_StartTime}</td>
                      <td>{data.actuval_EndTime}</td>

                    </tr>
                  )
                })
              }
            </tbody>
          </table>
        )
      }
    </div>
  )
}

export default Index