import { useEffect, useState } from "react";
import React from 'react'
import { BiFilterAlt } from "react-icons/bi";
import Link from "next/link";
import Layout from '../../../layout/layout'
import { apiService } from "@/services/api.service";
import Swal from 'sweetalert2';
import { AiOutlinePlus } from "react-icons/ai";
import ReactPaginate from "react-paginate";

function CountryMasterDash() {
    const [country, setCountryData] = useState([]);

    useEffect(() => {
        getData();
    }, []);

    async function getData() {
        let res = await apiService.commonGetCall("Master/GetCountryType");
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
                apiService.commonGetCall("Master/DeleteCountryType?ID=" + id);   //naveen.th@amazeinc.in, Delete API for Country master, to delete data by ID
                getData()
            }
        });
    }


    const PER_PAGE = 2;
    const [currentPage, setCurrentPage] = useState(0);
    function handlePageClick({ selected: selectedPage }) {
        setCurrentPage(selectedPage)
    }
    const offset = currentPage * PER_PAGE;
    const pageCount = Math.ceil(country.length / PER_PAGE);
    const [keyword, setKeyword] = useState("")

    return (
        <Layout>
            <div className="container">
                <p className="Heading">Country Master</p>
                <div className="card p-3 rounded-3 shadow border-0">
                    <div className="row">
                        <div className="col-1">
                            <p> <BiFilterAlt /> Filter By</p>
                        </div>
                        <div className="col-5">
                            <input
                                type="text"
                                placeholder="Search"
                                className="form-control"
                                onChange={e => setKeyword(e.target.value)}
                            ></input>
                        </div>
                    </div>
                </div>

                <div className="row mt-3">
                    <p className="col-2 result-heading">Showing {country.length} Results</p>
                    <div className="col-8"></div>
                    <div className="col-2">
                        <Link href="/Masters/CountryMaster/new">
                            <button className=" AddButton">
                                <AiOutlinePlus />    Add New
                            </button>
                        </Link>
                    </div>
                </div>

                <div className="mt-3">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Country Name</th>
                                <th>Description</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Array.isArray(country) &&
                                country.length > 0 && (
                                    <>
                                        {country
                                            .filter(data => {
                                                if ((data.short.toLowerCase().includes(keyword.toLowerCase())) || (data.description.toLowerCase().includes(keyword))) {
                                                    return data;
                                                }
                                            })
                                            .slice(offset, offset + PER_PAGE)
                                            .map((data, index) => {
                                                return (
                                                    <tr key={index}>
                                                        <td>{data.short}</td>
                                                        <td>{data.description}</td>
                                                        <td>
                                                            <Link href={`/Masters/CountryMaster/Edit/${data.id}`}>
                                                                <button
                                                                    className="edit-btn"
                                                                >
                                                                    Edit
                                                                </button>
                                                            </Link>
                                                            &nbsp;&nbsp;
                                                            <button
                                                                className="edit-btn"
                                                                onClick={deleteCountry.bind(this, data.id)}
                                                            >
                                                                Delete
                                                            </button>
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                    </>
                                )}
                        </tbody>
                    </table>
                </div>

                <div className="mb-4 mt-4 text-center">
                    <ReactPaginate
                        previousLabel={"Previous"}
                        nextLabel={"Next"}
                        breakLabel={"..."}
                        pageCount={pageCount}
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={3}
                        onPageChange={handlePageClick}
                        containerClassName={"pagination  justify-content-center"}
                        pageClassName={"page-item "}
                        pageLinkClassName={"page-link"}
                        previousClassName={"page-item"}
                        previousLinkClassName={"page-link"}
                        nextClassName={"page-item"}
                        nextLinkClassName={"page-link"}
                        breakClassName={"page-item"}
                        breakLinkClassName={"page-link"}
                        activeClassName={"active primary"}
                    />
                </div>
            </div>
        </Layout>
    );
}

export default CountryMasterDash
