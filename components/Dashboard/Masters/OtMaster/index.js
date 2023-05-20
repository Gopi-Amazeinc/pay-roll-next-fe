import Link from 'next/link'
import React from 'react'
import { useEffect, useState } from 'react';
import { BiFilterAlt } from "react-icons/bi";
import { AiOutlinePlus } from "react-icons/ai";
import { apiService } from "@/services/api.service";
import ReactPaginate from "react-paginate";
import Swal from 'sweetalert2';

function OTRateDash() {
    const [otDetails, setOtDetails] = useState([]);
    const getOtdetails = async () => {
        const res = await apiService.commonGetCall("Master/GetOTRates");
        setOtDetails(res.data);
    }

    useEffect(() => {
        getOtdetails()
    }, [1])

    const handleDelete = async (id) => {
        try {

            const res = await apiService.commonGetCall(`Master/DeleteOTRates?id=${id}`);
            Swal.fire({
                icon: "success",
                title: "Hurray..",
                text: "Data was Deleted...!",
            });
            getOtdetails();
        } catch (error) {
            console.error(error);
            Swal.fire({
                icon: "error",
                title: "Oops..",
                text: "Data was Not Deleted...!",
            });
        }
    };

    const PER_PAGE = 5;
    const [currentPage, setCurrentPage] = useState(0);
    function handlePageClick({ selected: selectedPage }) {
        setCurrentPage(selectedPage)
    }
    const offset = currentPage * PER_PAGE;
    const pageCount = Math.ceil(otDetails.length / PER_PAGE);

    const [keyword, setKeyword] = useState("");

    return (
        <div className="container-fluid">
            <p className="Heading">OT Master</p>
            <div className="card p-3 rounded-3 border-0">
                <div className="row">
                    <div className="col-lg-1">
                        <p> <BiFilterAlt /> Filter By</p>
                    </div>
                    <div className="col-lg-3">
                        <input
                            type="text"
                            placeholder="Search"
                            className="form-control"
                            onChange={e => setKeyword(e.target.value)}
                        ></input>
                    </div>
                </div>
            </div>
            <br />
            <div className="row ">
                <p className="col-lg-2 result-heading">Showing {otDetails.length} Results</p>
                <div className="col-lg-8"></div>
                <div className="col-lg-2">
                    <Link href="/Masters/OtMaster/new">
                        <button className=" AddButton">
                            <AiOutlinePlus />    Add New
                        </button>
                    </Link>
                </div>
            </div>
            <br />
            <div className="row">
                <div className='col-lg-12'>
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th >Day</th>
                                <th >Normal</th>
                                <th >OT </th>
                                <th >ND</th>
                                <th >NDOT</th>
                                <th >Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Array.isArray(otDetails) &&
                                otDetails.length > 0 && (
                                    <>
                                        {otDetails
                                            .filter(data => {
                                                if ((data.day.toLowerCase().includes(keyword.toLowerCase())) || (data.normal.toLowerCase().includes(keyword))) {
                                                    return data;
                                                }
                                            })
                                            .slice(offset, offset + PER_PAGE)
                                            .map((data, index) => {
                                                return (
                                                    <tr key={index}>
                                                        <td>{data.day}</td>
                                                        <td>{data.normal}</td>
                                                        <td>{data.ot}</td>
                                                        <td>{data.nd}</td>
                                                        <td>{data.ndot}</td>
                                                        <td>
                                                            <Link href={`/Masters/OtMaster/Edit/${data.id}`}>
                                                                <button
                                                                    className="edit-btn"
                                                                >
                                                                    Edit
                                                                </button>
                                                            </Link>
                                                            &nbsp;&nbsp;
                                                            <button
                                                                onClick={() => handleDelete(data.id)}
                                                                className="edit-btn"
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
            </div>

            <div className="row">
                {/* <div className="col-lg-3"></div> */}
                <div className="col-lg-4"></div>
                <div className="col-lg-4">
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
                <div className="col-lg-4"></div>
            </div>
        </div>
    )
}

export default OTRateDash
