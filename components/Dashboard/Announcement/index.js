import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";


function AnnoucementDash() {




  

  const [upcomming, setupcomming] = useState(false);
  const [completed, setcompleted] = useState(false);

  function toggleUpcomming() {
    setupcomming(true);
    setcompleted(false);
  }

  function toggleCompleted() {
    setcompleted(true);
    setupcomming(false);
  }

  const [upcommingdashboard, setupcommingdashboard] = useState([]);
  const [completedashboard, setcompletedashboard] = useState([]);

  const hostURL = process.env.NEXT_PUBLIC_API_HOST_URL;

  async function getupcomingdata() {
    let res = await axios.get(hostURL + "HR/GetCompleteAnnouncementsByBuildingID?BuildingID=" + buildingID);
    setcompletedashboard(res.data);
    console.log(res.data);
  }

  useEffect(() => {
    getupcomingdata();
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
              <button onClick={toggleUpcomming} className="toggleButton">
                UPCOMING
              </button>
              <button onClick={toggleCompleted} className="toggleButton">
                COMPLETED
              </button>
            </div>
          </div>
        </div>
        <br></br>

        {
          completed && (
            <table className='table table-hover'>
              <thead className='bg-info text-white'>
                <tr>

                  <th>Announcement Date</th>
                  <th>Announcement Time</th>
                  <th>Description</th>
                  <th>Reason</th>
                  <th>Venue</th>

                </tr>
              </thead>

              <tbody>
                {
                  completedashboard.map((data) => {
                    return (
                      <tr key={data.id}>
                        <td>{data.name}</td>
                        <td>{data.filterdate}</td>
                        <td>{data.description}</td>
                        <td>{data.reason}</td>
                        <td>{data.venue}</td>
                        <td></td>
                      </tr>
                    )
                  })
                }
              </tbody>
            </table>
          )
        }





      </div>
    </>
  );
}

export default AnnoucementDash;
