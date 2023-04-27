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
            <div>
                <br />
                <p id={Styles.p}>PAGIBIG Configuration</p>

                <div className='card shadow-lg p-4 rounded-2 mt-4' id={Styles.card}>
                    <div className='row'>
                        <div className='col-lg-1'></div>
                        <div className='col-lg-4'>
                            <input type="text" placeholder='Search..' className='form-control form-control-md' />
                        </div>
                    </div>
                </div>

                <div className='row mt-3'>
                    <div className='col-lg-10'></div>
                    <div className='col-lg-2'>
                        <Link href="/Configuration/pagibigadd"><button className={Styles.addButton} onClick={clearData.bind(this)} > ADD NEW </button></Link>
                    </div>

                </div>

                <table id={Styles.table} className='table  table-striped mt-3 text-center'>
                    <thead>
                        <tr className='bg-info text-white '>
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
                                        <Link href={`/Masters/Pagibig/Edit/${data.id}`}>
                                            <button className={Styles.actionButton} >Edit</button>
                                        </Link>
                                        &nbsp;

                                        <button className={Styles.actionButton} onClick={() => handleDelete(data.id)}>Delete</button>
                                    </td>
                                </tr>
                            )
                        })
                        }
                    </tbody>
                </table>

            </div>
        </div>
    )
}

export default Pagibig