
import Link from "next/link";

import { useEffect, useState } from 'react';
import axios from "axios";
import Swal from "sweetalert2";


export default function ComponentMappingDashboard() {


  const hostURL = process.env.NEXT_PUBLIC_API_HOST_URL;


  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [componentMapping, setcomponentMapping] = useState([]);

  const getcomponentMapping = async () => {
    let res = await axios.get(hostURL + "Payroll/GetComponentMapping"); //This Api is useed for Get the Dashborad data band Master
    setcomponentMapping(res.data);
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    getcomponentMapping()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [1])


  const getData = (data) => {
    sessionStorage.setItem("id", data.id);
  }

  const clearData = () => {
    sessionStorage.setItem("id", "");
  }


  const handleDelete = async (id) => {
    try {
      let res = await axios.get(hostURL + `Payroll/DeleteComponentMapping?id=${id}`); // this is for deleting the data for dashborad using delete api call 
      console.log(res.data);
      Swal.fire('Data deleted successfully')
      getcomponentMapping();
    } catch (error) {
      console.error(error);
      Swal.fire('failed to  delete data')
    }
  };

  return (
    
      <div>
        <br></br> <p className="Heading">Component Mapping</p>{" "}
        <div className="container-fluid mt-4">
          <div className="row shadow-lg p-2 rounded-4 p-3 ">
            <div className="col-lg-1">
              <b>
                <p className="mt-2 text-center">
                  <>
                  </>
                  {/* <BiFilterAlt />  */}
                  Filter by:
                </p>
              </b>
            </div>

            <div className="col-lg-5">
              {/* <h6>Pay Date</h6> */}
              {/* <ReactDatePicker   className=" mt-2 form-control"></ReactDatePicker> */}
              <input
                type="search"
                className=" mt-2 form-control"
                placeholder="Search "
              />
            </div>
          </div>
          <div className="row mt-4">
            <div className="col-lg-10"></div>
            <div className="col-lg-2">


              <Link href="/Settings/componentmapping/new"><button className="btn btn-primary btn-sm shadow-lg AddButton"
                 onClick={clearData.bind(this)} > ADD new</button>
                {/* // onClick={() => setModalOpen(!modalOpen)}>   */}
                {/* <AiOutlinePlusCircle /> */}

              </Link>

            </div>
          </div>
          <br />
          <div className="row">
            <table className='table'>
              <thead>
                <tr className="tr">
                  <th>PayrollComponentType</th>
                  <th>Code</th>
                  <th>Component Name</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>

                {componentMapping.map((data, index) => {
                  return (
                    <tr key={index}>
                      <td>{data.payrollComponentType}</td>
                      <td>{data.code}</td>
                      <td>{data.componentName}</td>
                      <td>
                        <Link href="/Settings/componentmapping/new">
                          <button className="btn btn-primary edit-btn" onClick={getData.bind(this, data)} >Edit</button>
                        </Link>
                        &nbsp;

                        <button className="btn btn-primary edit-btn" onClick={() => handleDelete(data.id)}>Delete</button>
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
    
  );

}
