import React, { useState, useEffect } from "react";

import Link from "next/link";

import axios from "axios";
import Swal from 'sweetalert2';

function ShiftMaster() {
  const [shiftDetails, setShiftDetails] = useState([]);

  const getShiftdetails = async () => {
    let hostURL = process.env.NEXT_PUBLIC_API_HOST_URL;
    // This API is used to fetch the data from ShiftMaster table
    const res = await axios.get(hostURL + "Master/GetShiftMaster");
    setShiftDetails(res.data);
  }

  useEffect(() => {
    getShiftdetails()
  }, [1])

  const handleDelete = async (id) => {
    try {
      let hostURL = process.env.NEXT_PUBLIC_API_HOST_URL;
      // This API is used to delete the dashboard data based on ID
      const res = await axios.get(hostURL + `Master/DeleteShiftMaster?ID=${id}`);
      Swal.fire({
        icon: "success",
        title: "Hurray..",
        text: "Data was Deleted...!",
      });
      getShiftdetails();
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
      <br></br> <p className="Heading">Shift Master</p>{" "}
      <div className="container-fluid mt-4">
        <div className="row shadow-lg  rounded-4 p-4 ">
          <div className="col-lg-1">
            <b>
              <p className="mt-2 text-center">
                <>
                </>
                {/* <BiFilterAlt />  */}
                Filter by:
              </p>
            </b>
          </div>
          <div className="col-lg-5">
            {/* <h6>Pay Date</h6> */}
            {/* <ReactDatePicker   className=" mt-2 form-control"></ReactDatePicker> */}
            <input
              type="search"
              className=" mt-2 form-control"
              placeholder="Search "
            />
          </div>
        </div>
        <div className="row mt-4">
          <div className="col-lg-10"></div>
          <div className="col-lg-2">
            <Link href="/Masters/ShiftMaster/new"><button className=" AddButton" >Add New</button></Link>
          </div>
        </div>
        <br />
        <div className="row">
          <table className="table table-striped table-hover mt-4">
            <thead className="th">
              <tr className="tr">
                <th> Short</th>
                <th> Description</th>
                <th> Shift Timings</th>
                <th> Grace</th>
                <th>Shift Type</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {
                shiftDetails.map((data, index) => {
                  return (
                    <tr className="text-dark" key={index}>
                      <td>{data.short}</td>
                      <td>{data.description}</td>
                      <td>{data.shiftTimeings}</td>
                      <td>{data.grace}</td>
                      <td>{data.shiftType}</td>
                      <td>
                        <Link href={`/Masters/ShiftMaster/Edit/${data.id}`}>
                          <button className="edit-btn">Edit</button>
                        </Link>
                        &nbsp; &nbsp; &nbsp;
                        <button className="edit-btn" onClick={() => handleDelete(data.id)}>Delete</button>
                      </td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>

  );
}

export default ShiftMaster;