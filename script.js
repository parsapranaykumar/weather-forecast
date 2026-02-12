// Show loading overlay
function showLoading() {
    document.getElementById('loadingOverlay').style.display = 'flex';
}

// Hide loading overlay
function hideLoading() {
    document.getElementById('loadingOverlay').style.display = 'none';
}

// Format date and time
function formatDateTime(dateTimeStr) {
    const date = new Date(dateTimeStr);
    return {
        date: date.toLocaleDateString('en-US', { 
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        }),
        time: date.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit'
        })
    };
}

// Get weather data
async function getData(e) {
    e.preventDefault();
    
    const searchDataElem = document.forms.SearchData;
    const textBoxElem = searchDataElem.textBox;
    const city = textBoxElem.value.trim();
    
    if (!city) {
        alert('Please enter a city name');
        return;
    }
    
    const btnElem = document.getElementById("Btn");
    const originalBtnContent = btnElem.innerHTML;
    
    // Show loading state
    btnElem.innerHTML = '<i class="bi bi-arrow-clockwise"></i> Searching...';
    btnElem.disabled = true;
    showLoading();
    
    try {
        const API = `https://api.weatherapi.com/v1/forecast.json?key=f3c2180d7bd94648bb2101835252911&q=${city}&days=3&aqi=yes`;
        const res = await axios.get(API);
        
        // Populate all sections
        currentDetails(res.data);
        hoursDetails(res.data);
        daysDetails(res.data);
        
        // Clear input
        textBoxElem.value = "";
        
        // Add fade-in animation
        document.querySelectorAll('.current-weather-card, .forecast-card, .hour-item').forEach(el => {
            el.classList.add('fade-in-up');
        });
        
    } catch (err) {
        console.error('Weather API Error:', err);
        const errorMsg = err.response?.data?.error?.message || 'Unable to fetch weather data. Please try again.';
        alert(errorMsg);
    } finally {
        // Reset button state
        btnElem.innerHTML = originalBtnContent;
        btnElem.disabled = false;
        hideLoading();
    }
}

// Display current weather details
function currentDetails(data) {
    const dateTime = formatDateTime(data.location.localtime);
    
    const html = `
        <div class="current-info">
            <div class="current-details">
                <h6>${dateTime.date} • ${dateTime.time}</h6>
                <h2 class="current-location">${data.location.name}</h2>
                <h6>${data.location.region}, ${data.location.country}</h6>
                <div class="current-temp">${data.current.temp_c}°<span style="font-size: 0.6em;">C</span></div>
            </div>
            
            <div class="weather-visual">
                <img src="${data.current.condition.icon}" class="current-icon" alt="${data.current.condition.text}">
                <div class="current-condition">${data.current.condition.text}</div>
            </div>
        </div>
        
        <div class="weather-stats">
            <div class="stat-item">
                <div class="stat-value">${data.current.humidity}%</div>
                <div class="stat-label">Humidity</div>
            </div>
            <div class="stat-item">
                <div class="stat-value">${data.current.wind_kph} km/h</div>
                <div class="stat-label">Wind Speed</div>
            </div>
            <div class="stat-item">
                <div class="stat-value">${data.current.pressure_mb} mb</div>
                <div class="stat-label">Pressure</div>
            </div>
            <div class="stat-item">
                <div class="stat-value">${data.current.vis_km} km</div>
                <div class="stat-label">Visibility</div>
            </div>
            <div class="stat-item">
                <div class="stat-value">${data.current.uv}</div>
                <div class="stat-label">UV Index</div>
            </div>
            <div class="stat-item">
                <div class="stat-value">${data.current.feelslike_c}°C</div>
                <div class="stat-label">Feels Like</div>
            </div>
        </div>
    `;
    
    document.getElementById("currrentRef").innerHTML = html;
}

