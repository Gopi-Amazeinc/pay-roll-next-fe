
import LeaveType from '../new';
import axios from 'axios';

const LeaveTypeEdit = ({ data }) => {
    console.log(data)
    return (
        <LeaveType editData={data}></LeaveType>
    )

}
export default LeaveTypeEdit;

export async function getServerSideProps(context) {
    console.log(context);
    const hostURL = process.env.NEXT_PUBLIC_API_HOST_URL;
    let response = await axios.get(hostURL + "Master/GetLeaveTypeByID?ID=" + context.params.id);
    const data = response.data[0];
    return { props: { data } }
}