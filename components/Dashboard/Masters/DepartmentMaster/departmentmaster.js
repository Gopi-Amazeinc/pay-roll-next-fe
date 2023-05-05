import React, { useState, useEffect } from "react";
import Styles from "../../../../styles/employmentJobHistory.module.css";
import Link from "next/link";
import Layout from '../../../layout/layout';
import axios from "axios";
import Swal from 'sweetalert2';

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
            <div><p className="Heading">Department Master</p>{" "}
                <div className="container mt-2">
                    <div className="row shadow-lg p-2 rounded-4 p-3 ">
                        <div className="col-lg-1">
                            <b>
                                <p className="mt-2 text-center">
                                  
                                    Filter by:
                                </p>
                            </b>
                        </div>

                        <div className="col-lg-5">
                            <input
                                type="search"
                                className=" mt-2 form-control"
                                placeholder="Search "
                            />
                        </div>
                    </div>
                    <div className="row mt-4">
                        <div className="col-lg-10"></div>
                        <div className="col-lg-2">


                            <Link href="/Masters/DepartmentMaster/new"><button
                                className="AddButton shadow"
                            >
                                {/* <AiOutlinePlusCircle /> */}
                                ADD new
                            </button></Link>

                        </div>
                    </div>
                    <br />
                    <div className="row">
                        <table className="table table-striped">
                            <thead className="bg-info text-white">
                                <tr>
                                    <th>Department Name</th>
                                    <th>Department Description</th>

                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    Department.map((data) => {
                                        return (
                                            <tr key={data.id}>
                                                <td>{data.department_name}</td>
                                                <td>{data.department_Desc}</td>

                                                <td>
                                                    <div className="row">
                                                        <div className="col-lg-3">
                                                            <Link href={`/Masters/DepartmentMaster/Edit/${data.id}`}>   <button className="edit-btn" >Edit</button></Link>
                                                        </div>

                                                        <div className="col-lg-3">
                                                            <button className="edit-btn" onClick={() => handleDelete(data.id)}>Delete</button>
                                                        </div>
                                                    </div>
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
        </Layout>
    );
}

export default DepartmentMasterDashboard;