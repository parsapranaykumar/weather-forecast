# 🌤️ IndWeather –  Weather Forecast App


🔗 **Live Demo:**  
https://weather-forecast-sigma-ashy.vercel.app/


A modern, responsive weather forecasting web application that provides real-time weather data, hourly forecasts, and 3-day predictions using WeatherAPI.


---


## 🚀 Features


- 🌍 Search weather by city name
- 🌡️ Real-time current temperature & “Feels Like”
- 💨 Wind speed, humidity, pressure, visibility
- ☀️ UV Index display
- 🌬️ Air Quality Index (AQI)
- 🕒 24-hour forecast (dynamic scroll)
- 📅 3-day forecast
- ⚡ Loading overlay with smooth animations
- ⌨️ Keyboard shortcut (Ctrl + K) for quick search
- 📱 Fully responsive design (mobile-first)


---


## 🛠️ Tech Stack


| Technology | Purpose |
|------------|----------|
| HTML5 | Structure |
| CSS3 | Styling & UI |
| JavaScript (ES6) | Logic & API handling |
| Axios | API requests |
| Bootstrap 5 | UI components |
| WeatherAPI | Weather data provider |
| Vercel | Deployment |


---


## 📂 Project Structure



IndWeather/
│
├── index.html # Main UI structure
├── style.css # Complete styling & responsiveness
└── script.js # Weather API logic & dynamic rendering



---


## ⚙️ How It Works


1. User enters a city name.
2. Application sends a request to WeatherAPI.
3. API response is processed using Axios.
4. UI dynamically updates:
   - Current Weather
   - Hourly Forecast
   - 3-Day Forecast


---


## 🔑 API Configuration


The application uses WeatherAPI.


Inside `script.js`, replace the API key with your own:


```javascript
const API = `https://api.weatherapi.com/v1/forecast.json?key=YOUR_API_KEY&q=${city}&days=3&aqi=yes`;

You can get a free API key from:
https://www.weatherapi.com/

💻 Run Locally
1️⃣ Clone the repository
git clone https://github.com/your-username/your-repo-name.git
2️⃣ Open the project

Open index.html directly in browser
OR

Use Live Server extension in VS Code

🌍 Deployment

This project is deployed using Vercel.

To deploy your own version:

vercel deploy
🎯 Future Improvements

🌎 Auto-detect user location

🌙 Dark / Light mode toggle

📊 7-day forecast

🌡️ Celsius / Fahrenheit switch

📍 Search history feature

👨‍💻 Author

Pranay Kumar
B.Tech Graduate | Java Full Stack Developer
Skilled in Java, Spring Boot, MySQL, HTML, CSS, JavaScript

📜 License

This project is open-source and available under the MIT License.

⭐ If you found this project helpful, consider giving it a star!


---


If you want next-level polish, I can:


- Add professional GitHub badges (Live, Tech Stack, License)
- Optimize it for recruiter visibility
- Add a clean project screenshot section
- Rewrite it to align with Java Full Stack portfolio branding


Your move.
