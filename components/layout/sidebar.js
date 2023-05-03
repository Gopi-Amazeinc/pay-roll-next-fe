import Link from "next/link";
import React, { useState, useEffect } from "react";
import styles from "./layout.module.css";
import { BiBarChartSquare } from "react-icons/bi";
import { BiGroup } from "react-icons/bi";
import { RiUserShared2Line } from "react-icons/ri";
import { BiCalendar } from "react-icons/bi";
import { BiCalendarExclamation } from "react-icons/bi";
import { BiCalendarCheck } from "react-icons/bi";
import { BiCalendarPlus } from "react-icons/bi";
import { HiOutlineUserGroup } from "react-icons/hi";
import { BiSpreadsheet } from "react-icons/bi";
import { FiUpload } from "react-icons/fi";
import { GiMoneyStack } from "react-icons/gi";
import { RiSettings4Line } from "react-icons/ri";
import { RiUserStarLine } from "react-icons/ri";
import { IoMdHelpCircleOutline } from "react-icons/io";
import { HiOutlineTicket } from "react-icons/hi";
import { RiFileUserLine } from "react-icons/ri";
import { GiReceiveMoney } from "react-icons/gi";
import { GiTakeMyMoney } from "react-icons/gi";
import { HiOutlinePlay } from "react-icons/hi";
import { HiOutlineDocumentText } from "react-icons/hi";
import { HiOutlineDocumentSearch } from "react-icons/hi";
import { AiOutlineBank } from "react-icons/ai";
import { TbMoneybag } from "react-icons/tb";
import { TbBrandCitymapper } from "react-icons/tb";
import { TbReceiptTax } from "react-icons/tb";
import { MdOutlineAutoAwesomeMotion } from "react-icons/md";
import { MdOutlineAutoAwesomeMosaic } from "react-icons/md";
import { RiUserLine } from "react-icons/ri";
import { TbReportSearch } from "react-icons/tb";
import { TbReportAnalytics } from "react-icons/tb";
import { TbReport } from "react-icons/tb";
import { AiOutlineHome } from "react-icons/ai";

