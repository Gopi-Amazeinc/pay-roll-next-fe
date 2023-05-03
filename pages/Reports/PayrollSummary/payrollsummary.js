import Layout from '@/components/layout/layout.js';  
import { useEffect, useState } from 'react';

function Payrollsummary() {

    const [payrollsummary, setpayrollsummary] = useState(false);
    const [employess, getEmployee] = useState(false)

    const handleRunpayrollClick = () => {
        setpayrollsummary(!payrollsummary);
    }

    const handleEmployeesClick = () => {
        getEmployee(!employess);
    }

    return (
        <Layout>

            <p className='Heading'>Payroll Summary Report</p>
            <br></br>
            <div>
                <div>
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Select</th>
                                <th>Year</th>
                                <th>Month</th>
                                <th>Period</th>
                                <th>Payroll Run Type</th>
                                <th>Description</th>
                            </tr>
                        </thead>
                        <tbody>
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
                        </tbody>
                    </table>
                </div>
            </div>
            {
                payrollsummary &&
                (
                    <div className='container'>
                        <div className='row mt-4'>
                            <div className='col-lg-3'></div>
                            <div className='col-lg-3'>
                                <p className='Heading'>Employees in selected Period</p>
                            </div>
                            <div className='col-lg-2'></div>
                            <div className='col-lg-4'>
                                <input type='text' placeholder='Search' className='form-control' />
                            </div>
                        </div>

                        <div className='row  mt-5'>
                            <div className='col-lg-2'>
                                <input type='checkbox' /> Select All
                            </div>

                            <table className='table table-striped'>
                                <thead>
                                    <tr>
                                        <th>Select</th>
                                        <th>Employee ID</th>
                                        <th>Employee Name</th>
                                        <th>Status</th>
                                        <th>Pay Group</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    <tr>
                                        <td><input type='checkbox' className='form-check' onChange={handleEmployeesClick} /></td>
                                        <td>22961</td>
                                        <td>priyanka</td>
                                        <td>Active</td>
                                        <td>Rank and File</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                )
            }
            {
                employess && (
                    <div className='container mt-5'>
                        <div className='row'>
                            <div className='col-lg-10'></div>
                            <div className='col-lg-2'>
                                <button className='EditDelteBTN'>export to excel</button><br /><br />
                                Total Amount :
                            </div>
                        </div>

                        <div className='row table-responsive mt-3'>
                            <table className='table table-bordered table-striped'>
                                <thead>
                                    <tr style={{ whiteSpace: "nowrap" }}>
                                        <th>employeID</th>
                                        <th>name</th>
                                        <th>baseSal</th>
                                        <th>department_name</th>
                                        <th>month</th>
                                        <th>payrolltype</th>
                                        <th>month_Name</th>
                                        <th>period</th>
                                        <th>Meal_ALLWNCE</th>
                                        <th>Petrol_ALLWNCE</th>
                                        <th>Tax</th>
                                        <th>TaxableIncome</th>
                                        <th>TaxableEarning</th>
                                        <th>TaxableDeduction</th>
                                        <th>PHIL_EE</th>
                                        <th>SSS_EE</th>
                                        <th>SSS_ER</th>
                                        <th>SSS_EC</th>
                                        <th>HDMF_EE</th>
                                        <th>LWOP</th>
                                        <th>NonTaxableIncome</th>
                                        <th>NETPAY</th>
                                    </tr>
                                </thead>
                            </table>
                        </div>
                    </div>
                )
            }
        </Layout>

    )
}

export default Payrollsummary
