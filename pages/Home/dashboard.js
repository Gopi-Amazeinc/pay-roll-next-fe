import React, { useState, useEffect } from "react";
import Image from "next/image";
import dashboard from "./dashboard.module.css";
import leaveIcon from "@/public/Images/leaveIcon.png";
import profile from "@/public/Images/profileimg.png";
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
import { apiService } from "@/services/api.service";

// import GaugeChart from 'react-gauge-chart';
import dynamic from "next/dynamic";
const GaugeChart = dynamic(() => import("react-gauge-chart"), { ssr: false });

import Swal from "sweetalert2";

const Dashboard = () => {
  const count = 1;

  var time = new Date().toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
  var Time = time.toString();

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

  const [staffData,setstaffData] = useState();

  useEffect(() => {
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
    var todayDate = new Date().toISOString().slice(0, 10);
    debugger;
    if (userID) {
      const staffDetails = apiService.commonGetCall("HR/GetAttendance");
      setstaffData(staffDetails)
      staffData.data.filter(
          (x) => x.filterdate == todayDate && x.userID == userID
        );
        if (staffDetails.length && staffDetails[0].signinDate != null) {
          setPunchedIn(true);
          setWorkTypeID(staffDetails[0].signInTypeID);
          setStartTime(staffDetails[0].startTime);
        }

        if (staffDetails.length && staffDetails[0].signoutDate != null) {
          setPunchedOut(true);
          setWorkTypeID(staffDetails[0].signOutTypeID);
          setEndTime(staffDetails[0].endTime);
        }

        // const currentTime = new Date();
        // setPunchintime(currentTime.toLocaleTimeString());
        // setSubmitted(true);
      // });
    }
  }, [userID]);

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
    }
    else if (WorkTypeID != staffDetails[0].signInTypeID ) {
      
      Swal.fire("please select correct work Type to Punchout!")
    }
    else {
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
        }
      });
    }
    setModalOpen(!modalOpen);
  };

  return (
    <Layout>
      {/* <input
        type="file"
        accept=".xlsx"
        onChange={(e) => {
          const file = e.target.files[0];
          readExcel(file);
        }}
      /> */}
      <div className="container-fluid">
        <div className="row">
          <div className={dashboard.card1}>
            <div className="card p-0" style={{ borderRadius: "20px" }}>
              <div
                className="card-header"
                style={{
                  backgroundColor: "#02CFFF",
                  borderTopLeftRadius: "20px",
                  borderTopRightRadius: "20px",
                }}
              >
                <div
                  className="d-flex align-items-center"
                  style={{ height: "10px", padding: "9px" }}
                >
                  <AiOutlineGift style={{ color: "white", fontSize: "25px" }} />
                  <h5
                    className={dashboard.cardheader}
                    style={{ color: "white" }}
                  >
                    Attendance Tracker
                  </h5>
                </div>
                <p
                  className="card-subtitle mt-1 mb-0"
                  style={{ color: "white" }}
                >
                  Always Register Your Attendance
                </p>
              </div>
              <div
                className="card-body"
                style={{ borderRadius: "0 0 10px 10px" }}
              >
                <div className="col-lg-12">
                  <div className="row">
                    {!punchedIn ? (
                      <>
                        <div className="col-lg-7">
                          <button
                            className={dashboard.punchin}
                            onClick={() => setModalOpen(!modalOpen)}
                          >
                            PUNCH IN
                          </button>
                        </div>
                        <div className="col-lg-4 mt-3 ">
                          <span> PunchIn time </span>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="col-lg-7">
                          <button
                            className={dashboard.buttonclick}
                            // onClick={() => modelopen()}
                          >
                            <Image
                              src={Pnchingreen}
                              alt="Leave icon"
                              width={15}
                              height={19}
                            />
                            PUNCH IN
                          </button>
                        </div>
                        <div className="col-lg-4 mt-3 ">
                          <span>{StartTime}</span>
                        </div>
                      </>
                    )}
                    {!punchedOut ? (
                      <>
                        <div className="col-lg-7">
                          <button
                            className={dashboard.punchin}
                            onClick={() => modelopenForPunch()}
                          >
                            PUNCH OUT
                          </button>
                        </div>
                        <div className="col-lg-4 mt-3">
                          <span className="mt-3"> PunchOut Time </span>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="col-lg-7">
                          <button
                            className={dashboard.buttonclick}
                            // onClick={() => modelopen()}
                          >
                            <Image
                              src={Pnchingreen}
                              alt="Leave icon"
                              width={15}
                              height={19}
                            />
                            PUNCH OUT
                          </button>
                        </div>
                        &nbsp;
                        <div className="col-lg-4 mt-3 ">
                          <span>{EndTime}</span>
                        </div>
                      </>
                    )}
                  </div>
                  <Modal
                    toggle={() => setModalOpen(!modalOpen)}
                    isOpen={modalOpen}
                  >
                    <div className=" modal-header">
                      <h5 className=" modal-title">Work Type Details </h5>
                      <button
                        aria-label="Close"
                        className={dashboard.close}
                        type="button"
                        onClick={() => setModalOpen(!modalOpen)}
                      >
                        <span aria-hidden={true}>×</span>
                      </button>
                    </div>
                    <ModalBody>
                      <div className="row">
                        <div className="col-lg-12">
                          <select
                            name=""
                            id=""
                            className="form-select"
                            value={WorkTypeID}
                            onChange={(event) =>
                              handleworkType(event.target.value)
                            }
                          >
                            <option value="0">Select One</option>
                            <option value="1">Work From Home</option>
                            <option value="2">Office</option>
                          </select>
                        </div>
                        <div className="row">
                          <div className="col-lg-6">
                            <ModalFooter>
                              {!punchedIn ? (
                                <button
                                  color="primary"
                                  type="button"
                                  className={
                                    WorkTypeID == 0
                                      ? "button-disabled"
                                      : "button"
                                  }
                                  onClick={() => handlePunchin()}
                                >
                                  Punchin
                                </button>
                              ) : (
                                <button
                                  color="primary"
                                  type="button"
                                  className={
                                    WorkTypeID == 0
                                      ? "button-disabled"
                                      : "button"
                                  }
                                  onClick={() => handlePunchout()}
                                >
                                  PunchOut
                                </button>
                              )}
                            </ModalFooter>
                          </div>
                        </div>
                      </div>
                    </ModalBody>
                  </Modal>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12">
                <div
                  className="card"
                  style={{ borderRadius: "20px", marginTop: "30px" }}
                >
                  <div
                    className="card-body"
                    style={{ marginBottom: "46px", height: "160px" }}
                  >
                    <h5 className="card-title" style={{ color: "#3247d5" }}>
                      Announcement Title
                    </h5>
                    <p className="card-text">Announcement content goes here.</p>
                    <Link
                      className={dashboard.announcement}
                      href="/Announcement"
                    >
                      See All
                      <RiArrowDropDownLine style={{ fontSize: "30px" }} />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={dashboard.card1}>
            <div className="card p-0  mb-4" style={{ borderRadius: "20px" }}>
              <div
                className="card-body"
                style={{
                  backgroundColor: "#B96AE9",
                  borderTopLeftRadius: "20px",
                  borderTopRightRadius: "20px",
                }}
              >
                <div
                  className="d-flex align-items-center"
                  style={{ height: "10px" }}
                >
                  <AiOutlineGift style={{ color: "white", fontSize: "25px" }} />
                  <h5
                    className={dashboard.cardheader}
                    style={{ color: "white" }}
                  >
                    Celebrants
                  </h5>
                </div>
                <p
                  className="card-subtitle mt-1 mb-0"
                  style={{ color: "white" }}
                >
                  Get to know who are the celebrants
                </p>
              </div>
              <div className="col-lg-6 " style={{ marginBottom: "110px" }}>
                <div className="row">
                  <br />
                  <div className="col-lg-12 dashbutton bttn">
                    <div className="tab-slider--nav">
                      <ul className="tab-slider--tabs">
                        <li rel="tab1" onClick={() => setViewMode("tab1")}>
                          All
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* </div> */}
            </div>

            <div className="row">
              <div className="col-md-12">
                <div
                  className="card  p-0 mb-4"
                  style={{ borderRadius: "20px" }}
                >
                  <div
                    className="card-body"
                    style={{
                      backgroundColor: "#FBB584",
                      borderTopLeftRadius: "20px",
                      borderTopRightRadius: "20px",
                    }}
                  >
                    <div
                      className="d-flex align-items-center"
                      style={{ height: "10px" }}
                    >
                      <Image
                        src={leaveIcon}
                        alt="Leave icon"
                        width={20}
                        height={20}
                      />
                      <h5
                        className={dashboard.cardheader}
                        style={{ color: "white" }}
                      >
                        Leaves
                      </h5>
                    </div>
                    <p
                      className="card-subtitle mt-1 mb-0"
                      style={{ color: "white" }}
                    >
                      Always file your leaves on time
                    </p>
                  </div>
                  <div className="card-body">
                    <div className="row">
                      <div className="col-md-6">
                        <button className={dashboard.pendingbtn}>
                          {count} Pending
                        </button>
                      </div>
                      <div className="col-md-6">
                        <button className={dashboard.pendingbtn}>
                          {count} Rejected
                        </button>
                      </div>
                    </div>

                    <br></br>

                    <div className="row">
                      <div className="col-md-6">
                        <button className={dashboard.pendingbtn}>
                          {count} Cancelled
                        </button>
                      </div>
                      <div className="col-md-6">
                        <button className={dashboard.pendingbtn}>
                          {count} Approved
                        </button>
                        <br></br>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={dashboard.card2}>
            <div
              className="card mb-3 "
              id={dashboard.cardCeneter}
              style={{ borderRadius: "20px" }}
            >
              <div className="card-body mb-1" style={{ marginBottom: "10px" }}>
                <div className={dashboard.profileimg}>
                  <Image
                    src={profile}
                    alt="Picture of the author"
                    width={100}
                    height={80}
                  />
                </div>
                <h4 className={dashboard.profilename}>{userName}</h4>
                <p className={dashboard.profilemail}>{userEmail}</p>
                <div>
                  <GaugeChart
                    id="gauge-chart6"
                    nrOfLevels={1}
                    colors={["#3247D5"]}
                    // colors={[
                    //   '#f2efe6', // 0-25%
                    //   '#f2efe6', // 25-50%
                    //   '#f29f05', // 50-75%
                    //   '#f23e3e'  // 75-100%
                    // ]}
                    // arcBackgroundColor="#0074D9"
                    arcWidth={0.1}
                    percent={0.5}
                    textColor={"black"}
                    needleColor={"#afb4bd"}
                    needleBaseColor={"#afb4bd"}
                    textOffsetY={-40}
                    // hideText={true} // If you want to hide the text
                  />
                </div>
                {/* <Image src={images} alt="Picture of the author" width={100} height={80} className={dashboard.profileimg1} /> */}

                <div className={dashboard.profile}>
                  <Link href="/Staff/AddStaff">
                    <button className={dashboard.viewmyprofile}>
                      View My Profile
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <br /> <br />
          <div className="row mt-4 ">
            <div className="col-lg-6 ">
              <div className="card" style={{ borderRadius: "20px" }}>
                <div className="">
                  <h4
                    className={dashboard.cardheader}
                    style={{ color: "#3247d5" }}
                  >
                    Holidays
                  </h4>
                  <p className="card-subtitle">
                    These are the upcoming holidays
                  </p>
                </div>
                {/* </div> */}
                <div className="card-body">
                  <div className="row">
                    <div className="col-lg-4">
                      <Image
                        src={advertising1}
                        alt=""
                        style={{ width: "100%", height: "24vh" }}
                      />
                    </div>
                    <div className="col-lg-8">
                      <Link className={dashboard.holiday} href="/Holiday">
                        See All
                        <RiArrowDropDownLine style={{ fontSize: "30px" }} />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6 ">
              <div className="card p-0 mb-4" style={{ borderRadius: "20px" }}>
                <div
                  className="card-header text-white "
                  style={{
                    backgroundColor: "#18D7C0",
                    borderTopLeftRadius: "20px",
                    borderTopRightRadius: "20px",
                    height: "80px",
                  }}
                >
                  <BiInjection style={{ color: "white", fontSize: "25px" }} />
                  <span
                    className={dashboard.cardheader}
                    style={{ color: "white", fontSize: "24px" }}
                  >
                    COVID-19 Vaccination
                  </span>
                  <p className="card-subtitle mt-1 mb-1">
                    update covid vaccination
                  </p>
                </div>
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-6">
                      <h5>1st Dose</h5>
                    </div>
                    {/* <p>Date:</p> */}
                    <div className="col-md-3">
                      <Link href="/Home/VaccinationForm">
                        <button className="button">Upload</button>
                      </Link>
                    </div>
                    <div className="col-md-3">
                      <button className="button" onClick={() => modelopen()}>
                        <BiEdit style={{ color: "white", fontSize: "25px" }} />
                      </button>
                    </div>
                  </div>
                  <hr></hr>
                  <div className="row">
                    <div className="col-md-6">
                      <h5>2nd Dose</h5>
                    </div>
                    {/* <p>Date:</p> */}
                    <div className="col-md-3">
                      <Link href="/Home/VaccinationForm">
                        <button className="button">Upload</button>
                      </Link>
                    </div>
                    <div className="col-md-3">
                      <button className="button" onClick={() => modelopen()}>
                        <BiEdit style={{ color: "white", fontSize: "25px" }} />
                      </button>
                    </div>
                  </div>
                  <hr></hr>
                  <div className="row">
                    <div className="col-md-6">
                      <h5>3rd Dose</h5>
                    </div>
                    {/* <p>Date:</p> */}
                    <div className="col-md-3">
                      <Link href="/Home/VaccinationForm">
                        <button className="button">Upload</button>
                      </Link>
                    </div>
                    <div className="col-md-3">
                      <button className="button" onClick={() => modelopen()}>
                        <BiEdit style={{ color: "white", fontSize: "25px" }} />
                      </button>
                    </div>
                  </div>
                  {/* TODO---------------modal for vaccination--------------------                */}
                  {/* <Modal toggle={() => modelopen(!modelopen)} isOpen={modelopen}>
                    <div className="modal-header">
                      <h5 className="modal-title">
                        Second Modal Title
                      </h5>
                      <button aria-label="Close" className={dashboard.close} type="button" onClick={() => setModalOpen(!modelopen)}>
                        <span aria-hidden={true}>×</span>
                      </button>
                    </div>
                    <ModalBody>
                      <div className='row'>
                        <div className='col-lg-12'>
                          <input type="text" className="form-control" placeholder="Enter some text" />
                        </div>
                        <div className='row'>
                          <div className="col-lg-6">
                            <ModalFooter>
                              <button color="primary" type="button" className="button">
                                Save Changes
                              </button>
                            </ModalFooter>
                          </div>
                        </div>
                      </div>
                    </ModalBody>
                  </Modal> */}
                  {/* ------------------------- */}
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <h2
                style={{
                  color: "#3247d5",
                  textAlign: "center",
                  fontFamily: "poppins",
                }}
              >
                Company Staff Requests
              </h2>
            </div>
            <div className="col-lg-1"></div>
            <div className="col-lg-5">
              <div className="card p-0" style={{ borderRadius: "20px" }}>
                <div
                  className="card-header bg-primary text-white"
                  style={{
                    borderTopLeftRadius: "20px",
                    borderTopRightRadius: "20px",
                    height: "70px",
                  }}
                >
                  <span>
                    <Image
                      src={leaveIcon}
                      alt="Leave icon"
                      width={25}
                      height={20}
                    />
                    <span
                      style={{ fontSize: "20px" }}
                      className={dashboard.cardheader}
                    >
                      Leaves
                    </span>
                  </span>
                  <div className="col-md-10">
                    <p style={{ marginRight: "20px" }}>
                      Always file your leaves on time
                    </p>
                  </div>
                </div>
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-6">
                      <button className={dashboard.pendingbtn}>
                        {count} Pending
                      </button>
                    </div>
                    <div className="col-md-6">
                      <button className={dashboard.pendingbtn}>
                        {count} Rejected
                      </button>
                    </div>
                  </div>
                  <br></br>
                  <div className="row">
                    <div className="col-md-6">
                      <button className={dashboard.pendingbtn}>
                        {count} Cancelled
                      </button>
                    </div>
                    <div className="col-md-6">
                      <button className={dashboard.pendingbtn}>
                        {count} Approved
                      </button>
                      <br></br>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-5">
              <div className="card p-0" style={{ borderRadius: "20px" }}>
                <div
                  className="card-header  text-white"
                  style={{
                    backgroundColor: "#70be51",
                    borderTopLeftRadius: "20px",
                    borderTopRightRadius: "20px",
                    height: "70px",
                  }}
                >
                  <span>
                    <Image
                      src={leaveIcon}
                      alt="Leave icon"
                      width={25}
                      height={20}
                    />
                    <span
                      style={{ fontSize: "20px" }}
                      className={dashboard.cardheader}
                    >
                      Overtime
                    </span>
                  </span>
                  <div className="col-md-10">
                    <p style={{ marginRight: "20px" }}>
                      Always file your Overtime on time
                    </p>
                  </div>
                </div>
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-6">
                      <button className={dashboard.pendingbtn}>
                        {count} Pending
                      </button>
                    </div>
                    <div className="col-md-6">
                      <button className={dashboard.pendingbtn}>
                        {count} Rejected
                      </button>
                    </div>
                  </div>

                  <br></br>

                  <div className="row">
                    <div className="col-md-6">
                      <button className={dashboard.pendingbtn}>
                        {count} Cancelled
                      </button>
                    </div>
                    <div className="col-md-6">
                      <button className={dashboard.pendingbtn}>
                        {count} Approved
                      </button>
                      <br></br>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-1"></div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
