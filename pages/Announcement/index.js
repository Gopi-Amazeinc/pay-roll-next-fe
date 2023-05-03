import React from 'react'
import Layout from '@/components/layout/layout'
import AnnoucementDash from '@/components/Dashboard/Announcement'


function index() {
  return (
    <div>
      <Layout>
        <AnnoucementDash></AnnoucementDash>
      </Layout>
    </div>
  )
}

export default index
