import React from 'react'
import Link from 'next/link'
import { BiFilterAlt } from "react-icons/bi";
import { AiOutlinePlus } from "react-icons/ai";
import { useEffect, useState } from "react";
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
      hostURL + "Master/GetStateType"  //naveen.th@amazeinc.in, Get API for State master, to fetch data
    );
    setStateData(res.data);
    let res1 = await axios.get(
      hostURL + "Master/GetCountryType" //naveen.th@amazeinc.in, Get API for Country master, to fetch data
    );
    setCountryData(res1.data);
  }

  const deleteState = async (id) => {
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
  return (
    <div className="container">
      <p className="Heading">Province Master</p>
      <div className="card p-3 rounded-3 shadow border-0">
        <div className="row">
          <div className="col-1">
            <p> <BiFilterAlt /> Filter By</p>
          </div>
          <div className="col-5">
            <input
              type="text"
              placeholder="Search"
              className="form-control"
            ></input>
          </div>
        </div>
      </div>

      <div className="row mt-3">
        <p className="col-2 result-heading">Showing {state.length} Results</p>
        <div className="col-8"></div>
        <div className="col-2">
          <Link href="/Masters/StateMaster/new">
            <button className=" AddButton">
              <AiOutlinePlus />    Add New
            </button>
          </Link>
        </div>
      </div>

      <div className="mt-3">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Country</th>
              <th>Province Name</th>
              <th>Description</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(state) &&
              state.length > 0 && (
                <>
                  {state.map((data, index) => {
                    return (
                      <tr key={index}>
                        <td>{data.country}</td>
                        <td>{data.short}</td>
                        <td>{data.description}</td>
                        <td>
                          <Link href={`/Masters/StateMaster/Edit/${data.id}`}>
                            <button
                              className='edit-btn'
                            >
                              Edit
                            </button>
                          </Link>
                          &nbsp;&nbsp;
                          <button
                            className='edit-btn'
                            onClick={deleteState.bind(this, data.id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </>
              )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default StateMasterDashboard