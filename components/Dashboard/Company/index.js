import React, { useEffect, useState } from "react";
// import table from '../../../styles/company.module.css'
import company from "@/styles/company.module.css";
import { apiService } from "@/services/api.service";
import Swal from "sweetalert2";
import Link from "next/link.js";

const Companydashboard = () => {
    const [Company, setCompany] = useState([]);

    const getCompanyAddressDetails = async () => {
        let res = await apiService.commonGetCall(
            "Payroll/GetCompanyAddressDetails"
        );
        setCompany(res.data);
    };

    useEffect(() => {
        getCompanyAddressDetails();
    }, [1]);
    const deleteComany = async (id) => {
        try {
            let res = await apiService.commonGetCall(
                `Payroll/DeleteCompany_AddressDetails?id=${id}`
            );
            console.log(res.data);
            Swal.fire("Data deleted successfully");
            getCompanyAddressDetails();
        } catch (error) {
            console.error(error);
            Swal.fire("failed to  delete data");
        }
    };

    return (
        <div className="container-fluid">
            <br></br>
            <div class="shadow-lg p-3 mb-1 bg-body rounded">

                <div className="row">
                    <div className="col-lg-4">
                        <p className="text-primary fs-6 mt-2 fw-bold">
                            Company  <span></span>Dashboard
                        </p>
                    </div>
                    <div className="col-lg-4"></div>
                    <div className="col-lg-4" >
                        <Link href="/Company/companyform">
                            <button className={company.button} style={{ marginLeft: "100px" }}>ADD NEW</button>
                        </Link>
                    </div>
                </div>
                {/* <div className="row"></div> */}
            </div>
            <div className="alignForm"></div>
            <div className="row">
                <div className="col-md-12">
                    <table className="table table-striped table-hover mt-4">
                        <thead className="bg-info text-white ">
                            <tr>
                                <th>Company Logo</th>
                                <th>Company Name</th>
                                <th>Nature of Business</th>
                                {/* <th>Subsidiary Name</th> */}
                                <th>Address</th>
                                <th>Email</th>
                                <th>Phone No.</th>
                                <th style={{ paddingLeft: "47px" }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Company.map((data, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{data.company_Logo}</td>
                                        <td>{data.company_Name}</td>
                                        <td>{data.nature_Of_Business}</td>
                                        {/* <td>{data.subsidiaryName}</td> */}
                                        <td>{data.address2}</td>
                                        <td>{data.email}</td>
                                        <td>{data.phone}</td>
                                        <td>
                                            <Link href={`/Company/${data.id}`}>
                                                <button className="btn btn-primary">Edit</button>
                                            </Link>
                                            &nbsp;
                                            <button
                                                className="btn btn-primary"
                                                onClick={() => deleteComany(data.id)}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Companydashboard;
