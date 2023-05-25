import { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import axios from 'axios';
import React, {useCallback} from 'react'
import {useDropzone} from 'react-dropzone'
import Swal from 'sweetalert2';
import { apiService } from "@/services/api.service";

export default function DependentDetails({data}) {
    const [RelationShipMaster, setRelationShipMaster] = useState([]);
    const [DependentList, setDependentList] = useState([]);
    const { register, handleSubmit, watch, reset, formState: { errors } } = useForm();
    const [actionType, setActionType] = useState("insert");

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
                StaffID:  sessionStorage.getItem('CreatedEmpID'),
                DependentAttachment: filePath,
            }
            let res = await axios.post(hostURL + "Payroll/InsertDependentDetails", Enity);
            if (res.data && res.status == 200) {
                // setInsertStatus(true);
                sessionStorage.setItem("InsertStatus", true)
                Swal.fire("Saved Succesfully!");
            }
            cleardata()
            getData();
        }
        else{
            let Enity = {
                ID: data.ID,
                DependentName: data.DependentName,
                RelationshipID: data.RelationshipID,
                Gender: data.Gender,
                DateOfBirth: data.DateOfBirth,
                StaffID: sessionStorage.getItem('CreatedEmpID'),
                DependentAttachment: "No Image",
            }
            await axios.post(hostURL + "Payroll/UpdateDependentDetails", Enity);
            Swal.fire("Updated Successfully!")
            getData();
            cleardata()
        }

    }



    function cleardata(existingData = null) {
        debugger
        let etty = {
            ID: existingData ? existingData.id : "",
            DependentName: existingData ? existingData.dependentName : "",
            RelationshipID: existingData ? existingData.relationshipID : "",
            Gender:  existingData ? existingData.gender : "",
            DateOfBirth: existingData ? existingData.dateOfBirth : "",
            StaffID: sessionStorage.getItem('CreatedEmpID'),
            DependentAttachment: "No Image",
        }
        reset(etty);
        setActionType(existingData ? "update" : 'insert');
    }

    useEffect(() => {
        debugger
        makecalls()
    }, [1]);
    function makecalls() {
      const { id } = data || {};
      if (id) {
        getByID(id);
      } else {
        cleardata()
        getData();
      }
    }
    const getByID = async (id) => {
      debugger;
      await getData();
      const res = await apiService.commonGetCall(
        "Payroll/GetDependentDetailsByStaffID?StaffID=" + id
      );
      setDependentList(res.data);
    };
  
    async function getData() {
        let hostURL = process.env.NEXT_PUBLIC_API_HOST_URL;

        // let res = await axios.get(hostURL + "HR/GetDependentDetails");
        // setDependentList(res.data);

        let res1 = await axios.get(hostURL + "Master/GetRelationShipMaster");
        setRelationShipMaster(res1.data);
    }
    async function editData(data) {
        debugger;
        let hostURL = process.env.NEXT_PUBLIC_API_HOST_URL;
        let res = await axios.get(hostURL + "Payroll/GetDependentDetailsByID?ID=" + data);
        cleardata(res.data[0]);
        makecalls()
    }

    async function deleteData(data) {
        let hostURL = process.env.NEXT_PUBLIC_API_HOST_URL;
        let res = await axios.get(hostURL + "HR/DeleteDependentDetails?ID=" + data);
        getData();

    }

    return (
      <div style={customStyles}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="container-fluid">
            <div className="card p-3 border-0">
              <div className="row">
                <div className="col-12">
                  <h6>Dependent Details</h6>
                  <hr />
                  <div style={customPopupDivision.popupcontent}>
                    <div style={customPopupDivision.popupinputs}>
                      <p>
                        Dependent Name(First Name, Middle, Initial and Last
                        Name) <span style={customStyles.span}>*</span>
                      </p>
                      <div>
                        <input
                          type="text"
                          placeholder="Department Name"
                          {...register("DependentName", { required: true })}
                          className="form-control "
                        ></input>
                        {errors.DependentName && (
                          <span style={customStyles.errorMsg}>
                            {" "}
                            Please enter department name
                          </span>
                        )}
                      </div>
                    </div>

                    <div style={customPopupDivision.popupinputs}>
                      <p>
                        Relationship<span style={customStyles.span}>*</span>
                      </p>
                      {
                        <div>
                          <select
                            className="form-select "
                            {...register("RelationshipID", { required: true })}
                            style={customStyles.inputLabel}
                          >
                            <option value="">Select Relationship</option>
                            {RelationShipMaster.map((data) => {
                              return (
                                <option key={data.id} value={data.id}>
                                  {data.short}
                                </option>
                              );
                            })}
                          </select>
                          {errors.RelationshipID && (
                            <span style={customStyles.errorMsg}>
                              {" "}
                              Please select relationship
                            </span>
                          )}
                        </div>
                      }
                    </div>

                    <div style={customPopupDivision.popupinputs}>
                      <p>
                        Date Of Birth<span style={customStyles.span}>*</span>
                      </p>
                      <div>
                        <input
                          type="date"
                          placeholder="Date Of Birth"
                          {...register("DateOfBirth", { required: true })}
                          className="form-control "
                        ></input>
                        {errors.DateOfBirth && (
                          <span style={customStyles.errorMsg}>
                            {" "}
                            Please enter date of birth
                          </span>
                        )}
                      </div>
                    </div>

                    <div style={customPopupDivision.popupinputs}>
                      <p>
                        Gender<span style={customStyles.span}>*</span>
                      </p>
                      <div
                        className="d-flex"
                        style={{ justifyContent: "start" }}
                      >
                        <div>
                          <input
                            type="radio"
                            value="Male"
                            {...register("Gender", { required: true })}
                            className=""
                          ></input>
                          <label
                            className="form-check-label ml-1"
                            htmlFor="inlineRadio1"
                          >
                            Male
                          </label>
                          &nbsp;&nbsp;
                          <input
                            type="radio"
                            value="Female"
                            {...register("Gender", { required: true })}
                            className=" "
                          ></input>
                          <label
                            className="form-check-label ml-1"
                            htmlFor="inlineRadio1"
                          >
                            Female
                          </label>
                        </div>
                        <div>
                          {errors.Gender && (
                            <span style={customStyles.errorMsg}>
                              {" "}
                              Please select gender
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div style={customPopupDivision.popupinputs}>
                      <p>
                        Attachment<span style={customStyles.span}>*</span>
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
                    <div class="d-flex justify-content-center w-100 mb-2 pr-2">
                    {
                                        actionType == "insert" && (
                                            <button className='staffSubmitBtn' >Submit</button>
                                        )
                                    }
                                    {
                                        actionType == "update" && (
                                            <button className='staffSubmitBtn' >Update</button>
                                        )
                                    }
              </div>
                  </div>
                </div>
              </div>

              

              <div className="row mt-2 mb-2 pr-2">
                <div className="col-12">
                  <table className="table table-hover mb-5">
                    <thead className="bg-info text-white ">
                      <tr>
                        <th>Dependent Name</th>
                        <th>Relationship</th>
                        <th>Gender</th>
                        <th>Date Of Birth</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {DependentList.map((data, index) => {
                        return (
                          <tr className="text-dark" key={index}>
                            <td>{data.dependentName}</td>
                            <td>{data.relationshipID}</td>
                            <td>{data.gender}</td>
                            <td>{data.dateOfBirth}</td>
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
        </form>
      </div>
    );
}