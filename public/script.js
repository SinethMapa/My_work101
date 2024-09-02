// script.js

document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    const themeToggle = document.getElementById('theme-toggle');

    // Handle form submission
    form.addEventListener('submit', (e) => {
        const weatherInfo = document.querySelector('.weather-info');
        const errorMsg = document.querySelector('.error');

        // Remove existing weather info or error messages
        if (weatherInfo) weatherInfo.remove();
        if (errorMsg) errorMsg.remove();
    });

    // Theme Toggle Functionality
    themeToggle.addEventListener('change', () => {
        document.body.classList.toggle('dark-mode');
    });

    // Optional: Persist Theme Selection using Local Storage
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-mode');
        themeToggle.checked = true;
    }

    themeToggle.addEventListener('change', () => {
        if (document.body.classList.contains('dark-mode')) {
            localStorage.setItem('theme', 'dark');
        } else {
            localStorage.setItem('theme', 'light');
        }
    });
});
