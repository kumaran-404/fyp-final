from ultralytics import YOLO
import os 

def get_model():
    model_path = 'best_latest.pt'
    script_dir = os.path.dirname(os.path.abspath(__file__))
    model_path = os.path.join(script_dir, model_path)
    model = YOLO(model_path)
    return model 