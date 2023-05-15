import Layout from "@/components/layout/layout"
import Link from "next/link";
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from "axios";
import Swal from "sweetalert2";
import { HiLocationMarker } from "react-icons/hi";
import styles from '@/../../styles/Locatorrequest.module.css'
import { apiService } from "@/services/api.service";

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
            const formData = { ...data, StaffID: userID };
            console.log("form data", formData);
            await apiService.commonPostCall("Payroll/InsertLocatorTable", formData);
            Swal.fire('Data Inserted successfully')
            console.log("Inserted data", data);
            location.href = ("/Requests/Locatorrequest");
        } catch (error) {
            Swal.fire("Insert is not working");
        }

    }
    return (
        <Layout>
            <form onSubmit={handleSubmit(onSubmit)} className='card p-3 border-0 shadow-lg rounded-3 mt-4'>
                <div className="row ">  
                    <div className="col-lg-2">
                        <label htmlFor="" className={styles.p}>Date<span style={{ color: "red" }}>*</span></label>
                        <input type="date" className="form-control" {...register('Date', { required: true })} />
                    </div>
                    <div className="col-lg-2">
                        <label htmlFor="" className={styles.p}>Task<span style={{ color: "red" }}>*</span></label>
                        <input type="text" className="form-control" placeholder="Task" {...register('Task', { required: true })} />
                    </div>
                    <div className="col-lg-2">
                        <label htmlFor="" className={styles.p}>Start Time<span style={{ color: "red" }}>*</span>*</label>
                        <input type="time" className="form-control" {...register('StartTime', { required: true })} />
                    </div>
                    <div className="col-lg-2">
                        <label htmlFor="" className={styles.p}>End Time<span style={{ color: "red" }}>*</span></label>
                        <input type="time" className="form-control" {...register('EndTime', { required: true })} />
                    </div>
                    <div className="col-lg-2">
                        <label htmlFor="" className={styles.p}>Comments<span style={{ color: "red" }}>*</span></label>
                        <input type="text" className="form-control" placeholder="Comments" {...register('Comments', { required: true })} />
                    </div>
                </div>
                <br />
                <div className="row">
                    <div className="col-lg-2">
                        <label htmlFor="" className={styles.p}> Attachment</label>
                        <input type="text" className="form-control" {...register('Attachment', { required: false })} />
                    </div>
                </div>
                <br />
                <div className="row">
                    <div className="col-lg-8"></div>
                    <div className="col-lg-2">
                        <Link href="/Requests/Locatorrequest"><button className='submit-button'>CANCEL</button></Link> &nbsp;
                    </div>
                    <div className="col-lg-2" style={{ float: "right" }}>
                        <button className='submit-button'>SAVE</button>
                    </div>
                </div>
            </form>
        </Layout>
    )
}
export default Locatorrequest;
