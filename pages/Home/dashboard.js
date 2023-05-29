import React, { useState, useEffect } from "react";
import { useRef } from "react";
import Image from "next/image";
import dashboard from "./dashboard.module.css";
import leaveIcon from "@/public/Images/leaveIcon.png";
import Profile from "@/public/Images/Profile.png";
import images from "@/public/Images/images.png";
import { AiOutlineGift } from "react-icons/ai";
import { BiInjection } from "react-icons/bi";
import Link from "next/link";
import Layout from "@/components/layout/layout.js";
import advertising1 from "@/public/Images/advertising.png";
import { Modal, ModalBody, ModalFooter } from "reactstrap";
import { BiEdit } from "react-icons/bi";
import { RiArrowDropDownLine } from "react-icons/ri";
import Pnchingreen from "@/public/pnchin-green.svg";
import { AiFillExclamationCircle } from "react-icons/ai";
import { MdGroups } from "react-icons/md";
import { apiService } from "@/services/api.service";
// import GaugeChart from 'react-gauge-chart';
import dynamic from "next/dynamic";
const GaugeChart = dynamic(() => import("react-gauge-chart"), { ssr: false });
import Swal from "sweetalert2";

const Dashboard = () => {
  const count = 1;
  const staffDetailsRef = useRef(null);

  var time = new Date().toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
  var Time = time.toString();

  var date = new Date().toISOString().slice(0, 10);
  var _Date = date.toString();
  const [CurrentTime, setCurrentTime] = useState(Time);
  const [CurrentDate, setCurrentDate] = useState(_Date);

  const [userName, setUserName] = useState();
  const [userEmail, setUserEmail] = useState();

  const [userID, setUserID] = useState();
  const [roleID, setRoleID] = useState();

  const [viewMode, setViewMode] = useState("tab1");

  const [items, setItems] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);

  const [punchedIn, setPunchedIn] = useState(false);
  const [punchedOut, setPunchedOut] = useState(false);

  const [WorkTypeID, setWorkTypeID] = useState(0);
  const [StartTime, setStartTime] = useState(Time);
  const [EndTime, setEndTime] = useState(Time);

  const [actionType, setActionType] = useState("");
  const [localIPAddress, setLocalIPAddress] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    setInterval(() => {
      var time = new Date().toLocaleString("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      });
      var Time = time.toString();
      setCurrentTime(Time);
    }, 1000);

    const Loginname = sessionStorage.getItem("userName");
    setUserName(Loginname);
    const Loginemail = sessionStorage.getItem("email");
    setUserEmail(Loginemail);
    const punchinID = sessionStorage.getItem("StaffPunchedinID");
    setActionType(punchinID);
    const userid = sessionStorage.getItem("userID");
    setUserID(userid);
    const roleid = sessionStorage.getItem("roleID");
    setRoleID(roleid);

    const getLocalIPAddress = async () => {
      const response = await fetch("https://api.ipify.org/?format=json");
      const data = await response.json();
      setLocalIPAddress(data.ip);
    };

    getLocalIPAddress();
  }, [1]);
  useEffect(() => {
    debugger;
    if (userID) {
      getAttendance();
    }
  }, [userID]);

  const getAttendance = () => {
    var todayDate = new Date().toISOString().slice(0, 10);
    apiService.commonGetCall("HR/GetAttendance").then((staffData) => {
      staffDetailsRef.current = staffData.data.filter(
        (x) => x.filterdate == todayDate && x.userID == userID
      );
      if (
        staffDetailsRef.current.length &&
        staffDetailsRef.current[0].signinDate != null
      ) {
        setPunchedIn(true);
        setWorkTypeID(staffDetailsRef.current[0].signInTypeID);
        setStartTime(staffDetailsRef.current[0].startTime);
      }

      if (
        staffDetailsRef.current.length &&
        staffDetailsRef.current[0].signoutDate != null
      ) {
        setPunchedOut(true);
        setWorkTypeID(staffDetailsRef.current[0].signOutTypeID);
        setEndTime(staffDetailsRef.current[0].endTime);
      }

      // const currentTime = new Date();
      // setPunchintime(currentTime.toLocaleTimeString());
      // setSubmitted(true);
    });
  };

  const modelopenForPunch = () => {
    if (punchedIn == false) {
      Swal.fire("Please Punchin first");
      // setModalOpen(!modalOpen);
    } else {
      setModalOpen(!modalOpen);
    }

    // setActionType("punchin")
  };
  const handleworkType = (value) => {
    setWorkTypeID(value);
  };

  // const handlePunchin = () => {
  //   setModalOpen(!modalOpen);
  // }
  // TODO: Written By: Gopi -> Add code to punchhin user or staff
  const handlePunchin = async () => {
    if (punchedIn === true) {
      Swal.fire("Already Punched In for the day");
    } else if (
      WorkTypeID == undefined ||
      WorkTypeID == null ||
      WorkTypeID == 0
    ) {
      Swal.fire("Please Fill Work Type");
    } else {
      const options = { hour12: false };
      const date = new Date();
      let entity = {
        UserID: sessionStorage.getItem("userID"),
        SigninDate: date.toLocaleString("en-US", options),
        SigninLocation: "Office",
        StatusID: 1,
        punchinip:
          localIPAddress == undefined || null
            ? "101.120.111.222"
            : localIPAddress,
        ApprovalStatus: "Manager Pending HR Pending",
        WorkType: parseInt(WorkTypeID),
      };
      let res = await apiService.commonPostCall(
        "HR/InsertAttendanceWeb",
        entity
      );
      if (res.data && res.status == 200) {
        setPunchedIn(true);
        getAttendance();
      }

      // const staffPunchedinID = res.data || res;
      // if (staffPunchedinID) {
      //   sessionStorage.setItem("StaffPunchedinID", staffPunchedinID);
      //   setActionType(staffPunchedinID);
      //   Swal.fire("Punched In Successfully");
      // }
      // }
    }
    setModalOpen(!modalOpen);
  };

  const handlePunchout = async () => {
    debugger;
    if (punchedOut === true) {
      Swal.fire("Already Punched out for the day");
    } else if (
      WorkTypeID == undefined ||
      WorkTypeID == null ||
      WorkTypeID == 0
    ) {
      Swal.fire("Please Fill Work Type");
    } else if (WorkTypeID != staffDetailsRef.current[0].signInTypeID) {
      Swal.fire("please select correct work Type to Punchout!");
    } else {
      let options = { hour12: false };
      let date = new Date();
      await apiService.commonGetCall("HR/GetAttendance").then(async (res) => {
        debugger;
        var todayDate = new Date().toISOString().slice(0, 10);
        let temp = res.data.filter(
          (x) => x.filterdate == todayDate && x.userID == userID
        );
        let ID = temp[0].id;

        var entity = {
          ID: ID,
          SignoutDate: date.toLocaleString("en-US", options),
          SignoutLocation: "Office",
          StatusID: 2,
          punchoutip:
            localIPAddress == undefined || null
              ? "101.120.111.222"
              : localIPAddress,
          PunchoutWorkType: parseInt(WorkTypeID),
        };
        let res1 = await apiService.commonPostCall(
          "HR/UpdateAttendanceWeb",
          entity
        );
        if (res1.data && res1.status == 200) {
          // setActionType(res1);
          setPunchedOut(true);
          getAttendance();
        }
      });
    }
    setModalOpen(!modalOpen);
  };
  const staffDetails = staffDetailsRef.current;

  const customStyles = {
    card: {
      borderRadius: "16px",
      width: "100%",
      height: "497px",
      boxShadow: "none",
      border: "none",
      marginBottom: "12px",
      backgroundColor: "white",
      padding: "20px",
    },
    holidays: {
      cursor: "pointer",
      borderRadius: "16px",
      width: "48%",
      height: "242px",
      background: "#ffffff",
      marginBottom: "16px",
    },
  };

  return (
    <Layout>
      <div className="container">
        <div className="row mt-4">
          <div className="container">
            <div className="second-card11 d-flex">
              <div className="d-flex align-items-center">
                <div className="d-flex flex-column align-items-center left-part">
                  <MdGroups className="dashlogo" />
                  <h2 className="myteam-heading">Employee Requests</h2>
                </div>
                <div className="d-flex flex-wrap justify-content-evenly right-part">
                  <div className="card-one1-1" style={{ width: "170px" }}>
                    <div className="d-flex flex-column align-items-center">
                      <p className="card-head">Onboarded Staff</p>
                      <p className="card-day">
                        {/* {OnboardingData_preJoining.length} */} 20
                      </p>
                      <div className="d-flex align-items-center justify-content-center align-center-txt">
                        <AiFillExclamationCircle className="img-icon" />
                        <p
                          className="card-paragraph"
                          style={{ marginBottom: "0px" }}
                        >
                          Monitor the Pre-Employment docs
                        </p>
                      </div>
                      <button
                        className="card-attendance text-attendance mt-3"
                        onClick={() =>
                          router.push(
                            "/EmployeeManagement/OnboardingInitiationDashboard"
                          )
                        }
                        style={{ marginBottom: "50px" }}
                      >
                        View Onboarding
                      </button>
                    </div>
                  </div>
                  <div className="card-one1-1" style={{ width: "170px" }}>
                    <div className="d-flex flex-column align-items-center">
                      <p className="card-head">Approved Leaves</p>
                      <p className="card-day">
                        {/* {Approvedcountforhr} */} 20
                      </p>
                      <div className="d-flex align-items-center justify-content-center align-center-txt">
                        <AiFillExclamationCircle className="img-icon" />
                        <p
                          className="card-paragraph"
                          style={{ marginBottom: "0px" }}
                        >
                          Update Leave Balance
                        </p>
                      </div>
                      <button
                        className="card-attendance text-attendance mt-4"
                        onClick={() =>
                          router.push("/Requests/StaffLeaveDetailsHR")
                        }
                      >
                        View Leave Details
                      </button>
                    </div>
                  </div>
                  <div className="card-one1-1" style={{ width: "170px" }}>
                    <div className="d-flex flex-column align-items-center">
                      <p className="card-head">Update Personal Info</p>
                      <p className="card-day">
                        {/* {changeapprovelist.length} */}20
                      </p>
                      <div className="d-flex align-items-center justify-content-center align-center-txt">
                        <AiFillExclamationCircle className="img-icon" />
                        <p
                          className="card-paragraph"
                          style={{ marginBottom: "0px" }}
                        >
                          {" "}
                          You have 1 personal info update request{" "}
                        </p>
                      </div>
                      <button
                        className="card-attendance text-attendance mt-3"
                        onClick={() =>
                          router.push(
                            "/Requests/TeamEmployeChangeRequestDetails"
                          )
                        }
                      >
                        {" "}
                        View Request{" "}
                      </button>
                    </div>
                  </div>
                  <div className="card-one1-1" style={{ width: "170px" }}>
                    <div className="d-flex flex-column align-items-center">
                      <p className="card-head">Loan Request</p>
                      <p className="card-day">{/* {LoansCount} */}20</p>
                      <div className="d-flex align-items-center justify-content-center align-center-txt">
                        <AiFillExclamationCircle className="img-icon" />
                        <p
                          className="card-paragraph"
                          style={{ marginBottom: "0px" }}
                        >
                          You have 0 loan request for approval
                        </p>
                      </div>
                      <button
                        className="card-attendance text-attendance mt-3"
                        onClick={() =>
                          router.push("/Requests/LoanRequest/MyLoanDetails")
                        }
                      >
                        View Loan Request
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row mt-2">
          <div className="col-12 d-flex justify-content-between">
            <div className="left">
              <div style={customStyles.card}>
                <div className="d-flex flex-column align-items-center">
                  <p className="Top_heading">Attendance Tracker</p>
                  <div className="d-flex time-alignment">
                    <p className="time">{CurrentTime}</p>
                  </div>
                  <p className="date-text">{CurrentDate}</p>
                  <p className="type-text ">
                    Work Type Details<span>*</span>
                  </p>
                  <select value={WorkTypeID} className="drp-box select mt-2">
                    <option value="0" className="punch-text">
                      Select Type
                    </option>
                    <option value="1" className="punch-text">
                      Work from Home
                    </option>
                    <option value="2" className="punch-text">
                      Work from Office
                    </option>
                  </select>

                  {!punchedIn && (
                    <div className="contents">
                      <div
                        className={
                          WorkTypeID == 0
                            ? "punch-Out-card bgred d-flex mt-4"
                            : "punch-Out-card d-flex mt-4"
                        }
                      >
                        <p className="text-punch">Punch In </p>
                      </div>

                      <div className="not-punch-card mt-4">
                        <p className="text-punch-tym1">No punch in yet</p>
                      </div>
                    </div>
                  )}

                  {punchedIn && (
                    <div className="contents">
                      <div className="punch-in-card  mt-4">
                        <p className="text-punch1">Punched In</p>
                      </div>
                      <p className="text-punch-tym mt-2">
                        Punched in at {StartTime}{" "}
                      </p>
                    </div>
                  )}

                  {!punchedOut && (
                    <div className="contents">
                      <div
                        className={
                          punchedIn
                            ? "punch-Out-card  d-flex mt-4"
                            : "punch-Out-card bgred d-flex mt-4"
                        }
                      >
                        <p className="text-punch">Punch Out</p>
                      </div>

                      <div className="not-punch-card mt-4">
                        <p className="text-punch-tym1">No punch out yet</p>
                      </div>
                    </div>
                  )}
                  {punchedOut && (
                    <div className="contents">
                      <div className="punch-in-card  mt-4">
                        <p className="text-punch1">Punched Out</p>
                      </div>
                      <p className="text-punch-tym mt-2">
                        Punched out at {EndTime}{" "}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="right">
              <div className="d-flex flex-wrap justify-content-between">
                <div className="annoc-card mb-2">
                  <div className="card-content">
                    <div className="d-flex flex-column align-items-center p-2">
                      <p className="card-head-one">Announcements</p>

                      <div className="acctalign-hold-img1">
                        <img
                          className="img-annouc"
                          src="https://103.12.1.76/ALIAPI\Images\ProjectAttachments\HCX-20230417091640.png"
                        />
                        <p className="fest-name">test</p>
                        <p className="fest-name">21st May</p>
                        <div className="d-flex justify-content-end w-100">
                          <p
                            className="view-textannoubce "
                            onClick={() =>
                              router.push("/Announcements/Announcements")
                            }
                          >
                            View All
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="holiday mb-2">
                  <div>
                    <p className="card-head" style={{ textAlign: "left" }}>
                      Holidays
                    </p>
                  </div>
                  <div className="row">
                    <div className="col-6">
                      <div className="holi-atc">
                        <div>
                          <img
                            className="tphoimg"
                            src="https://103.12.1.76/ALIAPI\Images\ProjectAttachments\SPECIAL-20230517114109.jpg"
                          />
                          <p
                            className="attac-text"
                            style={{ marginLeft: "22px" }}
                          >
                            SPECIAL HOLIDAY
                          </p>
                          <p
                            className="attac-day"
                            style={{ marginLeft: "22px" }}
                          >
                            May 19, 2023
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="hol-others">
                        <div className="holi-atc">
                          <div className="list-holidays">
                            <div>
                              <img
                                className="holidaylistattachment"
                                src="https://103.12.1.76/ALIAPI\Images\ProjectAttachments\HCX-20230417091640.png"
                              />
                            </div>
                            <div className="holidaylistcol">
                              <h6 className="attac-text">
                                {" "}
                                Test Upcoming Holida...{" "}
                              </h6>
                              <h6 className="attac-day">Jun 17, 2023</h6>
                            </div>
                          </div>
                          <div className="list-holidays">
                            <div>
                              <img
                                className="holidaylistattachment"
                                src="https://103.12.1.76/ALIAPI\Images\ProjectAttachments\HCX-20230417091735.png"
                              />
                            </div>
                            <div className="holidaylistcol">
                              <h6 className="attac-text">
                                {" "}
                                Test Upcoming Holida...{" "}
                              </h6>
                              <h6 className="attac-day">Dec 2, 2023</h6>
                            </div>
                          </div>
                          <div className="list-holidays">
                            <div>
                              <img className="holidaylistattachment" src="" />
                            </div>
                            <div className="holidaylistcol">
                              <h6 className="attac-text"> </h6>
                              <h6 className="attac-day"></h6>
                            </div>
                          </div>
                        </div>
                        <p
                          className="view-textannoubce2"
                          onClick={() => router.push("/Holidays/Holidays")}
                        >
                          View All
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="d-flex flex-wrap justify-content-between">
                <div className="card-one mb-2">
                  <div className="card-content">
                    <p className="card-head">Attendance Details</p>
                    <p className="card-day">
                      {/* {AttendanceCorraection.length} */} 20 Days
                    </p>
                    <div className="d-flex align-center-txt">
                      <AiFillExclamationCircle
                        className="img-icon"
                        style={{ marginLeft: "50px" }}
                      />
                      <p className="card-paragraph">
                        You have 20
                        {/* {ApprovedCount} */}
                        absents status this month
                      </p>
                    </div>
                    <button
                      className="card-attendance text-attendance"
                      style={{ marginLeft: "11px" }}
                      onClick={() =>
                        router.push(
                          "/attendance/AttendanceCorrectionDetails/AttendanceCorrection"
                        )
                      }
                    >
                      Attendance Correction
                    </button>
                  </div>
                </div>
                <div className="card-one mb-2" style={{ height: "236px" }}>
                  <div className="card-content">
                    <p className="card-head">Leave Details</p>
                    <p className="card-day">
                      {/* {PendingLeaveCount}  */} 20 Days
                    </p>
                    <div className="d-flex align-center-txt">
                      <AiFillExclamationCircle
                        className="img-icon"
                        style={{ marginLeft: "50px" }}
                      />
                      <p className="card-paragraph">Pending Leave</p>
                    </div>
                    <button
                      className="card-attendance text-attendance mt-3"
                      style={{ marginLeft: "11px" }}
                      onClick={() =>
                        router.push("/Requests/StaffLeaveDetailsHR")
                      }
                    >
                      Apply Leave{" "}
                    </button>
                    {/* <p className="view-textleave">View Leave</p> */}
                  </div>
                </div>
                <div className="card-one mb-2">
                  <div className="card-content">
                    <p className="card-head">Payroll Schedule</p>
                    <p className="card-day">Nov 10, 2022</p>

                    <div className="card-content">
                      <div className="d-flex align-center-txt">
                        <AiFillExclamationCircle
                          className="img-icon"
                          style={{ marginLeft: "50px" }}
                        />
                        <p className="card-paragraph">
                          Payroll date: Oct 15 - Oct 30, 2022
                        </p>
                      </div>
                    </div>
                    <button
                      className="card-attendance text-attendance"
                      style={{ marginLeft: "11px" }}
                    >
                      View Latest Payslip{" "}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-4">
            <div className="Profile-card mb-2">
              <div className="second-card d-flex align-items-center flex-column">
                <div className="grey-card">
                  <div className="row">
                    <div className="col-4">
                      <Image
                        src={Profile}
                        style={{
                          width: "100%",
                          height: "100px",
                          marginRight: "18px",
                        }}
                      ></Image>
                    </div>
                    <div className="col-8">
                      <div className="d-flex flex-column mt-4 ml-4">
                        <p className="para">Complete your profile</p>
                        <p className="small-para">
                          Keep your basic information up to date. You can add,
                          edit,or remove information or submit a request through
                          Personal Info Update.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="update-info d-flex justify-content-between ">
                  <p className="content">Update your information</p>
                  <p
                    className="content1"
                    onClick={() =>
                      router.push("/EmployeeManagement/MyProfiletabs")
                    }
                  >
                    Steps to complete
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="managersmall-one col-lg-4">
            <div className="card-content">
              <p className="card-head">Overtime Details</p>
              <p className="card-day">{/* {pendingOTCount} */} 20 </p>

              <div className="card-content">
                <div className="d-flex align-center-txt">
                  <AiFillExclamationCircle
                    className="img-icon"
                    style={{ marginLeft: "50px" }}
                  />
                  <p className="card-paragraph">
                    You have
                    {/* {pendingOTCount}  */}
                    OT request for approval
                  </p>
                </div>
              </div>
              <button
                className="card-attendance text-attendance"
                style={{ marginLeft: "15px" }}
                onClick={() =>
                  router.push("/Attendance/OvertimeDetails/MyOvertimeDetail")
                }
              >
                Overtime Details
              </button>
            </div>
          </div>
        </div>

        <div className="manager-requestcard d-flex justify-content-between mt-2">
                    <div className='col-4 d-flex flex-column'>
                        <Image style={{ width: '20%', height: '100px', marginLeft: '35%', marginTop: '13%' }}></Image>
                        <p style={{ marginLeft: '25%', color: '#3eac6c', marginTop: '2%', fontSize: '25px' }} >My Team Requests</p>

                    </div>


                    <div className="managerrquestsmall-card">
                        <div className="card-content">
                            <p className="card-head">Leave Request</p>
                            <p className="card-day">
                              {/* {LevaeCountForSupervisor} */} 20
                              </p>


                            <div className="card-content">
                                <div className="d-flex align-center-txt"><AiFillExclamationCircle className="img-icon" style={{ marginLeft: "50px" }} />
                                    <p className="card-paragraph">
                                        Pending Leave Request for Approval.</p>
                                </div>
                            </div>
                            <button className="card-attendance text-attendance" style={{ marginLeft: "15px" }} onClick={() => router.push('/Requests/LeaveRequest')} >View Leave Request</button>


                        </div>
                    </div>
                    <div className="managerrquestsmall-card">
                        <div className="card-content">
                            <p className="card-head">Overtime Request</p>
                            <p className="card-day">
                              {/* {pendingOTCount} */} 20
                              </p>


                            <div className="card-content">
                                <div className="d-flex align-center-txt"><AiFillExclamationCircle className="img-icon" style={{ marginLeft: "50px" }} />
                                    <p className="card-paragraph">Pending OT Request for Approval.</p>
                                </div>
                            </div>
                            <button className="card-attendance text-attendance" style={{ marginLeft: "15px" }} onClick={() => router.push('/Attendance/OvertimeDetails/MyOvertimeDetail')} >view OT Request</button>

                        </div>
                    </div>
                    <div className='col-2'></div>



                </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
