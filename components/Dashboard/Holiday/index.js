import React from "react";
import Layout from "@/components/layout/layout";
import Styles from "@/styles/Holidaydash.module.css";
import { useState, useEffect } from "react";
import Link from "next/link";
import Swal from "sweetalert2";
import { apiService } from "@/services/api.service";

const Holidaydashboard = () => {
  const [Holiday, setHoliday] = useState([]);

  const getHoliday = async () => {
    let res = await apiService.commonGetCall("HR/GetHolidays"); //This Api is useed for Get the Dashborad data band Master
    setHoliday(res.data);
  };

  useEffect(() => {
    getHoliday();
  }, [1]);

  const getData = (data) => {
    sessionStorage.setItem("id", data.id);
  };

  const clearData = () => {
    sessionStorage.setItem("id", "");
  };

  const handleDelete = async (id) => {
    try {
      let res = await apiService.commonGetCall(`HR/DeleteHolidays?id=${id}`); // this is for deleting the data for dashborad using delete api call
      console.log(res.data);
      Swal.fire("Data deleted successfully");
      getHoliday();
    } catch (error) {
      console.error(error);
      Swal.fire("failed to  delete data");
    }
  };

  return (
    <div className="container-fluid">
      <p className="Heading">Holiday Dashboard</p>
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
              <Link href="/Holiday/holidayform">
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
                    <th>Holiday</th>
                    <th>Holiday Description</th>
                    <th>Holiday Date</th>
                    <th>Attachment</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {Holiday.map((data, index) => {
                    return (
                      <tr key={index}>
                        <td>{data.holiday}</td>
                        <td>{data.holidayDescription}</td>
                        <td>{data.holidayDate}</td>
                        <td>{data.attachment}</td>
                        <td>
                          <Link href={`/Holiday/edit/${data.id}`}>
                            <button className="edit-btn">Edit</button>
                          </Link>
                          &nbsp;
                          <button
                            className="edit-btn"
                            onClick={() => handleDelete(data.id)}
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Holidaydashboard;
