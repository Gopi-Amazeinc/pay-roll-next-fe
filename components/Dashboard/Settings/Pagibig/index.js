import React from 'react'
import Link from 'next/link'
import axios from 'axios';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2'
import { useEffect, useState } from 'react';
import Styles from '../../../../styles/pagibig.module.css'

const Pagibig = () => {
    const [pagibigconfigaration, setpagibigconfigaration] = useState([]);
    const { register, handleSubmit, reset, formState } = useForm();
    const { errors } = formState;

    const hostURL = process.env.NEXT_PUBLIC_API_HOST_URL;

    const getData = (data) => {
        sessionStorage.setItem("id", data.id);
    }

    const clearData = () => {
        sessionStorage.setItem("id", "");
    }

    const getpagibigconfigaration = async () => {
        let res = await axios.get(hostURL + "HR/GetPagibigconfogaration");
        setpagibigconfigaration(res.data);
    }

    useEffect(() => {
        getpagibigconfigaration()
    }, [1])

    const handleDelete = async (id) => {
        try {
            let res = await axios.get(hostURL + `HR/DeletePagibigconfogaration?id=${id}`);
            console.log(res.data);
            Swal.fire('Data deleted successfully')
            getpagibigconfigaration();
        } catch (error) {
            console.error(error);
            Swal.fire('failed to  delete data')
        }
    };

    return (
        <div>
            <div className='container-fluid'>

                <label className='Heading'>PAGIBIG Configuration</label>

                <br /><br />
                <div className='row'>
                    <div className='col-lg-12'>
                        <div className='card p-3 border-0  rounded-3'>
                            <div className='row'>
                                <div className='col-lg-1'>
                                    <p>Filter By</p>
                                </div>

                                <div className='col-lg-3'>
                                    <input type="text" className='form-control' placeholder='Search...' />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='row '>
                    <div className='col-lg-10'>

                    </div>

                    <div className='col-lg-2'>
                        <br />
                        <Link href="/Settings/Pagibig/new"><button className='AddButton' onClick={clearData.bind(this)} > ADD NEW </button></Link>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-lg-12'>
                        < div className='table-responsive'>
                            <table className='table mt-4 table-striped text-center ' >
                                <thead className='bg-info text-white '>
                                    <tr style={{ whiteSpace: "nowrap" }}>
                                        <th>Taxable income low limit</th>
                                        <th>Taxable income high limit</th>
                                        <th>Pagibig value</th>
                                        <th>Year</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {pagibigconfigaration.map((data, index) => {
                                        return (
                                            <tr className="text-dark" key={index}>
                                                <td>{data.taxiableincomelowlimit}</td>
                                                <td>{data.taxiableincomehighlimit}</td>
                                                <td>{data.pagibigvalue}</td>
                                                <td>{data.year}</td>
                                                <td>
                                                    <Link href={`/Settings/Pagibig/Edit/${data.id}`}>
                                                        <button className='edit-btn' >Edit</button>
                                                    </Link>
                                                    &nbsp;

                                                    <button className='edit-btn' onClick={() => handleDelete(data.id)}>Delete</button>
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
            </div>
        </div>
    )
}

export default Pagibig