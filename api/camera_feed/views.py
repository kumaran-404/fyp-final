from django.shortcuts import render
from django.http import JsonResponse
import cv2 

def test(request):
    return JsonResponse({"message":"hi"})