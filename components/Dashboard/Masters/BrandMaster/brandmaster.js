import React from "react";
import Link from "next/link";
import Layout from "../../../../components/layout/layout";
import { useEffect, useState } from "react";
import { apiService } from "@/services/api.service";
import Swal from "sweetalert2";
import { BiFilterAlt } from "react-icons/bi";
import { AiOutlinePlus } from "react-icons/ai";
import ReactPaginate from "react-paginate";

function BrandMasterDashboard() {
    const [BrandMaster, setBrandMaster] = useState([]);


    const PER_PAGE = 2;
    const [currentPage, setCurrentPage] = useState(0);
    function handlePageClick({ selected: selectedPage }) {
        setCurrentPage(selectedPage)
    }
    const offset = currentPage * PER_PAGE;
    const pageCount = Math.ceil(BrandMaster.length / PER_PAGE);

    const [keyword, setKeyword] = useState("");

    const getBrandMaster = async () => {
        let res = await apiService.commonGetCall("Master/GetBrandMaster"); //This Api is useed for Get the Dashborad data band Master
        setBrandMaster(res.data);
    };

    useEffect(() => {
        getBrandMaster();
    }, [1]);

    async function DeleteBandMaster(id) {
        try {
            Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!",
            }).then((res) => {
                if (res) {
                    apiService.commonGetCall(`Master/DeleteBrandMaster?id=${id}`);  // this is for deleting the data for dashborad using delete api call         
                }
                getBrandMaster();
            });

        } catch (error) {
            console.error(error);
            alert("Failed to delete data");
        }
    }

    return (
        <Layout>
            <div className="container-fluid">
                <p className="Heading">Brand Master</p>
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
                <br/>

                <div className="row">
                    <p className="col-lg-2 result-heading">Showing {BrandMaster.length} Results</p>
                    <div className="col-lg-8"></div>
                    <div className="col-lg-2">
                        <Link href="/Masters/BrandMaster/new">
                            <button className=" AddButton">
                                <AiOutlinePlus />    Add New
                            </button>
                        </Link>
                    </div>
                </div>
                <br/>

                <div className="row">
                    <div className="col-lg-12">
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th >Short Name</th>
                                    <th >Description</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Array.isArray(BrandMaster) &&
                                    BrandMaster.length > 0 && (
                                        <>
                                            {BrandMaster
                                                .filter(data => {
                                                    if ((data.short.toLowerCase().includes(keyword.toLowerCase())) || (data.description.toLowerCase().includes(keyword.toLowerCase()))) {
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
                                                                <Link href={`/Masters/BrandMaster/Edit/${data.id}`}>
                                                                    <button
                                                                        className="edit-btn"
                                                                    >
                                                                        Edit
                                                                    </button>
                                                                </Link>
                                                                &nbsp;&nbsp;
                                                                <button
                                                                    onClick={() => DeleteBandMaster(data.id)}
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
                    {/* <div className="col-lg-lg-3"></div> */}
                    <div className="col-lg-lg-4"></div>
                    <div className="col-lg-lg-4">
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
                    <div className="col-lg-lg-4"></div>
                </div>
            </div>
        </Layout>
    );
}

export default BrandMasterDashboard;
