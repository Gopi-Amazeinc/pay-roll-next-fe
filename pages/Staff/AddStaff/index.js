import React, { useState,useEffect } from "react";
import Layout from "../../../components/layout/layout";
import Styles from "../../../styles/addStaff.module.css";
import EmployeeProfile from "./employeeprofile";
import PositionDetails from "@/pages/Staff/AddStaff/positiondetails";
import ContactDetails from "@/pages/Staff/AddStaff/contactdetails";
import DependentDetails from "@/pages/Staff/AddStaff/dependentdetails";
import EmploymentHistory from "@/pages/Staff/AddStaff/employementhistory";
import NominationDetails from "@/pages/Staff/AddStaff/nominationdetails";
import EducationalAttainment from "@/pages/Staff/AddStaff/educationalattainment";
import BankDetails from "@/pages/Staff/AddStaff/bankdetails";
import IDDetails from "@/pages/Staff/AddStaff/iddetails";
import { useRouter } from "next/router";

const Index = ({ editData }) => {
  const router = useRouter();
  const [pgNo, setPgNo] = useState(1);

  function changePathName(data) {
    setPgNo(data);
  }
  const stepperStyles = {
    tabs: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "space-evenly",
    },
  };
  useEffect(() => {
    debugger;
    
    const { id } = editData || {};
    if (id) {
      // console.log(id, "idddddddddddddddddddd")
      sessionStorage.setItem("CreatedEmpID", id)
    }
  }, [1]);
  return (
    <Layout>
      <div className="container">
        <div>
          <br></br>
          <div style={stepperStyles.tabs}>
            <div id={1}>
              <p onClick={() => changePathName(1)}>Employee Profile </p>
              {pgNo == 1 && (
                <div
                  style={{
                    color: "#0d6efd",
                    borderTop: "4px solid #0d6efd",
                    marginTop: "0px",
                    marginBottom: "20px",
                  }}
                ></div>
              )}
            </div>
            <div id={2}>
              <p onClick={() => changePathName(2)}> Position Details</p>
              {pgNo == 2 && (
                <div
                  style={{
                    color: "#0d6efd",
                    borderTop: "4px solid #0d6efd",
                    marginTop: "0px",
                    marginBottom: "20px",
                  }}
                ></div>
              )}
            </div>
            <div id={3}>
              <p onClick={() => changePathName(3)}>Contact Details</p>
              {pgNo == 3 && (
                <div
                  style={{
                    color: "#0d6efd",
                    borderTop: "4px solid #0d6efd",
                    marginTop: "0px",
                    marginBottom: "20px",
                  }}
                ></div>
              )}
            </div>
            <div id={4}>
              <p onClick={() => changePathName(4)}>Dependent Details</p>
              {pgNo == 4 && (
                <div
                  style={{
                    color: "#0d6efd",
                    borderTop: "4px solid #0d6efd",
                    marginTop: "0px",
                    marginBottom: "20px",
                  }}
                ></div>
              )}
            </div>
            <div id={5}>
              <p onClick={() => changePathName(5)}>Employment Details</p>
              {pgNo == 5 && (
                <div
                  style={{
                    color: "#0d6efd",
                    borderTop: "4px solid #0d6efd",
                    marginTop: "0px",
                    marginBottom: "20px",
                  }}
                ></div>
              )}
            </div>
            <div id={6}>
              <p onClick={() => changePathName(6)}>Nomination Details</p>
              {pgNo == 6 && (
                <div
                  style={{
                    color: "#0d6efd",
                    borderTop: "4px solid #0d6efd",
                    marginTop: "0px",
                    marginBottom: "20px",
                  }}
                ></div>
              )}
            </div>
            <div id={7}>
              <p onClick={() => changePathName(7)}>Educational Details</p>
              {pgNo == 7 && (
                <div
                  style={{
                    color: "#0d6efd",
                    borderTop: "4px solid #0d6efd",
                    marginTop: "0px",
                    marginBottom: "20px",
                  }}
                ></div>
              )}
            </div>
            <div id={8}>
              <p onClick={() => changePathName(8)}>Bank Details</p>
              {pgNo == 8 && (
                <div
                  style={{
                    color: "#0d6efd",
                    borderTop: "4px solid #0d6efd",
                    marginTop: "0px",
                    marginBottom: "20px",
                  }}
                ></div>
              )}
            </div>
            <div id={9}>
              <p onClick={() => changePathName(9)}>ID Details</p>
              {pgNo == 9 && (
                <div
                  style={{
                    color: "#0d6efd",
                    borderTop: "4px solid #0d6efd",
                    marginTop: "0px",
                    marginBottom: "20px",
                  }}
                ></div>
              )}
            </div>
          </div>

          {pgNo == 1 ? (
            <EmployeeProfile data={editData}/>
          ) : pgNo == 2 ? (
            <PositionDetails data={editData} />
          ) : pgNo == 3 ? (
            <ContactDetails data={editData}  />
          ) : pgNo == 4 ? (
            <DependentDetails data={editData}/>
          ) : pgNo == 5 ? (
            <EmploymentHistory />
          ) : pgNo == 6 ? (
            <NominationDetails />
          ) : pgNo == 7 ? (
            <EducationalAttainment />
          ) : pgNo == 8 ? (
            <BankDetails />
          ) : (
            <IDDetails />
          )}
          <br></br>
          <center style={{ display: "flex", justifyContent: "end", marginRight: "1%" }}>
            {pgNo > 1 && (
              <button
                className="btn btn-primary"
                type="button"
                onClick={() => {
                  let pg = pgNo;
                  setPgNo(pg - 1);
                }}
              >
                Back
              </button>
            )} &nbsp;&nbsp;
            {pgNo < 9 && (
              <button
                className="btn btn-primary"
                type="button"
                onClick={() => {
                  let pg = pgNo;
                  setPgNo(pg + 1);
                }}
              >
                Next
              </button>
            )}
          </center>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
