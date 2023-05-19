import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { apiService } from "@/services/api.service";
import Layout from '../../../layout/layout'
import { BiFilterAlt } from "react-icons/bi";
import { AiOutlinePlus } from "react-icons/ai";
import Swal from 'sweetalert2'
import ReactPaginate from "react-paginate";
function GroupMaster() {

    const [groupMaster, setGroupMasterData] = useState([]);

    useEffect(() => {
        getData();
    }, []);

    async function getData() {
        let res = await apiService.commonGetCall("Master/GetGroupMaster");
        setGroupMasterData(res.data);
    }

    const deleteGroupData = async (id) => {
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
                apiService.commonGetCall("Master/DeleteGroupMaster?ID=" + id); //naveen.th@amazeinc.in, Delete API for Group master dashboard, to delete data by ID
                getData();
            }
        });
    }

    const PER_PAGE = 2;
    const [currentPage, setCurrentPage] = useState(0);
    function handlePageClick({ selected: selectedPage }) {
        setCurrentPage(selectedPage)
    }
    const offset = currentPage * PER_PAGE;
    const pageCount = Math.ceil(groupMaster.length / PER_PAGE);
    const [keyword, setKeyword] = useState("");

    return (
        <Layout>
            <div className="container-fluid">
                <p className="Heading">Group Master</p>
                <div className="card p-3 rounded-3 border-0">
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
                    <p className="col-2 result-heading">Showing {groupMaster.length} Results</p>
                    <div className="col-8"></div>
                    <div className="col-2">
                        <Link href="/Masters/GroupMaster/new">
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
                                <th>Short</th>
                                <th>Description</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Array.isArray(groupMaster) &&
                                groupMaster.length > 0 && (
                                    <>
                                        {groupMaster
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
                                                            <Link href={`/Masters/GroupMaster/Edit/${data.id}`}>
                                                                <button
                                                                    className="edit-btn"
                                                                >
                                                                    Edit
                                                                </button>
                                                            </Link>
                                                            &nbsp;&nbsp;
                                                            <button
                                                                onClick={deleteGroupData.bind(this, data.id)}
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
    )
}
export default GroupMaster