
import CountryMaster from '../new';
import axios from 'axios';

const CountryMasterEdit = ({ data }) => {
    console.log(data)
    return (
        <CountryMaster editData={data}></CountryMaster>
    )

}
export default CountryMasterEdit;

export async function getServerSideProps(context) {
    console.log(context);
    const hostURL = process.env.NEXT_PUBLIC_API_HOST_URL;
    let response = await axios.get(hostURL + "Master/GetCountryTypeByID?ID=" + context.params.id);
    const data = response.data[0];
    return { props: { data } }
}