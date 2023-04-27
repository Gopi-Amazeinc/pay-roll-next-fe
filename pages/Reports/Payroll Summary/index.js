import React from 'react'
import Styles from "../../styles/payrollsummary.module.css";
import table from "/styles/table.module.css";

import Layout from '@/components/layout/layout.js';
import { useEffect, useState } from 'react';

function Payrollsummary() {

    const [payrollsummary, setpayrollsummary] = useState(false);

    const handleRunpayrollClick = () => {
        setpayrollsummary(!payrollsummary);
    }



    return (
        <Layout>
            <div>
                <br></br>
                <p id={Styles.title}>Payroll Summary Report</p>
                <div className="container-fluid mt-4">
                    <div className="row mt-4">
                        <div className="col-lg-8">
                            {/* <p id={Styles.p}>SHOWING 1 RESULTS</p> */}
                        </div>
                        <div className="col-lg-2"></div>
                        <div className="col-lg-2">
                            {/* <Link href="/SupportTickets/supporttickets"><button
                className="btn btn-primary btn-sm  shadow-lg"
                // id={Styles.addNew} onClick={ClearData.bind(this)}
              >
                // {" "}
                // <AiOutlinePlusCircle />
                // Add
              </button></Link> */}
                        </div>
                    </div>
                    <br></br>
                    <div className="row">
                        <table className={table.commonTable}>
                            <thead>
                                <tr>
                                    <th>Select</th>
                                    <th>Year</th>
                                    <th>Month</th>
                                    <th>Period</th>
                                    <th>Payroll Run Type</th>
                                    <th>Description</th>
                                </tr>
                                <tr>
                                    <td><input type="checkbox" onClick={handleRunpayrollClick} /></td>
                                    <td>2022</td>
                                    <td>09</td>
                                    <td>3</td>
                                    <td>Normal</td>
                                    <td>PayRollFor</td>

                                </tr>
                                <tr>
                                    <td><input type="checkbox" onClick={handleRunpayrollClick} /></td>
                                    <td>2022</td>
                                    <td>09</td>
                                    <td>3</td>
                                    <td>Normal</td>
                                    <td>PayRollFor</td>

                                </tr>
                            </thead>
                        </table>
                    </div>

                </div>
                <div className='row mt-4' style={{ textAlign: "center" }}>
                    <div className='col-lg-12'>
                        {
                            payrollsummary &&
                            (
                                <p style={{ color: "blue" }}>Employees in selected Period</p>
                            )
                        }

                    </div>
                </div>
            </div>
        </Layout>

    )
}

export default Payrollsummary
