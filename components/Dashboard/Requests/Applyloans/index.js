import { useState, useEffect } from "react"
import loan from "../../../../pages/Requests/Applyloans/applyloans.module.css"
import Link from "next/link"

const ApplyloansDashboard = () => {
    const [newrequest, setNewRequest] = useState(false)
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [approved, setApproved] = useState(false)
    const [newDashboard, setNewDashboardData] = useState([]);
    const [newApproved, setnewApprovedData] = useState([]);
    const toggleNewRequest = () => {
        setNewRequest(true)
        setApproved(false)

    }

    const toggleApproved = () => {
        setApproved(true)
        setNewRequest(false)

    }
    return (
        <>
            <div className='card p-4 border-0 shadow-lg mt-2 mb-2'>
                <div className="row">
                    <div className="col-lg-1">
                        <label>Filter By</label>
                    </div>
                    <div className="col-lg-4">
                        <label>Search</label>
                        <input type="text" className="form-control" placeholder="Search..." />
                    </div>
                </div>
            </div><div className="row">
                <div className="col-lg-12 dashbutton bttn">
                    <div className='col-lg-4 mx-2'><br />
                        <div className='btn-group'>
                            <button onClick={toggleNewRequest} className={loan.tabBtn}>New Request</button>
                            <button onClick={toggleApproved} className={loan.tabBtn}>Approved</button>
                        </div>
                    </div><br />
                </div>
            </div>
            <div className='row'>
                <div className='col-lg-2 text-primary fs-6 fw-bold'>
                    <h6>Showing Results</h6>
                </div>
            </div>
            <div className="row mb-2">
                <div className="col-lg-9"></div>
                <div className="col-lg-3">
                    <Link href="/Requests/Applyloans/new">
                    <button className={loan.addButton}>Add New</button>
                    </Link> 
                </div>
            </div>

            {
                newrequest && (
                    <table className='table table-hover'>
                        <thead className='bg-info text-white'>
                            <tr>
                                <th>Date</th>
                                <th>Start Time</th>
                                <th>End Time</th>
                                <th>Comments</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                newDashboard.map((data) => {
                                    return (
                                        <tr key={data.id}>
                                            <td>{data.date}</td>
                                            <td>{data.actuval_StartTime}</td>
                                            <td>{data.actuval_EndTime}</td>
                                            <td>{data.comments}</td>
                                            <td>{data.status}</td>
                                            <td>
                                                <button onClick={Delete.bind(this, data.id)} className='edit-btn'>Cancel</button>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                )
            }
            {
                approved && (
                    <table className='table table-hover'>
                        <thead className='bg-info text-white'>
                            <tr>
                                <th>Date</th>
                                <th>Start Time</th>
                                <th>End Time</th>
                                {/* <th>Comments</th>
                                <th>Status</th>
                                <th>Action</th> */}
                            </tr>
                        </thead>

                        <tbody>
                            {
                                newApproved.map((data) => {
                                    return (
                                        <tr key={data.id}>
                                            <td>{data.date}</td>
                                            <td>{data.actuval_StartTime}</td>
                                            <td>{data.actuval_EndTime}</td>
                                            {/* <td>{data.comments}</td>
                                            <td>{data.status}</td>
                                            <td>
                                                <button onClick={Delete.bind(this, data.id)} className='edit-btn'>Cancel</button>
                                            </td> */}
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                )
            }
        </>

    )
}
export default ApplyloansDashboard;