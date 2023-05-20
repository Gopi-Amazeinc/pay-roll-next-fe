import React, { useEffect, useState } from 'react'
import Layout from '@/components/layout/layout'
import { useForm } from 'react-hook-form';
import { apiService } from "@/services/api.service";
import Swal from 'sweetalert2';
import Link from 'next/link';
import { useRouter } from 'next/router';

const SemiMonthlyTaxForm = ({  editData}) => {
    const router = useRouter();
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [actionType, setActionType] = useState("insert");

    function clearForm(existingData = null) {
        let semitax = {
            "ID": existingData ? existingData.id : "",
            "Taxlowlevellimit": existingData ? existingData.taxlowlevellimit : "",
            "Taxhighlevellimit": existingData ? existingData.taxhighlevellimit : "",
            "slab": existingData ? existingData.slab : "",
            "Percentage": existingData ? existingData.percentage : "",
            "Taxexcessamount": existingData ? existingData.taxexcessamount : "",
            "Taxdeductionamount": existingData ? existingData.taxdeductionamount : "",
            "Year": existingData ? existingData.year : "",
        }
        reset(semitax)
        setActionType(existingData ? "update" : "insert");
    }
    useEffect(() => {
        const { id } = editData || {};
        if (id) {
           
            getData(id);
        } else {
            clearForm();
        }
    }, []);
    const getData = async (id) => {
        const res = await apiService.commonGetCall(
            "HR/GetTaxconfigarationsemimonthByID?ID=" + id
        );
        clearForm(res.data[0]);
    };
    const onSubmit = async (data) => {
        if (actionType == "insert") {
            await apiService.commonPostCall("HR/InsertTaxconfigarationsemimonth", data) // inserting new division master data [Shashank]
            router.push( '/Settings/SemiMonthlyTax');
            Swal.fire({
                icon: 'success',
                title: 'Added Successfully',
            })
        } else {
            await apiService.commonPostCall("HR/UpdateTaxconfigarationsemimonth", data); // this is for updating or Modifiying the data using  Update Api call
            Swal.fire('Updated successfully')
            router.push('/Settings/SemiMonthlyTax');
        }
    };


 


    return (
        <Layout>
            <div className='container-fluid'>

                <label className='Heading'>Semi Monthly Tax Form</label>
                <br /><br />
                <div className='row'>
                    <div className='col-lg-12'>
                        <div className='card p-3 border-0  rounded-3'>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className='row  '>
                                    <div className='col-lg-3'>
                                        <label className='fw-bold'>Tax low level limit <i className='text-danger'>*</i></label>
                                        <input {...register("Taxlowlevellimit", { required: true })} type="number" placeholder='Tax low level limit' className='form-control' />
                                        {errors.Taxlowlevellimit && <p className='text-danger'>Enter Low level Tax Limit</p>}
                                        <br/>
                                    </div>

                                    <div className='col-lg-2 '>
                                        <label className='fw-bold'>Tax high level limit <i className='text-danger'>*</i></label>
                                        <input {...register("Taxhighlevellimit", { required: true })} type="text" placeholder='Tax high level limit' className='form-control' />
                                        {errors.Taxhighlevellimit && <p className='text-danger'>Enter High Level Limit</p>}
                                    </div>

                                    <div className='col-lg-2 '>
                                        <label className='fw-bold'>slab <i className='text-danger'>*</i></label>
                                        <input {...register("slab", { required: true })} type="text" placeholder='slab' className='form-control' />
                                        {errors.slab && <p className='text-danger'>Enter slab</p>}
                                    </div>

                                    <div className='col-lg-2 '>
                                        <label className='fw-bold'>Percentage <i className='text-danger'>*</i></label>
                                        <input {...register("Percentage", { required: true })} type="text" placeholder='Percentage' className='form-control' />
                                        {errors.Percentage && <p className='text-danger'>Enter Percentage</p>}
                                    </div>

                                    <div className='col-lg-2 '>
                                        <label className='fw-bold'>Tax excess amount <i className='text-danger'>*</i></label>
                                        <input {...register("Taxexcessamount", { required: true })} type="text" placeholder='Tax excess amount' className='form-control' />
                                        {errors.Taxexcessamount && <p className='text-danger'>Enter Excess Amount</p>}
                                    </div>

                                    <div className='col-lg-2 '>
                                        <label className='fw-bold'>Tax deduction amount <i className='text-danger'>*</i></label>
                                        <input {...register("Taxdeductionamount", { required: true })} type="text" placeholder='Tax deduction amount' className='form-control' />
                                        {errors.Taxdeductionamount && <p className='text-danger'>Enter Deduction Amount</p>}
                                    </div>

                                    <div className='col-lg-2 '>
                                        <label className='fw-bold'>Year <i className='text-danger'>*</i></label>
                                        <select {...register("Year", { required: true })} className='form-select'>
                                            <option value="">select Year</option>
                                            <option value="2023">2023</option>
                                            <option value="2024">2024</option>
                                            <option value="2025">2025</option>
                                            <option value="2026">2026</option>
                                            <option value="2027">2027</option>
                                            <option value="2028">2028</option>
                                            <option value="2029">2029</option>
                                            <option value="2030">2030</option>
                                        </select>
                                        {errors.Year && <p className='text-danger'>Please Select Year</p>}
                                    </div>

                                    <div className='col-lg-6'></div>

                                    <div className='col-lg-8'></div>
                                    <div className='col-lg-2 text-end'>

                                     <Link href="/Settings/SemiMonthlyTax"> <button type='submit' className=' AddButton'>Cancel</button>
</Link>
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
                    </Layout>)
}

                    export default SemiMonthlyTaxForm