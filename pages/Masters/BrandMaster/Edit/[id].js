
import BrandMaster from '../new';
import axios from 'axios';

const BrandMasterEdit = ({ data }) => {
    console.log(data)
    return (
        <BrandMaster editData={data}></BrandMaster>
    )

}
export default BrandMasterEdit;

export async function getServerSideProps(context) {
    console.log(context);
    const hostURL = process.env.NEXT_PUBLIC_API_HOST_URL;
    let response = await axios.get(hostURL + "Master/GetBrandMasterByID?ID=" + context.params.id);
    const data = response.data[0];
    return { props: { data } }
}