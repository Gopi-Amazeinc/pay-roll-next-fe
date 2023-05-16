import React, { useState, useEffect } from "react";
import { BiFilterAlt } from "react-icons/bi";
import { AiOutlinePlus } from "react-icons/ai";
import Link from "next/link";
import axios from "axios";
import Swal from "sweetalert2";
const PositionMasterDash = () => {
  const [positionMaster, setPositionMaster] = useState([]);

  const getPositionMaster = async () => {
    let hostURL = process.env.NEXT_PUBLIC_API_HOST_URL;
    const { data } = await axios.get(hostURL + "Master/GetRoleType"); //gurukiran@amazeinc.in, api call to fetch the data that is being displayed onto the table
    setPositionMaster(data)
  }
  useEffect(() => {
    getPositionMaster();
  }, [])

  const handleDelete = async (id) => {
    try {
      let hostURL = process.env.NEXT_PUBLIC_API_HOST_URL;
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {

          const res = axios.get(hostURL + `Master/DeleteRoleType?ID=${id}`); //gurukiran@amazeinc.in, api call to delete the data from the table
          console.log(res.data);
          // alert("Data deleted successfully");
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
        } getPositionMaster();

      })

    } catch (error) {
      console.error(error);
      alert("Failed to delete data");
    }
  };


  return (
    <div className="container">
      <p className="Heading">Position Master</p>
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
        <p className="col-2 result-heading">Showing {positionMaster.length} Results</p>
        <div className="col-8"></div>
        <div className="col-2">
          <Link href="/Masters/PositionMaster/new">
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
              <th>Position Name</th>
              <th>Description</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(positionMaster) &&
              positionMaster.length > 0 && (
                <>
                  {positionMaster.map((data, index) => {
                    return (
                      <tr key={index}>
                        <td>{data.short}</td>
                        <td>{data.description}</td>
                        <td>
                          <Link href={`/Masters/PositionMaster/Edit/${data.id}`}>
                            <button
                              className="edit-btn"
                            >
                              Edit
                            </button>
                          </Link>
                          &nbsp;&nbsp;
                          <button
                            onClick={() => handleDelete(data.id)}
                            className="edit-btn"
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
  )
}

export default PositionMasterDash