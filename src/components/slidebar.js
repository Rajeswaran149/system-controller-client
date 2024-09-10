import React, { useState, useEffect } from 'react';
import { NavLink } from "react-router-dom";
import { BiGroup } from "react-icons/bi";
import { GrCompliance } from "react-icons/gr";
import { RiMenuUnfoldFill, RiMenuFoldLine } from "react-icons/ri";


const Sliderbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);

        // Automatically open the sidebar if window width is greater than 639px
        if (window.innerWidth >= 768) {
            setIsOpen(true);
        } else {
            setIsOpen(false);
        }

        // Cleanup listener on component unmount
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [windowWidth]); // Add windowWidth as a dependency to re-trigger useEffect on resize



    const menuItems = [
        { path: "/electricians", name: "Electricians", icon: <BiGroup /> },
        { path: "/complaints", name: "complaints", icon: <GrCompliance /> }, 
  
    ];

    return (
        <nav className={`h-full border-[2px] border-solid border-transparent rounded-md ease-in-out duration-700 ${isOpen ? "sm:w-72 w-[235px] absolute md:static bg-white md:bg-transparent" : "w-12"} overflow-hidden mr-3`}>
            <div className="flex items-center h-16 w-full border-b-2 border-solid border-[#D3D3D3]">
                <h2 className={`flex  items-center ease-in-out duration-700 text-amber-950 ${isOpen ? "w-52 h-full" : "w-0 h-full"}`} > 𝙀𝙈𝙎 </h2>
                <div
                    className={`h-9 w-9 mx-auto text-3xl flex justify-center items-center rounded-md cursor-pointer text-[#135049] ${isOpen ? "bg-amber-950 text-white" : "hover:bg-amber-950 hover:text-white transition-all duration-500"}`}
                    onClick={toggle}
                >
                    {isOpen ? <RiMenuFoldLine className='hover:mr-2' /> : <RiMenuUnfoldFill className='hover:ml-2' />}
                </div>
            </div>
            <div className='h-full  overflow-y-scroll scrollbar-hide mt-3'>
                {menuItems.map((item, index) => (
                    <NavLink
                        to={item.path}
                        key={index}
                        className={({ isActive }) =>
                            `flex items-center whitespace-nowrap py-2 px-2 gap-4 mb-3 no-underline transition-all duration-500 ${isActive ? "bg-amber-950 text-white rounded-md" : "text-[#135049]"} hover:bg-amber-950 hover:text-white hover:rounded-md`
                        }
                    >
                        <div className="text-[21px]">{item.icon}</div>
                        <div className={`${isOpen ? "block" : "hidden"}`}>{item.name}</div>
                    </NavLink>
                ))}
            </div>
        </nav>
    );
};

export default Sliderbar;
