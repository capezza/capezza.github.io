document.addEventListener("DOMContentLoaded", function () {
    // Load Header
    fetch("header.html")
        .then(response => response.text())
        .then(data => {
            document.body.insertAdjacentHTML("afterbegin", data);

            const toggleCheckbox = document.getElementById("theme-toggle");
            const themeLabel = document.querySelector(".theme-label");

            // Apply saved theme
            const savedTheme = localStorage.getItem("theme");
            if (savedTheme === "light") {
                document.body.classList.add("light-theme");
                if (toggleCheckbox) toggleCheckbox.checked = false;
                if (themeLabel) themeLabel.textContent = "";
            } else {
                document.body.classList.remove("light-theme");
                if (toggleCheckbox) toggleCheckbox.checked = true;
                if (themeLabel) themeLabel.textContent = "";
            }

            // Toggle event
            if (toggleCheckbox && themeLabel) {
                toggleCheckbox.addEventListener("change", () => {
                    if (toggleCheckbox.checked) {
                        document.body.classList.remove("light-theme");
                        themeLabel.textContent = "";
                        localStorage.setItem("theme", "dark");
                    } else {
                        document.body.classList.add("light-theme");
                        themeLabel.textContent = "";
                        localStorage.setItem("theme", "light");
                    }
                });
            }
        })
        .catch(err => {
            console.error("Error loading header:", err);
        });

    // Load Footer
    fetch("footer.html")
        .then(response => response.text())
        .then(data => {
            document.body.insertAdjacentHTML("beforeend", data);

            const lastModified = new Date(document.lastModified);
            const options = { day: "numeric", month: "long", year: "numeric" };
            const formattedDate = lastModified.toLocaleDateString("en-GB", options);
            const lastUpdatedEl = document.getElementById("last-updated");
            if (lastUpdatedEl) {
                lastUpdatedEl.textContent = `Last updated: ${formattedDate}`;
            }

            // ✅ Reveal page now that everything is loaded
            document.body.classList.remove("preload");
        })
        .catch(err => {
            console.error("Error loading footer:", err);
            document.body.classList.remove("preload"); // Ensure it's visible even on error
        });
});
