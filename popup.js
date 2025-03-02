// popup.js
document.getElementById("login-github").addEventListener("click", function() {
    let githubToken = prompt("Enter your GitHub personal access token:");
    if (githubToken) {
        localStorage.setItem("githubToken", githubToken);
        alert("🔓 GitHub authentication successful!");
    }
});
