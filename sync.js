const BACKEND_URL =
    "https://friendly-capybara-vpg4w9j55qqgcx67p-3000.app.github.dev";

// Check internet status
function updateStatus() {

    const status = document.getElementById("status");

    if (navigator.onLine) {
        status.innerText = "🟢 Internet connected";
    } else {
        status.innerText = "🔴 Offline";
    }
}


// Test connection to backend
async function testConnection() {

    const result = document.getElementById("result");

    try {

        const response = await fetch(
            `${BACKEND_URL}/`
        );

        const data = await response.json();

        result.innerText = data.message;

    } catch (error) {

        result.innerText =
            "❌ Could not connect to backend.";

        console.log(error);

    }
}


// Detect internet changes
window.addEventListener("online", updateStatus);

window.addEventListener("offline", updateStatus);


// Run when page loads
updateStatus();