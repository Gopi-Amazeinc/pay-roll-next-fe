import Layout from "@/components/layout/layout"
import React from 'react'
import { useForm } from 'react-hook-form'
import Link from "next/link"
import axios from "axios"
import styles from "../../../styles/applyloans.module.css"
import Swal from "sweetalert2";
import { apiService } from "@/services/api.service";
import { useRouter } from "next/router";

const Applyloans = () => {
    const hostURL = process.env.NEXT_PUBLIC_API_HOST_URL;
    const { register, formState, watch, handleSubmit } = useForm();
    const { errors } = formState;
    const router = useRouter();

    const onSubmit = async (data) => {
        debugger
        let ddd = [
            {
                "StaffID": sessionStorage.getItem('userID'),
                "LoanType": watch('loanType'),
                "LoanAmount": watch('loanAmount'),
                "Comments": watch('Comments'),
                "Period": watch('Tenure'),
                "Status": 'Manager Pending',
                "EmiAmount": "",
                "Attachment": "",
            }
        ];

        await apiService.commonPostCall('Payroll/InsertEmployeeLoans', ddd);
        Swal.fire("Loan request Added succefully!")
        router.push("/Requests/Applyloans");
    }

    // function clearForm(ApplyLoansdata = null) {
    //     let details={
    //         "staffID":sessionStorage.getItem("userID"),
    //         loanType:ApplyLoansdata?ApplyLoansdata.loanType:"",
    //         loanAmount:ApplyLoansdata?ApplyLoansdata.loanAmount:"",
    //         Tenure:ApplyLoansdata?ApplyLoansdata.Tenure:"",
    //         Comments:ApplyLoansdata?ApplyLoansdata.Comments:""
    //     }
    //     // eslint-disable-next-line react-hooks/rules-of-hooks
    //     useEffect(() => {
    //         clearForm(ApplyLoansdata);
    //     }
    // ),[]}
    return (
        <Layout>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-12">
                        <h4 className="Heading">Apply Loan</h4><br />
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className='card p-3 border-0'>
                                <div className='row'>
                                    <div className='col-lg-2'>
                                        <label style={{ fontWeight: "bold" }}>Loan Type <span style={{ color: "red" }}>*</span></label>
                                        <select className='form-select form-select-sm' {...register('loanType', {
                                            required: "loanType is required", pattern: { value: '^[A-Za-z0-9 ]+$', message: "Please enter a valid Position Name" }
                                        })} >
                                            {/* <option>Select Loan type</option> */}
                                            <option value="">Select Loan Type </option>
                                            <option value="SSS Calamity">SSS Calamity </option>
                                            <option value="SSS Salary">SSS Salary </option>
                                            <option value="HDMF Calamity">HDMF Calamity </option>
                                            <option value="HDMF Salary">HDMF Salary </option>
                                            <option value="Company Loan">Company Loan </option>
                                        </select>
                                        {errors.loanType && <p className="error-message" style={{ color: "red" }}>{errors.loanType.message}</p>}
                                    </div>
                                    <div className='col-lg-2'>
                                        <label style={{ fontWeight: "bold" }}>Loan Amount<span style={{ color: "red" }}>*</span></label>
                                        <input type='number' placeholder='Loan Amount'
                                         {...register('loanAmount', {
                                            required: true,
                                             pattern: /^\d+/
                                         } )} className='form-control form-control-sm' />
                                         <div className="error-message"  style={{ color: "red" }}>

                                        {errors.loanAmount?.type==='required' && 
                                           " Please enter Loan Amounts"}
                                       {errors.loanAmount?.type === "pattern" && 
                                            "numbers only"
                                        }
                                    </div>
                                    </div>
                                    <div className='col-lg-2'>
                                        <label style={{ fontWeight: "bold" }}>Tenure <span style={{ color: "red" }}>*</span></label>
                                        <input type='text' placeholder='Tenure' {...register('Tenure', {
                                          required: true,
                                          pattern: /^\d+/
                                      } )} className='form-control form-control-sm' />
                                      <div className="error-message"  style={{ color: "red" }}>

                                     {errors.Tenure?.type==='required' && 
                                        " Please enter Tenure"}
                                    {errors.Tenure?.type === "pattern" && 
                                         "numbers only"
                                     }
                                 </div>
                                    </div>
                                    <div className='col-lg-4'>
                                        <label style={{ fontWeight: "bold" }}>Comments<span style={{ color: "red" }}>*</span></label>
                                        <textarea rows={3} className='form-control' {...register('Comments', {
                                            required: "Comments is required", pattern: {
                                                value: '^[A-Za-z0-9 ]+$',
                                                message: "Please enter a valid Position Name"
                                            }
                                        })} placeholder='Comments' />
                                        {errors.Comments && <p className="error-message" style={{ color: "red" }}>{errors.Comments.message}</p>}
                                    </div>
                                </div>
                                <div className='row mt-3'>
                                    <div className='col-lg-8'></div>
                                    <div className='col-lg-2'>
                                        <Link href="/Requests/Applyloans">
                                            <button className="submit-button">Cancel</button>
                                        </Link>
                                    </div>
                                    <div className='col-lg-2'>
                                        <button type="submit" className="submit-button">submit</button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Layout>
    )
}
export default Applyloans