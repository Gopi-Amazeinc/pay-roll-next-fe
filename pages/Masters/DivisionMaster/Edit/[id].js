
import DivDivisionMaster from '../new';
import axios from 'axios';

const DivisionMasterEdit = ({ data }) => {
    console.log(data)
    return (
        <DivDivisionMaster editData={data}></DivDivisionMaster>
    )

}
export default DivisionMasterEdit;

export async function getServerSideProps(context) {
    console.log(context);
    const hostURL = process.env.NEXT_PUBLIC_API_HOST_URL;
    let response = await axios.get(hostURL + "Master/GetDivisionMasterByID?ID=" + context.params.id);
    const data = response.data[0];
    return { props: { data } }
}