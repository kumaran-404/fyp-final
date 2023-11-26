import asyncio
import websockets
import cv2 
import json 
import base64 
from io import BytesIO
from PIL import Image
import numpy as np


async def connect_and_send_message():
    uri = f"ws://localhost:8000/ws/video/producer/location_1/"  
    
    try :
    
        async with websockets.connect(uri) as websocket:
            vid = cv2.VideoCapture(0) 
        
            while(True):
                ret, frame = vid.read() 
                cv2.imshow('video feed', frame) 
                if cv2.waitKey(1) & 0xFF == ord('q'): 
                    break

                _, buffer = cv2.imencode('.jpg', frame)
        
                frame_base64 = base64.b64encode(buffer).decode('utf-8')       

                await websocket.send(json.dumps(frame_base64))
                await asyncio.sleep(0.1)  

    except websockets.exceptions.ConnectionClosedError:
        print("WebSocket connection closed.")


asyncio.run(connect_and_send_message())
