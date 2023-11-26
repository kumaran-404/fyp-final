import React,{useEffect, useState} from 'react'

function Location() {

    const [frame,setFrame] = useState(null)

    useEffect(()=>{

        const socketUrl = 'ws://localhost:8000/ws/video/consumer/virat/';

        const socket = new WebSocket(socketUrl);

        socket.addEventListener('open', (event) => {
             console.log('WebSocket connection opened:', event);
        });

        socket.addEventListener('message', (event) => {
            console.log('WebSocket message received:', event.data);

            const data = JSON.parse(event.data) 

            console.log(data.status)

            if(data.status=="connected" || data.status=="disconnected"){
                // const channel_name = JSON.parse(data.channel_name)
                
                // setAvailable(channel_name)
                
            }
            else {
                
                // const frame= JSON.parse(data["data"])
                setFrame(data["data"])
            }

        });

        socket.addEventListener('close', (event) => {
            console.log('WebSocket connection closed:', event);
        });

        return () => {
          socket.close();
        };
    },[])
  return (
    <div>

        <h4>Location_1</h4>

        {
             frame===null ? "Please Wait..." :  <img src={`data:image/jpeg;base64,${frame}`}></img>
        }
       

    </div>
  )
}

export default Location