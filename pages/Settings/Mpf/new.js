import Layout from '@/components/layout/layout'
import { useForm } from 'react-hook-form';
import axios from 'axios';
import Swal from 'sweetalert2';
import Link from 'next/link';
import Styles from '../../../styles/mpfadd.module.css'
import { useEffect, useState } from 'react';
import { apiService } from "@/services/api.service";
import { useRouter } from 'next/router';
function MpfForm({ editData}) {
    const { register, handleSubmit, reset, formState } = useForm();
    const { errors } = formState;
    const [actionType, setActionType] = useState("insert");
    const router = useRouter();
 
    function clearForm(mpfData = null) {
        let details = {
          "ID": mpfData ? mpfData.id : "",
          "Taxiableincomelowlimit": mpfData ? mpfData.taxiableincomelowlimit : "",
          "Taxiableincomehighlimit": mpfData ? mpfData.taxiableincomehighlimit : "",
          "MPF_EEvalue": mpfData ? mpfData.mpF_EEvalue : "",
          "MPF_ERvalue": mpfData ? mpfData.mpF_ERvalue : "",
          "MPF_Ecvalue": mpfData ? mpfData.mpF_Ecvalue : "",
          "Year": mpfData ? mpfData.year : ""
        }
        reset(details);
        setActionType(mpfData ? "update" : "insert");
      }
      useEffect(() => {
        const { id } = editData || {};
        if (id) {
            // This API is used to fetch the data from BarangayMaster ByID table
            getData(id);
        } else {
            clearForm();
        }
    }, []);

    const getData = async (id) => {
        const res = await apiService.commonGetCall(
            "HR/GetMPFconfogarationByID?ID=" + id
        );
        clearForm(res.data[0]);
    };

    const onSubmit = async (data) => {
        if (actionType == "insert") {
            await apiService.commonPostCall("HR/InsertMPFconfogaration", data) // inserting new division master data [Shashank]
            router.push('/Settings/Mpf');
            Swal.fire({
                icon: 'success',
                title: 'Added Successfully',
            })
        } else {
            await apiService.commonPostCall("HR/UpdateMPFconfogaration", data); // this is for updating or Modifiying the data using  Update Api call
            Swal.fire('Updated successfully')
            router.push( '/Settings/Mpf');
        }
    };




    return (
        <Layout>
            <div className='container-fluid'>
                <label className='Heading'>MPF Configuration Form</label>
                <br /><br />
                <div className='row'>
                    <div className='col-lg-12'>
                        <div className='card p-3 border-0  rounded-3'>

                            <form onSubmit={handleSubmit(onSubmit)}>
                             
                                    <div className='row'>
                                        <div className='col-lg-3'>
                                            <label className='fw-bold'>Taxable income low limit <span className={Styles.span}>*</span></label>
                                            <input type="tel" placeholder="Enter Low limit" name="Taxiableincomelowlimit" id="Taxiableincomelowlimit" className="form-control" {...register("Taxiableincomelowlimit", { required: "This field is required", pattern: { value: '^[0-9 .]+$', message: "Please enter a valid Detail" } })} />
                                            {errors.Taxiableincomelowlimit && <p className="error-message" style={{ color: "red" }}>{errors.Taxiableincomelowlimit.message}</p>}
                                        <br/>
                                        </div>
                                        <div className='col-lg-3'>
                                            <label className='fw-bold'>Taxable income high limit <span className={Styles.span}>*</span></label>
                                            <input type="tel" placeholder="Enter High limit" name="Taxiableincomehighlimit" id="Taxiableincomehighlimit" className="form-control" {...register("Taxiableincomehighlimit", { required: "This field is required", pattern: { value: '^[0-9 .]+$', message: "Please enter a valid Detail" } })} />
                                            {errors.Taxiableincomehighlimit && <p className="error-message" style={{ color: "red" }}>{errors.Taxiableincomehighlimit.message}</p>}
                                        </div>
                                        <div className='col-lg-2'>
                                            <label className='fw-bold'>MPF EE value <span className={Styles.span}>*</span></label>
                                            <input type="tel" placeholder="Enter MPF EE value" name="MPF_EEvalue" id="MPF_EEvalue" className="form-control " {...register("MPF_EEvalue", { required: "This field is required", pattern: { value: '^[0-9 .]+$', message: "Please enter a valid Detail" } })} />
                                            {errors.MPF_EEvalue && <p className="error-message" style={{ color: "red" }}>{errors.MPF_EEvalue.message}</p>}
                                        </div>
                                        <div className='col-lg-2'>
                                            <label className='fw-bold'>MPF ER value<span className={Styles.span}>*</span></label>
                                            <input type="text" placeholder="Enter MPF ER value" name="MPF_ERvalue" id="MPF_ERvalue" className="form-control " {...register("MPF_ERvalue", { required: "This field is required", pattern: { value: '^[0-9 .]+$', message: "Please enter a valid Detail" } })} />
                                            {errors.MPF_ERvalue && <p className="error-message" style={{ color: "red" }}>{errors.MPF_ERvalue.message}</p>}
                                        </div>
                                        <div className='col-lg-2'>
                                            <label className='fw-bold'>MPF EC value <span className={Styles.span}>*</span></label>
                                            <input type="text" placeholder="Enter MPF EC value" name="MPF_Ecvalue" id="MPF_Ecvalue" className="form-control " {...register("MPF_Ecvalue", { required: "This field is required", pattern: { value: '^[0-9 .]+$', message: "Please enter a valid Detail" } })} />
                                            {errors.MPF_Ecvalue && <p className="error-message" style={{ color: "red" }}>{errors.MPF_Ecvalue.message}</p>}
                                        </div>
                                        <div className='col-lg-2'>
                                            <label className='fw-bold'>Year<span className={Styles.span}>*</span></label>
                                            <select className="form-control" {...register("Year", { required: "This field is required" })}>
                                                <option value='' >Select year</option>
                                                <option>2023</option>
                                                <option>2024</option>
                                                <option>2025</option>
                                                <option>2026</option>
                                                <option >2027</option>
                                                <option>2028</option>
                                            </select>
                                            {errors.Year && <p className="error-message" style={{ color: "red" }}>{errors.Year.message}</p>}
                                        </div>
                                    </div>
                                    <br />
                                <div className="row ">
                                    <div className="col-lg-8"></div>
                                    <div className="col-lg-2">
                                            <Link href='/Settings/Mpf'><button className='AddButton'>Cancel</button></Link>
                                        </div>
                                        <div className='col-lg-2'>
                                        {
                                            actionType == "insert" && (
                                                <button type='submit' className="AddButton" >Save</button>
                                            )
                                        }
                                        {
                                            actionType == "update" && (
                                                <button type='submit' className="AddButton" >Update</button>
                                            )
                                        }
                                    </div>
                                    </div>

                                
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default MpfForm