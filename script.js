document.addEventListener("DOMContentLoaded", function () {
    // Load Header
    fetch("header.html")
        .then(response => response.text())
        .then(data => {
            document.body.insertAdjacentHTML("afterbegin", data);

            // Now that header is inserted, select elements
            const toggleCheckbox = document.getElementById("theme-toggle");
            const themeLabel = document.querySelector(".theme-label");

            // Set theme based on saved preference
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

            // Add event listener to toggle switch
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
            } else {
                console.warn("Theme toggle or label not found");
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
        });
});
