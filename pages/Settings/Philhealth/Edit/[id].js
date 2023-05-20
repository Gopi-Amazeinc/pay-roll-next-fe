import React from 'react'
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from 'next/link';

import { useRouter } from 'next/router'
import PhilhealthForm from '../new';
function PhilhealthFormId(){
  const router = useRouter()
  const { id } = router.query
  return (
      <PhilhealthForm editData={{ id }} />
  )
  }

export default PhilhealthFormId