import React, { useState, useEffect } from "react";;
import Link from "next/link";
import Layout from '../../../layout/layout';
import axios from "axios";
import Swal from 'sweetalert2';
import { BiFilterAlt } from "react-icons/bi";
import { AiOutlinePlus } from "react-icons/ai";

const DepartmentMasterDashboard = () => {

    const [Department, setDepartmentMaster] = useState([])

    const getDepartmentMaster = async () => {
        let hostURL = process.env.NEXT_PUBLIC_API_HOST_URL;
        const { data } = await axios.get(hostURL + "Master/GetDepartmentMaster"); //gurukiran@amazeinc.in, Api call to fetch the data that is being displayed in table
        setDepartmentMaster(data)
    }

    const handleDelete = async (id) => {
        try {
            let hostURL = process.env.NEXT_PUBLIC_API_HOST_URL;
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

                    const res = axios.get(hostURL + `Master/DeleteDepartmentMaster?ID=${id}`); //gurukiran@amazeinc.in, api call to delete the data from the table
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


    return (
        <Layout>
            <div className="container">
                <p className="Heading">Department Master</p>
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
                            ></input>
                        </div>
                    </div>
                </div>

                <div className="row mt-3">
                    <p className="col-2 result-heading">Showing {Department.length} Results</p>
                    <div className="col-8"></div>
                    <div className="col-2">
                        <Link href="/Masters/DepartmentMaster/new">
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
                                <th>Department Name</th>
                                <th>Department Description</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Array.isArray(Department) &&
                                Department.length > 0 && (
                                    <>
                                        {Department.map((data, index) => {
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
        </Layout>
    );
}

export default DepartmentMasterDashboard;