import React, { useState } from "react";
import Image from "next/image";
import dashboard from "./dashboard.module.css";
import leaveIcon from "@/public/Images/leaveicon.png";
import profile from "@/public/Images/profileimg.png";
import { AiOutlineGift } from 'react-icons/ai'
import { BiInjection } from 'react-icons/bi'

import Layout from '@/components/layout/layout.js';

import * as XLSX from "xlsx";

function Dashboard() {
  const count = 1;

  const name = "Anup";
  const email = "anup@amazeinc.in";

  const [viewMode, setViewMode] = useState("tab1");

  const [items, setItems] = useState([]);

  const readExcel = async (file) => {
    debugger
    const promise = new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(file);

      fileReader.onload = (e) => {
        const bufferArray = e.target.result;

        const wb = XLSX.read(bufferArray, { type: "buffer" });

        const wsname = wb.SheetNames[0];

        const ws = wb.Sheets[wsname];

        const data = XLSX.utils.sheet_to_json(ws);

        resolve(data);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
    promise.then((d) => {
      debugger
      setItems(d);
      console.log(d);
    });

  };

  return (
    <Layout>
      {/* <input
        type="file"
        accept=".xlsx"
        onChange={(e) => {
          const file = e.target.files[0];
          readExcel(file);
        }}
      /> */}
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <div className="row">
              <div className="col-md-12">
                <div className="card  mb-4">
                  <div
                    className="card-body"
                    style={{ backgroundColor: "#FBB584" }}
                  >
                    <div className="d-flex align-items-center">
                      <Image
                        src={leaveIcon}
                        alt="Leave icon"
                        width={20}
                        height={20}
                      />
                      <h5 className="card-title ml-2 mb-0" style={{ color: 'white' }}>Leaves</h5>
                    </div>
                    <p className="card-subtitle mt-1 mb-0" style={{ color: 'white' }}>
                      Always file your leaves on time
                    </p>
                  </div>
                  <br></br>
                  <div className="row"  >
                    <div className="col-md-6">
                      <button className="btn btn-outline-secondary w-100 btnCount">
                        {count} Pending
                      </button>
                    </div>
                    <div className="col-md-6">
                      <button className="btn  btn-outline-secondary  w-100">
                        {count} Pending
                      </button>
                    </div>
                  </div>

                  <br></br>

                  <div className="row">
                    <div className="col-md-6">
                      <button className="btn btn-outline-secondary w-100">
                        {count} Pending
                      </button>
                    </div>
                    <div className="col-md-6">
                      <button className="btn btn-outline-secondary w-100">
                        {count} Pending
                      </button>
                      <br></br>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="card">
                  <div
                    className="card-body"

                  >
                    <h5 className="card-title" style={{ color: '#3247d5' }}>Announcement Title</h5>
                    <p className="card-text" >Announcement content goes here.</p>
                    <a href="#" className="btn btn-primary">Read More</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card  mb-4">
              <div
                className="card-body"
                style={{ backgroundColor: "#B96AE9" }}
              >
                <div className="d-flex align-items-center">
                  <AiOutlineGift style={{ color: 'white', fontSize: '25px' }} />
                  {/* <FaAiOutlineGiftBeer/> */}
                  {/* <Image
                      src={leaveIcon}
                      alt="Leave icon"
                      width={20}
                      height={20}
                    /> */}
                  <h5 className="card-title ml-2 mb-0" style={{ color: 'white' }}>Celebrants</h5>
                </div>
                <p className="card-subtitle mt-1 mb-0" style={{ color: 'white' }}>
                  Get to know who are the celebrants
                </p>
              </div>

              <div className="col-lg-6">
                <div className="row">
                  <br />
                  <div className="col-lg-12 dashbutton bttn">
                    <div className="tab-slider--nav">
                      <ul className="tab-slider--tabs">
                        <li
                          rel="tab1"
                          onClick={() => setViewMode("tab1")}
                        >
                          All
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>


              {/* </div> */}


            </div>
          </div>
          <div className="col-md-4 "  >
            <div className="card mb-4 " id={dashboard.cardCeneter}  >
              <div
                className="card-body mb-1">
                <div className="d-flex align-items-center" >
                  <Image
                    src={profile}
                    alt="Picture of the author"
                    width={100}
                    height={100}
                  />
                </div>
                <h5 className="card-title ml-2 mb-0">{name}</h5>
                <p className="card-subtitle mt-1 mb-1">
                  {email}</p>

                <Image
                  src={profile}
                  alt="Picture of the author"
                  width={100}
                  height={100}
                  className='mb-4'
                />
                <div className='mb-4'>
                  <button className="btn btn-primary ">View My Profile</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* second line of code  */}
        <div className="row">
          <div className="col-md-6 "  >
            <div className="card mb-4">
              <div className="card-header text-white " style={{ backgroundColor: '#18D7C0' }}>
                <BiInjection style={{ color: 'white', fontSize: '25px' }} />
                <h5 className="card-title ml-2 mb-0" style={{ color: 'white' }}>COVID-19 Vaccination</h5>
                <p className="card-subtitle mt-1 mb-1">
                  update covid vaccination</p>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-md-6">
                    <h5>1st Dose</h5>
                  </div>
                  {/* <p>Date:</p> */}
                  <div className="col-md-3">
                    <button className="btn btn-primary">View File</button>
                  </div>
                  <div className="col-md-3">
                    <button className="btn btn-primary">Edit</button>
                  </div>
                </div>
                <hr></hr>
                <div className="row">
                  <div className="col-md-6">
                    <h5>2nd Dose</h5>
                  </div>
                  {/* <p>Date:</p> */}
                  <div className="col-md-3">
                    <button className="btn btn-primary">View File</button>
                  </div>
                  <div className="col-md-3">
                    <button className="btn btn-primary">Edit</button>
                  </div>
                </div>
                <hr></hr>
                <div className="row">
                  <div className="col-md-6">
                    <h5>3rd Dose</h5>
                  </div>
                  {/* <p>Date:</p> */}
                  <div className="col-md-3">
                    <button className="btn btn-primary">View File</button>
                  </div>
                  <div className="col-md-3">
                    <button className="btn btn-primary">Edit</button>
                  </div>
                </div>
                {/* </div> */}
              </div>
            </div>
          </div>
          <div className="col-md-6 "  >
            <div className="card">
              <div className="card-header">
                <h5 className="card-title" style={{ color: '#3247d5' }}>Holidays</h5>
                <p className="card-subtitle mt-1 mb-1">

                  These are the upcoming holidays</p>
              </div>

              {/* </div> */}
              <div className="card-body">
                <div className="row">
                  <div className="col-md-4">

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-4">
          </div>
          <div className="col-md-4">
            <h3 style={{ color: '#3247d5' }}> Company Staff Requests</h3>

          </div>
          <div className="col-md-4">
          </div>
        </div>
        {/* second line of code  */}
        <div className="row">
          <div className="col-md-2">
          </div>
          <div className="col-md-4 "  >
            <div className="card">
              <div className="card-header  text-white" style={{ backgroundColor: '#70be51' }}>
                <div className="col-md-2">
                  <Image
                    src={leaveIcon}
                    alt="Leave icon"
                    width={20}
                    height={20}
                  />
                </div>
                <div className="col-md-10">
                  Overtime
                  <p className="card-subtitle mt-1 mb-1">
                    Always file your Overtime on time</p>
                </div>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-md-6">
                    <button className="btn btn-outline-secondary w-100 btnCount">
                      {count} Pending
                    </button>
                  </div>
                  <div className="col-md-6">
                    <button className="btn  btn-outline-secondary  w-100">
                      {count} Pending
                    </button>
                  </div>
                </div>

                <br></br>

                <div className="row">
                  <div className="col-md-6">
                    <button className="btn btn-outline-secondary w-100">
                      {count} Pending
                    </button>
                  </div>
                  <div className="col-md-6">
                    <button className="btn btn-outline-secondary w-100">
                      {count} Pending
                    </button>
                    <br></br>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4 "  >
            <div className="card">
              <div className="card-header bg-primary text-white">
                <div className="col-md-2">
                  <Image
                    src={leaveIcon}
                    alt="Leave icon"
                    width={20}
                    height={20}
                  />
                </div>
                <div className="col-md-10">
                  Leaves
                  <p className="card-subtitle mt-1 mb-1">
                    Always file your leaves on time</p>
                </div>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-md-6">
                    <button className="btn btn-outline-secondary w-100 btnCount">
                      {count} Pending
                    </button>
                  </div>
                  <div className="col-md-6">
                    <button className="btn  btn-outline-secondary  w-100">
                      {count} Pending
                    </button>
                  </div>
                </div>

                <br></br>

                <div className="row">
                  <div className="col-md-6">
                    <button className="btn btn-outline-secondary w-100">
                      {count} Pending
                    </button>
                  </div>
                  <div className="col-md-6">
                    <button className="btn btn-outline-secondary w-100">
                      {count} Pending
                    </button>
                    <br></br>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-2">
          </div>
        </div>
      </div>
    </Layout>
  );
}
export default Dashboard;
