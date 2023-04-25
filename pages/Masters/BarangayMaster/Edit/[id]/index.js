import { useEffect, useState } from 'react';
import Barangay from '../../../styles/BarangayMasterForm.module.css'
import axios from 'axios';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import Swal from 'sweetalert2'
import Layout from '../../../components/layout/layout'



const BarangayMasterForm = () => {

    const hostURL = process.env.NEXT_PUBLIC_API_HOST_URL;

    const { register, handleSubmit, reset, formState } = useForm();
    const { errors } = formState;

    const [countrydata, setCountryData] = useState([]);
    const [provincedata, setProvinceData] = useState([]);
    const [citydata, setCityData] = useState([]);


    useEffect(() => {
        async function getData() {
            let hostURL = process.env.NEXT_PUBLIC_API_HOST_URL;
            // This API is used to fetch the data from CountryType table 
            let res = await axios.get(hostURL + "Master/GetCountryType");
            setCountryData(res.data);
            // This API is used to fetch the data from StateType table
            res = await axios.get(hostURL + "Master/GetStateType");
            setProvinceData(res.data);
            // This API is used to fetch the data from CityType table
            res = await axios.get(hostURL + "Master/GetCityType");
            setCityData(res.data);
            const id = sessionStorage.getItem("id");
            if (id) {
                // This API is used to fetch the data from BarangayMaster ByID table
                let response = await axios.get(hostURL + "Master/GetBarangayMasterByID?ID=" + id);
                clearForm(response.data[0]);
                console.log(response.data);
            }
            else {
                clearForm();
            }
        }
        getData()
    }, [1]);



    function clearForm(userData = null) {
        let details = {
            "ID": userData ? userData.id : "",
            "CountryID": userData ? userData.countryID : "",
            "ProvinceID": userData ? userData.provinceID : "",
            "CityID": userData ? userData.cityID : "",
            "Name": userData ? userData.name : "",
        }
        reset(details);
    }

    async function onSubmit(data) {
        if (data) {
            await axios.post(hostURL + "Master/UpdateBarangayMaster", data);
            Swal.fire('Data Updated successfully')
        }
    }



    return (
        <Layout>
            <div>
                <div className="container-fluid">
                    <div className="row">

                        <div className="col-lg-5">
                            <h3 className="text-primary fs-5 mt-3 fw-bold">Barangay Details</h3>
                        </div>
                        <div className="col-lg-3">
                        </div>
                        <div className="col-lg-2">
                        </div>
                    </div>
                    <br />
                    <div className={Barangay.card}>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="row">
                                <div className="col-lg-3">
                                    <label className={Barangay.labels}>Country Name<span style={{ color: "red" }}>*</span>  </label> <br />
                                    <select className={Barangay.selecter} {...register("CountryID", { required: true })}>
                                        <option value="" className={Barangay.options}>Select Country</option>
                                        {
                                            countrydata.map((data) => {
                                                return (
                                                    <option value={data.id} key={data.id} >{data.short}</option>
                                                )
                                            })
                                        }
                                    </select>
                                    {errors.CountryID && <p style={{ color: "red" }} className="error">Please select a country</p>}
                                </div>
                                <div className="col-lg-3">
                                    <label className={Barangay.labels}>Province<span style={{ color: "red" }}>*</span></label><br />
                                    <select className={Barangay.selecter} {...register("ProvinceID", { required: true })}>
                                        <option value="">Select State</option>
                                        {
                                            provincedata.map((data) => {
                                                return (
                                                    <option value={data.id} key={data.id} >{data.short}</option>
                                                )
                                            })
                                        }
                                    </select>
                                    {errors.ProvinceID && <p style={{ color: "red" }} className="error">Please select a Province</p>}

                                </div>
                                <div className="col-lg-3">
                                    <label className={Barangay.labels}>City<span style={{ color: "red" }}>*</span> </label><br />
                                    <select className={Barangay.selecter} {...register("CityID", { required: true })}>
                                        <option value="">Select City</option>
                                        {
                                            citydata.map((data) => {
                                                return (
                                                    <option value={data.id} key={data.id} >{data.short}</option>
                                                )
                                            })
                                        }
                                    </select>
                                    {errors.CityID && <p style={{ color: "red" }} className="error">Please select a City</p>}

                                </div>
                                <div className="col-lg-3">
                                    <label className={Barangay.labels}>Barangay<span style={{ color: "red" }}>*</span> </label><br />
                                    <input type="text" className={Barangay.selecter} {...register('Name', { required: true })} />
                                    {errors.Name && <p style={{ color: "red" }} className="error">Please Enter a Barangay</p>}

                                </div>
                            </div>
                            <br />
                            <div className="row">
                                <div className="col-lg-11">
                                    <Link href="/Masters/barangaymasterdashboard"><button className='btn btn-primary' style={{ float: "right", marginLeft: "5px" }} tabindex="0">CANCEL</button></Link>
                                    {
                                        actionType == "insert" && (
                                            <button type='submit' className='btn btn-primary' style={{ float: "right" }}>Save</button>
                                        )
                                    }
                                    {
                                        actionType == "update" && (
                                            <button type='submit' className='btn btn-primary' style={{ float: "right" }}>Update</button>
                                        )
                                    }
                                </div>

                            </div>

                        </form>
                    </div>
                </div>

            </div>
        </Layout>
    )

}

export default BarangayMasterForm;