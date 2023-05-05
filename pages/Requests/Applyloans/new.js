import Layout from "@/components/layout/layout"
import React from 'react'
import { useForm } from 'react-hook-form'
import Link from "next/link"
import axios from "axios"
import styles from "../../../styles/applyloans.module.css"

const Applyloans = () => {
    const hostURL = process.env.NEXT_PUBLIC_API_HOST_URL;
    const { register, formState, watch, handleSubmit } = useForm();
    const { errors } = formState;
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
        //ddd.push(data);
        await axios.post(hostURL + 'Payroll/InsertEmployeeLoans', ddd)

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

            <h4 className="text-primary mx-2">Apply Loan</h4>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='card shadow-lg p-3'>
                    <div className='row'>
                        <div className='col-lg-2'>
                            <p className={styles.p}>Loan Type <span style={{ color: "red" }}>*</span></p>
                            <select className='form-select form-select-sm' {...register('loanType', {
                                required: "loanType is required", pattern: { value: '^[A-Za-z0-9 ]+$', message: "Please enter a valid Position Name" }
                            })} >
                                <option>Select Loan type</option>
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
                            <p className={styles.p}>Loan Amount<span style={{ color: "red" }}>*</span></p>
                            <input type='text' placeholder='Loan Amount' {...register('loanAmount', {
                                required: "Loan amount  is required", pattern: {
                                    value: '^[A-Za-z0-9 ]+$',
                                    message: "Please enter a valid Position Name"
                                }
                            })} className='form-control form-control-sm' />
                            {errors.loanAmount && <p className="error-message" style={{ color: "red" }}>{errors.loanAmount.message}</p>}
                        </div>
                        <div className='col-lg-2'>
                            <p className={styles.p}>Tenure <span style={{ color: "red" }}>*</span></p>
                            <input type='text' placeholder='Tenure' {...register('Tenure', {
                                required: "Tenure is required", pattern: {
                                    value: '^[A-Za-z0-9 ]+$',
                                    message: "Please enter a valid Tenure"
                                }
                            })} className='form-control form-control-sm' />
                            {errors.Tenure && <p className="error-message" style={{ color: "red" }}>{errors.Tenure.message}</p>}
                        </div>
                        <div className='col-lg-4'>
                            <p className={styles.p}>Comments<span style={{ color: "red" }}>*</span></p>
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
        </Layout>
    )
}
export default Applyloans