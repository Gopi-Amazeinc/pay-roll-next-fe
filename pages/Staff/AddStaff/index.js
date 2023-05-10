import React, { useState } from "react";
import Layout from "../../../components/layout/layout";
import Styles from "../../../styles/addStaff.module.css";
import EmployeeProfile from "../../../components/Dashboard/Staff/AddStaff/employeeprofile";
import PositionDetails from "@/components/Dashboard/Staff/AddStaff/positiondetails";
import ContactDetails from "@/components/Dashboard/Staff/AddStaff/contactdetails";
import DependentDetails from "@/components/Dashboard/Staff/AddStaff/dependentdetails";
import EmploymentHistory from "@/components/Dashboard/Staff/AddStaff/employementhistory";
import NominationDetails from "@/components/Dashboard/Staff/AddStaff/nominationdetails";
import EducationalAttainment from "@/components/Dashboard/Staff/AddStaff/educationalattainment";
import BankDetails from "@/components/Dashboard/Staff/AddStaff/bankdetails";
import IDDetails from "@/components/Dashboard/Staff/AddStaff/iddetails";

const Index = () => {
  const [pgNo, setPgNo] = useState(1);

  function changePathName(data) {
    setPgNo(data);

    // document.getElementById(data).style.color = "green"
  }

  return (
    <Layout>
      <div className="container">
        <h5>APIs yet to be provided</h5>
        <div>
          <div className={Styles.wizardHorizontal}>
            <div
              id={1}
              className={pgNo == "1" ? Styles.circlebg : Styles.circle}
            >
              <p
                onClick={() => changePathName(1)}
                className={Styles.wizardLabel}
              >
                Employee Profile{" "}
              </p>
            </div>
            <div
              id={2}
              className={pgNo == "2" ? Styles.circlebg : Styles.circle}
            >
              <p
                onClick={() => changePathName(2)}
                className={Styles.wizardLabel}
              >
                {" "}
                Position Details
              </p>
            </div>
            <div id={3}  className={pgNo == "3" ? Styles.circlebg : Styles.circle}>
              <p
                onClick={() => changePathName(3)}
                className={Styles.wizardLabel}
              >
                Contact Details
              </p>
            </div>
            <div id={4} className={pgNo == "4" ? Styles.circlebg : Styles.circle}>
              <p
                onClick={() => changePathName(4)}
                className={Styles.wizardLabel}
              >
                Dependent Details
              </p>
            </div>
            <div id={5} className={pgNo == "5" ? Styles.circlebg : Styles.circle}>
              <p
                onClick={() => changePathName(5)}
                className={Styles.wizardLabel}
              >
                Employment Details
              </p>
            </div>
            <div id={6} className={pgNo == "6" ? Styles.circlebg : Styles.circle}>
              <p
                onClick={() => changePathName(6)}
                className={Styles.wizardLabel}
              >
                Nomination Details
              </p>
            </div>
            <div id={7} className={pgNo == "7" ? Styles.circlebg : Styles.circle}>
              <p
                onClick={() => changePathName(7)}
                className={Styles.wizardLabel}
              >
                Educational Attainment
              </p>
            </div>
            <div id={8} className={pgNo == "8" ? Styles.circlebg : Styles.circle}>
              <p
                onClick={() => changePathName(8)}
                className={Styles.wizardLabel}
              >
                Bank Details
              </p>
            </div>
            <div id={9} className={pgNo == "9" ? Styles.circlebg : Styles.circle}>
              <p
                onClick={() => changePathName(9)}
                className={Styles.wizardLabel}
              >
                ID Details
              </p>
            </div>
          </div>

          <p>Page {pgNo} / 9</p>
          {pgNo == 1 ? (
            <EmployeeProfile />
          ) : pgNo == 2 ? (
            <PositionDetails />
          ) : pgNo == 3 ? (
            <ContactDetails />
          ) : pgNo == 4 ? (
            <DependentDetails />
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
          <center>
            <br></br>
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
            )}
            {pgNo < 9 && (
              <button
                className="btn btn-primary mx-4"
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
