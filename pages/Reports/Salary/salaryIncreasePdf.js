import React from "react";
import Link from "next/link";
import { useEffect, useState } from "react";
import Styles from "./salary.module.css";
import Layout from "@/components/layout/layout";
import { apiService } from "@/services/api.service";

const SalaryIncreasePdf = () => {
  const [userID, setUserID] = useState();
  const [roleID, setRoleID] = useState();

  useEffect(() => {
    const userid = sessionStorage.getItem("userID");
    const roleid = sessionStorage.getItem("roleID");
    setUserID(userid);
    setRoleID(roleid);
  }, []);
  return (
    <Layout>
      <div>
        <div className="container">
          <div className="row mt-3">
            <div className={"col-lg-3 " + Styles.title}>
              Salary Increase PDF
            </div>
          </div>

          <div className={Styles.filter}>
            {/* <form onSubmit={handleSubmit}> */}
            <br />
            <div className="card p-4  border-0  rounded-3">
              <div className="row">
                <div className="col-lg-1">
                  <p className={Styles.filterdate}>Filter By</p>
                </div>
                <div className="col-lg-5">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search..."
                  />
                </div>
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-lg-2 text-primary fs-6 fw-bold">
                <h6 style={{ color: "#3247d5" }}>Showing {0} Results </h6>
              </div>
            </div>
          </div>

          <br></br>
          <div> this is for comon table use this and css from global 
          <div className="row" style={{ overflowX: "auto" }}>
            <div className="col-lg-12">
              <table>
                <thead>
                  <tr>
                  <th>tabldatee</th>
                  <th>tabldatee</th>
                  <th>tabldatee</th>
                  <th>tabldatee</th>
                  <th>tabldatee</th>
                  <th>tabldatee</th>
                  <th>tabldatee</th>
                  <th>tabldatee</th>
                  <th>tabldatee</th>
                  <th>tabldatee</th>
                  <th>tabldatee</th>
                  <th>tabldatee</th>
                  <th>tabldatee</th>
                  <th>tabldatee</th>
                  <th>tabldatee</th>
                  <th>tabldatee</th>
                  <th>tabldatee</th>
                    <th>tabldatee</th>
                   <th>item</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="text-dark">
                    <td>ITEM</td>
                    <td>ITEM</td>
                    <td>ITEM</td>
                    <td>ITEM</td>
                    <td>ITEM</td>
                    <td>ITEM</td>
                    <td>ITEM</td>
                    <td>ITEM</td>
                    <td>ITEM</td>
                    <td>ITEM</td>
                    <td>ITEM</td>
                    <td>ITEM</td>
                    <td>ITEM</td>
                    <td>ITEM</td>
                    <td>ITEM</td>
                    <td>ITEM</td>
                    {/* <td>ITEM</td>
                    <td>ITEM</td> */}
                  </tr><tr className="text-dark">
                    <td>ITEM</td>
                    <td>ITEM</td>
                    <td>ITEM</td>
                    <td>ITEM</td>
                    <td>ITEM</td>
                    <td>ITEM</td>
                    <td>ITEM</td>
                    <td>ITEM</td>
                    <td>ITEM</td>
                    <td>ITEM</td>
                    <td>ITEM</td>
                    <td>ITEM</td>
                  </tr>
                  <tr className="text-dark">
                    <td>ITEM</td>
                    <td>ITEM</td>
                    <td>ITEM</td>
                    <td>ITEM</td>
                    <td>ITEM</td>
                    <td>ITEM</td>
                    <td>ITEM</td>
                    <td>ITEM</td>
                    <td>ITEM</td>
                    <td>ITEM</td>
                    <td>ITEM</td>
                    <td>ITEM</td>
                  </tr>
                  <tr className="text-dark">
                    <td>ITEM</td>
                    <td>ITEM</td>
                    <td>ITEM</td>
                    <td>ITEM</td>
                    <td>ITEM</td>
                    <td>ITEM</td>
                    <td>ITEM</td>
                    <td>ITEM</td>
                    <td>ITEM</td>
                    <td>ITEM</td>
                    <td>ITEM</td>
                    <td>ITEM</td>
                    <td>ITEM</td>
                    <td>ITEM</td>
                    <td>ITEM</td>
                    <td>ITEM</td>
                    </tr>

                </tbody>
              </table>
            </div>
            <br></br>
            <br></br>
            <br></br>
            <div></div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SalaryIncreasePdf;
