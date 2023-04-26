import React from "react";
import citymaster from "@/styles/CityMasterDashboard.module.css";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from 'axios'
import Swal from "sweetalert2";
import Layout from '../../../layout/layout'

function CityMasterDash() {

  const [CityMaster, setCityMaster] = useState([]);

  const getCityMaster = async () => {
    let hostURL = process.env.NEXT_PUBLIC_API_HOST_URL;
    let res = await axios.get(hostURL + "Master/GetCityType"); //This Api is useed for Get the Dashborad data ciyType Master
    setCityMaster(res.data);
  };

  useEffect(() => {
    getCityMaster();
  }, []);

  const getCityMasterData = (data) => {
    sessionStorage.setItem("id", data.id);
    console.log(data.id);
  };

  const clearFormData = () => {
    sessionStorage.setItem("id", "");
  };


  // async function DeleteCityMaster(id) {
  //   debugger;
  //   try {
  //     let hostURL = process.env.NEXT_PUBLIC_API_HOST_URL;
  //     Swal.fire({
  //       title: "Are you sure?",
  //       text: "You won't be able to revert this!",
  //       icon: "warning",
  //       showCancelButton: true,
  //       confirmButtonColor: "#3085d6",
  //       cancelButtonColor: "#d33",
  //       confirmButtonText: "Yes, delete it!",
  //     }).then((res) => {
  //       if (res) {
  //         axios.get(hostURL + `Master/DeleteCityType?id=${id}`);          
  //       }
  //       getCityMaster();
  //     });
  //   } 
  //   catch (error) {
  //     console.error(error);
  //     alert("Failed to delete data");
  //   }
  // }
  async function DeleteCityMaster(id) {
    debugger;
    try {
      let hostURL = process.env.NEXT_PUBLIC_API_HOST_URL;

      const res = await axios.get(
        hostURL + `Master/DeleteCityType?id=${id}` // this is for deleting the data for dashborad using delete api call  
      );
      console.log(res.data);
      Swal.fire({
        icon: "success",
        title: "Hurray...",
        text: "Data was deleted..!",
      });
      getCityMaster();
    }
    catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Data was not deleted..!",
      });
    }
  }




  return (
    <Layout>
      <div className="container">
        <div className="row">
          <div className="col-lg-6">
            <br />
            <h3 className="text-primary fs-5 mt-3 fw-bold">City Master</h3>
          </div>
          <div className="col-lg-4"></div>
          <div className="col-lg-2"></div>
        </div>
        <br />
        <div className={citymaster.card}>
          <div className="row">
            <div className="col-lg-1">
              <p>Filter By</p>
            </div>
            <div className="col-lg-5">
              <input
                type="text"
                placeholder="Search"
                id="term"
                className="form-control"
              />
            </div>
            <div className="col-lg-3">
              <div className="dropdown">
                <select
                  id="stateID"
                  name="stateID"
                  className="form-control inputfield"
                >
                  <option value="Select">Select Province</option>
                </select>
              </div>
            </div>
            <div className="search"></div>
          </div>
          <br />
        </div>
        <br />
        <div className="row">
          <div className="col-md-10">
            <p className="text-primary fs-6 mt-3 fw-bold">
              SHOWING <span></span>RESULTS
            </p>
          </div>
          <div className="col-md-2">
            <Link href="/Masters/CityMaster/new">
              <button className={citymaster.button} tabIndex="0" onClick={clearFormData.bind(this)}>
                Add New
              </button>
            </Link>
          </div>
        </div>
        <br />
      </div>
      <br />
      <div className="alignForm"></div>
      <div className="row">
        <div className="col-md-12">
          <table class="table table-striped table-hover mt-4">
            <thead className="bg-info text-white ">
              <tr>
                <th>Country Name</th>
                <th>Province Name</th>
                <th>City Name</th>
                <th>Description</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {
                CityMaster.map((data) => {
                  return (
                    <tr key={data.id}>
                      <td>{data.country}</td>
                      <td>{data.state}</td>
                      <td>{data.short}</td>
                      <td>{data.description}</td>
                      <td>
                        <Link href={`/Masters/CityMaster/Edit/${data.id}`}>
                          <button className="btn btn-primary" onClick={getCityMasterData.bind(this, data)}>Edit</button></Link>
                        &nbsp;
                        <button className="btn btn-primary" onClick={() => DeleteCityMaster(data.id)}>Delete{" "}</button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
}

export default CityMasterDash;