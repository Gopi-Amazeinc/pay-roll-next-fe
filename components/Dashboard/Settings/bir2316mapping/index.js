import React, { useState } from "react";
import { BiFilterAlt } from "react-icons/bi";
import Link from "next/link";

function BIR2316MappingDash() {
  return (

    <div>
    <h2>Yet to bind</h2>
      <br></br>
      <p className="Heading">BIR2316 Mapping Dashboard</p>

      <div className="container-fluid mt-4">
        <div className="row shadow-lg p-2 rounded-4 p-3 ">
          <div className="col-lg-1">
            <b>
              <p className="mt-2 text-center">
                {" "}
                <BiFilterAlt /> Filter by:{" "}
              </p>
            </b>
          </div>
          <div className="col-lg-5">
            <input
              type="search"
              className=" mt-2 form-control form-control-sm "
              placeholder="Search"
            />
          </div>
        </div>

        <div className="row mt-4">
          <div className="col-lg-8">
            <p >SHOWING 1 RESULTS</p>
          </div>
          <div className="col-lg-2"></div>
          <div className="col-lg-2">
            <Link href="/Settings/bir2316mapping/new"><button
              className="btn btn-primary btn-sm  shadow-lg AddButton"
              
            >
              Add New
            </button></Link>
          </div>
        </div>

      <div className="container-fluid mt-4">
        <div className="row">
          <table className='table'>
            <thead>
              <tr className="tr"> 
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
    
  );
}

export default BIR2316MappingDash;
