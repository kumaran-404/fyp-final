import React, { useEffect, useState } from 'react'
import { IoSend } from "react-icons/io5";


function Chatbot() {

  const [messages, setMessages] = useState([{
    "You": "What is Scrutiny fees ? and how it is calculated ?",
    "Construct.Ai" : "Scrunity fees are fees collected by the competent authority for scrutinizing applications for planning permission or building permit.  \nUnhelpful Answer:Scrunity fees are fees collected by government for scrutinizing applications for plaaning permission or building permit. \nPlease answer the question based on provided context "
  }])

  return (
    <div className='h-full flex flex-col justify-between p-10'>
      <iframe style={{height:"100%"}} src='https://291c38e72fa129186d.gradio.live/'></iframe>
      {/* <div className='p-10 h-full '>
          
        {
          messages.length === 0 ?
            <div className='margin-auto'>
              <span className='text-lg font-bold text-violet-600'>How Can I Help Today?</span>
            </div> :
            <div>
              {
                messages.map((item: any) => {
                  return (
                    <div>
                      <div className='bg-violet-300 p-3 rounded-lg shadow-md'>
                        <h5 className='font-bold'>You</h5>
                        <div>
                          {item["You"]}
                        </div>
                      </div>

                      <div className='p-3 rounded-md mt-10 ml-10 outline-dotted outline-2'>
                        <h5 className='font-bold'>Construct.Ai</h5>
                        <div>
                          {item["Construct.Ai"]}
                        </div>
                      </div>
                    </div>
                  )
                })
              }
            </div>
        }

      </div>
      <div className='flex flex-row w-100 items-center outline rounded-md outline-1 shadow-md justify-between px-2'>
        <input className='p-3 focus:outline-none' placeholder='Message Construct.Ai'></input>
        <IoSend className="text-lg"></IoSend>
      </div> */}
    </div>

  )
}

export default Chatbot