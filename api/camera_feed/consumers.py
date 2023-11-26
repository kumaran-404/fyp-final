from channels.generic.websocket import AsyncWebsocketConsumer
import asyncio
import base64
import cv2 
import json
import numpy as np
from channels.layers import get_channel_layer
from ml.model import get_model 
import queue 
from io import BytesIO
from PIL import Image
import math 

classNames = ['Hardhat', 'Mask', 'NO-Hardhat', 'NO-Mask','NO-Safety Vest', 'Person', 'Safety Cone','Safety Vest', 'machinery', 'vehicle']

model = get_model()

current_producers = set()

current_frames = dict()

count =0 

class CameraFeed(AsyncWebsocketConsumer):

    def put_bounding_box(self,frame):
        
        frame = np.array(frame)

        results = model(frame, stream=True)

        # print(results)

        for r in results:
            boxes = r.boxes
            for box in boxes:
                x1, y1, x2, y2 = box.xyxy[0]
                x1, y1, x2, y2 = int(x1), int(y1), int(x2), int(y2)

        #     # put box in cam
                cv2.rectangle(frame, (x1, y1), (x2, y2), (255, 0, 255), 3)

            # confidence
                confidence = math.ceil((box.conf[0]*100))/100

            # class name
                cls = int(box.cls[0])

            # object details
                org = [x1, y1]
                font = cv2.FONT_HERSHEY_SIMPLEX
                fontScale = 1
                color = (255, 0, 0)
                thickness = 2

                cv2.putText(frame, classNames[cls], org, font, fontScale, color, thickness)
        
        return frame 

    async def connect(self):
        
        await self.accept()
        
        self.group_name = self.scope['url_route']['kwargs']['group_name']

        self.alias_name = self.scope['url_route']['kwargs']['alias_name']


        if(self.group_name=="producer"):

            current_producers.add(self.alias_name)
            current_frames[self.alias_name] = queue.Queue()


        await self.channel_layer.group_send(
            "consumer",
            {
               "status" : "connected" ,
                "channel_name" : json.dumps(list(current_producers)),
                "type" : "notify.consumer"
            }
        )
       

        await self.channel_layer.group_add(
            self.group_name, 
            self.channel_name
        )

        
        pass 

    async def disconnect(self,close_code):
        await self.channel_layer.group_discard(
                self.group_name,
                self.channel_name,
                
            )
        if(self.group_name=="producer"):
            current_producers.remove(self.alias_name)
            await self.channel_layer.group_send(
            "consumer",
            {
               "status" : "disconnected" ,
                "channel_name" : json.dumps(list(current_producers)),
                 "type" : "notify.consumer" 
            }
            )

    async def receive(self,text_data):

        global count 
        
        group_name = self.group_name 

        count = count + 1 

        if count!=1 :
            if count==3:
                count =0 
            return 

        data = json.loads(text_data)

        image_bytes = base64.b64decode(data)

        image_array = np.array(Image.open(BytesIO(image_bytes)))
        
        frame = self.put_bounding_box(image_array)

        _, buffer = cv2.imencode('.jpg', frame)
        
        frame_base64 = base64.b64encode(buffer).decode('utf-8')
        #convert to np array 

        if group_name=="producer":
      
           await self.channel_layer.group_send(
            "consumer",
            {
               "producer_name" : self.channel_name ,
                "data" : frame_base64,
                "type" : "chat.message"
            }
            )
           
    async def chat_message(self,event):
        await self.send(json.dumps({
            "producer_name" : event["producer_name"] ,
            "data" : event["data"],
        }))
    
    async def notify_consumer(self,event):
        await self.send(json.dumps({
            "status" : event["status"] ,
            "channel_name": event["channel_name"]
        }))


