import ComponentBulkUploadForm from "../new";
import axios from "axios";

const ComponentBulkUploadFormEdit = ({data}) => {
    debugger
    return <ComponentBulkUploadForm editData={data}></ComponentBulkUploadForm>
}
export default ComponentBulkUploadFormEdit;

export async function getServerSideProps(context) {
    console.log(context);
    const hostURL = process.env.NEXT_PUBLIC_API_HOST_URL;
    let response = await axios.get(
      hostURL + "Payroll/GetPayrollComponentBulkUploadByID?ID=" + context.params.id
    );
    const data = response.data[0];
    return { props: { data } };
  }