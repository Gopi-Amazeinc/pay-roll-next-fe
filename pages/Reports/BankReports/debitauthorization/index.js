import Layout from "@/components/layout/layout.js";
import React from "react";

export default function Debit() {
  const customStyles = {
    button: {
      fontSize: "12px",
      fontWeight: "700",
      color: "white",
      backgroundColor: "#3247d5",
      textTransform: "uppercase",
      textAlign: "center",
      cursor: "pointer",
      width: "150px",
      height: "33px",
      border: "none",
    },
    center: {
      display: "flex",
      justifyContent: "center",
    },
    genbtn: {
      fontSize: "14px",
      fontWeight: "600",
      color: "white",
      backgroundColor: "#3247d5",
      textTransform: "uppercase",
      textAlign: "center",
      cursor: "pointer",
      width: "170px",
      height: "40px",
      borderRadius: "5px",
      border: "none",
    },
  };
  return (
    <Layout>
      <div className="container-fluid">
        <div className="row mt-4">
          <div className="col-lg-2">
            <button style={customStyles.button}>Nomral Payroll</button>
          </div>

          <div className="row" style={customStyles.center}>
            <div className="col-lg-8">
              <div className="card p-3 mt-4">
                <h4 className="text-center text-primary">Debit Authorization Report</h4>
                <hr />
                <div classname="row" style={customStyles.center}>
                  <div className="col-lg-2">
                    <label>Year :</label>
                  </div>
                  <div className="col-lg-3">
                    <select class="form-select form-select-sm">
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
                <div classname="row" style={customStyles.center}>
                  <div className="col-lg-2">
                    <label>Month :</label>
                  </div>
                  <div className="col-lg-3">
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
                </div>
                <br></br>
                <div classname="row" style={customStyles.center}>
                  <div className="col-lg-2">
                    <label>Pay Period :</label>
                  </div>
                  <div className="col-lg-3">
                    <select class="form-select form-select-sm">
                      <option selected>Select</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                    </select>
                  </div>
                </div>
                <br></br>
                <div classname="row" style={customStyles.center}>
                  <div classname="col-lg-6">
                    <button style={customStyles.genbtn}>Generate</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
