import { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import axios from 'axios';
// import Dropzone from '../../SharedComponent/dropzone'

export default function IDDetails() {

    const { register, handleSubmit, watch, reset, formState: { errors } } = useForm();
    const [actionType, setActionType] = useState("insert");
    const [IDTypeMaster, setIDTypeMaster] = useState([]);
    const [IDDetails, setIDDetails] = useState([]);
    const [Type, setType] = useState(0);



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
            width: '32%',
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


    useEffect(() => {
        getData();
    }, [1]);

    async function getData() {
        let hostURL = process.env.NEXT_PUBLIC_API_HOST_URL;

        let res = await axios.get(hostURL + "/Master/GetIDTypeMaster");
        setIDTypeMaster(res.data);


        let res1 = await axios.get(hostURL + "/HR/GetID_Details");
        setIDDetails(res1.data);


    }

    async function onSubmit(data) {
        debugger
        console.log(data)
        let hostURL = process.env.NEXT_PUBLIC_API_HOST_URL;

        if (actionType == "insert") {
            let Entity = {
                IDTypeID: Type,
                IDNumber: data.IDNumber,
                NameOnID: data.NameOnID,
                IDAttachment: "No Image",
                StaffID: sessionStorage.getItem('userID'),
                NameOfID: data.NameOfID
            }

            await axios.post(hostURL + "HR/InsertID_Details", Entity);
            setType(0);
            getData();
            cleardata();
        } else {

            let Entity = {
                ID: data.ID,
                IDTypeID: Type,
                IDNumber: data.IDNumber,
                NameOnID: data.NameOnID,
                IDAttachment: "No Image",
                StaffID: sessionStorage.getItem('userID'),
                NameOfID: data.NameOfID
            }

            await axios.post(hostURL + "HR/UpdateID_Details", Entity);
            setType(0);
            getData();
            cleardata();
        }

    }

    function cleardata(existingData = null) {
        debugger
        let etty = {
            ID: existingData ? existingData.id : "",
            IDTypeID: existingData ? existingData.idTypeID : "0",
            IDNumber: existingData ? existingData.idNumber : "",
            NameOnID: existingData ? existingData.nameOnID : "",
            IDAttachment: existingData ? existingData.idAttachment : "",
            StaffID: sessionStorage.getItem('userID'),
            NameOfID: existingData ? existingData.nameOfID : "",
        }
        setType(etty.IDTypeID);
        reset(etty);
        setActionType(existingData ? "update" : 'insert');
    }








    async function editData(data) {
        debugger;
        let hostURL = process.env.NEXT_PUBLIC_API_HOST_URL;
        let res = await axios.get(hostURL + "HR/GetID_DetailsByID?ID=" + data);
        cleardata(res.data[0]);

    }

    async function deleteData(data) {
        let hostURL = process.env.NEXT_PUBLIC_API_HOST_URL;
        let res = await axios.get(hostURL + "HR/DeleteID_Details?ID=" + data);
        getData();

    }





    return (
        <div>
            <div className='container-fluid'>
                <div className='card'>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className='row'>
                            <div className='col-12'>
                                <div className="d-flex justify-content-between">
                                    <p className='modal-heading'>ID Details</p>
                                </div>
                                <div style={customPopupDivision.popupcontent}>

                                    <div style={customPopupDivision.popupinputs}>
                                        <p>ID Type<span >*</span></p>
                                        {
                                            <div>
                                                <select className='form-control inputwidth'
                                                    value={Type} onChange={(e) => setType(e.target.value)}
                                                    style={customStyles.inputLabel}>
                                                    <option value="">Select ID Type</option>
                                                    {
                                                        IDTypeMaster.map((data) => {
                                                            return (
                                                                <option key={data.id} value={data.id}>{data.short}</option>
                                                            )
                                                        })
                                                    }
                                                </select>
                                                {errors.IDTypeID && <span style={customStyles.errorMsg}> Please Enter ID Number</span>}

                                            </div>
                                        }
                                    </div>

                                    <div style={customPopupDivision.popupinputs}>
                                        <p>ID Number<span >*</span></p>
                                        <div>
                                            <input type='text' placeholder='ID Number'
                                                {...register("IDNumber", { required: true })} className='form-control inputwidth' ></input>
                                            {errors.IDNumber && <span style={customStyles.errorMsg}> Please Enter ID Number</span>}
                                        </div>
                                    </div>

                                    <div style={customPopupDivision.popupinputs}>
                                        <p>Name on ID<span >*</span></p>
                                        <div>
                                            <input type='text' placeholder='Name on ID'
                                                {...register("NameOnID", { required: true })} className='form-control inputwidth' ></input>
                                            {errors.NameOnID && <span style={customStyles.errorMsg}> Please Enter Name on ID</span>}
                                        </div>
                                    </div>

                                    {
                                        Type == 4 && (
                                            <div style={customPopupDivision.popupinputs}>
                                                <p>Name Of ID<span >*</span></p>
                                                <div>
                                                    <input type='text' placeholder='Name of ID'
                                                        {...register("NameOfID", { required: true })} className='form-control inputwidth' ></input>
                                                    {errors.NameOfID && <span style={customStyles.errorMsg}> Please Enter Name of ID</span>}
                                                </div>
                                            </div>
                                        )
                                    }

                                    <div style={customPopupDivision.popupinputs}>
                                        <p>Attachments<span >*</span></p>
                                        <div>
                                            {/* <Dropzone /> */}
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                        <br></br>
                        <div className="d-flex justify-content-center w-100 mt-2 mb-2 pr-2">
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
                    </form>


                    <div className='row'>
                        <div className='col-12'>
                            <table className='table table-hover mb-5'>
                                <thead className='bg-info text-white '>
                                    <tr>
                                        <th>ID Type	</th>
                                        <th>ID Number	</th>
                                        <th>Name on ID	</th>
                                        <th>Status</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        IDDetails.map((data, index) => {
                                            return (
                                                <tr className="text-dark" key={index}>
                                                    <td>{data.idTypeName}</td>
                                                    <td>{data.idNumber}</td>
                                                    <td>{data.nameOnID}</td>
                                                    <td>{data.status}</td>
                                                    <td className='d-flex'>
                                                        <button className='editButton' onClick={editData.bind(this, data.id)}>Edit</button>
                                                        <button className='deleteButton' onClick={deleteData.bind(this, data.id)}>Delete</button>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }

                                </tbody>
                            </table>
                        </div>
                    </div>

                </div>

            </div >
        </div >
    )


}