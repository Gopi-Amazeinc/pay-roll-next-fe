import React, { useState } from "react";
import { BiFilterAlt } from "react-icons/bi";
import Link from "next/link";

function BIR2316MappingDash() {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-lg-12">
          <p className="Heading">BIR2316 Mapping Dashboard</p>

          <div className="card border-0 p-3 rounded-3">
            <div className="row">
              <div className="col-lg-1">
                <p>Filter by</p>
              </div>
              <div className="col-lg-3">
                <input
                  type="text"
                  className=" form-control  "
                  placeholder="Search"
                />
              </div>
            </div>

          </div>
          <br />
          <div className="row">
            <div className="col-lg-8">
       
            </div>
            <div className="col-lg-2"></div>
            <div className="col-lg-2">
              <Link href="/Settings/bir2316mapping/new"><button
                className="AddButton"
              >
                Add New
              </button></Link>
            </div>
          </div>
          <br />

          <div className="row">
            <div className="col-lg-12">
              <table>
                <thead>
                  <tr>
                    <th>27 5% Tax Credit (PERA Act of 2008)</th>
                    <th>35 De Minimis Benefits</th>
                    <th>39 Basic Salary</th>
                    <th>40 Representation</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>100</td>
                    <td>200</td>
                    <td>300</td>
                    <td>0</td>
                    <td>
                      <Link href="Settings/bir2316mapping/new"><button className="edit-btn">Edit</button></Link>
                      <button className="edit-btn">Delete</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BIR2316MappingDash;
