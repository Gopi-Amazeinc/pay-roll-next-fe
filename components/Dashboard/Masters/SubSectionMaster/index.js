import Link from "next/link";
import React from "react";
import Styles from "../../styles/SubSectionMaster.module.css";
import { AiOutlinePlusCircle } from "react-icons/ai";
import Layout from "@/Components/layout";
import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const SubSectionMaster = () => {
  let hostURL = process.env.NEXT_PUBLIC_API_HOST_URL;
  const [subsection, SetSubsectionData] = useState([]);

  const getDataByID = (data) => {
    sessionStorage.setItem("id", data.id);
  };
  const clearData = () => {
    sessionStorage.setItem("id", "");
  };
  useEffect(() => {
    getData();
  }, [1]);

  const getData= async ()=> {
    let res = await axios.get(hostURL + "Master/GetSubSectionMaster");
    SetSubsectionData(res.data);
  }



  const handelDelete = (id) => {
    debugger;
    Swal.fire({
      title: "Are you sure want to delete ?",
      text: "",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3247d5",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axios.get(hostURL + "Master/DeleteSubSectionMaster?ID=" + id)
            Swal.fire("SubSection Deleted successfully.");
            getData();
    }
});
  };

  return (
    <Layout>
      <br />
      <h5 id={Styles.h5} className="text-primary fw-bold">
        SubSection Master
      </h5>
      <div className="card p-3  shadow-lg rounded-4" id={Styles.card}>
        <div className="row">
          <div className="col-lg-1">
            <p>Filter By</p>
          </div>
          <div className="col-lg-5">
            <input
              type="text"
              placeholder="Search"
              id="term"
              className="form-control "
            />
          </div>
          <div className="col-lg-3"></div>
          <div className="col-lg-3"></div>
        </div>
      </div>
      <div className="row mt-3">
        <div className="col-lg-7">
        <p id={Styles.h5} className="text-primary fs-6 mt-3 fw-bold">
              SHOWING <span>{subsection.length} </span>RESULTS
            </p>
        </div>
        <div className="col-lg-4">
          <Link
            className="btn btn-primary btn-sm "
            id={Styles.addButton}
            href="/Masters/subsectionmasterform"
            onClick={clearData.bind(this)}
          >
            <AiOutlinePlusCircle size={18} /> ADD NEW
          </Link>
        </div>
      </div>
      <br />
      <br />
      <div className="container-fluid">
        <div className="row ">
          <table className=" table table-sm  table-bordered " id={Styles.table}>
            <thead>
              <tr id={Styles.td} className="bg-info">
                <th className="text-white">Short</th>
                <th className="text-white">Description</th>
                <th className="text-white">Action</th>
              </tr>
            </thead>
            <tbody>
              {subsection.map((data, index) => {
                return (
                  <tr className="text-dark" key={index}>
                    <td>{data.short}</td>
                    <td>{data.description}</td>
                    <td>
                      <Link href="/Masters/subsectionmasterform">
                        <button
                          id={Styles.actionButton}
                          style={{ fontSize: "12px", marginRight: "5%" }}
                          onClick={getDataByID.bind(this, data)}
                        >
                          Edit
                        </button>
                      </Link>
                      <button
                        id={Styles.actionButton}
                        style={{ fontSize: "12px" }}
                        onClick={() => handelDelete(data.id)}
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
    </Layout>
  );
};

export default SubSectionMaster;
