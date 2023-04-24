import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import axios from 'axios';
import Styles from '../../styles/GroupMaster.module.css'
import Swal from 'sweetalert2'
function GroupMaster() {

    const [groupMaster, setGroupMasterData] = useState([]);
    let hostURL = process.env.NEXT_PUBLIC_API_HOST_URL;

    useEffect(() => {
        getData();
    }, []);

    async function getData() {
        let res = await axios.get(
          hostURL +"Master/GetGroupMaster"  //naveen.th@amazeinc.in, Get API for group master dashboard, to fetch data
        );
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
                axios.get(hostURL + "Master/DeleteGroupMaster?ID=" + id); //naveen.th@amazeinc.in, Delete API for Group master dashboard, to delete data by ID
                getData(); 
            }
          });
    }
    const edit = async (id)=>{
        sessionStorage.setItem("groupMasterID", id);
    }
      const clearSession = async ()=>{
        sessionStorage.setItem("groupMasterID","")
    }
    return (
        <Layout>
            <div>
                <h3 className='text-primary fs-5 mt-3'>Group Master</h3>
                <div className='card p-3 border-0 shadow-lg rounded-3 mt-4'>
                    <div className='row p-3'>
                        <div className='col-lg-1'>
                            <p>Filter By</p>
                        </div>
                        <div className='col-lg-5'>
                            <input type="text" className='form-control' placeholder='Search...' />
                        </div>
                    </div>
                </div>
                <div className='row mt-3'>
                    <div className='col-lg-2 text-primary fs-6 fw-bold'>
                        <h6>SHOWING RESULTS</h6>
                    </div>
                    <div className='col-lg-8'></div>
                    <div className='col-lg-2 mt-2 text-end'>
                        <Link href="/Masters/groupmasterform" onClick={clearSession} id='AddButton' className='btn btn-primary fw-bold'>
                            Add
                        </Link>
                    </div>
                </div>
                <table className='table table-hover mt-4 '>
                    <thead className='bg-info text-white '>
                        <tr>
                            <th>Short</th>
                            <th>Description</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            groupMaster.map((data,index) => {
                                return (
                                    <tr key={index}>
                                        <td>{data.short}</td>
                                        <td>{data.description}</td>
                                        <td>
                                            <Link href='/Masters/groupmasterform'>
                                                <button onClick={edit.bind(this, data.id)} id={Styles.editbtn}>Edit</button> 
                                            </Link>&nbsp;&nbsp;&nbsp;&nbsp;
                                            <button onClick={deleteGroupData.bind(this, data.id)} id={Styles.editbtn}>Delete</button>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </Layout>
    )
}
export default GroupMaster