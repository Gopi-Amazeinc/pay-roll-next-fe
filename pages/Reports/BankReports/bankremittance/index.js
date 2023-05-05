
import React from 'react'
import Layout from '@/components/layout/layout.js';
function BankRemittance() {
    return (
        <Layout>

            <div className="col-lg-10" >
                <br />


                <div className="col-lg-12 dashbutton bttn">
                    <div className="tab-slider--nav">
                        <ul className="tab-slider--tabs">
                            <button type='button' className='btn btn-primary'>Normal Payroll</button>
                        </ul>
                    </div>

                </div>

                <div className="tab-slider--container">
                    <div id="tab1">
                        <div role="dialog" className="container-fluid">
                            <div className=" card shadow modal-dialog modal-lg">
                                <div className="modal-content">
                                    <div className="modal-header">

                                        <p className="modal-title Heading1 mx-3" style={{
                                            paddingLeft: "5px",
                                            fontSize: "19px",
                                            fontWeight: "700",
                                            color: "#3247d5"
                                        }}><b>Bank Remittance Report</b></p><br />
                                        <br /><br /><br /><hr />
                                    </div>
                                    <div className="modal-body">
                                        <div className="row">
                                            <div className="col-lg-3"><label className="Text mx-3">Year :</label><br /><br />
                                                <label className="Text mx-3">Month:</label><br /><br /><br />
                                                <label className="Text mx-3">Pay Period :</label>
                                                <br /><br /></div>
                                            <div className="col-lg-4">
                                                <select id="year" name="year" className="form-control ">
                                                    <br />
                                                    <option value="0" disabled="" selected="">Select Year </option>
                                                    <option value="2022">2023</option>
                                                    <option value="2022">2022</option>
                                                    <option value="2021">2021</option>
                                                    <option value="2020">2020</option>
                                                </select>
                                                <br />
                                                <select name="Month" id="Month" className="form-control ">
                                                    <option value="0" disabled="" selected="">Select Month </option>
                                                    <option value="1">January </option>
                                                    <option value="2">February </option>
                                                    <option value="3">March </option>
                                                    <option value="4">April </option>
                                                    <option value="5">May </option>
                                                    <option value="6">June </option>
                                                    <option value="7">July</option>
                                                    <option value="8">August </option>
                                                    <option value="9">September </option>
                                                    <option value="10">October </option>
                                                    <option value="11">November </option>
                                                    <option value="12">December </option>
                                                </select>
                                                <br />
                                                <select name="PayrollType" id="PayrollType" className="form-control ">
                                                    <option value="0" disabled="" selected="">Select</option>
                                                    <option value="1">1</option>
                                                    <option value="2">2</option>
                                                </select>
                                                <br /><br /><button className="btn btn-primary shadow" style={{
                                                    color: "#fff", background: "#3247d5", width: "200px",
                                                    height: "40px",
                                                    left: "30px"
                                                }}>Generate</button><br /><br />
                                            </div>
                                        </div>
                                        <br />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                <button id="payroll11" hidden="" data-toggle="modal" data-target="#payroll5" className="edit"></button>
                <button id="payroll13" hidden="" data-toggle="modal" data-target="#payroll12" className="edit"></button>
                <div id="payroll5" role="dialog" className="modal fade">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title">Bank Remittance Report</h4>
                                <button type="button" data-dismiss="modal" className="close">×</button>
                            </div>
                            <div className="modal-body">
                                <div className="row">
                                    <div className="col-lg-3"></div>
                                    <div className="col-lg-4"><button className="AddButton">Download </button></div>
                                    <div className="col-lg-4"><button className="AddButton3">Export to Text File</button></div>
                                </div>
                                <div className="row">
                                    <div className="col-lg-4"></div>
                                    <div className="col-lg-4"></div>
                                    <div className="col-lg-4">
                                        <p style={{ marginLeft: "83px" }}></p>
                                    </div>
                                </div>
                                <div id="downloadaplication">
                                    <table className="table table-bordered fonttxt">
                                        <thead >
                                            <tr className="newFont">
                                                <td >Company Code</td>
                                                <td >Payroll Date</td>
                                                <td >Company Acc No</td>
                                                <td >Payroll Amount</td>
                                                <td >Ceiling Amount</td>
                                            </tr>
                                        </thead>
                                        <tbody >
                                            <tr >
                                                <td ></td>
                                                <td ></td>
                                                <td ></td>
                                                <td ></td>
                                                <td ></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <table className="table table-bordered fonttxt">
                                        <thead >
                                            <tr className="newFont">
                                                <th >Account Number</th>
                                                <th >Employee ID</th>
                                                <th >Name</th>
                                                <th >Transaction Amount</th>
                                            </tr>
                                        </thead>
                                        <tbody >

                                        </tbody>
                                    </table>
                                </div>
                                <br />
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </Layout>

    )
}

export default BankRemittance