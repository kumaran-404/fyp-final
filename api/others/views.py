from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from gradio_client import Client


# Create your views here.
@require_http_methods(['POST'])
def chatbot_handler(request):
    client = Client("https://eb77e5d1242c7957cd.gradio.live/")
    result = client.predict(
        "Hello!!",
        api_name="/chat"
    )
    print(result)
    return JsonResponse({"message": "this is chatbot"})


@require_http_methods(['POST'])
def soil_handler(request):
    print(request)
    return JsonResponse({"message": "soil handler"})
