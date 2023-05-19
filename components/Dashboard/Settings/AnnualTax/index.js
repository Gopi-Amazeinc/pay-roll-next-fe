import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import axios from 'axios'
import Swal from 'sweetalert2'
const AnnualTax = () => {
    const [annualTax, setannualTaxData] = useState([]);
    let hostURL = process.env.NEXT_PUBLIC_API_HOST_URL;
    useEffect(() => {
        getData();
    }, []);

    async function getData() {
        let res = await axios.get(
            hostURL + "HR/GetTaxconfigaration"  //naveen.th@amazeinc.in, Get API for tax configuration, to fetch data
        );
        setannualTaxData(res.data);
    }
    const deleteAnnualTax = async (id) => {
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
                axios.get(hostURL + "HR/DeleteTaxconfigaration?ID=" + id); //naveen.th@amazeinc.in, Delete API for tax configuration, to delete data by ID
                getData()
            }
        });

    }
    const clearSession = async () => {
        sessionStorage.setItem("annualTaxID", "")
    }
    const edit = async (id) => {
        sessionStorage.setItem("annualTaxID", id);
    }
    return (
        <div>
            <div className='container-fluid'>
                <label className='Heading '>Annual Tax Configuration</label>
                <br /><br />
                <div className='row'>
                    <div className='col-lg-12'>
                        <div className='card p-3 border-0 rounded-3'>
                            <div className='row'>
                                <div className='col-lg-1'>
                                    <p>Filter By</p>
                                </div>

                                <div className='col-lg-3'>
                                    <input type="text" className='form-control' placeholder='Search...' />
                                </div>
                            </div>
                        </div>
                    </div></div>
                <br></br>
                <div className='row'>
                    <div className='col-lg-10'></div>
                    <div className='col-lg-2'>
                        
                        <Link href="/Settings/AnnualTax/new"><button onClick={clearSession} className='AddButton'  >Add New</button></Link>
                        
                    </div>
                </div>
                <br/>
                <div className='row'><div className='col-lg-12'>
                
                    <table className='table table-hover '>
                        <thead className='bg-info text-white '>
                            <tr>
                                <th>Tax low level limit</th>
                                <th>Tax high level limit</th>
                                <th>Slab</th>
                                <th>Percentage</th>
                                <th>Tax excess amount</th>
                                <th>Tax deduction amount</th>
                                <th>Year</th>
                                <th>Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                annualTax.map((data, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{data.taxlowlevellimit}</td>
                                            <td>{data.taxhighlevellimit}</td>
                                            <td>{data.slab}</td>
                                            <td>{data.percentage}</td>
                                            <td>{data.taxexcessamount}</td>
                                            <td>{data.taxdeductionamount}</td>
                                            <td>{data.year}</td>
                                            <td>
                                                <Link href={`/Settings/AnnualTax/Edit/${data.id}`}>
                                                    <button
                                                        className='edit-btn'
                                                    // onClick={edit.bind(this, data.id)}
                                                    >
                                                        Edit
                                                    </button>
                                                </Link>
                                                &nbsp;&nbsp;&nbsp;&nbsp;
                                                <button
                                                    className='edit-btn' 
                                                    onClick={deleteAnnualTax.bind(
                                                        this,
                                                        data.id
                                                    )}
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })
                            }
                        </tbody>
                    </table>
                {/* </div> */}
                </div>
                </div>
            </div>
        </div >
    )
}

export default AnnualTax