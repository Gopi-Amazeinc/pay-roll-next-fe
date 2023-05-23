import React, { useState, useEffect } from "react";
import { BiFilterAlt } from "react-icons/bi";
// import Styles from "../styles/PositionMasterDash.module.css";
import { AiOutlinePlusCircle } from "react-icons/ai";
import table from "@/styles/table.module.css";
import Link from "next/link";
import Styles from "./supportTicketDashboard.module.css"
import Layout from "@/components/layout/layout";
import axios from "axios";

const SupportTicketDashboard = () => {

  const hostURL = process.env.NEXT_PUBLIC_API_HOST_URL;
  const [SupportTicketDashboard, setSupportTicketDashboard] = useState([]);

  async function getSupportTicketDashboard() {
    // let res = await axios.get(hostURL + "");
    // setSupportTicketDashboard(res.data);

  }
  useEffect(() => {
    getSupportTicketDashboard()
  }, [1])

  //  const getData = (data) => {
  //   sessionStorage.setItem("id", data.id);
  // }

  // const clearData = () => {
  //   sessionStorage.setItem("id", "");
  // }

  function getData(data) {
    sessionStorage.setItem("id", data.id);
  }

  function ClearData() {
    sessionStorage.setItem("id", " ")
  }

  async function getSupportTicketDashboardDelete(id) {

    // let res = await axios.get(hostURL + "" +id);
    // getSupportTicketDashboard();


  }


  return (
    <Layout>

      <div className="container-fluid">
      <div className="row">
      <div className="col-lg-12">
      {/* <h4 style={{ color: "red" }}>Api Pending </h4> */}
      </div>
      </div>
      <br />

      <div className="row">
        <div className="col-lg-12">
        <p id={Styles.title}>Support Tickets</p>
        </div>
      </div>
     
      <div className="row">
        <div className="col-lg-3">
        <p id={Styles.p}>SHOWING RESULTS</p>
        </div>
        <div className="col-lg-7"></div>
        <div className="col-lg-2">
        <Link href="/SupportTickets/supportform">
              <button className="AddButton" onClick={ClearData.bind(this)}>ADD NEW</button>
            </Link>
        </div>
      </div>
      <br />
        
       
        <div className="row">
          <div className="col-lg-12">
          <table className={table.commonTable}>
            <thead>
              <tr>
                <th>Date</th>
                <th>Time</th>
                <th>Application Issues</th>
                <th>Related Attachment</th>
                <th>Comments</th>
                <th>Priority</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>

              {
                SupportTicketDashboard.map((data, index) => {
                  return (
                    <tr key={index}>
                      <td>{data.date}</td>
                      <td>{data.time}</td>
                      <td>{data.applicationIssues}</td>
                      <td>{data.relatedAttachment}</td>
                      <td>{data.comments}</td>
                      <td>{data.priority}</td>
                      <td>{data.status}</td>
                      <td>
                        <Link href="/SupportTickets">
                          <button className="btn btn-primary" onClick={getData.bind(this, data)}>Edit</button>
                        </Link>
                        &nbsp;
                        <button className="btn btn-primary" onClick={getSupportTicketDashboardDelete(data.id)}>Delete</button>
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

    </Layout>
  );
}
export default SupportTicketDashboard;
