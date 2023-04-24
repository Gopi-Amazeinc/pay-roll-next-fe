import React, { useState, useEffect } from "react";
import { BiFilterAlt } from "react-icons/bi";
import Styles from '../../styles/PositionMasterDash.module.css'
import { AiOutlinePlusCircle } from "react-icons/ai";
import table from "../../styles/table.module.css";
import Link from "next/link";
import Layout from '@/components/layout/layout.js';
import axios from "axios";
import Swal from "sweetalert2";
const PositionMasterDash = () => {
  const [positionMaster, setPositionMaster] = useState([]);

  const getPositionMaster = async () => {
    let hostURL = process.env.NEXT_PUBLIC_API_HOST_URL;
    const { data } = await axios.get(hostURL + "Master/GetRoleType"); //gurukiran@amazeinc.in, api call to fetch the data that is being displayed onto the table
    setPositionMaster(data)
  }
  useEffect(() => {
    getPositionMaster();
  }, [])

  const handleDelete = async (id) => {
    try {
      let hostURL = process.env.NEXT_PUBLIC_API_HOST_URL;
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {

          const res = axios.get(hostURL + `Master/DeleteRoleType?ID=${id}`); //gurukiran@amazeinc.in, api call to delete the data from the table
          console.log(res.data);
          // alert("Data deleted successfully");
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
        } getPositionMaster();

      })

    } catch (error) {
      console.error(error);
      alert("Failed to delete data");
    }
  };



  const getData = (data) => {
    sessionStorage.setItem("id", data.id);
    console.log(data.id)
  }

  const clearFormData = () => {
    sessionStorage.setItem("id", "");
  }

  return (
    <Layout>
      <br></br>
      <p id={Styles.title}>Position  Master</p>
      <div className="container-fluid mt-4">
        <div className="row shadow-lg p-2 rounded-4 p-3 ">
          <div className="col-lg-2">
            <b>
              <p className="mt-2 text-center">
                <BiFilterAlt />  Filter by:
              </p>
            </b>
          </div>
          <div className="col-lg-5">
            <input
              type="search"
              className=" mt-2 form-control"
              placeholder="Search"
            />
          </div>
        </div>
        <div className="row mt-4">
          <div className="col-lg-8">
            <p id={Styles.p}>SHOWING {positionMaster.length} RESULTS</p>
          </div>
          <div className="col-lg-2"></div>
          <div className="col-lg-2">

            <Link href="/Masters/positionmasterform"><button onClick={clearFormData.bind(this)}

              className="btn btn-primary btn-sm  shadow-lg"
              id={Styles.addNew}
            >  <AiOutlinePlusCircle />
              Add New
            </button></Link>
          </div>
        </div>

        <div className="container-fluid mt-4">
          <div className="row">
            <table className={table.commonTable}>
              <thead >
                <tr >
                  <th>Position Name</th>
                  <th>Description</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {positionMaster.map((data) => {
                  return (
                    <tr key={data.id}>
                      <td>{data.short}</td>
                      <td>{data.description}</td>
                      <td>
                        <div className="row">
                          <div className="col-lg-2">
                            <Link href="/Masters/positionmasterform">
                              <button id={Styles.actionBtn} onClick={getData.bind(this, data)}>Edit</button>
                            </Link>
                          </div>
                          <div className="col-lg-2">
                            <button id={Styles.actionBtn} onClick={() => handleDelete(data.id)}>Delete</button>
                          </div>
                        </div>
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
    </Layout >
  )
}

export default PositionMasterDash