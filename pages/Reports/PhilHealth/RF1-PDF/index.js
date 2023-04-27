
import React, { useEffect, useState } from "react";
import Layout from '@/components/layout/layout.js';

function RF1PDF() {
    return (
        <Layout>
            <div>
                <br />
                <div className="container-fluid ">
                    <div className="col-12">
                        <div className="row"></div>

                        <br />
                        <br />
                        <br />
                        <div className="card shadow p-3">
                            <div className="row">
                                <h2 className="text-center text-primary">RF-1PDF</h2>
                                <hr />
                                <div className="col-lg-7 mx-4">
                                    {/* <div className="row">
                            <h5 className="leavereq">Select Start Month and  Year </h5>
                            </div> */}
                                    <div className="row">
                                        <div className="col-lg-1"></div>
                                        <div className="col-lg-5">
                                            <label>Select Start Month&Year</label>
                                        </div>
                                        <div className="col-lg-3">
                                            <select
                                                class="form-select form-select-sm"
                                                aria-label=".form-select-sm example"
                                            >
                                                <option selected>Select Month</option>
                                                <option value="1">January</option>
                                                <option value="2">February</option>
                                                <option value="3">March</option>
                                                <option value="3">April</option>
                                                <option value="1">May</option>
                                                <option value="2">June</option>
                                                <option value="3">July</option>
                                                <option value="3">August</option>
                                                <option value="1">September</option>
                                                <option value="2">October</option>
                                                <option value="3">November</option>
                                                <option value="3">December</option>
                                            </select>
                                        </div>
                                        <div className="col-lg-3">
                                            <select
                                                class="form-select form-select-sm"
                                                aria-label=".form-select-sm example"
                                            >
                                                <option selected>Select Year</option>
                                                <option value="1">2025</option>
                                                <option value="2">2024</option>
                                                <option value="3">2023</option>
                                                <option value="1">2022</option>
                                                <option value="2">2021</option>
                                                <option value="3">2020</option>
                                            </select>
                                        </div>
                                    </div>
                                    <br />

                                    <div className="row">
                                        <div className="col-lg-1"></div>
                                        <div className="col-lg-3">
                                            <label>Signatory Person</label>
                                        </div>
                                        <div className="col-lg-2"></div>
                                        <div className="col-lg-3">
                                            <select className="form-select form-select-sm">
                                                <option select>Select</option>
                                                <option>Admin</option>
                                                <option>HR</option>
                                                <option>Finance</option>
                                            </select>
                                        </div>
                                    </div>
                                    <br />
                                    <div className="row">
                                        <div className="col-lg-6"></div>
                                        <div className="col-lg-5">
                                            <button className="submit-button mt-5" tabindex="0">GENERATE</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default RF1PDF;
