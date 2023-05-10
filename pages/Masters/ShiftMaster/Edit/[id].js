import React, { useState, useEffect } from "react";
import Styles from "../../../../styles/employmentJobHistory.module.css";
import Link from 'next/link';
import Layout from '@/components/layout/layout.js';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import ShiftMasterForm from "../new";
import { useRouter } from 'next/router'

function ShiftMaster() {
  const router = useRouter()
  const { id } = router.query

  return (
    <ShiftMasterForm editData={{ id }} />
  );
}

export default ShiftMaster;
