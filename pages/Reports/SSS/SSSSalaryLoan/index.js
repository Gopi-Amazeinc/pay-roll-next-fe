import React, { useState } from "react";
import Layout from "@/components/layout/layout.js";

const SSSLoanReport = () => {
  let [tableState, setState] = useState(false);

  const toggleTable = () => {
    setState(!tableState);
  };
  const customStyles = {
    center: {
      display: "flex",
      justifyContent: "center",
    },
  };
  return (
    <Layout>
      <div>
        <div className="container-fluid ">
          <br />
          <br />
          <br />
          <br />
          <div className="card shadow p-3">
            <div className="row">
              <h4 className="text-center text-primary">
                SSS SALARY LOAN REPORT
              </h4>
              <hr />
              <div className="row mt-2" style={customStyles.center}>
                <div className="col-lg-2">
                  <label>Select Date Coverage:</label>
                </div>
                <div className="col-lg-2">
                  <select
                    class="form-select form-select-sm"
                    aria-label=".form-select-sm example"
                  >
                    <option selected>Select Month</option>
                    <option value="1">January</option>
                    <option value="2">February</option>
                    <option value="3">March</option>
                    <option value="3">April</option>
                    <option value="1">May</option>
                    <option value="2">June</option>
                    <option value="3">July</option>
                    <option value="3">August</option>
                    <option value="1">September</option>
                    <option value="2">October</option>
                    <option value="3">November</option>
                    <option value="3">December</option>
                  </select>
                </div>
                <div className="col-lg-2">
                  <select
                    class="form-select form-select-sm"
                    aria-label=".form-select-sm example"
                  >
                    <option selected>Select Year</option>
                    <option value="1">2025</option>
                    <option value="2">2024</option>
                    <option value="3">2023</option>
                    <option value="1">2022</option>
                    <option value="2">2021</option>
                    <option value="3">2020</option>
                  </select>
                </div>
              </div>
              <br></br>

              <br />
              <div className="row mt-4" style={customStyles.center}>
                <div className="col-lg-4">
                  <button onClick={toggleTable} className="EditDelteBTN">
                    Fetch
                  </button>
                </div>
              </div>
            </div>
          </div>
          {tableState && (
          <div className="row mt-4">
            <div className="col-lg-4"></div>
            <div className="col-lg-4"></div>
            <div className="col-lg-4">
              <button className="EditDelteBTN">export to excel</button>
            </div>

            <table className="table table-striped mt-5">
              <thead className="bg-info text-white">
                <tr>
                  <th>#</th>
                  <th>Name of Employee</th>
                  <th>SSS NUMBER</th>
                  <th>Employee Contribution</th>
                  <th>Employer Contribution</th>
                  <th>EC Contribution</th>
                  <th>Total</th>
                </tr>
              </thead>
            </table>
          </div>
        )}
        </div>
        
      </div>
    </Layout>
  );
};

export default SSSLoanReport;
