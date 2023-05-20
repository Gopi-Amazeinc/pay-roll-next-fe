import React, { useState } from 'react'
import Layout from '@/components/layout/layout.js';

const SSSR1Report = () => {
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
        <br />
        <div className="container-fluid ">
          <br />
          <br />
          <br />
          <div className="card shadow p-3">
            <div className="row">
              <h4 className="text-center text-primary">R1-A</h4>
              <hr />

              <div className="row" style={customStyles.center}>
                <div className="col-lg-2">
                  <label>Select Start Month & Year</label>
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

              <div className="row mt-4" style={customStyles.center}>
                <div className="col-lg-2">
                  <label>Signatory Person</label>
                </div>
                <div className="col-lg-2">
                  <select className="form-select form-select-sm">
                    <option select>Select</option>
                    <option>Admin</option>
                    <option>HR</option>
                    <option>Finance</option>
                  </select>
                </div>
                <div className="col-lg-2"></div>
              </div>
              <br />
              <div className="row mt-4" style={customStyles.center}>
                <div className="col-lg-4">
                  <button onClick={toggleTable} className="EditDelteBTN">
                    Generate
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
          </div>
        )}
        </div>
        
      </div>
    </Layout>
    )
}
export default SSSR1Report