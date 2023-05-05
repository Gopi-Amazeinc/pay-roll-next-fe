import React from 'react';
import Layout from '@/components/layout/layout'
import Styles from '../../../styles/Holidaydash.module.css'
import { useState, useEffect } from 'react';
import Link from 'next/link';
import axios from 'axios';
import Swal from 'sweetalert2';

const Holidaydashboard = () => {


    const hostURL = process.env.NEXT_PUBLIC_API_HOST_URL;

    const [Holiday, setHoliday] = useState([]);


    const getHoliday = async () => {
        let res = await axios.get(hostURL + "HR/GetHolidays"); //This Api is useed for Get the Dashborad data band Master
        setHoliday(res.data);
    }

    useEffect(() => {
        getHoliday()
    }, [1])


    const getData = (data) => {
        sessionStorage.setItem("id", data.id);
    }

    const clearData = () => {
        sessionStorage.setItem("id", "");
    }


    const handleDelete = async (id) => {
        try {
            let res = await axios.get(hostURL + `HR/DeleteHolidays?id=${id}`); // this is for deleting the data for dashborad using delete api call 
            console.log(res.data);
            Swal.fire('Data deleted successfully')
            getHoliday();
        } catch (error) {
            console.error(error);
            Swal.fire('failed to  delete data')
        }
    };


    return (

        <div>
            <br></br> <p id={Styles.title}>Holiday Dashboard</p>
            <div className="container-fluid mt-4">
                <div className="row shadow-lg p-2 rounded-4 p-3 ">
                    <div className="col-lg-1">
                        <b>
                            <p className="mt-2 text-center">
                                <>
                                </>
                                {/* <BiFilterAlt />  */}
                                Filter by:
                            </p>
                        </b>
                    </div>

                    <div className="col-lg-5">
                        {/* <h6>Pay Date</h6> */}
                        {/* <ReactDatePicker   className=" mt-2 form-control"></ReactDatePicker> */}
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


                        <Link href="/Holiday/holidayform"><button className="btn btn-primary btn-sm shadow-lg"
                            id={Styles.addNew} onClick={clearData.bind(this)} > ADD new</button>
                            {/* // onClick={() => setModalOpen(!modalOpen)}>   */}
                            {/* <AiOutlinePlusCircle /> */}

                        </Link>

                    </div>
                </div>
                <br />
                <div className="row">
                    <table className={Styles.commonTable}>
                        <thead>
                            <tr>
                                <th>Holiday</th>
                                <th>Holiday Description</th>
                                <th>Holiday Date</th>
                                <th>Attachment</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>

                            {Holiday.map((data, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{data.holiday}</td>
                                        <td>{data.holidayDescription}</td>
                                        <td>{data.holidayDate}</td>
                                        <td>{data.attachment}</td>
                                        <td>
                                            <Link href={`/Holiday/edit/${data.id}`}>
                                                <button className="editDeleteBtnTable">Edit</button>
                                            </Link>
                                            &nbsp;

                                            <button className="editDeleteBtnTable" onClick={() => handleDelete(data.id)}>Delete</button>
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


    );
}

export default Holidaydashboard;