// Display hourly forecast
function hoursDetails(data) {
    const hours = data.forecast.forecastday[0].hour;
    const currentHour = new Date().getHours();
    
    let html = '';
    
    // Show next 12 hours starting from current hour
    for (let i = 0; i < 12; i++) {
        const hourIndex = (currentHour + i) % 24;
        const hourData = hours[hourIndex];
        const time = new Date();
        time.setHours(hourIndex, 0, 0, 0);
        const timeStr = time.toLocaleTimeString('en-US', { 
            hour: 'numeric', 
            hour12: true 
        });
        
        html += `
            <div class="hour-item">
                <div class="hour-time">${i === 0 ? 'Now' : timeStr}</div>
                <img src="${hourData.condition.icon}" alt="${hourData.condition.text}" class="hour-icon">
                <div class="hour-temp">${Math.round(hourData.temp_c)}°</div>
            </div>
        `;
    }
    
    document.getElementById("hoursRef").innerHTML = html;
}

// Display 3-day forecast
function daysDetails(data) {
    const days = ['Today', 'Tomorrow', 'Day After Tomorrow'];
    let html = '';
    
    data.forecast.forecastday.forEach((day, index) => {
        const dayData = day.day;
        const isToday = index === 0;
        
        // For today, use current data, for other days use forecast data
        const temp = isToday ? data.current.temp_c : dayData.maxtemp_c;
        const condition = isToday ? data.current.condition : dayData.condition;
        const humidity = isToday ? data.current.humidity : dayData.avghumidity;
        const windSpeed = isToday ? data.current.wind_kph : dayData.maxwind_kph;
        
        // Get AQI data (air quality index)
        const aqiData = isToday ? 
            data.current.air_quality?.o3 || '—' : 
            (day.hour[12]?.air_quality?.o3 || '—');
        
        html += `
            <div class="forecast-card">
                <div class="forecast-header">
                    <div class="day-label">${days[index]}</div>
                    <img src="${condition.icon}" alt="${condition.text}" class="forecast-icon">
                </div>
                
                <div class="forecast-temp">${Math.round(temp)}°<span style="font-size: 0.6em;">C</span></div>
                
                <div class="forecast-details">
                    <div class="detail-item">
                        <div class="detail-value">${humidity}%</div>
                        <div class="detail-label">Humidity</div>
                    </div>
                    <div class="detail-item">
                        <div class="detail-value">${Math.round(windSpeed)} km/h</div>
                        <div class="detail-label">Wind</div>
                    </div>
                    <div class="detail-item">
                        <div class="detail-value">${isToday ? data.current.uv : dayData.uv}</div>
                        <div class="detail-label">UV Index</div>
                    </div>
                    <div class="detail-item">
                        <div class="detail-value">${typeof aqiData === 'number' ? Math.round(aqiData) : aqiData}</div>
                        <div class="detail-label">Air Quality</div>
                    </div>
                </div>
            </div>
        `;
    });
    
    document.getElementById("daysRef").innerHTML = html;
}

// Initialize app with default city on page load
window.addEventListener('load', () => {
    // You can set a default city here
    const defaultCity = 'Hyderabad';
    const textBoxElem = document.forms.SearchData.textBox;
    textBoxElem.value = defaultCity;
    
    // Trigger search for default city
    const searchForm = document.forms.SearchData;
    const submitEvent = new Event('submit');
    searchForm.dispatchEvent(submitEvent);
});

// Add smooth scrolling for better UX
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Add keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Focus search input with Ctrl+K or Cmd+K
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        document.querySelector('input[name="textBox"]').focus();
    }
});

// Add touch/swipe support for mobile hourly forecast
let isScrolling = false;
const hourlyContainer = document.getElementById('hoursRef');

if (hourlyContainer) {
    hourlyContainer.addEventListener('touchstart', () => {
        isScrolling = true;
    });
    
    hourlyContainer.addEventListener('touchend', () => {
        isScrolling = false;
    });
}
