document.addEventListener("DOMContentLoaded", function () {
    // Load Header
    fetch("header.html")
        .then(response => response.text())
        .then(data => {
            document.body.insertAdjacentHTML("afterbegin", data);
        })
        .catch(err => {
            console.error("Error loading header:", err);
        });

    // Load Footer
    fetch("footer.html")
        .then(response => response.text())
        .then(data => {
            document.body.insertAdjacentHTML("beforeend", data);

            const toggleCheckbox = document.getElementById("theme-toggle");
            const themeLabel = document.querySelector(".theme-label");

            // Apply saved theme
            const savedTheme = localStorage.getItem("theme");
            if (savedTheme === "light") {
                document.body.classList.add("light-theme");
                toggleCheckbox.checked = false;
            } else {
                document.body.classList.remove("light-theme");
                toggleCheckbox.checked = true;
            }

            // Toggle event
            toggleCheckbox.addEventListener("change", () => {
                if (toggleCheckbox.checked) {
                    document.body.classList.remove("light-theme");
                    localStorage.setItem("theme", "dark");
                } else {
                    document.body.classList.add("light-theme");
                    localStorage.setItem("theme", "light");
                }
            });

            // Last updated date
            const lastModified = new Date(document.lastModified);
            const options = { day: "numeric", month: "long", year: "numeric" };
            const formattedDate = lastModified.toLocaleDateString("en-GB", options);
            const lastUpdatedEl = document.getElementById("last-updated");
            if (lastUpdatedEl) {
                lastUpdatedEl.textContent = `Last updated: ${formattedDate}`;
            }

            document.body.classList.remove("preload");
        })
        .catch(err => {
            console.error("Error loading footer:", err);
            document.body.classList.remove("preload");
        });
});
