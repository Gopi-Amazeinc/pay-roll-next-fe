import Link from "next/link";
import { useEffect, useRef, useState } from 'react';
import axios from "axios";
import Styles from "@/styles/Locatorrequest.module.css";

const Locatordashboard = () => {
    const hostURL = process.env.NEXT_PUBLIC_API_HOST_URL;
    const [locator, setlocator] = useState([]);
    const [Approvedlocatorrequests, setApprovedlocatorrequests] = useState([]);
    const [RejectedlocatorRequests, setRejectedlocatorRequests] = useState([]);

    const getlocator = async () => {
        let res = await axios.get(hostURL + "Payroll/GetLocatorRequests");
        setlocator(res.data);
        res = await axios.get(hostURL + "Payroll/GetApprovedLocatorRequest");
        setApprovedlocatorrequests(res.data);
        res = await axios.get(hostURL + "Payroll/GetRejectedLocatorRequest");
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
                                    <th>TimeOfDeparture</th>
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
                                            <td>{data.timeOfDeparture}</td>
                                            <td>{data.timeOfReturn}</td>
                                            <td>{data.purpose}</td>
                                            <td>{data.hourDiff}</td>
                                            <td>{
                                                <b>{data.statusID === 0 ? 'Manager Pending' :
                                                    data.statusID === 1 ? 'Manager approved' :
                                                        data.statusID === 2 ? 'Manager Rejected' : ' '}</b>
                                            }
                                            </td>
                                            <td><button className="btn btn-primary">Cancel</button></td>
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
                                    <th>TimeOfDeparture</th>
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
                                            <td>{data.timeOfDeparture}</td>
                                            <td>{data.timeOfReturn}</td>
                                            <td>{data.purpose}</td>
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
                                    <th>TimeOfDeparture</th>
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
                                            <td>{data.timeOfDeparture}</td>
                                            <td>{data.timeOfReturn}</td>
                                            <td>{data.purpose}</td>
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

        <div className="row">
            <div className="col-lg-8">
                <div className={Styles.flex}>
                    {tabsData.map((tab, idx) => {
                        return (
                            <button key={idx} ref={(el) => (tabsRef.current[idx] = el)} className={Styles.btn} onClick={() => setActiveTabIndex(idx)} >
                                {tab.label}
                            </button>
                        );
                    })}
                </div>
            </div>
            <div className="col-lg-4">
                <Link href="/Requests/locatorrequestsform"><button  className="btn btn-primary" >New Requests </button></Link>

            </div>
            <div className="py-4">
                {tabsData[activeTabIndex].content}
            </div>
        </div>
    );
}
export default Locatordashboard;

// onClick={clearData.bind(this)}