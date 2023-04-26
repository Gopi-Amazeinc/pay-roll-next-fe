import React from 'react'
import PagibigForm from '../new';
import axios from 'axios';

function ID({ data }) {
    return (
        <div>
            <PagibigForm editData={data}></PagibigForm>
        </div>
    )
}

export default ID

export async function getServerSideProps(context) {
    console.log(context);
    const hostURL = process.env.NEXT_PUBLIC_API_HOST_URL;
    let response = await axios.get(hostURL + "HR/GetPagibigconfogarationByID?ID=" + context.params.id);
    const data = response.data[0];
    return { props: { data } }
}