import React, { useEffect, useState } from 'react';

import table from '../../../styles/company.module.css'
import company from '../../../styles/company.module.css'
import Link from 'next/link.js';
import axios from 'axios';


const Companydashboard = () => {


    const hostURL = process.env.NEXT_PUBLIC_API_HOST_URL;

    const [Company, setCompany]=useState([]);


   async function getCompany(){
    let res =  await axios.get(hostURL + "Payroll/GetCompanyAddressDetails");
    setCompany(res.data);
    }

    useEffect(()=>{
        getCompany()
    },[1]
)

function getdata(){
    sessionStorage.setItem("id", data.id);

}

function  Cleardata(){
    sessionStorage.setItem("id","");

}


async function DeleteComany(id){
    try{
        let res = await axios.get(hostURL + `HR/DeleteHolidays?id=${id}`);
        console.log(res.data);
        Swal.fire('Data deleted successfully')
        getCompany();

    }
    catch (error){
        console.error(error);
        Swal.fire('failed to  delete data')

    }

};



    return(
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
                            { Company.map((data,index)=>{
                                return(
                                    <tr key={index}>
                                        <td>{data.company_Logo}</td>
                                        <td>{data.company_Name}</td>
                                        <td>{data.nature_Of_Business}</td>
                                        <td>{data.subsidiaryName}</td>
                                        <td>{data.address1}</td>
                                        <td>{data.email}</td>
                                        <td>{data.phone}</td>
                                        <td>
                                        <Link href={`/Company/${data.id}`}>
                                                <button className="btn btn-primary">Edit</button>
                                            </Link>
                                            &nbsp;

                                            <button className="btn btn-primary" onClick={() => DeleteComany(data.id)}>Delete</button>
                                        </td>
                                    </tr>
                                )
                            })

                            }
                        </tbody>
                    </table>
                </div>
            </div>
   </div>
    );
}

export default Companydashboard;