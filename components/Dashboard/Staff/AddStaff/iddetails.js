import { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import axios from 'axios';
import React, {useCallback} from 'react'
import {useDropzone} from 'react-dropzone'
import Swal from 'sweetalert2';

export default function IDDetails() {
  let hostURL = process.env.NEXT_PUBLIC_API_HOST_URL;
    const { register, handleSubmit, watch, reset, formState: { errors } } = useForm();
    const [actionType, setActionType] = useState("insert");
    const [IDTypeMaster, setIDTypeMaster] = useState([]);
    const [IDDetails, setIDDetails] = useState([]);
    const [Type, setType] = useState(0);
    const [filePath, setFilePath] = useState();

    const onDrop = useCallback(acceptedFiles => {
          debugger
          console.log(acceptedFiles,"Uploaded file")
          uploadFile(acceptedFiles)
          
    }, [])
    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

    const uploadFile = async (data)=>{
      let hostURL = process.env.NEXT_PUBLIC_API_HOST_URL;
      const formData = new FormData();
      formData.append('file_upload', data[0], data[0].name);
      let res = await axios.post(hostURL + "Payroll/ProjectAttachments", formData);
      console.log(res,"File Path")
      Swal.fire("Uploaded successfully")
      setFilePath(res.data);
    }

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
        span: {
            color: 'red'
        }
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
        if (actionType == "insert") {
            let Entity = {
                IDTypeID: Type,
                IDNumber: data.IDNumber,
                NameOnID: data.NameOnID,
                IDAttachment: filePath,
                StaffID: sessionStorage.getItem('userID'),
                NameOfID: data.NameOfID
            }
            await axios.post(hostURL + "Payroll/InsertID_Details", Entity);
            Swal.fire("Saved Successfully!")
            setType(0);
            getData();
            cleardata();
        } else {
            let Entity = {
                ID: data.ID,
                IDTypeID: Type,
                IDNumber: data.IDNumber,
                NameOnID: data.NameOnID,
                IDAttachment: "NoImage",
                StaffID: sessionStorage.getItem('userID'),
                NameOfID: data.NameOfID
            }
            await axios.post(hostURL + "Payroll/UpdateID_Details", Entity);
            Swal.fire("Updated Successfully!")
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
        let res = await axios.get(hostURL + "Payroll/GetID_DetailsByID?ID=" + data);
        cleardata(res.data[0]);

    }

    async function deleteData(data) {
        let hostURL = process.env.NEXT_PUBLIC_API_HOST_URL;
        let res = await axios.get(hostURL + "HR/DeleteID_Details?ID=" + data);
        getData();

    }

   
        
    

    return (
      <div>
        <div className="container-fluid">
          <div className="card">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="row">
                <div className="col-12">
                  <div className="d-flex justify-content-between">
                    <p className="modal-heading">ID Details</p>
                  </div>
                  <div style={customPopupDivision.popupcontent}>
                    <div style={customPopupDivision.popupinputs}>
                      <p>
                        ID Type<span style={customStyles.span}>*</span>
                      </p>
                      {
                        <div>
                          <select
                            className="form-select"
                            value={Type}
                            onChange={(e) => setType(e.target.value)}
                            style={customStyles.inputLabel}
                          >
                            <option value="">Select ID Type</option>
                            {IDTypeMaster.map((data) => {
                              return (
                                <option key={data.id} value={data.id}>
                                  {data.short}
                                </option>
                              );
                            })}
                          </select>
                          {errors.IDTypeID && (
                            <span style={customStyles.errorMsg}>
                              {" "}
                              Please select ID type
                            </span>
                          )}
                        </div>
                      }
                    </div>

                    <div style={customPopupDivision.popupinputs}>
                      <p>
                        ID Number<span style={customStyles.span}>*</span>
                      </p>
                      <div>
                        <input
                          type="text"
                          placeholder="ID Number"
                          {...register("IDNumber", { required: true })}
                          className="form-control "
                        ></input>
                        {errors.IDNumber && (
                          <span style={customStyles.errorMsg}>
                            {" "}
                            Please enter ID number
                          </span>
                        )}
                      </div>
                    </div>

                    <div style={customPopupDivision.popupinputs}>
                      <p>
                        Name on ID<span style={customStyles.span}>*</span>
                      </p>
                      <div>
                        <input
                          type="text"
                          placeholder="Name on ID"
                          {...register("NameOnID", { required: true })}
                          className="form-control "
                        ></input>
                        {errors.NameOnID && (
                          <span style={customStyles.errorMsg}>
                            {" "}
                            Please enter name on ID
                          </span>
                        )}
                      </div>
                    </div>

                    {Type == 4 && (
                      <div style={customPopupDivision.popupinputs}>
                        <p>
                          Name Of ID<span style={customStyles.span}>*</span>
                        </p>
                        <div>
                          <input
                            type="text"
                            placeholder="Name of ID"
                            {...register("NameOfID", { required: true })}
                            className="form-control "
                          ></input>
                          {errors.NameOfID && (
                            <span style={customStyles.errorMsg}>
                              {" "}
                              Please enter name of ID
                            </span>
                          )}
                        </div>
                      </div>
                    )}

                    <div style={customPopupDivision.popupinputs}>
                      <p>
                        Attachments<span style={customStyles.span}>*</span>
                      </p>
                      <div>
                        <div {...getRootProps()}>
                          <input {...getInputProps()} />
                          {isDragActive ? (
                            <p>Drop the files here ...</p>
                          ) : (
                            <p>
                              Drag 'n' drop some files here, or click to select
                              files
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <br></br>
              <div className="d-flex justify-content-center w-100 mt-2 mb-2 pr-2">
                {actionType == "insert" && (
                  <button className="staffSubmitBtn">Submit</button>
                )}
                {actionType == "update" && (
                  <button className="staffSubmitBtn">Update</button>
                )}
              </div>
            </form>

            <div className="row">
              <div className="col-12">
                <table className="table table-hover mb-5">
                  <thead className="bg-info text-white ">
                    <tr>
                      <th>ID Type </th>
                      <th>ID Number </th>
                      <th>Name on ID </th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {IDDetails.map((data, index) => {
                      return (
                        <tr className="text-dark" key={index}>
                          <td>{data.idTypeName}</td>
                          <td>{data.idNumber}</td>
                          <td>{data.nameOnID}</td>
                          <td>{data.status}</td>
                          <td className="d-flex">
                            <button
                              className="staffEditBtn"
                              onClick={editData.bind(this, data.id)}
                            >
                              Edit
                            </button>&nbsp;
                            <button
                              className="staffDeleteBtn"
                              onClick={deleteData.bind(this, data.id)}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    );


}