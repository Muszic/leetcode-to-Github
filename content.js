// content.js
(function() {
    function addGitHubButton() {
        let existingButton = document.getElementById("commit-to-github");
        if (existingButton) return;
        
        let button = document.createElement("button");
        button.innerText = "🚀 Commit to GitHub";
        button.id = "commit-to-github";
        button.style = "position: fixed; bottom: 20px; right: 20px; z-index: 1000; background: #181717; color: white; border: none; padding: 12px 16px; cursor: pointer; border-radius: 6px; font-weight: bold; box-shadow: 0 4px 6px rgba(0,0,0,0.1); transition: 0.3s; font-size: 16px;";
        button.addEventListener("mouseover", () => button.style.background = "#24292e");
        button.addEventListener("mouseout", () => button.style.background = "#181717");
        
        button.addEventListener("click", async function() {
            let problemTitle = document.title.split(" - ")[0];
            let code = document.querySelector(".view-lines").innerText;
            let language = document.querySelector(".ant-select-selection-item")?.innerText || "txt";
            let fileExtension = {
                "Python3": "py",
                "Java": "java",
                "C++": "cpp",
                "C": "c",
                "JavaScript": "js",
                "TypeScript": "ts",
                "Swift": "swift",
                "Kotlin": "kt",
                "Go": "go",
                "Rust": "rs"
            }[language] || "txt";
            
            let fileName = `${language}/${problemTitle.replace(/\s+/g, "_")}.${fileExtension}`;
            
            chrome.runtime.sendMessage({
                action: "commitToGitHub",
                problemTitle: problemTitle,
                fileName: fileName,
                code: code
            });
        });
        
        document.body.appendChild(button);
    }
    
    window.addEventListener("load", addGitHubButton);
})();
