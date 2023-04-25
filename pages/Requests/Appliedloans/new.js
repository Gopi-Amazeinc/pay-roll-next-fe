import Layout from "@/components/layout/index"
import React, { useEffect, useState } from 'react'
import Link from "next/link"

function Appliedloans() {
    const [newrequest, setNewRequest] = useState(false)
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [approved, setApproved] = useState(false)
    const toggleNewRequest = () => {
        setNewRequest(true)
        setApproved(false)

    }

    const toggleApproved = () => {
        setApproved(true)
        setNewRequest(false)

    }
    return (
        <Layout>

            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-12">
                        <br /><br />
                        <div className="row">
                            <br />
                            <h2>Yet to bind</h2>
                            <div className="col-lg-2">
                            <Link href="/Requests/appliedloans" className="Heading1">My Loans</Link>
                            </div>

                            <div className="col-lg-2">
                            <Link href="/Requests/appliedloans" className="Heading1" tabindex="0">All Staff Loans</Link>
                            </div>

                        </div>
                        <br />
                        <div className="card shadow p-4">
                            <div className="row">
                                <div className="col-md-1">
                                    <p >Filter By</p>
                                </div>
                                <div className="col-md-2">
                                    <p >Date <input type="date" placeholder="Duration" id="date" name="date" className="form-control" /></p>
                                </div>

                                <div className="col-md-4">
                                    <p >Search <input type="search" placeholder="Search... " className="form-control" /></p>
                                </div>
                            </div>
                        </div>
                        <br />
                        <div className="row">
                            <br />
                            <div className="col-lg-12 dashbutton bttn">
                                <div className='col-lg-4 mx-2'><br />
                                    <div className='btn-group'>
                                        <button onClick={toggleNewRequest} className="AddButton">New Request</button>
                                        <button onClick={toggleApproved} className="AddButton">Approved</button>

                                    </div>
                                </div><br />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-10">
                                <br />
                                <p className="show3res">SHOWING <span style={{ color: "black" }}></span>&nbsp;RESULTS </p>
                            </div>
                            <div className="col-md-2">
                                <button className="form-control submitbtn" tabindex="0">Add New</button></div>
                        </div>
                        <br />

                    </div>
                </div>
            </div>


        </Layout>
    )
}

export default Appliedloans