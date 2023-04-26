import React from 'react'
import SSSForm from './new'
import axios from 'axios'

const ID = () => {
    return (
        <div>
            <SSSForm editData={data}></SSSForm>
        </div>
    )
}

export default ID
export async function getServerSideProps(context) {
    console.log(context);
    const hostURL = process.env.NEXT_PUBLIC_API_HOST_URL;
    let response = await axios.get(hostURL + "HR/GetSSSconfogarationByID?ID=" + context.params.id);
    const data = response.data[0];
    return { props: { data } }
}