document.addEventListener("DOMContentLoaded", function () {

    // ------------------------------
    // Chart.js Initialization
    // ------------------------------
    const ctx = document.getElementById('sensorChart').getContext('2d');
    const histogramCtx = document.getElementById('histogramChart').getContext('2d');

    const sensorChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: [],
            datasets: [
                { label: 'pH', data: [], borderColor: '#2e7d32', fill: false },
                { label: 'Soil Moisture', data: [], borderColor: '#ff9800', fill: false },
                { label: 'Temperature', data: [], borderColor: '#f44336', fill: false },
                { label: 'Humidity', data: [], borderColor: '#03a9f4', fill: false },
                { label: 'IAQ', data: [], borderColor: '#9c27b0', fill: false },
                { label: 'CO₂', data: [], borderColor: '#795548', fill: false }
            ]
        },
        options: {
            responsive: true,
            animation: false,
            scales: {
                x: { title: { display: true, text: 'Time' } },
                y: { beginAtZero: true }
            }
        }
    });

    const histogramChart = new Chart(histogramCtx, {
        type: 'bar',
        data: {
            labels: [],
            datasets: [
                { label: 'pH', data: [], backgroundColor: 'rgba(46,125,50,0.7)' },
                { label: 'Soil Moisture', data: [], backgroundColor: 'rgba(255,152,0,0.7)' },
                { label: 'Temperature', data: [], backgroundColor: 'rgba(244,67,54,0.7)' },
                { label: 'Humidity', data: [], backgroundColor: 'rgba(3,169,244,0.7)' },
                { label: 'IAQ', data: [], backgroundColor: 'rgba(156,39,176,0.7)' },
                { label: 'CO₂', data: [], backgroundColor: 'rgba(121,85,72,0.7)' }
            ]
        },
        options: {
            responsive: true,
            scales: {
                x: { stacked: true },
                y: { stacked: true, beginAtZero: true }
            }
        }
    });

    // ------------------------------
    // History Arrays For Histogram
    // ------------------------------
    const sensorReadings = {
        pH: [],
        soil_moisture: [],
        temperature: [],
        humidity: [],
        iaq: [],
        co2: []
    };

    function calculateHistogram(dataArray, binCount = 5) {
        if (!dataArray.length) return { bins: [], frequencies: [] };

        const min = Math.min(...dataArray);
        const max = Math.max(...dataArray);
        const binSize = (max - min) / binCount || 1;

        const bins = Array.from({ length: binCount }, (_, i) =>
            (min + i * binSize).toFixed(1) + "-" + (min + (i + 1) * binSize).toFixed(1)
        );

        const frequencies = Array(binCount).fill(0);
        dataArray.forEach(val => {
            let index = Math.floor((val - min) / binSize);
            if (index >= binCount) index = binCount - 1;
            frequencies[index]++;
        });

        return { bins, frequencies };
    }

    // ------------------------------
    // Update Dashboard UI + Charts
    // ------------------------------
    function updateCharts(data) {
        const time = new Date().toLocaleTimeString();

        // Update cards (only real server values)
        document.getElementById("ph").textContent = data.pH;
        document.getElementById("moisture").textContent = data.soil_moisture;
        document.getElementById("temp").textContent = data.temperature;
        document.getElementById("humidity").textContent = data.humidity;
        document.getElementById("iaq").textContent = data.iaq;
        document.getElementById("co2").textContent = data.co2;

        // Update line chart (limit to 10)
        if (sensorChart.data.labels.length >= 10) {
            sensorChart.data.labels.shift();
            sensorChart.data.datasets.forEach(ds => ds.data.shift());
        }

        sensorChart.data.labels.push(time);
        sensorChart.data.datasets[0].data.push(data.pH);
        sensorChart.data.datasets[1].data.push(data.soil_moisture);
        sensorChart.data.datasets[2].data.push(data.temperature);
        sensorChart.data.datasets[3].data.push(data.humidity);
        sensorChart.data.datasets[4].data.push(data.iaq);
        sensorChart.data.datasets[5].data.push(data.co2);

        // Push history (for histogram)
        sensorReadings.pH.push(data.pH);
        sensorReadings.soil_moisture.push(data.soil_moisture);
        sensorReadings.temperature.push(data.temperature);
        sensorReadings.humidity.push(data.humidity);
        sensorReadings.iaq.push(data.iaq);
        sensorReadings.co2.push(data.co2);

        sensorChart.update();

        // Histogram update
        const allBins = [];
        const histData = Object.keys(sensorReadings).map(key => {
            const { bins, frequencies } = calculateHistogram(sensorReadings[key]);
            allBins.push(bins);
            return frequencies;
        });

        histogramChart.data.labels = allBins[0] || [];
        histogramChart.data.datasets.forEach((ds, i) => ds.data = histData[i]);
        histogramChart.update();
    }

    // ------------------------------
    // Smart Insights (Only real data)
    // ------------------------------
    function generateInsights(data) {
        const insightsList = document.getElementById("insights");
        insightsList.innerHTML = "";

        const msgs = [
            `pH: ${data.pH}`,
            `Soil Moisture: ${data.soil_moisture}`,
            `Temperature: ${data.temperature}`,
            `Humidity: ${data.humidity}`,
            `IAQ: ${data.iaq}`,
            `CO₂: ${data.co2}`
        ];

        msgs.forEach(msg => {
            const li = document.createElement("li");
            li.textContent = msg;
            insightsList.appendChild(li);
        });
    }

    // ------------------------------
    // Fetch Data from Server
    // ------------------------------
    async function fetchData() {
        try {
            const response = await fetch("http://192.168.137.144:5000/api/data");
            const data = await response.json();

            updateCharts(data);
            generateInsights(data);

        } catch (err) {
            console.error("Fetch error:", err);
        }
    }

    setInterval(fetchData, 4000);
    fetchData();
});
