
import { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import axios from 'axios';
import Swal from 'sweetalert2';

export default function DependentDetails() {
    const [RelationShipMaster, setRelationShipMaster] = useState([]);
    const [DependentList, setDependentList] = useState([]);
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
            let Enity = {
                DependentName: data.DependentName,
                RelationshipID: data.RelationshipID,
                Gender: data.Gender,
                DateOfBirth: data.DateOfBirth,
                StaffID: sessionStorage.getItem('userID'),
                DependentAttachment: "No Image",
            }
            let res = await axios.post(hostURL + "HR/InsertDependentDetails", Enity);
            if (res.data && res.status == 200) {
                // setInsertStatus(true);
                sessionStorage.setItem("InsertStatus", true)
                Swal.fire("Saved Succesfully!");
            }
            cleardata()
            getData();
        }

    }



    function cleardata(existingData = null) {
        debugger
        let etty = {
            DependentName: "",
            RelationshipID: "",
            Gender:  "",
            DateOfBirth: "",
            StaffID: sessionStorage.getItem('userID'),
            DependentAttachment: "No Image",
        }
        reset(etty);
    }





    useEffect(() => {
        debugger
        getData()


    }, [1]);

    async function getData() {
        let hostURL = process.env.NEXT_PUBLIC_API_HOST_URL;

        // let res = await axios.get(hostURL + "HR/GetDependentDetails");
        // setDependentList(res.data);

        let res1 = await axios.get(hostURL + "Master/GetRelationShipMaster");
        setRelationShipMaster(res1.data);


    }


    return (
        <div style={customStyles}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='container-fluid'>
                    <div className='card'>
                        <div className='row'>
                            <div className='col-12'>
                                <div className="d-flex justify-content-between">
                                    <p className='modal-heading'>Dependent Details</p>
                                </div>
                                <div style={customPopupDivision.popupcontent}>

                                    <div style={customPopupDivision.popupinputs}>
                                        <p>Dependent Name(First Name, Middle, Initial and Last Name) <span >*</span></p>
                                        <div>
                                            <input type='text' placeholder='Department Name'
                                                {...register("DependentName", { required: true })} className='form-control inputwidth' ></input>
                                            {errors.DependentName && <span style={customStyles.errorMsg}> Please Enter Department Name</span>}
                                        </div>
                                    </div>

                                    <div style={customPopupDivision.popupinputs}>
                                        <p>Relationship<span >*</span></p>
                                        {
                                            <div>
                                                <select className='form-control inputwidth' {...register("RelationshipID", { required: true })} style={customStyles.inputLabel}>
                                                    <option value="">Select Relationship</option>
                                                    {
                                                        RelationShipMaster.map((data, index) => {
                                                            return (
                                                                <option key={index} value={data.id}>{data.short}</option>
                                                            )
                                                        })
                                                    }
                                                </select>
                                                {errors.RelationshipID && <span style={customStyles.errorMsg}> Please Enter Title</span>}
                                            </div>
                                        }
                                    </div>


                                    <div style={customPopupDivision.popupinputs}>
                                        <p>Date Of Birth<span >*</span></p>
                                        <div>
                                            <input type='date' placeholder='Date Of Birth'
                                                {...register("DateOfBirth", { required: true })} className='form-control inputwidth' ></input>
                                            {errors.DateOfBirth && <span style={customStyles.errorMsg}> Please Enter Date of Birth</span>}
                                        </div>
                                    </div>

                                    <div style={customPopupDivision.popupinputs}>
                                        <p>Gender<span >*</span></p>
                                        <div className="d-flex" style={{ justifyContent: 'start' }} >

                                            <input type='radio' value='Male'
                                                {...register("Gender", { required: true })} className='inputwidth' ></input>
                                            <label class="form-check-label ml-1" for="inlineRadio1">Male</label>

                                            <input type='radio' value='Female'
                                                {...register("Gender", { required: true })} className=' inputwidth' ></input>
                                            <label class="form-check-label ml-1" for="inlineRadio1">Female</label>

                                            {errors.Gender && <span style={customStyles.errorMsg}> Please Enter Date of Birth</span>}

                                        </div>
                                    </div>

                                    <div style={customPopupDivision.popupinputs}>
                                        <p>Attachment<span >*</span></p>
                                        <div>
                                            <input type='file'
                                                {...register("Attachment", { required: false })} className='form-control inputwidth' ></input>
                                            {errors.Attachment && <span style={customStyles.errorMsg}> Please Enter Attachment</span>}
                                        </div>
                                    </div>


                                </div>

                            </div>
                        </div>

                        <div class="d-flex justify-content-center w-100 mt-5 mb-2 pr-2">

                            <button className='submit-button'>Submit</button>

                        </div>

                        <div className='row mt-5 mb-2 pr-2'>
                            <div className='col-12'>
                                <table className='table table-hover mb-5'>
                                    <thead className='bg-info text-white '>
                                        <tr>
                                            <th>Dependent Name</th>
                                            <th>Relationship</th>
                                            <th>Gender</th>
                                            <th>Date Of Birth</th>
                                            <th>Status</th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            DependentList.map((data, index) => {
                                                return (
                                                    <tr className="text-dark" key={index}>
                                                        <td>{data.dependentName}</td>
                                                        <td>{data.relationship}</td>
                                                        <td>{data.gender}</td>
                                                        <td>{data.dateOfBirth}</td>
                                                        <td>{data.status}</td>
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
            </form>
        </div>
    )
}