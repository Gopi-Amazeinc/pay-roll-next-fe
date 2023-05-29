import React, { useEffect, useState } from "react";
// import table from '../../../styles/company.module.css'
import company from "@/styles/company.module.css";
import { apiService } from "@/services/api.service";
import Swal from "sweetalert2";
import Link from "next/link.js";


const Companydashboard = () => {
    const [Company, setCompany] = useState([]);

    const [countvalue, setcountvalue] = useState();

    const getCompanyAddressDetails = async () => {
        let res = await apiService.commonGetCall(
            "Payroll/GetCompanyAddressDetails"
        );
        setCompany(res.data);
        setcountvalue(res.data.length)
    };


    const [tax, setTax] = useState([]);

    const getTax = async () => {
        let res = await apiService.commonGetCall(
            "Payroll/GetCompany_TaxComputation"
        );
        setTax(res.data);
        setcountvalue(res.data.length)
    };


    const [policy, setPolicy] = useState([]);

    const getWorkPolicy = async () => {
        let res = await apiService.commonGetCall(
            "Payroll/GetCompany_WorkPolicy"
        );
        setPolicy(res.data);
        setcountvalue(res.data.length)
    };


    const [payRoll, setPayRoll] = useState([]);

    const getPayrollComputation = async () => {
        let res = await apiService.commonGetCall(
            "Payroll/GetCompany_PayrollComputationnew"
        );
        setPayRoll(res.data);
        setcountvalue(res.data.length)
    };


    const getData = (data) => {
        sessionStorage.setItem("id", data.id);
    }



    useEffect(() => {
        getCompanyAddressDetails();
    }, [1]);


    const deleteCompany = async (id) => {
        debugger
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



    useEffect(() => {
        getWorkPolicy();
    }, [1]);


    const deletePolicy = async (id) => {
        try {
            let res = await apiService.commonGetCall(
                `Payroll/DeleteCompany_WorkPolicy?id=${id}`
            );
            console.log(res.data);
            Swal.fire("Data deleted successfully");
            getWorkPolicy();
        } catch (error) {
            console.error(error);
            Swal.fire("failed to  delete data");
        }
    };

    useEffect(() => {
        getPayrollComputation();
    }, [1]);


    const deletePayroll = async (id) => {
        try {
            let res = await apiService.commonGetCall(
                `Payroll/DeleteCompany_PayrollComputation?id=${id}`
            );
            console.log(res.data);
            Swal.fire("Data deleted successfully");
            getPayrollComputation();
        } catch (error) {
            console.error(error);
            Swal.fire("failed to  delete data");
        }
    };


    useEffect(() => {
        getTax();
    }, [1]);



    const deleteTax = async (id) => {
        try {
            let res = await apiService.commonGetCall(
                `Payroll/DeleteCompany_TaxComputation?id=${id}`
            );
            console.log(res.data);
            Swal.fire("Data deleted successfully");
            getTax();
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
                    {countvalue <= 0 ? (
                        <div className="col-lg-4" >
                            <Link href="/Company/companyform">
                                <button className={company.button} style={{ marginLeft: "100px" }}>ADD NEW</button>
                            </Link>
                        </div>) : (null)
                    }

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
                                        <td><img src={data.company_logo} width={50}height={50} ></img></td>
                                        <td>{data.company_Name}</td>
                                        <td>{data.nature_Of_Business}</td>
                                        {/* <td>{data.subsidiaryName}</td> */}
                                        <td>{data.address2}</td>
                                        <td>{data.email}</td>
                                        <td>{data.phone}</td>
                                        <td>
                                            <Link href={`/Company/${data.id}`}>
                                                <button className="edit-btn">Edit</button>
                                            </Link>
                                            &nbsp;
                                            <button
                                                className="edit-btn"
                                                onClick={() => deleteCompany(data.id)}
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




            {
                countvalue <= 0 ? (
                    <div className="row">
                        <div className="col-lg-12">
                            <p className="text-primary fs-6 mt-2 fw-bold">
                                Company  <span></span>WorkPolicy
                            </p>
                            <table className="table table-striped table-hover mt-4">
                                <thead className="bg-info text-white ">
                                    <tr>
                                        <th>Work_Days_Per_Year</th>
                                        <th>Work_Months_Per_Year</th>
                                        <th>DailyRate</th>
                                        <th style={{ paddingLeft: "47px" }}>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {policy.map((data, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>{data.work_Days_Per_Year}</td>
                                                <td>{data.work_Months_Per_Year}</td>
                                                <td>{data.dailyRate}</td>
                                                <td>
                                                    <Link href={`/Company/${data.id}`}>
                                                        <button className="edit-btn">Edit</button>
                                                    </Link>
                                                    &nbsp;
                                                    <button
                                                        className="edit-btn"
                                                        onClick={() => deletePolicy(data.id)}
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
                    </div>) : (null)
            }




            {
                countvalue <= 0 ? (
                    <div className="row">
                        <div className="col-lg-12">
                            <p className="text-primary fs-6 mt-2 fw-bold">
                                Company  <span></span>PayrollComputation
                            </p>
                            <table className="table table-striped table-hover mt-4">
                                <thead className="bg-info text-white ">
                                    <tr>
                                        <th>Periods_Per_Month</th>
                                        <th>Work_Months_Per_Year</th>

                                        <th style={{ paddingLeft: "47px" }}>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {payRoll.map((data, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>{data.periods_Per_Month}</td>
                                                <td>{12}</td>

                                                <td>
                                                    <Link href={`/Company/${data.id}`}>
                                                        <button className="edit-btn" onClick={getData.bind(this, data)}>Edit</button>
                                                    </Link>
                                                    &nbsp;
                                                    <button
                                                        className="edit-btn"
                                                        onClick={() => deletePayroll(data.id)}
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
                    </div>) : (null)

            }




            {
                countvalue <=0 ?(
             <div className="row">
                <div className="col-lg-12">
                    <p className="text-primary fs-6 mt-2 fw-bold">
                        Company  <span></span>TaxComputation
                    </p>
                    <table className="table table-striped table-hover mt-4">
                        <thead className="bg-info text-white ">
                            <tr>
                                <th>Non_Tax_Essential_Sealing</th>
                                <th>deminimis_Exemption</th>
                                <th>PayrollCalenda</th>
                                <th style={{ paddingLeft: "47px" }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tax.map((data, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{data.non_Tax_Essential_Sealing}</td>
                                        <td>{data.deminimis_Exemption}</td>
                                        <td>Yes</td>
                                        <td>
                                            <Link href={`/Company/${data.id}`}>
                                                <button className="edit-btn">Edit</button>
                                            </Link>
                                            &nbsp;
                                            <button
                                                className="edit-btn"
                                                onClick={() => deleteTax(data.id)}
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
            </div>):(null)
}



        </div>
                        
    );
};

export default Companydashboard;
