import Link from "next/link";
import { useEffect, useRef, useState } from 'react';
import axios from "axios";
import Styles from "@/styles/Locatorrequest.module.css";
import Layout from "@/components/layout/layout"

const Locatordashboard = () => {
    const hostURL = process.env.NEXT_PUBLIC_API_HOST_URL;
    const [locator, setlocator] = useState([]);
    const [Approvedlocatorrequests, setApprovedlocatorrequests] = useState([]);
    const [RejectedlocatorRequests, setRejectedlocatorRequests] = useState([]);

    const getlocator = async () => {
        debugger
        let UserID = sessionStorage.getItem("userID")
        let res = await axios.get(hostURL + `Payroll/GetLocatorRequests?UserID=${UserID}`);
        setlocator(res.data);
        res = await axios.get(hostURL + `Payroll/GetApprovedLocatorRequest?UserID=${UserID}`);
        setApprovedlocatorrequests(res.data);
        res = await axios.get(hostURL + `Payroll/GetRejectedLocatorRequest?UserID=${UserID}`);
        setRejectedlocatorRequests(res.data);
    }

    useEffect(() => {
        getlocator()
    }, [1])

    const tabsData = [
        {
            label: 'PENDING',
            content:
                <div className="container-fluid mt-4">
                    <div className="row">
                        <table className='table  table-striped mt-3 text-center' id={Styles.table} >
                            <thead>
                                <tr id={Styles.tr}>
                                    <th>Date</th>
                                    <th>Destination</th>
                                    <th>Time Of Departure</th>
                                    <th>Time of Return	</th>
                                    <th>Purpose</th>
                                    <th>No Of Hours</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {locator.map((data, index) => {
                                    return (
                                        <tr className="text-dark" key={index}>
                                            <td>{data.date}</td>
                                            <td>{data.destination}</td>
                                            <td>{data.startTime}</td>
                                            <td>{data.endTime}</td>
                                            <td>{data.comments}</td>
                                            <td>{data.hourDiff}</td>
                                            <td>{
                                                <b>{data.statusID === 0 ? 'Manager Pending' :
                                                    data.statusID === 1 ? 'Manager approved' :
                                                        data.statusID === 2 ? 'Manager Rejected' : ' '}</b>
                                            }
                                            </td>
                                            <td><button className="editDeleteBtnTable">Cancel</button></td>
                                        </tr>
                                    )
                                })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>,
        },
        {
            label: 'APPROVED',
            content:
                <div className="container-fluid mt-4">
                    <div className="row">
                        <table className='table  table-striped mt-3 text-center' id={Styles.table} >
                            <thead>
                                <tr id={Styles.tr}>
                                    <th>Date</th>
                                    <th>Destination</th>
                                    <th>Time Of Departure</th>
                                    <th>Time of Return	</th>
                                    <th>Purpose</th>
                                    <th>No Of Hours</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Approvedlocatorrequests.map((data, index) => {
                                    return (
                                        <tr className="text-dark" key={index}>
                                            <td>{data.date}</td>
                                            <td>{data.destination}</td>
                                            <td>{data.startTime}</td>
                                            <td>{data.endTime}</td>
                                            <td>{data.comments}</td>
                                            <td>{data.hourDiff}</td>
                                            <td>{data.statusID}</td>
                                        </tr>
                                    )
                                })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>,
        },
        {
            label: 'REJECTED',
            content:
                <div className="container-fluid mt-4">
                    <div className="row">
                        <table className='table  table-striped mt-3 text-center' id={Styles.table} >
                            <thead>
                                <tr id={Styles.tr}>
                                    <th>Date</th>
                                    <th>Destination</th>
                                    <th>Time Of Departure</th>
                                    <th>Time of Return	</th>
                                    <th>Purpose</th>
                                    <th>No Of Hours</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {RejectedlocatorRequests.map((data, index) => {
                                    return (
                                        <tr className="text-dark" key={index}>
                                            <td>{data.date}</td>
                                            <td>{data.destination}</td>
                                            <td>{data.startTime}</td>
                                            <td>{data.endTime}</td>
                                            <td>{data.comments}</td>
                                            <td>{data.hourDiff}</td>
                                            <td>{data.statusID}</td>
                                        </tr>
                                    )
                                })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>,
        }
    ]
    const [activeTabIndex, setActiveTabIndex] = useState(0);

    const tabsRef = useRef([]);

    useEffect(() => {
        function setTabPosition() {
            const currentTab = tabsRef.current[activeTabIndex];
        }

        setTabPosition();
        window.addEventListener('resize', setTabPosition);

        return () => window.removeEventListener('resize', setTabPosition);
    }, [activeTabIndex]);
    return (
        <Layout>
            <div className='row mt-3'>
                <div className='col-lg-3 text-end'>
                    <Link className='Heading active' href="/Requests/Locatorrequest">My OBASIS Details</Link>
                </div>
                {/* <div className='col-lg-3'>
                    <Link className='Heading active' href="/Requests/Myteamlocator">Company OBASIS Details</Link>
                </div> */}
            </div> <br />
            <div className='card p-3 border-0 shadow-lg rounded-3 mt-4'>
                <div className='row'>
                    <div className='col-lg-1'>
                        <p>Filter By</p>
                    </div>

                    <div className='col-lg-3'>
                        <p>From Date</p>
                        <input type="date" className='form-control' />
                    </div>

                    <div className='col-lg-3'>
                        <p>To Date</p>
                        <input type="date" className='form-control' />
                    </div>

                    <div className='col-lg-4'><br /><p></p>
                        <input type="text" className='form-control' placeholder="Search For date ,or Status" />
                    </div>
                </div>
            </div><br />
            <div className="row">
                <div className="col-lg-9">
                    <div className={Styles.flex}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        {tabsData.map((tab, idx) => {
                            return (
                                <button key={idx} ref={(el) => (tabsRef.current[idx] = el)} className='toggleButton' onClick={() => setActiveTabIndex(idx)} >
                                    {tab.label}
                                </button>
                            );
                        })}
                    </div>
                </div>
                <div className="col-lg-3">
                    <Link href="/Requests/Locatorrequest/new"><button className="submit-button">New Requests </button></Link>

                </div>
                <div className="py-4">
                    {tabsData[activeTabIndex].content}
                </div>
            </div>
        </Layout>

    );
}
export default Locatordashboard;

// onClick={clearData.bind(this)}