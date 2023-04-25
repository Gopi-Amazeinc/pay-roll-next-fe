import React, { useState } from 'react'

function FinalPayrollDetails() {
    const [selectValue, setSelectValue] = useState('');

    const handleChange = (event) => {
        setSelectValue(event.target.value);
    };
    return (
        <div>
            <div>
                <br></br> <p >Payroll</p>{" "}
                <div className="container-fluid mt-4">
                    <div className="row shadow-lg p-2 rounded-4 p-3 ">
                        <div className="col-lg-1">
                            <b>
                                <p className="mt-2 text-center">
                                    <>
                                    </>
                                    {/* <BiFilterAlt />  */}
                                    Filter by:
                                </p>
                            </b>
                        </div>

                        <div className="col-lg-2">
                            <select className=" mt-2 form-select"
                                value={selectValue}
                                onChange={handleChange}
                            >
                                <option value="Select Month">Select Month</option>
                                <option value="jan">jan</option>
                                <option value="feb">feb</option>
                                <option value="march">march</option>
                            </select>
                        </div>
                        <div className="col-lg-2">
                            {/* <h6>Pay Date</h6> */}
                            {/* <ReactDatePicker   className=" mt-2 form-control"></ReactDatePicker> */}
                            <input
                                type="search"
                                className=" mt-2 form-control"
                                placeholder="Search"
                            />
                        </div>
                        <div className="col-lg-2">
                            <select className=" mt-2 form-select"
                                value={selectValue}
                                onChange={handleChange}
                            >
                                <option value="Select Department">Select Department</option>
                                <option value="jan">hr</option>
                                <option value="feb">sales</option>
                                <option value="march">IT</option>
                            </select>
                        </div>
                        <div className="col-lg-2">


                            <button
                                className="btn btn-light btn-lg shadow-lg"
                            // id={Styles.addNew}
                            >
                                Export To Excel
                            </button>

                        </div>
                    </div>

                    <div className="row mt-4">
                        <div className="col-lg-8">
                            <p>SHOWING  RESULTS</p>
                        </div>
                        <div className="row">
                            <table style={{ borderLeft: "3px solid white" }}>
                                <thead>
                                    <tr>
                                        <th>Employee Id</th>
                                        <th>Start Date</th>
                                        <th>End Date</th>
                                        <th>Employee Name</th>
                                        <th>Department</th>
                                        <th>Basic Monthly Salary</th>
                                        <th>Semi Monthly Salary</th>
                                        <th>Earnings</th>
                                        <th>Other Earnings	</th>
                                        <th colspan={5}>Deductions</th>
                                        <th>Other Deductions	</th>
                                        <th>Tax	</th>
                                        <th>Net Pay	</th>
                                        {/* <th>OT And Night Differentials</th> */}
                                    </tr>
                                    <tr>
                                        <th colSpan={7}></th>
                                        <th>OT And Night Differentials</th>
                                        <th></th>
                                        <th>SSS Rate</th>
                                        <th>Pag-IBIG Rate</th>
                                        <th>PhilHealth Contribution</th>
                                        <th>MPF Contribution</th>
                                        <th>Lwop Amount</th>
                                        <th></th>
                                        <th></th>
                                        <th></th>
                                        {/* <th>Basic Monthly Salary</th>
                    <th>Semi Monthly Salary</th>
                    <th>Earnings</th>
                    <th>Other Earnings	</th>
                    <th>Deductions</th>
                    <th>Other Deductions	</th>
                    <th>Tax	</th>
                    <th>Net Pay	</th> */}
                                    </tr>
                                </thead>

                                <tbody>
                                    <tr>
                                        {/* <td>test</td>
                  <td>test</td>
                  <td>test</td>
                  <td>test</td>
                  <td>test</td>
                  <td>test</td>
                  <td>test</td>
                  <td>
                      <div className="row">
                        <div className="col-lg-4">
                          <button id={Styles.actionBtn}>Payroll History</button>
                        </div>

                        <div className="col-lg-4">
                          <button id={Styles.actionBtn}>Payroll YTD</button>
                        </div>
                      </div>
                    </td> */}
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default FinalPayrollDetails