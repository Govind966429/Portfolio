console.log("JavaScript connected");
const themeButton = document.getElementById("themeToggle");
const projectSearch = document.getElementById("projectSearch");
const projectCards = document.querySelectorAll(".project-card");
const projectSearchEmpty = document.getElementById("projectSearchEmpty");

function filterProjects() {
    const query = projectSearch.value.trim().toLowerCase();
    let visibleCount = 0;

    projectCards.forEach(function (card) {
        const title = card.querySelector(".project-title").textContent;
        const description = card.querySelector(".project-description").textContent;
        const technologies = card.getAttribute("data-technologies") || "";
        const searchableText = (title + " " + description + " " + technologies).toLowerCase();
        const isMatch = searchableText.includes(query);

        card.hidden = !isMatch;
        if (isMatch) {
            visibleCount += 1;
        }
    });

    projectSearchEmpty.hidden = visibleCount > 0;
}

projectSearch.addEventListener("input", filterProjects);

function applyTheme(isDark) {
    document.body.classList.toggle("dark-mode", isDark);
    themeButton.textContent = isDark ? "Switch to Light Mode" : "Switch to Dark Mode";
    themeButton.setAttribute("aria-pressed", isDark ? "true" : "false");
}

applyTheme(localStorage.getItem("theme") === "dark");

themeButton.addEventListener("click", function () {
    const isDark = !document.body.classList.contains("dark-mode");
    applyTheme(isDark);
    localStorage.setItem("theme", isDark ? "dark" : "light");
});
const cityInput = document.getElementById("cityInput"); 
const weatherButton = document.getElementById("weatherButton"); 
const weatherResult = document.getElementById("weatherResult"); 

weatherButton.addEventListener("click", getWeather); 
async function getWeather() {

    const city = cityInput.value.trim();

    if (!city) {
        weatherResult.textContent = "Please enter a city.";
        return;
    }

    weatherResult.textContent = "Loading weather...";

    const apiKey = "a43738641ca1a0dc61a4e5440da16939";

    const url =
  `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        const data = await response.json();

        weatherResult.innerHTML = `
            <h3>${data.name}</h3>
            <p>Temperature: ${data.main.temp}°C</p>
            <p>Condition: ${data.weather[0].description}</p>
        `;

    } catch (error) {

        weatherResult.textContent =
            "Unable to fetch weather. Please try again.";

        console.error(error);
    }
}