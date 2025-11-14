🌱 Intelligent Pesticide Sprinkling Rover System
AI-Powered Smart Farming | ESP32 | Live Sensors | ML Disease Detection | Automated Spraying

This project integrates AI-driven plant disease detection, real-time rover monitoring, sensor-based crop insights, and an intelligent pesticide delivery system.
It is built using a React frontend and a Flask backend, communicating with an ESP32-CAM + sensor suite mounted on a rover.

🏗️ Project Structure
📦 Intelligent-Rover-System/
│
├── 🌐 ochi/                         # React Frontend
│   ├── src/
│   ├── public/
│   └── vite.config.js
│
├── 🔥 intelligent_rover_dashboard/  # Flask Backend
│   ├── app.py
│   ├── model/plant_model.h5
│   ├── templates/
│   └── static/
│
└── README.md

🚀 Tech Stack
Frontend (React – Ochi)

React + Vite

Tailwind CSS

Chart.js

ESP32 Camera Streaming

Live Sensor Dashboard

Disease Detection UI

Backend (Flask – intelligent_rover_dashboard)

Flask + CORS

TensorFlow/Keras (Plant Disease Model)

Base64 Image Processing

ESP32 Camera Streaming Proxy

REST API for React

Real-time sensor processing

Hardware

ESP32-CAM

DHT11 / DHT22

Soil Moisture Sensor

MQ-135 (Air Quality)

pH Sensor

Custom Rover with Nozzle Sprayer

⚙️ Setup & Installation
1️⃣ Clone the Repository
git clone https://github.com/yourusername/Intelligent-Rover-System.git
cd Intelligent-Rover-System

🎨 Frontend (React App — ochi)
▶️ Navigate to frontend
cd ochi

📦 Install Dependencies
npm install

🚀 Start Development Server
npm run dev


Your app will run at:

👉 http://localhost:5173

🔥 Backend (Flask — intelligent_rover_dashboard)
▶️ Navigate to backend
cd intelligent_rover_dashboard

📦 Create Virtual Environment
python -m venv venv
source venv/bin/activate   # Linux/macOS
venv\Scripts\activate      # Windows

📦 Install Requirements
pip install -r requirements.txt


(If requirements.txt is missing, install manually:)

pip install flask flask-cors tensorflow pillow requests numpy

🚀 Run Flask Server
python app.py


Backend starts at:

👉 http://localhost:5000

🔗 API Endpoints
Method	Endpoint	Description
GET	/	Dashboard UI
GET	/api/data	Live sensor data from ESP32
GET	/camera_feed	Proxied ESP32 camera stream
POST	/predict	Disease detection from uploaded image
POST	/predict_base64	Disease detection from live camera
GET	/latest_prediction	Retrieve latest ML output
🌿 Key Features
✅ Live Sensor Dashboard

Real-time pH, moisture, humidity, temp

CO₂ & air quality

Line + histogram charts

✅ AI Disease Detection

Upload image OR auto-capture from ESP32-CAM

Model trained on Potato Plant Dataset

Supports Early Blight, Late Blight, Healthy

✅ ESP32 Camera Streaming

Live camera feed

Auto snapshot every 3 seconds

✅ Smart Insights

Alerts: moisture low / temp high / humidity high

AI-generated plant health suggestions

✅ Rover Monitoring

Real-time rover location

Battery & solar charging status

Last treatment performed

📸 Screenshots (Add Your Images Here)
Add images like:
![Dashboard](screenshots/dashboard.png)
![Camera](screenshots/camera-feed.png)

🤝 Contributing

Pull requests are welcome!
Feel free to open issues for bugs or feature requests.

📜 License

This project is licensed under the MIT License.

🙌 Credits

Developed by Srijan Jaiswal
Under project: Dr. Kissan — Smart Agricultural Assistance System
