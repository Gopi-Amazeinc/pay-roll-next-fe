
import LevelTypeForm from '../new';
import axios from 'axios';

const JobLevelEdit = ({ data }) => {
    console.log(data)
    return (
        <LevelTypeForm editData={data}></LevelTypeForm>
    )

}
export default JobLevelEdit;

export async function getServerSideProps(context) {
    console.log(context);
    const hostURL = process.env.NEXT_PUBLIC_API_HOST_URL;
    let response = await axios.get(hostURL + "Master/GetLevelTypeByID?ID=" + context.params.id);
    const data = response.data[0];
    return { props: { data } }
}