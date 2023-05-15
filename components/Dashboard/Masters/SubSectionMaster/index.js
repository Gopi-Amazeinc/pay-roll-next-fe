import Link from "next/link";
import React from "react";

import { AiOutlinePlusCircle } from "react-icons/ai";
import Layout from '@/components/layout/layout.js';
import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const SubSectionMaster = () => {
  let hostURL = process.env.NEXT_PUBLIC_API_HOST_URL;
  const [subsection, SetSubsectionData] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
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
    <div className="container">
      <h5 className=" Heading">
        SubSection Master
      </h5>
      <div className="card p-3 border-0 rounded-3 mx-0">
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
        <div className="col-lg-8">
          <p className="Heading fs-6">
            SHOWING <span>{subsection.length} </span>RESULTS
          </p>
        </div>
        <div className="col-lg-2"></div>
        <div className="col-lg-2">
          <Link

            href="/Masters/SubSectionMaster/new"
          >

            <button className=" AddButton"> <AiOutlinePlusCircle size={18} /> ADD NEW</button>
          </Link>
        </div>
      </div>
      <br />
      <br />
      <div className="container">
        <div className="row ">
          <table className=" table table-striped ">
            <thead className="bg-info text-white ">
              <tr>
                <th>Short</th>
                <th>Description</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>

              {Array.isArray(subsection) &&
                subsection.length > 0 && (
                  <>
                    {subsection.map((data, index) => {
                      return (
                        <tr key={index}>
                          <td>{data.short}</td>
                          <td>{data.description}</td>
                          <td>
                            <Link href={`/Masters/SubSectionMaster/Edit/${data.id}`}>
                              <button
                                className="edit-btn"
                              >
                                Edit
                              </button>
                            </Link>
                            <button
                              className="edit-btn"
                              onClick={() => handelDelete(data.id)}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </>
                )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SubSectionMaster;
