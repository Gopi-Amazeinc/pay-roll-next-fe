
import Link from "next/link";
import { useEffect, useState } from 'react';
import { apiService } from "@/services/api.service";
import Swal from "sweetalert2";
export default function ComponentMappingDashboard() {
  const [componentMapping, setcomponentMapping] = useState([]);

  const getcomponentMapping = async () => {
    let res = await apiService.commonGetCall("Payroll/GetComponentMapping");
    setcomponentMapping(res.data);
  }

  useEffect(() => {
    getcomponentMapping()
  }, [1])

  const handleDelete = async (id) => {
    try {
      let res = await apiService.commonGetCall(`Payroll/DeleteComponentMapping?id=${id}`);
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
                            <button className="edit-btn"  >Edit</button>
                          </Link>
                          &nbsp;

                          <button className="edit-btn" >Delete</button>
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
