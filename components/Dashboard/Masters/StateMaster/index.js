import React from 'react'
import Link from 'next/link'
import Layout from '@/components/Layout/index.js';
import { useEffect, useState } from "react";
import Styles from '../../styles/statemasterdashboard.module.css'
import axios from "axios";
import Swal from 'sweetalert2'

function StateMasterDashboard() {
    const [state, setStateData] = useState([]);
    const [country, setCountryData] = useState([]);
    let hostURL = process.env.NEXT_PUBLIC_API_HOST_URL;

    useEffect(() => {
        getData();
    }, []);

    async function getData() {
        let res = await axios.get(
          hostURL +"Master/GetStateType"  //naveen.th@amazeinc.in, Get API for State master, to fetch data
        );
        setStateData(res.data);
        let res1 = await axios.get(
            hostURL +"Master/GetCountryType" //naveen.th@amazeinc.in, Get API for Country master, to fetch data
          );
          setCountryData(res1.data);
    }

    const deleteState = async (id) =>{        
        Swal.fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!",
        }).then((result) => {
          if (result.isConfirmed) {
            axios.get(hostURL + "Master/DeleteStateType?ID=" + id); //naveen.th@amazeinc.in, Delete API for State master, to delete data
            getData()
          }
        });
        
      }
      const clearSession = async ()=>{
        sessionStorage.setItem("stateID","")
      }
      const edit = async (id)=>{
        sessionStorage.setItem("stateID", id);
      }
    return (
     
        <div className="p-3">
          <h3 className="text-primary fs-5 mt-3">Province Master</h3>
          <div className="card p-3 border-0 shadow-lg rounded-3 mt-4">
            <div className="row">
              <div className="col-lg-1">
                <p>Filter By</p>
              </div>

              <div className="col-lg-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search..."
                />
              </div>

              <div className="col-lg-3">
                <select className="form-control">
                  <option value="">Select Country</option>
                  {country.map((data, index) => {
                    return(
                      <option  key={index} value={data.id}>{data.short}</option>
                    )
                  })}
                </select>
              </div>
            </div>
          </div>

          <div className="row mt-4">
            <div className="col-lg-2">
              <p className="text-primary fs-6 fw-bold">SHOWING RESULTS</p>
            </div>
            <div className="col-lg-8"></div>
            <div className="col-lg-2">
              <Link
                href="/Masters/statemasterform"
                onClick={clearSession}
                className="btn btn-primary"
              >
                Add New
              </Link>
            </div>
          </div>

          <table className="table table-hover mt-4 ">
            <thead className="bg-info text-white ">
              <tr>
                <th>Country</th>
                <th>Province Name</th>
                <th>Description</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {state.map((data, index) => {
                return (
                  <tr className="text-dark" key={index}>
                  <td>{data.country}</td>
                    <td>{data.short}</td>
                    <td>{data.description}</td>
                    <td>
                      <Link href="/Masters/statemasterform">
                        <button
                          id={Styles.editbtn}
                          onClick={edit.bind(this, data.id)}
                        >
                          Edit
                        </button>
                      </Link>
                      &nbsp;&nbsp;&nbsp;&nbsp;
                      <button
                        id={Styles.editbtn}
                        onClick={deleteState.bind(this, data.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
     
    );
}

export default StateMasterDashboard