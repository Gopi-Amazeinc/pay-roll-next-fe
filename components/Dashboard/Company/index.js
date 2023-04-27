import React from 'react';

import table from '../../../styles/company.module.css'
import company from '../../../styles/company.module.css'
import Link from 'next/link.js';


const Companydashboard = () => {
    return (
   <div>
            <div className="container">
               
              
                <br />
                <div className="row">
                    <div className="col-md-10">
                        <p className="text-primary fs-6 mt-3 fw-bold">
                            SHOWING <span></span>RESULTS
                        </p>
                    </div>
                    <div className="col-md-4">
                       <Link href="/Company/companyform">
                       <button className={company.button}>ADD NEW</button>
                       </Link>
                    </div>
                </div>
                <br />
            </div>
            <br />
            <div className="alignForm"></div>
            <div className="row">
                <div className="col-md-12">
                    <table class="table table-striped table-hover mt-4">
                        <thead className="bg-info text-white ">
                            <tr>
                                <th>Company Logo</th>
                                <th>Company Name</th>
                                <th>Nature of Business</th>
                                <th>Subsidiary Name</th>
                                <th>Address</th>
                                <th>Email</th>
                                <th>Phone No.</th>
                                <th style={{ paddingLeft: " 47px;" }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="newFont">
                                <td style={{ width: "10%" }}></td>
                                <td clasName={table.tabledetail}>Ayala Land, Inc.</td>
                                <td clasName={table.tabledetail}>E commerce</td>
                                <td clasName={table.tabledetail}>NA</td>
                                <td clasName={table.tabledetail}>900 Warehouse 1, Romauldez Street, Tabacalera Compound, Brgay, 664-A
                                    Paco Manila
                                </td>
                                <td clasName={table.tabledetail}>Purego.ph</td>
                                <td clasName={table.tabledetail}>884234924</td>
                                <td><Link href="/Company/companyform"><button className="edit-btn">Edit</button></Link><br /><br />
                                <button className="edit-btn">Delete</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
   </div>
    );
}

export default Companydashboard;