import React from 'react'
import Sliderbar from '../components/slidebar'
import Header from '../components/header'
import CustomerComplaint from '../components/customerComplaint'

function Compliants() {
  return (
    <>
    <div className='flex w-dvw h-dvh p-3'>
        {/*left slidebar */}
        <div>
            <Sliderbar />
        </div>

        {/* main content */}
        <main className="w-full h-full">
            <Header />
            <CustomerComplaint />

        </main >
    </div>
</>
  )
}

export default Compliants