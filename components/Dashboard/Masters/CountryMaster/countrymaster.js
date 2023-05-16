import { useEffect, useState } from "react";
import React from 'react'
import { BiFilterAlt } from "react-icons/bi";
import Styles from '../../../../styles/CountryMasterDash.module.css'
import { AiOutlinePlusCircle } from "react-icons/ai";
import Link from "next/link";
import Layout from '../../../layout/layout'
import axios from "axios";
import Swal from 'sweetalert2';


function CountryMasterDash() {
    const [country, setCountryData] = useState([]);
    let hostURL = process.env.NEXT_PUBLIC_API_HOST_URL;

    useEffect(() => {
        getData();
    }, []);

    async function getData() {
        let res = await axios.get(
            hostURL + "Master/GetCountryType"   //naveen.th@amazeinc.in, Get API for Country master, to fetch data
        );
        setCountryData(res.data);
    }
    const deleteCountry = async (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                axios.get(hostURL + "Master/DeleteCountryType?ID=" + id);   //naveen.th@amazeinc.in, Delete API for Country master, to delete data by ID
                getData()
            }
        });
    }




    return (
        <Layout>
            <div>
                <br></br>
                <p id={Styles.title}>Country Master</p>

                <div className="container-fluid mt-4">
                    <div className="row shadow-lg p-2 rounded-4 p-3 ">
                        <div className="col-lg-1">
                            <b>
                                <p className="mt-2 text-center">
                                    
                                    <BiFilterAlt /> Filter by:
                                </p>
                            </b>
                        </div>
                        <div className="col-lg-5">
                            <input
                                type="search"
                                className=" mt-2 form-control"
                                placeholder="Search"
                            />
                        </div>
                    </div>
                    <div className="row mt-4">
                        <div className="col-lg-8">
                            {/* <p id={Styles.p}>SHOWING 2 RESULTS</p> */}
                        </div>
                        <div className="col-lg-2"></div>
                        <div className="col-lg-2">
                            <Link href="/Masters/CountryMaster/new">
                                <button
                                    className="AddButton"
                                >
                                    
                                    <AiOutlinePlusCircle />
                                    Add New
                                </button>
                            </Link>
                        </div>
                    </div>

                    <div className="row ">
                        <table className="table table-hover mt-4 ">
                            <thead className="bg-info text-white ">
                                <tr>
                                    <th>Country Name</th>
                                    <th>Description</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {country.map((data, index) => {
                                    return (
                                        <tr className="text-dark" key={index}>
                                            <td>{data.short}</td>
                                            <td>{data.description}</td>
                                            <td>
                                                <Link href={`/Masters/CountryMaster/Edit/${data.id}`}>
                                                    <button
                                                        id={Styles.editbtn}
                                                    >
                                                        Edit
                                                    </button>
                                                </Link>
                                                &nbsp;&nbsp;&nbsp;&nbsp;
                                                <button
                                                    id={Styles.editbtn}
                                                    onClick={deleteCountry.bind(this, data.id)}
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
        </Layout>
    );
}

export default CountryMasterDash
