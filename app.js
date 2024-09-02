const express = require("express");
const axios = require("axios");
const path = require("path");
const hbs = require("hbs");
require("dotenv").config();  // Load environment variables from .env file

const app = express();

// Setup paths for Express config
const publicDirectoryPath = path.join(__dirname, "public");
const viewsPath = path.join(__dirname, "views");
const partialsPath = path.join(__dirname, "views/partials");

app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

app.use(express.static(publicDirectoryPath));
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT || 3000;

// Routes
app.get("/", (req, res) => {
    res.render("index", { title: "Weather App" });
});

app.post("/weather", async (req, res) => {
    const city = req.body.city;
    console.log("City:", city);
    console.log("API Key:", process.env.API_KEY);

    if (!city) {
        return res.render("index", { title: "Weather App", error: "Please enter a city name." });
    }

    const apiKey = process.env.API_KEY;  // Get the API key from the environment variables
    const units = "metric";  // Units for temperature: metric for Celsius, imperial for Fahrenheit
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=${units}`;

    console.log("Request URL:", url);  // Debug: Output the request URL

    try {
        const response = await axios.get(url);
        const weatherData = response.data;
        const weather = {
            city: weatherData.name,
            country: weatherData.sys.country,
            temperature: weatherData.main.temp,
            description: weatherData.weather[0].description,
            icon: `http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`,
        };
        res.render("index", { title: "Weather App", weather });
    } catch (error) {
        if (error.response) {
            console.error("Error status code:", error.response.status);
            console.error("Error response data:", error.response.data);
        } else if (error.request) {
            console.error("Error request data:", error.request);
        } else {
            console.error("Error message:", error.message);
        }
        res.render("index", { title: "Weather App", error: "Unable to fetch weather data. Please try again." });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
