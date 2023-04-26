import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
import Link from 'next/link'

const SemiMonthlyTax = () => {
    let [dashboard, setDashboard] = useState([])
    let hostURL = process.env.NEXT_PUBLIC_API_HOST_URL;
    const getData = async () => {
        const res = await axios.get(hostURL + "HR/GetTaxconfigarationsemimonth") //getting semiannual tax data and displaying in table [Shashank]
        console.log(res.data)
        setDashboard(res.data)
    }

    const getId = async (data) => {
        sessionStorage.setItem("id", data.id)
    }

    const removeItem = async () => {
        sessionStorage.setItem("id", "")
    }

    const deleteAnnualtax = (id) => {
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
                axios.get(hostURL + "HR/DeleteTaxconfigarationsemimonth?ID=" + id) //Deleting semiannual tax data based on ID [Shashank]
                Swal.fire({
                    icon: "success",
                    titleText: "Deleted Successfully"
                })
            }
            getData();
        })


    }

    useEffect(() => {
        getData();
    }, [])
    return (
        <div>
            <div className='container'>
                <h3 className='text-primary fs-4 mt-3'>Semi Monthly Tax</h3>

                <div className='card p-3 border-0 shadow-lg rounded-3 mt-4'>
                    <div className='row'>
                        <div className='col-lg-1'>
                            <p>Filter By</p>
                        </div>

                        <div className='col-lg-4'>
                            <input type="text" className='form-control' placeholder='Search...' />
                        </div>
                    </div>
                </div>

                <div className='row'>
                    <div className='col-lg-10'></div>
                    <div className='col-lg-2 mt-2 text-end'>
                        <Link href="/Masters/SemiMonthlyTax/new" onClick={removeItem} className='btn btn-primary'>Add New</Link>
                    </div>

                    <table className='table table-hover mt-2 '>
                        <thead className='bg-info text-white '>
                            <tr>
                                <th>Tax low level limit</th>
                                <th>Tax high level limit</th>
                                <th>slab</th>
                                <th>Percentage</th>
                                <th>Tax excess amount</th>
                                <th>Tax deduction amount</th>
                                <th>Year</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                dashboard.map((data) => {
                                    return (
                                        <tr key={data.id}>
                                            <td>{data.taxlowlevellimit}</td>
                                            <td>{data.taxhighlevellimit}</td>
                                            <td>{data.slab}</td>
                                            <td>{data.percentage}</td>
                                            <td>{data.taxexcessamount}</td>
                                            <td>{data.taxdeductionamount}</td>
                                            <td>{data.year}</td>
                                            <td>
                                                <Link href={`/Masters/SemiMonthlyTax/Edit/${data.id}`}> <button type='submit' className="btn btn-primary AddButton mb-1">Edit</button></Link>
                                                <button onClick={deleteAnnualtax.bind(this, data.id)} type='submit' className="btn btn-primary AddButton">Delete</button>
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
    )
}

export default SemiMonthlyTax