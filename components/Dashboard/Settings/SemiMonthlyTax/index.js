import React, { useState, useEffect } from 'react'
import { apiService } from "@/services/api.service";
import Swal from 'sweetalert2'
import Link from 'next/link'
const SemiMonthlyTax = () => {
    let [dashboard, setDashboard] = useState([])
    let hostURL = process.env.NEXT_PUBLIC_API_HOST_URL;
    const getData = async () => {
        let res = await apiService.commonGetCall("HR/GetTaxconfigarationsemimonth") //getting semiannual tax data and displaying in table [Shashank]
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
                let res = apiService.commonGetCall("HR/DeleteTaxconfigarationsemimonth?ID=" + id) //Deleting semiannual tax data based on ID [Shashank]
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
            <div className='container-fluid'>
                <label className='Heading'>Semi Monthly Tax</label>
                <br /><br />
                <div className='row'>
                    <div className="col-lg-12">
                        <div className='card p-3 border-0 rounded-3 '>
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
                <div className='row'>
                    <div className='col-lg-10'></div>
                    <div className='col-lg-2'>
                        <br />
                        <Link href="/Settings/SemiMonthlyTax/new"><button onClick={removeItem} className='AddButton'>Add New</button></Link>
                    </div>
                </div>
                <br />
                <div className='row'>
                    <div className='col-lg-12'>
                        <table className='table table-hover'>
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
                                                    <Link href={`/Settings/SemiMonthlyTax/Edit/${data.id}`}> <button type='submit' className='edit-btn'>Edit</button></Link>
                                                    &nbsp;<button onClick={deleteAnnualtax.bind(this, data.id)} type='submit' className='edit-btn'>Delete</button>
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
    )
}

export default SemiMonthlyTax