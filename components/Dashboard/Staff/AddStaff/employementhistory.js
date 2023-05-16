
import { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import axios from 'axios';
import Swal from 'sweetalert2';

export default function EmploymentDetails() {

    const [EmploymentDetals, setEmploymentData] = useState([]);
    const [EmploymentTypeMaster, setEmploymentTypeMaster] = useState([]);
    const { register, handleSubmit, watch, reset, formState: { errors } } = useForm();
    const [actionType, setActionType] = useState("insert");
    const customStyles = {
        content: {
            width: '85%',
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            transform: 'translate(-50%, -50%)',
            height: "70%"
        },
        errorMsg: {
            fontSize: '12px',
            fontWeight: '500',
            color: 'red'
        },
    };

    const customPopupDivision = {
        popupcontent: {
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%'
        },
        popupinputs: {
            width: '48%',
            marginTop: '16px'
        },
        formcontrol: {
            width: '350px !important'
        },

        cardinputs: {
            display: 'flex',
            flexDirection: 'column',
            margin: '5px',
            width: '215px',
            justifyContent: 'center'
        }

    }


    async function onSubmit(data) {
        debugger
        console.log(data)
        let hostURL = process.env.NEXT_PUBLIC_API_HOST_URL;

        if (actionType == "insert") {
            let Entity = {
                CompanyName: data.CompanyName,
                PositionTitle: data.PositionTitle,
                EmployementTypeID: data.EmployementTypeID,
                StartDate: data.StartDate,
                EndDate: data.EndDate,
                StaffID: sessionStorage.getItem('userID')
            }

            await axios.post(hostURL + "HR/InsertEmploymentDetails", Entity);
            Swal.fire("Saved Successfully!")
            getData();
            cleardata()
        }

    }


    function cleardata(existingData = null) {
        debugger
        let etty = {
            CompanyName: "",
            PositionTitle: "",
            EmployementTypeID: "",
            StartDate: "",
            EndDate: "",
            StaffID: sessionStorage.getItem('userID')
        }
        reset(etty);
    }

    useEffect(() => {
        getData();
    }, [1]);

    async function getData() {
        let hostURL = process.env.NEXT_PUBLIC_API_HOST_URL;
        // let res = await axios.get(hostURL + "/HR/GetEmploymentDetails");
        // setEmploymentData(res.data);


        let res1 = await axios.get(hostURL + "/Master/GetEmploymentTypeMaster");
        setEmploymentTypeMaster(res1.data);



    }

    return (
        <div>
            <div className='container-fluid'>
                <div className='card'>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className='row'>
                            <div className='col-12'>
                                <div className="d-flex justify-content-between">
                                    <p className='modal-heading'>Employment History Details</p>
                                </div>
                                <div style={customPopupDivision.popupcontent}>
                                    <div style={customPopupDivision.popupinputs}>
                                        <p>Company Name<span >*</span></p>
                                        <div>
                                            <input type='text' placeholder='Enter Comapany Name..' onkeypress="return /[A-Za-z/\s/g]/i.test(event.key)"
                                                {...register("CompanyName", { required: true })} className='form-control inputwidth' ></input>
                                            {errors.CompanyName && <span style={customStyles.errorMsg}> Please Enter Comapany Name</span>}
                                        </div>
                                    </div>

                                    <div style={customPopupDivision.popupinputs}>
                                        <p>Position Title <span >*</span></p>
                                        <div>
                                            <input type='text' placeholder='Enter Position Title ..'
                                                {...register("PositionTitle", { required: true })} className='form-control inputwidth' ></input>
                                            {errors.PositionTitle && <span style={customStyles.errorMsg}> Please Enter Position Title</span>}
                                        </div>
                                    </div>

                                    <div style={customPopupDivision.popupinputs}>
                                        <p>Employment Type<span >*</span></p>
                                        {
                                            <div>
                                                <select className='form-control inputwidth' {...register("EmployementTypeID", { required: true })} style={customStyles.inputLabel}>
                                                    <option value="">Select Employment Type</option>
                                                    {
                                                        EmploymentTypeMaster.map((data, index) => {
                                                            return (
                                                                <option value={data.id}>{data.short}</option>
                                                            )
                                                        })
                                                    }
                                                </select>
                                                {errors.EmployementTypeID && <span style={customStyles.errorMsg}> Please Enter Employment TYpe</span>}
                                            </div>
                                        }
                                    </div>



                                    <div style={customPopupDivision.popupinputs}>
                                        <p>Start Date<span >*</span></p>
                                        <div>
                                            <input type='date' placeholder='Enter Start Date..'
                                                {...register("StartDate", { required: true })} className='form-control inputwidth'></input>
                                            {errors.StartDate && <span style={customStyles.errorMsg}> Please Enter Start Date</span>}
                                        </div>
                                    </div>

                                    <div style={customPopupDivision.popupinputs}>
                                        <p>End Date<span >*</span></p>
                                        <div>
                                            <input type='date' placeholder='Enter End Date..'
                                                {...register("EndDate", { required: true })} className='form-control inputwidth'></input>
                                            {errors.EndDate && <span style={customStyles.errorMsg}> Please Enter End Date</span>}
                                        </div>
                                    </div>

                                </div>

                                <div class="d-flex justify-content-center w-100 mt-2 mb-2 pr-2">
                                    {/* <button className='close-button' onClick={closeModal}>Cancel</button> */}
                                    {
                                        actionType == "insert" && (
                                            <button className='submit-button' >Submit</button>
                                        )
                                    }
                                    {
                                        actionType == "update" && (
                                            <button className='submit-button' >Update</button>
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                        <br></br>
                    </form>


                    <div className='row'>
                        <div className='col-12'>
                                <table className='table table-hover mb-5'>
                                    <thead className='bg-info text-white '>
                                    <tr>
                                        <th>Company Name</th>
                                        <th>Position Title</th>
                                        <th>Employment Type</th>
                                        <th>Start Date</th>
                                        <th>End Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        EmploymentDetals.map((data, index) => {
                                            return (
                                                <tr className="text-dark" key={index}>
                                                    <td>{data.companyName}</td>
                                                    <td>{data.positionTitle}</td>
                                                    <td>{data.employmentType}</td>
                                                    <td>{data.startDate}</td>
                                                    <td>{data.endDate}</td>

                                                    {/* <td className='d-flex'>
                                                        <button className='editButton' onClick={editData.bind(this, data.id)}>Edit</button>
                                                        <button className='deleteButton' onClick={deleteData.bind(this, data.id)}>Delete</button>
                                                    </td> */}
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )



















}