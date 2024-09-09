import React from 'react'
import ElectricianList from '../components/electricianList'
import Sliderbar from '../components/slidebar'
import Header from '../components/header'

function Electricians() {
  return (
    <div className='flex w-dvw h-dvh p-3'>
    {/*left slidebar */}
    <div>
        <Sliderbar />
    </div>

    {/* main content */}
    <main className="w-full h-full">
        <Header />
        <ElectricianList />

    </main >
</div>
  )
}

export default Electricians