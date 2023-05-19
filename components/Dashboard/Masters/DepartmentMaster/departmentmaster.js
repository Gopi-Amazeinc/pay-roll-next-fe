import React, { useState, useEffect } from "react";;
import Link from "next/link";
import Layout from '../../../layout/layout';
import { apiService } from "@/services/api.service";
import ReactPaginate from "react-paginate";
import Swal from 'sweetalert2';
import { BiFilterAlt } from "react-icons/bi";
import { AiOutlinePlus } from "react-icons/ai";

const DepartmentMasterDashboard = () => {

    const [Department, setDepartmentMaster] = useState([])

    const getDepartmentMaster = async () => {
        const { data } = await apiService.commonGetCall("Master/GetDepartmentMaster") //gurukiran@amazeinc.in, Api call to fetch the data that is being displayed in table
        setDepartmentMaster(data)
    }

    const handleDelete = async (id) => {
        try {
            Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            }).then((result) => {
                if (result.isConfirmed) {

                    const res = apiService.commonGetCall(`Master/DeleteDepartmentMaster?ID=${id}`); //gurukiran@amazeinc.in, api call to delete the data from the table
                    console.log(res.data);
                    // alert("Data deleted successfully");
                    Swal.fire(
                        'Deleted!',
                        'Your file has been deleted.',
                        'success'
                    )
                } getDepartmentMaster();

            })

        } catch (error) {
            console.error(error);
            alert("Failed to delete data");
        }
    };


    useEffect(() => {
        getDepartmentMaster();
    }, [])

    const PER_PAGE = 2;
    const [currentPage, setCurrentPage] = useState(0);
    function handlePageClick({ selected: selectedPage }) {
        setCurrentPage(selectedPage)
    }
    const offset = currentPage * PER_PAGE;
    const pageCount = Math.ceil(Department.length / PER_PAGE);
    const [keyword, setKeyword] = useState("");

    return (
        <Layout>
            <div className="container">
                <p className="Heading">Department Master</p>
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
                <div className="row">
                    <p className="col-lg-2 result-heading">Showing {Department.length} Results</p>
                    <div className="col-lg-8"></div>
                    <div className="col-lg-2">
                        <Link href="/Masters/DepartmentMaster/new">
                            <button className=" AddButton">
                                <AiOutlinePlus />    Add New
                            </button>
                        </Link>
                    </div>
                </div>
                <br />
                <div className="row">
                    <div className="col-lg-12">
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th>Department Name</th>
                                    <th>Department Description</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Array.isArray(Department) &&
                                    Department.length > 0 && (
                                        <>
                                            {Department
                                                .filter(data => {
                                                    if ((data.department_name.toLowerCase().includes(keyword.toLowerCase())) || (data.department_Desc.toLowerCase().includes(keyword))) {
                                                        return data;
                                                    }
                                                })
                                                .slice(offset, offset + PER_PAGE)
                                                .map((data, index) => {
                                                    return (
                                                        <tr key={index}>
                                                            <td>{data.department_name}</td>
                                                            <td>{data.department_Desc}</td>
                                                            <td>
                                                                <Link href={`/Masters/DepartmentMaster/Edit/${data.id}`}>
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
        </Layout>
    );
}

export default DepartmentMasterDashboard;