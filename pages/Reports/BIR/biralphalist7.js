import React, { useState } from 'react'
import Layout from '../../../components/layout/layout';
const Biralphalist7 = () => {
    let [generateState, setState] = useState(false)

    const toggleState = () => {
        setState(true)
    }
    return (
        <Layout>
            <div className='container'>
                <div className='row'>
                    <div className='col-lg-4'></div>
                    <div className='col-lg-4'>
                        <p className='header-style'>Alpha List 7.0</p>
                    </div>
                    <div className='col-lg-4'></div>
                </div>
                <hr />

                <div className='row'>
                    <div className='col-lg-3'></div>
                    <div className='col-lg-3'>
                        <p className='fw-bold fs-6'>Year</p>
                    </div>
                    <div className='col-lg-2'>
                        <select className='form-select'>
                            <option value="">select Year</option>
                            <option>2020</option>
                            <option>2021</option>
                            <option>2022</option>
                        </select>
                    </div>
                    <div className='col-lg-3'></div>
                </div>


                <div className='row mt-3'>
                    <div className='col-lg-3'></div>
                    <div className='col-lg-3'>
                        <p className='fw-bold fs-6'>Amended Return</p>
                    </div>
                    <div className='col-lg-2'>
                        <select className='form-select'>
                            <option value="">select </option>
                            <option>2020</option>
                            <option>2021</option>
                            <option>2022</option>
                        </select>
                    </div>
                    <div className='col-lg-3'></div>
                </div>


                <table className='table table-striped table-bordered mt-4'>
                    <thead className='bg-info text-white'>
                        <tr>
                            <th colSpan={2}>Select ALL</th>
                            <th colSpan={4}>ALPHALIST OF EMPLOYEES</th>
                        </tr>
                        <tr>
                            <th>Select</th>
                            <th>Employee ID</th>
                            <th>Name</th>
                            <th>Employee Status</th>
                        </tr>
                    </thead>
                </table>

                <div className='row mt-2'>
                    <div className='col-lg-4'></div>
                    <div className='col-lg-4'>
                        <button onClick={toggleState} className='EditDelteBTN rounded-4'>generate schedule 1</button>
                    </div>
                    <div className='col-lg-4'></div>
                </div>

                {
                    generateState && (
                        <div className="container">
                            <div className='row mt-4'>
                                <div className='col-lg-4'></div>
                                <div className='col-lg-4'></div>
                                <div className='col-lg-4'>
                                    <button className='EditDelteBTN'>convert to pdf</button>
                                </div>
                            </div>
                            <div className='table-responsive'>
                                <table className='table table-striped table-bordered mt-4' >
                                    <thead className='bg-info text-white'>
                                        <tr>
                                            <th colSpan={17} className='text-center'>PRESENT EMPLOYER</th>
                                            <th colSpan={14} className='text-center'>PREVIOUS EMPLOYER</th>
                                            <th colSpan={9}></th>
                                        </tr>
                                        <tr>
                                            <th colSpan={8}></th>
                                            <th colSpan={5}>NON Taxable</th>
                                            <th colSpan={4}> Taxable</th>
                                            <th colSpan={5}></th>
                                            <th colSpan={1}></th>
                                            <th colSpan={5}>NON Taxable</th>
                                            <th colSpan={4}> Taxable</th>
                                            <th colSpan={2}>Total Taxable</th>
                                            <th colSpan={3}>TOTAL WITHHELD</th>
                                            <th colSpan={2}>YEAR END ADJUSTMENT</th>
                                            <th colSpan={1}></th>
                                        </tr>
                                        <tr style={{ whiteSpace: "nowrap" }}>
                                            <th>Seq No.</th>
                                            <th>Name Of The Employees (First Name,Last Name)</th>
                                            <th>Nationality / Resident</th>
                                            <th>Cuurent Employee Status*</th>
                                            <th>Period Of Employement From</th>
                                            <th>Period Of Employement To</th>
                                            <th>Reason of Separation</th>
                                            <th>Gross Compensation Income</th>
                                            <th>13th Month Pay and Other Benefits</th>
                                            <th>De Minimis Benefits</th>
                                            <th>SSS, GSIS, PHIC &PAG-IBIG CONTRIBUTIONS AND UNION DUES (Employee shared only)</th>
                                            <th>Salaries(P250k below) & Other Forms Of Compensation</th>
                                            <th>Total Non-Taxable/Exempt Compensation Income</th>
                                            <th>basic Salary (Net of SSS,GSIS,PHIC,HDMF Contri,& Union Dues)</th>
                                            <th>13th Month Pay & Other Benefits</th>
                                            <th>Salaries & Other Forms of Compensation</th>
                                            <th>Total Taxable Compensation Income</th>
                                            <th>TAXPAYER IDENTIFICATION NUMBER</th>
                                            <th>Employement Status</th>
                                            <th>Previous Employement Startdate</th>
                                            <th>Previous Employement Enddate</th>
                                            <th>Reason of Separation ,if applicable(**)</th>
                                            <th>Gross Compensation Previous Employer</th>
                                            <th>13th Month Pay & Other Benefits</th>
                                            <th>Deminimis Benefits</th>
                                            <th>SSS,GSIS,PHIC & PAG-IBIG Contributions And Union Dues</th>
                                            <th>Salaries(P250k & below)& Other Forms of Compensation</th>
                                            <th>Total Non-Taxable/ Exempt Compensation(Previous Employer)</th>
                                            <th>Basic Salary (Net of SSS,GSIS,PHIC,HDMF Contri & Union Dues)</th>
                                            <th>13th Month Pay & Other Benefits</th>
                                            <th>Salaries & Other Forms Of Compensation</th>
                                            <th>Total Taxable Compensation</th>
                                            <th>Total Taxable Compensation Income (Present And Previous Employee)</th>
                                            <th>Tax Due (Jan- Dec )</th>
                                            <th>Tax Witheld Previous Employer</th>
                                            <th>Tax Withheld Present Employer</th>
                                            <th>Amt Withheld & Paid For In December or Last Salary</th>
                                            <th>Over Withheld tax Refunded To Employee</th>
                                            <th>Amount Of Tax Withheld As Adjusted</th>
                                            <th>Subtitled Filing Yes/No</th>
                                        </tr>
                                    </thead>
                                </table>
                            </div>
                        </div>
                    )
                }
            </div>
        </Layout>
    )
}

export default Biralphalist7