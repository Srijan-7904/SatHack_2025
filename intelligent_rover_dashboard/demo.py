import requests
print(requests.get("http://192.168.137.16:5000/video_feed").status_code)
