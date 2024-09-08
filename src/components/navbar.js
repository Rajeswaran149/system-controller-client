import React from 'react'

function Navbar() {
  return (
    <div className='flex justify-evenly p-4 bg-red-500 '>
        <div>
            <h1 className=''>EMS</h1>
        </div>
        <div className='flex gap-2'>
            <button className='p-2 bg-white rounded-md hover:bg-red-950 hover:text-white'>Electrician Management </button>
            <button className='p-2 bg-white rounded-md hover:bg-red-950 hover:text-white'>Customer Complaint Management </button>
        </div>
    </div>
  )
}

export default Navbar