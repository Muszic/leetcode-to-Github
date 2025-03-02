// background.js
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "commitToGitHub") {
        let { problemTitle, fileName, code } = message;
        let githubToken = localStorage.getItem("githubToken");
        let repo = "your-github-username/leetcode-solutions";
        let branch = "main";

        if (!githubToken) {
            alert("GitHub token not set. Please log in via the extension popup.");
            return;
        }

        fetch(`https://api.github.com/repos/${repo}/contents/${fileName}`, {
            method: "PUT",
            headers: {
                "Authorization": `token ${githubToken}`,
                "Accept": "application/vnd.github.v3+json"
            },
            body: JSON.stringify({
                message: `Added solution for ${problemTitle}`,
                content: btoa(code),
                branch: branch
            })
        }).then(response => response.json()).then(data => {
            if (data.commit) {
                alert("✅ Solution committed successfully!");
            } else {
                alert("❌ Failed to commit solution: " + data.message);
            }
        }).catch(error => console.error("GitHub API error:", error));
    }
});
