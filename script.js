document.addEventListener("DOMContentLoaded", function () {
    // Load Header
    fetch("header.html")
        .then(response => response.text())
        .then(data => document.body.insertAdjacentHTML("afterbegin", data));

    // Load Footer
    fetch("footer.html")
        .then(response => response.text())
        .then(data => {
            document.body.insertAdjacentHTML("beforeend", data);

            // Format and display the last modified date
            let lastModified = new Date(document.lastModified);

            // Convert to "5 March 2025" format
            let options = { day: "numeric", month: "long", year: "numeric" };
            let formattedDate = lastModified.toLocaleDateString("en-GB", options);

            // Insert into footer
            document.getElementById("last-updated").textContent = `Last updated: ${formattedDate}`;
        });
});