const Sidebar = ({ children, applyPageName }) => {
  let roleID;
  let [userRole, setUserRole] = useState();

  let [displayStaff, tooggleStaff] = useState(false);
  let [displayOt, toggleOt] = useState(false);

  let [displayAttendence, toggleAttendence] = useState(false);
  let [displayLoans, toggleLoans] = useState(false);
  let [displayPayroll, togglePayRoll] = useState(false);
  let [displayIntialRun, toggleIntialRun] = useState(false);
  let [displayFinalRun, toggleFinalRun] = useState(false);
  let [displaySettings, toggleSettings] = useState(false);
  let [displayConfiguration, toggleConfiguration] = useState(false);
  let [displayMasters, toggleMasters] = useState(false);
  let [displayRequests, toggleRequests] = useState(false);
  let [displayComapnay, togleCompany] = useState(false);
  let [displayReports, togleReports] = useState(false);
  let [dispalyPagibig, togglePagibig] = useState(false)
  let [dispalyTaxReports, toggleTaxReports] = useState(false)
  let [dispalyBIR, toggleBIR] = useState(false)
  // let [displayHolidays, toggleHolidays] = useState(false)
  // sessionStorage.setItem("roleID", roleID);

  const [activeMenu, setActiveMenu] = useState(1);
  const updateActiveMenu = (data) => {
    setActiveMenu(data.id);
    console.log(activeMenu);
    sessionStorage.setItem("menuID", data.id);
    sessionStorage.setItem("toggleAttendence", displayAttendence);
    sessionStorage.setItem("toggleRequests", displayRequests);
    sessionStorage.setItem("togglePayRoll", displayPayroll);
    // applyPageName(data.name);
  };

  useEffect(() => {
    const userRoleID = sessionStorage.getItem("roleID");
    setUserRole(userRoleID);

    let mid = sessionStorage.getItem("menuID");
    if (mid) {
      setActiveMenu(mid);
    }

    const menuID = sessionStorage.getItem("menuID");

    if (menuID === "21") {
      tooggleStaff(true);
    } else {
      tooggleStaff(false);
    }

    if (menuID === "41") {
      toggleAttendence(true);
    } else {
      toggleAttendence(false);
    }

    if (menuID === "51" || menuID === "52") {
      toggleRequests(true);
    } else {
      toggleRequests(false);
    }

    if (menuID === "61") {
      toggleLoans(true);
    } else {
      toggleLoans(false);
    }

    if (menuID === "61" || menuID === "62" || menuID === "63") {
      togglePayRoll(true);
    } else {
      togglePayRoll(false);
    }
  }, []);

  const getStyle = (menuID) => {
    if (menuID == activeMenu) {
      return styles["sidemenuactive"];
    }
    return styles["sidemenu"];
  };

  const getSubStyle = (menuID) => {
    if (menuID == activeMenu) return styles["sidesubmenuactive"];
    else return styles["sidesubmenu"];
  };

  const getSubofSubStyle = (menuID) => {
    if (menuID == activeMenu) return styles["sidesubofsubmenuactive"];
    else return styles["sidesubofsubmenu"];
  };

  const customStyles = {
    icons: {
      fontSize: "20px",
      marginRight: "5%",
    },
  };

  const togleReportsMeanu = () => {
    togleReports(!displayReports);
    sessionStorage.setItem("togleReports", displayReports);
  };

  const togglePagibigMenu = () => {
    togglePagibig(!dispalyPagibig);
    sessionStorage.setItem("toggglePagibig", dispalyPagibig);
  };

  const toggleTaxReportsMenu = () => {
    toggleTaxReports(!dispalyTaxReports);
    sessionStorage.setItem("toggleTaxReports", dispalyTaxReports);
  };

  const toggleBIRMenu = () => {
    toggleBIR(!dispalyBIR);
    sessionStorage.setItem("toggleBIR", dispalyBIR);
  };


  const toggleOtMenu = () => {
    toggleOt(!displayOt);
    sessionStorage.setItem("tooggleOt", displayOt);
  };
  const tooggleStaffMenu = () => {
    tooggleStaff(!displayStaff);
    sessionStorage.setItem("tooggleStaff", displayStaff);
  };
  const toggleAttendenceMenu = () => {
    toggleAttendence(!displayAttendence);
    sessionStorage.setItem("toggleAttendence", displayAttendence);
  };
  const togglerequestsMenu = () => {
    toggleRequests(!displayRequests);
    sessionStorage.setItem("toggleRequests", displayRequests);
  };

  /* const toggleRequestsMenu = () => {
    setDisplayRequests(!displayRequests);
    UpdateActive({
      id: 51,
      name: "Leave Requests"
    });
  }; */
  const toggleLoansMenu = () => {
    toggleLoans(!displayLoans);
    sessionStorage.setItem(" toggleLoans", displayPayroll);
  };

  const togglePayRollMenu = () => {
    togglePayRoll(!displayPayroll);
    sessionStorage.setItem("togglePayroll", displayPayroll);
  };
  const toggleIntialRunMenu = () => {
    toggleIntialRun(!displayIntialRun);
    sessionStorage.setItem("toggleIntialRun", displayIntialRun);
  };
  const toggleFinalRunMenu = () => {
    toggleFinalRun(!displayFinalRun);
    sessionStorage.setItem("toggleFinalRun", displayFinalRun);
  };
  const toggleCompanyMenu = () => {
    togleCompany(!displayComapnay);
    sessionStorage.setItem("togleCompany", displayComapnay);
  };

  const toggleSettingsMenu = () => {
    toggleSettings(!displaySettings);
    sessionStorage.setItem("toggleSettings", displaySettings);
  };

  const toggleConfigurationMenu = () => {
    toggleConfiguration(!displayConfiguration);
    sessionStorage.setItem("toggleConfiguration", displayRequests);
  };
  const toggleMastersMenu = () => {
    toggleMasters(!displayMasters);
    sessionStorage.setItem("toggleRequests", displayRequests);
  };

  // const toggleHolidaysMenu = () => {
  //     toggleHolidays(!displayHolidays);
  // };
  return (
    <div className="row" style={{ height: "90vh", overflowY: "auto" }}>
      <div className="col-lg-12">
        <Link href="/Home/dashboard" className={styles.sidemenulink}>
          <button
            className={getStyle(1)}
            onClick={updateActiveMenu.bind(this, { id: 1, name: "Dashboard" })}
          >
            <AiOutlineHome style={customStyles.icons} />
            Home
          </button>
        </Link>
        {userRole == 9 ||
          (userRole == 17 && (
            <div>
              <hr></hr>
              <button className={styles.sidemenu} onClick={tooggleStaffMenu}>
                <BiGroup style={customStyles.icons} />
                Staff
              </button>
              {displayStaff && (
                <div>
                  <Link
                    href="/Staff/StaffDashboard"
                    className={styles.sidemenulink}
                  >
                    <button
                      className={getSubStyle(21)}
                      onClick={updateActiveMenu.bind(this, {
                        id: 21,
                        name: "Staff Dashboard",
                      })}
                    >
                      <BiGroup style={customStyles.icons} />
                      Staff Dashboard
                    </button>
                  </Link>
                  <Link href="/Staff/AddStaff" className={styles.sidemenulink}>
                    <button
                      className={getSubStyle(22)}
                      onClick={updateActiveMenu.bind(this, {
                        id: 22,
                        name: " Add Staff ",
                      })}
                    >
                      <BiGroup style={customStyles.icons} />
                      Add Staff
                    </button>
                  </Link>
                  <Link
                    href="/Staff/StaffSalary"
                    className={styles.sidemenulink}
                  >
                    <button
                      className={getSubStyle(23)}
                      onClick={updateActiveMenu.bind(this, {
                        id: 23,
                        name: "Staff Salary",
                      })}
                    >
                      <TbMoneybag style={customStyles.icons} />
                      Staff Salary
                    </button>
                  </Link>
                  <Link href="/Staff/ComponentBulkUpload">
                    <button
                      className={getSubStyle(24)}
                      onClick={updateActiveMenu.bind(this, {
                        id: 24,
                        name: "Component Bulk Upload",
                      })}
                    >
                      <FiUpload style={customStyles.icons} />
                      Component Bulk Upload
                    </button>
                  </Link>
                </div>
              )}
            </div>
          ))}

        <hr></hr>
        <button className={styles.sidemenu} onClick={toggleOtMenu}>
          <BiCalendar style={customStyles.icons} />
          OT
        </button>
        {displayOt && (
          <div>
            <Link href="/OT" className={styles.sidemenulink}>
              <button
                className={getSubStyle(31)}
                onClick={updateActiveMenu.bind(this, {
                  id: 31,
                  name: "Over time details",
                })}
              >
                <BiCalendarCheck style={customStyles.icons} />
                Over Time Details
              </button>
            </Link>
          </div>
        )}

        <hr></hr>
        <button className={styles.sidemenu} onClick={toggleAttendenceMenu}>
          <BiCalendar style={customStyles.icons} />
          Attendance
        </button>
        {displayAttendence && (
          <div>
            <Link
              href="/Attendance/AttendanceDetails"
              className={styles.sidemenulink}
            >
              <button
                className={getSubStyle(41)}
                onClick={updateActiveMenu.bind(this, {
                  id: 41,
                  name: "Attendence Details",
                })}
              >
                <BiCalendarCheck style={customStyles.icons} />
                Attendance Details
              </button>
            </Link>

            <Link
              href="/Attendance/OverTimeUnitsUpload"
              className={styles.sidemenulink}
            >
              <button
                className={getSubStyle(42)}
                onClick={updateActiveMenu.bind(this, {
                  id: 42,
                  name: "Overtime Units Upload",
                })}
              >
                <BiCalendarPlus style={customStyles.icons} />
                Overtime Units Upload
              </button>
            </Link>

            <Link
              href="/Attendance/AttendanceCorrections"
              className={styles.sidemenulink}
            >
              <button
                className={getSubStyle(43)}
                onClick={updateActiveMenu.bind(this, {
                  id: 43,
                  name: "Attendance Correction",
                })}
              >
                <BiCalendarExclamation style={customStyles.icons} />
                Attendance Correction
              </button>
            </Link>
            <Link
              href="/Attendance/ShiftDetails"
              className={styles.sidemenulink}
            >
              <button
                className={getSubStyle(44)}
                onClick={updateActiveMenu.bind(this, {
                  id: 44,
                  name: "Shift Details",
                })}
              >
                <BiCalendarExclamation style={customStyles.icons} />
                Shift Details
              </button>
            </Link>
          </div>
        )}

        <hr></hr>
        <button className={styles.sidemenu} onClick={togglerequestsMenu}>
          <HiOutlineUserGroup style={customStyles.icons} />
          Requests
        </button>
        {displayRequests && (
          <div>
            <Link href="/Requests/Leaverequest">
              <button
                className={getSubStyle(51)}
                onClick={updateActiveMenu.bind(this, {
                  id: 51,
                  name: "Leave Requests",
                })}
              >
                <RiUserShared2Line style={customStyles.icons} />
                Leave Requests
              </button>
            </Link>
            <Link href="/Requests/Overtimedetails">
              <button
                className={getSubStyle(52)}
                onClick={updateActiveMenu.bind(this, {
                  id: 52,
                  name: "Over Time Details",
                })}
              >
                <RiFileUserLine style={customStyles.icons} />
                Over Time Details
              </button>
            </Link>
            <Link href="/Requests/Applyloans">
              <button
                className={getSubStyle(53)}
                onClick={updateActiveMenu.bind(this, {
                  id: 53,
                  name: "Loan Requests",
                })}
              >
                <RiUserShared2Line style={customStyles.icons} />
                Loan Requests
              </button>
            </Link>
            <Link href="/Requests/timesheet">
              <button
                className={getSubStyle(54)}
                onClick={updateActiveMenu.bind(this, {
                  id: 54,
                  name: "Timesheet Requests",
                })}
              >
                <RiFileUserLine style={customStyles.icons} />
                Timesheet Requests(doubt)
              </button>
            </Link>
            <Link href="/Requests/Locatorrequest">
              <button
                className={getSubStyle(55)}
                onClick={updateActiveMenu.bind(this, {
                  id: 55,
                  name: "Obasis Requests",
                })}
              >
                <RiUserShared2Line style={customStyles.icons} />
                Obasis Requests
              </button>
            </Link>
            <Link href="/Requests/Compensationtimeout">
              <button
                className={getSubStyle(56)}
                onClick={updateActiveMenu.bind(this, {
                  id: 56,
                  name: "Compensation Requests",
                })}
              >
                <RiFileUserLine style={customStyles.icons} />
                Compensation Requests
              </button>
            </Link>
          </div>
        )}

        <hr></hr>

        <button className={styles.sidemenu} onClick={toggleLoansMenu}>
          <BiSpreadsheet style={customStyles.icons} />
          Loans
        </button>
        {displayLoans && (
          <div>
            <Link href="/Loans/teamloans">
              <button
                className={getSubStyle(61)}
                onClick={updateActiveMenu.bind(this, {
                  id: 61,
                  name: "Loans Upload",
                })}
              >
                <FiUpload style={customStyles.icons} />
                Loans Upload
              </button>
            </Link>
          </div>
        )}
        {userRole == 17 && (
          <div>
            <hr></hr>
            <button className={styles.sidemenu} onClick={togglePayRollMenu}>
              <GiMoneyStack style={customStyles.icons} />
              Payroll
            </button>
            {displayPayroll && (
              <>
                <button
                  className={styles.subsidemenu}
                  onClick={toggleIntialRunMenu}
                >
                  <GiMoneyStack style={customStyles.icons} />
                  Initial Run
                </button>
                {displayIntialRun && (
                  <div>
                    <Link href="/Payroll/InitialPayroll">
                      <button
                        className={getSubofSubStyle(710)}
                        onClick={updateActiveMenu.bind(this, {
                          id: 710,
                          name: " payroll Summary",
                        })}
                      >
                        <GiReceiveMoney style={customStyles.icons} />
                        Payroll Summary
                      </button>
                    </Link>

                    <Link href="/Payroll/InitialPayrollDetails">
                      <button
                        className={getSubofSubStyle(711)}
                        onClick={updateActiveMenu.bind(this, {
                          id: 711,
                          name: "payroll details",
                        })}
                      >
                        <GiTakeMyMoney style={customStyles.icons} />
                        Payroll Details
                      </button>
                    </Link>
                  </div>
                )}
                <button
                  className={styles.subsidemenu}
                  onClick={toggleFinalRunMenu}
                >
                  <GiMoneyStack style={customStyles.icons} />
                  final Run
                </button>
                {displayFinalRun && (
                  <>
                    <Link href="/Payroll/RunFinalPayroll">
                      <button
                        className={getSubofSubStyle(721)}
                        onClick={updateActiveMenu.bind(this, {
                          id: 721,
                          name: "Run final payroll",
                        })}
                      >
                        <HiOutlinePlay style={customStyles.icons} />
                        Run Payroll
                      </button>
                    </Link>

                    <Link href="/Payroll/FinalPayrollApproval">
                      <button
                        className={getSubofSubStyle(722)}
                        onClick={updateActiveMenu.bind(this, {
                          id: 722,
                          name: "Final payroll approval",
                        })}
                      >
                        <HiOutlineDocumentText style={customStyles.icons} />
                        Final Approval
                      </button>
                    </Link>

                    <Link href="/Payroll/FinalPayrollDetails">
                      <button
                        className={getSubofSubStyle(723)}
                        onClick={updateActiveMenu.bind(this, {
                          id: 723,
                          name: "Final payroll details",
                        })}
                      >
                        <HiOutlineDocumentSearch style={customStyles.icons} />
                        Final Details
                      </button>
                    </Link>
                  </>
                )}

                <Link href="/Payroll/BankAdviceList">
                  <button
                    className={getSubStyle(76)}
                    onClick={updateActiveMenu.bind(this, {
                      id: 76,
                      name: "Bank advice list",
                    })}
                  >
                    <AiOutlineBank style={customStyles.icons} />
                    Bank advice list
                  </button>
                </Link>
                <Link href="/Payroll/PayrollYTD">
                  <button
                    className={getSubStyle(77)}
                    onClick={updateActiveMenu.bind(this, {
                      id: 78,
                      name: "Payroll YTD upload",
                    })}
                  >
                    <FiUpload style={customStyles.icons} />
                    Payroll YTD upload
                  </button>
                </Link>
              </>
            )}
          </div>
        )}

        {userRole == 17 && (
          <div>
            <hr></hr>
            <button className={styles.sidemenu} onClick={toggleCompanyMenu}>
              <RiSettings4Line style={customStyles.icons} />
              Company
            </button>
            {displayComapnay && (
              <div>
                <Link href="/Company">
                  <button
                    className={getSubStyle(81)}
                    onClick={updateActiveMenu.bind(this, {
                      id: 81,
                      name: "Company Dashboard",
                    })}
                  >
                    <TbBrandCitymapper style={customStyles.icons} />
                    Company Details
                  </button>
                </Link>
              </div>
            )}
          </div>
        )}

        {userRole == 17 && (
          <div>
            <hr></hr>
            <button className={styles.sidemenu} onClick={toggleSettingsMenu}>
              <RiSettings4Line style={customStyles.icons} />
              Settings
            </button>
            {displaySettings && (
              <div>
                <Link href="/Settings/PayperiodSetting">
                  <button
                    className={getSubStyle(91)}
                    onClick={updateActiveMenu.bind(this, {
                      id: 91,
                      name: "Pay period ",
                    })}
                  >
                    <TbBrandCitymapper style={customStyles.icons} />
                    Pay period
                  </button>
                </Link>
                <Link href="/Settings/AnnualTax">
                  <button
                    className={getSubStyle(92)}
                    onClick={updateActiveMenu.bind(this, {
                      id: 92,
                      name: "Annual tax",
                    })}
                  >
                    <TbReceiptTax style={customStyles.icons} />
                    Annual tax
                  </button>
                </Link>
                <Link href="/Settings/SemiMonthlyTax">
                  <button
                    className={getSubStyle(93)}
                    onClick={updateActiveMenu.bind(this, {
                      id: 93,
                      name: "Semi monthly tax",
                    })}
                  >
                    <TbReceiptTax style={customStyles.icons} />
                    Semi monthly tax
                  </button>
                </Link>
                <Link href="/Settings/SSS">
                  <button
                    className={getSubStyle(94)}
                    onClick={updateActiveMenu.bind(this, {
                      id: 94,
                      name: "SSS",
                    })}
                  >
                    <MdOutlineAutoAwesomeMotion style={customStyles.icons} />
                    SSS
                  </button>
                </Link>
                <Link href="/Settings/Philhealth">
                  <button
                    className={getSubStyle(121)}
                    onClick={updateActiveMenu.bind(this, {
                      id: 121,
                      name: "Philhealth",
                    })}
                  >
                    <TbReceiptTax style={customStyles.icons} />
                    Philhealth
                  </button>
                </Link>

                <Link href="/Settings/Mpf">
                  <button
                    className={getSubStyle(122)}
                    onClick={updateActiveMenu.bind(this, {
                      id: 122,
                      name: "MPF",
                    })}
                  >
                    <MdOutlineAutoAwesomeMotion style={customStyles.icons} />
                    MPF
                  </button>
                </Link>

                <Link href="/Settings/Pagibig">
                  <button
                    className={getSubStyle(123)}
                    onClick={updateActiveMenu.bind(this, {
                      id: 123,
                      name: "Pagibig",
                    })}
                  >
                    <MdOutlineAutoAwesomeMosaic style={customStyles.icons} />
                    Pagibig
                  </button>
                </Link>



              </div>
            )}
          </div>
        )}

        {/* {userRole == 17 && (
          <div>
            <hr></hr>

            <button
              className={styles.sidemenu}
              onClick={toggleConfigurationMenu}
            >
              <AiOutlineControl style={customStyles.icons} />
              Configuration
            </button>
            {displayConfiguration && (
              <div>
                <Link href="/Configuration/annualtax">
                  <button
                    className={getSubStyle(72)}
                    onClick={updateActiveMenu.bind(this, {
                      id: 72,
                      name: "Annual tax",
                    })}
                  >
                    <TbReceiptTax style={customStyles.icons} />
                    Annual tax
                  </button>
                </Link>

                <Link href="/Configuration/semitax">
                  <button
                    className={getSubStyle(73)}
                    onClick={updateActiveMenu.bind(this, {
                      id: 73,
                      name: "Semi monthly tax",
                    })}
                  >
                    <TbReceiptTax style={customStyles.icons} />
                    Semi monthly tax
                  </button>
                </Link>

                <Link href="/Configuration/sss">
                  <button
                    className={getSubStyle(74)}
                    onClick={updateActiveMenu.bind(this, {
                      id: 74,
                      name: "SSS",
                    })}
                  >
                    <MdOutlineAutoAwesomeMotion style={customStyles.icons} />
                    SSS
                  </button>
                </Link>

                <Link href="/Configuration/philhealth">
                  <button
                    className={getSubStyle(75)}
                    onClick={updateActiveMenu.bind(this, {
                      id: 75,
                      name: "Philhealth",
                    })}
                  >
                    <TbReceiptTax style={customStyles.icons} />
                    Philhealth
                  </button>
                </Link>

                <Link href="/Configuration/mpf">
                  <button
                    className={getSubStyle(76)}
                    onClick={updateActiveMenu.bind(this, {
                      id: 76,
                      name: "MPF",
                    })}
                  >
                    <MdOutlineAutoAwesomeMotion style={customStyles.icons} />
                    MPF
                  </button>
                </Link>

                <Link href="/Configuration/pagibig">
                  <button
                    className={getSubStyle(77)}
                    onClick={updateActiveMenu.bind(this, {
                      id: 77,
                      name: "Pagibig",
                    })}
                  >
                    <MdOutlineAutoAwesomeMosaic style={customStyles.icons} />
                    Pagibig
                  </button>
                </Link>

                <Link href="/Configuration/dailyrate">
                  <button
                    className={getSubStyle(78)}
                    onClick={updateActiveMenu.bind(this, {
                      id: 78,
                      name: "Daily rate",
                    })}
                  >
                    <MdOutlineAutoAwesomeMosaic style={customStyles.icons} />
                    Daily rate
                  </button>
                </Link>
              </div>
            )}
          </div>
        )} */}
        {(userRole == 9 ||
          userRole == 17) && (
            <div>
              <hr></hr>
              <button className={styles.sidemenu} onClick={toggleMastersMenu}>
                <RiUserStarLine style={customStyles.icons} />
                Masters
              </button>
              {(userRole == 9 && displayMasters) && (
                <div>
                  <Link href="/Masters/LeaveType">
                    <button
                      className={getSubStyle(101)}
                      onClick={updateActiveMenu.bind(this, {
                        id: 101,
                        name: "Leave type",
                      })}
                    >
                      <RiUserLine style={customStyles.icons} />
                      Leave type
                    </button>
                  </Link>

                  <Link href="/Masters/LoanMaster">
                    <button
                      className={getSubStyle(102)}
                      onClick={updateActiveMenu.bind(this, {
                        id: 102,
                        name: "Loan type",
                      })}
                    >
                      <RiUserLine style={customStyles.icons} />
                      Loan type
                    </button>
                  </Link>

                  <Link href="/Masters/ShiftMaster">
                    <button
                      className={getSubStyle(103)}
                      onClick={updateActiveMenu.bind(this, {
                        id: 103,
                        name: "Shift master",
                      })}
                    >
                      <RiUserLine style={customStyles.icons} />
                      Shift master
                    </button>
                  </Link>

                  <Link href="/Masters/CountryMaster">
                    <button
                      className={getSubStyle(104)}
                      onClick={updateActiveMenu.bind(this, {
                        id: 104,
                        name: "Country master",
                      })}
                    >
                      <RiUserLine style={customStyles.icons} />
                      Country master
                    </button>
                  </Link>

                  <Link href="/Masters/StateMaster">
                    <button
                      className={getSubStyle(105)}
                      onClick={updateActiveMenu.bind(this, {
                        id: 105,
                        name: "Province master",
                      })}
                    >
                      <RiUserLine style={customStyles.icons} />
                      Province master
                    </button>
                  </Link>

                  <Link href="/Masters/CityMaster">
                    <button
                      className={getSubStyle(106)}
                      onClick={updateActiveMenu.bind(this, {
                        id: 106,
                        name: "City master",
                      })}
                    >
                      <RiUserLine style={customStyles.icons} />
                      City master
                    </button>
                  </Link>

                  <Link href="/Masters/BarangayMaster">
                    <button
                      className={getSubStyle(107)}
                      onClick={updateActiveMenu.bind(this, {
                        id: 107,
                        name: "Barangay master",
                      })}
                    >
                      <RiUserLine style={customStyles.icons} />
                      Barangay master
                    </button>
                  </Link>

                  <Link href="/Masters/DepartmentMaster">
                    <button
                      className={getSubStyle(108)}
                      onClick={updateActiveMenu.bind(this, {
                        id: 108,
                        name: "Department master",
                      })}
                    >
                      <RiUserLine style={customStyles.icons} />
                      Department master
                    </button>
                  </Link>

                  <Link href="/Masters/DivisionMaster">
                    <button
                      className={getSubStyle(109)}
                      onClick={updateActiveMenu.bind(this, {
                        id: 109,
                        name: "Division master",
                      })}
                    >
                      <RiUserLine style={customStyles.icons} />
                      Division master
                    </button>
                  </Link>

                  <Link href="/Masters/WorkLocationMaster">
                    <button
                      className={getSubStyle(110)}
                      onClick={updateActiveMenu.bind(this, {
                        id: 110,
                        name: "Worklocation master",
                      })}
                    >
                      <RiUserLine style={customStyles.icons} />
                      Worklocation master
                    </button>
                  </Link>

                  <Link href="/Masters/BrandMaster">
                    <button
                      className={getSubStyle(111)}
                      onClick={updateActiveMenu.bind(this, {
                        id: 111,
                        name: "Band master",
                      })}
                    >
                      <RiUserLine style={customStyles.icons} />
                      Band master
                    </button>
                  </Link>

                  <Link href="/Masters/SubSidaryMaster">
                    <button
                      className={getSubStyle(112)}
                      onClick={updateActiveMenu.bind(this, {
                        id: 112,
                        name: "Subsidiary master",
                      })}
                    >
                      <RiUserLine style={customStyles.icons} />
                      Subsidiary master
                    </button>
                  </Link>

                  <Link href="/Masters/OtMaster">
                    <button
                      className={getSubStyle(113)}
                      onClick={updateActiveMenu.bind(this, {
                        id: 113,
                        name: "OT master",
                      })}
                    >
                      <RiUserLine style={customStyles.icons} />
                      OT master
                    </button>
                  </Link>

                  <Link href="/Masters/PositionMaster">
                    <button
                      className={getSubStyle(114)}
                      onClick={updateActiveMenu.bind(this, {
                        id: 114,
                        name: "Position master",
                      })}
                    >
                      <RiUserLine style={customStyles.icons} />
                      Position master
                    </button>
                  </Link>

                  <Link href="/Masters/JobLevel">
                    <button
                      className={getSubStyle(115)}
                      onClick={updateActiveMenu.bind(this, {
                        id: 115,
                        name: "Job level type",
                      })}
                    >
                      <RiUserLine style={customStyles.icons} />
                      Job level type
                    </button>
                  </Link>

                  <Link href="/Masters/GroupMaster">
                    <button
                      className={getSubStyle(116)}
                      onClick={updateActiveMenu.bind(this, {
                        id: 116,
                        name: "Group master",
                      })}
                    >
                      <RiUserLine style={customStyles.icons} />
                      Group master
                    </button>
                  </Link>

                  <Link href="/Masters/SubSectionMaster">
                    <button
                      className={getSubStyle(117)}
                      onClick={updateActiveMenu.bind(this, {
                        id: 117,
                        name: "Sub-section master",
                      })}
                    >
                      <RiUserLine style={customStyles.icons} />
                      Sub-section master
                    </button>
                  </Link>
                  {/* added code from configuartion here */}

                  <Link href="/Configuration/dailyrate">
                    <button
                      className={getSubStyle(124)}
                      onClick={updateActiveMenu.bind(this, {
                        id: 124,
                        name: "Daily rate",
                      })}
                    >
                      <MdOutlineAutoAwesomeMosaic style={customStyles.icons} />
                      Daily rate(D)
                    </button>
                  </Link>


                  {/* code ends for data configuration here */}
                </div>
              )}
              {(userRole == 17 && displayMasters) && (
                <>
                  {/* <Link href="/Settings/componentmaster">
                  <button
                    className={getSubStyle(91)}
                    onClick={updateActiveMenu.bind(this, {
                      id: 91,
                      name: "Component master",
                    })}
                  >
                    <TbBrandCitymapper style={customStyles.icons} />
                    Component master
                  </button>
                </Link> */}

                  <Link href="/Settings/componentmapping">
                    <button
                      className={getSubStyle(92)}
                      onClick={updateActiveMenu.bind(this, {
                        id: 92,
                        name: "Component mapping",
                      })}
                    >
                      <TbBrandCitymapper style={customStyles.icons} />
                      Component mapping
                    </button>
                  </Link>

                  <Link href="/Settings/bir2316mapping">
                    <button
                      className={getSubStyle(93)}
                      onClick={updateActiveMenu.bind(this, {
                        id: 93,
                        name: "BIR2316 Master",
                      })}
                    >
                      <TbBrandCitymapper style={customStyles.icons} />
                      BIR2316 Master
                    </button>
                  </Link>
                </>
              )}
            </div>
          )}
        {/* )} */}
        {userRole == 6 && (
          <div>
            <hr></hr>
            <Link href="/Holiday" className={styles.sidemenulink}>
              <button
                className={getStyle(201)}
                onClick={updateActiveMenu.bind(this, {
                  id: 201,
                  name: "Holidays",
                })}
              >
                <BiCalendar style={customStyles.icons} />
                Holidays
              </button>
            </Link>
          </div>
        )}
        {userRole == 17 && (
          <div>
            <hr></hr>
            <button className={styles.sidemenu} onClick={togleReportsMeanu}>
              <TbReportSearch style={customStyles.icons} />
              Reports
            </button>
            {displayReports && (
              <div>
                <button className={styles.sidesubmenu} onClick={togglePagibigMenu}>
                  <TbReportSearch style={customStyles.icons} />
                  Pagibig
                </button>
                {
                  dispalyPagibig && (
                    <div>
                      <Link href="/Reports/Pagibig/pagibigmonthly">
                        <button
                          className={getSubStyle(1001)}
                          onClick={updateActiveMenu.bind(this, {
                            id: 1001,
                            name: "PAGIBIG MONTHLY",
                          })}
                        >
                          <TbReportAnalytics style={customStyles.icons} />
                          PAGIBIG MONTHLY
                        </button>
                      </Link>

                      <Link href="/Reports/Pagibig/m1excel">
                        <button
                          className={getSubStyle(1002)}
                          onClick={updateActiveMenu.bind(this, {
                            id: 1002,
                            name: "M1-Excel",
                          })}
                        >
                          <TbReportAnalytics style={customStyles.icons} />
                          M1-EXCEL
                        </button>
                      </Link>

                      <Link href="/Reports/Pagibig/m1mcrf">
                        <button
                          className={getSubStyle(1003)}
                          onClick={updateActiveMenu.bind(this, {
                            id: 1003,
                            name: "M1 MCRF",
                          })}
                        >
                          <TbReportAnalytics style={customStyles.icons} />
                          M1-MCRF
                        </button>
                      </Link>

                      <Link href="/Reports/Pagibig/pagibigml1report">
                        <button
                          className={getSubStyle(1004)}
                          onClick={updateActiveMenu.bind(this, {
                            id: 1004,
                            name: "ML1-REPORT",
                          })}
                        >
                          <TbReportAnalytics style={customStyles.icons} />
                          ML1-REPORT
                        </button>
                      </Link>


                      <Link href="/Reports/Pagibig/pagibigp2report">
                        <button
                          className={getSubStyle(1005)}
                          onClick={updateActiveMenu.bind(this, {
                            id: 1005,
                            name: "P2-4",
                          })}
                        >
                          <TbReportAnalytics style={customStyles.icons} />
                          P2-4
                        </button>
                      </Link>

                      <Link href="/Reports/Pagibig/stlrf">
                        <button
                          className={getSubStyle(1006)}
                          onClick={updateActiveMenu.bind(this, {
                            id: 1006,
                            name: "STLRF",
                          })}
                        >
                          <TbReportAnalytics style={customStyles.icons} />
                          STLRF
                        </button>
                      </Link>

                      <Link href="/Reports/Pagibig/stlrfexcel">
                        <button
                          className={getSubStyle(1007)}
                          onClick={updateActiveMenu.bind(this, {
                            id: 1007,
                            name: "STLRF EXCEL",
                          })}
                        >
                          <TbReportAnalytics style={customStyles.icons} />
                          STLRF EXCEL
                        </button>
                      </Link>
                    </div>
                  )
                }

                <button className={styles.sidesubmenu} onClick={toggleTaxReportsMenu}>
                  <TbReportSearch style={customStyles.icons} />
                  Tax Reports
                </button>
                {
                  dispalyTaxReports && (
                    <div>
                      <Link href="/Reports/TaxReports/withholdingtaxreport">
                        <button
                          className={getSubStyle(2001)}
                          onClick={updateActiveMenu.bind(this, {
                            id: 2001,
                            name: "WITHHOLDING TAX",
                          })}
                        >
                          <TbReportAnalytics style={customStyles.icons} />
                          WithHolding Tax
                        </button>
                      </Link>
                    </div>
                  )
                }

                <button className={styles.sidesubmenu} onClick={toggleBIRMenu}>
                  <TbReportSearch style={customStyles.icons} />
                  BIR
                </button>
                {
                  dispalyBIR && (
                    <div>
                      <Link href="/Reports/BIR/bir1601c">
                        <button
                          className={getSubStyle(3001)}
                          onClick={updateActiveMenu.bind(this, {
                            id: 3001,
                            name: "1601-C",
                          })}
                        >
                          <TbReportAnalytics style={customStyles.icons} />
                          1601-C
                        </button>
                      </Link>

                      <Link href="/Reports/BIR/bir1604c">
                        <button
                          className={getSubStyle(3002)}
                          onClick={updateActiveMenu.bind(this, {
                            id: 3002,
                            name: "1604-C",
                          })}
                        >
                          <TbReportAnalytics style={customStyles.icons} />
                          1604-C
                        </button>
                      </Link>

                      <Link href="/Reports/BIR/bir1604cf">
                        <button
                          className={getSubStyle(3003)}
                          onClick={updateActiveMenu.bind(this, {
                            id: 3003,
                            name: "1604-CF",
                          })}
                        >
                          <TbReportAnalytics style={customStyles.icons} />
                          1604-CF
                        </button>
                      </Link>

                      <Link href="/Reports/BIR/bir2316">
                        <button
                          className={getSubStyle(3004)}
                          onClick={updateActiveMenu.bind(this, {
                            id: 3004,
                            name: "2316",
                          })}
                        >
                          <TbReportAnalytics style={customStyles.icons} />
                          2316
                        </button>
                      </Link>


                      <Link href="/Reports/BIR/biralphalist7">
                        <button
                          className={getSubStyle(3005)}
                          onClick={updateActiveMenu.bind(this, {
                            id: 3005,
                            name: "Alpha List",
                          })}
                        >
                          <TbReportAnalytics style={customStyles.icons} />
                          Alpha List
                        </button>
                      </Link>

                      <Link href="/Reports/BIR/bir1604f">
                        <button
                          className={getSubStyle(3006)}
                          onClick={updateActiveMenu.bind(this, {
                            id: 3006,
                            name: " BIR 1604-F",
                          })}
                        >
                          <TbReportAnalytics style={customStyles.icons} />
                          BIR 1604-F
                        </button>
                      </Link>


                      <Link href="/Reports/BIR/bir1700">
                        <button
                          className={getSubStyle(3007)}
                          onClick={updateActiveMenu.bind(this, {
                            id: 3007,
                            name: " BIR 1700",
                          })}
                        >
                          <TbReportAnalytics style={customStyles.icons} />
                          BIR 1700
                        </button>
                      </Link>
                    </div>
                  )
                }



                <Link href="/Reports/PayrollSummary/payrollsummary">
                  <button
                    className={getSubStyle(502)}
                    onClick={updateActiveMenu.bind(this, {
                      id: 502,
                      name: "Payroll Summary",
                    })}
                  >
                    <TbReport style={customStyles.icons} />
                    Payroll Summary
                  </button>
                </Link>
                <Link href="/Reports/ytdreport">
                  <button
                    className={getSubStyle(503)}
                    onClick={updateActiveMenu.bind(this, {
                      id: 503,
                      name: " YTD Reports",
                    })}
                  >
                    <TbReportAnalytics style={customStyles.icons} />
                    YTD Reports
                  </button>
                </Link>
                <Link href="/Reports/Payslip">
                  <button
                    className={getSubStyle(504)}
                    onClick={updateActiveMenu.bind(this, {
                      id: 504,
                      name: "Payslip",
                    })}
                  >
                    <TbReport style={customStyles.icons} />
                    Payslip
                  </button>
                </Link>
              </div>
            )}
          </div>
        )}

        <hr></hr>
        <Link href="" className={styles.sidemenulink}>
          <button
            className={getStyle(301)}
            onClick={updateActiveMenu.bind(this, { id: 301, name: "Help" })}
          >
            <IoMdHelpCircleOutline style={customStyles.icons} />
            Help
          </button>
        </Link>
        <hr></hr>
        <Link
          href="/SupportTickets/supportticketdashboard"
          className={styles.sidemenulink}
        >
          <button
            className={getStyle(401)}
            onClick={updateActiveMenu.bind(this, {
              id: 401,
              name: "Support tickets",
            })}
          >
            <HiOutlineTicket style={customStyles.icons} />
            Support tickets
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
