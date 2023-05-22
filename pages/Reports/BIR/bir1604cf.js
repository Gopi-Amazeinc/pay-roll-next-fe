import React, { useState } from "react";
import Layout from "../../../components/layout/layout";

const Bir1604cf = () => {
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
              <h4 className="text-center text-primary">1601-CF</h4>
              <hr />

              <div className="row" style={customStyles.center}>
                <div className="col-lg-2">
                  <label>Year</label>
                </div>
                <div className="col-lg-2">
                  <select className="form-select">
                    <option value="">Select Year</option>
                    <option>2020</option>
                    <option>2021</option>
                    <option>2022</option>
                  </select>
                </div>
                <div className="col-lg-2"></div>
              </div>
              <br></br>

              <div className="row mt-4" style={customStyles.center}>
                <div className="col-lg-2">
                  <label>Amended Return?</label>
                </div>
                <div className="col-lg-2">
                  <div className="form-check form-check-inline">
                    <label className="form-check-label">Yes</label>
                    <input
                      className="form-check-input"
                      type="radio"
                      name="Amended Return"
                    />
                  </div>
                  <div className="form-check form-check-inline">
                    <label className="form-check-label">No</label>
                    <input
                      className="form-check-input"
                      type="radio"
                      name="Amended Return"
                    />
                  </div>
                </div>
                <div className="col-lg-2"></div>
              </div>
              <div className="row mt-4" style={customStyles.center}>
                <div className="col-lg-2">
                  <label>Signatory Person</label>
                </div>
                <div className="col-lg-2">
                  <select className="form-select">
                    <option value="">Select </option>
                    <option>HR</option>
                    <option>Admin</option>
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
  );
};

export default Bir1604cf;
