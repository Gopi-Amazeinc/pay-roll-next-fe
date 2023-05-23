import React from 'react';
import { useState, useEffect } from "react";
import { apiService } from "@/services/api.service";
import Link from 'next/link';

const AnnoucementDash = () => {
  const [upcomming, setupcomming] = useState(true);
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
    <div className='container-fluid'>
      <p className='Heading'>Annoucement Dashboard</p>
      <div className='row'>
        <div className='col-lg-12'>
          <div className='card border-0 rounded-3 p-3'>
            <div className="row">
              <div className="col-lg-1">
                <p>Filter BY</p>
              </div>
              <div className="col-lg-2">
                <input type="date" className="form-control" />
              </div>
              <div className="col-lg-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search For Announcement"
                />
              </div>
            </div>
          </div>

          <br />

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
            <div className='col-lg-9'></div>
            <div className="col-lg-2">
              <Link href="/Announcement/announcementform">
                <button
                  className="AddButton"
                >
                  Add New
                </button>
              </Link>
            </div>
          </div>
          <br></br>

          <br />
          <div className='row'>
            <div className='col-lg-12'>
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnnoucementDash;
