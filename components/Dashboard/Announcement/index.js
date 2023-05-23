import React from 'react';
import { useState, useEffect } from "react";
import { apiService } from "@/services/api.service";

const AnnoucementDash = () => {
  const [upcomming, setupcomming] = useState(false);
  const [completed, setcompleted] = useState(false);

  const [upcommingdashboard, setupcommingdashboard] = useState([]);
  const [completedashboard, setcompletedashboard] = useState([]);

  function toggleUpcomming() {
    setupcomming(true);
    setcompleted(false);
  }

  function toggleCompleted() {
    setcompleted(true);
    setupcomming(false);
  }

  // let BuildingID = sessionStorage.getItem("buildingID");
  // console.log(completedashboard)
  // console.log("buildingID",BuildingID)

  async function getupcomingdata() {
    const res = await apiService.commonGetCall(
      "HR/GetCompleteAnnouncementsByBuildingID?BuildingID=57"
    );
    //  let res = await axios.get(hostURL + "HR/GetCompleteAnnouncementsByBuildingID?BuildingID=57");
    setcompletedashboard(res.data);
    console.log(res.data);
  }

  async function getcompletedata() {
    const res = await apiService.commonGetCall(
      "HR/GetAnnouncementsByBuildingID?BuildingID=57"
    );
    // let res = await axios.get(hostURL + "HR/GetAnnouncementsByBuildingID?BuildingID=57");
    setupcommingdashboard(res.data);
    console.log(res.data);
  }

  useEffect(() => {
    getupcomingdata();
    getcompletedata();
  }, [1]);

  return (
    <>
      <div>
        <h4 style={{ color: "blue" }}>AnnoucementDashboard</h4>
        <br />
        <div class="shadow-lg p-3 mb-5 bg-white rounded">
          <div className="row">
            <div className="col-lg-1">
              <p>Filter BY</p>
            </div>
            <div className="col-lg-2">
              <input type="date" className="form-control" />
            </div>
            <div className="col-lg-4">
              <input
                type="text"
                className="form-control"
                placeholder="Search For Announcement"
              />
            </div>
          </div>
        </div>

        <div className="btn-group"></div>

        <div className="row">
          <div className="col-lg-1">
            <div className="btn-group">
              <button onClick={toggleUpcomming} className={`toggleButton ${upcomming ? "focus" : ""}`}>
                UPCOMING
              </button>
              <button onClick={toggleCompleted} className={`toggleButton ${completed ? "focus" : ""}`}>
                COMPLETED
              </button>
            </div>
          </div>
        </div>
        <br></br>

        {completed && (
          <table className="table table-hover">
            <thead className="bg-info text-white">
              <tr>
                <th>Announcement Date</th>
                <th>Announcement Time</th>
                <th>Announcement</th>
                <th>Announcement Description</th>
                <th>Venue</th>
              </tr>
            </thead>

            <tbody>
              {completedashboard.map((data) => {
                return (
                  <tr key={data.id}>
                    <td>{data.dateTime}</td>
                    <td>{data.time}</td>
                    <td>{data.reason}</td>
                    <td>{data.description}</td>
                    <td>{data.venue} </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}

        {upcomming && (
          <table className="table table-hover">
            <thead className="bg-info text-white">
              <tr>
                <th>Announcement Date</th>
                <th>Announcement Time</th>
                <th>Announcement</th>
                <th>Announcement Description</th>
                <th>Venue</th>
              </tr>
            </thead>

            <tbody>
              {upcommingdashboard.map((data) => {
                return (
                  <tr key={data.id}>
                    <td>{data.dateTime}</td>
                    <td>{data.time}</td>
                    <td>{data.reason}</td>
                    <td>{data.description}</td>
                    <td>{data.venue} </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};

export default AnnoucementDash;
