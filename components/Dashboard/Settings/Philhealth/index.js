import React from 'react'
import Link from 'next/link'
import { useEffect, useState } from "react";
import axios from 'axios'
import Styles from '../../../../styles/philhealth.module.css'
import Swal from 'sweetalert2';

function Philhealth() {

    const [PhilhealthDash, setPhilhealthDash] = useState([]);


    const getPhilhealthDash = async () => {
        let hostURL = process.env.NEXT_PUBLIC_API_HOST_URL;
        let res = await axios.get(hostURL + "HR/GetPhihealthconfogaration");
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
            let hostURL = process.env.NEXT_PUBLIC_API_HOST_URL;
            const res = await axios.get(
                hostURL + `HR/DeletePhihealthconfogaration?id=${id}`
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
            <div>
                <br />
                <p className={Styles.p}>Philhealth Configuration</p>
                <div className={'card shadow-lg p-4 rounded-3 mt-4 ' + Styles.card}>
                    <div className='row'>
                        <div className='col-lg-4'>
                            <input type="text" placeholder='Search..' className='form-control form-control-md' />
                        </div>
                    </div>
                </div>

                <div className='row mt-3'>
                    <div className='col-lg-11'></div>
                    <div className='col-lg-1'>
                        <Link href="/Settings/Philhealth/new" >  <button className={Styles.addButton} onClick={clearFormData.bind(this)}>  ADD </button></Link>
                    </div>

                </div>

                <table className='table  table-striped mt-3 text-center'>
                    <thead>
                        <tr className='bg-info text-white '>
                            <th>Taxable income low limit</th>
                            <th>Taxable income high limit</th>
                            <th>Phihealth value</th>
                            <th>Year</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            PhilhealthDash.map((data) => {
                                return (
                                    <tr key={data.id}>
                                        <td>{data.taxiableincomelowlimit}</td>
                                        <td>{data.taxiableincomehighlimit}</td>
                                        <td>{data.phihealthvalue}</td>
                                        <td>{data.year}</td>
                                        <td>
                                            <Link href={`/Settings/Philhealth/Edit/${data.id}`}><button className={Styles.actionButton}> Edit</button></Link>
                                            &nbsp;
                                            <button className={Styles.actionButton} onClick={() => DeletePhillhealth(data.id)} > Delete</button>
                                        </td>
                                    </tr>
                                );
                            })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Philhealth