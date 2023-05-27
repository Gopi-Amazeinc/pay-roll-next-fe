import React from 'react'
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Swal from 'sweetalert2';
import { apiService } from "@/services/api.service";
import Layout from "@/components/layout/layout.js";
import axios from 'axios';

function LeaveDashboard() {

  const [leave, setLeave] = useState([]);


  const getLeaveById = async () => {
    let res = await apiService.commonGetCall("Payroll/GetLeaveConfiguration"); //This Api is useed for Get the Dashborad data band Master
    setLeave(res.data);
  }

  useEffect(() => {
    getLeaveById()
  }, [1])

  // const getData = (data) => {
  //   sessionStorage.setItem("id", data.id);
  // }

  // const clearData = () => {
  //   sessionStorage.setItem("id", "");

  // }


  const getData = (data) => {
    sessionStorage.setItem("id", data.id);
}


  const handleDelete = async (id) => {
    try {
      let res = await apiService.commonGetCall(`Payroll/DeleteLeaveConfiguration?id=${id}`); // this is for deleting the data for dashborad using delete api call 
      console.log(res.data);
      
      Swal.fire('Data deleted successfully')
      getLeaveById();
    } catch (error) {
      console.error(error);
      Swal.fire('failed to  delete data')
    }
  };



  return (

    <div className="container-fluid">
      <p className="Heading">Leave Configuration</p>
      <div className="row">
        <div className="col-lg-12">
          <div className="  card p-3 rounded-3 border-0">
            <div className="row">
              <div className="col-lg-1">
                <p>
                  Filter by:
                </p>
              </div>
              <div className="col-lg-3">
                <input
                  type="search"
                  className=" form-control"
                  placeholder="Search "
                />
              </div>
            </div>
          </div>
          <br/>
          <div className="row">
            <div className="col-lg-8"></div>
            <div className="col-lg-2"></div>
            <div className="col-lg-2">
              <Link href="/Leaveconfiguration/form"> 
                <button
                  className="AddButton"
                >
                  Add New
                </button>
              </Link>
            </div>
          </div>
          <br />
          <div className="row">
            <div className="col-lg-12">
              <table >
                <thead>
                  <tr>
                    <th>Leave</th>
                    <th>Gender</th>
                    <th>Leave Category</th>
                    <th>Yearly Limit</th>
                    <th>Employment Type</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {leave.map((data, index) => {
                    return (
                      <tr key={index}>
                        <td>{data.leavetype}</td>
                        <td>{data.gender}</td>
                        <td>{data.leaveCategory}</td>
                        <td>{data.yearlyLimit}</td>
                        <td>{data.employmentType}</td>

                        <td>
                        <Link href={`/Leaveconfiguration/Edit/${data.id}`}>
                            <button className="edit-btn" onClick={getData.bind(this, data)} >Edit</button>
                          </Link>
                          &nbsp;
  
                          <button className="edit-btn" onClick={() => handleDelete(data.id)}>Delete</button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
   
  )
}

export default LeaveDashboard
