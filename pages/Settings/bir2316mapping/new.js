import React, { useState } from "react";
import Styles from "../../../styles/BIR2316MappingForm.module.css"
import { useForm } from "react-hook-form";
// import { yupResolver } from '@hookform/resolvers/yup';
// import * as Yup from 'yup';
import Link from "next/link";
import Layout from '@/components/layout/layout.js';
function BIRForm() {
    // const validationSchema = Yup.object().shape({
    //     Year: Yup.string().required('Year is required'),
    //     _275TaxCredit: Yup.string().required('27 5% Tax Credit (PERA Act of 2008) is required'),
    //     _3413thMonthPay: Yup.string().required('34 13th Month Pay and Other Benefits (maximum of P90,000) is required'),
    //     _39BasicSalary: Yup.string().required('39 Basic Salary is required'),
    //     _40Representation: Yup.string().required('40 Representation is required'),
    //     _41Transportation: Yup.string().required('41 Transportation is required'),
    //     _42COLA: Yup.string().required('42 Cost of Living Allowance (COLA) is required'),
    //     _43FixedHousingAllowance: Yup.string().required('43 Fixed Housing Allowance is required'),
    //     _44AOthersA: Yup.string().required('44A Others A is required'),
    //     _44AOthersB: Yup.string().required('44A Others B is required'),
    //     _45Commission: Yup.string().required('45 Commission is required'),
    //     _46ProfitSharing: Yup.string().required('46 Profit Sharing is required'),
    //     _47FeesIncludingDirectorFees: Yup.string().required('47 Fees Including Directors Fees is required'),
    //     _48Taxable13thMonthBenefits: Yup.string().required('48 Taxable 13th Month Benefits is required'),
    //     _49HazardPay: Yup.string().required('49 Hazard Pay is required'),
    //     _50OvertimePay: Yup.string().required('50 Overtime Pay is required'),
    //     _51AOthersA: Yup.string().required('51A Others (specify) A is required'),
    //     _51BOthersB: Yup.string().required('51B Others (specify) B is required'),
    //     _36SSS: Yup.string().required('36 SSS, GSIS, PHIC & PAG-IBIG Contributions and Union Dues (Employee share only) is required'),
    //     _30HolidayPay: Yup.string().required('30 Holiday Pay (MWE) is required'),
    //     _31OvertimePay: Yup.string().required('31 Overtime Pay (MWE) is required'),
    //     _32NightShiftDifferential: Yup.string().required('32 Night Shift Differential (MWE) is required'),
    //     _33HazardPay: Yup.string().required('33 Hazard Pay (MWE) is required'),
    //     _29BasicSalary: Yup.string().required('29 Basic Salary (including the exempt P250,000 & below) or the Statutory Minimum Wage of the MWE is required'),
    // })
    // const formOptions = { resolver: yupResolver(validationSchema) };
    const { register, handleSubmit, reset, formState } = useForm();
    const { errors } = formState;
    function onSubmit(data) {
        // display form data on success
        alert('SUCCESS!! :-)\n\n' + JSON.stringify(data, null, 4));
        return false;
    }

    return (
        <Layout>
            <div>
                <br></br>
                <p id={Styles.title}>BIR2316 Mapping</p>
                <div className="row">
                    <div className="card rounded-3" id={Styles.card}>
                        <br></br>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="row">
                                <div className="col-lg-4">
                                    <label id={Styles.label}>Year<span id={Styles.asterisk}>* </span></label>
                                </div>
                                <div className="col-lg-4">
                                    <select class="form-select"
                                        {...register('Year')} className={`form-control ${errors.Year ? 'is-invalid' : ''}`} aria-label="Default select example">
                                        <option selected>Select year</option>
                                        <option value="2019">2019</option>
                                        <option value="2020">2020</option>
                                        <option value="2021">2021</option>
                                        <option value="2022">2022</option>
                                    </select>
                                    <div className="invalid-feedback">{errors.Year?.message}</div>
                                </div>
                            </div>
                            <br></br>
                            <div className="row">
                                <div className="col-lg-4">
                                    <label id={Styles.label}>Description</label>
                                </div>
                                <div className="col-lg-4">
                                    <label id={Styles.label}>Components<span id={Styles.asterisk}>* </span></label>
                                </div>
                            </div>
                            <br></br>
                            <div className="row">
                                <div className="col-lg-4">
                                    <label>27 5% Tax Credit (PERA Act of 2008)</label>
                                </div>
                                <div className="col-lg-4">
                                    <select class="form-select"
                                        {...register('_275TaxCredit')} className={`form-control ${errors._275TaxCredit ? 'is-invalid' : ''}`} aria-label="Default select example">
                                        <option selected>Select Components</option>
                                        <option value="2020">Associate Manager Allowance</option>
                                        <option value="2021">Other Allowance</option>
                                        <option value="2022">Sunday Premium</option>
                                    </select>
                                    <div className="invalid-feedback">{errors._275TaxCredit?.message}</div>
                                </div>
                            </div>
                            <br></br>
                            <div className="row">
                                <div className="col-lg-4">
                                    <label>34 13th Month Pay and Other Benefits (maximum of P90,000)</label>
                                </div>
                                <div className="col-lg-4">
                                    <select class="form-select" {...register('_3413thMonthPay')} className={`form-control ${errors._3413thMonthPay ? 'is-invalid' : ''}`} aria-label="Default select example">
                                        <option selected>Select Components</option>
                                        <option value="2020">Associate Manager Allowance</option>
                                        <option value="2021">Other Allowance</option>
                                        <option value="2022">Sunday Premium</option>
                                    </select>
                                    <div className="invalid-feedback">{errors._3413thMonthPay?.message}</div>
                                </div>
                            </div>
                            <br></br>
                            <div className="row">
                                <div className="col-lg-4">
                                    <label>39 Basic Salary</label>
                                </div>
                                <div className="col-lg-4">
                                    <select class="form-select"
                                        {...register('_39BasicSalary')} className={`form-control ${errors._39BasicSalary ? 'is-invalid' : ''}`} aria-label="Default select example">
                                        <option selected>Select Components</option>
                                        <option value="2020">Associate Manager Allowance</option>
                                        <option value="2021">Other Allowance</option>
                                        <option value="2022">Sunday Premium</option>
                                    </select>
                                    <div className="invalid-feedback">{errors._39BasicSalary?.message}</div>
                                </div>
                            </div>
                            <br></br>
                            <div className="row">
                                <div className="col-lg-4">
                                    <label>40 Representation</label>
                                </div>
                                <div className="col-lg-4">
                                    <select class="form-select"
                                        {...register('_40Representation')} className={`form-control ${errors._40Representation ? 'is-invalid' : ''}`} aria-label="Default select example">
                                        <option selected>Select Components</option>
                                        <option value="2020">Associate Manager Allowance</option>
                                        <option value="2021">Other Allowance</option>
                                        <option value="2022">Sunday Premium</option>
                                    </select>
                                    <div className="invalid-feedback">{errors._40Representation?.message}</div>
                                </div>
                            </div>
                            <br></br>
                            <div className="row">
                                <div className="col-lg-4">
                                    <label>41 Transportation</label>
                                </div>
                                <div className="col-lg-4">
                                    <select class="form-select"
                                        {...register('_41Transportation')} className={`form-control ${errors._41Transportation ? 'is-invalid' : ''}`} aria-label="Default select example">
                                        <option selected>Select Components</option>
                                        <option value="2020">Associate Manager Allowance</option>
                                        <option value="2021">Other Allowance</option>
                                        <option value="2022">Sunday Premium</option>
                                    </select>
                                    <div className="invalid-feedback">{errors._41Transportation?.message}</div>
                                </div>
                            </div>
                            <br></br>
                            <div className="row">
                                <div className="col-lg-4">
                                    <label>42 Cost of Living Allowance (COLA)</label>
                                </div>
                                <div className="col-lg-4">
                                    <select class="form-select"
                                        {...register('_42COLA')} className={`form-control ${errors._42COLA ? 'is-invalid' : ''}`} aria-label="Default select example">
                                        <option selected>Select Components</option>
                                        <option value="2020">Associate Manager Allowance</option>
                                        <option value="2021">Other Allowance</option>
                                        <option value="2022">Sunday Premium</option>
                                    </select>
                                    <div className="invalid-feedback">{errors._42COLA?.message}</div>
                                </div>
                            </div>
                            <br></br>
                            <div className="row">
                                <div className="col-lg-4">
                                    <label>43 Fixed Housing Allowance</label>
                                </div>
                                <div className="col-lg-4">
                                    <select class="form-select"
                                        {...register('_43FixedHousingAllowance')} className={`form-control ${errors._43FixedHousingAllowance ? 'is-invalid' : ''}`} aria-label="Default select example">
                                        <option selected>Select Components</option>
                                        <option value="2020">Associate Manager Allowance</option>
                                        <option value="2021">Other Allowance</option>
                                        <option value="2022">Sunday Premium</option>
                                    </select>
                                    <div className="invalid-feedback">{errors._43FixedHousingAllowance?.message}</div>
                                </div>
                            </div>
                            <br></br>
                            <div className="row">
                                <div className="col-lg-4">
                                    <label>44A Others A</label>
                                </div>
                                <div className="col-lg-4">
                                    <select class="form-select"
                                        {...register('_44AOthersA')} className={`form-control ${errors._44AOthersA ? 'is-invalid' : ''}`} aria-label="Default select example">
                                        <option selected>Select Components</option>
                                        <option value="2020">Associate Manager Allowance</option>
                                        <option value="2021">Other Allowance</option>
                                        <option value="2022">Sunday Premium</option>
                                    </select>
                                    <div className="invalid-feedback">{errors._44AOthersA?.message}</div>
                                </div>
                            </div>
                            <br></br>
                            <div className="row">
                                <div className="col-lg-4">
                                    <label>44A Others B</label>
                                </div>
                                <div className="col-lg-4">
                                    <select class="form-select"
                                        {...register('_44AOthersB')} className={`form-control ${errors._44AOthersB ? 'is-invalid' : ''}`} aria-label="Default select example">
                                        <option selected>Select Components</option>
                                        <option value="2020">Associate Manager Allowance</option>
                                        <option value="2021">Other Allowance</option>
                                        <option value="2022">Sunday Premium</option>
                                    </select>
                                    <div className="invalid-feedback">{errors._44AOthersB?.message}</div>
                                </div>
                            </div>
                            <br></br>
                            <div className="row">
                                <div className="col-lg-4">
                                    <label>45 Commission</label>
                                </div>
                                <div className="col-lg-4">
                                    <select class="form-select"
                                        {...register('_45Commission')} className={`form-control ${errors._45Commission ? 'is-invalid' : ''}`} aria-label="Default select example">
                                        <option selected>Select Components</option>
                                        <option value="2020">Associate Manager Allowance</option>
                                        <option value="2021">Other Allowance</option>
                                        <option value="2022">Sunday Premium</option>
                                    </select>
                                    <div className="invalid-feedback">{errors._45Commission?.message}</div>
                                </div>
                            </div>
                            <br></br>
                            <div className="row">
                                <div className="col-lg-4">
                                    <label>46 Profit Sharing</label>
                                </div>
                                <div className="col-lg-4">
                                    <select class="form-select"
                                        {...register('_46ProfitSharing')} className={`form-control ${errors._46ProfitSharing ? 'is-invalid' : ''}`} aria-label="Default select example">
                                        <option selected>Select Components</option>
                                        <option value="2020">Associate Manager Allowance</option>
                                        <option value="2021">Other Allowance</option>
                                        <option value="2022">Sunday Premium</option>
                                    </select>
                                    <div className="invalid-feedback">{errors._46ProfitSharing?.message}</div>
                                </div>
                            </div>
                            <br></br>
                            <div className="row">
                                <div className="col-lg-4">
                                    <label>47 Fees Including Directors Fees</label>
                                </div>
                                <div className="col-lg-4">
                                    <select class="form-select"
                                        {...register('_47FeesIncludingDirectorFees')} className={`form-control ${errors._47FeesIncludingDirectorFees ? 'is-invalid' : ''}`} aria-label="Default select example">
                                        <option selected>Select Components</option>
                                        <option value="2020">Associate Manager Allowance</option>
                                        <option value="2021">Other Allowance</option>
                                        <option value="2022">Sunday Premium</option>
                                    </select>
                                    <div className="invalid-feedback">{errors._47FeesIncludingDirectorFees?.message}</div>
                                </div>
                            </div>
                            <br></br>
                            <div className="row">
                                <div className="col-lg-4">
                                    <label>48 Taxable 13th Month Benefits</label>
                                </div>
                                <div className="col-lg-4">
                                    <select class="form-select"
                                        {...register('_48Taxable13thMonthBenefits')} className={`form-control ${errors._48Taxable13thMonthBenefits ? 'is-invalid' : ''}`} aria-label="Default select example">
                                        <option selected>Select Components</option>
                                        <option value="2020">Associate Manager Allowance</option>
                                        <option value="2021">Other Allowance</option>
                                        <option value="2022">Sunday Premium</option>
                                    </select>
                                    <div className="invalid-feedback">{errors._48Taxable13thMonthBenefits?.message}</div>
                                </div>
                            </div>
                            <br></br>
                            <div className="row">
                                <div className="col-lg-4">
                                    <label>49 Hazard Pay</label>
                                </div>
                                <div className="col-lg-4">
                                    <select class="form-select"
                                        {...register('_43FixedHousingAllowance')} className={`form-control ${errors._43FixedHousingAllowance ? 'is-invalid' : ''}`} aria-label="Default select example">
                                        <option selected>Select Components</option>
                                        <option value="2020">Associate Manager Allowance</option>
                                        <option value="2021">Other Allowance</option>
                                        <option value="2022">Sunday Premium</option>
                                    </select>
                                    <div className="invalid-feedback">{errors._43FixedHousingAllowance?.message}</div>
                                </div>
                            </div>
                            <br></br>
                            <div className="row">
                                <div className="col-lg-4">
                                    <label>50 Overtime Pay</label>
                                </div>
                                <div className="col-lg-4">
                                    <select class="form-select"
                                        {...register('_50OvertimePay')} className={`form-control ${errors._50OvertimePay ? 'is-invalid' : ''}`} aria-label="Default select example">
                                        <option selected>Select Components</option>
                                        <option value="2020">Associate Manager Allowance</option>
                                        <option value="2021">Other Allowance</option>
                                        <option value="2022">Sunday Premium</option>
                                    </select>
                                    <div className="invalid-feedback">{errors._50OvertimePay?.message}</div>
                                </div>
                            </div>
                            <br></br>
                            <div className="row">
                                <div className="col-lg-4">
                                    <label>51A Others (specify) A</label>
                                </div>
                                <div className="col-lg-4">
                                    <select class="form-select"
                                        {...register('_51AOthersA')} className={`form-control ${errors._51AOthersA ? 'is-invalid' : ''}`} aria-label="Default select example">
                                        <option selected>Select Components</option>
                                        <option value="2020">Associate Manager Allowance</option>
                                        <option value="2021">Other Allowance</option>
                                        <option value="2022">Sunday Premium</option>
                                    </select>
                                    <div className="invalid-feedback">{errors._51AOthersA?.message}</div>
                                </div>
                            </div>
                            <br></br>
                            <div className="row">
                                <div className="col-lg-4">
                                    <label>51B Others (specify) B</label>
                                </div>
                                <div className="col-lg-4">
                                    <select class="form-select"
                                        {...register('_51BOthersB')} className={`form-control ${errors._51BOthersB ? 'is-invalid' : ''}`} aria-label="Default select example">
                                        <option selected>Select Components</option>
                                        <option value="2020">Associate Manager Allowance</option>
                                        <option value="2021">Other Allowance</option>
                                        <option value="2022">Sunday Premium</option>
                                    </select>
                                    <div className="invalid-feedback">{errors._51BOthersB?.message}</div>
                                </div>
                            </div>
                            <br></br>
                            <div className="row">
                                <div className="col-lg-4">
                                    <label>36 SSS, GSIS, PHIC & PAG-IBIG Contributions and Union Dues (Employee share only)</label>
                                </div>
                                <div className="col-lg-4">
                                    <select class="form-select"
                                        {...register('_36SSS')} className={`form-control ${errors._36SSS ? 'is-invalid' : ''}`} aria-label="Default select example">
                                        <option selected>Select Components</option>
                                        <option value="2020">Associate Manager Allowance</option>
                                        <option value="2021">Other Allowance</option>
                                        <option value="2022">Sunday Premium</option>
                                    </select>
                                    <div className="invalid-feedback">{errors._36SSS?.message}</div>
                                </div>
                            </div>
                            <br></br>
                            <div className="row">
                                <div className="col-lg-4">
                                    <label>30 Holiday Pay (MWE)</label>
                                </div>
                                <div className="col-lg-4">
                                    <select class="form-select"
                                        {...register('_30HolidayPay')} className={`form-control ${errors._30HolidayPay ? 'is-invalid' : ''}`} aria-label="Default select example">
                                        <option selected>Select Components</option>
                                        <option value="2020">Associate Manager Allowance</option>
                                        <option value="2021">Other Allowance</option>
                                        <option value="2022">Sunday Premium</option>
                                    </select>
                                    <div className="invalid-feedback">{errors._30HolidayPay?.message}</div>
                                </div>
                            </div>
                            <br></br>
                            <div className="row">
                                <div className="col-lg-4">
                                    <label>31 Overtime Pay (MWE)</label>
                                </div>
                                <div className="col-lg-4">
                                    <select class="form-select"
                                        {...register('_31OvertimePay')} className={`form-control ${errors._31OvertimePay ? 'is-invalid' : ''}`} aria-label="Default select example">
                                        <option selected>Select Components</option>
                                        <option value="2020">Associate Manager Allowance</option>
                                        <option value="2021">Other Allowance</option>
                                        <option value="2022">Sunday Premium</option>
                                    </select>
                                    <div className="invalid-feedback">{errors._31OvertimePay?.message}</div>
                                </div>
                            </div>
                            <br></br>
                            <div className="row">
                                <div className="col-lg-4">
                                    <label>32 Night Shift Differential (MWE)</label>
                                </div>
                                <div className="col-lg-4">
                                    <select class="form-select"
                                        {...register('_32NightShiftDifferential')} className={`form-control ${errors._32NightShiftDifferential ? 'is-invalid' : ''}`} aria-label="Default select example">
                                        <option selected>Select Components</option>
                                        <option value="2020">Associate Manager Allowance</option>
                                        <option value="2021">Other Allowance</option>
                                        <option value="2022">Sunday Premium</option>
                                    </select>
                                    <div className="invalid-feedback">{errors._32NightShiftDifferential?.message}</div>
                                </div>
                            </div>
                            <br></br>
                            <div className="row">
                                <div className="col-lg-4">
                                    <label>33 Hazard Pay (MWE)</label>
                                </div>
                                <div className="col-lg-4">
                                    <select class="form-select"
                                        {...register('_33HazardPay')} className={`form-control ${errors._33HazardPay ? 'is-invalid' : ''}`} aria-label="Default select example">
                                        <option selected>Select Components</option>
                                        <option value="2020">Associate Manager Allowance</option>
                                        <option value="2021">Other Allowance</option>
                                        <option value="2022">Sunday Premium</option>
                                    </select>
                                    <div className="invalid-feedback">{errors._33HazardPay?.message}</div>
                                </div>
                            </div>
                            <br></br>
                            <div className="row">
                                <div className="col-lg-4">
                                    <label>29 Basic Salary (including the exempt P250,000 & below) or the Statutory Minimum Wage of the MWE</label>
                                </div>
                                <div className="col-lg-4">
                                    <select class="form-select"
                                        {...register('_29BasicSalary')} className={`form-control ${errors._29BasicSalary ? 'is-invalid' : ''}`} aria-label="Default select example">
                                        <option selected>Select Components</option>
                                        <option value="2020">Associate Manager Allowance</option>
                                        <option value="2021">Other Allowance</option>
                                        <option value="2022">Sunday Premium</option>
                                    </select>
                                    <div className="invalid-feedback">{errors._29BasicSalary?.message}</div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-4">
                                    <Link href="/Settings/bir2316mapping"> <button id={Styles.btn} onClick={() => reset()}>Cancel</button> </Link>
                                </div>
                                <div className="col-lg-4"></div>
                                <div className="col-lg-4">
                                    <button id={Styles.btn} type="submit">Submit</button>
                                </div>

                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default BIRForm;
