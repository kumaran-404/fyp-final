import React ,{useEffect,useState} from 'react'
import { FaChevronRight } from "react-icons/fa";
import { Link, Route, Routes } from 'react-router-dom';


function PPE() {

    const [available,setAvailable] = useState(["location_1","location_2"])

    const [recent,setRecent] = useState([{
        "location" :"location_1",
        "timestamp" : new Date().toLocaleTimeString(),
         "details" : "No Safety vest-2" ,
    },{
        "location" :"location_1",
        "timestamp" :  new Date().toLocaleTimeString(),
         "details" : "No Helmet-1" ,
    }])

    

  return (
    <div className='flex flex-col justify-around h-3/6 pl-10'>
        
        <div className='shadow-lg p-3 rounded-lg'>
            <h4 className='text-2xl'>Available Channels</h4>

            {
                available.length===0 ? <span>Currently No channels </span> : 
                <ul>
                    {
                         available.map((item:any)=>{
                            return(
                                <div className='flex flex-row items-center gap-2'>
                                    <span>{item}</span>
                                    <button className='bg-white text-blue-600 rounded-md flex flex-row text-black p-2 items-center'><Link to="location_1">View More </Link><FaChevronRight/></button>
                                </div>
                            )
                         })
                    }
                </ul>
            }
        </div>

        <div className='shadow-lg p-3 rounded-lg'>
            <h4  className='text-2xl'>
                Recent Activities
            </h4>

    
                <ul>
                {
                     recent.map((item:any)=>{
                        return(
                            <div className='flex flex-row items-center gap-2'>
                                <span>{item["details"]}</span>
                                <span>{item["location"]}</span>
                                <span>{item["timestamp"]}</span>
                                <button className='bg-white text-blue-600 rounded-md flex flex-row text-black p-2 items-center'>View More <FaChevronRight/></button>
                            </div>
                        )
                     })
                }
                </ul>
       
            
        </div>


        {/* {frame&&<img src={`data:image/png;base64,${frame}`}/>} */}
    </div>
  )
}

export default PPE