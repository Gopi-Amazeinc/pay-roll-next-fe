import { useRouter } from 'next/router'
import BarangayMasterForm from '../new';
import axios from 'axios';

const BarangayEdit = ({ data }) => {
    console.log(data)
    return (
        <BarangayMasterForm editData={data}></BarangayMasterForm>
    )

}
export default BarangayEdit;

export async function getServerSideProps(context) {
    console.log(context);
    const hostURL = process.env.NEXT_PUBLIC_API_HOST_URL;
    debugger
    // Fetch data from external API
    let response = await axios.get(hostURL + "Master/GetBarangayMasterByID?ID=" + context.params.id);   
    const data = response.data[0];
    // Pass data to the page via props
    return { props: { data } }
}