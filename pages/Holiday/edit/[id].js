import React from 'react'
import { useForm } from 'react-hook-form';
// import Layout from '../../../../components/layout/layout'
import Layout from '@/components/layout/layout'
import axios from 'axios';
import Swal from 'sweetalert2';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from "next/router";
import Holidayform from "@/pages/Holiday/holidayform";


function HolidayID() {
 const router = useRouter();
  const { id } = router.query;

return(
    <>
    <Holidayform editData={{ id }} />;

    </>
);

    
}

export default HolidayID;
