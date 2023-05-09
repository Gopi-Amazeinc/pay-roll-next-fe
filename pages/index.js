import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
// import Layout from '../components/layout/index.js'
import Layout from '@/components/layout/layout'


export default function Home() {

  return (
    <>
    <Head>
  <link rel="icon" type="image/x-icon" href="../public/images/DigiLogoBlue.png"/>
</Head>
      <Layout>

      </Layout>
    </>
  )
}
