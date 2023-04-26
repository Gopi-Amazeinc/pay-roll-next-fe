
import CityMaster from '../new';
import axios from 'axios';

const CityMasterEdit = ({ data }) => {
    console.log(data)
    return (
        <CityMaster editData={data}></CityMaster>
    )

}
export default CityMasterEdit;

export async function getServerSideProps(context) {
    console.log(context);
    const hostURL = process.env.NEXT_PUBLIC_API_HOST_URL;
    let response = await axios.get(hostURL + "Master/GetCityTypeByID?ID=" + context.params.id);
    const data = response.data[0];
    return { props: { data } }
}