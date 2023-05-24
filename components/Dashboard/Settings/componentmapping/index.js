
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

    <div className="container-fluid">
      <div className="row">
        <div className="col-lg-12">
          <p className="Heading">Component Mapping</p>

          <div className="card border-0 rounded-3 p-3">
            <div className="row">
              <div className="col-lg-1">
                <p>
                  Filter by
                </p>
              </div>

              <div className="col-lg-3">
                <input
                  type="search"
                  className="form-control"
                  placeholder="Search "
                />
              </div>
            </div>
          </div>

          <br />

          <div className="row">
            <div className="col-lg-10"></div>
            <div className="col-lg-2">
              <Link href="/Settings/componentmapping/new"><button className="AddButton"
              > Add New</button>
              </Link>
            </div>
          </div>
          <br />

          <div className="row">
            <div className="col-lg-12">
              <table className="table" >
                <thead>
                  <tr >
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
                          <Link href={`/Settings/componentmapping/Edit/${data.id}`}>
                            <button className="edit-btn" onClick={getData.bind(this, data)} >Edit</button>
                          </Link>
                          &nbsp;

                          <button className="edit-btn" onClick={() => handleDelete(data.id)}>Delete</button>
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
      </div>
    </div >

  );

}
