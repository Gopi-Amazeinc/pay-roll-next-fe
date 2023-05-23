import Layout from "@/components/layout/layout"
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Link from 'next/link';
import { apiService } from "@/services/api.service";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { useDropzone } from "react-dropzone";
import {
    Calendar as BigCalendar,
    momentLocalizer,
    Views
} from "react-big-calendar";
import ReactPaginate from "react-paginate";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
moment.locale("en-GB");
//momentLocalizer(moment);
const localizer = momentLocalizer(moment);
const Index = () => {
    const { register, handleSubmit, reset, formState } = useForm();
    const [pending, setPending] = useState(false)
    const [approved, setApproved] = useState(false)
    const [rejected, setRejected] = useState(false)
    const [pendingdata, setPendingData] = useState([])
    const [approveddata, setApprovedData] = useState([])
    const [rejecteddata, setRejectedData] = useState([])
    const [roleID, setRoleID] = useState();
    const [userID, setUserID] = useState();
    const [keyword, setKeyword] = useState("");
    const getPendingData = async (StartingDate, EndDate) => {
        debugger;
        const res = await apiService.commonGetCall("Employee/GetPendingManagerLeavesByStaffID?ID=" + userID + "&TypeID=1&Sdate=" + StartingDate + "&Edate=" + EndDate)
        setPendingData(res.data);
        console.log(res.data);
    }
    const getApprovedData = async (StartingDate, EndDate) => {
        debugger;
        const res = await apiService.commonGetCall("Employee/GetApprovedManagerLeavesByStaffID?ID=" + userID + "&TypeID=1&Sdate=" + StartingDate + "&Edate=" + EndDate)
        setApprovedData(res.data);
        console.log(res.data);
    }
    const getRejectedData = async (StartingDate, EndDate) => {
        debugger;
        const res = await apiService.commonGetCall("Employee/GetRejectedManagerLeavesByStaffID?ID=" + userID + "&TypeID=1&Sdate=" + StartingDate + "&Edate=" + EndDate)
        setRejectedData(res.data);
        console.log(res.data);
    }
    const togglePending = () => {
        setPending(true)
        setRejected(false)
        setApproved(false)
    }

    const toggleApproved = () => {
        setApproved(true)
        setPending(false)
        setRejected(false)
    }

    const toggleRejected = () => {
        setRejected(true)
        setPending(false)
        setApproved(false)
    }

    const [calender, setCalender] = useState(false)
    const [listview, setListView] = useState(false)
    const toggleCalender = () => {
        setCalender(true)
        setListView(false)
        setApproved(false)
        setPending(false)
        setRejected(false)
    }

    const toggleListView = () => {
        setListView(true)
        setCalender(false)
    }

    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    const getStartDate = (selectedDate) => {
        setStartDate(selectedDate);
        setEndDate("");
        sessionStorage.setItem("StartDate", startDate);

    };

    const getEndDate = (selectedDate) => {
        setEndDate(selectedDate);
        sessionStorage.setItem("EndDate", endDate);
        return dateValidation(selectedDate);
        // return getDateBySelectedDate(selectedDate);

    };
    const getDateBySelectedDate = (endDatesss) => {
        debugger;
        return getPendingData(startDate, endDatesss);
    };
    const getCurrentMonthDates = () => {
        let newDate = new Date();
        let firstDayOfMonth = new Date(newDate.getFullYear(), newDate.getMonth());
        let fromDate = formateDate(firstDayOfMonth);
        const year = newDate.getFullYear();
        const month = newDate.getMonth() + 1;
        const lastDay = new Date(year, month, 0).getDate();
        const toDate = `${year}-${month.toString().padStart(2, "0")}-${lastDay
            .toString()
            .padStart(2, "0")}`;
        setStartDate(fromDate);
        setEndDate(toDate);
        return {
            setStartDate: fromDate,
            setEndDate: toDate,
        };
    };

    const formateDate = (datetoformat) => {
        const day = datetoformat.getDate().toString().padStart(2, "0");
        const month = (datetoformat.getMonth() + 1).toString().padStart(2, "0");
        const year = datetoformat.getFullYear().toString();
        return `${year}-${month}-${day}`;
    };
    const dateValidation = (selectedDate) => {
        if (new Date(startDate) > new Date(selectedDate)) {
            Swal.fire("End Date should be greater than Start Date");
        } else {
            setEndDate(selectedDate);
            return getDataBySelectedDate(selectedDate);
        }
    };
    const getDataBySelectedDate = (endDatesss) => {
        debugger;
        return getPendingData(startDate, endDatesss);
    };
    useEffect(() => {
        const usrID = sessionStorage.getItem("userID");
        setUserID(usrID);
        const userRoleID = sessionStorage.getItem("roleID");
        setRoleID(userRoleID);
        // var StartingDate = sessionStorage.getItem("StartDate");
        // var EndDate = sessionStorage.getItem("StartDate");
        // getDateBySelectedDate();
        // getPendingData(userID, StartingDate, EndDate);
        // getApprovedData(userID, StartingDate, EndDate);
        // getRejectedData(userID, StartingDate, EndDate);
        setListView(true);
        setPending(true);
        if (userID) {
            const resu = getCurrentMonthDates();
            if (resu) {
                getPendingData(resu.setStartDate, resu.setEndDate);
                getApprovedData(resu.setStartDate, resu.setEndDate);
                getRejectedData(resu.setStartDate, resu.setEndDate);
            }
        }
        return;
    }, [userID])




}
export default Index