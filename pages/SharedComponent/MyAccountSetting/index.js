import React from 'react';
import Layout from '@/components/layout/layout.js';
import { useEffect, useState } from "react";
import settingdash from "./myaccountsetting.module.css";
const Index = () => {

    const [showForm, setShowForm] = useState(false);

    const handleChangeNowClick = () => {
        setShowForm(prevShowForm => !prevShowForm);

    };
    function handleCancelClick() {
        setShowForm(false);
    }

    return (
        <Layout>
            <div className="row">
                <div className="col-lg-12 mt-2">
                    <h5 className={settingdash.accountheader}>My Account Setting</h5>
                </div>
                <div className="card p-3 border-0 rounded shadow-lg mt-2" style={{ maxWidth: "1250px" }}>
                    <div className="col-lg-12">
                        <h5>Account</h5>
                        <hr />
                    </div>
                    <div className="row">
                        <div className="col-lg-6">
                            <p> Change Password:</p>
                            <p>Choose a unique password to protect your account</p>
                        </div>
                        <div className="col-lg-6">
                            <h6 className={settingdash.changenow} style={{ }} onClick={handleChangeNowClick}>Change Now</h6>
                        </div>
                        <hr />

                        {showForm && (
                            <div className="row">
                                <div className="col-lg-2">
                                    <label htmlFor="currentPassword"><span style={{color:"red"}}>*</span>Current Password:</label>
                                    <br /> <br />
                                    <label htmlFor="currentPassword"> <span style={{color:"red"}}>*</span>New Password:</label><br /> <br />  <br />
                                    <label htmlFor="currentPassword"> <span style={{color:"red"}}>*</span>Confirm Password:</label>
                                </div>
                                <div className="col-lg-2">
                                    <input type="text" className="form-control" id="currentPassword" required /><br />
                                    <input type="password" className="form-control" id="New Password" required /><br />
                                    <input type="text" className="form-control" id="confirm password" placeholder='Confirm Password' required />
                                </div>
                                <div className="col-lg-2"></div>
                                <div className="col-lg-4" style={{ lineHeight: "0.7vh",fontSize:"13px" }}>
                                    <p>Password</p>
                                    <p> - must be atleast 4 characters long</p>
                                    <p>-can contain lower case alphabets (a-z).</p>
                                    <p>- can contain upper case alphabets (A-Z).</p>
                                    <p>-can contain numbers (0-9).</p>
                                    <button className='button' onClick={handleCancelClick} style={{ marginTop: "75px", width: "40%", float: "right", padding: "16px" }}>Cancel</button>
                                </div>
                                <div className="col-lg-2" >

                                    <button className='button' style={{ marginTop: "180px" }}>Save</button>
                                </div>


                            </div>
                        )}
                    </div>
                </div>
            </div>

        </Layout>
    );
}

export default Index;
