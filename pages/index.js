import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
// import Layout from '../components/layout/index.js'
import Layout from "@/components/layout/layout";
import { RouteGuard } from "@/components/layout/route_guard";
export default function Home() {
  return (
    <>
        {/* <RouteGuard> */}
      <Layout></Layout>
      {/* </RouteGuard> */}
    </>
  );
}
