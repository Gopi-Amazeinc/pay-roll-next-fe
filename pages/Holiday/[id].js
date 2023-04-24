import React from 'react';
import { useRouter } from 'next/router'
const Id = () => {
    const router = useRouter()
    const { id } = router.query
  
    return (
        <div>
            <p>Your logic for Holiday ID: {id}</p>
        </div>
    );
}

export default Id;
