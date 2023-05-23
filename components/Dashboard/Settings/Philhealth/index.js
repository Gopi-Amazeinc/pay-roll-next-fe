import React from 'react'
import Link from 'next/link'
import { useEffect, useState } from "react";
import { apiService } from "@/services/api.service";
import Styles from '../../../../styles/philhealth.module.css'
import Swal from 'sweetalert2';
import { BiFilterAlt } from "react-icons/bi";

function Philhealth() {
    const [keyword, setKeyword] = useState("");
    const [PhilhealthDash, setPhilhealthDash] = useState([]);


    const getPhilhealthDash = async () => {
        let hostURL = process.env.NEXT_PUBLIC_API_HOST_URL;
        let res = await apiService.commonGetCall("HR/GetPhihealthconfogaration");
        setPhilhealthDash(res.data);
    };


    useEffect(() => {
        getPhilhealthDash();
    }, [1]);


    const getPhilhealthDashdataEdit = (data) => {
        sessionStorage.setItem("id", data.id);
        console.log(data.id);
    };

    const clearFormData = () => {
        sessionStorage.setItem("id", "");
    };



    async function DeletePhillhealth(id) {
        debugger;
        try {
            // let hostURL = process.env.NEXT_PUBLIC_API_HOST_URL;
            const res = await apiService.commonGetCall(
                 `HR/DeletePhihealthconfogaration?id=${id}`
            );
            console.log(res.data);
            Swal.fire("Deleted succesfullly");
            getPhilhealthDash();
        } catch (error) {
            console.error(error);
            alert("Failed to delete data");
        }
    }

    return (
        <div>
            <div className='container-fluid'>

                <label className="Heading">Philhealth Configuration</label>
                <br /><br />
                <div className='row'>
                    <div className="col-lg-12">
                        <div className='card p-3 border-0 rounded-3 '>
                            <div className='row'>
                            <div className="col-lg-1">
                                    <p> <BiFilterAlt /> Filter By</p>
                                </div>
                        
                                <div className='col-lg-3'>
                                    <input type="text" className='form-control' placeholder='Search...' onChange={e => setKeyword(e.target.value)}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-lg-10'></div>
                    <div className='col-lg-2'>
                        <br />
                        <Link href="/Settings/Philhealth/new" >  <button className='AddButton' onClick={clearFormData.bind(this)}>  ADD New</button></Link>
                    </div>

                </div>
                <br />
                <div className='row'>
                    <div className='col-lg-12'>
                        <table className='table table-hover'>
                            <thead className='bg-info text-white '>
                                <tr >
                                    <th>Taxable income low limit</th>
                                    <th>Taxable income high limit</th>
                                    <th>Phihealth value</th>
                                    <th>Year</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    PhilhealthDash.filter(data => {
                                        if ((data.taxiableincomelowlimit.toString().includes(keyword.toString())) || (data.taxiableincomehighlimit.toString().includes(keyword.toString()))||
                                        (data.phihealthvalue.toString().includes(keyword.toString()))||
                                        
                                        (data.year.toString().includes(keyword.toString()))) {
                                            return data;
                                        }
                                    }).map((data) => {
                                        return (
                                            <tr key={data.id}>
                                                <td>{data.taxiableincomelowlimit}</td>
                                                <td>{data.taxiableincomehighlimit}</td>
                                                <td>{data.phihealthvalue}</td>
                                                <td>{data.year}</td>
                                                <td>
                                                    <Link href={`/Settings/Philhealth/Edit/${data.id}`}><button className='edit-btn'> Edit</button></Link>
                                                    &nbsp;
                                                    <button className='edit-btn' onClick={() => DeletePhillhealth(data.id)} > Delete</button>
                                                </td>
                                            </tr>
                                        );
                                    })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Philhealth