import React from 'react'
import ElectricianList from "../../components/electricianList";
import Sliderbar from "../../components/slidebar";
import Header from "../../components/header";



function HomePage() {
  return (
    <div className='flex w-dvw h-dvh p-3'>
    {/* Left Sidebar */}
    <div>
        <Sliderbar />
    </div>

    {/* Main Content */}
    <main className="w-full h-full overflow-auto scrollbar-hide">
        {/* Header Navigation */}
        <Header />
        <ElectricianList />
       

      
    </main>
</div>
  );
}

export default HomePage;
