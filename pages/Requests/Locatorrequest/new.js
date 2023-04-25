import Layout from "@/components/layout/layout"
import Link from "next/link";
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from "axios";
import Swal from "sweetalert2";
import { HiLocationMarker } from "react-icons/hi";


const Locatorrequest = () => {
    const { register, handleSubmit, reset, formState } = useForm();

    const { errors } = formState;

    const hostURL = process.env.NEXT_PUBLIC_API_HOST_URL;

    const [userID, setUserIDData] = useState("")

    useEffect(() => {
        let res = sessionStorage.getItem("userID");
        setUserIDData(res)

    }, []);

    async function onSubmit(data) {
        debugger;
       try {
        const formData = { ...data, userID: userID };
        console.log("form data", formData);
        await axios.post(hostURL + "Payroll/InsertLocatorTable", formData);
        Swal.fire('Data Inserted successfully')
        console.log("Inserted data:", data);
        location.href=("/Requests/Locatorrequest");
       } catch (error) {
        Swal.fire("Insert is not working");
       }
       
    }
    return (
        <Layout>
            <form onSubmit={handleSubmit(onSubmit)} className='card p-3 border-0 shadow-lg rounded-3 mt-4'>
                <div className="row ">
                    <div className="col-lg-2">
                        <label htmlFor="">Transportation Type*</label>
                        <select className="form-control" {...register('TransportationType', { required: true })}  >
                            <option disabled>Select Transport Type</option>
                            <option>Flight</option>
                            <option>Bus</option>
                            <option>Train</option>
                            <option>Car</option>

                        </select>
                    </div>
                    {/* <div className="col-lg-2">
                        <label htmlFor="">Name*</label>
                        <input type="text" className="form-control" {...register('Name', { required: true })} value={Test} />
                    </div> */}
                    <div className="col-lg-2">
                        <label htmlFor="">Start Date*</label>
                        <input type="date" className="form-control" {...register('Date', { required: true })} />

                    </div>
                    <div className="col-lg-2">
                        <label htmlFor="">Return Date*</label>
                        <input type="date" className="form-control" {...register('returndate', { required: true })} />

                    </div>
                    <div className="col-lg-2">
                        <label htmlFor="">Destination</label>
                        <input type="text" className="form-control" {...register('Destination', { required: true })} />

                    </div>
                    <div className="col-lg-2">
                        <label htmlFor="">Purpose</label>
                        <input type="text" className="form-control" {...register('Purpose', { required: true })} />

                    </div>
                    <div className="col-lg-2">
                        <label htmlFor=""> Time Of Departure*</label>
                        <input type="time" className="form-control" {...register('TimeOfDeparture', { required: true })} />
                    </div>
                </div>
                <br />
                <div className="row">
                    <div className="col-lg-2">
                        <label htmlFor=""> Time Of Return*</label>
                        <input type="time" className="form-control" {...register('Pagibigvalue', { required: true })} />
                    </div>
                    <div className="col-lg-2">
                        <label htmlFor=""> Attachment</label>

                    </div>
                </div>
                <br />
                <div className="col-lg-2" style={{ float: "right" }}>
                    <Link href="/Requests/Locatorrequest"><button className='btn btn-primary'>CANCEL</button></Link> &nbsp;
                    <button className="btn btn-primary">Save</button>
                </div>
            </form>
        </Layout>
    )
}
export default Locatorrequest;
