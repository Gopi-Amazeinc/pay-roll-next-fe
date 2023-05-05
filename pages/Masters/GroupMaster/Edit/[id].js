
import GroupMasterForm from '../new';
import axios from 'axios';

const GroupMasterEdit = ({ data }) => {
    console.log(data)
    return (
        <GroupMasterForm editData={data}></GroupMasterForm>
    )

}
export default GroupMasterEdit;

export async function getServerSideProps(context) {
    console.log(context);
    const hostURL = process.env.NEXT_PUBLIC_API_HOST_URL;
    let response = await axios.get(hostURL + "Master/GetGroupMasterByID?ID=" + context.params.id);
    const data = response.data[0];
    return { props: { data } }
}