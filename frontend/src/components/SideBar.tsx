import React, { useEffect, useState } from 'react'
import { CiChat2 } from "react-icons/ci";
import { CiCamera } from "react-icons/ci";
import { CiSearch } from "react-icons/ci";
import { CiMenuBurger } from "react-icons/ci";
import { Route, Routes, useNavigate, Navigate, useLocation } from 'react-router-dom';
import Soil from '../pages/soil';
import PPE from '../pages/ppe';
import Chatbot from '../pages/chatbot';
import Location from '../pages/ppe/location';


function SideBar() {

    const navigate = useNavigate()
    const location = useLocation()

    const data = [
        {
            "title": "Soil Classification",
            "link": "/classify-soil",
            "icon": <CiSearch style={{ fontSize: "1.5rem" }} />,
            "element": <Soil />
        },
        {
            "title": "PPE Detection",
            "link": "/ppe-detection",
            "icon": <CiCamera style={{ fontSize: "1.5rem" }} />,
            "element": <PPE />
        },
        {
            "title": "Chatbot",
            "link": "/chatbot",
            "icon": <CiChat2 style={{ fontSize: "1.5rem" }} />,
            "element": <Chatbot />
        }
    ]

    useEffect(() => {

        data.map((item) => {
            const element = document.getElementById(`nav-link-${item.link}`)

            if (item.link !== location.pathname)
                element?.classList.remove("bg-violet-500")
            else
                element?.classList.add("bg-violet-500")
        })

    }, [location.pathname])

    const toogleSideBar = () => {
        const item = document.getElementById("sidebar"), button = document.getElementById("button")

        item?.classList.toggle('-translate-x-full')

        if (button?.classList.contains("text-black")) {
            button?.classList.remove("text-black")
            button?.classList.add("text-white")
        }

        else {
            button?.classList.remove("text-white")
            button?.classList.add("text-black")
        }

    }

    return (

        <div className='flex flex-row'>
            <button style={{ position: "absolute" }} id="button" onClick={toogleSideBar} className={`p-3 text-white`}><CiMenuBurger style={{ fontSize: "1.5rem" }} /></button>
            <div id="sidebar" className="bg-violet-600 p-5 w-max h-screen transition-transform duration-300 ease-in-out">


                <h4 className='pt-4 text-lg text-white font-extrabold'>Construct.Ai</h4>

                <ul className='flex flex-col mt-4 gap-3'>

                    {
                        data.map((item: any) => {
                            return (
                                <li id={`nav-link-${item.link}`} onClick={() => navigate(item.link)} className={'flex flex-row px-1 items-center gap-2 py-2 rounded-md hover:bg-violet-500 text-white font-semibold hover:cursor-pointer '}>
                                    {item.icon}
                                    {item.title}

                                </li>
                            )
                        })
                    }

                </ul>

            </div>
            <div className='p-3 h-screen w-full'>
            <Routes>
                    <Route path="/" element={<Navigate to="/ppe-detection" />} />

                    {
                        data.map(item => {
                            return (
                                <Route element={item.element} path={item.link}></Route>
                            )
                        })
                    }

                    <Route path="/ppe-detection/:room_id" element={<Location/>}></Route>


                </Routes>
            </div>
            

        </div>

    )
}

export default SideBar