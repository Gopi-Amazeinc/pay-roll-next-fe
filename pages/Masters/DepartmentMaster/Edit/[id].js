
import DepartmentMasterForm from '../new';
import axios from 'axios';

const DepartmentMasterEdit = ({ data }) => {
    console.log(data)
    return (
        <DepartmentMasterForm editData={data}></DepartmentMasterForm>
    )

}
export default DepartmentMasterEdit;

export async function getServerSideProps(context) {
    console.log(context);
    const hostURL = process.env.NEXT_PUBLIC_API_HOST_URL;
    let response = await axios.get(hostURL + 'Master/GetDepartmentMasterByID?id=' + context.params.id);
    const data = response.data[0];
    return { props: { data } }
}